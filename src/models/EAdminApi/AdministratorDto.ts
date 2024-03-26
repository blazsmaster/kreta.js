import { IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface AdministratorFields {
	azonosito: number;
	nev: string;
	titulus?: string;
	kretaFelhasznaloAzonosito: number;
	felhasznaloNev: string;
}

export default class AdministratorDto implements Partial<AdministratorFields> {
	@IsNumber()
	private readonly id?: number;

	@IsString()
	private readonly shortName?: string;

	@IsOptional()
	@IsString()
	private readonly title?: string;

	@IsNumber()
	private readonly userId?: number;

	@IsString()
	private readonly userName?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.id = typeof input['azonosito'] === 'number' ? input['azonosito'] : undefined;
			this.shortName = typeof input['nev'] === 'string' ? input['nev'].trim() : undefined;
			this.title = typeof input['titulus'] === 'string' ? input['titulus'].trim() : undefined;
			this.userId = typeof input['kretaFelhasznaloAzonosito'] === 'number' ? input['kretaFelhasznaloAzonosito'] : undefined;
			this.userName = typeof input['felhasznaloNev'] === 'string' ? input['felhasznaloNev'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
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

	public get felhasznaloNev(): string | undefined {
		return this.userName;
	}

	public get json(): AdministratorFields {
		return {
			azonosito: this.id,
			felhasznaloNev: this.userName,
			kretaFelhasznaloAzonosito: this.userId,
			nev: this.shortName,
			titulus: this.title,
		} as AdministratorFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<AdministratorFields> = {
			azonosito: this.id,
			nev: this.shortName,
			titulus: this.title,
			kretaFelhasznaloAzonosito: this.userId,
			felhasznaloNev: this.userName,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof AdministratorFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
