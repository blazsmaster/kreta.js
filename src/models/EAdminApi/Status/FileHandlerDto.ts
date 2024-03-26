import { IsArray, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface FileHandlerFields {
	apiUrl?: string;
	features?: Array<string>;
}

export default class FileHandlerDto implements Partial<FileHandlerFields> {
	@IsOptional()
	@IsString()
	private readonly _apiUrl?: string;

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	private readonly _features?: Array<string>;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this._apiUrl = typeof input['apiUrl'] === 'string' ? input['apiUrl'].trim() : undefined;
			this._features = Array.isArray(input['features']) ? input['features'].map((value: any) => String(value)) : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get apiUrl(): string | undefined {
		return this._apiUrl;
	}

	public get features(): Array<string> | undefined {
		return this._features;
	}

	public get json(): FileHandlerFields {
		return {
			apiUrl: this._apiUrl,
			features: this._features,
		} as FileHandlerFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<FileHandlerFields> = {
			apiUrl: this._apiUrl,
			features: this._features,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof FileHandlerFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
