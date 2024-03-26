import { IsNumber, validateSync, ValidationError } from 'class-validator';

export interface StudentNoteFields {
	Id: number;
	Tipus: number;
}

export default class StudentNoteDto implements Partial<StudentNoteFields> {
	@IsNumber()
	private readonly id?: number;

	@IsNumber()
	private readonly type?: number;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.id = typeof input['Id'] === 'number' ? input['Id'] : undefined;
			this.type = typeof input['Tipus'] === 'number' ? input['Tipus'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Id(): number | undefined {
		return this.id;
	}

	public get Tipus(): number | undefined {
		return this.type;
	}

	public get json(): StudentNoteFields {
		return {
			Id: this.id,
			Tipus: this.type,
		} as StudentNoteFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<StudentNoteFields> = {
			Id: this.id,
			Tipus: this.type,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof StudentNoteFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
