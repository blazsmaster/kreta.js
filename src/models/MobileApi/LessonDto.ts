import AttachmentDto from './Lesson/AttachmentDto';
import UidNameStructure from './UidNameStructure';
import ValueDescriptor from './ValueDescriptor';
import SubjectDescriptor from './SubjectDescriptor';
import { IsArray, IsBoolean, IsDate, IsInstance, IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface LessonFields {
	BejelentettSzamonkeresUid?: string;
	Csatolmanyok?: Array<AttachmentDto>;
	OsztalyCsoport: UidNameStructure;
	Oraszam?: number;
	TeremNeve?: string;
	FeladatGroupUid?: string;
	DigitalisEszkozTipus?: string;
	DigitalisPlatformTipus?: string;
	VegIdopont: Date;
	HaziFeladatUid?: string;
	IsTanuloHaziFeladatEnabled: boolean;
	IsDigitalisOra: boolean;
	NyelviFeladatGroupUid?: string;
	OraEvesSorszama?: number;
	Nev?: string;
	TanuloJelenlet?: ValueDescriptor;
	KezdetIdopont: Date;
	Allapot: ValueDescriptor;
	Tantargy: SubjectDescriptor;
	HelyettesTanarNeve?: string;
	DigitalisTamogatoEszkozTipusList?: string[];
	TanarNeve?: string;
	Tema?: string;
	Tipus: ValueDescriptor;
	Uid: string;
	Datum: Date;
	Letrehozas: Date;
	UtolsoModositas: Date;
}

export default class LessonDto implements Partial<LessonFields> {
	@IsOptional()
	@IsString()
	private readonly announcedTestUid?: string;

	@IsOptional()
	@IsArray()
	@IsInstance(AttachmentDto, { each: true })
	private readonly attachments?: Array<AttachmentDto>;

	@IsInstance(UidNameStructure)
	private readonly classGroup?: UidNameStructure;

	@IsOptional()
	@IsNumber()
	private readonly classScheduleNumber?: number;

	@IsOptional()
	@IsString()
	private readonly classroom?: string;

	@IsOptional()
	@IsString()
	private readonly classworkGroupId?: string;

	@IsOptional()
	@IsString()
	private readonly digitalInstrumentType?: string;

	@IsOptional()
	@IsString()
	private readonly digitalPlatformType?: string;

	@IsDate()
	private readonly endTimeAsString?: Date;

	@IsOptional()
	@IsString()
	private readonly homeWorkUid?: string;

	@IsBoolean()
	private readonly homeworkEditedByStudentEnabled?: boolean;

	@IsBoolean()
	private readonly isDigitalLesson?: boolean;

	@IsOptional()
	@IsString()
	private readonly languageTaskGroupId?: string;

	@IsOptional()
	@IsNumber()
	private readonly lessonNumber?: number;

	@IsOptional()
	@IsString()
	private readonly name?: string;

	@IsOptional()
	@IsInstance(ValueDescriptor)
	private readonly presence?: ValueDescriptor;

	@IsDate()
	private readonly startTimeAsString?: Date;

	@IsInstance(ValueDescriptor)
	private readonly state?: ValueDescriptor;

	@IsInstance(SubjectDescriptor)
	private readonly subject?: SubjectDescriptor;

	@IsOptional()
	@IsString()
	private readonly supplyTeacher?: string;

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	private readonly supportedDigitalInstrumentTypes?: string[];

	@IsOptional()
	@IsString()
	private readonly teacher?: string;

	@IsOptional()
	@IsString()
	private readonly topic?: string;

	@IsInstance(ValueDescriptor)
	private readonly type?: ValueDescriptor;

	@IsString()
	private readonly uid?: string;

	@IsDate()
	private readonly date?: Date;

	@IsDate()
	private readonly creation?: Date;

	@IsDate()
	private readonly lastModification?: Date;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.announcedTestUid = typeof input['BejelentettSzamonkeresUid'] === 'string' ? input['BejelentettSzamonkeresUid'].trim() : undefined;
			this.attachments = typeof input['Csatolmanyok'] === 'object' ? input['Csatolmanyok'].map((e: any) => new AttachmentDto(e)) :
				undefined;
			this.classGroup = typeof input['OsztalyCsoport'] === 'object' ? new UidNameStructure(input['OsztalyCsoport']) : undefined;
			this.classScheduleNumber = typeof input['Oraszam'] === 'number' ? input['Oraszam'] : undefined;
			this.classroom = typeof input['TeremNeve'] === 'string' ? input['TeremNeve'].trim() : undefined;
			this.classworkGroupId = typeof input['FeladatGroupUid'] === 'string' ? input['FeladatGroupUid'].trim() : undefined;
			this.digitalInstrumentType = typeof input['DigitalisEszkozTipus'] === 'string' ? input['DigitalisEszkozTipus'].trim() : undefined;
			this.digitalPlatformType = typeof input['DigitalisPlatformTipus'] === 'string' ? input['DigitalisPlatformTipus'].trim() : undefined;
			this.endTimeAsString = typeof input['VegIdopont'] === 'string' ? new Date(input['VegIdopont']) : undefined;
			this.homeWorkUid = typeof input['HaziFeladatUid'] === 'string' ? input['HaziFeladatUid'].trim() : undefined;
			this.homeworkEditedByStudentEnabled = typeof input['IsTanuloHaziFeladatEnabled'] === 'boolean' ? input['IsTanuloHaziFeladatEnabled'] :
				undefined;
			this.isDigitalLesson = typeof input['IsDigitalisOra'] === 'boolean' ? input['IsDigitalisOra'] : undefined;
			this.languageTaskGroupId = typeof input['NyelviFeladatGroupUid'] === 'string' ? input['NyelviFeladatGroupUid'] : undefined;
			this.lessonNumber = typeof input['OraEvesSorszama'] === 'number' ? input['OraEvesSorszama'] : undefined;
			this.name = typeof input['Nev'] === 'string' ? input['Nev'] : undefined;
			this.presence = typeof input['TanuloJelenlet'] === 'object' ? new ValueDescriptor(input['TanuloJelenlet']) : undefined;
			this.startTimeAsString = typeof input['KezdetIdopont'] === 'string' ? new Date(input['KezdetIdopont']) : undefined;
			this.state = typeof input['Allapot'] === 'object' ? new ValueDescriptor(input['Allapot']) : undefined;
			this.subject = typeof input['Tantargy'] === 'object' ? new SubjectDescriptor(input['Tantargy']) : undefined;
			this.supplyTeacher = typeof input['HelyettesTanarNeve'] === 'string' ? input['HelyettesTanarNeve'] : undefined;
			this.supportedDigitalInstrumentTypes = Array.isArray(input['DigitalisTamogatoEszkozTipusList']) ?
				input['DigitalisTamogatoEszkozTipusList'].map((item: any) => item) : undefined;
			this.teacher = typeof input['TanarNeve'] === 'string' ? input['TanarNeve'] : undefined;
			this.topic = typeof input['Tema'] === 'string' ? input['Tema'] : undefined;
			this.type = typeof input['Tipus'] === 'object' ? new ValueDescriptor(input['Tipus']) : undefined;
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'] : undefined;
			this.date = typeof input['Datum'] === 'string' ? new Date(input['Datum']) : undefined;
			this.creation = typeof input['Letrehozas'] === 'string' ? new Date(input['Letrehozas']) : undefined;
			this.lastModification = typeof input['UtolsoModositas'] === 'string' ? new Date(input['UtolsoModositas']) : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get BejelentettSzamonkeresUid(): string | undefined {
		return this.announcedTestUid;
	}

	public get Csatolmanyok(): Array<AttachmentDto> | undefined {
		return this.attachments;
	}

	public get OsztalyCsoport(): UidNameStructure | undefined {
		return this.classGroup;
	}

	public get Oraszam(): number | undefined {
		return this.classScheduleNumber;
	}

	public get TeremNeve(): string | undefined {
		return this.classroom;
	}

	public get FeladatGroupUid(): string | undefined {
		return this.classworkGroupId;
	}

	public get DigitalisEszkozTipus(): string | undefined {
		return this.digitalInstrumentType;
	}

	public get DigitalisPlatformTipus(): string | undefined {
		return this.digitalPlatformType;
	}

	public get VegIdopont(): Date | undefined {
		return this.endTimeAsString;
	}

	public get HaziFeladatUid(): string | undefined {
		return this.homeWorkUid;
	}

	public get IsTanuloHaziFeladatEnabled(): boolean | undefined {
		return this.homeworkEditedByStudentEnabled;
	}

	public get IsDigitalisOra(): boolean | undefined {
		return this.isDigitalLesson;
	}

	public get NyelviFeladatGroupUid(): string | undefined {
		return this.languageTaskGroupId;
	}

	public get OraEvesSorszama(): number | undefined {
		return this.lessonNumber;
	}

	public get Nev(): string | undefined {
		return this.name;
	}

	public get TanuloJelenlet(): ValueDescriptor | undefined {
		return this.presence;
	}

	public get KezdetIdopont(): Date | undefined {
		return this.startTimeAsString;
	}

	public get Allapot(): ValueDescriptor | undefined {
		return this.state;
	}

	public get Tantargy(): SubjectDescriptor | undefined {
		return this.subject;
	}

	public get HelyettesTanarNeve(): string | undefined {
		return this.supplyTeacher;
	}

	public get DigitalisTamogatoEszkozTipusList(): Array<string> | undefined {
		return this.supportedDigitalInstrumentTypes;
	}

	public get TanarNeve(): string | undefined {
		return this.teacher;
	}

	public get Tema(): string | undefined {
		return this.topic;
	}

	public get Tipus(): ValueDescriptor | undefined {
		return this.type;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	public get Datum(): Date | undefined {
		return this.date;
	}

	public get Letrehozas(): Date | undefined {
		return this.creation;
	}

	public get UtolsoModositas(): Date | undefined {
		return this.lastModification;
	}

	public get json(): LessonFields {
		return {
			Allapot: this.state?.json,
			BejelentettSzamonkeresUid: this.announcedTestUid,
			Csatolmanyok: this.attachments,
			Datum: this.date,
			DigitalisEszkozTipus: this.digitalInstrumentType,
			DigitalisPlatformTipus: this.digitalPlatformType,
			DigitalisTamogatoEszkozTipusList: this.supportedDigitalInstrumentTypes,
			FeladatGroupUid: this.classworkGroupId,
			HaziFeladatUid: this.homeWorkUid,
			HelyettesTanarNeve: this.supplyTeacher,
			IsDigitalisOra: this.isDigitalLesson,
			IsTanuloHaziFeladatEnabled: this.homeworkEditedByStudentEnabled,
			KezdetIdopont: this.startTimeAsString,
			Letrehozas: this.creation,
			Nev: this.name,
			NyelviFeladatGroupUid: this.languageTaskGroupId,
			OraEvesSorszama: this.lessonNumber,
			Oraszam: this.classScheduleNumber,
			OsztalyCsoport: this.classGroup?.json,
			TanarNeve: this.teacher,
			Tantargy: this.subject?.json,
			TanuloJelenlet: this.presence?.json,
			Tema: this.topic,
			TeremNeve: this.classroom,
			Tipus: this.type?.json,
			Uid: this.uid,
			UtolsoModositas: this.lastModification,
			VegIdopont: this.endTimeAsString,
		} as LessonFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<LessonFields> = {
			BejelentettSzamonkeresUid: this.announcedTestUid,
			Csatolmanyok: this.attachments,
			OsztalyCsoport: this.classGroup,
			Oraszam: this.classScheduleNumber,
			TeremNeve: this.classroom,
			FeladatGroupUid: this.classworkGroupId,
			DigitalisEszkozTipus: this.digitalInstrumentType,
			DigitalisPlatformTipus: this.digitalPlatformType,
			VegIdopont: this.endTimeAsString,
			HaziFeladatUid: this.homeWorkUid,
			IsTanuloHaziFeladatEnabled: this.homeworkEditedByStudentEnabled,
			IsDigitalisOra: this.isDigitalLesson,
			NyelviFeladatGroupUid: this.languageTaskGroupId,
			OraEvesSorszama: this.lessonNumber,
			Nev: this.name,
			TanuloJelenlet: this.presence,
			KezdetIdopont: this.startTimeAsString,
			Allapot: this.state,
			Tantargy: this.subject,
			HelyettesTanarNeve: this.supplyTeacher,
			DigitalisTamogatoEszkozTipusList: this.supportedDigitalInstrumentTypes,
			TanarNeve: this.teacher,
			Tema: this.topic,
			Tipus: this.type,
			Uid: this.uid,
			Datum: this.date,
			Letrehozas: this.creation,
			UtolsoModositas: this.lastModification,
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
