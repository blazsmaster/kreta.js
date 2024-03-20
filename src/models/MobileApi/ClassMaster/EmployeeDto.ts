import { IsArray, IsInstance, IsString, validateSync, ValidationError } from 'class-validator';
import EmailDto from './EmailDto';
import PhoneDto from './PhoneDto';

export interface EmployeeFields {
	Emailek: Array<EmailDto>;
	Nev: string;
	Telefonok: Array<PhoneDto>;
	Uid: string;
}

export default class EmployeeDto implements Partial<EmployeeFields> {
	@IsArray()
	@IsInstance(EmailDto, { each: true })
	private readonly emailList?: Array<EmailDto>;

	@IsString()
	private readonly name?: string;

	@IsArray()
	@IsInstance(PhoneDto, { each: true })
	private readonly phoneList?: Array<PhoneDto>;

	@IsString()
	private readonly uid?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.emailList = Array.isArray(input['Emailek']) ? input['Emailek'].map((item: any) => new EmailDto(item)) : undefined;
			this.name = typeof input['Nev'] === 'string' ? input['Nev'].trim() : undefined;
			this.phoneList = Array.isArray(input['Telefonok']) ? input['Telefonok'].map((item: any) => new PhoneDto(item)) : undefined;
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Emailek(): Array<EmailDto> | undefined {
		return this.emailList;
	}

	public get Nev(): string | undefined {
		return this.name;
	}

	public get Telefonok(): Array<PhoneDto> | undefined {
		return this.phoneList;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	public get json(): EmployeeFields {
		return {
			Emailek: this.emailList,
			Nev: this.name,
			Telefonok: this.phoneList,
			Uid: this.uid,
		} as EmployeeFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<EmployeeFields> = {
			Emailek: this.emailList,
			Nev: this.name,
			Telefonok: this.phoneList,
			Uid: this.uid,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof EmployeeFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
