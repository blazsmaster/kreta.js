import { IsArray, IsInstance, IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';
import AverageWithTimeDto from './SubjectAverage/AverageWithTimeDto';
import SubjectDescriptor from './SubjectDescriptor';

export interface SubjectAverageFields {
	Atlag?: number;
	AtlagAlakulasaIdoFuggvenyeben: Array<AverageWithTimeDto>;
	SortIndex?: number;
	Tantargy: SubjectDescriptor;
	SulyozottOsztalyzatOsszege?: number;
	SulyozottOsztalyzatSzama?: number;
	Uid: string;
}

export default class SubjectAverageDto implements Partial<SubjectAverageFields> {
	@IsOptional()
	@IsNumber()
	private readonly average?: number;

	@IsArray()
	@IsInstance(AverageWithTimeDto, { each: true })
	private readonly averagesInTime: Array<AverageWithTimeDto> = [];

	@IsOptional()
	@IsNumber()
	private readonly sortIndex?: number;

	@IsInstance(SubjectDescriptor)
	private readonly subject?: SubjectDescriptor;

	@IsOptional()
	@IsNumber()
	private readonly sumOfWeightedEvaluations?: number;

	@IsOptional()
	@IsNumber()
	private readonly sumOfWeights?: number;

	@IsString()
	private readonly uid?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.average = typeof input['Atlag'] === 'number' ? input['Atlag'] : undefined;
			this.averagesInTime = Array.isArray(input['AtlagAlakulasaIdoFuggvenyeben']) ?
				input['AtlagAlakulasaIdoFuggvenyeben'].map((item: any) => new AverageWithTimeDto(item)) : [];
			this.sortIndex = typeof input['SortIndex'] === 'number' ? input['SortIndex'] : undefined;
			this.subject = typeof input['Tantargy'] === 'object' ? new SubjectDescriptor(input['Tantargy']) : undefined;
			this.sumOfWeightedEvaluations = typeof input['SulyozottOsztalyzatOsszege'] === 'number' ? input['SulyozottOsztalyzatOsszege'] :
				undefined;
			this.sumOfWeights = typeof input['SulyozottOsztalyzatSzama'] === 'number' ? input['SulyozottOsztalyzatSzama'] : undefined;
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Atlag(): number | undefined {
		return this.average;
	}

	public get AtlagAlakulasaIdoFuggvenyeben(): Array<AverageWithTimeDto> {
		return this.averagesInTime;
	}

	public get SortIndex(): number | undefined {
		return this.sortIndex;
	}

	public get Tantargy(): SubjectDescriptor | undefined {
		return this.subject;
	}

	public get SulyozottOsztalyzatOsszege(): number | undefined {
		return this.sumOfWeightedEvaluations;
	}

	public get SulyozottOsztalyzatSzama(): number | undefined {
		return this.sumOfWeights;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	public get json(): SubjectAverageFields {
		return {
			Atlag: this.average,
			AtlagAlakulasaIdoFuggvenyeben: this.averagesInTime.map((item) => item.json),
			SortIndex: this.sortIndex,
			SulyozottOsztalyzatOsszege: this.sumOfWeightedEvaluations,
			SulyozottOsztalyzatSzama: this.sumOfWeights,
			Tantargy: this.subject?.json,
			Uid: this.uid,
		} as SubjectAverageFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<SubjectAverageFields> = {
			Atlag: this.average,
			AtlagAlakulasaIdoFuggvenyeben: this.averagesInTime,
			SortIndex: this.sortIndex,
			SulyozottOsztalyzatOsszege: this.sumOfWeightedEvaluations,
			SulyozottOsztalyzatSzama: this.sumOfWeights,
			Tantargy: this.subject,
			Uid: this.uid,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof SubjectAverageFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
