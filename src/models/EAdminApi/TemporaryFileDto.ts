import { IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface TemporaryFileFields {
	fajlAzonosito?: string;
	fajlMeretByteLength?: number;
	utvonal?: string;
}

export default class TemporaryFileDto implements Partial<TemporaryFileFields> {
	@IsOptional()
	@IsString()
	private readonly fileId?: string;

	@IsOptional()
	@IsNumber()
	private readonly fileLength?: number;

	@IsOptional()
	@IsString()
	private readonly path?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.fileId = typeof input['fajlAzonosito'] === 'string' ? input['fajlAzonosito'].trim() : undefined;
			this.fileLength = typeof input['fajlMeretByteLength'] === 'number' ? input['fajlMeretByteLength'] : undefined;
			this.path = typeof input['utvonal'] === 'string' ? input['utvonal'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get fajlAzonosito(): string | undefined {
		return this.fileId;
	}

	public get fajlMeretByteLength(): number | undefined {
		return this.fileLength;
	}

	public get utvonal(): string | undefined {
		return this.path;
	}

	public get json(): TemporaryFileFields {
		return {
			fajlAzonosito: this.fileId,
			fajlMeretByteLength: this.fileLength,
			utvonal: this.path,
		} as TemporaryFileFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<TemporaryFileFields> = {
			fajlAzonosito: this.fileId,
			fajlMeretByteLength: this.fileLength,
			utvonal: this.path,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof TemporaryFileFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
