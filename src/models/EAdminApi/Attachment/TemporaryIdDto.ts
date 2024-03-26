import { IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface TemporaryIdFields {
	fileHandler?: string;
	azonosito?: string;
	utvonal?: string;
	ideiglenesFajlAzonosito?: string;
}

export default class TemporaryIdDto implements Partial<TemporaryIdFields> {
	@IsOptional()
	@IsString()
	private readonly _fileHandler?: string;

	@IsOptional()
	@IsString()
	private readonly id?: string;

	@IsOptional()
	@IsString()
	private readonly path?: string;

	@IsOptional()
	@IsString()
	private readonly temporaryServerUid?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this._fileHandler = typeof input['fileHandler'] === 'string' ? input['fileHandler'].trim() : undefined;
			this.id = typeof input['azonosito'] === 'string' ? input['azonosito'].trim() : undefined;
			this.path = typeof input['utvonal'] === 'string' ? input['utvonal'].trim() : undefined;
			this.temporaryServerUid = typeof input['ideiglenesFajlAzonosito'] === 'string' ? input['ideiglenesFajlAzonosito'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get fileHandler(): string | undefined {
		return this._fileHandler;
	}

	public get azonosito(): string | undefined {
		return this.id;
	}

	public get utvonal(): string | undefined {
		return this.path;
	}

	public get ideiglenesFajlAzonosito(): string | undefined {
		return this.temporaryServerUid;
	}

	public get json(): TemporaryIdFields {
		return {
			azonosito: this.id,
			fileHandler: this._fileHandler,
			ideiglenesFajlAzonosito: this.temporaryServerUid,
			utvonal: this.path,
		} as TemporaryIdFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<TemporaryIdFields> = {
			fileHandler: this._fileHandler,
			azonosito: this.id,
			utvonal: this.path,
			ideiglenesFajlAzonosito: this.temporaryServerUid,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof TemporaryIdFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
