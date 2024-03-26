import { IsDate, IsNumber, IsString, validateSync, ValidationError } from 'class-validator';

export interface TimetableWeekFields {
	VegNapDatuma: Date;
	Id: string;
	HetSorszama: number;
	KezdoNapDatuma: Date;
	Hetirend?: string;
}

export default class TimetableWeekDto implements Partial<TimetableWeekFields> {
	@IsDate()
	private readonly endDate?: Date;

	@IsString()
	private readonly id?: string;

	@IsNumber()
	private readonly numberOfWeek?: number;

	@IsDate()
	private readonly startDate?: Date;

	@IsString()
	private readonly weekSchedule?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.endDate = typeof input['VegNapDatuma'] === 'string' ? new Date(input['VegNapDatuma']) : input['VegNapDatuma'];
			this.id = typeof input['Id'] === 'string' ? input['Id'].trim() : undefined;
			this.numberOfWeek = typeof input['HetSorszama'] === 'number' ? input['HetSorszama'] : undefined;
			this.startDate = typeof input['KezdoNapDatuma'] === 'string' ? new Date(input['KezdoNapDatuma']) : input['KezdoNapDatuma'];
			this.weekSchedule = typeof input['Hetirend'] === 'string' ? input['Hetirend'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get VegNapDatuma(): Date | undefined {
		return this.endDate;
	}

	public get Id(): string | undefined {
		return this.id;
	}

	public get HetSorszama(): number | undefined {
		return this.numberOfWeek;
	}

	public get KezdoNapDatuma(): Date | undefined {
		return this.startDate;
	}

	public get Hetirend(): string | undefined {
		return this.weekSchedule;
	}

	public get json(): TimetableWeekFields {
		return {
			HetSorszama: this.numberOfWeek,
			Hetirend: this.weekSchedule,
			Id: this.id,
			KezdoNapDatuma: this.startDate,
			VegNapDatuma: this.endDate,
		} as TimetableWeekFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<TimetableWeekFields> = {
			VegNapDatuma: this.endDate,
			Id: this.id,
			HetSorszama: this.numberOfWeek,
			KezdoNapDatuma: this.startDate,
			Hetirend: this.weekSchedule,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof TimetableWeekFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
