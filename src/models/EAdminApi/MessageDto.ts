import { IsArray, IsDate, IsInstance, IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';
import AddresseeDto from './AddresseeDto';
import AttachmentDto from './AttachmentDto';

export interface MessageFields {
	cimzettLista?: Array<AddresseeDto>;
	csatolmanyok?: Array<AttachmentDto>;
	azonosito?: number;
	feladoNev?: string;
	feladoTitulus?: string;
	kuldesDatum?: Date;
	targy?: string;
	szoveg?: string;
	elozoUzenetAzonosito?: number;
}

export default class MessageDto implements Partial<MessageFields> {
	@IsOptional()
	@IsArray()
	@IsInstance(AddresseeDto, { each: true })
	private readonly addressList?: Array<AddresseeDto>;

	@IsOptional()
	@IsArray()
	@IsInstance(AttachmentDto, { each: true })
	private readonly attachmentList?: Array<AttachmentDto>;

	@IsOptional()
	@IsNumber()
	private readonly messageId?: number;

	@IsOptional()
	@IsString()
	private readonly messageSenderName?: string;

	@IsOptional()
	@IsString()
	private readonly messageSenderTitle?: string;

	@IsOptional()
	@IsDate()
	private readonly messageSentDate?: Date;

	@IsOptional()
	@IsString()
	private readonly messageSubject?: string;

	@IsOptional()
	@IsString()
	private readonly messageText?: string;

	@IsOptional()
	@IsNumber()
	private readonly previousMessageId?: number;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.addressList = Array.isArray(input['cimzettLista']) ? input['cimzettLista'].map((item: any) => new AddresseeDto(item)) :
				undefined;
			this.attachmentList = Array.isArray(input['csatolmanyok']) ? input['csatolmanyok'].map((item: any) => new AttachmentDto(item)) :
				undefined;
			this.messageId = typeof input['azonosito'] === 'number' ? input['azonosito'] : undefined;
			this.messageSenderName = typeof input['feladoNev'] === 'string' ? input['feladoNev'].trim() : undefined;
			this.messageSenderTitle = typeof input['feladoTitulus'] === 'string' ? input['feladoTitulus'].trim() : undefined;
			this.messageSentDate = typeof input['kuldesDatum'] === 'string' ? new Date(input['kuldesDatum']) : undefined;
			this.messageSubject = typeof input['targy'] === 'string' ? input['targy'].trim() : undefined;
			this.messageText = typeof input['szoveg'] === 'string' ? input['szoveg'].trim() : undefined;
			this.previousMessageId = typeof input['elozoUzenetAzonosito'] === 'number' ? input['elozoUzenetAzonosito'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get cimzettLista(): Array<AddresseeDto> | undefined {
		return this.addressList;
	}

	public get csatolmanyok(): Array<AttachmentDto> | undefined {
		return this.attachmentList;
	}

	public get azonosito(): number | undefined {
		return this.messageId;
	}

	public get feladoNev(): string | undefined {
		return this.messageSenderName;
	}

	public get feladoTitulus(): string | undefined {
		return this.messageSenderTitle;
	}

	public get kuldesDatum(): Date | undefined {
		return this.messageSentDate;
	}

	public get targy(): string | undefined {
		return this.messageSubject;
	}

	public get szoveg(): string | undefined {
		return this.messageText;
	}

	public get elozoUzenetAzonosito(): number | undefined {
		return this.previousMessageId;
	}

	public get json(): MessageFields {
		return {
			cimzettLista: this.addressList?.map((adto) => adto.json),
			csatolmanyok: this.attachmentList?.map((adto) => adto.json),
			azonosito: this.messageId,
			feladoNev: this.messageSenderName,
			feladoTitulus: this.messageSenderTitle,
			kuldesDatum: this.messageSentDate,
			targy: this.messageSubject,
			szoveg: this.messageText,
			elozoUzenetAzonosito: this.previousMessageId,
		} as MessageFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<MessageFields> = {
			cimzettLista: this.addressList,
			csatolmanyok: this.attachmentList,
			azonosito: this.messageId,
			feladoNev: this.messageSenderName,
			feladoTitulus: this.messageSenderTitle,
			kuldesDatum: this.messageSentDate,
			targy: this.messageSubject,
			szoveg: this.messageText,
			elozoUzenetAzonosito: this.previousMessageId,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof MessageFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
