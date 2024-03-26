import { IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface FieldsStudentEvaluationLast {
	OsztalyzatTipus?: number;
	Szazalek?: number;
	Szoveg?: string;
}

export default class StudentEvaluationLastDto implements Partial<FieldsStudentEvaluationLast> {
	@IsOptional()
	@IsNumber()
	private readonly evaluationMarkId?: number;

	@IsOptional()
	@IsNumber()
	private readonly percentage?: number;

	@IsOptional()
	@IsString()
	private readonly text?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.evaluationMarkId = typeof input['OsztalyzatTipus'] === 'number' ? input['OsztalyzatTipus'] : undefined;
			this.percentage = typeof input['Szazalek'] === 'number' ? input['Szazalek'] : undefined;
			this.text = typeof input['Szoveg'] === 'string' ? input['Szoveg'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get OsztalyzatTipus(): number | undefined {
		return this.evaluationMarkId;
	}

	public get Szazalek(): number | undefined {
		return this.percentage;
	}

	public get Szoveg(): string | undefined {
		return this.text;
	}

	public get json(): FieldsStudentEvaluationLast {
		return {
			OsztalyzatTipus: this.evaluationMarkId,
			Szazalek: this.percentage,
			Szoveg: this.text,
		} as FieldsStudentEvaluationLast;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<FieldsStudentEvaluationLast> = {
			OsztalyzatTipus: this.evaluationMarkId,
			Szazalek: this.percentage,
			Szoveg: this.text,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof FieldsStudentEvaluationLast] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}

