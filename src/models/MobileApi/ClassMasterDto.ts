import { IsArray, IsInstance, IsString, validateSync, ValidationError } from 'class-validator';
import SchoolClassDto from './SchoolClassDto';
import TeacherDto from './ClassMaster/TeacherDto';

export interface ClassMasterFields {
	Osztalyai: Array<SchoolClassDto>;
	Tanar: TeacherDto;
	Uid: string;
}

export default class ClassMasterDto implements Partial<ClassMasterFields> {
	@IsArray()
	@IsInstance(SchoolClassDto, { each: true })
	private readonly classList?: Array<SchoolClassDto>;

	@IsInstance(TeacherDto)
	private readonly teacher?: TeacherDto;

	@IsString()
	private readonly uid?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.classList = Array.isArray(input['Osztalyai']) ? input['Osztalyai'].map((item: any) => new SchoolClassDto(item)) : undefined;
			this.teacher = typeof input['Tanar'] === 'object' ? new TeacherDto(input['Tanar']) : undefined;
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Osztalyai(): Array<SchoolClassDto> | undefined {
		return this.classList;
	}

	public get Tanar(): TeacherDto | undefined {
		return this.teacher;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	public get json(): ClassMasterFields {
		return {
			Osztalyai: this.classList,
			Tanar: this.teacher?.json,
			Uid: this.uid,
		} as ClassMasterFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<ClassMasterFields> = {
			Osztalyai: this.classList,
			Tanar: this.teacher,
			Uid: this.uid,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof ClassMasterFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
