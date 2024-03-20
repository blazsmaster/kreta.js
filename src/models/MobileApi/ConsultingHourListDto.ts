import { IsArray, IsInstance, validateSync, ValidationError } from 'class-validator';
import ConsultingHourDto from './ConsultingHourDto';
import UidNameStructure from './UidNameStructure';

export interface ConsultingHourListFields {
	Fogadoorak: Array<ConsultingHourDto>;
	Tanar: UidNameStructure;
}

export default class ConsultingHourListDto implements Partial<ConsultingHourListFields> {
	@IsArray()
	@IsInstance(ConsultingHourDto, { each: true })
	private readonly consultingHours?: Array<ConsultingHourDto>;

	@IsInstance(UidNameStructure)
	private readonly teacherDescriptor?: UidNameStructure;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.consultingHours = Array.isArray(input['Fogadoorak']) ? input['Fogadoorak'].map((item: any) => new ConsultingHourDto(item)) : [];
			this.teacherDescriptor = typeof input['Tanar'] === 'object' ? new UidNameStructure(input['Tanar']) : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Fogadoorak(): Array<ConsultingHourDto> | undefined {
		return this.consultingHours;
	}

	public get Tanar(): UidNameStructure | undefined {
		return this.teacherDescriptor;
	}

	public get json(): ConsultingHourListFields {
		return {
			Fogadoorak: this.consultingHours?.map((item) => item.json),
			Tanar: this.teacherDescriptor,
		} as ConsultingHourListFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<ConsultingHourListFields> = {
			Fogadoorak: this.consultingHours,
			Tanar: this.teacherDescriptor,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof ConsultingHourListFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
