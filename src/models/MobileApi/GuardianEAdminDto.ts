import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface GuardianEAdminFields {
	tanuloOsztalyKretaAzonosito?: number;
	emailCim?: string;
	gondviseloNev?: string;
	isTorvenyesKepviselo?: boolean;
	isSZMK?: boolean;
	isSZMKHelyettes?: boolean;
	kretaAzonosito?: number;
	rokonsagiFok?: string;
	tanuloOsztaly?: string;
	tanuloOktatasiAzonosito?: string;
	tanuloNev?: string;
	SZMKOsztaly?: string;
	sZMKOsztalyHelyettes?: string;
	sZMKOsztalyHelyettesKretaAzonosito?: number;
	sZMKOsztalyKretaAlkalmazott?: number;
	sZMKOsztalyKretaAzonosito?: number;
}

export default class GuardianEAdminDto implements Partial<GuardianEAdminFields> {
	@IsOptional()
	@IsNumber()
	private readonly classId?: number;

	@IsOptional()
	@IsEmail()
	private readonly emailAddress?: string;

	@IsOptional()
	@IsString()
	private readonly guardianName?: string;

	@IsOptional()
	@IsBoolean()
	private readonly isLegalRepresentative?: boolean;

	@IsOptional()
	@IsBoolean()
	private readonly isSzmk?: boolean;

	@IsOptional()
	@IsBoolean()
	private readonly isSzmkDeputy?: boolean;

	@IsOptional()
	@IsNumber()
	private readonly kretaId?: number;

	@IsOptional()
	@IsString()
	private readonly relationType?: string;

	@IsOptional()
	@IsString()
	private readonly studentClass?: string;

	@IsOptional()
	@IsString()
	private readonly studentId?: string;

	@IsOptional()
	@IsString()
	private readonly studentName?: string;

	@IsOptional()
	@IsString()
	private readonly szmkClass?: string;

	@IsOptional()
	@IsString()
	private readonly szmkClassDeputy?: string;

	@IsOptional()
	@IsNumber()
	private readonly szmkClassDeputyKretaId?: number;

	@IsOptional()
	@IsNumber()
	private readonly szmkClassKretaEmployee?: number;

