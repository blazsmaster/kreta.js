import { IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface KretaClassFields {
	kretaAzonosito?: number;
	nev?: string;
}

export default class KretaClassDto implements Partial<KretaClassFields> {
	@IsOptional()
	@IsNumber()
	private readonly id?: number;

	@IsOptional()
	@IsString()
	private readonly name?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.id = typeof input['kretaAzonosito'] === 'number' ? input['kretaAzonosito'] : undefined;
			this.name = typeof input['nev'] === 'string' ? input['nev'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get kretaAzonosito(): number | undefined {
		return this.id;
	}

	public get nev(): string | undefined {
		return this.name;
	}

	public get json(): KretaClassFields {
		return {
			kretaAzonosito: this.id,
			nev: this.name,
		} as KretaClassFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<KretaClassFields> = {
			kretaAzonosito: this.id,
			nev: this.name,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof KretaClassFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
