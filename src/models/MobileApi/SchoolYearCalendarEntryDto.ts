import { IsDate, IsInstance, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';
import ValueDescriptor from './ValueDescriptor';
import UidStructure from './UidStructure';

export interface SchoolYearCalendarEntryFields {
	Datum: Date;
	Naptipus: ValueDescriptor;
	OsztalyCsoport?: UidStructure;
	ElteroOrarendSzerintiTanitasiNap?: ValueDescriptor;
	Uid: string;
	OrarendiNapHetirendje: ValueDescriptor;
}

export default class SchoolYearCalendarEntryDto implements Partial<SchoolYearCalendarEntryFields> {
	@IsDate()
	private readonly date?: Date;

	@IsInstance(ValueDescriptor)
	private readonly dayType?: ValueDescriptor;

	@IsOptional()
	@IsInstance(UidStructure)
	private readonly group?: UidStructure;

	@IsOptional()
	@IsInstance(ValueDescriptor)
	private readonly irregularDay?: ValueDescriptor;

	@IsString()
	private readonly uid?: string;

	@IsInstance(ValueDescriptor)
	private readonly weekTypeSchedule?: ValueDescriptor;


	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.date = typeof input['Datum'] === 'string' ? new Date(input['Datum']) : undefined;
			this.dayType = typeof input['Naptipus'] === 'object' ? new ValueDescriptor(input['Naptipus']) : undefined;
			this.group = typeof input['OsztalyCsoport'] === 'object' ? new UidStructure(input['OsztalyCsoport']) : undefined;
			this.irregularDay = typeof input['ElteroOrarendSzerintiTanitasiNap'] === 'object' ?
				new ValueDescriptor(input['ElteroOrarendSzerintiTanitasiNap']) : undefined;
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'].trim() : undefined;
			this.weekTypeSchedule = typeof input['OrarendiNapHetirendje'] === 'object' ? new ValueDescriptor(input['OrarendiNapHetirendje']) :
				undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Datum(): Date | undefined {
		return this.date;
	}

	public get Naptipus(): ValueDescriptor | undefined {
		return this.dayType;
	}

	public get OsztalyCsoport(): UidStructure | undefined {
		return this.group;
	}

	public get ElteroOrarendSzerintiTanitasiNap(): ValueDescriptor | undefined {
		return this.irregularDay;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	public get OrarendiNapHetirendje(): ValueDescriptor | undefined {
		return this.weekTypeSchedule;
	}

	public get json(): SchoolYearCalendarEntryFields {
		return {
			Datum: this.date,
			ElteroOrarendSzerintiTanitasiNap: this.irregularDay?.json,
			Naptipus: this.dayType?.json,
			OrarendiNapHetirendje: this.weekTypeSchedule?.json,
			OsztalyCsoport: this.group?.json,
			Uid: this.uid,
		} as SchoolYearCalendarEntryFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<SchoolYearCalendarEntryFields> = {
			Datum: this.date,
			Naptipus: this.dayType,
			OsztalyCsoport: this.group,
			ElteroOrarendSzerintiTanitasiNap: this.irregularDay,
			Uid: this.uid,
			OrarendiNapHetirendje: this.weekTypeSchedule,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof SchoolYearCalendarEntryFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
