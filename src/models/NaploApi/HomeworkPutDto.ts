import { IsDate, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface HomeworkPutFields {
	HataridoDatuma?: Date;
	Szoveg?: string;
}

export default class HomeworkPutDto implements Partial<HomeworkPutFields> {
	@IsOptional()
	@IsDate()
	private readonly deadline?: Date;

	@IsOptional()
	@IsString()
	private readonly description?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.deadline = typeof input['HataridoDatuma'] === 'string' ? new Date(input['HataridoDatuma']) : input['HataridoDatuma'];
			this.description = typeof input['Szoveg'] === 'string' ? input['Szoveg'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get HataridoDatuma(): Date | undefined {
		return this.deadline;
	}

	public get Szoveg(): string | undefined {
		return this.description;
	}

	public get json(): HomeworkPutFields {
		return {
			HataridoDatuma: this.deadline,
			Szoveg: this.description,
		} as HomeworkPutFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<HomeworkPutFields> = {
			HataridoDatuma: this.deadline,
			Szoveg: this.description,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof HomeworkPutFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
