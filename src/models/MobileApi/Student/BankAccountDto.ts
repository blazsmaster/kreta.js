import { IsBoolean, IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface BankAccountFields {
	BankszamlaSzam?: string;
	IsReadOnly?: boolean;
	BankszamlaTulajdonosNeve?: string;
	BankszamlaTulajdonosTipusId?: number;
}

export default class BankAccountDto implements Partial<BankAccountFields> {
	@IsOptional()
	@IsString()
	private readonly accountNumber?: string;

	@IsOptional()
	@IsBoolean()
	private readonly isReadOnly?: boolean;

	@IsOptional()
	@IsString()
	private readonly ownerName?: string;

	@IsOptional()
	@IsNumber()
	private readonly ownerType?: number;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.accountNumber = typeof input['BankszamlaSzam'] === 'string' ? input['BankszamlaSzam'].trim() : undefined;
			this.isReadOnly = typeof input['IsReadOnly'] === 'boolean' ? input['IsReadOnly'] : undefined;
			this.ownerName = typeof input['BankszamlaTulajdonosNeve'] === 'string' ? input['BankszamlaTulajdonosNeve'].trim() : undefined;
			this.ownerType = typeof input['BankszamlaTulajdonosTipusId'] === 'number' ? input['BankszamlaTulajdonosTipusId'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get BankszamlaSzam(): string | undefined {
		return this.accountNumber;
	}

	public get IsReadOnly(): boolean | undefined {
		return this.isReadOnly;
	}

	public get BankszamlaTulajdonosNeve(): string | undefined {
		return this.ownerName;
	}

	public get BankszamlaTulajdonosTipusId(): number | undefined {
		return this.ownerType;
	}

	public get json(): BankAccountFields {
		return {
			BankszamlaSzam: this.accountNumber,
			BankszamlaTulajdonosNeve: this.ownerName,
			BankszamlaTulajdonosTipusId: this.ownerType,
			IsReadOnly: this.isReadOnly,
		} as BankAccountFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<BankAccountFields> = {
			BankszamlaSzam: this.accountNumber,
			IsReadOnly: this.isReadOnly,
			BankszamlaTulajdonosNeve: this.ownerName,
			BankszamlaTulajdonosTipusId: this.ownerType,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof BankAccountFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