	@IsOptional()
	@IsNumber()
	private readonly szmkClassKretaId?: number;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.classId = typeof input['tanuloOsztalyKretaAzonosito'] === 'number' ? input['tanuloOsztalyKretaAzonosito'] : undefined;
			this.emailAddress = typeof input['emailCim'] === 'string' ? input['emailCim'].trim() : undefined;
			this.guardianName = typeof input['gondviseloNev'] === 'string' ? input['gondviseloNev'].trim() : undefined;
			this.isLegalRepresentative = typeof input['isTorvenyesKepviselo'] === 'boolean' ? input['isTorvenyesKepviselo'] : undefined;
			this.isSzmk = typeof input['isSZMK'] === 'boolean' ? input['isSZMK'] : undefined;
			this.isSzmkDeputy = typeof input['isSZMKHelyettes'] === 'boolean' ? input['isSZMKHelyettes'] : undefined;
			this.kretaId = typeof input['kretaAzonosito'] === 'number' ? input['kretaAzonosito'] : undefined;
			this.relationType = typeof input['rokonsagiFok'] === 'string' ? input['rokonsagiFok'].trim() : undefined;
			this.studentClass = typeof input['tanuloOsztaly'] === 'string' ? input['tanuloOsztaly'].trim() : undefined;
			this.studentId = typeof input['tanuloOktatasiAzonosito'] === 'string' ? input['tanuloOktatasiAzonosito'].trim() : undefined;
			this.studentName = typeof input['tanuloNev'] === 'string' ? input['tanuloNev'].trim() : undefined;
			this.szmkClass = typeof input['SZMKOsztaly'] === 'string' ? input['SZMKOsztaly'].trim() : undefined;
			this.szmkClassDeputy = typeof input['sZMKOsztalyHelyettes'] === 'string' ? input['sZMKOsztalyHelyettes'].trim() : undefined;
			this.szmkClassDeputyKretaId = typeof input['sZMKOsztalyHelyettesKretaAzonosito'] === 'number' ?
				input['sZMKOsztalyHelyettesKretaAzonosito'] : undefined;
			this.szmkClassKretaEmployee = typeof input['sZMKOsztalyKretaAlkalmazott'] === 'number' ? input['sZMKOsztalyKretaAlkalmazott'] :
				undefined;
			this.szmkClassKretaId = typeof input['sZMKOsztalyKretaAzonosito'] === 'number' ? input['sZMKOsztalyKretaAzonosito'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get tanuloOsztalyKretaAzonosito(): number | undefined {
		return this.classId;
	}

	public get emailCim(): string | undefined {
		return this.emailAddress;
	}

	public get gondviseloNev(): string | undefined {
		return this.guardianName;
	}

	public get isTorvenyesKepviselo(): boolean | undefined {
		return this.isLegalRepresentative;
	}

	public get isSZMK(): boolean | undefined {
		return this.isSzmk;
	}

	public get isSZMKHelyettes(): boolean | undefined {
		return this.isSzmkDeputy;
	}

	public get kretaAzonosito(): number | undefined {
		return this.kretaId;
	}

	public get rokonsagiFok(): string | undefined {
		return this.relationType;
	}

	public get tanuloOsztaly(): string | undefined {
		return this.studentClass;
	}

	public get tanuloOktatasiAzonosito(): string | undefined {
		return this.studentId;
	}

	public get tanuloNev(): string | undefined {
		return this.studentName;
	}

	public get SZMKOsztaly(): string | undefined {
		return this.szmkClass;
	}

	public get sZMKOsztalyHelyettes(): string | undefined {
		return this.szmkClassDeputy;
	}

	public get sZMKOsztalyHelyettesKretaAzonosito(): number | undefined {
		return this.szmkClassDeputyKretaId;
	}

	public get sZMKOsztalyKretaAlkalmazott(): number | undefined {
		return this.szmkClassKretaEmployee;
	}

	public get sZMKOsztalyKretaAzonosito(): number | undefined {
		return this.szmkClassKretaId;
	}

	public get json(): GuardianEAdminFields {
		return {
			SZMKOsztaly: this.szmkClass,
			emailCim: this.emailAddress,
			gondviseloNev: this.guardianName,
			isSZMK: this.isSzmk,
			isSZMKHelyettes: this.isSzmkDeputy,
			isTorvenyesKepviselo: this.isLegalRepresentative,
			kretaAzonosito: this.kretaId,
			rokonsagiFok: this.relationType,
			sZMKOsztalyHelyettes: this.szmkClassDeputy,
			sZMKOsztalyHelyettesKretaAzonosito: this.szmkClassDeputyKretaId,
			sZMKOsztalyKretaAlkalmazott: this.szmkClassKretaEmployee,
			sZMKOsztalyKretaAzonosito: this.szmkClassKretaId,
			tanuloNev: this.studentName,
			tanuloOktatasiAzonosito: this.studentId,
			tanuloOsztaly: this.studentClass,
			tanuloOsztalyKretaAzonosito: this.classId,
		} as GuardianEAdminFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<GuardianEAdminFields> = {
			tanuloOsztalyKretaAzonosito: this.classId,
			emailCim: this.emailAddress,
			gondviseloNev: this.guardianName,
			isTorvenyesKepviselo: this.isLegalRepresentative,
			isSZMK: this.isSzmk,
			isSZMKHelyettes: this.isSzmkDeputy,
			kretaAzonosito: this.kretaId,
			rokonsagiFok: this.relationType,
			tanuloOsztaly: this.studentClass,
			tanuloOktatasiAzonosito: this.studentId,
			tanuloNev: this.studentName,
			SZMKOsztaly: this.szmkClass,
			sZMKOsztalyHelyettes: this.szmkClassDeputy,
			sZMKOsztalyHelyettesKretaAzonosito: this.szmkClassDeputyKretaId,
			sZMKOsztalyKretaAlkalmazott: this.szmkClassKretaEmployee,
			sZMKOsztalyKretaAzonosito: this.szmkClassKretaId,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof GuardianEAdminFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
