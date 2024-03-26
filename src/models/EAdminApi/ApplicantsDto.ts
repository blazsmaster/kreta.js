import { IsNumber, IsString, validateSync, ValidationError } from 'class-validator';

export interface ApplicantsFields {
	felhasznaloNev: string;
	azonosito: number;
	nev: string;
	titulus: string;
	kretaFelhasznaloAzonosito: number;
}

export default class ApplicantsDto implements Partial<ApplicantsFields> {
	@IsString()
	private readonly fileName?: string;

	@IsNumber()
	private readonly id?: number;

	@IsString()
	private readonly shortName?: string;

	@IsString()
	private readonly title?: string;

	@IsNumber()
	private readonly userId?: number;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.fileName = typeof input['felhasznaloNev'] === 'string' ? input['felhasznaloNev'].trim() : undefined;
			this.id = typeof input['azonosito'] === 'number' ? input['azonosito'] : undefined;
			this.shortName = typeof input['nev'] === 'string' ? input['nev'].trim() : undefined;
			this.title = typeof input['titulus'] === 'string' ? input['titulus'].trim() : undefined;
			this.userId = typeof input['kretaFelhasznaloAzonosito'] === 'number' ? input['kretaFelhasznaloAzonosito'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get felhasznaloNev(): string | undefined {
		return this.fileName;
	}

	public get azonosito(): number | undefined {
		return this.id;
	}

	public get nev(): string | undefined {
		return this.shortName;
	}

	public get titulus(): string | undefined {
		return this.title;
	}

	public get kretaFelhasznaloAzonosito(): number | undefined {
		return this.userId;
	}

	public get json(): ApplicantsFields {
		return {
			azonosito: this.id,
			felhasznaloNev: this.fileName,
			kretaFelhasznaloAzonosito: this.userId,
			nev: this.shortName,
			titulus: this.title,
		} as ApplicantsFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<ApplicantsFields> = {
			felhasznaloNev: this.fileName,
			azonosito: this.id,
			nev: this.shortName,
			titulus: this.title,
			kretaFelhasznaloAzonosito: this.userId,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof ApplicantsFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
