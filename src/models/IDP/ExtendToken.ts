import { IsBoolean, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface ExtendTokenFields {
	institute_code?: string;
	refresh_token?: string;
	refresh_user_data?: boolean;
	username?: string;
}

export default class ExtendToken implements Partial<ExtendTokenFields> {
	@IsOptional()
	@IsString()
	private readonly _instituteCode?: string;

	@IsOptional()
	@IsString()
	private readonly _refresh_token?: string;

	@IsOptional()
	@IsBoolean()
	private readonly _refresh_user_data?: boolean;

	@IsOptional()
	@IsString()
	private readonly _username?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this._instituteCode = typeof input['institute_code'] === 'string' ? input['institute_code'].trim() : undefined;
			this._refresh_token = typeof input['refresh_token'] === 'string' ? input['refresh_token'].trim() : undefined;
			this._refresh_user_data = typeof input['refresh_user_data'] === 'boolean' ? input['refresh_user_data'] : undefined;
			this._username = typeof input['username'] === 'string' ? input['username'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get institute_code(): string | undefined {
		return this._instituteCode;
	}

	public get refresh_token(): string | undefined {
		return this._refresh_token;
	}

	public get refresh_user_data(): boolean | undefined {
		return this._refresh_user_data;
	}

	public get username(): string | undefined {
		return this._username;
	}

	public get json(): ExtendTokenFields {
		return {
			institute_code: this._instituteCode,
			refresh_token: this._refresh_token,
			refresh_user_data: this._refresh_user_data,
			username: this._username,
		} as ExtendTokenFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<ExtendTokenFields> = {
			institute_code: this._instituteCode,
			refresh_token: this._refresh_token,
			refresh_user_data: this._refresh_user_data,
			username: this._username,
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
