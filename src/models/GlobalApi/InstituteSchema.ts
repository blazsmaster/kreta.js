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

export default class InstituteSchema implements Partial<InstituteFields> {
	@IsString()
	private readonly _id?: string;

	@IsString()
	private readonly _azonosito?: string;

	@IsString()
	private readonly _nev?: string;

	@IsString()
	private readonly _rovidNev?: string;

	@IsString()
	private readonly _omKod?: string;

	@IsString()
	private readonly _kretaLink?: string;

	@IsString()
	private readonly _telepules?: string;

	@IsNumber()
	private readonly _aktivTanevId?: number;

	@IsString()
	private readonly _aktivTanevGuid?: string;

	@IsString()
	private readonly _aktivTanevNev?: string;

	@IsNumber()
	private readonly _kornyezetId?: number;

	@IsString()
	private readonly _kornyezetNev?: string;

	@IsString()
	private readonly _kornyezetTeljesNev?: string;

	@IsString()
	private readonly _fenntartoAzonosito?: string;

	@IsString()
	private readonly _fenntartoNev?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this._id = typeof input['id'] === 'string' ? input['id'].trim() : undefined;
			this._azonosito = typeof input['azonosito'] === 'string' ? input['azonosito'].trim() : undefined;
			this._nev = typeof input['nev'] === 'string' ? input['nev'].trim() : undefined;
			this._rovidNev = typeof input['rovidNev'] === 'string' ? input['rovidNev'].trim() : undefined;
			this._omKod = typeof input['omKod'] === 'string' ? input['omKod'].trim() : undefined;
			this._kretaLink = typeof input['kretaLink'] === 'string' ? input['kretaLink'].trim() : undefined;
			this._telepules = typeof input['telepules'] === 'string' ? input['telepules'].trim() : undefined;
			this._aktivTanevId = typeof input['aktivTanevId'] === 'number' ? input['aktivTanevId'] : undefined;
			this._aktivTanevGuid = typeof input['aktivTanevGuid'] === 'string' ? input['aktivTanevGuid'].trim() : undefined;
			this._aktivTanevNev = typeof input['aktivTanevNev'] === 'string' ? input['aktivTanevNev'].trim() : undefined;
			this._kornyezetId = typeof input['kornyezetId'] === 'number' ? input['kornyezetId'] : undefined;
			this._kornyezetNev = typeof input['kornyezetNev'] === 'string' ? input['kornyezetNev'].trim() : undefined;
			this._kornyezetTeljesNev = typeof input['kornyezetTeljesNev'] === 'string' ? input['kornyezetTeljesNev'].trim() : undefined;
			this._fenntartoAzonosito = typeof input['fenntartoAzonosito'] === 'string' ? input['fenntartoAzonosito'].trim() : undefined;
			this._fenntartoNev = typeof input['fenntartoNev'] === 'string' ? input['fenntartoNev'].trim() : undefined;
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
		return this._azonosito;
	}

	public get nev(): string | undefined {
		return this._nev;
	}

	public get rovidNev(): string | undefined {
		return this._rovidNev;
	}

	public get omKod(): string | undefined {
		return this._omKod;
	}

	public get kretaLink(): string | undefined {
		return this._kretaLink;
	}

	public get telepules(): string | undefined {
		return this._telepules;
	}

	public get aktivTanevId(): number | undefined {
		return this._aktivTanevId;
	}

	public get aktivTanevGuid(): string | undefined {
		return this._aktivTanevGuid;
	}

	public get aktivTanevNev(): string | undefined {
		return this._aktivTanevNev;
	}

	public get kornyezetId(): number | undefined {
		return this._kornyezetId;
	}

	public get kornyezetNev(): string | undefined {
		return this._kornyezetNev;
	}

	public get kornyezetTeljesNev(): string | undefined {
		return this._kornyezetTeljesNev;
	}

	public get fenntartoAzonosito(): string | undefined {
		return this._fenntartoAzonosito;
	}

	public get fenntartoNev(): string | undefined {
		return this._fenntartoNev;
	}

	public get json(): InstituteFields {
		return {
			id: this._id,
			azonosito: this._azonosito,
			nev: this._nev,
			rovidNev: this._rovidNev,
			omKod: this._omKod,
			kretaLink: this._kretaLink,
			telepules: this._telepules,
			aktivTanevId: this._aktivTanevId,
			aktivTanevGuid: this._aktivTanevGuid,
			aktivTanevNev: this._aktivTanevNev,
			kornyezetId: this._kornyezetId,
			kornyezetNev: this._kornyezetNev,
			kornyezetTeljesNev: this._kornyezetTeljesNev,
			fenntartoAzonosito: this._fenntartoAzonosito,
			fenntartoNev: this._fenntartoNev,
		} as InstituteFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<InstituteFields> = {
			id: this._id,
			azonosito: this._azonosito,
			nev: this._nev,
			rovidNev: this._rovidNev,
			omKod: this._omKod,
			kretaLink: this._kretaLink,
			telepules: this._telepules,
			aktivTanevId: this._aktivTanevId,
			aktivTanevGuid: this._aktivTanevGuid,
			aktivTanevNev: this._aktivTanevNev,
			kornyezetId: this._kornyezetId,
			kornyezetNev: this._kornyezetNev,
			kornyezetTeljesNev: this._kornyezetTeljesNev,
			fenntartoAzonosito: this._fenntartoAzonosito,
			fenntartoNev: this._fenntartoNev,
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
