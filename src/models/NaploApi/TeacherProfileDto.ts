import { IsEmail, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface TeacherProfileFields {
	Id: string;
	Kep?: string;
	IntezmenyNev: string;
	Nev: string;
	FeladatEllatasiHelyId: string;
	FeladatEllatasiHelyNev: string;
	PublikusEmailCim?: string;
	MunkahelyiEmailCim?: string;
	PublikusTelefonszam?: string;
	MunkahelyiTelefonszam?: string;
}

export default class TeacherProfileDto implements Partial<TeacherProfileFields> {
	@IsString()
	private readonly id?: string;

	@IsOptional()
	@IsString()
	private readonly image?: string;

	@IsString()
	private readonly instituteName?: string;

	@IsString()
	private readonly name?: string;

	@IsString()
	private readonly placeOfWorkId?: string;

	@IsString()
	private readonly placeOfWorkName?: string;

	@IsOptional()
	@IsEmail()
	private readonly publicEmailAddress?: string;

	@IsOptional()
	@IsEmail()
	private readonly workEmailAddress?: string;

	@IsOptional()
	@IsString()
	private readonly publicPhone?: string;

	@IsOptional()
	@IsString()
	private readonly workPhone?: string;


	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.id = typeof input['Id'] === 'string' ? input['Id'].trim() : undefined;
			this.image = typeof input['Kep'] === 'string' ? input['Kep'].trim() : undefined;
			this.instituteName = typeof input['IntezmenyNev'] === 'string' ? input['IntezmenyNev'].trim() : undefined;
			this.name = typeof input['Nev'] === 'string' ? input['Nev'].trim() : undefined;
			this.placeOfWorkId = typeof input['FeladatEllatasiHelyId'] === 'string' ? input['FeladatEllatasiHelyId'].trim() : undefined;
			this.placeOfWorkName = typeof input['FeladatEllatasiHelyNev'] === 'string' ? input['FeladatEllatasiHelyNev'].trim() : undefined;
			this.publicEmailAddress = typeof input['PublikusEmailCim'] === 'string' ? input['PublikusEmailCim'].trim() : undefined;
			this.workEmailAddress = typeof input['MunkahelyiEmailCim'] === 'string' ? input['MunkahelyiEmailCim'].trim() : undefined;
			this.publicPhone = typeof input['PublikusTelefonszam'] === 'string' ? input['PublikusTelefonszam'].trim() : undefined;
			this.workPhone = typeof input['MunkahelyiTelefonszam'] === 'string' ? input['MunkahelyiTelefonszam'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Id(): string | undefined {
		return this.id;
	}

	public get Kep(): string | undefined {
		return this.image;
	}

	public get IntezmenyNev(): string | undefined {
		return this.instituteName;
	}

	public get Nev(): string | undefined {
		return this.name;
	}

	public get FeladatEllatasiHelyId(): string | undefined {
		return this.placeOfWorkId;
	}

	public get FeladatEllatasiHelyNev(): string | undefined {
		return this.placeOfWorkName;
	}

	public get PublikusEmailCim(): string | undefined {
		return this.publicEmailAddress;
	}

	public get MunkahelyiEmailCim(): string | undefined {
		return this.workEmailAddress;
	}

	public get PublikusTelefonszam(): string | undefined {
		return this.publicPhone;
	}

	public get MunkahelyiTelefonszam(): string | undefined {
		return this.workPhone;
	}

	public get json(): TeacherProfileFields {
		return {
			FeladatEllatasiHelyId: this.placeOfWorkId,
			FeladatEllatasiHelyNev: this.placeOfWorkName,
			Id: this.id,
			IntezmenyNev: this.instituteName,
			Kep: this.image,
			MunkahelyiEmailCim: this.workEmailAddress,
			MunkahelyiTelefonszam: this.workPhone,
			Nev: this.name,
			PublikusEmailCim: this.publicEmailAddress,
			PublikusTelefonszam: this.publicPhone,
		} as TeacherProfileFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<TeacherProfileFields> = {
			Id: this.id,
			Kep: this.image,
			IntezmenyNev: this.instituteName,
			Nev: this.name,
			FeladatEllatasiHelyId: this.placeOfWorkId,
			FeladatEllatasiHelyNev: this.placeOfWorkName,
			PublikusEmailCim: this.publicEmailAddress,
			MunkahelyiEmailCim: this.workEmailAddress,
			PublikusTelefonszam: this.publicPhone,
			MunkahelyiTelefonszam: this.workPhone,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof TeacherProfileFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
