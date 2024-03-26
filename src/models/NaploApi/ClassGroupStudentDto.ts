import { IsArray, IsDate, IsInstance, IsNumber, IsString, validateSync, ValidationError } from 'class-validator';
import ClassGroupGuardianDto from './ClassGroupStudent/ClassGroupGuardianDto';
import ClassGroupDto from './ClassGroupStudent/ClassGroupDto';

export interface ClassGroupStudentFields {
	TanuloId: number;
	TanuloNev: string;
	TanuloSzuletesiDatum: Date;
	TanuloAnyjaNeve: string;
	OsztalyCsoportok: Array<ClassGroupDto>;
	Gondviselok: Array<ClassGroupGuardianDto>;
}

export default class ClassGroupStudentDto implements Partial<ClassGroupStudentFields> {
	@IsNumber()
	private readonly studentId?: number;

	@IsString()
	private readonly studentName?: string;

	@IsDate()
	private readonly studentBirthDate?: Date;

	@IsString()
	private readonly studentMotherName?: string;

	@IsArray()
	@IsInstance(ClassGroupDto, { each: true })
	private readonly studentClassGroups?: Array<ClassGroupDto>;

	@IsArray()
	@IsInstance(ClassGroupGuardianDto, { each: true })
	private readonly studentGuardians?: Array<ClassGroupGuardianDto>;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.studentId = typeof input['TanuloId'] === 'number' ? input['TanuloId'] : undefined;
			this.studentName = typeof input['TanuloNev'] === 'string' ? input['TanuloNev'].trim() : undefined;
			this.studentBirthDate = input['TanuloSzuletesiDatum'] ? new Date(input['TanuloSzuletesiDatum']) : undefined;
			this.studentMotherName = typeof input['TanuloAnyjaNeve'] === 'string' ? input['TanuloAnyjaNeve'].trim() : undefined;
			this.studentClassGroups = Array.isArray(input['OsztalyCsoportok']) ?
				input['OsztalyCsoportok'].map((item: any) => new ClassGroupDto(item)) : [];
			this.studentGuardians = Array.isArray(input['Gondviselok']) ?
				input['Gondviselok'].map((item: any) => new ClassGroupGuardianDto(item)) : [];
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

	public get TanuloSzuletesiDatum(): Date | undefined {
		return this.studentBirthDate;
	}

	public get TanuloAnyjaNeve(): string | undefined {
		return this.studentMotherName;
	}

	public get OsztalyCsoportok(): Array<ClassGroupDto> | undefined {
		return this.studentClassGroups;
	}

	public get Gondviselok(): Array<ClassGroupGuardianDto> | undefined {
		return this.studentGuardians;
	}

	public get json(): ClassGroupStudentFields {
		return {
			Gondviselok: this.studentGuardians?.map((item) => item.json),
			OsztalyCsoportok: this.studentClassGroups?.map((item) => item.json),
			TanuloAnyjaNeve: this.studentMotherName,
			TanuloId: this.studentId,
			TanuloNev: this.studentName,
			TanuloSzuletesiDatum: this.studentBirthDate,
		} as ClassGroupStudentFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<ClassGroupStudentFields> = {
			TanuloId: this.studentId,
			TanuloNev: this.studentName,
			TanuloSzuletesiDatum: this.studentBirthDate,
			TanuloAnyjaNeve: this.studentMotherName,
			OsztalyCsoportok: this.studentClassGroups,
			Gondviselok: this.studentGuardians,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof ClassGroupStudentFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
