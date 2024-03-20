import { IsBoolean, IsNumber, IsOptional, validateSync, ValidationError } from 'class-validator';

export interface LepEventGuardianPermissionPostFields {
	EloadasId: number;
	Dontes?: boolean;
}

export default class LepEventGuardianPermissionPostDto implements Partial<LepEventGuardianPermissionPostFields> {
	@IsNumber()
	private readonly eventId?: number;

	@IsOptional()
	@IsBoolean()
	private readonly isPermitted?: boolean;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.eventId = typeof input['EloadasId'] === 'number' ? input['EloadasId'] : undefined;
			this.isPermitted = typeof input['Dontes'] === 'boolean' ? input['Dontes'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get EloadasId(): number | undefined {
		return this.eventId;
	}

	public get Dontes(): boolean | undefined {
		return this.isPermitted;
	}

	public get json(): LepEventGuardianPermissionPostFields {
		return {
			EloadasId: this.eventId,
			Dontes: this.isPermitted,
		} as LepEventGuardianPermissionPostFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<LepEventGuardianPermissionPostFields> = {
			EloadasId: this.eventId,
			Dontes: this.isPermitted,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof LepEventGuardianPermissionPostFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
