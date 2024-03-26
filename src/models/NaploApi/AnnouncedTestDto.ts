import { IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface AnnouncedTestFields {
	Id: number;
	OraSzam: number;
	ErtekelesMod?: number;
	ErtekelesModNev?: string;
	TantargyId: number;
	TantargyNev: string;
	TanarNev: string;
	TanarUid: string;
	Tema?: string;
}

export default class AnnouncedTestDto implements Partial<AnnouncedTestFields> {
	@IsNumber()
	private readonly announcedTestId?: number;

	@IsNumber()
	private readonly lessonNumber?: number;

	@IsOptional()
	@IsNumber()
	private readonly modeId?: number;

	@IsOptional()
	@IsString()
	private readonly modeName?: string;

	@IsNumber()
	private readonly subjectId?: number;

	@IsString()
	private readonly subjectName?: string;

	@IsString()
	private readonly teacherName?: string;

	@IsString()
	private readonly teacherUid?: string;

	@IsOptional()
	@IsString()
	private readonly topic?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.announcedTestId = typeof input['Id'] === 'number' ? input['Id'] : undefined;
			this.lessonNumber = typeof input['OraSzam'] === 'number' ? input['OraSzam'] : undefined;
			this.modeId = typeof input['ErtekelesMod'] === 'number' ? input['ErtekelesMod'] : undefined;
			this.modeName = typeof input['ErtekelesModNev'] === 'string' ? input['ErtekelesModNev'].trim() : undefined;
			this.subjectId = typeof input['TantargyId'] === 'number' ? input['TantargyId'] : undefined;
			this.subjectName = typeof input['TantargyNev'] === 'string' ? input['TantargyNev'].trim() : undefined;
			this.teacherName = typeof input['TanarNev'] === 'string' ? input['TanarNev'].trim() : undefined;
			this.teacherUid = typeof input['TanarUid'] === 'string' ? input['TanarUid'].trim() : undefined;
			this.topic = typeof input['Tema'] === 'string' ? input['Tema'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Id(): number | undefined {
		return this.announcedTestId;
	}

	public get OraSzam(): number | undefined {
		return this.lessonNumber;
	}

	public get ErtekelesMod(): number | undefined {
		return this.modeId;
	}

	public get ErtekelesModNev(): string | undefined {
		return this.modeName;
	}

	public get TantargyId(): number | undefined {
		return this.subjectId;
	}

	public get TantargyNev(): string | undefined {
		return this.subjectName;
	}

	public get TanarNev(): string | undefined {
		return this.teacherName;
	}

	public get TanarUid(): string | undefined {
		return this.teacherUid;
	}

	public get Tema(): string | undefined {
		return this.topic;
	}

	public get json(): AnnouncedTestFields {
		return {
			ErtekelesMod: this.modeId,
			ErtekelesModNev: this.modeName,
			Id: this.announcedTestId,
			OraSzam: this.lessonNumber,
			TanarNev: this.teacherName,
			TanarUid: this.teacherUid,
			TantargyId: this.subjectId,
			TantargyNev: this.subjectName,
			Tema: this.topic,
		} as AnnouncedTestFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<AnnouncedTestFields> = {
			Id: this.announcedTestId,
			OraSzam: this.lessonNumber,
			ErtekelesMod: this.modeId,
			ErtekelesModNev: this.modeName,
			TantargyId: this.subjectId,
			TantargyNev: this.subjectName,
			TanarNev: this.teacherName,
			TanarUid: this.teacherUid,
			Tema: this.topic,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof AnnouncedTestFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
