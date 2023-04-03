import {
	AuthenticationFields,
	Authentication as AuthenticationModel,
	RequestRefreshTokenOptions,
	NonceHashOptions,
	BaseAPIUrls,
	Endpoints, AccessToken, PreBuiltAuthenticationToken
} from '../types';
import axios, { AxiosResponse } from 'axios';
import { createHmac } from 'node:crypto';

export class Authentication {
	private readonly username: string;
	private readonly password: string;
	private readonly institute_code: string;
	private readonly client_id: string = 'kreta-ellenorzo-mobile-android';
	private readonly grant_type: string = 'password';
	private readonly auth_policy_version: string = 'v2';

	constructor(options: AuthenticationFields) {
		this.username = options.username;
		this.password = options.password;
		this.institute_code = options.institute_code;
	}

	private authenticate(options: AuthenticationFields): Promise<AuthenticationModel> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const nonce_key: string = await this.getNonce();
			const hash: string = await this.getNonceHash({
				nonce: nonce_key,
				institute_code: options.institute_code,
				username: options.username
			});

			await axios.post(BaseAPIUrls.IDP + Endpoints.Token, {
				institute_code: options.institute_code,
				username: options.username,
				password: options.password,
				grant_type: this.grant_type,
				client_id: this.client_id
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'X-Authorizationpolicy-Nonce': nonce_key,
					'X-Authorizationpolicy-Key': hash,
					'X-Authorizationpolicy-Version': this.auth_policy_version,
				}
			}).then((r: AxiosResponse<AuthenticationModel>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	private getNonce(): Promise<string> {
		return new Promise((resolve, reject): void => {
			axios.get(BaseAPIUrls.IDP + Endpoints.Nonce).then((r: AxiosResponse<string>) => {
				return resolve(r.data.toString());
			}).catch((e: Error) => reject(e));
		});
	}

	private getNonceHash(options: NonceHashOptions): Promise<string> {
		return new Promise((resolve): void => {
			const buffer_bytes: Buffer = Buffer.from(options.institute_code.toUpperCase() + options.nonce + options.username.toUpperCase(), 'utf8');
			const hash: Buffer = createHmac('sha512', Buffer.from([98, 97, 83, 115, 120, 79, 119, 108, 85, 49, 106, 77])).update(buffer_bytes).digest();

			return resolve(hash.toString('base64'));
		});
	}

	private async returnTokens(): Promise<AccessToken> {
		return await this.authenticate({
			username: this.username,
			password: this.password,
			institute_code: this.institute_code
		}).then((r: AuthenticationModel): AccessToken => {
			return { access_token: r.access_token, refresh_token: r.refresh_token, token_type: r.token_type };
		}).catch((): { access_token: null; refresh_token: null; token_type: null } => {
			return { access_token: null, refresh_token: null, token_type: null };
		});
	}

	public getAccessToken(): Promise<PreBuiltAuthenticationToken> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { access_token, refresh_token }: AccessToken = await this.returnTokens();

			if (access_token === null || refresh_token === null)
				return reject(new Error('Failed to get access token'));
			else
				return resolve({ token: 'Bearer' + ' ' + access_token, access_token, refresh_token });
		});
	}

	public getRefreshToken(options: RequestRefreshTokenOptions): Promise<AuthenticationModel> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const nonce_key: string = await this.getNonce();
			const hash: string = await this.getNonceHash({
				nonce: nonce_key,
				institute_code: options.institute_code,
				username: options.username
			});

			await axios.post(BaseAPIUrls.IDP + Endpoints.Token, {
				refresh_token: options.refresh_token,
				institute_code: options.institute_code,
				grant_type: 'refresh_token',
				client_id: this.client_id,
				refresh_user_data: options.refreshUserData
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'X-Authorizationpolicy-Key': hash,
					'X-Authorizationpolicy-Version': this.auth_policy_version,
				}
			}).then((r: AxiosResponse<AuthenticationModel>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}
}
