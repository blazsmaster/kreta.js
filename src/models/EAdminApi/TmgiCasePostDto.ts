import { IsArray, IsDate, IsInstance, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';
import TypeDto from './TypeDto';
import ApplicationMandatoryDocumentDto from './ApplicationMandatoryDocumentDto';
import OtherThingsToDoAttachmentsDto from './OtherThingsToDoAttachmentsDto';

export interface TmgiCasePostFields {
	igazolasTipus: TypeDto;
	tanuloOsztaly: string;
	tanuloOktatasiAzonosito?: string;
	igazoltTavolletVegeDatum: Date;
	kerelemKotelezoDokumentumLista: Array<ApplicationMandatoryDocumentDto>;
	csatolmanyok: Array<OtherThingsToDoAttachmentsDto>;
	indoklas?: string;
	igazoltTavolletKezdeteDatum: Date;
	tanuloCsaladiNev: string;
	tanuloKeresztNev: string;
	tipus: TypeDto;
	tipusKod: string;
}

export default class TmgiCasePostDto implements Partial<TmgiCasePostFields> {
	@IsInstance(TypeDto)
	private readonly caseType?: TypeDto;

	@IsString()
	private readonly educationClassName?: string;

	@IsOptional()
	@IsString()
	private readonly educationId?: string;

	@IsDate()
	private readonly endDate?: Date;

	@IsArray()
	@IsInstance(ApplicationMandatoryDocumentDto, { each: true })
	private readonly mandatoryAttachments?: Array<ApplicationMandatoryDocumentDto>;

	@IsArray()
	@IsInstance(OtherThingsToDoAttachmentsDto, { each: true })
	private readonly optionalAttachments?: Array<OtherThingsToDoAttachmentsDto>;

	@IsOptional()
	@IsString()
	private readonly reason?: string;

	@IsDate()
	private readonly startDate?: Date;

	@IsString()
	private readonly studentFirstName?: string;

	@IsString()
	private readonly studentLastName?: string;

	@IsInstance(TypeDto)
	private readonly type?: TypeDto;

	@IsString()
	private readonly typeCode?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.caseType = typeof input['tipus'] === 'object' ? new TypeDto(input['tipus']) : undefined;
			this.educationClassName = typeof input['tanuloOsztaly'] === 'string' ? input['tanuloOsztaly'].trim() : undefined;
			this.educationId = typeof input['tanuloOktatasiAzonosito'] === 'string' ? input['tanuloOktatasiAzonosito'].trim() : undefined;
			this.endDate = typeof input['igazoltTavolletVegeDatum'] === 'string' ? new Date(input['igazoltTavolletVegeDatum']) : undefined;
			this.mandatoryAttachments = Array.isArray(input['kerelemKotelezoDokumentumLista']) ?
				input['kerelemKotelezoDokumentumLista'].map((item: any) => new ApplicationMandatoryDocumentDto(item)) : undefined;
			this.optionalAttachments = Array.isArray(input['csatolmanyok']) ?
				input['csatolmanyok'].map((item: any) => new OtherThingsToDoAttachmentsDto(item)) : undefined;
			this.reason = typeof input['indoklas'] === 'string' ? input['indoklas'].trim() : undefined;
			this.startDate = typeof input['igazoltTavolletKezdeteDatum'] === 'string' ? new Date(input['igazoltTavolletKezdeteDatum']) :
				undefined;
			this.studentFirstName = typeof input['tanuloCsaladiNev'] === 'string' ? input['tanuloCsaladiNev'].trim() : undefined;
			this.studentLastName = typeof input['tanuloKeresztNev'] === 'string' ? input['tanuloKeresztNev'].trim() : undefined;
			this.type = typeof input['tipus'] === 'object' ? new TypeDto(input['tipus']) : undefined;
			this.typeCode = typeof input['tipusKod'] === 'string' ? input['tipusKod'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get tipus(): TypeDto | undefined {
		return this.caseType;
	}

	public get tanuloOsztaly(): string | undefined {
		return this.educationClassName;
	}

	public get tanuloOktatasiAzonosito(): string | undefined {
		return this.educationId;
	}

	public get igazoltTavolletVegeDatum(): Date | undefined {
		return this.endDate;
	}

	public get kerelemKotelezoDokumentumLista(): Array<ApplicationMandatoryDocumentDto> | undefined {
		return this.mandatoryAttachments;
	}

	public get csatolmanyok(): Array<OtherThingsToDoAttachmentsDto> | undefined {
		return this.optionalAttachments;
	}

	public get indoklas(): string | undefined {
		return this.reason;
	}

	public get igazoltTavolletKezdeteDatum(): Date | undefined {
		return this.startDate;
	}

	public get tanuloCsaladiNev(): string | undefined {
		return this.studentLastName;
	}

	public get tanuloKeresztNev(): string | undefined {
		return this.studentFirstName;
	}

	public get tipusKod(): string | undefined {
		return this.typeCode;
	}

	public get json(): TmgiCasePostFields {
		return {
			csatolmanyok: this.optionalAttachments?.map((item) => item.json),
			igazolasTipus: this.caseType?.json,
			igazoltTavolletKezdeteDatum: this.startDate,
			igazoltTavolletVegeDatum: this.endDate,
			indoklas: this.reason,
			kerelemKotelezoDokumentumLista: this.mandatoryAttachments?.map((item) => item.json),
			tanuloCsaladiNev: this.studentLastName,
			tanuloKeresztNev: this.studentFirstName,
			tanuloOktatasiAzonosito: this.educationId,
			tanuloOsztaly: this.educationClassName,
			tipus: this.type?.json,
			tipusKod: this.typeCode,
		} as TmgiCasePostFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<TmgiCasePostFields> = {
			igazolasTipus: this.caseType,
			tanuloOsztaly: this.educationClassName,
			tanuloOktatasiAzonosito: this.educationId,
			igazoltTavolletVegeDatum: this.endDate,
			kerelemKotelezoDokumentumLista: this.mandatoryAttachments,
			csatolmanyok: this.optionalAttachments,
			indoklas: this.reason,
			igazoltTavolletKezdeteDatum: this.startDate,
			tanuloCsaladiNev: this.studentLastName,
			tanuloKeresztNev: this.studentFirstName,
			tipus: this.type,
			tipusKod: this.typeCode,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof TmgiCasePostFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
