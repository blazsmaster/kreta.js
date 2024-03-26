import { IsArray, IsInstance, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';
import SystemModuleDto from './Institution/SystemModuleDto';
import CustomizationSettingsDto from './Institution/CustomizationSettingsDto';

export interface InstitutionFields {
	TestreszabasBeallitasok: CustomizationSettingsDto;
	RovidNev?: string;
	Rendszermodulok: Array<SystemModuleDto>;
	Uid: string;
}

export default class InstitutionDto implements Partial<InstitutionFields> {
	@IsInstance(CustomizationSettingsDto)
	private readonly customizationSettings?: CustomizationSettingsDto;

	@IsOptional()
	@IsString()
	private readonly shortName?: string;

	@IsArray()
	@IsInstance(SystemModuleDto, { each: true })
	private readonly systemModuleList?: Array<SystemModuleDto>;

	@IsString()
	private readonly uid?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.customizationSettings = typeof input['TestreszabasBeallitasok'] === 'object' ?
				new CustomizationSettingsDto(input['TestreszabasBeallitasok']) : undefined;
			this.shortName = typeof input['RovidNev'] === 'string' ? input['RovidNev'].trim() : undefined;
			this.systemModuleList = Array.isArray(input['Rendszermodulok']) ? input['Rendszermodulok'].map((e: any) => new SystemModuleDto(e)) :
				[];
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get TestreszabasBeallitasok(): CustomizationSettingsDto | undefined {
		return this.customizationSettings;
	}

	public get RovidNev(): string | undefined {
		return this.shortName;
	}

	public get Rendszermodulok(): Array<SystemModuleDto> | undefined {
		return this.systemModuleList;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	public get json(): InstitutionFields {
		return {
			Rendszermodulok: this.systemModuleList?.map((sdto) => sdto.json),
			RovidNev: this.shortName,
			TestreszabasBeallitasok: this.customizationSettings?.json,
			Uid: this.uid,
		} as InstitutionFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<InstitutionFields> = {
			TestreszabasBeallitasok: this.customizationSettings,
			RovidNev: this.shortName,
			Rendszermodulok: this.systemModuleList,
			Uid: this.uid,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof InstitutionFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
