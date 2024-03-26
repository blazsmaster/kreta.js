import { IsString, validateSync, ValidationError } from 'class-validator';

export interface SentenceBankItemFields {
	Nev: string;
}

export default class SentenceBankItemDto implements Partial<SentenceBankItemFields> {
	@IsString()
	private readonly name?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.name = typeof input['Nev'] === 'string' ? input['Nev'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Nev(): string | undefined {
		return this.name;
	}

	public get json(): SentenceBankItemFields {
		return {
			Nev: this.name,
		} as SentenceBankItemFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<SentenceBankItemFields> = {
			Nev: this.name,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof SentenceBankItemFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
