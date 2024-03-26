import { IsBoolean, validateSync, ValidationError } from 'class-validator';

export interface TeacherSettingsRequestFields {
	ElozoOranHianyzoAjanlasa: boolean;
}

export default class TeacherSettingsRequestDto implements Partial<TeacherSettingsRequestFields> {
	@IsBoolean()
	private readonly recommendationOfAbsentStudents?: boolean;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.recommendationOfAbsentStudents = typeof input['ElozoOranHianyzoAjanlasa'] === 'boolean' ? input['ElozoOranHianyzoAjanlasa'] :
				undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get ElozoOranHianyzoAjanlasa(): boolean | undefined {
		return this.recommendationOfAbsentStudents;
	}

	public get json(): TeacherSettingsRequestFields {
		return {
			ElozoOranHianyzoAjanlasa: this.recommendationOfAbsentStudents,
		} as TeacherSettingsRequestFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<TeacherSettingsRequestFields> = {
			ElozoOranHianyzoAjanlasa: this.recommendationOfAbsentStudents,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof TeacherSettingsRequestFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
