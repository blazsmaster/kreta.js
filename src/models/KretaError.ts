import { IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface KretaErrorFields {
	error: string,
	error_description?: string
}

export default class KretaError implements Partial<KretaErrorFields> {
	@IsString()
	private readonly _error?: string;

	@IsOptional()
	@IsString()
	private readonly _error_description?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this._error = typeof input['error'] === 'string' ? input['error'].trim() : undefined;
			this._error_description = typeof input['error_description'] === 'string' ? input['error_description'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get error(): string | undefined {
		return this._error;
	}

	public get error_description(): string | undefined {
		return this._error_description;
	}

	public get json(): KretaErrorFields {
		return {
			error: this._error,
			error_description: this._error_description,
		} as KretaErrorFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<KretaErrorFields> = {
			error: this._error,
			error_description: this._error_description,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof KretaErrorFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
