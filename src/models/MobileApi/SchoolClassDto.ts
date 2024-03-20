import { IsInstance, IsString, validateSync, ValidationError } from 'class-validator';
import ValueDescriptor from './ValueDescriptor';

export interface SchoolClassFields {
	OktatasNevelesiKategoria: ValueDescriptor;
	Nev: string;
	Uid: string;
}

export default class SchoolClassDto implements Partial<SchoolClassFields> {
	@IsInstance(ValueDescriptor)
	private readonly category?: ValueDescriptor;

	@IsString()
	private readonly name?: string;

	@IsString()
	private readonly uid?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.category = typeof input['OktatasNevelesiKategoria'] === 'object' ? new ValueDescriptor(input['OktatasNevelesiKategoria']) :
				undefined;
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

	public get OkatasNevelesiKategoria(): ValueDescriptor | undefined {
		return this.category;
	}

	public get json(): SchoolClassFields {
		return {
			Nev: this.name,
			OktatasNevelesiKategoria: this.category?.json,
			Uid: this.uid,
		} as SchoolClassFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<SchoolClassFields> = {
			Nev: this.name,
			OktatasNevelesiKategoria: this.category,
			Uid: this.uid,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof SchoolClassFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
