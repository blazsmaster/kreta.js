import { IsNumber, IsString, validateSync, ValidationError } from 'class-validator';

export interface StudentFields {
	TanuloId: number;
	TanuloNev: string;
}

export default class StudentDto implements Partial<StudentFields> {
	@IsNumber()
	private readonly studentId?: number;

	@IsString()
	private readonly studentName?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.studentId = typeof input['TanuloId'] === 'number' ? input['TanuloId'] : undefined;
			this.studentName = typeof input['TanuloNev'] === 'string' ? input['TanuloNev'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get TanuloId(): number | undefined {
		return this.studentId;
	}

	public get TanuloNev(): string | undefined {
		return this.studentName;
	}

	public get json(): StudentFields {
		return {
			TanuloId: this.studentId,
			TanuloNev: this.studentName,
		} as StudentFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<StudentFields> = {
			TanuloId: this.studentId,
			TanuloNev: this.studentName,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof StudentFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
