import { IsDate, IsOptional, validateSync, ValidationError } from 'class-validator';

export interface MembershipFields {
	BesorolasDatuma?: Date;
	KisorolasDatuma?: Date;
}

export default class MembershipDto implements Partial<MembershipFields> {
	@IsOptional()
	@IsDate()
	private readonly classificationDate?: Date;

	@IsOptional()
	@IsDate()
	private readonly exclusionDate?: Date;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.classificationDate = typeof input['BesorolasDatuma'] === 'string' ? new Date(input['BesorolasDatuma']) : undefined;
			this.exclusionDate = typeof input['KisorolasDatuma'] === 'string' ? new Date(input['KisorolasDatuma']) : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get BesorolasDatuma(): Date | undefined {
		return this.classificationDate;
	}

	public get KisorolasDatuma(): Date | undefined {
		return this.exclusionDate;
	}

	public get json(): MembershipFields {
		return {
			BesorolasDatuma: this.classificationDate,
			KisorolasDatuma: this.exclusionDate,
		} as MembershipFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<MembershipFields> = {
			BesorolasDatuma: this.classificationDate,
			KisorolasDatuma: this.exclusionDate,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof MembershipFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
