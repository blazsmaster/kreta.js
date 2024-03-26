import { IsInstance, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';
import TemporaryIdDto from './Attachment/TemporaryIdDto';

export interface AttachmentFields {
	fajlNev: string;
	azonosito: string;
	fajl?: TemporaryIdDto;
}

export default class AttachmentDto implements Partial<AttachmentFields> {
	@IsString()
	private readonly fileName?: string;

	@IsString()
	private readonly id?: string;

	@IsOptional()
	@IsInstance(TemporaryIdDto)
	private readonly temporaryId?: TemporaryIdDto;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.fileName = typeof input['fajlNev'] === 'string' ? input['fajlNev'].trim() : undefined;
			this.id = typeof input['azonosito'] === 'string' ? input['azonosito'].trim() : undefined;
			this.temporaryId = typeof input['fajl'] === 'object' ? new TemporaryIdDto(input['fajl']) : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get fajlNev(): string | undefined {
		return this.fileName;
	}

	public get azonosito(): string | undefined {
		return this.id;
	}

	public get fajl(): TemporaryIdDto | undefined {
		return this.temporaryId;
	}

	public get json(): AttachmentFields {
		return {
			azonosito: this.id,
			fajl: this.temporaryId?.json,
			fajlNev: this.fileName,
		} as AttachmentFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<AttachmentFields> = {
			azonosito: this.id,
			fajlNev: this.fileName,
			fajl: this.temporaryId,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof AttachmentFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
