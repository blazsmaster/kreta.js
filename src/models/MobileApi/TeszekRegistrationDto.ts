import { IsString, validateSync, ValidationError } from 'class-validator';

export interface TeszekRegistrationFields {
	Id: string;
	RegisztracioIdopontja: string;
}

export default class TeszekRegistrationDto implements Partial<TeszekRegistrationFields> {
	@IsString()
	private readonly id?: string;

	@IsString()
	private readonly registrationDateAsString?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.id = typeof input['Id'] === 'string' ? input['Id'].trim() : undefined;
			this.registrationDateAsString = typeof input['RegisztracioIdopontja'] === 'string' ? input['RegisztracioIdopontja'].trim() :
				undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Id(): string | undefined {
		return this.id;
	}

	public get RegisztracioIdopontja(): string | undefined {
		return this.registrationDateAsString;
	}

	public get json(): TeszekRegistrationFields {
		return {
			Id: this.id,
			RegisztracioIdopontja: this.registrationDateAsString,
		} as TeszekRegistrationFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<TeszekRegistrationFields> = {
			Id: this.id,
			RegisztracioIdopontja: this.registrationDateAsString,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof TeszekRegistrationFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
