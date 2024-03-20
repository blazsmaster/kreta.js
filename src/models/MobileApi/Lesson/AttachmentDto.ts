import { IsString, validateSync, ValidationError } from 'class-validator';
import { AttachmentFields } from '../Homework/AttachmentDto';

export default class AttachmentDto implements Partial<Omit<AttachmentFields, 'Tipus'>> {
	@IsString()
	private readonly name?: string;

	@IsString()
	private readonly uid?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.name = typeof input['Nev'] === 'string' ? input['Nev'].trim() : undefined;
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Nev(): string | undefined {
		return this.name;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	public get json(): Omit<AttachmentFields, 'Tipus'> {
		return {
			Nev: this.name,
			Uid: this.uid,
		} as Omit<AttachmentFields, 'Tipus'>;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<Omit<AttachmentFields, 'Tipus'>> = {
			Nev: this.name,
			Uid: this.uid,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof Omit<AttachmentFields, 'Tipus'>] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
