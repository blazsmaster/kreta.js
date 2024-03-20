import { IsBoolean, IsEmail, IsOptional, IsPhoneNumber, IsString, validateSync, ValidationError } from 'class-validator';

export interface GuardianFields {
	EmailCim?: string;
	IsNincsFelugyeletiJoga?: boolean;
	IsTorvenyesKepviselo?: boolean;
	Nev: string;
	Telefonszam?: string;
	Uid: string;
}

export default class GuardianDto implements Partial<GuardianFields> {
	@IsOptional()
	@IsEmail()
	private readonly email?: string;

	@IsOptional()
	@IsBoolean()
	private readonly hasParentalRights?: boolean;

	@IsOptional()
	@IsBoolean()
	private readonly isLegalRepresentative?: boolean;

	@IsString()
	private readonly name?: string;

	@IsOptional()
	@IsPhoneNumber()
	private readonly phoneNumber?: string;

	@IsString()
	private readonly uid?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.email = typeof input['EmailCim'] === 'string' ? input['EmailCim'].trim() : undefined;
			this.hasParentalRights = typeof input['IsNincsFelugyeletiJoga'] === 'boolean' ? input['IsNincsFelugyeletiJoga'] : undefined;
			this.isLegalRepresentative = typeof input['IsTorvenyesKepviselo'] === 'boolean' ? input['IsTorvenyesKepviselo'] : undefined;
			this.name = typeof input['Nev'] === 'string' ? input['Nev'].trim() : undefined;
			this.phoneNumber = typeof input['Telefonszam'] === 'string' ? input['Telefonszam'].trim() : undefined;
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get EmailCim(): string | undefined {
		return this.email;
	}

	public get IsNincsFelugyeletiJoga(): boolean | undefined {
		return this.hasParentalRights;
	}

	public get IsTorvenyesKepviselo(): boolean | undefined {
		return this.isLegalRepresentative;
	}

	public get Nev(): string | undefined {
		return this.name;
	}

	public get Telefonszam(): string | undefined {
		return this.phoneNumber;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	public get json(): GuardianFields {
		return {
			EmailCim: this.email,
			IsNincsFelugyeletiJoga: this.hasParentalRights,
			IsTorvenyesKepviselo: this.isLegalRepresentative,
			Nev: this.name,
			Telefonszam: this.phoneNumber,
			Uid: this.uid,
		} as GuardianFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<GuardianFields> = {
			EmailCim: this.email,
			IsNincsFelugyeletiJoga: this.hasParentalRights,
			IsTorvenyesKepviselo: this.isLegalRepresentative,
			Nev: this.name,
			Telefonszam: this.phoneNumber,
			Uid: this.uid,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof GuardianFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
