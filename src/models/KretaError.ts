import { IsArray, IsInstance, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';
import KretaErrorItem from './KretaErrorItem';

export interface KretaErrorFields {
	ExceptionId: string;
	ExceptionType: string;
	Message: string;
	ErrorList: Array<KretaErrorItem> | null;
}

export default class KretaError implements Partial<KretaErrorFields> {
	@IsString()
	private readonly exceptionId?: string;

	@IsString()
	private readonly exceptionType?: string;

	@IsString()
	private readonly message?: string;

	@IsOptional()
	@IsArray()
	@IsInstance(KretaErrorItem, { each: true })
	private readonly errorList?: Array<KretaErrorItem>;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.exceptionId = typeof input['ExceptionId'] === 'string' ? input['ExceptionId'].trim() : undefined;
			this.exceptionType = typeof input['ExceptionType'] === 'string' ? input['ExceptionType'].trim() : undefined;
			this.message = typeof input['Message'] === 'string' ? input['Message'].trim() : undefined;
			this.errorList = Array.isArray(input['ErrorList']) ? input['ErrorList'].map((item: any) => new KretaErrorItem(item)) : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get ExceptionId(): string | undefined {
		return this.exceptionId;
	}

	public get ExceptionType(): string | undefined {
		return this.exceptionType;
	}

	public get Message(): string | undefined {
		return this.message;
	}

	public get ErrorList(): Array<KretaErrorItem> | null | undefined {
		return this.errorList;
	}

	public get json(): KretaErrorFields {
		return {
			ErrorList: this.errorList?.map((item) => item.json),
			ExceptionId: this.exceptionId,
			ExceptionType: this.exceptionType,
			Message: this.message,
		} as KretaErrorFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<KretaErrorFields> = {
			ExceptionId: this.exceptionId,
			ExceptionType: this.exceptionType,
			Message: this.message,
			ErrorList: this.errorList,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof KretaErrorFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
