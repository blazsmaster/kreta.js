import { IsString, validateSync, ValidationError } from 'class-validator';

export interface UidStructureFields {
	Uid: string;
}

export default class UidStructure implements Partial<UidStructureFields> {
	@IsString()
	private readonly uid?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	get Uid(): string | undefined {
		return this.uid;
	}

	get json(): UidStructureFields {
		return {
			Uid: this.uid,
		} as UidStructureFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<UidStructureFields> = {
			Uid: this.uid,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof UidStructureFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
