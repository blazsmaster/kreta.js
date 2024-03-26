import { IsDate, IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface EvaluationUpdateRequestFields {
	ErtekelesDatum: Date;
	ErtekelesOsztalyzatId?: number;
	ErtekelesSzazalek?: number;
	ErtekelesSzoveg?: string;
	ErtekelesModId: number;
	ErtekelesTema: string;
}

export default class EvaluationUpdateRequestDto implements Partial<EvaluationUpdateRequestFields> {
	@IsDate()
	private readonly date?: Date;

	@IsOptional()
	@IsNumber()
	private readonly evaluationGradeTypeId?: number;

	@IsOptional()
	@IsNumber()
	private readonly evaluationPercent?: number;

	@IsOptional()
	@IsString()
	private readonly evaluationText?: string;

	@IsNumber()
	private readonly modeId?: number;

	@IsString()
	private readonly topic?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.date = typeof input['ErtekelesDatum'] === 'string' ? new Date(input['ErtekelesDatum']) : input['ErtekelesDatum'];
			this.evaluationGradeTypeId = typeof input['ErtekelesOsztalyzatId'] === 'number' ? input['ErtekelesOsztalyzatId'] : undefined;
			this.evaluationPercent = typeof input['ErtekelesSzazalek'] === 'number' ? input['ErtekelesSzazalek'] : undefined;
			this.evaluationText = typeof input['ErtekelesSzoveg'] === 'string' ? input['ErtekelesSzoveg'] : undefined;
			this.modeId = typeof input['ErtekelesModId'] === 'number' ? input['ErtekelesModId'] : undefined;
			this.topic = typeof input['ErtekelesTema'] === 'string' ? input['ErtekelesTema'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get ErtekelesDatum(): Date | undefined {
		return this.date;
	}

	public get ErtekelesOsztalyzatId(): number | undefined {
		return this.evaluationGradeTypeId;
	}

	public get ErtekelesSzazalek(): number | undefined {
		return this.evaluationPercent;
	}

	public get ErtekelesSzoveg(): string | undefined {
		return this.evaluationText;
	}

	public get ErtekelesModId(): number | undefined {
		return this.modeId;
	}

	public get ErtekelesTema(): string | undefined {
		return this.topic;
	}

	public get json(): EvaluationUpdateRequestFields {
		return {
			ErtekelesDatum: this.date,
			ErtekelesModId: this.modeId,
			ErtekelesOsztalyzatId: this.evaluationGradeTypeId,
			ErtekelesSzazalek: this.evaluationPercent,
			ErtekelesSzoveg: this.evaluationText,
			ErtekelesTema: this.topic,
		} as EvaluationUpdateRequestFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<EvaluationUpdateRequestFields> = {
			ErtekelesDatum: this.date,
			ErtekelesOsztalyzatId: this.evaluationGradeTypeId,
			ErtekelesSzazalek: this.evaluationPercent,
			ErtekelesSzoveg: this.evaluationText,
			ErtekelesModId: this.modeId,
			ErtekelesTema: this.topic,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof EvaluationUpdateRequestFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
