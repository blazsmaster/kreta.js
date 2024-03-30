import { IsArray, IsInstance, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';
import KretaExceptionErrorItem from './KretaExceptionErrorItem';

export interface KretaExceptionErrorFields {
	ExceptionId: string;
	ExceptionType: string;
	Message: string;
	ErrorList?: Array<KretaExceptionErrorItem>;
}

export default class KretaExceptionError implements Partial<KretaExceptionErrorFields> {
	@IsString()
	private readonly exceptionId?: string;

	@IsString()
	private readonly exceptionType?: string;

	@IsString()
	private readonly message?: string;

	@IsOptional()
	@IsArray()
	@IsInstance(KretaExceptionErrorItem, { each: true })
	private readonly errorList?: Array<KretaExceptionErrorItem>;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.exceptionId = typeof input['ExceptionId'] === 'string' ? input['ExceptionId'].trim() : undefined;
			this.exceptionType = typeof input['ExceptionType'] === 'string' ? input['ExceptionType'].trim() : undefined;
			this.message = typeof input['Message'] === 'string' ? input['Message'].trim() : undefined;
			this.errorList = Array.isArray(input['ErrorList']) ? input['ErrorList'].map((item: any) => new KretaExceptionErrorItem(item)) : undefined;
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

	public get ErrorList(): Array<KretaExceptionErrorItem> | undefined {
		return this.errorList;
	}

	public get json(): KretaExceptionErrorFields {
		return {
			ErrorList: this.errorList?.map((item) => item.json),
			ExceptionId: this.exceptionId,
			ExceptionType: this.exceptionType,
			Message: this.message,
		} as KretaExceptionErrorFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<KretaExceptionErrorFields> = {
			ExceptionId: this.exceptionId,
			ExceptionType: this.exceptionType,
			Message: this.message,
			ErrorList: this.errorList,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof KretaExceptionErrorFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
