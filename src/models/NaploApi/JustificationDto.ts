import { IsDate, IsNumber, IsString, validateSync, ValidationError } from 'class-validator';

export interface JustificationFields {
	Id: number;
	Kezdete: Date;
	Vege: Date;
	Tipusa: string;
	Megjegyzes: string;
	Rogzito: string;
	Torolheto: boolean;
}

export default class JustificationDto implements Partial<JustificationFields> {
	@IsNumber()
	private readonly id?: number;

	@IsDate()
	private readonly start?: Date;

	@IsDate()
	private readonly end?: Date;

	@IsString()
	private readonly type?: string;

	@IsString()
	private readonly comment?: string;

	@IsString()
	private readonly recorder?: string;

	@IsString()
	private readonly deletable?: boolean;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.id = typeof input['Id'] === 'number' ? input['Id'] : undefined;
			this.start = typeof input['Kezdete'] === 'string' ? new Date(input['Kezdete']) : input['Kezdete'];
			this.end = typeof input['Vege'] === 'string' ? new Date(input['Vege']) : input['Vege'];
			this.type = typeof input['Tipusa'] === 'string' ? input['Tipusa'.trim()] : undefined;
			this.comment = typeof input['Megjegyzes'] === 'string' ? input['Megjegyzes'].trim() : undefined;
			this.recorder = typeof input['Rogzito'] === 'string' ? input['Rogzito'].trim() : undefined;
			this.deletable = typeof input['Torolheto'] === 'boolean' ? input['Torolheto'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Id(): number | undefined {
		return this.id;
	}

	public get Kezdete(): Date | undefined {
		return this.start;
	}

	public get Vege(): Date | undefined {
		return this.end;
	}

	public get Tipusa(): string | undefined {
		return this.type;
	}

	public get Megjegyzes(): string | undefined {
		return this.comment;
	}

	public get Rogzito(): string | undefined {
		return this.recorder;
	}

	public get Torolheto(): boolean | undefined {
		return this.deletable;
	}

	public get json(): JustificationFields {
		return {
			Id: this.id,
			Kezdete: this.start,
			Megjegyzes: this.comment,
			Rogzito: this.recorder,
			Tipusa: this.type,
			Torolheto: this.deletable,
			Vege: this.end,
		} as JustificationFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<JustificationFields> = {
			Id: this.id,
			Kezdete: this.start,
			Vege: this.end,
			Tipusa: this.type,
			Megjegyzes: this.comment,
			Rogzito: this.recorder,
			Torolheto: this.deletable,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof JustificationFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
