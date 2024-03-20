import { IsString, validateSync, ValidationError } from 'class-validator';

export interface NonceRequestFields {
	institute_code: string;
	nonce: string;
	username: string;
}

export default class NonceRequest implements Partial<NonceRequestFields> {
	@IsString()
	private readonly _institute_code?: string;

	@IsString()
	private readonly _nonce?: string;

	@IsString()
	private readonly _username?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this._institute_code = typeof input['institute_code'] === 'string' ? input['institute_code'].trim() : undefined;
			this._nonce = typeof input['nonce'] === 'string' ? input['nonce'].trim() : undefined;
			this._username = typeof input['username'] === 'string' ? input['username'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	get institute_code(): string | undefined {
		return this._institute_code;
	}

	get nonce(): string | undefined {
		return this._nonce;
	}

	get username(): string | undefined {
		return this._username;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<NonceRequestFields> = {
			institute_code: this._institute_code,
			nonce: this._nonce,
			username: this._username,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof NonceRequestFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
