import { IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface FileFields {
	azonosito?: number;
	ideiglenesFajlAzonosito?: string;
}

export default class FileDto implements Partial<FileFields> {
	@IsOptional()
	@IsNumber()
	private readonly id?: number;

	@IsOptional()
	@IsString()
	private readonly temporaryFileId?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.id = typeof input['azonosito'] === 'number' ? input['azonosito'] : undefined;
			this.temporaryFileId = typeof input['ideiglenesFajlAzonosito'] === 'string' ? input['ideiglenesFajlAzonosito'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get azonosito(): number | undefined {
		return this.id;
	}

	public get ideiglenesFajlAzonosito(): string | undefined {
		return this.temporaryFileId;
	}

	public get json(): FileFields {
		return {
			azonosito: this.id,
			ideiglenesFajlAzonosito: this.temporaryFileId,
		} as FileFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<FileFields> = {
			azonosito: this.id,
			ideiglenesFajlAzonosito: this.temporaryFileId,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof FileFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
