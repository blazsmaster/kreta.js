import { IsDate, IsNumber, validateSync, ValidationError } from 'class-validator';

export interface AverageWithTimeFields {
	Atlag: number;
	Datum: Date;
}

export default class AverageWithTimeDto implements Partial<AverageWithTimeFields> {
	@IsNumber()
	private readonly average?: number;

	@IsDate()
	private readonly date?: Date;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.average = typeof input['Atlag'] === 'number' ? input['Atlag'] : undefined;
			this.date = typeof input['Datum'] === 'string' ? new Date(input['Datum']) : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Atlag(): number | undefined {
		return this.average;
	}

	public get Datum(): Date | undefined {
		return this.date;
	}

	public get json(): AverageWithTimeFields {
		return {
			Atlag: this.average,
			Datum: this.date,
		} as AverageWithTimeFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<AverageWithTimeFields> = {
			Atlag: this.average,
			Datum: this.date,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof AverageWithTimeFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
