import { IsArray, IsBoolean, IsDate, IsInstance, IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';
import ApplicationMandatoryDocumentDto from './ApplicationMandatoryDocumentDto';
import AttachmentDto from './AttachmentDto';
import PostStateDto from './PostStateDto';
import FiledDecisionDto from './FiledDecisionDto';
import JudgementDto from './JudgementDto';

export interface DecisionFields {
	/**
	 * @SerializedName("dontesSzovege")
	 *     @Nullable
	 *     private final String adjudication;
	 *     @SerializedName("hatarozatKotelezoDokumentumLista")
	 *     @NotNull
	 *     private final List<ApplicationMandatoryDocumentDto> applicationMandatoryDocuments;
	 *     @SerializedName("csatolmanyok")
	 *     @NotNull
	 *     private final List<AttachmentDto> attachments;
	 *     @SerializedName("hatarozatDatum")
	 *     @Nullable
	 *     private final String decisionDateAsString;
	 *     @SerializedName("iktatottHatarozat")
	 *     @Nullable
	 *     private final FiledDecisionDto filedDecision;
	 *     @SerializedName("azonosito")
	 *     @NotNull
	 *     private final String id;
	 *     @SerializedName("dontes")
	 *     @Nullable
	 *     private final JudgementDto judgement;
	 *     @SerializedName("indoklas")
	 *     @Nullable
	 *     private final String justification;
	 *     @SerializedName("isDigitalisanKikuldendo")
	 *     @Nullable
	 *     private final Boolean needToBeSendDigitally;
	 *     @SerializedName("postazasiStatusz")
	 *     @Nullable
	 *     private final PostStateDto postState;
	 *     @SerializedName("igazoltTavolletVegeDatum")
	 *     @Nullable
	 *     private final String requestedAbsenceEndAsString;
	 *     @SerializedName("igazoltTavolletKezdeteDatum")
	 *     @Nullable
	 *     private final String requestedAbsenceStartAsString;
	 *     @SerializedName("alairoKretaAzonosito")
	 *     @Nullable
	 *     private final Integer signerId;
	 */
	dontesSzovege?: string;
	hatarozatKotelezoDokumentumLista: Array<ApplicationMandatoryDocumentDto>;
	csatolmanyok: Array<AttachmentDto>;
	hatarozatDatum?: Date;
	iktatottHatarozat?: FiledDecisionDto;
	azonosito: string;
	dontes?: JudgementDto;
	indoklas?: string;
	isDigitalisanKikuldendo?: boolean;
	postazasiStatusz?: PostStateDto;
	igazoltTavolletVegeDatum?: Date;
	igazoltTavolletKezdeteDatum?: Date;
	alairoKretaAzonosito?: number;
}

export default class DecisionDto implements Partial<DecisionFields> {
	@IsOptional()
	@IsString()
	private readonly adjudication?: string;

	@IsArray()
	@IsInstance(ApplicationMandatoryDocumentDto, { each: true })
	private readonly applicationMandatoryDocuments?: Array<ApplicationMandatoryDocumentDto>;

	@IsArray()
	@IsInstance(AttachmentDto, { each: true })
	private readonly attachments?: Array<AttachmentDto>;

	@IsOptional()
	@IsDate()
	private readonly decisionDate?: Date;

	@IsOptional()
	@IsInstance(FiledDecisionDto)
	private readonly filedDecision?: FiledDecisionDto;

	@IsString()
	private readonly id?: string;

	@IsOptional()
	@IsInstance(JudgementDto)
	private readonly judgement?: JudgementDto;

	@IsOptional()
	@IsString()
	private readonly justification?: string;

	@IsOptional()
	@IsBoolean()
	private readonly needToBeSendDigitally?: boolean;

	@IsOptional()
	@IsInstance(PostStateDto)
	private readonly postState?: PostStateDto;

	@IsOptional()
	@IsDate()
	private readonly requestedAbsenceEnd?: Date;

	@IsOptional()
	@IsDate()
	private readonly requestedAbsenceStart?: Date;

	@IsOptional()
	@IsNumber()
	private readonly signerId?: number;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.adjudication = typeof input['dontesSzovege'] === 'string' ? input['dontesSzovege'].trim() : undefined;
			this.applicationMandatoryDocuments = Array.isArray(input['hatarozatKotelezoDokumentumLista']) ?
				input['hatarozatKotelezoDokumentumLista'].map((value: any) => new ApplicationMandatoryDocumentDto(value)) : [];
			this.attachments = Array.isArray(input['csatolmanyok']) ? input['csatolmanyok'].map((value: any) => new AttachmentDto(value)) : [];
			this.decisionDate = typeof input['hatarozatDatum'] === 'string' ? new Date(input['hatarozatDatum']) : undefined;
			this.filedDecision = typeof input['iktatottHatarozat'] === 'object' ? new FiledDecisionDto(input['iktatottHatarozat']) : undefined;
			this.id = typeof input['azonosito'] === 'string' ? input['azonosito'].trim() : undefined;
			this.judgement = typeof input['dontes'] === 'object' ? new JudgementDto(input['dontes']) : undefined;
			this.justification = typeof input['indoklas'] === 'string' ? input['indoklas'].trim() : undefined;
			this.needToBeSendDigitally = typeof input['isDigitalisanKikuldendo'] === 'boolean' ? input['isDigitalisanKikuldendo'] : undefined;
			this.postState = typeof input['postazasiStatusz'] === 'object' ? new PostStateDto(input['postazasiStatusz']) : undefined;
			this.requestedAbsenceEnd = typeof input['igazoltTavolletVegeDatum'] === 'string' ? new Date(input['igazoltTavolletVegeDatum']) :
				undefined;
			this.requestedAbsenceStart = typeof input['igazoltTavolletKezdeteDatum'] === 'string' ?
				new Date(input['igazoltTavolletKezdeteDatum']) : undefined;
			this.signerId = typeof input['alairoKretaAzonosito'] === 'number' ? input['alairoKretaAzonosito'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get dontesSzovege(): string | undefined {
		return this.adjudication;
	}

	public get hatarozatKotelezoDokumentumLista(): Array<ApplicationMandatoryDocumentDto> | undefined {
		return this.applicationMandatoryDocuments;
	}

	public get csatolmanyok(): Array<AttachmentDto> | undefined {
		return this.attachments;
	}

	public get hatarozatDatum(): Date | undefined {
		return this.decisionDate;
	}

	public get iktatottHatarozat(): FiledDecisionDto | undefined {
		return this.filedDecision;
	}

	public get azonosito(): string | undefined {
		return this.id;
	}

	public get dontes(): JudgementDto | undefined {
		return this.judgement;
	}

	public get indoklas(): string | undefined {
		return this.justification;
	}

	public get isDigitalisanKikuldendo(): boolean | undefined {
		return this.needToBeSendDigitally;
	}

	public get postazasiStatusz(): PostStateDto | undefined {
		return this.postState;
	}

	public get igazoltTavolletVegeDatum(): Date | undefined {
		return this.requestedAbsenceEnd;
	}

	public get igazoltTavolletKezdeteDatum(): Date | undefined {
		return this.requestedAbsenceStart;
	}

	public get alairoKretaAzonosito(): number | undefined {
		return this.signerId;
	}

	public get json(): DecisionFields {
		return {
			alairoKretaAzonosito: this.signerId,
			azonosito: this.id,
			csatolmanyok: this.attachments?.map((adto) => adto.json),
			dontes: this.judgement?.json,
			dontesSzovege: this.adjudication,
			hatarozatDatum: this.decisionDate,
			hatarozatKotelezoDokumentumLista: this.applicationMandatoryDocuments?.map((adto) => adto.json),
			igazoltTavolletKezdeteDatum: this.requestedAbsenceStart,
			igazoltTavolletVegeDatum: this.requestedAbsenceEnd,
			iktatottHatarozat: this.filedDecision?.json,
			indoklas: this.justification,
			isDigitalisanKikuldendo: this.needToBeSendDigitally,
			postazasiStatusz: this.postState?.json,
		} as DecisionFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<DecisionFields> = {
			dontesSzovege: this.adjudication,
			hatarozatKotelezoDokumentumLista: this.applicationMandatoryDocuments,
			csatolmanyok: this.attachments,
			hatarozatDatum: this.decisionDate,
			iktatottHatarozat: this.filedDecision,
			azonosito: this.id,
			dontes: this.judgement,
			indoklas: this.justification,
			isDigitalisanKikuldendo: this.needToBeSendDigitally,
			postazasiStatusz: this.postState,
			igazoltTavolletVegeDatum: this.requestedAbsenceEnd,
			igazoltTavolletKezdeteDatum: this.requestedAbsenceStart,
			alairoKretaAzonosito: this.signerId,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof DecisionFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
