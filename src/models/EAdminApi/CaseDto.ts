import { IsArray, IsBoolean, IsDate, IsInstance, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';
import AdministratorDto from './AdministratorDto';
import ApplicantsDto from './ApplicantsDto';
import ApplicationMandatoryDocumentDto from './ApplicationMandatoryDocumentDto';
import AttachmentDto from './AttachmentDto';
import DecisionDto from './DecisionDto';
import FiledApplicationDto from './FiledApplicationDto';
import TypeDto from './TypeDto';
import OtherThingsToDoAttachmentsDto from './OtherThingsToDoAttachmentsDto';
import PostStateDto from './PostStateDto';
import ToDoItemDto from './ToDoItemDto';
import StateDto from './StateDto';

export interface CaseFields {
	ugyintezo?: AdministratorDto;
	kerelmezo?: ApplicantsDto;
	kerelemKotelezoDokumentumLista?: Array<ApplicationMandatoryDocumentDto>;
	csatolmanyok?: Array<AttachmentDto>;
	hatarozatLista?: Array<DecisionDto>;
	ugyiratszam?: string;
	iktatottKerelem?: FiledApplicationDto;
	elozmenyUgyiratszam?: string;
	azonosito: string;
	belsoHataridoDatum?: Date;
	belsoMegjegyzes?: string;
	igazolasTipus?: TypeDto;
	utolsoModositasDatum?: Date;
	teendoEgyebCsatolmanyok?: Array<OtherThingsToDoAttachmentsDto>;
	postazasiStatusz?: PostStateDto;
	indoklas?: string;
	iktatoszam?: string;
	igazoltTavolletVegeDatum?: Date;
	igazoltTavolletKezdeteDatum?: Date;
	bekuldesDatum: Date;
	statusz: StateDto;
	tanuloOsztaly?: string;
	tanuloOktatasiAzonosito?: string;
	tanuloCsaladiNev?: string;
	tanuloKeresztNev?: string;
	isDigitalisanBekuldve?: boolean;
	teendoLista?: Array<ToDoItemDto>;
	tipus: TypeDto;
	tipusKod?: string;
}

export default class CaseDto implements Partial<CaseFields> {
	@IsOptional()
	@IsInstance(AdministratorDto)
	private readonly administrator?: AdministratorDto;

	@IsOptional()
	@IsInstance(ApplicantsDto)
	private readonly applicants?: ApplicantsDto;

	@IsOptional()
	@IsArray()
	@IsInstance(ApplicationMandatoryDocumentDto, { each: true })
	private readonly applicationMandatoryDocument?: Array<ApplicationMandatoryDocumentDto>;

	@IsOptional()
	@IsArray()
	@IsInstance(AttachmentDto, { each: true })
	private readonly attachments?: Array<AttachmentDto>;

	@IsOptional()
	@IsArray()
	@IsInstance(DecisionDto, { each: true })
	private readonly decisions?: Array<DecisionDto>;

	@IsOptional()
	@IsString()
	private readonly documentNumber?: string;

	@IsOptional()
	@IsInstance(FiledApplicationDto)
	private readonly filedApplication?: FiledApplicationDto;

	@IsOptional()
	@IsString()
	private readonly historyFileNumber?: string;

	@IsString()
	private readonly id?: string;

	@IsOptional()
	@IsDate()
	private readonly internalDeadlineDate?: Date;

	@IsOptional()
	@IsString()
	private readonly internalNote?: string;

	@IsOptional()
	@IsInstance(TypeDto)
	private readonly justificationType?: TypeDto;

	@IsOptional()
	@IsDate()
	private readonly lastModificationDate?: Date;

	@IsOptional()
	@IsArray()
	@IsInstance(OtherThingsToDoAttachmentsDto, { each: true })
	private readonly otherThingsToDoAttachments?: Array<OtherThingsToDoAttachmentsDto>;

	@IsOptional()
	@IsInstance(PostStateDto)
	private readonly postState?: PostStateDto;

	@IsOptional()
	@IsString()
	private readonly reason?: string;

	@IsOptional()
	@IsString()
	private readonly registrationNumber?: string;

	@IsOptional()
	@IsDate()
	private readonly requestedAbsenceEnd?: Date;

	@IsOptional()
	@IsDate()
	private readonly requestedAbsenceStart?: Date;

	@IsDate()
	private readonly sentDate?: Date;

	@IsInstance(StateDto)
	private readonly state?: StateDto;

	@IsOptional()
	@IsString()
	private readonly studentClass?: string;

	@IsOptional()
	@IsString()
	private readonly studentEducationId?: string;

	@IsOptional()
	@IsString()
	private readonly studentFamilyName?: string;

	@IsOptional()
	@IsString()
	private readonly studentFirstName?: string;

	@IsOptional()
	@IsBoolean()
	private readonly submittedDigitally?: boolean;

	@IsOptional()
	@IsArray()
	@IsInstance(ToDoItemDto, { each: true })
	private readonly toDoItem?: Array<ToDoItemDto>;

	@IsInstance(TypeDto)
	private readonly type?: TypeDto;

	@IsOptional()
	@IsString()
	private readonly typeCode?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.administrator = typeof input['ugyintezo'] === 'object' ? new AdministratorDto(input['ugyintezo']) : undefined;
			this.applicants = typeof input['kerelmezo'] === 'object' ? new ApplicantsDto(input['kerelmezo']) : undefined;
			this.applicationMandatoryDocument = Array.isArray(input['kerelemKotelezoDokumentumLista']) ?
				input['kerelemKotelezoDokumentumLista'].map((value: any) => new ApplicationMandatoryDocumentDto(value)) : [];
			this.attachments = Array.isArray(input['csatolmanyok']) ? input['csatolmanyok'].map((value: any) => new AttachmentDto(value)) : [];
			this.decisions = Array.isArray(input['hatarozatLista']) ? input['hatarozatLista'].map((value: any) => new DecisionDto(value)) : [];
			this.documentNumber = typeof input['ugyiratszam'] === 'string' ? input['ugyiratszam'].trim() : undefined;
			this.filedApplication = typeof input['iktatottKerelem'] === 'object' ? new FiledApplicationDto(input['iktatottKerelem']) : undefined;
			this.historyFileNumber = typeof input['elozmenyUgyiratszam'] === 'string' ? input['elozmenyUgyiratszam'].trim() : undefined;
			this.id = typeof input['azonosito'] === 'string' ? input['azonosito'].trim() : undefined;
			this.internalDeadlineDate = typeof input['belsoHataridoDatum'] === 'string' ? new Date(input['belsoHataridoDatum']) : undefined;
			this.internalNote = typeof input['belsoMegjegyzes'] === 'string' ? input['belsoMegjegyzes'].trim() : undefined;
			this.justificationType = typeof input['igazolasTipus'] === 'object' ? new TypeDto(input['igazolasTipus']) : undefined;
			this.lastModificationDate = typeof input['utolsoModositasDatum'] === 'string' ? new Date(input['utolsoModositasDatum']) : undefined;
			this.otherThingsToDoAttachments = Array.isArray(input['teendoEgyebCsatolmanyok']) ?
				input['teendoEgyebCsatolmanyok'].map((value: any) => new OtherThingsToDoAttachmentsDto(value)) : [];
			this.postState = typeof input['postazasiStatusz'] === 'object' ? new PostStateDto(input['postazasiStatusz']) : undefined;
			this.reason = typeof input['indoklas'] === 'string' ? input['indoklas'].trim() : undefined;
			this.registrationNumber = typeof input['iktatoszam'] === 'string' ? input['iktatoszam'].trim() : undefined;
			this.requestedAbsenceEnd = typeof input['igazoltTavolletVegeDatum'] === 'string' ? new Date(input['igazoltTavolletVegeDatum']) :
				undefined;
			this.requestedAbsenceStart = typeof input['igazoltTavolletKezdeteDatum'] === 'string' ?
				new Date(input['igazoltTavolletKezdeteDatum']) : undefined;
			this.sentDate = typeof input['bekuldesDatum'] === 'string' ? new Date(input['bekuldesDatum']) : undefined;
			this.state = typeof input['statusz'] === 'object' ? new StateDto(input['statusz']) : undefined;
			this.studentClass = typeof input['tanuloOsztaly'] === 'string' ? input['tanuloOsztaly'].trim() : undefined;
			this.studentEducationId = typeof input['tanuloOktatasiAzonosito'] === 'string' ? input['tanuloOktatasiAzonosito'].trim() : undefined;
			this.studentFamilyName = typeof input['tanuloCsaladiNev'] === 'string' ? input['tanuloCsaladiNev'].trim() : undefined;
			this.studentFirstName = typeof input['tanuloKeresztNev'] === 'string' ? input['tanuloKeresztNev'].trim() : undefined;
			this.submittedDigitally = typeof input['isDigitalisanBekuldve'] === 'boolean' ? input['isDigitalisanBekuldve'] : undefined;
			this.toDoItem = Array.isArray(input['teendoLista']) ? input['teendoLista'].map((value: any) => new ToDoItemDto(value)) : [];
			this.type = typeof input['tipus'] === 'object' ? new TypeDto(input['tipus']) : undefined;
			this.typeCode = typeof input['tipusKod'] === 'string' ? input['tipusKod'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get ugyintezo(): AdministratorDto | undefined {
		return this.administrator;
	}

	public get kerelmezo(): ApplicantsDto | undefined {
		return this.applicants;
	}

	public get kerelemKotelezoDokumentumLista(): Array<ApplicationMandatoryDocumentDto> | undefined {
		return this.applicationMandatoryDocument;
	}

	public get csatolmanyok(): Array<AttachmentDto> | undefined {
		return this.attachments;
	}

	public get hatarozatLista(): Array<DecisionDto> | undefined {
		return this.decisions;
	}

	public get ugyiratszam(): string | undefined {
		return this.documentNumber;
	}

	public get iktatottKerelem(): FiledApplicationDto | undefined {
		return this.filedApplication;
	}

	public get elozmenyUgyiratszam(): string | undefined {
		return this.historyFileNumber;
	}

	public get azonosito(): string | undefined {
		return this.id;
	}

	public get belsoHataridoDatum(): Date | undefined {
		return this.internalDeadlineDate;
	}

	public get belsoMegjegyzes(): string | undefined {
		return this.internalNote;
	}

	public get igazolasTipus(): TypeDto | undefined {
		return this.justificationType;
	}

	public get utolsoModositasDatum(): Date | undefined {
		return this.lastModificationDate;
	}

	public get teendoEgyebCsatolmanyok(): Array<OtherThingsToDoAttachmentsDto> | undefined {
		return this.otherThingsToDoAttachments;
	}

	public get postazasiStatusz(): PostStateDto | undefined {
		return this.postState;
	}

	public get indoklas(): string | undefined {
		return this.reason;
	}

	public get iktatoszam(): string | undefined {
		return this.registrationNumber;
	}

	public get igazoltTavolletVegeDatum(): Date | undefined {
		return this.requestedAbsenceEnd;
	}

	public get igazoltTavolletKezdeteDatum(): Date | undefined {
		return this.requestedAbsenceStart;
	}

	public get bekuldesDatum(): Date | undefined {
		return this.sentDate;
	}

	public get statusz(): StateDto | undefined {
		return this.state;
	}

	public get tanuloOsztaly(): string | undefined {
		return this.studentClass;
	}

	public get tanuloOktatasiAzonosito(): string | undefined {
		return this.studentEducationId;
	}

	public get tanuloCsaladiNev(): string | undefined {
		return this.studentFamilyName;
	}

	public get tanuloKeresztNev(): string | undefined {
		return this.studentFirstName;
	}

	public get isDigitalisanBekuldve(): boolean | undefined {
		return this.submittedDigitally;
	}

	public get teendoLista(): Array<ToDoItemDto> | undefined {
		return this.toDoItem;
	}

	public get tipus(): TypeDto | undefined {
		return this.type;
	}

	public get tipusKod(): string | undefined {
		return this.typeCode;
	}

	public get json(): CaseFields {
		return {
			ugyintezo: this.administrator?.json,
			kerelmezo: this.applicants?.json,
			kerelemKotelezoDokumentumLista: this.applicationMandatoryDocument?.map((adto) => adto.json),
			csatolmanyok: this.attachments?.map((adto) => adto.json),
			hatarozatLista: this.decisions?.map((ddto) => ddto.json),
			ugyiratszam: this.documentNumber,
			iktatottKerelem: this.filedApplication?.json,
			elozmenyUgyiratszam: this.historyFileNumber,
			azonosito: this.id,
			belsoHataridoDatum: this.internalDeadlineDate,
			belsoMegjegyzes: this.internalNote,
			igazolasTipus: this.justificationType?.json,
			utolsoModositasDatum: this.lastModificationDate,
			teendoEgyebCsatolmanyok: this.otherThingsToDoAttachments?.map((odto) => odto.json),
			postazasiStatusz: this.postState?.json,
			indoklas: this.reason,
			iktatoszam: this.registrationNumber,
			igazoltTavolletVegeDatum: this.requestedAbsenceEnd,
			igazoltTavolletKezdeteDatum: this.requestedAbsenceStart,
			bekuldesDatum: this.sentDate,
			statusz: this.state?.json,
			tanuloOsztaly: this.studentClass,
			tanuloOktatasiAzonosito: this.studentEducationId,
			tanuloCsaladiNev: this.studentFamilyName,
			tanuloKeresztNev: this.studentFirstName,
			isDigitalisanBekuldve: this.submittedDigitally,
			teendoLista: this.toDoItem?.map((tdto) => tdto.json),
			tipus: this.type?.json,
			tipusKod: this.typeCode,
		} as CaseFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<CaseFields> = {
			ugyintezo: this.administrator,
			kerelmezo: this.applicants,
			kerelemKotelezoDokumentumLista: this.applicationMandatoryDocument,
			csatolmanyok: this.attachments,
			hatarozatLista: this.decisions,
			ugyiratszam: this.documentNumber,
			iktatottKerelem: this.filedApplication,
			elozmenyUgyiratszam: this.historyFileNumber,
			azonosito: this.id,
			belsoHataridoDatum: this.internalDeadlineDate,
			belsoMegjegyzes: this.internalNote,
			igazolasTipus: this.justificationType,
			utolsoModositasDatum: this.lastModificationDate,
			teendoEgyebCsatolmanyok: this.otherThingsToDoAttachments,
			postazasiStatusz: this.postState,
			indoklas: this.reason,
			iktatoszam: this.registrationNumber,
			igazoltTavolletVegeDatum: this.requestedAbsenceEnd,
			igazoltTavolletKezdeteDatum: this.requestedAbsenceStart,
			bekuldesDatum: this.sentDate,
			statusz: this.state,
			tanuloOsztaly: this.studentClass,
			tanuloOktatasiAzonosito: this.studentEducationId,
			tanuloCsaladiNev: this.studentFamilyName,
			tanuloKeresztNev: this.studentFirstName,
			isDigitalisanBekuldve: this.submittedDigitally,
			teendoLista: this.toDoItem,
			tipus: this.type,
			tipusKod: this.typeCode,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof CaseFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
