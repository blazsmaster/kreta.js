import { IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface AddresseeTypeFields {
	kod?: string;
	leiras?: string;
	azonosito?: number;
	nev?: string;
	rovidNev?: string;
}

export default class AddresseeTypeDto implements Partial<AddresseeTypeFields> {
	@IsOptional()
	@IsString()
	private readonly code?: string;

	@IsOptional()
	@IsString()
	private readonly description?: string;

	@IsOptional()
	@IsNumber()
	private readonly id?: number;

	@IsOptional()
	@IsString()
	private readonly name?: string;

	@IsOptional()
	@IsString()
	private readonly shortName?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.code = typeof input['kod'] === 'string' ? input['kod'].trim() : undefined;
			this.description = typeof input['leiras'] === 'string' ? input['leiras'].trim() : undefined;
			this.id = typeof input['azonosito'] === 'number' ? input['azonosito'] : undefined;
			this.name = typeof input['nev'] === 'string' ? input['nev'].trim() : undefined;
			this.shortName = typeof input['rovidNev'] === 'string' ? input['rovidNev'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get kod(): string | undefined {
		return this.code;
	}

	public get leiras(): string | undefined {
		return this.description;
	}

	public get azonosito(): number | undefined {
		return this.id;
	}

	public get nev(): string | undefined {
		return this.name;
	}

	public get rovidNev(): string | undefined {
		return this.shortName;
	}

	public get json(): AddresseeTypeFields {
		return {
			azonosito: this.id,
			kod: this.code,
			leiras: this.description,
			nev: this.name,
			rovidNev: this.shortName,
		} as AddresseeTypeFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<AddresseeTypeFields> = {
			azonosito: this.id,
			kod: this.code,
			leiras: this.description,
			nev: this.name,
			rovidNev: this.shortName,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof AddresseeTypeFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
