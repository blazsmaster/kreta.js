import { IsNumber, IsString, validateSync, ValidationError } from 'class-validator';

export interface EvaluationModeFields {
	Leiras: string;
	Id: number;
	Nev: string;
}

export default class EvaluationModeDto implements Partial<EvaluationModeFields> {
	@IsString()
	private readonly description?: string;

	@IsNumber()
	private readonly id?: number;

	@IsString()
	private readonly name?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.description = typeof input['Leiras'] === 'string' ? input['Leiras'] : undefined;
			this.id = typeof input['Id'] === 'number' ? input['Id'] : undefined;
			this.name = typeof input['Nev'] === 'string' ? input['Nev'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Leiras(): string | undefined {
		return this.description;
	}

	public get Id(): number | undefined {
		return this.id;
	}

	public get Nev(): string | undefined {
		return this.name;
	}

	public get json(): EvaluationModeFields {
		return {
			Id: this.id,
			Leiras: this.description,
			Nev: this.name,
		} as EvaluationModeFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<EvaluationModeFields> = {
			Leiras: this.description,
			Id: this.id,
			Nev: this.name,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof EvaluationModeFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
