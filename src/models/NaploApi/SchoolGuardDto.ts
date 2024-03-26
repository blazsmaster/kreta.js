import { IsEmail, IsString, validateSync, ValidationError } from 'class-validator';

export interface SchoolGuardFields {
	EmailCim: string;
	Nev: string;
	Telefonszam: string;
	FeladatEllatasiHelyId: string;
	FeladatEllatasiHelyNev: string;
	Uid: string;
}

export default class SchoolGuardDto implements Partial<SchoolGuardFields> {
	@IsEmail()
	private readonly emailAddress?: string;

	@IsString()
	private readonly name?: string;

	@IsString()
	private readonly phoneNumber?: string;

	@IsString()
	private readonly placeOfWorkId?: string;

	@IsString()
	private readonly placeOfWorkName?: string;

	@IsString()
	private readonly uid?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.emailAddress = typeof input['EmailCim'] === 'string' ? input['EmailCim'].trim() : undefined;
			this.name = typeof input['Nev'] === 'string' ? input['Nev'].trim() : undefined;
			this.phoneNumber = typeof input['Telefonszam'] === 'string' ? input['Telefonszam'].trim() : undefined;
			this.placeOfWorkId = typeof input['FeladatEllatasiHelyId'] === 'string' ? input['FeladatEllatasiHelyId'].trim() : undefined;
			this.placeOfWorkName = typeof input['FeladatEllatasiHelyNev'] === 'string' ? input['FeladatEllatasiHelyNev'].trim() : undefined;
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get EmailCim(): string | undefined {
		return this.emailAddress;
	}

	public get Nev(): string | undefined {
		return this.name;
	}

	public get Telefonszam(): string | undefined {
		return this.phoneNumber;
	}

	public get FeladatEllatasiHelyId(): string | undefined {
		return this.placeOfWorkId;
	}

	public get FeladatEllatasiHelyNev(): string | undefined {
		return this.placeOfWorkName;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	public get json(): SchoolGuardFields {
		return {
			EmailCim: this.emailAddress,
			FeladatEllatasiHelyId: this.placeOfWorkId,
			FeladatEllatasiHelyNev: this.placeOfWorkName,
			Nev: this.name,
			Telefonszam: this.phoneNumber,
			Uid: this.uid,
		} as SchoolGuardFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<SchoolGuardFields> = {
			EmailCim: this.emailAddress,
			Nev: this.name,
			Telefonszam: this.phoneNumber,
			FeladatEllatasiHelyId: this.placeOfWorkId,
			FeladatEllatasiHelyNev: this.placeOfWorkName,
			Uid: this.uid,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof SchoolGuardFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
