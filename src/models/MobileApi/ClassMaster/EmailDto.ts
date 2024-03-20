import { IsEmail, IsString, validateSync, ValidationError } from 'class-validator';

export interface EmailFields {
	Email: string;
	Uid: string;
}

export default class EmailDto implements Partial<EmailFields> {
	@IsEmail()
	private readonly email?: string;

	@IsString()
	private readonly uid?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.email = typeof input['Email'] === 'string' ? input['Email'].trim() : undefined;
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Email(): string | undefined {
		return this.email;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	get json(): EmailFields {
		return {
			Email: this.email,
			Uid: this.uid,
		} as EmailFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<EmailFields> = {
			Email: this.email,
			Uid: this.uid,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof EmailFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
