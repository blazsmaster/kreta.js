import { IsArray, IsBoolean, IsDate, IsInstance, IsString, validateSync, ValidationError } from 'class-validator';
import UidNameStructure from './UidNameStructure';
import ConsultingHourTimeSlotDto from './ConsultingHourTimeSlotDto';

export interface ConsultingHourFields {
	Terem: UidNameStructure;
	Idopontok: Array<ConsultingHourTimeSlotDto>;
	JelentkezesHatarido: Date;
	VegIdopont: Date;
	IsJelentkezesFeatureEnabled: boolean;
	KezdoIdopont: Date;
	Uid: string;
}

export default class ConsultingHourDto implements Partial<ConsultingHourFields> {
	@IsInstance(UidNameStructure)
	private readonly classroomDescriptor?: UidNameStructure;

	@IsArray()
	@IsInstance(ConsultingHourTimeSlotDto, { each: true })
	private readonly consultingHourTimeSlots?: Array<ConsultingHourTimeSlotDto>;

	@IsDate()
	private readonly deadline?: Date;

	@IsDate()
	private readonly endTime?: Date;

	@IsBoolean()
	private readonly isReservationEnabled?: boolean;

	@IsDate()
	private readonly startTime?: Date;

	@IsString()
	private readonly uid?: string;


	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.classroomDescriptor = typeof input['Terem'] === 'object' ? new UidNameStructure(input['Terem']) : undefined;
			this.consultingHourTimeSlots = Array.isArray(input['Idopontok']) ?
				input['Idopontok'].map((item: any) => new ConsultingHourTimeSlotDto(item)) : [];
			this.deadline = typeof input['JelentkezesHatarido'] === 'string' ? new Date(input['JelentkezesHatarido']) : undefined;
			this.endTime = typeof input['VegIdopont'] === 'string' ? new Date(input['VegIdopont']) : undefined;
			this.isReservationEnabled = typeof input['IsJelentkezesFeatureEnabled'] === 'boolean' ? input['IsJelentkezesFeatureEnabled'] :
				undefined;
			this.startTime = typeof input['KezdoIdopont'] === 'string' ? new Date(input['KezdoIdopont']) : undefined;
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Terem(): UidNameStructure | undefined {
		return this.classroomDescriptor;
	}

	public get Idopontok(): Array<ConsultingHourTimeSlotDto> | undefined {
		return this.consultingHourTimeSlots;
	}

	public get JelentkezesHatarido(): Date | undefined {
		return this.deadline;
	}

	public get VegIdopont(): Date | undefined {
		return this.endTime;
	}

	public get IsJelentkezesFeatureEnabled(): boolean | undefined {
		return this.isReservationEnabled;
	}

	public get KezdoIdopont(): Date | undefined {
		return this.startTime;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	public get json(): ConsultingHourFields {
		return {
			Idopontok: this.consultingHourTimeSlots?.map((item) => item.json),
			IsJelentkezesFeatureEnabled: this.isReservationEnabled,
			JelentkezesHatarido: this.deadline,
			KezdoIdopont: this.startTime,
			Terem: this.classroomDescriptor?.json,
			Uid: this.uid,
			VegIdopont: this.endTime,
		} as ConsultingHourFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<ConsultingHourFields> = {
			Idopontok: this.consultingHourTimeSlots,
			IsJelentkezesFeatureEnabled: this.isReservationEnabled,
			JelentkezesHatarido: this.deadline,
			KezdoIdopont: this.startTime,
			Terem: this.classroomDescriptor,
			Uid: this.uid,
			VegIdopont: this.endTime,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof ConsultingHourFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
