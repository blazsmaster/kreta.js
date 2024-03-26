import { IsNumber, validateSync, ValidationError } from 'class-validator';

export interface PresenceFields {
	Keses: number;
	Tipus: number;
}

export default class PresenceDto implements Partial<PresenceFields> {
	@IsNumber()
	private readonly delayTimeInMinutes?: number;

	@IsNumber()
	private readonly presenceType?: number;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.delayTimeInMinutes = typeof input['Keses'] === 'number' ? input['Keses'] : undefined;
			this.presenceType = typeof input['Tipus'] === 'number' ? input['Tipus'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Keses(): number | undefined {
		return this.delayTimeInMinutes;
	}

	public get Tipus(): number | undefined {
		return this.presenceType;
	}

	public get json(): PresenceFields {
		return {
			Keses: this.delayTimeInMinutes,
			Tipus: this.presenceType,
		} as PresenceFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<PresenceFields> = {
			Keses: this.delayTimeInMinutes,
			Tipus: this.presenceType,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof PresenceFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
