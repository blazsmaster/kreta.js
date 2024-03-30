import axios, { AxiosInstance, AxiosProxyConfig } from 'axios';
import { createHmac } from 'node:crypto';
import { API, Endpoints } from '../api';
import LoginRequest, { LoginRequestFields } from '../models/IDP/LoginRequest';
import NonceRequest, { NonceRequestFields } from '../models/IDP/NonceRequest';
import AuthenticationDto, { AuthenticationFields } from '../models/IDP/AuthenticationDto';
import ExtendToken, { ExtendTokenFields } from '../models/IDP/ExtendToken';
import { KretaError } from '../utils/ErrorHandler';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import TokenDto from '../models/IDP/TokenDto';

export class IdpApiV1 {
	private readonly _institute_code?: string;
	private readonly _password?: string;
	private readonly _username?: string;

	private _access_token?: string = undefined;
	private _refresh_token?: string = undefined;
	private _token_type?: string = undefined;

	private readonly default_token_type: string = 'Bearer';
	private readonly encoder_key: string = 'baSsxOwlU1jM';
	private readonly client_id: string = 'kreta-ellenorzo-mobile-android';
	private readonly grant_type: string = 'password';
	private readonly auth_policy_version: string = 'v2';

	private readonly instance: AxiosInstance;

	constructor(creds?: LoginRequestFields) {
		this._institute_code = creds?.instituteCode;
		this._password = creds?.password;
		this._username = creds?.username;

		this.instance = axios.create({
			baseURL: API.IDP.Host + API.IDP.Path,
		});
	}

	/**
	 * @description Nonce lekérdezése
	 */
	public getNonce(): Promise<string> {
		return new Promise((resolve, reject) => {
			this.instance.get<string>(Endpoints.IDP.GetNonce)
				.then((r) => resolve(r.data.toString()))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	private hashNonce(fields: NonceRequestFields): string {
		const buffer_bytes: Buffer = Buffer.from(fields.institute_code.toUpperCase() + fields.nonce + fields.username.toUpperCase(), 'utf8');
		const hash: Buffer = createHmac('sha512', Buffer.from([...this.encoder_key].map(char => char.charCodeAt(0))))
			.update(buffer_bytes)
			.digest();
		return hash.toString('base64');
	}

	/**
	 * @description Token információk lekérdezése (bejelentkezés)
	 */
	public async login(): Promise<AuthenticationDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const schema = new LoginRequest({
					instituteCode: this._institute_code,
					password: this._password,
					username: this._username,
				});

				await this.getNonce()
					.then(async (nonce) => {
						const hash: string = this.hashNonce(new NonceRequest({
							institute_code: schema.instituteCode,
							nonce: nonce,
							username: schema.username,
						}) as NonceRequestFields);

						const r = await this.instance.post<AuthenticationFields>(Endpoints.IDP.Login, {
							institute_code: schema.instituteCode,
							username: schema.username,
							password: schema.password,
							grant_type: this.grant_type,
							client_id: this.client_id,
						}, {
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded',
								'X-Authorizationpolicy-Nonce': nonce,
								'X-Authorizationpolicy-Key': hash,
								'X-Authorizationpolicy-Version': this.auth_policy_version,
							},
						});

						this._access_token = r.data.access_token;
						this._refresh_token = r.data.refresh_token;
						this._token_type = r.data.token_type;

						resolve(new AuthenticationDto(r.data));
					});
			} catch (e) {
				reject(new KretaError(e).body);
			}
		});
	}

	/**
	 * @description Hozzáférési token megújítása
	 */
	public extendToken(fields?: ExtendTokenFields): Promise<AuthenticationDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const schema = new ExtendToken({
					institute_code: fields?.instituteCode,
					refresh_token: fields?.refreshToken,
					refresh_user_data: fields?.refreshUserData,
					username: fields?.username,
					access_token: fields?.accessToken,
					token_type: fields?.tokenType,
				});

				const r = await this.instance.post<AuthenticationFields>(Endpoints.IDP.ExtendToken, {
					grant_type: 'refresh_token',
					refresh_token: schema.refreshToken ?? this._refresh_token,
					client_id: this.client_id,
					username: schema.username ?? this._username,
					institute_code: schema.instituteCode ?? this._institute_code,
					refresh_user_data: schema.refreshUserData ?? true,
				}, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Authorization': (this._token_type ?? schema.tokenType ?? this.default_token_type) + ' ' + (schema.accessToken ?? this._access_token),
					},
				});

				this._access_token = r.data.access_token;
				this._refresh_token = r.data.refresh_token;
				this._token_type = r.data.token_type;

				resolve(new AuthenticationDto(r.data));
			} catch (e) {
				reject(new KretaError(e).body);
			}
		});
	}

	/**
	 * @description Token visszavonása
	 */
	public revokeRefreshToken(token: string): Promise<void> {
		return new Promise((resolve, reject) => {
			this.instance.post(Endpoints.IDP.RevokeRefreshToken, {
				token: token ?? this._refresh_token,
				client_id: this.client_id,
				token_type: 'refresh_token',
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization': (this._token_type ?? this.default_token_type) + ' ' + (token ?? this._access_token),
				},
			})
				.then(() => resolve())
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Token érvényességének ellenőrzése
	 * @param token - Hozzáférési token
	 */
	public isValidToken(token: string): boolean {
		try {
			const decoded: JwtPayload = jwtDecode(token);
			if (decoded && decoded.exp) {
				return decoded.exp > Math.floor(Date.now() / 1000);
			} else {
				return false;
			}
		} catch (err) {
			return false;
		}
	}

	/**
	 * @description Token adatainak feloldása
	 * @param token - Hozzáférési token
	 */
	public resolveTokenData(token: string): TokenDto {
		try {
			const decoded: JwtPayload = jwtDecode(token);
			return new TokenDto(decoded);
		} catch (err) {
			throw new KretaError(err).body;
		}
	}

	/**
	 * @description Jelszó
	 */
	public get password() {
		return this._password;
	}

	/**
	 * @description Intézmény egyedi azonosítója
	 */
	public get instituteCode() {
		return this._institute_code;
	}

	/**
	 * @description Felhasználónév
	 */
	public get username() {
		return this._username;
	}

	/**
	 * @description Egyéni User-Agent beállítása
	 */
	public setUserAgent(ua: string): Omit<this, 'setUserAgent'> {
		this.instance.defaults.headers['User-Agent'] = ua;
		return this;
	}

	/**
	 * @description Proxy beállítása
	 */
	public setProxy(p: AxiosProxyConfig): Omit<this, 'setProxy'> {
		this.instance.defaults.proxy = p;
		return this;
	}
}
