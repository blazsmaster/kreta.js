import { IsPhoneNumber, IsString, validateSync, ValidationError } from 'class-validator';

export interface PhoneFields {
	Telefonszam: string;
	Uid: string;
}

export default class PhoneDto implements Partial<PhoneFields> {
	@IsPhoneNumber()
	private readonly phone?: string;

	@IsString()
	private readonly uid?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.phone = typeof input['Telefonszam'] === 'string' ? input['Telefonszam'].trim() : undefined;
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Telefonszam(): string | undefined {
		return this.phone;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	get json(): PhoneFields {
		return {
			Telefonszam: this.phone,
			Uid: this.uid,
		} as PhoneFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<PhoneFields> = {
			Telefonszam: this.phone,
			Uid: this.uid,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof PhoneFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
