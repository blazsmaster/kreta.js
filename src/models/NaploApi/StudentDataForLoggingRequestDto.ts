import { IsArray, IsInstance, IsNumber, IsOptional, validateSync, ValidationError } from 'class-validator';
import PresenceDto from './PresenceDto';

export interface StudentDataForLoggingRequestFields {
	FeljegyzesTipusLista?: Array<number>;
	Mulasztas: PresenceDto;
	Id: number;
}

export default class StudentDataForLoggingRequestDto implements Partial<StudentDataForLoggingRequestFields> {
	@IsOptional()
	@IsArray()
	@IsNumber({}, { each: true })
	private readonly noteList?: Array<number>;

	@IsInstance(PresenceDto)
	private readonly presence?: PresenceDto;

	@IsNumber()
	private readonly studentId?: number;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.noteList = Array.isArray(input['FeljegyzesTipusLista']) ? input['FeljegyzesTipusLista'].map((e: any) => e) : undefined;
			this.presence = typeof input['Mulasztas'] === 'object' ? new PresenceDto(input['Mulasztas']) : undefined;
			this.studentId = typeof input['Id'] === 'number' ? input['Id'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get FeljegyzesTipusLista(): Array<number> | undefined {
		return this.noteList;
	}

	public get Mulasztas(): PresenceDto | undefined {
		return this.presence;
	}

	public get Id(): number | undefined {
		return this.studentId;
	}

	public get json(): StudentDataForLoggingRequestFields {
		return {
			FeljegyzesTipusLista: this.noteList,
			Id: this.studentId,
			Mulasztas: this.presence?.json,
		} as StudentDataForLoggingRequestFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<StudentDataForLoggingRequestFields> = {
			FeljegyzesTipusLista: this.noteList,
			Mulasztas: this.presence,
			Id: this.studentId,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof StudentDataForLoggingRequestFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
