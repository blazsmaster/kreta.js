import { IsArray, IsBoolean, IsNumber, validateSync, ValidationError } from 'class-validator';

export interface ReadMessageRequestFields {
	postaladaElemAzonositoLista: Array<number>;
	isOlvasott: boolean;
}

export default class ReadMessageRequestDto implements Partial<ReadMessageRequestFields> {
	@IsArray()
	@IsNumber({}, { each: true })
	private readonly mailBoxItemId?: Array<number>;

	@IsBoolean()
	private readonly readByUser?: boolean;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.mailBoxItemId = Array.isArray(input['postaladaElemAzonositoLista']) ? input['postaladaElemAzonositoLista'] : undefined;
			this.readByUser = typeof input['isOlvasott'] === 'boolean' ? input['isOlvasott'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get postaladaElemAzonositoLista(): Array<number> | undefined {
		return this.mailBoxItemId;
	}

	public get isOlvasott(): boolean | undefined {
		return this.readByUser;
	}

	public get json(): ReadMessageRequestFields {
		return {
			isOlvasott: this.readByUser,
			postaladaElemAzonositoLista: this.mailBoxItemId,
		} as ReadMessageRequestFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<ReadMessageRequestFields> = {
			isOlvasott: this.readByUser,
			postaladaElemAzonositoLista: this.mailBoxItemId,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof ReadMessageRequestFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
