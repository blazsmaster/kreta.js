import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface TimetableElementFields {
	BejelenetettSzamonkeresId?: number;
	BejelentettSzamonkeresMod?: string;
	BejelentettSzamonkeresTema?: string;
	EvesOraSorszam: number;
	OsztalyCsoportId?: number;
	OsztalyCsoportNev?: string;
	Oraszam?: number;
	Terem?: string;
	Vege: Date;
	Naplozart: boolean;
	HaziFeladatId?: number;
	Nev: string;
	ElozoNaplozottOra: string;
	ElozoNaplozottOraDatum?: Date;
	ElozoNaplozottOraTema?: string;
	Kezdete: Date;
	Allapot: number;
	TantargyId?: number;
	HelyettesitoTanarNev?: string;
	HelyettesitoTanarUid?: string;
	TanarNev?: string;
	TanarUid?: string;
	Tema?: string;
	Tipus: number;
	Uid: string;
}

export default class TimetableElementDto implements Partial<TimetableElementFields> {
	@IsOptional()
	@IsNumber()
	private readonly announcedTestId?: number;

	@IsOptional()
	@IsString()
	private readonly announcedTestMode?: string;

	@IsOptional()
	@IsString()
	private readonly announcedTestTopic?: string;

	@IsNumber()
	private readonly classAnnualSerialNumber?: number;

	@IsOptional()
	@IsNumber()
	private readonly classGroupId?: number;

	@IsOptional()
	@IsString()
	private readonly classGroupName?: string;

	@IsOptional()
	@IsNumber()
	private readonly classScheduleNumber?: number;

	@IsOptional()
	@IsString()
	private readonly classroom?: string;

	@IsDate()
	private readonly endTime?: Date;

	@IsBoolean()
	private readonly gradebookClosure?: boolean;

	@IsOptional()
	@IsNumber()
	private readonly homeworkId?: number;

	@IsString()
	private readonly name?: string;

	@IsString()
	private readonly previousLoggedLesson?: string;

	@IsOptional()
	@IsDate()
	private readonly previousLoggedLessonDate?: Date;

	@IsOptional()
	@IsString()
	private readonly previousLoggedLessonTopic?: string;

	@IsDate()
	private readonly startTime?: Date;

	@IsNumber()
	private readonly status?: number;

	@IsOptional()
	@IsNumber()
	private readonly subjectId?: number;

	@IsOptional()
	@IsString()
	private readonly substituteTeacherName?: string;

	@IsOptional()
	@IsString()
	private readonly substituteTeacherUid?: string;

	@IsOptional()
	@IsString()
	private readonly teacherName?: string;

	@IsOptional()
	@IsString()
	private readonly teacherUid?: string;

	@IsOptional()
	@IsString()
	private readonly topic?: string;

	@IsString()
	private readonly type?: number;

	@IsString()
	private readonly uid?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.announcedTestId = typeof input['BejelenetettSzamonkeresId'] === 'number' ? input['BejelenetettSzamonkeresId'] : undefined;
			this.announcedTestMode = typeof input['BejelentettSzamonkeresMod'] === 'string' ? input['BejelentettSzamonkeresMod'].trim() :
				undefined;
			this.announcedTestTopic = typeof input['BejelentettSzamonkeresTema'] === 'string' ? input['BejelentettSzamonkeresTema'].trim() :
				undefined;
			this.classAnnualSerialNumber = typeof input['EvesOraSorszam'] === 'number' ? input['EvesOraSorszam'] : undefined;
			this.classGroupId = typeof input['OsztalyCsoportId'] === 'number' ? input['OsztalyCsoportId'] : undefined;
			this.classGroupName = typeof input['OsztalyCsoportNev'] === 'string' ? input['OsztalyCsoportNev'].trim() : undefined;
			this.classScheduleNumber = typeof input['Oraszam'] === 'number' ? input['Oraszam'] : undefined;
			this.classroom = typeof input['Terem'] === 'string' ? input['Terem'].trim() : undefined;
			this.endTime = typeof input['Vege'] === 'string' ? new Date(input['Vege']) : input['Vege'];
			this.gradebookClosure = typeof input['Naplozart'] === 'boolean' ? input['Naplozart'] : undefined;
			this.homeworkId = typeof input['HaziFeladatId'] === 'number' ? input['HaziFeladatId'] : undefined;
			this.name = typeof input['Nev'] === 'string' ? input['Nev'].trim() : undefined;
			this.previousLoggedLesson = typeof input['ElozoNaplozottOra'] === 'string' ? input['ElozoNaplozottOra'].trim() : undefined;
			this.previousLoggedLessonDate = typeof input['ElozoNaplozottOraDatum'] === 'string' ? new Date(input['ElozoNaplozottOraDatum']) :
				input['ElozoNaplozottOraDatum'];
			this.previousLoggedLessonTopic = typeof input['ElozoNaplozottOraTema'] === 'string' ? input['ElozoNaplozottOraTema'].trim() :
				undefined;
			this.startTime = typeof input['Kezdete'] === 'string' ? new Date(input['Kezdete']) : input['Kezdete'];
			this.status = typeof input['Allapot'] === 'number' ? input['Allapot'] : undefined;
			this.subjectId = typeof input['TantargyId'] === 'number' ? input['TantargyId'] : undefined;
			this.substituteTeacherName = typeof input['HelyettesitoTanarNev'] === 'string' ? input['HelyettesitoTanarNev'].trim() : undefined;
			this.substituteTeacherUid = typeof input['HelyettesitoTanarUid'] === 'string' ? input['HelyettesitoTanarUid'].trim() : undefined;
			this.teacherName = typeof input['TanarNev'] === 'string' ? input['TanarNev'].trim() : undefined;
			this.teacherUid = typeof input['TanarUid'] === 'string' ? input['TanarUid'].trim() : undefined;
			this.topic = typeof input['Tema'] === 'string' ? input['Tema'].trim() : undefined;
			this.type = typeof input['Tipus'] === 'number' ? input['Tipus'] : undefined;
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get BejelenetettSzamonkeresId(): number | undefined {
		return this.announcedTestId;
	}

