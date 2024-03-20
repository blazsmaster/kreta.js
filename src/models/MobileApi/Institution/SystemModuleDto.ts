import { IsBoolean, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface SystemModuleFields {
	IsAktiv: boolean;
	Tipus: string;
	Url?: string;
}

export default class SystemModuleDto implements Partial<SystemModuleFields> {
	@IsBoolean()
	private readonly isActive?: boolean;

	@IsString()
	private readonly type?: string;

	@IsOptional()
	@IsString()
	private readonly url?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.isActive = typeof input['IsAktiv'] === 'boolean' ? input['IsAktiv'] : undefined;
			this.type = typeof input['Tipus'] === 'string' ? input['Tipus'].trim() : undefined;
			this.url = typeof input['Url'] === 'string' ? input['Url'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get IsAktiv(): boolean | undefined {
		return this.isActive;
	}

	public get Tipus(): string | undefined {
		return this.type;
	}

	public get Url(): string | undefined {
		return this.url;
	}

	public get json(): SystemModuleFields {
		return {
			IsAktiv: this.isActive,
			Tipus: this.type,
			Url: this.url,
		} as SystemModuleFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<SystemModuleFields> = {
			IsAktiv: this.isActive,
			Tipus: this.type,
			Url: this.url,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof SystemModuleFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
