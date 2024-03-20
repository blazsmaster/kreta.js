import { IsInstance, IsString, validateSync, ValidationError } from 'class-validator';
import ValueDescriptor from './ValueDescriptor';

export interface SubjectDescriptorFields {
	Nev: string;
	Kategoria: ValueDescriptor;
	Uid: string;
}

export default class SubjectDescriptor implements Partial<SubjectDescriptorFields> {
	@IsString()
	private readonly name?: string;

	@IsInstance(ValueDescriptor)
	private readonly subjectCategory?: ValueDescriptor;

	@IsString()
	private readonly uid?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.name = typeof input['Nev'] === 'string' ? input['Nev'].trim() : undefined;
			this.subjectCategory = typeof input['Kategoria'] === 'object' ? new ValueDescriptor(input['Kategoria']) : undefined;
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

	public get Kategoria(): ValueDescriptor | undefined {
		return this.subjectCategory;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	public get json(): SubjectDescriptorFields {
		return {
			Kategoria: this.subjectCategory?.json,
			Nev: this.name,
			Uid: this.uid,
		} as SubjectDescriptorFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<SubjectDescriptorFields> = {
			Nev: this.name,
			Kategoria: this.subjectCategory,
			Uid: this.uid,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof SubjectDescriptorFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
