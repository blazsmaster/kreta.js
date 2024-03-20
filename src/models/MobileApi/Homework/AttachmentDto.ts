import { IsString, validateSync, ValidationError } from 'class-validator';

export interface AttachmentFields {
	Nev: string;
	Tipus: string;
	Uid: string;
}

export default class AttachmentDto implements Partial<AttachmentFields> {
	@IsString()
	private readonly name?: string;

	@IsString()
	private readonly type?: string;

	@IsString()
	private readonly uid?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.name = typeof input['Nev'] === 'string' ? input['Nev'].trim() : undefined;
			this.type = typeof input['Tipus'] === 'string' ? input['Tipus'].trim() : undefined;
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

	public get Tipus(): string | undefined {
		return this.type;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	public get json(): AttachmentFields {
		return {
			Nev: this.name,
			Tipus: this.type,
			Uid: this.uid,
		} as AttachmentFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<AttachmentFields> = {
			Nev: this.name,
			Tipus: this.type,
			Uid: this.uid,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof AttachmentFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
