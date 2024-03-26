import { IsNumber, validateSync, ValidationError } from 'class-validator';

export interface ClassGroupGuardianFields {
	Id: number;
	Nev: string;
	RokonsagiFok: string;
	Telefonszam: string;
	Email: string;
	IsTorvenyesKepviselo: boolean;
}

export default class ClassGroupGuardianDto implements Partial<ClassGroupGuardianFields> {
	@IsNumber()
	private readonly id?: number;

	@IsNumber()
	private readonly name?: string;

	@IsNumber()
	private readonly relationship?: string;

	@IsNumber()
	private readonly phoneNumber?: string;

	@IsNumber()
	private readonly email?: string;

	@IsNumber()
	private readonly isLegalRepresentative?: boolean;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.id = typeof input['Id'] === 'number' ? input['Id'] : undefined;
			this.name = typeof input['Nev'] === 'string' ? input['Nev'].trim() : undefined;
			this.relationship = typeof input['RokonsagiFok'] === 'string' ? input['RokonsagiFok'].trim() : undefined;
			this.phoneNumber = typeof input['Telefonszam'] === 'string' ? input['Telefonszam'].trim() : undefined;
			this.email = typeof input['Email'] === 'string' ? input['Email'].trim() : undefined;
			this.isLegalRepresentative = typeof input['IsTorvenyesKepviselo'] === 'boolean' ? input['IsTorvenyesKepviselo'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Id(): number | undefined {
		return this.id;
	}

	public get Nev(): string | undefined {
		return this.name;
	}

	public get RokonsagiFok(): string | undefined {
		return this.relationship;
	}

	public get Telefonszam(): string | undefined {
		return this.phoneNumber;
	}

	public get Email(): string | undefined {
		return this.email;
	}

	public get IsTorvenyesKepviselo(): boolean | undefined {
		return this.isLegalRepresentative;
	}

	public get json(): ClassGroupGuardianFields {
		return {
			Email: this.email,
			Id: this.id,
			IsTorvenyesKepviselo: this.isLegalRepresentative,
			Nev: this.name,
			RokonsagiFok: this.relationship,
			Telefonszam: this.phoneNumber,
		} as ClassGroupGuardianFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<ClassGroupGuardianFields> = {
			Id: this.id,
			Nev: this.name,
			RokonsagiFok: this.relationship,
			Telefonszam: this.phoneNumber,
			Email: this.email,
			IsTorvenyesKepviselo: this.isLegalRepresentative,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof ClassGroupGuardianFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
