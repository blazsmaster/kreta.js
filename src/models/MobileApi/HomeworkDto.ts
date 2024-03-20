import { IsArray, IsBoolean, IsDate, IsInstance, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';
import AttachmentDto from './Homework/AttachmentDto';
import UidStructure from './UidStructure';
import SubjectDescriptor from './SubjectDescriptor';

export interface HomeworkFields {
	TantargyNeve?: string;
	Csatolmanyok?: Array<AttachmentDto>;
	RogzitesIdopontja: Date;
	HataridoDatuma: Date;
	OsztalyCsoport?: UidStructure;
	IsCsatolasEngedelyezes: boolean;
	IsMegoldva: boolean;
	IsTanuloHaziFeladatEnabled: boolean;
	IsTanarRogzitette: boolean;
	FeladasDatuma: Date;
	RogzitoTanarNeve: string;
	Tantargy?: SubjectDescriptor;
	IsBeadhato: boolean;
	Szoveg?: string;
	Uid: string;
}

export default class HomeworkDto implements Partial<HomeworkFields> {
	@IsOptional()
	@IsString()
	private readonly subjectName?: string;

	@IsOptional()
	@IsArray()
	@IsInstance(AttachmentDto, { each: true })
	private readonly attachmentList?: Array<AttachmentDto>;

	@IsDate()
	private readonly createDate?: Date;

	@IsDate()
	private readonly deadlineDate?: Date;

	@IsOptional()
	@IsInstance(UidStructure)
	private readonly group?: UidStructure;

	@IsBoolean()
	private readonly isAllowToAttachFile?: boolean;

	@IsBoolean()
	private readonly isDone?: boolean;

	@IsBoolean()
	private readonly isStudentHomeworkEnabled?: boolean;

	@IsBoolean()
	private readonly isTeacherRecorded?: boolean;

	@IsDate()
	private readonly recordDate?: Date;

	@IsString()
	private readonly recorderTeacherName?: string;

	@IsOptional()
	@IsInstance(SubjectDescriptor)
	private readonly subject?: SubjectDescriptor;

	@IsBoolean()
	private readonly submitable?: boolean;

	@IsOptional()
	@IsString()
	private readonly text?: string;

	@IsString()
	private readonly uid?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.subjectName = typeof input['TantargyNeve'] === 'string' ? input['TantargyNeve'] : undefined;
			this.attachmentList = typeof input['Csatolmanyok'] === 'object' ? input['Csatolmanyok'].map((e: any) => new AttachmentDto(e)) :
				undefined;
			this.createDate = typeof input['RogzitesIdopontja'] === 'string' ? new Date(input['RogzitesIdopontja']) : undefined;
			this.deadlineDate = typeof input['HataridoDatuma'] === 'string' ? new Date(input['HataridoDatuma']) : undefined;
			this.group = typeof input['OsztalyCsoport'] === 'object' ? new UidStructure(input['OsztalyCsoport']) : undefined;
			this.isAllowToAttachFile = typeof input['IsCsatolasEngedelyezes'] === 'boolean' ? input['IsCsatolasEngedelyezes'] : undefined;
			this.isDone = typeof input['IsMegoldva'] === 'boolean' ? input['IsMegoldva'] : undefined;
			this.isStudentHomeworkEnabled = typeof input['IsTanuloHaziFeladatEnabled'] === 'boolean' ? input['IsTanuloHaziFeladatEnabled'] :
				undefined;
			this.isTeacherRecorded = typeof input['IsTanarRogzitette'] === 'boolean' ? input['IsTanarRogzitette'] : undefined;
			this.recordDate = typeof input['FeladasDatuma'] === 'string' ? new Date(input['FeladasDatuma']) : undefined;
			this.recorderTeacherName = typeof input['RogzitoTanarNeve'] === 'string' ? input['RogzitoTanarNeve'] : undefined;
			this.subject = typeof input['Tantargy'] === 'object' ? new SubjectDescriptor(input['Tantargy']) : undefined;
			this.submitable = typeof input['IsBeadhato'] === 'boolean' ? input['IsBeadhato'] : undefined;
			this.text = typeof input['Szoveg'] === 'string' ? input['Szoveg'] : undefined;
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get TantargyNeve(): string | undefined {
		return this.subjectName;
	}

	public get Csatolmanyok(): Array<AttachmentDto> | undefined {
		return this.attachmentList;
	}

	public get RogzitesIdopontja(): Date | undefined {
		return this.createDate;
	}

	public get HataridoDatuma(): Date | undefined {
		return this.deadlineDate;
	}

	public get OsztalyCsoport(): UidStructure | undefined {
		return this.group;
	}

	public get IsCsatolasEngedelyezes(): boolean | undefined {
		return this.isAllowToAttachFile;
	}

	public get IsMegoldva(): boolean | undefined {
		return this.isDone;
	}

	public get IsTanuloHaziFeladatEnabled(): boolean | undefined {
		return this.isStudentHomeworkEnabled;
	}

	public get IsTanarRogzitette(): boolean | undefined {
		return this.isTeacherRecorded;
	}

	public get FeladasDatuma(): Date | undefined {
		return this.recordDate;
	}

	public get RogzitoTanarNeve(): string | undefined {
		return this.recorderTeacherName;
	}

	public get Tantargy(): SubjectDescriptor | undefined {
		return this.subject;
	}

	public get IsBeadhato(): boolean | undefined {
		return this.submitable;
	}

	public get Szoveg(): string | undefined {
		return this.text;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	public get json(): HomeworkFields {
		return {
			Csatolmanyok: this.attachmentList?.map((adto) => adto.json),
			FeladasDatuma: this.recordDate,
			HataridoDatuma: this.deadlineDate,
			IsBeadhato: this.submitable,
			IsCsatolasEngedelyezes: this.isAllowToAttachFile,
			IsMegoldva: this.isDone,
			IsTanarRogzitette: this.isTeacherRecorded,
			IsTanuloHaziFeladatEnabled: this.isStudentHomeworkEnabled,
			OsztalyCsoport: this.group?.json,
			RogzitesIdopontja: this.createDate,
			RogzitoTanarNeve: this.recorderTeacherName,
			Szoveg: this.text,
			Tantargy: this.subject?.json,
			TantargyNeve: this.subjectName,
			Uid: this.uid,
		} as HomeworkFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<HomeworkFields> = {
			TantargyNeve: this.subjectName,
			Csatolmanyok: this.attachmentList,
			RogzitesIdopontja: this.createDate,
			HataridoDatuma: this.deadlineDate,
			OsztalyCsoport: this.group,
			IsCsatolasEngedelyezes: this.isAllowToAttachFile,
			IsMegoldva: this.isDone,
			IsTanuloHaziFeladatEnabled: this.isStudentHomeworkEnabled,
			IsTanarRogzitette: this.isTeacherRecorded,
			FeladasDatuma: this.recordDate,
			RogzitoTanarNeve: this.recorderTeacherName,
			Tantargy: this.subject,
			IsBeadhato: this.submitable,
			Szoveg: this.text,
			Uid: this.uid,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof HomeworkFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
