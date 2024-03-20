import { IsBoolean, IsDate, IsNumber, validateSync, ValidationError } from 'class-validator';

export interface CustomizationSettingsFields {
	ErtekelesekMegjelenitesenekKesleltetesenekMerteke?: number;
	IsOsztalyAtlagMegjeleniteseEllenorzoben?: boolean;
	IsTanorakTemajaMegtekinthetoEllenorzoben?: boolean;
	KovetkezoTelepitesDatuma: Date;
}

export default class CustomizationSettingsDto implements Partial<CustomizationSettingsFields> {
	@IsNumber()
	private readonly delayOfNotifications?: number;

	@IsBoolean()
	private readonly isClassAverageVisible?: boolean;

	@IsBoolean()
	private readonly isLessonsThemeVisible?: boolean;

	@IsDate()
	private readonly nextServerDeploy?: Date;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.delayOfNotifications = typeof input['ErtekelesekMegjelenitesenekKesleltetesenekMerteke'] === 'number' ?
				input['ErtekelesekMegjelenitesenekKesleltetesenekMerteke'] : undefined;
			this.isClassAverageVisible = typeof input['IsOsztalyAtlagMegjeleniteseEllenorzoben'] === 'boolean' ?
				input['IsOsztalyAtlagMegjeleniteseEllenorzoben'] : undefined;
			this.isLessonsThemeVisible = typeof input['IsTanorakTemajaMegtekinthetoEllenorzoben'] === 'boolean' ?
				input['IsTanorakTemajaMegtekinthetoEllenorzoben'] : undefined;
			this.nextServerDeploy = typeof input['KovetkezoTelepitesDatuma'] === 'string' ? new Date(input['KovetkezoTelepitesDatuma']) :
				undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get ErtekelesekMegjelenitesenekKesleltetesenekMerteke(): number | undefined {
		return this.delayOfNotifications;
	}

	public get IsOsztalyAtlagMegjeleniteseEllenorzoben(): boolean | undefined {
		return this.isClassAverageVisible;
	}

	public get IsTanorakTemajaMegtekinthetoEllenorzoben(): boolean | undefined {
		return this.isLessonsThemeVisible;
	}

	public get KovetkezoTelepitesDatuma(): Date | undefined {
		return this.nextServerDeploy;
	}

	public get json(): CustomizationSettingsFields {
		return {
			ErtekelesekMegjelenitesenekKesleltetesenekMerteke: this.delayOfNotifications,
			IsOsztalyAtlagMegjeleniteseEllenorzoben: this.isClassAverageVisible,
			IsTanorakTemajaMegtekinthetoEllenorzoben: this.isLessonsThemeVisible,
			KovetkezoTelepitesDatuma: this.nextServerDeploy,
		} as CustomizationSettingsFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<CustomizationSettingsFields> = {
			ErtekelesekMegjelenitesenekKesleltetesenekMerteke: this.delayOfNotifications,
			IsOsztalyAtlagMegjeleniteseEllenorzoben: this.isClassAverageVisible,
			IsTanorakTemajaMegtekinthetoEllenorzoben: this.isLessonsThemeVisible,
			KovetkezoTelepitesDatuma: this.nextServerDeploy,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof CustomizationSettingsFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
