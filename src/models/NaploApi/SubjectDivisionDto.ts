import { IsNumber, IsString, validateSync, ValidationError } from 'class-validator';

export interface SubjectDivisionFields {
	OsztalyCsoportId: number;
	OsztalyCsoportNev: string;
	TantargyId: number;
}

export default class SubjectDivisionDto implements Partial<SubjectDivisionFields> {
	@IsNumber()
	private readonly classGroupId?: number;

	@IsString()
	private readonly classGroupName?: string;

	@IsNumber()
	private readonly subjectId?: number;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.classGroupId = typeof input['OsztalyCsoportId'] === 'number' ? input['OsztalyCsoportId'] : undefined;
			this.classGroupName = typeof input['OsztalyCsoportNev'] === 'string' ? input['OsztalyCsoportNev'].trim() : undefined;
			this.subjectId = typeof input['TantargyId'] === 'number' ? input['TantargyId'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get OsztalyCsoportId(): number | undefined {
		return this.classGroupId;
	}

	public get OsztalyCsoportNev(): string | undefined {
		return this.classGroupName;
	}

	public get TantargyId(): number | undefined {
		return this.subjectId;
	}

	public get json(): SubjectDivisionFields {
		return {
			OsztalyCsoportId: this.classGroupId,
			OsztalyCsoportNev: this.classGroupName,
			TantargyId: this.subjectId,
		} as SubjectDivisionFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<SubjectDivisionFields> = {
			OsztalyCsoportId: this.classGroupId,
			OsztalyCsoportNev: this.classGroupName,
			TantargyId: this.subjectId,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof SubjectDivisionFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
