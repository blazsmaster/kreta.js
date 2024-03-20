import { IsDate, IsString, validateSync, ValidationError } from 'class-validator';

export interface NoticeBoardItemFields {
	Tartalom: string;
	ErvenyessegVege: Date;
	ErvenyessegKezdete: Date;
	RogzitoNeve: string;
	Cim: string;
	Uid: string;
}

export default class NoticeBoardItemDto implements Partial<NoticeBoardItemFields> {
	@IsString()
	private readonly content?: string;

	@IsDate()
	private readonly expireEndTime?: Date;

	@IsDate()
	private readonly expireStartTime?: Date;

	@IsString()
	private readonly madeBy?: string;

	@IsString()
	private readonly title?: string;

	@IsString()
	private readonly uid?: string;


	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.content = typeof input['Tartalom'] === 'string' ? input['Tartalom'].trim() : undefined;
			this.expireEndTime = typeof input['ErvenyessegVege'] === 'string' ? new Date(input['ErvenyessegVege']) : undefined;
			this.expireStartTime = typeof input['ErvenyessegKezdete'] === 'string' ? new Date(input['ErvenyessegKezdete']) : undefined;
			this.madeBy = typeof input['RogzitoNeve'] === 'string' ? input['RogzitoNeve'].trim() : undefined;
			this.title = typeof input['Cim'] === 'string' ? input['Cim'].trim() : undefined;
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Tartalom(): string | undefined {
		return this.content;
	}

	public get ErvenyessegVege(): Date | undefined {
		return this.expireEndTime;
	}

	public get ErvenyessegKezdete(): Date | undefined {
		return this.expireStartTime;
	}

	public get RogzitoNeve(): string | undefined {
		return this.madeBy;
	}

	public get Cim(): string | undefined {
		return this.title;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	public get json(): NoticeBoardItemFields {
		return {
			Cim: this.title,
			ErvenyessegKezdete: this.expireStartTime,
			ErvenyessegVege: this.expireEndTime,
			RogzitoNeve: this.madeBy,
			Tartalom: this.content,
			Uid: this.uid,
		} as NoticeBoardItemFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<NoticeBoardItemFields> = {
			Tartalom: this.content,
			ErvenyessegVege: this.expireEndTime,
			ErvenyessegKezdete: this.expireStartTime,
			RogzitoNeve: this.madeBy,
			Cim: this.title,
			Uid: this.uid,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof NoticeBoardItemFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
