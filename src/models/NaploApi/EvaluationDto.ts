import { IsDate, IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface EvaluationFields {
	OsztalyCsoportId: number;
	Ertekeles?: string;
	ErtekelesRogzitesDatum: Date;
	ErtekelesDatum: Date;
	ErtekelesOsztalyzatId?: number;
	ErtekelesOsztalyzatNev?: string;
	ErtekelesId: number;
	ErtekelesSzoveg?: string;
	ErtekelesTema?: string;
	ErtekelesTipusId?: number;
	ErtekelesTipusNev?: string;
	Naplozart: boolean;
	ErtekelesModId?: number;
	ErtekelesModNev?: string;
	ErtekelesSzazalek?: number;
	TantargyId: number;
	TantargyNev: string;
	TanarNev: string;
	TanarUid: string;
	ErtekelesFajtaId: number;
	ErtekelesSuly?: number;
}

export default class EvaluationDto implements Partial<EvaluationFields> {
	@IsNumber()
	private readonly classGroupId?: number;

	@IsOptional()
	@IsString()
	private readonly evaluation?: string;

	@IsDate()
	private readonly evaluationCreationDate?: Date;

	@IsDate()
	private readonly evaluationDate?: Date;

	@IsOptional()
	@IsNumber()
	private readonly evaluationGradeId?: number;

	@IsOptional()
	@IsString()
	private readonly evaluationGradeName?: string;

	@IsNumber()
	private readonly evaluationId?: number;

	@IsOptional()
	@IsString()
	private readonly evaluationText?: string;

	@IsOptional()
	@IsString()
	private readonly evaluationTopic?: string;

	@IsOptional()
	@IsNumber()
	private readonly evaluationTypeId?: number;

	@IsOptional()
	@IsString()
	private readonly evaluationTypeName?: string;

	@IsOptional()
	@IsString()
	private readonly gradebookClosed?: boolean;

	@IsOptional()
	@IsNumber()
	private readonly modeId?: number;

	@IsOptional()
	@IsString()
	private readonly modeName?: string;

	@IsOptional()
	@IsNumber()
	private readonly percent?: number;

	@IsNumber()
	private readonly subjectId?: number;

	@IsString()
	private readonly subjectName?: string;

	@IsString()
	private readonly teacherName?: string;

	@IsString()
	private readonly teacherUid?: string;

	@IsNumber()
	private readonly typeId?: number;

	@IsOptional()
	@IsNumber()
	private readonly weight?: number;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.classGroupId = typeof input['OsztalyCsoportId'] === 'number' ? input['OsztalyCsoportId'] : undefined;
			this.evaluation = typeof input['Ertekeles'] === 'string' ? input['Ertekeles'] : undefined;
			this.evaluationCreationDate = typeof input['ErtekelesRogzitesDatum'] === 'string' ? new Date(input['ErtekelesRogzitesDatum']) :
				input['ErtekelesRogzitesDatum'];
			this.evaluationDate = typeof input['ErtekelesDatum'] === 'string' ? new Date(input['ErtekelesDatum']) : input['ErtekelesDatum'];
			this.evaluationGradeId = typeof input['ErtekelesOsztalyzatId'] === 'number' ? input['ErtekelesOsztalyzatId'] : undefined;
			this.evaluationGradeName = typeof input['ErtekelesOsztalyzatNev'] === 'string' ? input['ErtekelesOsztalyzatNev'] : undefined;
			this.evaluationId = typeof input['ErtekelesId'] === 'number' ? input['ErtekelesId'] : undefined;
			this.evaluationText = typeof input['ErtekelesSzoveg'] === 'string' ? input['ErtekelesSzoveg'] : undefined;
			this.evaluationTopic = typeof input['ErtekelesTema'] === 'string' ? input['ErtekelesTema'] : undefined;
			this.evaluationTypeId = typeof input['ErtekelesTipusId'] === 'number' ? input['ErtekelesTipusId'] : undefined;
			this.evaluationTypeName = typeof input['ErtekelesTipusNev'] === 'string' ? input['ErtekelesTipusNev'] : undefined;
			this.gradebookClosed = typeof input['Naplozart'] === 'boolean' ? input['Naplozart'] : undefined;
			this.modeId = typeof input['ErtekelesModId'] === 'number' ? input['ErtekelesModId'] : undefined;
			this.modeName = typeof input['ErtekelesModNev'] === 'string' ? input['ErtekelesModNev'] : undefined;
			this.percent = typeof input['ErtekelesSzazalek'] === 'number' ? input['ErtekelesSzazalek'] : undefined;
			this.subjectId = typeof input['TantargyId'] === 'number' ? input['TantargyId'] : undefined;
			this.subjectName = typeof input['TantargyNev'] === 'string' ? input['TantargyNev'] : undefined;
			this.teacherName = typeof input['TanarNev'] === 'string' ? input['TanarNev'] : undefined;
			this.teacherUid = typeof input['TanarUid'] === 'string' ? input['TanarUid'] : undefined;
			this.typeId = typeof input['ErtekelesFajtaId'] === 'number' ? input['ErtekelesFajtaId'] : undefined;
			this.weight = typeof input['ErtekelesSuly'] === 'number' ? input['ErtekelesSuly'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get OsztalyCsoportId(): number | undefined {
		return this.classGroupId;
	}

	public get Ertekeles(): string | undefined {
		return this.evaluation;
	}

	public get ErtekelesRogzitesDatum(): Date | undefined {
		return this.evaluationCreationDate;
	}

	public get ErtekelesDatum(): Date | undefined {
		return this.evaluationDate;
	}

	public get ErtekelesOsztalyzatId(): number | undefined {
		return this.evaluationGradeId;
	}

	public get ErtekelesOsztalyzatNev(): string | undefined {
		return this.evaluationGradeName;
	}

	public get ErtekelesId(): number | undefined {
		return this.evaluationId;
	}

	public get ErtekelesSzoveg(): string | undefined {
		return this.evaluationText;
	}

	public get ErtekelesTema(): string | undefined {
		return this.evaluationTopic;
	}

	public get ErtekelesTipusId(): number | undefined {
		return this.evaluationTypeId;
	}

	public get ErtekelesTipusNev(): string | undefined {
		return this.evaluationTypeName;
	}

	public get Naplozart(): boolean | undefined {
		return this.gradebookClosed;
	}

	public get ErtekelesModId(): number | undefined {
		return this.modeId;
	}

	public get ErtekelesModNev(): string | undefined {
		return this.modeName;
	}

	public get ErtekelesSzazalek(): number | undefined {
		return this.percent;
	}

	public get TantargyId(): number | undefined {
		return this.subjectId;
	}

	public get TantargyNev(): string | undefined {
		return this.subjectName;
	}

	public get TanarNev(): string | undefined {
		return this.teacherName;
	}

	public get TanarUid(): string | undefined {
		return this.teacherUid;
	}

	public get ErtekelesFajtaId(): number | undefined {
		return this.typeId;
	}

	public get ErtekelesSuly(): number | undefined {
		return this.weight;
	}

	public get json(): EvaluationFields {
		return {
			Ertekeles: this.evaluation,
			ErtekelesDatum: this.evaluationDate,
			ErtekelesFajtaId: this.typeId,
			ErtekelesId: this.evaluationId,
			ErtekelesModId: this.modeId,
			ErtekelesModNev: this.modeName,
			ErtekelesOsztalyzatId: this.evaluationGradeId,
			ErtekelesOsztalyzatNev: this.evaluationGradeName,
			ErtekelesRogzitesDatum: this.evaluationCreationDate,
			ErtekelesSuly: this.weight,
			ErtekelesSzazalek: this.percent,
			ErtekelesSzoveg: this.evaluationText,
			ErtekelesTema: this.evaluationTopic,
			ErtekelesTipusId: this.evaluationTypeId,
			ErtekelesTipusNev: this.evaluationTypeName,
			Naplozart: this.gradebookClosed,
			OsztalyCsoportId: this.classGroupId,
			TanarNev: this.teacherName,
			TanarUid: this.teacherUid,
			TantargyId: this.subjectId,
			TantargyNev: this.subjectName,
		} as EvaluationFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<EvaluationFields> = {
			OsztalyCsoportId: this.classGroupId,
			Ertekeles: this.evaluation,
			ErtekelesRogzitesDatum: this.evaluationCreationDate,
			ErtekelesDatum: this.evaluationDate,
			ErtekelesOsztalyzatId: this.evaluationGradeId,
			ErtekelesOsztalyzatNev: this.evaluationGradeName,
			ErtekelesId: this.evaluationId,
			ErtekelesSzoveg: this.evaluationText,
			ErtekelesTema: this.evaluationTopic,
			ErtekelesTipusId: this.evaluationTypeId,
			ErtekelesTipusNev: this.evaluationTypeName,
			Naplozart: this.gradebookClosed,
			ErtekelesModId: this.modeId,
			ErtekelesModNev: this.modeName,
			ErtekelesSzazalek: this.percent,
			TantargyId: this.subjectId,
			TantargyNev: this.subjectName,
			TanarNev: this.teacherName,
			TanarUid: this.teacherUid,
			ErtekelesFajtaId: this.typeId,
			ErtekelesSuly: this.weight,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof EvaluationFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
