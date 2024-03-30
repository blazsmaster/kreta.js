import { IsBoolean, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface ExtendTokenFields {
	instituteCode: string;
	refreshToken: string;
	refreshUserData: boolean;
	username: string;
	accessToken?: string;
	tokenType?: string;
}

export default class ExtendToken implements Partial<ExtendTokenFields> {
	@IsString()
	private readonly _instituteCode?: string;

	@IsString()
	private readonly _refreshToken?: string;

	@IsBoolean()
	private readonly _refreshUserData?: boolean;

	@IsString()
	private readonly _username?: string;

	@IsOptional()
	@IsString()
	private readonly _accessToken?: string;

	@IsOptional()
	@IsString()
	private readonly _tokenType?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this._instituteCode = typeof input['institute_code'] === 'string' ? input['institute_code'].trim() : undefined;
			this._refreshToken = typeof input['refresh_token'] === 'string' ? input['refresh_token'].trim() : undefined;
			this._refreshUserData = typeof input['refresh_user_data'] === 'boolean' ? input['refresh_user_data'] : undefined;
			this._username = typeof input['username'] === 'string' ? input['username'].trim() : undefined;
			this._accessToken = typeof input['access_token'] === 'string' ? input['access_token'].trim() : undefined;
			this._tokenType = typeof input['token_type'] === 'string' ? input['token_type'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get instituteCode(): string | undefined {
		return this._instituteCode;
	}

	public get refreshToken(): string | undefined {
		return this._refreshToken;
	}

	public get refreshUserData(): boolean | undefined {
		return this._refreshUserData;
	}

	public get username(): string | undefined {
		return this._username;
	}

	public get accessToken(): string | undefined {
		return this._accessToken;
	}

	public get tokenType(): string | undefined {
		return this._tokenType;
	}

	public get json(): ExtendTokenFields {
		return {
			accessToken: this._accessToken,
			instituteCode: this._instituteCode,
			refreshToken: this._refreshToken,
			refreshUserData: this._refreshUserData,
			tokenType: this._tokenType,
			username: this._username,
		} as ExtendTokenFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<ExtendTokenFields> = {
			instituteCode: this._instituteCode,
			refreshToken: this._refreshToken,
			refreshUserData: this._refreshUserData,
			username: this._username,
			accessToken: this._accessToken,
			tokenType: this._tokenType,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof ExtendTokenFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
