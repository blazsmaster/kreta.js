import { IsArray, IsBoolean, IsNumber, validateSync, ValidationError } from 'class-validator';

export interface SendMessageToBinRequestFields {
	isKuka: boolean;
	postaladaElemAzonositoLista: Array<number>;
}

export default class SendMessageToBinRequestDto implements Partial<SendMessageToBinRequestFields> {
	@IsBoolean()
	private readonly deleted?: boolean;

	@IsArray()
	@IsNumber({}, { each: true })
	private readonly mailBoxItemId?: Array<number>;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.deleted = typeof input['isKuka'] === 'boolean' ? input['isKuka'] : undefined;
			this.mailBoxItemId = Array.isArray(input['postaladaElemAzonositoLista']) ?
				input['postaladaElemAzonositoLista'].map((item: any) => Number(item)) : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get isKuka(): boolean | undefined {
		return this.deleted;
	}

	public get postaladaElemAzonositoLista(): Array<number> | undefined {
		return this.mailBoxItemId;
	}

	public get json(): SendMessageToBinRequestFields {
		return {
			isKuka: this.deleted,
			postaladaElemAzonositoLista: this.mailBoxItemId,
		} as SendMessageToBinRequestFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<SendMessageToBinRequestFields> = {
			isKuka: this.deleted,
			postaladaElemAzonositoLista: this.mailBoxItemId,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof SendMessageToBinRequestFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
