import { IsDate, IsNumber, IsOptional, validateSync, ValidationError } from 'class-validator';

export interface LessonFields {
	VegDatum: Date;
	Oraszam?: number;
	KezdoDatum: Date;
}

export default class LessonDto implements Partial<LessonFields> {
	@IsDate()
	private readonly endTime?: Date;

	@IsOptional()
	@IsNumber()
	private readonly scheduleNumber?: number;

	@IsDate()
	private readonly startTime?: Date;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.endTime = typeof input['VegDatum'] === 'string' ? new Date(input['VegDatum']) : undefined;
			this.scheduleNumber = typeof input['Oraszam'] === 'number' ? input['Oraszam'] : undefined;
			this.startTime = typeof input['KezdoDatum'] === 'string' ? new Date(input['KezdoDatum']) : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get VegDatum(): Date | undefined {
		return this.endTime;
	}

	public get Oraszam(): number | undefined {
		return this.scheduleNumber;
	}

	public get KezdoDatum(): Date | undefined {
		return this.startTime;
	}

	public get json(): LessonFields {
		return {
			KezdoDatum: this.startTime,
			Oraszam: this.scheduleNumber,
			VegDatum: this.endTime,
		} as LessonFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<LessonFields> = {
			VegDatum: this.endTime,
			Oraszam: this.scheduleNumber,
			KezdoDatum: this.startTime,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof LessonFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
