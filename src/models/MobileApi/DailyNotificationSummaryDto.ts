import { IsNumber, validateSync, ValidationError } from 'class-validator';

export interface DailyNotificationSummaryFields {
	Ertekelesek: number;
	Mulasztasok: number;
	Feljegyzesek: number;
	Bejelentettszamonkeresek: number;
	Hazifeladatok: number;
	Uzenetek: number;
	Orarendvaltozasok: number;
}

export default class DailyNotificationSummaryDto implements Partial<DailyNotificationSummaryFields> {
	@IsNumber()
	private readonly evaluations: number = 0;

	@IsNumber()
	private readonly omissions: number = 0;

	@IsNumber()
	private readonly notes: number = 0;

	@IsNumber()
	private readonly announcedTests: number = 0;

	@IsNumber()
	private readonly homeworks: number = 0;

	@IsNumber()
	private readonly messages: number = 0;

	@IsNumber()
	private readonly timetableChanges: number = 0;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.evaluations = typeof input['Ertekelesek'] === 'number' ? input['Ertekelesek'] : 0;
			this.omissions = typeof input['Mulasztasok'] === 'number' ? input['Mulasztasok'] : 0;
			this.notes = typeof input['Feljegyzesek'] === 'number' ? input['Feljegyzesek'] : 0;
			this.announcedTests = typeof input['Bejelentettszamonkeresek'] === 'number' ? input['Bejelentettszamonkeresek'] : 0;
			this.homeworks = typeof input['Hazifeladatok'] === 'number' ? input['Hazifeladatok'] : 0;
			this.messages = typeof input['Uzenetek'] === 'number' ? input['Uzenetek'] : 0;
			this.timetableChanges = typeof input['Orarendvaltozasok'] === 'number' ? input['Orarendvaltozasok'] : 0;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Ertekelesek(): number {
		return this.evaluations;
	}

	public get Mulasztasok(): number {
		return this.omissions;
	}

	public get Feljegyzesek(): number {
		return this.notes;
	}

	public get Bejelentettszamonkeresek(): number {
		return this.announcedTests;
	}

	public get Hazifeladatok(): number {
		return this.homeworks;
	}

	public get Uzenetek(): number {
		return this.messages;
	}

	public get Orarendvaltozasok(): number {
		return this.timetableChanges;
	}

	public get json(): DailyNotificationSummaryFields {
		return {
			Bejelentettszamonkeresek: this.announcedTests,
			Ertekelesek: this.evaluations,
			Feljegyzesek: this.notes,
			Hazifeladatok: this.homeworks,
			Mulasztasok: this.omissions,
			Orarendvaltozasok: this.timetableChanges,
			Uzenetek: this.messages,
		} as DailyNotificationSummaryFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<DailyNotificationSummaryFields> = {
			Ertekelesek: this.evaluations,
			Mulasztasok: this.omissions,
			Feljegyzesek: this.notes,
			Bejelentettszamonkeresek: this.announcedTests,
			Hazifeladatok: this.homeworks,
			Uzenetek: this.messages,
			Orarendvaltozasok: this.timetableChanges,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof DailyNotificationSummaryFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
