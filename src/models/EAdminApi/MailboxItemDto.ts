import { IsBoolean, IsInstance, IsString, validateSync, ValidationError } from 'class-validator';
import MessageDto from './MessageDto';
import TypeDto from './TypeDto';

export interface MailboxItemFields {
	isToroltElem: boolean;
	uzenet: MessageDto;
	isElolvasva: boolean;
	tipus: TypeDto;
	azonosito: string;
}

export default class MailboxItemDto implements Partial<MailboxItemFields> {
	@IsBoolean()
	private readonly isDeleted?: boolean;

	@IsInstance(MessageDto)
	private readonly message?: MessageDto;

	@IsBoolean()
	private readonly readByUser?: boolean;

	@IsInstance(TypeDto)
	private readonly type?: TypeDto;

	@IsString()
	private readonly uid?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.isDeleted = typeof input['isToroltElem'] === 'boolean' ? input['isToroltElem'] : undefined;
			this.message = typeof input['uzenet'] === 'object' ? new MessageDto(input['uzenet']) : undefined;
			this.readByUser = typeof input['isElolvasva'] === 'boolean' ? input['isElolvasva'] : undefined;
			this.type = typeof input['tipus'] === 'object' ? new TypeDto(input['tipus']) : undefined;
			this.uid = typeof input['azonosito'] === 'string' ? input['azonosito'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get isToroltElem(): boolean | undefined {
		return this.isDeleted;
	}

	public get uzenet(): MessageDto | undefined {
		return this.message;
	}

	public get isElolvasva(): boolean | undefined {
		return this.readByUser;
	}

	public get tipus(): TypeDto | undefined {
		return this.type;
	}

	public get azonosito(): string | undefined {
		return this.uid;
	}

	public get json(): MailboxItemFields {
		return {
			azonosito: this.uid,
			isElolvasva: this.readByUser,
			isToroltElem: this.isDeleted,
			tipus: this.type?.json,
			uzenet: this.message?.json,
		} as MailboxItemFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<MailboxItemFields> = {
			azonosito: this.uid,
			isElolvasva: this.readByUser,
			isToroltElem: this.isDeleted,
			tipus: this.type,
			uzenet: this.message,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof MailboxItemFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
