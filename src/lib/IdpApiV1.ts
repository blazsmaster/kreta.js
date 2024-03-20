import axios, { AxiosInstance } from 'axios';
import { createHmac } from 'node:crypto';
import { API, Endpoints } from '../api';
import LoginRequest, { LoginRequestFields } from '../models/IDP/LoginRequest';
import NonceRequest, { NonceRequestFields } from '../models/IDP/NonceRequest';
import AuthenticationDto, { AuthenticationFields } from '../models/IDP/AuthenticationDto';
import ExtendToken, { ExtendTokenFields } from '../models/IDP/ExtendToken';
import RevokeRefreshToken, { RevokeRefreshTokenFields } from '../models/IDP/RevokeRefreshToken';

export class IdpApiV1 {
	private readonly instituteCode: string;
	private readonly password?: string;
	private readonly username: string;

	private _access_token?: string = undefined;
	private _refresh_token?: string = undefined;
	private _token_type?: string = undefined;

	private readonly client_id: string = 'kreta-ellenorzo-mobile-android';
	private readonly grant_type: string = 'password';
	private readonly auth_policy_version: string = 'v2';

	private instance: AxiosInstance = axios.create({
		baseURL: API.IDP.Host + API.IDP.Path,
	});

	constructor(creds: LoginRequestFields) {
		this.instituteCode = creds.instituteCode;
		this.password = creds.password;
		this.username = creds.username;
	}

	private async getNonce(): Promise<string> {
		try {
			return await this.instance.get<string>(Endpoints.IDP.GetNonce).then((r) => r.data.toString());
		} catch (e) {
			throw e;
		}
	}

	private async hashNonce(creds: NonceRequestFields): Promise<string> {
		const buffer_bytes: Buffer = Buffer.from(creds.institute_code.toUpperCase() + creds.nonce + creds.username.toUpperCase(), 'utf8');
		const hash: Buffer = createHmac('sha512', Buffer.from([98, 97, 83, 115, 120, 79, 119, 108, 85, 49, 106, 77]))
			.update(buffer_bytes)
			.digest();
		return hash.toString('base64');
	}

	public async login(fields?: LoginRequestFields): Promise<AuthenticationDto> {
		const schema = new LoginRequest({
			instituteCode: fields?.instituteCode ?? this._instituteCode,
			password: fields?.password ?? this._password,
			username: fields?.username ?? this._username,
		});

		try {
			const nonce_key: string = await this.getNonce();
			const hash: string = await this.hashNonce(new NonceRequest({
				institute_code: schema.instituteCode,
				nonce: nonce_key,
				username: schema.username,
			}) as NonceRequestFields);

			return await this.instance.post(Endpoints.IDP.Login, {
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
				.then((r) => {
					return new AuthenticationDto(r.data);
				});
		} catch (e) {
			throw e;
		}
	}

	public async extendToken(fields: ExtendTokenFields): Promise<AuthenticationFields> {
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
				username: schema.username ?? this.username,
				institute_code: schema.institute_code ?? this.instituteCode,
				refresh_user_data: schema.refresh_user_data ?? true,
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization': this._token_type + ' ' + this._access_token,
				},
			})
				.then((r) => {
					return new AuthenticationDto(r.data) as AuthenticationFields;
				});
		} catch (e) {
			throw e;
		}
	}

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

	public get _password() {
		return this.password;
	}

	public get _instituteCode() {
		return this.instituteCode;
	}

	public get _username() {
		return this.username;
	}
}
