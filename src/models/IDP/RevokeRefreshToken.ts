import { IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface RevokeRefreshTokenFields {
	token?: string;
}

export default class RevokeRefreshToken implements Partial<RevokeRefreshTokenFields> {
	@IsOptional()
	@IsString()
	private readonly _token?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this._token = typeof input['token'] === 'string' ? input['token'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get token(): string | undefined {
		return this._token;
	}

	public get json(): RevokeRefreshTokenFields {
		return {
			token: this._token,
		} as RevokeRefreshTokenFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<RevokeRefreshTokenFields> = {
			token: this._token,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof RevokeRefreshTokenFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
