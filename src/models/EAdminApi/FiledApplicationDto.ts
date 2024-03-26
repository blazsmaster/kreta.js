import { IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface FiledApplicationFields {
	fajl?: string;
	fajlNev: string;
	azonosito: number;
	iktatoszam: string;
}

export default class FiledApplicationDto implements Partial<FiledApplicationFields> {
	@IsOptional()
	@IsString()
	private readonly file?: string;

	@IsString()
	private readonly fileName?: string;

	@IsNumber()
	private readonly id?: number;

	@IsString()
	private readonly registrationNumber?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.file = typeof input['fajl'] === 'string' ? input['fajl'].trim() : undefined;
			this.fileName = typeof input['fajlNev'] === 'string' ? input['fajlNev'].trim() : undefined;
			this.id = typeof input['azonosito'] === 'number' ? input['azonosito'] : undefined;
			this.registrationNumber = typeof input['iktatoszam'] === 'string' ? input['iktatoszam'].trim() : undefined;
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

	public get iktatoszam(): string | undefined {
		return this.registrationNumber;
	}

	public get json(): FiledApplicationFields {
		return {
			azonosito: this.id,
			fajl: this.file,
			fajlNev: this.fileName,
			iktatoszam: this.registrationNumber,
		} as FiledApplicationFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<FiledApplicationFields> = {
			azonosito: this.id,
			fajl: this.file,
			fajlNev: this.fileName,
			iktatoszam: this.registrationNumber,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof FiledApplicationFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