	public get BejelentettSzamonkeresMod(): string | undefined {
		return this.announcedTestMode;
	}

	public get BejelentettSzamonkeresTema(): string | undefined {
		return this.announcedTestTopic;
	}

	public get EvesOraSorszam(): number | undefined {
		return this.classAnnualSerialNumber;
	}

	public get OsztalyCsoportId(): number | undefined {
		return this.classGroupId;
	}

	public get OsztalyCsoportNev(): string | undefined {
		return this.classGroupName;
	}

	public get Oraszam(): number | undefined {
		return this.classScheduleNumber;
	}

	public get Terem(): string | undefined {
		return this.classroom;
	}

	public get Vege(): Date | undefined {
		return this.endTime;
	}

	public get Naplozart(): boolean | undefined {
		return this.gradebookClosure;
	}

	public get HaziFeladatId(): number | undefined {
		return this.homeworkId;
	}

	public get Nev(): string | undefined {
		return this.name;
	}

	public get ElozoNaplozottOra(): string | undefined {
		return this.previousLoggedLesson;
	}

	public get ElozoNaplozottOraDatum(): Date | undefined {
		return this.previousLoggedLessonDate;
	}

	public get ElozoNaplozottOraTema(): string | undefined {
		return this.previousLoggedLessonTopic;
	}

	public get Kezdete(): Date | undefined {
		return this.startTime;
	}

	public get Allapot(): number | undefined {
		return this.status;
	}

	public get TantargyId(): number | undefined {
		return this.subjectId;
	}

	public get HelyettesitoTanarNev(): string | undefined {
		return this.substituteTeacherName;
	}

	public get HelyettesitoTanarUid(): string | undefined {
		return this.substituteTeacherUid;
	}

	public get TanarNev(): string | undefined {
		return this.teacherName;
	}

	public get TanarUid(): string | undefined {
		return this.teacherUid;
	}

	public get Tema(): string | undefined {
		return this.topic;
	}

	public get Tipus(): number | undefined {
		return this.type;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	public get json(): TimetableElementFields {
		return {
			Allapot: this.status,
			BejelenetettSzamonkeresId: this.announcedTestId,
			BejelentettSzamonkeresMod: this.announcedTestMode,
			BejelentettSzamonkeresTema: this.announcedTestTopic,
			ElozoNaplozottOra: this.previousLoggedLesson,
			ElozoNaplozottOraDatum: this.previousLoggedLessonDate,
			ElozoNaplozottOraTema: this.previousLoggedLessonTopic,
			EvesOraSorszam: this.classAnnualSerialNumber,
			HaziFeladatId: this.homeworkId,
			HelyettesitoTanarNev: this.substituteTeacherName,
			HelyettesitoTanarUid: this.substituteTeacherUid,
			Kezdete: this.startTime,
			Naplozart: this.gradebookClosure,
			Nev: this.name,
			Oraszam: this.classScheduleNumber,
			OsztalyCsoportId: this.classGroupId,
			OsztalyCsoportNev: this.classGroupName,
			TanarNev: this.teacherName,
			TanarUid: this.teacherUid,
			TantargyId: this.subjectId,
			Tema: this.topic,
			Terem: this.classroom,
			Tipus: this.type,
			Uid: this.uid,
			Vege: this.endTime,
		} as TimetableElementFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<TimetableElementFields> = {
			BejelenetettSzamonkeresId: this.announcedTestId,
			BejelentettSzamonkeresMod: this.announcedTestMode,
			BejelentettSzamonkeresTema: this.announcedTestTopic,
			EvesOraSorszam: this.classAnnualSerialNumber,
			OsztalyCsoportId: this.classGroupId,
			OsztalyCsoportNev: this.classGroupName,
			Oraszam: this.classScheduleNumber,
			Terem: this.classroom,
			Vege: this.endTime,
			Naplozart: this.gradebookClosure,
			HaziFeladatId: this.homeworkId,
			Nev: this.name,
			ElozoNaplozottOra: this.previousLoggedLesson,
			ElozoNaplozottOraDatum: this.previousLoggedLessonDate,
			ElozoNaplozottOraTema: this.previousLoggedLessonTopic,
			Kezdete: this.startTime,
			Allapot: this.status,
			TantargyId: this.subjectId,
			HelyettesitoTanarNev: this.substituteTeacherName,
			HelyettesitoTanarUid: this.substituteTeacherUid,
			TanarNev: this.teacherName,
			TanarUid: this.teacherUid,
			Tema: this.topic,
			Tipus: this.type,
			Uid: this.uid,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof TimetableElementFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
