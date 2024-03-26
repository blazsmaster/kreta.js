import { IsArray, IsBoolean, IsInstance, IsString, validateSync, ValidationError } from 'class-validator';
import StudentDataForLoggingRequestDto from './StudentDataForLoggingRequestDto';

export interface LessonLoggingRequestFields {
	IsElmaradt: boolean;
	TanuloLista: Array<StudentDataForLoggingRequestDto>;
	OrarendElemUid: string;
	Tema: string;
}

export default class LessonLoggingRequestDto implements Partial<LessonLoggingRequestFields> {
	@IsBoolean()
	private readonly canceled?: boolean;

	@IsArray()
	@IsInstance(StudentDataForLoggingRequestDto, { each: true })
	private readonly studentRequestDataList?: Array<StudentDataForLoggingRequestDto>;

	@IsString()
	private readonly timetableElementId?: string;

	@IsString()
	private readonly topic?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.canceled = typeof input['IsElmaradt'] === 'boolean' ? input['IsElmaradt'] : undefined;
			this.studentRequestDataList = Array.isArray(input['TanuloLista']) ?
				input['TanuloLista'].map((e: any) => new StudentDataForLoggingRequestDto(e)) : undefined;
			this.timetableElementId = typeof input['OrarendElemUid'] === 'string' ? input['OrarendElemUid'] : undefined;
			this.topic = typeof input['Tema'] === 'string' ? input['Tema'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get IsElmaradt(): boolean | undefined {
		return this.canceled;
	}

	public get TanuloLista(): Array<StudentDataForLoggingRequestDto> | undefined {
		return this.studentRequestDataList;
	}

	public get OrarendElemUid(): string | undefined {
		return this.timetableElementId;
	}

	public get Tema(): string | undefined {
		return this.topic;
	}

	public get json(): LessonLoggingRequestFields {
		return {
			IsElmaradt: this.canceled,
			OrarendElemUid: this.timetableElementId,
			TanuloLista: this.studentRequestDataList?.map(e => e.json),
			Tema: this.topic,
		} as LessonLoggingRequestFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<LessonLoggingRequestFields> = {
			IsElmaradt: this.canceled,
			OrarendElemUid: this.timetableElementId,
			TanuloLista: this.studentRequestDataList,
			Tema: this.topic,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof LessonLoggingRequestFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
