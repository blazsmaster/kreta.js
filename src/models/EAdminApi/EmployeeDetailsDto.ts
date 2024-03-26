import { IsBoolean, IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface EmployeeDetailsFields {
	osztalyHelyettes?: string;
	osztalyHelyettesKretaAzonosito?: number;
	oktatasiAzonosito?: string;
	osztaly?: string;
	isAdmin?: boolean;
	isOsztalyfonok?: boolean;
	isTorolt?: boolean;
	isOsztalyfonokHelyettes?: boolean;
	isIgazgatoHelyettes?: boolean;
	isIgazgato?: boolean;
	isAlairo?: boolean;
	isTanar?: boolean;
	osztalyKretaAzonosito?: number;
	kretaAzonosito?: number;
	nev?: string;
	titulus?: string;
}

export default class EmployeeDetailsDto implements Partial<EmployeeDetailsFields> {
	@IsOptional()
	@IsString()
	private readonly classSubstitute?: string;

	@IsOptional()
	@IsNumber()
	private readonly classSubstituteKretaId?: number;

	@IsOptional()
	@IsString()
	private readonly educatedId?: string;

	@IsOptional()
	@IsString()
	private readonly educationClass?: string;

	@IsOptional()
	@IsBoolean()
	private readonly _isAdmin?: boolean;

	@IsOptional()
	@IsBoolean()
	private readonly isClassMaster?: boolean;

	@IsOptional()
	@IsBoolean()
	private readonly isDeleted?: boolean;

	@IsOptional()
	@IsBoolean()
	private readonly isDeputyClassMaster?: boolean;

	@IsOptional()
	@IsBoolean()
	private readonly isDeputyDirector?: boolean;

	@IsOptional()
	@IsBoolean()
	private readonly isDirector?: boolean;

	@IsOptional()
	@IsBoolean()
	private readonly isSignatory?: boolean;

	@IsOptional()
	@IsBoolean()
	private readonly isTeacher?: boolean;

	@IsOptional()
	@IsNumber()
	private readonly kretaClassId?: number;

	@IsOptional()
	@IsNumber()
	private readonly kretaId?: number;

	@IsOptional()
	@IsString()
	private readonly name?: string;

	@IsOptional()
	@IsString()
	private readonly title?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.classSubstitute = typeof input['osztalyHelyettes'] === 'string' ? input['osztalyHelyettes'].trim() : undefined;
			this.classSubstituteKretaId = typeof input['osztalyHelyettesKretaAzonosito'] === 'number' ? input['osztalyHelyettesKretaAzonosito'] :
				undefined;
			this.educatedId = typeof input['oktatasiAzonosito'] === 'string' ? input['oktatasiAzonosito'].trim() : undefined;
			this.educationClass = typeof input['osztaly'] === 'string' ? input['osztaly'].trim() : undefined;
			this._isAdmin = typeof input['isAdmin'] === 'boolean' ? input['isAdmin'] : undefined;
			this.isClassMaster = typeof input['isOsztalyfonok'] === 'boolean' ? input['isOsztalyfonok'] : undefined;
			this.isDeleted = typeof input['isTorolt'] === 'boolean' ? input['isTorolt'] : undefined;
			this.isDeputyClassMaster = typeof input['isOsztalyfonokHelyettes'] === 'boolean' ? input['isOsztalyfonokHelyettes'] : undefined;
			this.isDeputyDirector = typeof input['isIgazgatoHelyettes'] === 'boolean' ? input['isIgazgatoHelyettes'] : undefined;
			this.isDirector = typeof input['isIgazgato'] === 'boolean' ? input['isIgazgato'] : undefined;
			this.isSignatory = typeof input['isAlairo'] === 'boolean' ? input['isAlairo'] : undefined;
			this.isTeacher = typeof input['isTanar'] === 'boolean' ? input['isTanar'] : undefined;
			this.kretaClassId = typeof input['osztalyKretaAzonosito'] === 'number' ? input['osztalyKretaAzonosito'] : undefined;
			this.kretaId = typeof input['kretaAzonosito'] === 'number' ? input['kretaAzonosito'] : undefined;
			this.name = typeof input['nev'] === 'string' ? input['nev'].trim() : undefined;
			this.title = typeof input['titulus'] === 'string' ? input['titulus'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get osztalyHelyettes(): string | undefined {
		return this.classSubstitute;
	}

	public get osztalyHelyettesKretaAzonosito(): number | undefined {
		return this.classSubstituteKretaId;
	}

	public get oktatasiAzonosito(): string | undefined {
		return this.educatedId;
	}

	public get osztaly(): string | undefined {
		return this.educationClass;
	}

	public get isAdmin(): boolean | undefined {
		return this._isAdmin;
	}

	public get isOsztalyfonok(): boolean | undefined {
		return this.isClassMaster;
	}

	public get isTorolt(): boolean | undefined {
		return this.isDeleted;
	}

	public get isOsztalyfonokHelyettes(): boolean | undefined {
		return this.isDeputyClassMaster;
	}

	public get isIgazgatoHelyettes(): boolean | undefined {
		return this.isDeputyDirector;
	}

	public get isIgazgato(): boolean | undefined {
		return this.isDirector;
	}

	public get isAlairo(): boolean | undefined {
		return this.isSignatory;
	}

	public get isTanar(): boolean | undefined {
		return this.isTeacher;
	}

	public get osztalyKretaAzonosito(): number | undefined {
		return this.kretaClassId;
	}

	public get kretaAzonosito(): number | undefined {
		return this.kretaId;
	}

	public get nev(): string | undefined {
		return this.name;
	}

	public get titulus(): string | undefined {
		return this.title;
	}

	public get json(): EmployeeDetailsFields {
		return {
			isAdmin: this._isAdmin,
			isAlairo: this.isSignatory,
			isIgazgato: this.isDirector,
			isIgazgatoHelyettes: this.isDeputyDirector,
			isOsztalyfonok: this.isClassMaster,
			isOsztalyfonokHelyettes: this.isDeputyClassMaster,
			isTanar: this.isTeacher,
			isTorolt: this.isDeleted,
			kretaAzonosito: this.kretaId,
			nev: this.name,
			oktatasiAzonosito: this.educatedId,
			osztaly: this.educationClass,
			osztalyHelyettes: this.classSubstitute,
			osztalyHelyettesKretaAzonosito: this.classSubstituteKretaId,
			osztalyKretaAzonosito: this.kretaClassId,
			titulus: this.title,
		} as EmployeeDetailsFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<EmployeeDetailsFields> = {
			osztalyHelyettes: this.classSubstitute,
			osztalyHelyettesKretaAzonosito: this.classSubstituteKretaId,
			oktatasiAzonosito: this.educatedId,
			osztaly: this.educationClass,
			isAdmin: this._isAdmin,
			isOsztalyfonok: this.isClassMaster,
			isTorolt: this.isDeleted,
			isOsztalyfonokHelyettes: this.isDeputyClassMaster,
			isIgazgatoHelyettes: this.isDeputyDirector,
			isIgazgato: this.isDirector,
			isAlairo: this.isSignatory,
			isTanar: this.isTeacher,
			osztalyKretaAzonosito: this.kretaClassId,
			kretaAzonosito: this.kretaId,
			nev: this.name,
			titulus: this.title,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof EmployeeDetailsFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
