import { IsNumber, IsOptional, validateSync, ValidationError } from 'class-validator';

export interface FiledDecisionFields {
	azonosito?: number;
}

export default class FiledDecisionDto implements Partial<FiledDecisionFields> {
	@IsOptional()
	@IsNumber()
	private readonly id?: number;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.id = typeof input['azonosito'] === 'number' ? input['azonosito'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get azonosito(): number | undefined {
		return this.id;
	}

	public get json(): FiledDecisionFields {
		return {
			azonosito: this.id,
		} as FiledDecisionFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<FiledDecisionFields> = {
			azonosito: this.id,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof FiledDecisionFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
