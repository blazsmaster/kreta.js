import { IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface ToDoMandatoryDocumentsListFields {
	fajl?: string;
	fajlNev: string;
	azonosito: number;
}

export default class ToDoMandatoryDocumentsListDto implements Partial<ToDoMandatoryDocumentsListFields> {
	@IsOptional()
	@IsString()
	private readonly file?: string;

	@IsString()
	private readonly fileName?: string;

	@IsNumber()
	private readonly id?: number;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.file = typeof input['fajl'] === 'string' ? input['fajl'].trim() : undefined;
			this.fileName = typeof input['fajlNev'] === 'string' ? input['fajlNev'].trim() : undefined;
			this.id = typeof input['azonosito'] === 'number' ? input['azonosito'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get fajl(): string | undefined {
		return this.file;
	}

	public get fajlNev(): string | undefined {
		return this.fileName;
	}

	public get azonosito(): number | undefined {
		return this.id;
	}

	public get json(): ToDoMandatoryDocumentsListFields {
		return {
			azonosito: this.id,
			fajl: this.file,
			fajlNev: this.fileName,
		} as ToDoMandatoryDocumentsListFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<ToDoMandatoryDocumentsListFields> = {
			azonosito: this.id,
			fajl: this.file,
			fajlNev: this.fileName,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof ToDoMandatoryDocumentsListFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
