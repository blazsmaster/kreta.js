import { IsNumber, IsString, validateSync, ValidationError } from 'class-validator';

export interface BankAccountNumberPostFields {
	BankszamlaSzam: string;
	BankszamlaTulajdonosNeve: string;
	BankszamlaTulajdonosTipusId: number;
	SzamlavezetoBank: string;
}

export default class BankAccountNumberPostDto implements Partial<BankAccountNumberPostFields> {
	@IsString()
	private readonly bankAccountNumber?: string;

	@IsString()
	private readonly bankAccountOwnerName?: string;

	@IsNumber()
	private readonly bankAccountOwnerType?: number;

	@IsString()
	private readonly bankName?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.bankAccountNumber = typeof input['BankszamlaSzam'] === 'string' ? input['BankszamlaSzam'].trim() : undefined;
			this.bankAccountOwnerName = typeof input['BankszamlaTulajdonosNeve'] === 'string' ? input['BankszamlaTulajdonosNeve'].trim() :
				undefined;
			this.bankAccountOwnerType = typeof input['BankszamlaTulajdonosTipusId'] === 'number' ? input['BankszamlaTulajdonosTipusId'] :
				undefined;
			this.bankName = typeof input['SzamlavezetoBank'] === 'string' ? input['SzamlavezetoBank'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get BankszamlaSzam(): string | undefined {
		return this.bankAccountNumber;
	}

	public get BankszamlaTulajdonosNeve(): string | undefined {
		return this.bankAccountOwnerName;
	}

	public get BankszamlaTulajdonosTipusId(): number | undefined {
		return this.bankAccountOwnerType;
	}

	public get SzamlavezetoBank(): string | undefined {
		return this.bankName;
	}

	public get json(): BankAccountNumberPostFields {
		return {
			BankszamlaSzam: this.bankAccountNumber,
			BankszamlaTulajdonosNeve: this.bankAccountOwnerName,
			BankszamlaTulajdonosTipusId: this.bankAccountOwnerType,
			SzamlavezetoBank: this.bankName,
		} as BankAccountNumberPostFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<BankAccountNumberPostFields> = {
			BankszamlaSzam: this.bankAccountNumber,
			BankszamlaTulajdonosNeve: this.bankAccountOwnerName,
			BankszamlaTulajdonosTipusId: this.bankAccountOwnerType,
			SzamlavezetoBank: this.bankName,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof BankAccountNumberPostFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
