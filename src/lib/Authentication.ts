import {
	AuthenticationFields,
	AuthenticationResponse,
	RequestRefreshTokenOptions,
	NonceHashOptions,
	API,
	Endpoints, AccessToken, PreBuiltAuthenticationToken
} from '../types';
import axios, { AxiosProxyConfig, AxiosResponse } from 'axios';
import { createHmac } from 'node:crypto';
import KretaError from './errors/KretaError';
import requireParam from '../decorators/requireParam';
import tryRequest from '../utils/tryRequest';
import requireCredentials from '../decorators/requireCredentials';

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

	public get _username() {
		return this.username;
	}

	public get _password() {
		return this.password;
	}

	public get _institute_code() {
		return this.institute_code;
	}

	@requireParam('proxy.host')
	@requireParam('proxy.port')
	public setProxy(proxy: AxiosProxyConfig): this {
		axios.defaults.proxy = proxy;
		return this;
	}

	@requireParam('ua')
	public setUserAgent(ua: string): this {
		axios.defaults.headers.common['User-Agent'] = ua;
		return this;
	};

	@requireCredentials
	private authenticate(options: AuthenticationFields): Promise<AuthenticationResponse> {
		return new Promise(async (resolve): Promise<void> => {
			const nonce_key: string = await this.getNonce();
			const hash: string = await this.getNonceHash({
				nonce: nonce_key,
				institute_code: options.institute_code,
				username: options.username
			});

			await tryRequest(axios.post(API.IDP + Endpoints.Token, {
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
			}).then((r: AxiosResponse<AuthenticationResponse>) => resolve(r.data)));
		});
	}

	private getNonce(): Promise<string> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(API.IDP + Endpoints.Nonce).then((r: AxiosResponse<string>) => resolve(r.data.toString())));
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
		}).then((r: AuthenticationResponse): AccessToken => {
			return { access_token: r.access_token, refresh_token: r.refresh_token, token_type: r.token_type };
		}).catch((): { access_token: null; refresh_token: null; token_type: null } => {
			return { access_token: null, refresh_token: null, token_type: null };
		});
	}

	public getAccessToken(): Promise<PreBuiltAuthenticationToken> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { access_token, refresh_token }: AccessToken = await this.returnTokens();
			if (access_token === null || refresh_token === null)
				return reject(new KretaError('Failed to get access token: Invalid credentials'));
			else
				return resolve({ token: 'Bearer' + ' ' + access_token, access_token, refresh_token });
		});
	}

	@requireParam('options.refreshToken')
	@requireParam('options.refreshUserData')
	public getRefreshToken(options: RequestRefreshTokenOptions): Promise<AuthenticationResponse> {
		return new Promise(async (resolve): Promise<void> => {
			const nonce_key: string = await this.getNonce();
			const hash: string = await this.getNonceHash({
				nonce: nonce_key,
				institute_code: this.institute_code,
				username: this.username
			});

			await tryRequest(axios.post(API.IDP + Endpoints.Token, {
				refresh_token: options.refreshToken,
				institute_code: this.institute_code,
				grant_type: 'refresh_token',
				client_id: this.client_id,
				refresh_user_data: options.refreshUserData
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'X-Authorizationpolicy-Key': hash,
					'X-Authorizationpolicy-Version': this.auth_policy_version,
				}
			}).then((r: AxiosResponse<AuthenticationResponse>) =>
				resolve(r.data)
			));
		});
	}
}
