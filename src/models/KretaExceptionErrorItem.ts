import { IsString, validateSync, ValidationError } from 'class-validator';

export interface KretaExceptionErrorItemFields {
	PropertyName: string;
	Message: string;
	ExceptionType: string;
}

export default class KretaExceptionErrorItem implements Partial<KretaExceptionErrorItemFields> {
	@IsString()
	private readonly propertyName?: string;

	@IsString()
	private readonly message?: string;

	@IsString()
	private readonly exceptionType?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.propertyName = typeof input['PropertyName'] === 'string' ? input['PropertyName'].trim() : undefined;
			this.message = typeof input['Message'] === 'string' ? input['Message'].trim() : undefined;
			this.exceptionType = typeof input['ExceptionType'] === 'string' ? input['ExceptionType'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get PropertyName(): string | undefined {
		return this.propertyName;
	}

	public get Message(): string | undefined {
		return this.message;
	}

	public get ExceptionType(): string | undefined {
		return this.exceptionType;
	}

	public get json(): KretaExceptionErrorItemFields {
		return {
			ExceptionType: this.exceptionType,
			Message: this.message,
			PropertyName: this.propertyName,
		} as KretaExceptionErrorItemFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<KretaExceptionErrorItemFields> = {
			PropertyName: this.propertyName,
			Message: this.message,
			ExceptionType: this.exceptionType,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof KretaExceptionErrorItemFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
