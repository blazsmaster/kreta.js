import { IsString, validateSync, ValidationError } from 'class-validator';

export interface ValueDescriptorFields {
	Leiras: string;
	Nev: string;
	Uid: string;
}

export default class ValueDescriptor implements Partial<ValueDescriptorFields> {
	@IsString()
	private readonly description?: string;

	@IsString()
	private readonly name?: string;

	@IsString()
	private readonly uid?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.description = typeof input['Leiras'] === 'string' ? input['Leiras'].trim() : undefined;
			this.name = typeof input['Nev'] === 'string' ? input['Nev'].trim() : undefined;
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Leiras(): string | undefined {
		return this.description;
	}

	public get Nev(): string | undefined {
		return this.name;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	public get json(): ValueDescriptorFields {
		return {
			Leiras: this.description,
			Nev: this.name,
			Uid: this.uid,
		} as ValueDescriptorFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<ValueDescriptorFields> = {
			Leiras: this.description,
			Nev: this.name,
			Uid: this.uid,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof ValueDescriptorFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
