import { IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface LoginRequestFields {
	instituteCode?: string;
	password?: string;
	username?: string;
}

export default class LoginRequest implements Partial<LoginRequestFields> {
	@IsString()
	private readonly _instituteCode?: string;

	@IsOptional()
	@IsString()
	private readonly _password?: string;

	@IsString()
	private readonly _username?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this._instituteCode = typeof input['instituteCode'] === 'string' ? input['instituteCode'].trim() : undefined;
			this._password = typeof input['password'] === 'string' ? input['password'].trim() : undefined;
			this._username = typeof input['username'] === 'string' ? input['username'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	get instituteCode(): string | undefined {
		return this._instituteCode;
	}

	get password(): string | undefined {
		return this._password;
	}

	get username(): string | undefined {
		return this._username;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<LoginRequestFields> = {
			instituteCode: this._instituteCode,
			password: this._password,
			username: this._username,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof LoginRequestFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
