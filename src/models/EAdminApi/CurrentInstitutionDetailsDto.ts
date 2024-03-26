import { IsEmail, IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface CurrentInstitutionDetailsFields {
	penztarjelentesAzonositoElotag?: string;
	tankeruletNeve?: string;
	azonosito?: number;
	intezmenyCim?: string;
	kretaIntezmenyAzonosito?: string;
	isAltalanos?: boolean;
	IsUzenetKezelesElerheto?: boolean;
	isKozepfoku?: boolean;
	isSzeusz?: boolean;
	nev?: string;
	ertesitesiEmailCim?: string;
	omAzonosito?: string;
}

export default class CurrentInstitutionDetailsDto implements Partial<CurrentInstitutionDetailsFields> {
	@IsOptional()
	@IsString()
	private readonly cashReportIdPrefix?: string;

	@IsOptional()
	@IsString()
	private readonly educationDistrictName?: string;

	@IsOptional()
	@IsNumber()
	private readonly id?: number;

	@IsOptional()
	@IsString()
	private readonly institutionAddress?: string;

	@IsOptional()
	@IsString()
	private readonly institutionId?: string;

	@IsOptional()
	@IsString()
	private readonly isBasicLevel?: boolean;

	@IsOptional()
	@IsString()
	private readonly isMessageHandlingAccessible?: boolean;

	@IsOptional()
	@IsString()
	private readonly isMidLevel?: boolean;

	@IsOptional()
	@IsString()
	private readonly _isSzeusz?: boolean;

	@IsOptional()
	@IsString()
	private readonly name?: string;

	@IsOptional()
	@IsEmail()
	private readonly notificationEmailAddress?: string;

	@IsOptional()
	@IsString()
	private readonly omId?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.cashReportIdPrefix = typeof input['penztarjelentesAzonositoElotag'] === 'string' ?
				input['penztarjelentesAzonositoElotag'].trim() : undefined;
			this.educationDistrictName = typeof input['tankeruletNeve'] === 'string' ? input['tankeruletNeve'].trim() : undefined;
			this.id = typeof input['azonosito'] === 'number' ? input['azonosito'] : undefined;
			this.institutionAddress = typeof input['intezmenyCim'] === 'string' ? input['intezmenyCim'].trim() : undefined;
			this.institutionId = typeof input['kretaIntezmenyAzonosito'] === 'string' ? input['kretaIntezmenyAzonosito'].trim() : undefined;
			this.isBasicLevel = typeof input['isAltalanos'] === 'boolean' ? input['isAltalanos'] : undefined;
			this.isMessageHandlingAccessible = typeof input['IsUzenetKezelesElerheto'] === 'boolean' ? input['IsUzenetKezelesElerheto'] :
				undefined;
			this.isMidLevel = typeof input['isKozepfoku'] === 'boolean' ? input['isKozepfoku'] : undefined;
			this._isSzeusz = typeof input['isSzeusz'] === 'boolean' ? input['isSzeusz'] : undefined;
			this.name = typeof input['nev'] === 'string' ? input['nev'].trim() : undefined;
			this.notificationEmailAddress = typeof input['ertesitesiEmailCim'] === 'string' ? input['ertesitesiEmailCim'].trim() : undefined;
			this.omId = typeof input['omAzonosito'] === 'string' ? input['omAzonosito'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get penztarjelentesAzonositoElotag(): string | undefined {
		return this.cashReportIdPrefix;
	}

	public get tankeruletNeve(): string | undefined {
		return this.educationDistrictName;
	}

	public get azonosito(): number | undefined {
		return this.id;
	}

	public get intezmenyCim(): string | undefined {
		return this.institutionAddress;
	}

	public get kretaIntezmenyAzonosito(): string | undefined {
		return this.institutionId;
	}

	public get isAltalanos(): boolean | undefined {
		return this.isBasicLevel;
	}

	public get IsUzenetKezelesElerheto(): boolean | undefined {
		return this.isMessageHandlingAccessible;
	}

	public get isKozepfoku(): boolean | undefined {
		return this.isMidLevel;
	}

	public get isSzeusz(): boolean | undefined {
		return this._isSzeusz;
	}

	public get nev(): string | undefined {
		return this.name;
	}

	public get ertesitesiEmailCim(): string | undefined {
		return this.notificationEmailAddress;
	}

	public get omAzonosito(): string | undefined {
		return this.omId;
	}

	public get json(): CurrentInstitutionDetailsFields {
		return {
			IsUzenetKezelesElerheto: this.isMessageHandlingAccessible,
			azonosito: this.id,
			ertesitesiEmailCim: this.notificationEmailAddress,
			intezmenyCim: this.institutionAddress,
			isAltalanos: this.isBasicLevel,
			isKozepfoku: this.isMidLevel,
			isSzeusz: this._isSzeusz,
			kretaIntezmenyAzonosito: this.institutionId,
			nev: this.name,
			omAzonosito: this.omId,
			penztarjelentesAzonositoElotag: this.cashReportIdPrefix,
			tankeruletNeve: this.educationDistrictName,
		} as CurrentInstitutionDetailsFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<CurrentInstitutionDetailsFields> = {
			penztarjelentesAzonositoElotag: this.cashReportIdPrefix,
			tankeruletNeve: this.educationDistrictName,
			azonosito: this.id,
			intezmenyCim: this.institutionAddress,
			kretaIntezmenyAzonosito: this.institutionId,
			isAltalanos: this.isBasicLevel,
			IsUzenetKezelesElerheto: this.isMessageHandlingAccessible,
			isKozepfoku: this.isMidLevel,
			isSzeusz: this._isSzeusz,
			nev: this.name,
			ertesitesiEmailCim: this.notificationEmailAddress,
			omAzonosito: this.omId,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof CurrentInstitutionDetailsFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
