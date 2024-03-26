import { IsArray, IsInstance, IsNumber, validateSync, ValidationError } from 'class-validator';
import StudentNoteDto from './StudentNoteDto';

export interface StudentNotesFields {
	FeljegyzesLista: Array<StudentNoteDto>;
	TanuloId: number;
}

export default class StudentNotesDto implements Partial<StudentNotesFields> {
	@IsArray()
	@IsInstance(StudentNoteDto, { each: true })
	private readonly notes?: Array<StudentNoteDto>;

	@IsNumber()
	private readonly studentId?: number;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.notes = Array.isArray(input['FeljegyzesLista']) ? input['FeljegyzesLista'].map((item: any) => new StudentNoteDto(item)) :
				undefined;
			this.studentId = typeof input['TanuloId'] === 'number' ? input['TanuloId'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get FeljegyzesLista(): Array<StudentNoteDto> | undefined {
		return this.notes;
	}

	public get TanuloId(): number | undefined {
		return this.studentId;
	}

	public get json(): StudentNotesFields {
		return {
			FeljegyzesLista: this.notes?.map(item => item.json),
			TanuloId: this.studentId,
		} as StudentNotesFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<StudentNotesFields> = {
			FeljegyzesLista: this.notes,
			TanuloId: this.studentId,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof StudentNotesFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
