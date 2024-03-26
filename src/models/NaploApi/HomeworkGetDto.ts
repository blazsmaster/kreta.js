import { IsDate, IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface HomeworkGetFields {
	HataridoDatuma?: Date;
	Szoveg?: string;
	Id: number;
}

export default class HomeworkGetDto implements Partial<HomeworkGetFields> {
	@IsOptional()
	@IsDate()
	private readonly deadline?: Date;

	@IsOptional()
	@IsString()
	private readonly description?: string;

	@IsNumber()
	private readonly id?: number;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.deadline = typeof input['HataridoDatuma'] === 'string' ? new Date(input['HataridoDatuma']) : input['HataridoDatuma'];
			this.description = typeof input['Szoveg'] === 'string' ? input['Szoveg'] : undefined;
			this.id = typeof input['Id'] === 'number' ? input['Id'] : undefined;
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

	public get Id(): number | undefined {
		return this.id;
	}

	public get json(): HomeworkGetFields {
		return {
			HataridoDatuma: this.deadline,
			Id: this.id,
			Szoveg: this.description,
		} as HomeworkGetFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<HomeworkGetFields> = {
			HataridoDatuma: this.deadline,
			Szoveg: this.description,
			Id: this.id,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof HomeworkGetFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
