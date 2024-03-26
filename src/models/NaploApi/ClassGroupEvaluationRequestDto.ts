import { IsArray, IsDate, IsInstance, IsNumber, IsString, validateSync, ValidationError } from 'class-validator';
import StudentEvaluationRequestDto from './StudentEvaluationRequestDto';

export interface ClassGroupEvaluationRequestFields {
	OsztalyCsoportId: number;
	Datum: Date;
	Mod: number;
	Tema: string;
	TanuloLista: Array<StudentEvaluationRequestDto>;
}

export default class ClassGroupEvaluationRequestDto implements Partial<ClassGroupEvaluationRequestFields> {
	@IsNumber()
	private readonly classGroupId?: number;

	@IsDate()
	private readonly date?: Date;

	@IsNumber()
	private readonly evaluationMode?: number;

	@IsString()
	private readonly evaluationTopic?: string;

	@IsArray()
	@IsInstance(StudentEvaluationRequestDto, { each: true })
	private readonly studentEvaluationList?: Array<StudentEvaluationRequestDto>;

	@IsNumber()
	private readonly subjectId?: number;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.classGroupId = typeof input['OsztalyCsoportId'] === 'number' ? input['OsztalyCsoportId'] : undefined;
			this.date = typeof input['Datum'] === 'string' ? new Date(input['Datum']) : input['Datum'];
			this.evaluationMode = typeof input['Mod'] === 'number' ? input['Mod'] : undefined;
			this.evaluationTopic = typeof input['Tema'] === 'string' ? input['Tema'] : undefined;
			this.studentEvaluationList = Array.isArray(input['TanuloLista']) ?
				input['TanuloLista'].map((e: any) => new StudentEvaluationRequestDto(e)) : undefined;
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

	public get Datum(): Date | undefined {
		return this.date;
	}

	public get Mod(): number | undefined {
		return this.evaluationMode;
	}

	public get Tema(): string | undefined {
		return this.evaluationTopic;
	}

	public get TanuloLista(): Array<StudentEvaluationRequestDto> | undefined {
		return this.studentEvaluationList;
	}

	public get TantargyId(): number | undefined {
		return this.subjectId;
	}

	public get json(): ClassGroupEvaluationRequestFields {
		return {
			Datum: this.date,
			Mod: this.evaluationMode,
			OsztalyCsoportId: this.classGroupId,
			TanuloLista: this.studentEvaluationList?.map((e) => e.json),
			Tema: this.evaluationTopic,
		} as ClassGroupEvaluationRequestFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<ClassGroupEvaluationRequestFields> = {
			OsztalyCsoportId: this.classGroupId,
			Datum: this.date,
			Mod: this.evaluationMode,
			Tema: this.evaluationTopic,
			TanuloLista: this.studentEvaluationList,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof ClassGroupEvaluationRequestFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
