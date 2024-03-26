import { IsBoolean, IsNumber, IsString, validateSync, ValidationError } from 'class-validator';

export interface AnnouncedTestRequestFields {
	ErtekelesMod: number;
	ForceSave: boolean;
	OrarendElemUid: string;
	Tema: string;
}

export default class AnnouncedTestRequestDto implements Partial<AnnouncedTestRequestFields> {
	@IsNumber()
	private readonly evaluationModeId?: number;

	@IsBoolean()
	private readonly forceSave?: boolean;

	@IsString()
	private readonly timetableElementId?: string;

	@IsString()
	private readonly topic?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.evaluationModeId = typeof input['ErtekelesMod'] === 'number' ? input['ErtekelesMod'] : undefined;
			this.forceSave = typeof input['ForceSave'] === 'boolean' ? input['ForceSave'] : undefined;
			this.timetableElementId = typeof input['OrarendElemUid'] === 'string' ? input['OrarendElemUid'].trim() : undefined;
			this.topic = typeof input['Tema'] === 'string' ? input['Tema'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get ErtekelesMod(): number | undefined {
		return this.evaluationModeId;
	}

	public get ForceSave(): boolean | undefined {
		return this.forceSave;
	}

	public get OrarendElemUid(): string | undefined {
		return this.timetableElementId;
	}

	public get Tema(): string | undefined {
		return this.topic;
	}

	public get json(): AnnouncedTestRequestFields {
		return {
			ErtekelesMod: this.evaluationModeId,
			ForceSave: this.forceSave,
			OrarendElemUid: this.timetableElementId,
			Tema: this.topic,
		} as AnnouncedTestRequestFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<AnnouncedTestRequestFields> = {
			ErtekelesMod: this.evaluationModeId,
			ForceSave: this.forceSave,
			OrarendElemUid: this.timetableElementId,
			Tema: this.topic,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof AnnouncedTestRequestFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
