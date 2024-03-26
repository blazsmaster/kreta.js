import { IsInstance, IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';
import FileDto from './FileDto';

export interface OtherThingsToDoAttachmentsFields {
	fajl?: FileDto;
	fajlNev?: string;
	azonosito?: number;
	iktatoszam?: string;
}

export default class OtherThingsToDoAttachmentsDto implements Partial<OtherThingsToDoAttachmentsFields> {
	@IsOptional()
	@IsInstance(FileDto)
	private readonly file?: FileDto;

	@IsOptional()
	@IsString()
	private readonly fileName?: string;

	@IsOptional()
	@IsNumber()
	private readonly id?: number;

	@IsOptional()
	@IsString()
	private readonly registrationNumber?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.file = typeof input['fajl'] === 'object' ? new FileDto(input['fajl']) : undefined;
			this.fileName = typeof input['fajlNev'] === 'string' ? input['fajlNev'].trim() : undefined;
			this.id = typeof input['azonosito'] === 'number' ? input['azonosito'] : undefined;
			this.registrationNumber = typeof input['iktatoszam'] === 'string' ? input['iktatoszam'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get fajl(): FileDto | undefined {
		return this.file;
	}

	public get fajlNev(): string | undefined {
		return this.fileName;
	}

	public get azonosito(): number | undefined {
		return this.id;
	}

	public get iktatoszam(): string | undefined {
		return this.registrationNumber;
	}

	public get json(): OtherThingsToDoAttachmentsFields {
		return {
			azonosito: this.id,
			fajl: this.file?.json,
			fajlNev: this.fileName,
			iktatoszam: this.registrationNumber,
		} as OtherThingsToDoAttachmentsFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<OtherThingsToDoAttachmentsFields> = {
			fajl: this.file,
			fajlNev: this.fileName,
			azonosito: this.id,
			iktatoszam: this.registrationNumber,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof OtherThingsToDoAttachmentsFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
