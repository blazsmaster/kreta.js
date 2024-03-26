import { IsBoolean, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface StudentEvaluationExemptionFields {
	SzovegesenErtekelheto: boolean;
	ErtekelesAloliFelmentes: boolean;
	FelmentesOka?: string;
}

export default class StudentEvaluationExemptionDto implements Partial<StudentEvaluationExemptionFields> {
	@IsBoolean()
	private readonly evaluationExemption?: boolean;

	@IsBoolean()
	private readonly evaluationAllowedByText?: boolean;

	@IsOptional()
	@IsString()
	private readonly reasonOfExemption?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.evaluationExemption = typeof input['ErtekelesAloliFelmentes'] === 'boolean' ? input['ErtekelesAloliFelmentes'] : false;
			this.evaluationAllowedByText = typeof input['SzovegesenErtekelheto'] === 'boolean' ? input['SzovegesenErtekelheto'] : false;
			this.reasonOfExemption = typeof input['FelmentesOka'] === 'string' ? input['FelmentesOka'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get ErtekelesAloliFelmentes(): boolean | undefined {
		return this.evaluationExemption;
	}

	public get SzovegesenErtekelheto(): boolean | undefined {
		return this.evaluationAllowedByText;
	}

	public get FelmentesOka(): string | undefined {
		return this.reasonOfExemption;
	}

	public get json(): StudentEvaluationExemptionFields {
		return {
			ErtekelesAloliFelmentes: this.evaluationExemption,
			FelmentesOka: this.reasonOfExemption,
			SzovegesenErtekelheto: this.evaluationAllowedByText,
		} as StudentEvaluationExemptionFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<StudentEvaluationExemptionFields> = {
			SzovegesenErtekelheto: this.evaluationAllowedByText,
			ErtekelesAloliFelmentes: this.evaluationExemption,
			FelmentesOka: this.reasonOfExemption,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof StudentEvaluationExemptionFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
