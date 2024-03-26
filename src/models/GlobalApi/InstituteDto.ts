import { IsNumber, IsString, validateSync, ValidationError } from 'class-validator';

export interface InstituteFields {
	id: string;
	azonosito: string;
	nev: string;
	rovidNev: string;
	omKod: string;
	kretaLink: string;
	telepules: string;
	aktivTanevId: number;
	aktivTanevGuid: string;
	aktivTanevNev: string;
	kornyezetId: number;
	kornyezetNev: string;
	kornyezetTeljesNev: string;
	fenntartoAzonosito: string;
	fenntartoNev: string;
}

export default class InstituteDto implements Partial<InstituteFields> {
	@IsString()
	private readonly _id?: string;

	@IsString()
	private readonly instituteCode?: string;

	@IsString()
	private readonly name?: string;

	@IsString()
	private readonly shortName?: string;

	@IsString()
	private readonly omCode?: string;

	@IsString()
	private readonly _kretaLink?: string;

	@IsString()
	private readonly city?: string;

	@IsNumber()
	private readonly activeYearId?: number;

	@IsString()
	private readonly activeYearGuid?: string;

	@IsString()
	private readonly activeYearName?: string;

	@IsNumber()
	private readonly environmentId?: number;

	@IsString()
	private readonly environmentName?: string;

	@IsString()
	private readonly environmentFullName?: string;

	@IsString()
	private readonly maintainerIdentifier?: string;

	@IsString()
	private readonly maintainerName?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this._id = typeof input['id'] === 'string' ? input['id'].trim() : undefined;
			this.instituteCode = typeof input['azonosito'] === 'string' ? input['azonosito'].trim() : undefined;
			this.name = typeof input['nev'] === 'string' ? input['nev'].trim() : undefined;
			this.shortName = typeof input['rovidNev'] === 'string' ? input['rovidNev'].trim() : undefined;
			this.omCode = typeof input['omKod'] === 'string' ? input['omKod'].trim() : undefined;
			this._kretaLink = typeof input['kretaLink'] === 'string' ? input['kretaLink'].trim() : undefined;
			this.city = typeof input['telepules'] === 'string' ? input['telepules'].trim() : undefined;
			this.activeYearId = typeof input['aktivTanevId'] === 'number' ? input['aktivTanevId'] : undefined;
			this.activeYearGuid = typeof input['aktivTanevGuid'] === 'string' ? input['aktivTanevGuid'].trim() : undefined;
			this.activeYearName = typeof input['aktivTanevNev'] === 'string' ? input['aktivTanevNev'].trim() : undefined;
			this.environmentId = typeof input['kornyezetId'] === 'number' ? input['kornyezetId'] : undefined;
			this.environmentName = typeof input['kornyezetNev'] === 'string' ? input['kornyezetNev'].trim() : undefined;
			this.environmentFullName = typeof input['kornyezetTeljesNev'] === 'string' ? input['kornyezetTeljesNev'].trim() : undefined;
			this.maintainerIdentifier = typeof input['fenntartoAzonosito'] === 'string' ? input['fenntartoAzonosito'].trim() : undefined;
			this.maintainerName = typeof input['fenntartoNev'] === 'string' ? input['fenntartoNev'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get id(): string | undefined {
		return this._id;
	}

	public get azonosito(): string | undefined {
		return this.instituteCode;
	}

	public get nev(): string | undefined {
		return this.name;
	}

	public get rovidNev(): string | undefined {
		return this.shortName;
	}

	public get omKod(): string | undefined {
		return this.omCode;
	}

	public get kretaLink(): string | undefined {
		return this._kretaLink;
	}

	public get telepules(): string | undefined {
		return this.city;
	}

	public get aktivTanevId(): number | undefined {
		return this.activeYearId;
	}

	public get aktivTanevGuid(): string | undefined {
		return this.activeYearGuid;
	}

	public get aktivTanevNev(): string | undefined {
		return this.activeYearName;
	}

	public get kornyezetId(): number | undefined {
		return this.environmentId;
	}

	public get kornyezetNev(): string | undefined {
		return this.environmentName;
	}

	public get kornyezetTeljesNev(): string | undefined {
		return this.environmentFullName;
	}

	public get fenntartoAzonosito(): string | undefined {
		return this.maintainerIdentifier;
	}

	public get fenntartoNev(): string | undefined {
		return this.maintainerName;
	}

	public get json(): InstituteFields {
		return {
			aktivTanevGuid: this.activeYearGuid,
			aktivTanevId: this.activeYearId,
			aktivTanevNev: this.activeYearName,
			azonosito: this.instituteCode,
			fenntartoAzonosito: this.maintainerIdentifier,
			fenntartoNev: this.maintainerName,
			id: this._id,
			kornyezetId: this.environmentId,
			kornyezetNev: this.environmentName,
			kornyezetTeljesNev: this.environmentFullName,
			kretaLink: this._kretaLink,
			nev: this.name,
			omKod: this.omCode,
			rovidNev: this.shortName,
			telepules: this.city,
		} as InstituteFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<InstituteFields> = {
			id: this._id,
			azonosito: this.instituteCode,
			nev: this.name,
			rovidNev: this.shortName,
			omKod: this.omCode,
			kretaLink: this._kretaLink,
			telepules: this.city,
			aktivTanevId: this.activeYearId,
			aktivTanevGuid: this.activeYearGuid,
			aktivTanevNev: this.activeYearName,
			kornyezetId: this.environmentId,
			kornyezetNev: this.environmentName,
			kornyezetTeljesNev: this.environmentFullName,
			fenntartoAzonosito: this.maintainerIdentifier,
			fenntartoNev: this.maintainerName,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof InstituteFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
