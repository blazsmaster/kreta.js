import { IsBoolean, IsDate, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface LepEventFields {
	Helyszin: string;
	Datum: Date;
	EloadasVege: Date;
	EloadasKezdete: Date;
	EloadasNev: string;
	GondviseloElfogadas: boolean;
	Megjelent: boolean;
	SzervezetNev: string;
	Uid: string;
}

export default class LepEventDto implements Partial<LepEventFields> {
	@IsString()
	private readonly address?: string;

	@IsDate()
	private readonly creationDate?: Date;

	@IsDate()
	private readonly eventEndTime?: Date;

	@IsDate()
	private readonly eventStartTime?: Date;

	@IsString()
	private readonly eventTitle?: string;

	@IsOptional()
	@IsBoolean()
	private readonly hasGuardianPermission?: boolean;

	@IsBoolean()
	private readonly hasStudentAppeared?: boolean;

	@IsString()
	private readonly organizationName?: string;

	@IsString()
	private readonly uid?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.address = typeof input['Helyszin'] === 'string' ? input['Helyszin'].trim() : undefined;
			this.creationDate = typeof input['Datum'] === 'string' ? new Date(input['Datum']) : undefined;
			this.eventEndTime = typeof input['EloadasVege'] === 'string' ? new Date(input['EloadasVege']) : undefined;
			this.eventStartTime = typeof input['EloadasKezdete'] === 'string' ? new Date(input['EloadasKezdete']) : undefined;
			this.eventTitle = typeof input['EloadasNev'] === 'string' ? input['EloadasNev'].trim() : undefined;
			this.hasGuardianPermission = typeof input['GondviseloElfogadas'] === 'boolean' ? input['GondviseloElfogadas'] : undefined;
			this.hasStudentAppeared = typeof input['Megjelent'] === 'boolean' ? input['Megjelent'] : undefined;
			this.organizationName = typeof input['SzervezetNev'] === 'string' ? input['SzervezetNev'].trim() : undefined;
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Helyszin(): string | undefined {
		return this.address;
	}

	public get Datum(): Date | undefined {
		return this.creationDate;
	}

	public get EloadasVege(): Date | undefined {
		return this.eventEndTime;
	}

	public get EloadasKezdete(): Date | undefined {
		return this.eventStartTime;
	}

	public get EloadasNev(): string | undefined {
		return this.eventTitle;
	}

	public get GondviseloElfogadas(): boolean | undefined {
		return this.hasGuardianPermission;
	}

	public get Megjelent(): boolean | undefined {
		return this.hasStudentAppeared;
	}

	public get SzervezetNev(): string | undefined {
		return this.organizationName;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	public get json(): LepEventFields {
		return {
			Datum: this.creationDate,
			EloadasKezdete: this.eventStartTime,
			EloadasNev: this.eventTitle,
			EloadasVege: this.eventEndTime,
			GondviseloElfogadas: this.hasGuardianPermission,
			Helyszin: this.address,
			Megjelent: this.hasStudentAppeared,
			SzervezetNev: this.organizationName,
			Uid: this.uid,
		} as LepEventFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<LepEventFields> = {
			Helyszin: this.address,
			Datum: this.creationDate,
			EloadasVege: this.eventEndTime,
			EloadasKezdete: this.eventStartTime,
			EloadasNev: this.eventTitle,
			GondviseloElfogadas: this.hasGuardianPermission,
			Megjelent: this.hasStudentAppeared,
			SzervezetNev: this.organizationName,
			Uid: this.uid,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof LepEventFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
