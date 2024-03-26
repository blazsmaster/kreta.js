import { IsBoolean, IsNumber, validateSync, ValidationError } from 'class-validator';

export interface MessageLimitationsFields {
	isCsakEgyCimzettLehet: boolean;
	isKuldhetoUzenetekSzamaKorlatozvaVan: boolean;
	kuldhetoUzenetekSzamaMegMa: number;
}

export default class MessageLimitationsDto implements Partial<MessageLimitationsFields> {
	@IsBoolean()
	private readonly isMessageOnlyOneAddresseeLimitation?: boolean;

	@IsBoolean()
	private readonly isSendableMessagesLimitation?: boolean;

	@IsNumber()
	private readonly sendableMessagesTodayCount?: number;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.isMessageOnlyOneAddresseeLimitation = typeof input['isCsakEgyCimzettLehet'] === 'boolean' ? input['isCsakEgyCimzettLehet'] :
				undefined;
			this.isSendableMessagesLimitation = typeof input['isKuldhetoUzenetekSzamaKorlatozvaVan'] === 'boolean' ?
				input['isKuldhetoUzenetekSzamaKorlatozvaVan'] : undefined;
			this.sendableMessagesTodayCount = typeof input['kuldhetoUzenetekSzamaMegMa'] === 'number' ? input['kuldhetoUzenetekSzamaMegMa'] :
				undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get isCsakEgyCimzettLehet(): boolean | undefined {
		return this.isMessageOnlyOneAddresseeLimitation;
	}

	public get isKuldhetoUzenetekSzamaKorlatozvaVan(): boolean | undefined {
		return this.isSendableMessagesLimitation;
	}

	public get kuldhetoUzenetekSzamaMegMa(): number | undefined {
		return this.sendableMessagesTodayCount;
	}

	public get json(): MessageLimitationsFields {
		return {
			isCsakEgyCimzettLehet: this.isMessageOnlyOneAddresseeLimitation,
			isKuldhetoUzenetekSzamaKorlatozvaVan: this.isSendableMessagesLimitation,
			kuldhetoUzenetekSzamaMegMa: this.sendableMessagesTodayCount,
		} as MessageLimitationsFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<MessageLimitationsFields> = {
			isCsakEgyCimzettLehet: this.isMessageOnlyOneAddresseeLimitation,
			isKuldhetoUzenetekSzamaKorlatozvaVan: this.isSendableMessagesLimitation,
			kuldhetoUzenetekSzamaMegMa: this.sendableMessagesTodayCount,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof MessageLimitationsFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
