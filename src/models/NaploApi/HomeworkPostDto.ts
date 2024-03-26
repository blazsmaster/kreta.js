import { IsDate, IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface HomeworkPostFields {
	OsztalyCsoportId?: number;
	HataridoDatuma?: Date;
	Szoveg?: string;
	OraDatum?: Date;
	TantargyId: number;
}

export default class HomeworkPostDto implements Partial<HomeworkPostFields> {
	@IsOptional()
	@IsNumber()
	private readonly classGroupId?: number;

	@IsOptional()
	@IsDate()
	private readonly deadline?: Date;

	@IsOptional()
	@IsString()
	private readonly description?: string;

	@IsOptional()
	@IsDate()
	private readonly lessonDate?: Date;

	@IsNumber()
	private readonly subjectId?: number;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.classGroupId = typeof input['OsztalyCsoportId'] === 'number' ? input['OsztalyCsoportId'] : undefined;
			this.deadline = typeof input['HataridoDatuma'] === 'string' ? new Date(input['HataridoDatuma']) : input['HataridoDatuma'];
			this.description = typeof input['Szoveg'] === 'string' ? input['Szoveg'] : undefined;
			this.lessonDate = typeof input['OraDatum'] === 'string' ? new Date(input['OraDatum']) : input['OraDatum'];
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

	public get HataridoDatuma(): Date | undefined {
		return this.deadline;
	}

	public get Szoveg(): string | undefined {
		return this.description;
	}

	public get OraDatum(): Date | undefined {
		return this.lessonDate;
	}

	public get TantargyId(): number | undefined {
		return this.subjectId;
	}

	public get json(): HomeworkPostFields {
		return {
			HataridoDatuma: this.deadline,
			OraDatum: this.lessonDate,
			OsztalyCsoportId: this.classGroupId,
			Szoveg: this.description,
			TantargyId: this.subjectId,
		} as HomeworkPostFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<HomeworkPostFields> = {
			OsztalyCsoportId: this.classGroupId,
			HataridoDatuma: this.deadline,
			Szoveg: this.description,
			OraDatum: this.lessonDate,
			TantargyId: this.subjectId,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof HomeworkPostFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
