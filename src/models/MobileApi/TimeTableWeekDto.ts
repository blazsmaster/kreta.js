import { IsDate, IsInstance, IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';
import ValueDescriptor from './ValueDescriptor';

export interface TimeTableWeekFields {
	VegNapDatuma: Date;
	HetSorszama?: number;
	KezdoNapDatuma: Date;
	Tipus?: ValueDescriptor;
	Uid: string;
}

export default class TimeTableWeekDto implements Partial<TimeTableWeekFields> {
	@IsDate()
	private readonly endDate?: Date;

	@IsOptional()
	@IsNumber()
	private readonly weekNumber?: number;

	@IsDate()
	private readonly startDate?: Date;

	@IsOptional()
	@IsInstance(ValueDescriptor)
	private readonly type?: ValueDescriptor;

	@IsString()
	private readonly uid?: string;


	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.endDate = typeof input['VegNapDatuma'] === 'string' ? new Date(input['VegNapDatuma']) : undefined;
			this.weekNumber = typeof input['HetSorszama'] === 'number' ? input['HetSorszama'] : undefined;
			this.startDate = typeof input['KezdoNapDatuma'] === 'string' ? new Date(input['KezdoNapDatuma']) : undefined;
			this.type = typeof input['Tipus'] === 'object' ? new ValueDescriptor(input['Tipus']) : undefined;
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get VegNapDatuma(): Date | undefined {
		return this.endDate;
	}

	public get HetSorszama(): number | undefined {
		return this.weekNumber;
	}

	public get KezdoNapDatuma(): Date | undefined {
		return this.startDate;
	}

	public get Tipus(): ValueDescriptor | undefined {
		return this.type;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	public get json(): TimeTableWeekFields {
		return {
			HetSorszama: this.weekNumber,
			KezdoNapDatuma: this.startDate,
			Tipus: this.type,
			Uid: this.uid,
			VegNapDatuma: this.endDate,
		} as TimeTableWeekFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<TimeTableWeekFields> = {
			VegNapDatuma: this.endDate,
			HetSorszama: this.weekNumber,
			KezdoNapDatuma: this.startDate,
			Tipus: this.type,
			Uid: this.uid,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof TimeTableWeekFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
