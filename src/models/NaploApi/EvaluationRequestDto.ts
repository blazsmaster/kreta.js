import { IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface EvaulationRequestFields {
	OsztalyzatTipus?: number;
	Szazalek?: string;
	Szoveg?: string;
}

export default class EvaulationRequestDto implements Partial<EvaulationRequestFields> {
	@IsOptional()
	@IsNumber()
	private readonly evaluationMarkId?: number;

	@IsOptional()
	@IsString()
	private readonly percentage?: string;

	@IsOptional()
	@IsString()
	private readonly text?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.evaluationMarkId = typeof input['OsztalyzatTipus'] === 'number' ? input['OsztalyzatTipus'] : undefined;
			this.percentage = typeof input['Szazalek'] === 'string' ? input['Szazalek'] : undefined;
			this.text = typeof input['Szoveg'] === 'string' ? input['Szoveg'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get OsztalyzatTipus(): number | undefined {
		return this.evaluationMarkId;
	}

	public get Szazalek(): string | undefined {
		return this.percentage;
	}

	public get Szoveg(): string | undefined {
		return this.text;
	}

	public get json(): EvaulationRequestFields {
		return {
			OsztalyzatTipus: this.evaluationMarkId,
			Szazalek: this.percentage,
			Szoveg: this.text,
		} as EvaulationRequestFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<EvaulationRequestFields> = {
			OsztalyzatTipus: this.evaluationMarkId,
			Szazalek: this.percentage,
			Szoveg: this.text,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof EvaulationRequestFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
