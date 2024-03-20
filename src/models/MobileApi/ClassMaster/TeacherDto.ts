import { IsInstance, IsString, validateSync, ValidationError } from 'class-validator';
import EmployeeDto from './EmployeeDto';

export interface TeacherFields {
	Alkalmazott: EmployeeDto;
	Uid: string;
}

export default class TeacherDto implements Partial<TeacherFields> {
	@IsInstance(EmployeeDto)
	private readonly employee?: EmployeeDto;

	@IsString()
	private readonly uid?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.employee = typeof input['Alkalmazott'] === 'object' ? new EmployeeDto(input['Alkalmazott']) : undefined;
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Alkalmazott(): EmployeeDto | undefined {
		return this.employee;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	public get json(): TeacherFields {
		return {
			Alkalmazott: this.employee?.json,
			Uid: this.uid,
		} as TeacherFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<TeacherFields> = {
			Alkalmazott: this.employee,
			Uid: this.uid,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof TeacherFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
