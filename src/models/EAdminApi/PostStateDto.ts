import { IsString, validateSync, ValidationError } from 'class-validator';

export interface PostStateFields {
	kod: string;
	leiras: string;
	azonosito: string;
	nev: string;
	rovidNev: string;
}

export default class PostStateDto implements Partial<PostStateFields> {
	@IsString()
	private readonly code?: string;

	@IsString()
	private readonly description?: string;

	@IsString()
	private readonly id?: string;

	@IsString()
	private readonly name?: string;

	@IsString()
	private readonly shortName?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.code = typeof input['kod'] === 'string' ? input['kod'].trim() : undefined;
			this.description = typeof input['leiras'] === 'string' ? input['leiras'].trim() : undefined;
			this.id = typeof input['azonosito'] === 'string' ? input['azonosito'].trim() : undefined;
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

	public get azonosito(): string | undefined {
		return this.id;
	}

	public get nev(): string | undefined {
		return this.name;
	}

	public get rovidNev(): string | undefined {
		return this.shortName;
	}

	public get json(): PostStateFields {
		return {
			azonosito: this.id,
			kod: this.code,
			leiras: this.description,
			nev: this.name,
			rovidNev: this.shortName,
		} as PostStateFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<PostStateFields> = {
			azonosito: this.id,
			kod: this.code,
			leiras: this.description,
			nev: this.name,
			rovidNev: this.shortName,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof PostStateFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
