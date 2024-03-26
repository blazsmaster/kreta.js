import { IsDate, IsInstance, IsNumber, IsOptional, validateSync, ValidationError } from 'class-validator';
import StudentEvaluationExemptionDto from './StudentEvaluationExemptionDto';
import StudentEvaluationLastDto from './StudentEvaluationLastDto';

export interface StudentEvaluationFields {
	TanuloUtolsoErtekeles?: StudentEvaluationLastDto;
	TanuloUtolsoErtekelesDatum?: Date;
	TanuloTantargyiAtlag: number;
	TanuloErtekelesFelmentes: StudentEvaluationExemptionDto;
	TanuloId: number;
	TanuloErtekelesSzam: number;
}

export default class StudentEvaluationDto implements Partial<StudentEvaluationFields> {
	@IsOptional()
	@IsInstance(StudentEvaluationLastDto)
	private readonly lastEvaluation?: StudentEvaluationLastDto;

	@IsOptional()
	@IsDate()
	private readonly lastEvaluationDate?: Date;

	@IsNumber()
	private readonly studentAverage?: number;

	@IsInstance(StudentEvaluationExemptionDto)
	private readonly studentEvaluationExemption?: StudentEvaluationExemptionDto;

	@IsNumber()
	private readonly studentId?: number;

	@IsNumber()
	private readonly studentSumEvaluation?: number;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.lastEvaluation = input['TanuloUtolsoErtekeles'] ? new StudentEvaluationLastDto(input['TanuloUtolsoErtekeles']) : undefined;
			this.lastEvaluationDate = input['TanuloUtolsoErtekelesDatum'] ? new Date(input['TanuloUtolsoErtekelesDatum']) : undefined;
			this.studentAverage = typeof input['TanuloTantargyiAtlag'] === 'number' ? input['TanuloTantargyiAtlag'] : 0;
			this.studentEvaluationExemption = new StudentEvaluationExemptionDto(input['TanuloErtekelesFelmentes']);
			this.studentId = typeof input['TanuloId'] === 'number' ? input['TanuloId'] : 0;
			this.studentSumEvaluation = typeof input['TanuloErtekelesSzam'] === 'number' ? input['TanuloErtekelesSzam'] : 0;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get TanuloUtolsoErtekeles(): StudentEvaluationLastDto | undefined {
		return this.lastEvaluation;
	}

	public get TanuloUtolsoErtekelesDatum(): Date | undefined {
		return this.lastEvaluationDate;
	}

	public get TanuloTantargyiAtlag(): number | undefined {
		return this.studentAverage;
	}

	public get TanuloErtekelesFelmentes(): StudentEvaluationExemptionDto | undefined {
		return this.studentEvaluationExemption;
	}

	public get TanuloId(): number | undefined {
		return this.studentId;
	}

	public get TanuloErtekelesSzam(): number | undefined {
		return this.studentSumEvaluation;
	}

	public get json(): StudentEvaluationFields {
		return {
			TanuloUtolsoErtekeles: this.lastEvaluation?.json,
			TanuloUtolsoErtekelesDatum: this.lastEvaluationDate,
			TanuloTantargyiAtlag: this.studentAverage,
			TanuloErtekelesFelmentes: this.studentEvaluationExemption?.json,
			TanuloId: this.studentId,
			TanuloErtekelesSzam: this.studentSumEvaluation,
		} as StudentEvaluationFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<StudentEvaluationFields> = {
			TanuloUtolsoErtekeles: this.lastEvaluation,
			TanuloUtolsoErtekelesDatum: this.lastEvaluationDate,
			TanuloTantargyiAtlag: this.studentAverage,
			TanuloErtekelesFelmentes: this.studentEvaluationExemption,
			TanuloId: this.studentId,
			TanuloErtekelesSzam: this.studentSumEvaluation,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof StudentEvaluationFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}

