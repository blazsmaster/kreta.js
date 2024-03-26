import { IsNumber, IsString, validateSync, ValidationError } from 'class-validator';

export interface SyllabusItemFields {
	Id: number;
	Tema: string;
	EvesOraszam: number;
}

export default class SyllabusItemDto implements Partial<SyllabusItemFields> {
	@IsNumber()
	private readonly id?: number;

	@IsString()
	private readonly topic?: string;

	@IsNumber()
	private readonly yearlyLessonNumber?: number;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.id = typeof input['Id'] === 'number' ? input['Id'] : undefined;
			this.topic = typeof input['Tema'] === 'string' ? input['Tema'].trim() : undefined;
			this.yearlyLessonNumber = typeof input['EvesOraszam'] === 'number' ? input['EvesOraszam'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Id(): number | undefined {
		return this.id;
	}

	public get Tema(): string | undefined {
		return this.topic;
	}

	public get EvesOraszam(): number | undefined {
		return this.yearlyLessonNumber;
	}

	public get json(): SyllabusItemFields {
		return {
			EvesOraszam: this.yearlyLessonNumber,
			Id: this.id,
			Tema: this.topic,
		} as SyllabusItemFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<SyllabusItemFields> = {
			Id: this.id,
			Tema: this.topic,
			EvesOraszam: this.yearlyLessonNumber,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof SyllabusItemFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
