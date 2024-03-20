import { IsInstance, IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';
import SubjectDescriptor from './SubjectDescriptor';

export interface ClassAverageFields {
	TanuloAtlag?: number;
	OsztalyCsoportAtlag?: number;
	OsztalyCsoportAtlagtolValoElteres?: number;
	Tantargy: SubjectDescriptor;
	Uid: string;
}

export default class ClassAverageDto implements Partial<ClassAverageFields> {
	@IsOptional()
	@IsNumber()
	private readonly average?: number;

	@IsOptional()
	@IsNumber()
	private readonly classAverageNumber?: number;

	@IsOptional()
	@IsNumber()
	private readonly differenceFromClassAverage?: number;

	@IsInstance(SubjectDescriptor)
	private readonly subject?: SubjectDescriptor;

	@IsString()
	private readonly uid?: string;


	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.average = typeof input['TanuloAtlag'] === 'number' ? input['TanuloAtlag'] : undefined;
			this.classAverageNumber = typeof input['OsztalyCsoportAtlag'] === 'number' ? input['OsztalyCsoportAtlag'] : undefined;
			this.differenceFromClassAverage = typeof input['OsztalyCsoportAtlagtolValoElteres'] === 'number' ?
				input['OsztalyCsoportAtlagtolValoElteres'] : undefined;
			this.subject = typeof input['Tantargy'] === 'object' ? new SubjectDescriptor(input['Tantargy']) : undefined;
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get TanuloAtlag(): number | undefined {
		return this.average;
	}

	public get OsztalyCsoportAtlag(): number | undefined {
		return this.classAverageNumber;
	}

	public get OsztalyCsoportAtlagtolValoElteres(): number | undefined {
		return this.differenceFromClassAverage;
	}

	public get Tantargy(): SubjectDescriptor | undefined {
		return this.subject;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	public get json(): ClassAverageFields {
		return {
			OsztalyCsoportAtlag: this.classAverageNumber,
			OsztalyCsoportAtlagtolValoElteres: this.differenceFromClassAverage,
			Tantargy: this.subject?.json,
			TanuloAtlag: this.average,
			Uid: this.uid,
		} as ClassAverageFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<ClassAverageFields> = {
			TanuloAtlag: this.average,
			OsztalyCsoportAtlag: this.classAverageNumber,
			OsztalyCsoportAtlagtolValoElteres: this.differenceFromClassAverage,
			Tantargy: this.subject,
			Uid: this.uid,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof ClassAverageFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
