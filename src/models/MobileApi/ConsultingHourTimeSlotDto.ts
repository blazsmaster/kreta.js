import { IsBoolean, IsDate, IsString, validateSync, ValidationError } from 'class-validator';

export interface ConsultingHourTimeSlotFields {
	VegIdopont: Date;
	IsJelentkeztem: boolean;
	KezdoIdopont: Date;
	Uid: string;
}

export default class ConsultingHourTimeSlotDto implements Partial<ConsultingHourTimeSlotFields> {
	@IsDate()
	private readonly endTime?: Date;

	@IsBoolean()
	private readonly isReservedByMe?: boolean;

	@IsDate()
	private readonly startTime?: Date;

	@IsString()
	private readonly uid?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.endTime = typeof input['VegIdopont'] === 'string' ? new Date(input['VegIdopont']) : undefined;
			this.isReservedByMe = typeof input['IsJelentkeztem'] === 'boolean' ? input['IsJelentkeztem'] : undefined;
			this.startTime = typeof input['KezdoIdopont'] === 'string' ? new Date(input['KezdoIdopont']) : undefined;
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get VegIdopont(): Date | undefined {
		return this.endTime;
	}

	public get IsJelentkeztem(): boolean | undefined {
		return this.isReservedByMe;
	}

	public get KezdoIdopont(): Date | undefined {
		return this.startTime;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	public get json(): ConsultingHourTimeSlotFields {
		return {
			IsJelentkeztem: this.isReservedByMe,
			KezdoIdopont: this.startTime,
			Uid: this.uid,
			VegIdopont: this.endTime,
		} as ConsultingHourTimeSlotFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<ConsultingHourTimeSlotFields> = {
			VegIdopont: this.endTime,
			IsJelentkeztem: this.isReservedByMe,
			KezdoIdopont: this.startTime,
			Uid: this.uid,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof ConsultingHourTimeSlotFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
