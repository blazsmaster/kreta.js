import { IsDate, IsInstance, IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';
import ValueDescriptor from './ValueDescriptor';
import UidStructure from './UidStructure';
import SubjectDescriptor from './SubjectDescriptor';
import LessonDto from './Omission/LessonDto';

export interface OmissionFields {
	KeszitesDatuma: Date;
	Datum: Date;
	KesesPercben?: number;
	OsztalyCsoport: UidStructure;
	IgazolasAllapota: string;
	IgazolasTipusa?: ValueDescriptor;
	Ora: LessonDto;
	Mod: ValueDescriptor;
	Tantargy: SubjectDescriptor;
	RogzitoTanarNeve: string;
	Tipus: ValueDescriptor;
	Uid: string;
}

export default class OmissionDto implements Partial<OmissionFields> {
	@IsDate()
	private readonly creatingTime?: Date;

	@IsDate()
	private readonly date?: Date;

	@IsOptional()
	@IsNumber()
	private readonly delayTimeMinutes?: number;

	@IsInstance(UidStructure)
	private readonly group?: UidStructure;

	@IsString()
	private readonly justificationState?: string;

	@IsOptional()
	@IsInstance(ValueDescriptor)
	private readonly justificationType?: ValueDescriptor;

	@IsInstance(LessonDto)
	private readonly lesson?: LessonDto;

	@IsInstance(ValueDescriptor)
	private readonly mode?: ValueDescriptor;

	@IsInstance(SubjectDescriptor)
	private readonly subject?: SubjectDescriptor;

	@IsString()
	private readonly teacher?: string;

	@IsInstance(ValueDescriptor)
	private readonly type?: ValueDescriptor;

	@IsString()
	private readonly uid?: string;


	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.creatingTime = typeof input['KeszitesDatuma'] === 'string' ? new Date(input['KeszitesDatuma']) : undefined;
			this.date = typeof input['Datum'] === 'string' ? new Date(input['Datum']) : undefined;
			this.delayTimeMinutes = typeof input['KesesPercben'] === 'number' ? input['KesesPercben'] : undefined;
			this.group = typeof input['OsztalyCsoport'] === 'object' ? new UidStructure(input['OsztalyCsoport']) : undefined;
			this.justificationState = typeof input['IgazolasAllapota'] === 'string' ? input['IgazolasAllapota'].trim() : undefined;
			this.justificationType = typeof input['IgazolasTipusa'] === 'object' ? new ValueDescriptor(input['IgazolasTipusa']) : undefined;
			this.lesson = typeof input['Ora'] === 'object' ? new LessonDto(input['Ora']) : undefined;
			this.mode = typeof input['Mod'] === 'object' ? new ValueDescriptor(input['Mod']) : undefined;
			this.subject = typeof input['Tantargy'] === 'object' ? new SubjectDescriptor(input['Tantargy']) : undefined;
			this.teacher = typeof input['RogzitoTanarNeve'] === 'string' ? input['RogzitoTanarNeve'].trim() : undefined;
			this.type = typeof input['Tipus'] === 'object' ? new ValueDescriptor(input['Tipus']) : undefined;
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get KeszitesDatuma(): Date | undefined {
		return this.creatingTime;
	}

	public get Datum(): Date | undefined {
		return this.date;
	}

	public get KesesPercben(): number | undefined {
		return this.delayTimeMinutes;
	}

	public get OsztalyCsoport(): UidStructure | undefined {
		return this.group;
	}

	public get IgazolasAllapota(): string | undefined {
		return this.justificationState;
	}

	public get IgazolasTipusa(): ValueDescriptor | undefined {
		return this.justificationType;
	}

	public get Ora(): LessonDto | undefined {
		return this.lesson;
	}

	public get Mod(): ValueDescriptor | undefined {
		return this.mode;
	}

	public get Tantargy(): SubjectDescriptor | undefined {
		return this.subject;
	}

	public get RogzitoTanarNeve(): string | undefined {
		return this.teacher;
	}

	public get Tipus(): ValueDescriptor | undefined {
		return this.type;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	public get json(): OmissionFields {
		return {
			Datum: this.date,
			IgazolasAllapota: this.justificationState,
			IgazolasTipusa: this.justificationType?.json,
			KesesPercben: this.delayTimeMinutes,
			KeszitesDatuma: this.creatingTime,
			Mod: this.mode?.json,
			Ora: this.lesson?.json,
			OsztalyCsoport: this.group?.json,
			RogzitoTanarNeve: this.teacher,
			Tantargy: this.subject?.json,
			Tipus: this.type?.json,
			Uid: this.uid,
		} as OmissionFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<OmissionFields> = {
			KeszitesDatuma: this.creatingTime,
			Datum: this.date,
			KesesPercben: this.delayTimeMinutes,
			OsztalyCsoport: this.group,
			IgazolasAllapota: this.justificationState,
			IgazolasTipusa: this.justificationType,
			Ora: this.lesson,
			Mod: this.mode,
			Tantargy: this.subject,
			RogzitoTanarNeve: this.teacher,
			Tipus: this.type,
			Uid: this.uid,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof OmissionFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
