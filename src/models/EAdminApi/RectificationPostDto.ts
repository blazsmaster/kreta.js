import { IsInstance, IsString, validateSync, ValidationError } from 'class-validator';
import TypeDto from './TypeDto';
import OtherThingsToDoAttachmentsDto from './OtherThingsToDoAttachmentsDto';
import StateDto from './StateDto';

export interface RectificationPostFields {
	azonosito: string;
	tipus: TypeDto;
	tipusKod: string;
	csatolmanyok: Array<OtherThingsToDoAttachmentsDto>;
	statusz: StateDto;
}

export default class RectificationPostDto implements Partial<RectificationPostFields> {
	@IsString()
	private readonly caseId?: string;

	@IsInstance(TypeDto)
	private readonly caseType?: TypeDto;

	@IsString()
	private readonly caseTypeCode?: string;

	@IsInstance(OtherThingsToDoAttachmentsDto)
	private readonly optionalAttachments?: Array<OtherThingsToDoAttachmentsDto>;

	@IsInstance(StateDto)
	private readonly state?: StateDto;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.caseId = typeof input['azonosito'] === 'string' ? input['azonosito'].trim() : undefined;
			this.caseType = typeof input['tipus'] === 'object' ? new TypeDto(input['tipus']) : undefined;
			this.caseTypeCode = typeof input['tipusKod'] === 'string' ? input['tipusKod'].trim() : undefined;
			this.optionalAttachments = Array.isArray(input['csatolmanyok']) ?
				input['csatolmanyok'].map((item: any) => new OtherThingsToDoAttachmentsDto(item)) : undefined;
			this.state = typeof input['statusz'] === 'object' ? new StateDto(input['statusz']) : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get azonosito(): string | undefined {
		return this.caseId;
	}

	public get tipus(): TypeDto | undefined {
		return this.caseType;
	}

	public get tipusKod(): string | undefined {
		return this.caseTypeCode;
	}

	public get csatolmanyok(): Array<OtherThingsToDoAttachmentsDto> | undefined {
		return this.optionalAttachments;
	}

	public get statusz(): StateDto | undefined {
		return this.state;
	}

	public get json(): RectificationPostFields {
		return {
			azonosito: this.caseId,
			csatolmanyok: this.optionalAttachments?.map((item) => item.json),
			statusz: this.state?.json,
			tipus: this.caseType?.json,
			tipusKod: this.caseTypeCode,
		} as RectificationPostFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<RectificationPostFields> = {
			azonosito: this.caseId,
			tipus: this.caseType,
			tipusKod: this.caseTypeCode,
			csatolmanyok: this.optionalAttachments,
			statusz: this.state,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof RectificationPostFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
