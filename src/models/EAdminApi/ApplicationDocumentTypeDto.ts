import { IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface ApplicationDocumentTypeFields {
	kod?: string;
	leiras?: string;
	dokumentumSablonNev?: string;
	dokumentumSablonUtvonal?: string;
	azonosito?: string;
	nev?: string;
	rovidNev?: string;
}

export default class ApplicationDocumentTypeDto implements Partial<ApplicationDocumentTypeFields> {
	@IsOptional()
	@IsString()
	private readonly code?: string;

	@IsOptional()
	@IsString()
	private readonly description?: string;

	@IsOptional()
	@IsString()
	private readonly documentTemplateName?: string;

	@IsOptional()
	@IsString()
	private readonly documentTemplatePath?: string;

	@IsOptional()
	@IsString()
	private readonly id?: string;

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
			this.documentTemplateName = typeof input['dokumentumSablonNev'] === 'string' ? input['dokumentumSablonNev'].trim() : undefined;
			this.documentTemplatePath = typeof input['dokumentumSablonUtvonal'] === 'string' ? input['dokumentumSablonUtvonal'].trim() :
				undefined;
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

	public get dokumentumSablonNev(): string | undefined {
		return this.documentTemplateName;
	}

	public get dokumentumSablonUtvonal(): string | undefined {
		return this.documentTemplatePath;
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

	public get json(): ApplicationDocumentTypeFields {
		return {
			azonosito: this.id,
			dokumentumSablonNev: this.documentTemplateName,
			dokumentumSablonUtvonal: this.documentTemplatePath,
			kod: this.code,
			leiras: this.description,
			nev: this.name,
			rovidNev: this.shortName,
		} as ApplicationDocumentTypeFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<ApplicationDocumentTypeFields> = {
			kod: this.code,
			leiras: this.description,
			dokumentumSablonNev: this.documentTemplateName,
			dokumentumSablonUtvonal: this.documentTemplatePath,
			azonosito: this.id,
			nev: this.name,
			rovidNev: this.shortName,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof ApplicationDocumentTypeFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
