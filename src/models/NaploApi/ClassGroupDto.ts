import { IsBoolean, IsNumber, IsString, validateSync, ValidationError } from 'class-validator';

export interface ClassGroupFields {
	OsztalyCsoportId: number;
	OsztalyCsoportNev: string;
	IsTanitom: boolean;
}

export default class ClassGroupDto implements Partial<ClassGroupFields> {
	@IsNumber()
	private readonly classGroupId?: number;

	@IsString()
	private readonly classGroupName?: string;

	@IsBoolean()
	private readonly isMyClassGroup?: boolean;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.classGroupId = typeof input['OsztalyCsoportId'] === 'number' ? input['OsztalyCsoportId'] : undefined;
			this.classGroupName = typeof input['OsztalyCsoportNev'] === 'string' ? input['OsztalyCsoportNev'].trim() : undefined;
			this.isMyClassGroup = typeof input['IsTanitom'] === 'boolean' ? input['IsTanitom'] : undefined;
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

	public get IsTanitom(): boolean | undefined {
		return this.isMyClassGroup;
	}

	public get json(): ClassGroupFields {
		return {
			IsTanitom: this.isMyClassGroup,
			OsztalyCsoportId: this.classGroupId,
			OsztalyCsoportNev: this.classGroupName,
		} as ClassGroupFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<ClassGroupFields> = {
			OsztalyCsoportId: this.classGroupId,
			OsztalyCsoportNev: this.classGroupName,
			IsTanitom: this.isMyClassGroup,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof ClassGroupFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
