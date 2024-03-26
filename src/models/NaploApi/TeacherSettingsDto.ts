import { IsArray, IsBoolean, IsNumber, validateSync, ValidationError } from 'class-validator';

export interface TeacherSettingsFields {
	LimitaltSzamonkeresekTipusai: Array<number>;
	ElozoOranHianyzoAjanlasa: boolean;
	NapiSzamonkeresLimit: number;
}

export default class TeacherSettingsDto implements Partial<TeacherSettingsFields> {
	@IsArray()
	@IsNumber({}, { each: true })
	private readonly limitedTestTypes?: Array<number>;

	@IsBoolean()
	private readonly recommendationOfAbsentStudents?: boolean;

	@IsNumber()
	private readonly testDailyLimit?: number;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.limitedTestTypes = Array.isArray(input['LimitaltSzamonkeresekTipusai']) ? input['LimitaltSzamonkeresekTipusai'] : [];
			this.recommendationOfAbsentStudents = typeof input['ElozoOranHianyzoAjanlasa'] === 'boolean' ? input['ElozoOranHianyzoAjanlasa'] :
				undefined;
			this.testDailyLimit = typeof input['NapiSzamonkeresLimit'] === 'number' ? input['NapiSzamonkeresLimit'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get LimitaltSzamonkeresekTipusai(): Array<number> | undefined {
		return this.limitedTestTypes;
	}

	public get ElozoOranHianyzoAjanlasa(): boolean | undefined {
		return this.recommendationOfAbsentStudents;
	}

	public get NapiSzamonkeresLimit(): number | undefined {
		return this.testDailyLimit;
	}

	public get json(): TeacherSettingsFields {
		return {
			ElozoOranHianyzoAjanlasa: this.recommendationOfAbsentStudents,
			LimitaltSzamonkeresekTipusai: this.limitedTestTypes,
			NapiSzamonkeresLimit: this.testDailyLimit,
		} as TeacherSettingsFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<TeacherSettingsFields> = {
			LimitaltSzamonkeresekTipusai: this.limitedTestTypes,
			ElozoOranHianyzoAjanlasa: this.recommendationOfAbsentStudents,
			NapiSzamonkeresLimit: this.testDailyLimit,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof TeacherSettingsFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
