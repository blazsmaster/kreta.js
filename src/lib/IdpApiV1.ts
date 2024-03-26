import axios, { AxiosInstance } from 'axios';
import { createHmac } from 'node:crypto';
import { API, Endpoints } from '../api';
import LoginRequest, { LoginRequestFields } from '../models/IDP/LoginRequest';
import NonceRequest, { NonceRequestFields } from '../models/IDP/NonceRequest';
import AuthenticationDto from '../models/IDP/AuthenticationDto';
import ExtendToken, { ExtendTokenFields } from '../models/IDP/ExtendToken';
import RevokeRefreshToken, { RevokeRefreshTokenFields } from '../models/IDP/RevokeRefreshToken';

export class IdpApiV1 {
	private readonly _instituteCode?: string;
	private readonly _password?: string;
	private readonly _username?: string;

	private _access_token?: string = undefined;
	private _refresh_token?: string = undefined;
	private _token_type?: string = undefined;

	private readonly encoder_key: string = 'baSsxOwlU1jM';
	private readonly client_id: string = 'kreta-ellenorzo-mobile-android';
	private readonly grant_type: string = 'password';
	private readonly auth_policy_version: string = 'v2';

	private readonly instance: AxiosInstance;

	constructor(creds?: LoginRequestFields) {
		this._instituteCode = creds?.instituteCode;
		this._password = creds?.password;
		this._username = creds?.username;

		this.instance = axios.create({
			baseURL: API.IDP.Host + API.IDP.Path,
		});
	}

	/**
	 * @description Nonce lekérdezése
	 */
	public async getNonce(): Promise<string> {
		return new Promise(async (resolve, reject) => {
			await this.instance.get<string>(Endpoints.IDP.GetNonce)
				.then((r) => resolve(r.data.toString()))
				.catch((e) => reject(e));
		});
	}

	private async hashNonce(fields: NonceRequestFields): Promise<string> {
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
		const schema = new LoginRequest({
			instituteCode: this._instituteCode,
			password: this._password,
			username: this._username,
		});

		return new Promise(async (resolve, reject) => {
			const nonce_key: string = await this.getNonce();
			const hash: string = await this.hashNonce(new NonceRequest({
				institute_code: schema.instituteCode,
				nonce: nonce_key,
				username: schema.username,
			}) as NonceRequestFields);

			await this.instance.post(Endpoints.IDP.Login, {
				institute_code: schema.instituteCode,
				username: schema.username,
				password: schema.password,
				grant_type: this.grant_type,
				client_id: this.client_id,
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'X-Authorizationpolicy-Nonce': nonce_key,
					'X-Authorizationpolicy-Key': hash,
					'X-Authorizationpolicy-Version': this.auth_policy_version,
				},
			})
				.then((r) => resolve(new AuthenticationDto(r.data)))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description Hozzáférési token megújítása
	 */
	public async extendToken(fields: ExtendTokenFields): Promise<AuthenticationDto> {
		const schema = new ExtendToken({
			institute_code: fields.institute_code,
			refresh_token: fields.refresh_token,
			refresh_user_data: fields.refresh_user_data,
			username: fields.username,
		});

		try {
			return await this.instance.post(Endpoints.IDP.ExtendToken, {
				grant_type: 'refresh_token',
				refresh_token: schema.refresh_token ?? this._refresh_token,
				client_id: this.client_id,
				username: schema.username ?? this._username,
				institute_code: schema.institute_code ?? this._instituteCode,
				refresh_user_data: schema.refresh_user_data ?? true,
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization': this._token_type + ' ' + this._access_token,
				},
			})
				.then((r) => {
					return new AuthenticationDto(r.data);
				});
		} catch (e) {
			throw e;
		}
	}

	/**
	 * @description Token visszavonása
	 */
	public async revokeRefreshToken(fields: RevokeRefreshTokenFields): Promise<void> {
		const schema = new RevokeRefreshToken({
			token: fields.token,
		});

		try {
			return await this.instance.post(Endpoints.IDP.RevokeRefreshToken, {
				token: schema.token ?? this._refresh_token,
				client_id: this.client_id,
				token_type: 'refresh_token',
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization': this._token_type + ' ' + schema.token ?? this._access_token,
				},
			})
				.then((_) => {
					return void 0;
				});
		} catch (e) {
			throw e;
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
		return this._instituteCode;
	}

	/**
	 * @description Felhasználónév
	 */
	public get username() {
		return this._username;
	}
}
