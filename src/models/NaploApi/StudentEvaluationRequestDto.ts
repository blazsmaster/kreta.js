import { IsInstance, IsNumber, validateSync, ValidationError } from 'class-validator';
import EvaulationRequestDto from './EvaluationRequestDto';

export interface StudentEvaluationRequestFields {
	Ertekeles: EvaulationRequestDto;
	TanuloId: number;
}

export default class StudentEvaluationRequestDto implements Partial<StudentEvaluationRequestFields> {
	@IsInstance(EvaulationRequestDto)
	private readonly evaluation?: EvaulationRequestDto;

	@IsNumber()
	private readonly studentId?: number;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.evaluation = typeof input['Ertekeles'] === 'object' ? new EvaulationRequestDto(input['Ertekeles']) : undefined;
			this.studentId = typeof input['TanuloId'] === 'number' ? input['TanuloId'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Ertekeles(): EvaulationRequestDto | undefined {
		return this.evaluation;
	}

	public get TanuloId(): number | undefined {
		return this.studentId;
	}

	public get json(): StudentEvaluationRequestFields {
		return {
			Ertekeles: this.evaluation?.json,
			TanuloId: this.studentId,
		} as StudentEvaluationRequestFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<StudentEvaluationRequestFields> = {
			Ertekeles: this.evaluation,
			TanuloId: this.studentId,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof StudentEvaluationRequestFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
