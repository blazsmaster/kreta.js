import { IsInstance, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';
import ApplicationDocumentTypeDto from './ApplicationDocumentTypeDto';
import FileDto from './FileDto';

export interface ApplicationMandatoryDocumentFields {
	tipus?: ApplicationDocumentTypeDto;
	fajl?: FileDto;
	fajlNev?: string;
	azonosito?: string;
	iktatoszam?: string;
}

export default class ApplicationMandatoryDocumentDto implements Partial<ApplicationMandatoryDocumentFields> {
	@IsOptional()
	@IsInstance(ApplicationDocumentTypeDto)
	private readonly applicationDocumentType?: ApplicationDocumentTypeDto;

	@IsOptional()
	@IsInstance(FileDto)
	private readonly file?: FileDto;

	@IsOptional()
	@IsString()
	private readonly fileName?: string;

	@IsOptional()
	@IsString()
	private readonly id?: string;

	@IsOptional()
	@IsString()
	private readonly registrationNumber?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.applicationDocumentType = typeof input['tipus'] === 'object' ? new ApplicationDocumentTypeDto(input['tipus']) : undefined;
			this.file = typeof input['fajl'] === 'object' ? new FileDto(input['fajl']) : undefined;
			this.fileName = typeof input['fajlNev'] === 'string' ? input['fajlNev'].trim() : undefined;
			this.id = typeof input['azonosito'] === 'string' ? input['azonosito'].trim() : undefined;
			this.registrationNumber = typeof input['iktatoszam'] === 'string' ? input['iktatoszam'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get tipus(): ApplicationDocumentTypeDto | undefined {
		return this.applicationDocumentType;
	}

	public get fajl(): FileDto | undefined {
		return this.file;
	}

	public get fajlNev(): string | undefined {
		return this.fileName;
	}

	public get azonosito(): string | undefined {
		return this.id;
	}

	public get iktatoszam(): string | undefined {
		return this.registrationNumber;
	}

	public get json(): ApplicationMandatoryDocumentFields {
		return {
			azonosito: this.id,
			fajl: this.file,
			fajlNev: this.fileName,
			iktatoszam: this.registrationNumber,
			tipus: this.applicationDocumentType,
		} as ApplicationMandatoryDocumentFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<ApplicationMandatoryDocumentFields> = {
			azonosito: this.id,
			fajl: this.file,
			fajlNev: this.fileName,
			iktatoszam: this.registrationNumber,
			tipus: this.applicationDocumentType,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof ApplicationMandatoryDocumentFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
