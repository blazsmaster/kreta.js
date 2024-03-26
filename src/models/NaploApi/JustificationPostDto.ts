import { IsDate, IsNumber, IsString, validateSync, ValidationError } from 'class-validator';

export interface JustificationPostFields {
	TanuloId: number;
	OsztalyCsoportId: number;
	IgazolasKezdete: Date;
	IgazolasVege: Date;
	IgazolasTipus: string;
	IgazolasMegjegyzes: string;
}

export default class JustificationPostDto implements Partial<JustificationPostFields> {
	@IsNumber()
	private readonly studentId?: number;

	@IsNumber()
	private readonly classGroupId?: number;

	@IsDate()
	private readonly start?: Date;

	@IsDate()
	private readonly end?: Date;

	@IsString()
	private readonly type?: string;

	@IsString()
	private readonly comment?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.studentId = typeof input['TanuloId'] === 'number' ? input['TanuloId'] : undefined;
			this.classGroupId = typeof input['OsztalyCsoportId'] === 'number' ? input['OsztalyCsoportId'] : undefined;
			this.start = typeof input['IgazolasKezdete'] === 'string' ? new Date(input['IgazolasKezdete']) : input['IgazolasKezdete'];
			this.end = typeof input['IgazolasVege'] === 'string' ? new Date(input['IgazolasVege']) : input['IgazolasVege'];
			this.type = typeof input['IgazolasTipus'] === 'string' ? input['IgazolasTipus'].trim() : undefined;
			this.comment = typeof input['IgazolasMegjegyzes'] === 'string' ? input['IgazolasMegjegyzes'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get TanuloId(): number | undefined {
		return this.studentId;
	}

	public get OsztalyCsoportId(): number | undefined {
		return this.classGroupId;
	}

	public get IgazolasKezdete(): Date | undefined {
		return this.start;
	}

	public get IgazolasVege(): Date | undefined {
		return this.end;
	}

	public get IgazolasTipus(): string | undefined {
		return this.type;
	}

	public get IgazolasMegjegyzes(): string | undefined {
		return this.comment;
	}

	public get json(): JustificationPostFields {
		return {
			IgazolasKezdete: this.start,
			IgazolasMegjegyzes: this.comment,
			IgazolasTipus: this.type,
			IgazolasVege: this.end,
			OsztalyCsoportId: this.classGroupId,
			TanuloId: this.studentId,
		} as JustificationPostFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<JustificationPostFields> = {
			TanuloId: this.studentId,
			OsztalyCsoportId: this.classGroupId,
			IgazolasKezdete: this.start,
			IgazolasVege: this.end,
			IgazolasTipus: this.type,
			IgazolasMegjegyzes: this.comment,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof JustificationPostFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
