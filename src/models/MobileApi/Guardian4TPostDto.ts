import { IsBoolean, IsDate, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface Guardian4TPostFields {
	SzuletesiDatum?: Date;
	Utonev?: string;
	SzuletesiUtonev?: string;
	IsElfogadottAszf?: boolean;
	AnyjaUtonev?: string;
	AnyjaVezeteknev?: string;
	Elotag: string;
	SzuletesiHely?: string;
	Vezeteknev?: string;
	SzuletesiVezeteknev?: string;
}

export default class Guardian4TPostDto implements Partial<Guardian4TPostFields> {
	@IsOptional()
	@IsDate()
	private readonly dateOfBirthAsString?: Date;

	@IsOptional()
	@IsString()
	private readonly firstname?: string;

	@IsOptional()
	@IsString()
	private readonly firstnameOfBirth?: string;

	@IsOptional()
	@IsBoolean()
	private readonly isAszfAccepted?: boolean;

	@IsOptional()
	@IsString()
	private readonly mothersFirstname?: string;

	@IsOptional()
	@IsString()
	private readonly mothersSurname?: string;

	@IsString()
	private readonly namePrefix?: string;

	@IsOptional()
	@IsString()
	private readonly placeOfBirth?: string;

	@IsOptional()
	@IsString()
	private readonly surname?: string;

	@IsOptional()
	@IsString()
	private readonly surnameOfBirth?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.dateOfBirthAsString = typeof input['SzuletesiDatum'] === 'string' ? new Date(input['SzuletesiDatum']) : undefined;
			this.firstname = typeof input['Utonev'] === 'string' ? input['Utonev'].trim() : undefined;
			this.firstnameOfBirth = typeof input['SzuletesiUtonev'] === 'string' ? input['SzuletesiUtonev'].trim() : undefined;
			this.isAszfAccepted = typeof input['IsElfogadottAszf'] === 'boolean' ? input['IsElfogadottAszf'] : undefined;
			this.mothersFirstname = typeof input['AnyjaUtonev'] === 'string' ? input['AnyjaUtonev'].trim() : undefined;
			this.mothersSurname = typeof input['AnyjaVezeteknev'] === 'string' ? input['AnyjaVezeteknev'].trim() : undefined;
			this.namePrefix = typeof input['Elotag'] === 'string' ? input['Elotag'].trim() : undefined;
			this.placeOfBirth = typeof input['SzuletesiHely'] === 'string' ? input['SzuletesiHely'].trim() : undefined;
			this.surname = typeof input['Vezeteknev'] === 'string' ? input['Vezeteknev'].trim() : undefined;
			this.surnameOfBirth = typeof input['SzuletesiVezeteknev'] === 'string' ? input['SzuletesiVezeteknev'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get SzuletesiDatum(): Date | undefined {
		return this.dateOfBirthAsString;
	}

	public get Utonev(): string | undefined {
		return this.firstname;
	}

	public get SzuletesiUtonev(): string | undefined {
		return this.firstnameOfBirth;
	}

	public get IsElfogadottAszf(): boolean | undefined {
		return this.isAszfAccepted;
	}

	public get AnyjaUtonev(): string | undefined {
		return this.mothersFirstname;
	}

	public get AnyjaVezeteknev(): string | undefined {
		return this.mothersSurname;
	}

	public get Elotag(): string | undefined {
		return this.namePrefix;
	}

	public get SzuletesiHely(): string | undefined {
		return this.placeOfBirth;
	}

	public get Vezeteknev(): string | undefined {
		return this.surname;
	}

	public get SzuletesiVezeteknev(): string | undefined {
		return this.surnameOfBirth;
	}

	public get json(): Guardian4TPostFields {
		return {
			AnyjaUtonev: this.mothersFirstname,
			AnyjaVezeteknev: this.mothersSurname,
			Elotag: this.namePrefix,
			IsElfogadottAszf: this.isAszfAccepted,
			SzuletesiDatum: this.dateOfBirthAsString,
			SzuletesiHely: this.placeOfBirth,
			SzuletesiUtonev: this.firstnameOfBirth,
			SzuletesiVezeteknev: this.surnameOfBirth,
			Utonev: this.firstname,
			Vezeteknev: this.surname,
		} as Guardian4TPostFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<Guardian4TPostFields> = {
			SzuletesiDatum: this.dateOfBirthAsString,
			Utonev: this.firstname,
			SzuletesiUtonev: this.firstnameOfBirth,
			IsElfogadottAszf: this.isAszfAccepted,
			AnyjaUtonev: this.mothersFirstname,
			AnyjaVezeteknev: this.mothersSurname,
			Elotag: this.namePrefix,
			SzuletesiHely: this.placeOfBirth,
			Vezeteknev: this.surname,
			SzuletesiVezeteknev: this.surnameOfBirth,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof Guardian4TPostFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
