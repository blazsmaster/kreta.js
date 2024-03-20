import { IsDate, IsInstance, IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';
import UidStructure from './UidStructure';
import ValueDescriptor from './ValueDescriptor';
import SubjectDescriptor from './SubjectDescriptor';

export interface AnnouncedTestFields {
	TantargyNeve?: string;
	BejelentesDatuma: Date;
	OrarendiOraOraszama: number;
	Datum: Date;
	OsztalyCsoport: UidStructure;
	Modja: ValueDescriptor;
	Tantargy?: SubjectDescriptor;
	RogzitoTanarNeve: string;
	Temaja?: string;
	Uid: string;
}

export default class AnnouncedTestDto implements Partial<AnnouncedTestFields> {
	@IsOptional()
	@IsString()
	private readonly _subjectName?: string;

	@IsDate()
	private readonly announcedAt?: Date;

	@IsNumber()
	private readonly classScheduleNumber?: number;

	@IsDate()
	private readonly date?: Date;

	@IsInstance(UidStructure)
	private readonly group?: UidStructure;

	@IsInstance(ValueDescriptor)
	private readonly mode?: ValueDescriptor;

	@IsInstance(SubjectDescriptor)
	private readonly subject?: SubjectDescriptor;

	@IsString()
	private readonly teacher?: string;

	@IsOptional()
	@IsString()
	private readonly theme?: string;

	@IsString()
	private readonly uid?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this._subjectName = typeof input['TantargyNeve'] === 'string' ? input['TantargyNeve'].trim() : undefined;
			this.announcedAt = typeof input['BejelentesDatuma'] === 'string' ? new Date(input['BejelentesDatuma']) : undefined;
			this.classScheduleNumber = typeof input['OrarendiOraOraszama'] === 'number' ? input['OrarendiOraOraszama'] : undefined;
			this.date = typeof input['Datum'] === 'string' ? new Date(input['Datum']) : undefined;
			this.group = typeof input['OsztalyCsoport'] === 'object' ? new UidStructure(input['OsztalyCsoport']) : undefined;
			this.mode = typeof input['Modja'] === 'object' ? new ValueDescriptor(input['Modja']) : undefined;
			this.subject = typeof input['Tantargy'] === 'object' ? new SubjectDescriptor(input['Tantargy']) : undefined;
			this.teacher = typeof input['RogzitoTanarNeve'] === 'string' ? input['RogzitoTanarNeve'].trim() : undefined;
			this.theme = typeof input['Temaja'] === 'string' ? input['Temaja'].trim() : undefined;
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get TantargyNeve(): string | undefined {
		return this._subjectName;
	}

	public get BejelentesDatuma(): Date | undefined {
		return this.announcedAt;
	}

	public get OrarendiOraOraszama(): number | undefined {
		return this.classScheduleNumber;
	}

	public get Datum(): Date | undefined {
		return this.date;
	}

	public get OsztalyCsoport(): UidStructure | undefined {
		return this.group;
	}

	public get Modja(): ValueDescriptor | undefined {
		return this.mode;
	}

	public get Tantargy(): SubjectDescriptor | undefined {
		return this.subject;
	}

	public get RogzitoTanarNeve(): string | undefined {
		return this.teacher;
	}

	public get Temaja(): string | undefined {
		return this.theme;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	public get json(): AnnouncedTestFields {
		return {
			BejelentesDatuma: this.announcedAt,
			Datum: this.date,
			Modja: this.mode?.json,
			OsztalyCsoport: this.group?.json,
			RogzitoTanarNeve: this.teacher,
			Tantargy: this.subject?.json,
			TantargyNeve: this._subjectName,
			Temaja: this.theme,
			Uid: this.uid,
		} as AnnouncedTestFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<AnnouncedTestFields> = {
			TantargyNeve: this._subjectName,
			BejelentesDatuma: this.announcedAt,
			Datum: this.date,
			OsztalyCsoport: this.group,
			Modja: this.mode,
			Tantargy: this.subject,
			RogzitoTanarNeve: this.teacher,
			Temaja: this.theme,
			Uid: this.uid,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof AnnouncedTestFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
