import { IsBoolean, IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface StudentPresenceFields {
	Keses?: number;
	Szoveg?: string;
	HasMulasztasGomb: boolean;
	MulasztasTipus: number;
	TanuloId: number;
}

export default class StudentPresenceDto implements Partial<StudentPresenceFields> {
	@IsOptional()
	@IsNumber()
	private readonly delayTimeInMinutes?: number;

	@IsOptional()
	@IsString()
	private readonly exemptionText?: string;

	@IsBoolean()
	private readonly omissionAllowed?: boolean;

	@IsNumber()
	private readonly presenceType?: number;

	@IsNumber()
	private readonly studentId?: number;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.delayTimeInMinutes = typeof input['Keses'] === 'number' ? input['Keses'] : undefined;
			this.exemptionText = typeof input['Szoveg'] === 'string' ? input['Szoveg'].trim() : undefined;
			this.omissionAllowed = typeof input['HasMulasztasGomb'] === 'boolean' ? input['HasMulasztasGomb'] : undefined;
			this.presenceType = typeof input['MulasztasTipus'] === 'number' ? input['MulasztasTipus'] : undefined;
			this.studentId = typeof input['TanuloId'] === 'number' ? input['TanuloId'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Keses(): number | undefined {
		return this.delayTimeInMinutes;
	}

	public get Szoveg(): string | undefined {
		return this.exemptionText;
	}

	public get HasMulasztasGomb(): boolean | undefined {
		return this.omissionAllowed;
	}

	public get MulasztasTipus(): number | undefined {
		return this.presenceType;
	}

	public get TanuloId(): number | undefined {
		return this.studentId;
	}

	public get json(): StudentPresenceFields {
		return {
			HasMulasztasGomb: this.omissionAllowed,
			Keses: this.delayTimeInMinutes,
			MulasztasTipus: this.presenceType,
			Szoveg: this.exemptionText,
			TanuloId: this.studentId,
		} as StudentPresenceFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<StudentPresenceFields> = {
			Keses: this.delayTimeInMinutes,
			Szoveg: this.exemptionText,
			HasMulasztasGomb: this.omissionAllowed,
			MulasztasTipus: this.presenceType,
			TanuloId: this.studentId,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof StudentPresenceFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
