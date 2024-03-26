import { IsDate, IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface AccessControlSystemItemFields {
	megjegyzes?: string;
	irany?: string;
	azonosito: number;
	idopont: Date;
}

export default class AccessControlSystemItemDto implements Partial<AccessControlSystemItemFields> {
	@IsOptional()
	@IsString()
	private readonly commentText?: string;

	@IsOptional()
	@IsString()
	private readonly directionText?: string;

	@IsNumber()
	private readonly id?: number;

	@IsDate()
	private readonly recordDate?: Date;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.commentText = typeof input['megjegyzes'] === 'string' ? input['megjegyzes'].trim() : undefined;
			this.directionText = typeof input['irany'] === 'string' ? input['irany'].trim() : undefined;
			this.id = typeof input['azonosito'] === 'number' ? input['azonosito'] : undefined;
			this.recordDate = typeof input['idopont'] === 'string' ? new Date(input['idopont']) : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get megjegyzes(): string | undefined {
		return this.commentText;
	}

	public get irany(): string | undefined {
		return this.directionText;
	}

	public get azonosito(): number | undefined {
		return this.id;
	}

	public get idopont(): Date | undefined {
		return this.recordDate;
	}

	public get json(): AccessControlSystemItemFields {
		return {
			azonosito: this.id,
			idopont: this.recordDate,
			irany: this.directionText,
			megjegyzes: this.commentText,
		} as AccessControlSystemItemFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<AccessControlSystemItemFields> = {
			megjegyzes: this.commentText,
			irany: this.directionText,
			azonosito: this.id,
			idopont: this.recordDate,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof AccessControlSystemItemFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
