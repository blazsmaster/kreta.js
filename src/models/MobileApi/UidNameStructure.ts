import { IsString, validateSync, ValidationError } from 'class-validator';

export interface UidNameStructureFields {
	Nev: string;
	Uid: string;
}

export default class UidNameStructure implements Partial<UidNameStructureFields> {
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

	public get json(): UidNameStructureFields {
		return {
			Nev: this.name,
			Uid: this.uid,
		} as UidNameStructureFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<UidNameStructureFields> = {
			Nev: this.name,
			Uid: this.uid,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof UidNameStructureFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
