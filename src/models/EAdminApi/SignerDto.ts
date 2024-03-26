import { IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface SignerFields {
	oktatasiAzonosito?: string;
	kretaAzonosito: number;
	isAlairo?: boolean;
	nev?: string;
	titulus: string;
}

export default class SignerDto implements Partial<SignerFields> {
	@IsOptional()
	@IsString()
	private readonly educationId?: string;

	@IsNumber()
	private readonly id?: number;

	@IsOptional()
	@IsString()
	private readonly isSigner?: boolean;

	@IsOptional()
	@IsString()
	private readonly name?: string;

	@IsString()
	private readonly title?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.educationId = typeof input['oktatasiAzonosito'] === 'string' ? input['oktatasiAzonosito'].trim() : undefined;
			this.id = typeof input['kretaAzonosito'] === 'number' ? input['kretaAzonosito'] : undefined;
			this.isSigner = typeof input['isAlairo'] === 'boolean' ? input['isAlairo'] : undefined;
			this.name = typeof input['nev'] === 'string' ? input['nev'].trim() : undefined;
			this.title = typeof input['titulus'] === 'string' ? input['titulus'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get oktatasiAzonosito(): string | undefined {
		return this.educationId;
	}

	public get kretaAzonosito(): number | undefined {
		return this.id;
	}

	public get isAlairo(): boolean | undefined {
		return this.isSigner;
	}

	public get nev(): string | undefined {
		return this.name;
	}

	public get titulus(): string | undefined {
		return this.title;
	}

	public get json(): SignerFields {
		return {
			isAlairo: this.isSigner,
			kretaAzonosito: this.id,
			nev: this.name,
			oktatasiAzonosito: this.educationId,
			titulus: this.title,
		} as SignerFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<SignerFields> = {
			oktatasiAzonosito: this.educationId,
			kretaAzonosito: this.id,
			isAlairo: this.isSigner,
			nev: this.name,
			titulus: this.title,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof SignerFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
