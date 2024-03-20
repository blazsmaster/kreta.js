import {
	IsArray,
	IsEmail,
	IsInstance,
	IsNumber,
	IsOptional,
	IsPhoneNumber,
	IsString,
	validateSync,
	ValidationError,
} from 'class-validator';
import BankAccountDto from './Student/BankAccountDto';
import GuardianDto from './GuardianDto';
import InstitutionDto from './InstitutionDto';

export interface StudentFields {
	Cimek?: Array<string>;
	Bankszamla?: BankAccountDto;
	SzuletesiNap?: number;
	EmailCim?: string;
	Gondviselok?: Array<GuardianDto>;
	IntezmenyAzonosito?: string;
	IntezmenyNev?: string;
	Intezmeny?: InstitutionDto;
	SzuletesiHonap?: number;
	AnyjaNeve?: string;
	Nev?: string;
	SzuletesiNev?: string;
	Telefonszam?: string;
	SzuletesiHely?: string;
	TanevUid?: number;
	Uid?: string;
	SzuletesiEv?: number;
}

export default class StudentDto implements Partial<StudentFields> {
	@IsArray()
	@IsString({ each: true })
	private readonly addressDataList?: Array<string>;

	@IsInstance(BankAccountDto)
	private readonly bankAccount?: BankAccountDto;

	@IsNumber()
	private readonly dayOfBirth?: number;

	@IsOptional()
	@IsEmail()
	private readonly emailAddress?: string;

	@IsArray()
	@IsInstance(GuardianDto, { each: true })
	private readonly guardianList?: Array<GuardianDto>;

	@IsString()
	private readonly instituteCode?: string;

	@IsString()
	private readonly instituteName?: string;

	@IsInstance(InstitutionDto)
	private readonly institution?: InstitutionDto;

	@IsNumber()
	private readonly monthOfBirth?: number;

	@IsString()
	private readonly mothersName?: string;

	@IsString()
	private readonly name?: string;

	@IsString()
	private readonly nameOfBirth?: string;

	@IsOptional()
	@IsPhoneNumber()
	private readonly phoneNumber?: string;

	@IsString()
	private readonly placeOfBirth?: string;

	@IsNumber()
	private readonly schoolYearUID?: number;

	@IsString()
	private readonly uid?: string;

	@IsNumber()
	private readonly yearOfBirth?: number;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.addressDataList = Array.isArray(input['Cimek']) ? input['Cimek'].map((e: any) => e.trim()) : [];
			this.bankAccount = typeof input['Bankszamla'] === 'object' ? new BankAccountDto(input['Bankszamla']) : undefined;
			this.dayOfBirth = typeof input['SzuletesiNap'] === 'number' ? input['SzuletesiNap'] : undefined;
			this.emailAddress = typeof input['EmailCim'] === 'string' ? input['EmailCim'].trim() : undefined;
			this.guardianList = Array.isArray(input['Gondviselok']) ? input['Gondviselok'].map((e: any) => new GuardianDto(e)) : [];
			this.instituteCode = typeof input['IntezmenyAzonosito'] === 'string' ? input['IntezmenyAzonosito'].trim() : undefined;
			this.instituteName = typeof input['IntezmenyNev'] === 'string' ? input['IntezmenyNev'].trim() : undefined;
			this.institution = typeof input['Intezmeny'] === 'object' ? new InstitutionDto(input['Intezmeny']) : undefined;
			this.monthOfBirth = typeof input['SzuletesiHonap'] === 'number' ? input['SzuletesiHonap'] : undefined;
			this.mothersName = typeof input['AnyjaNeve'] === 'string' ? input['AnyjaNeve'].trim() : undefined;
			this.name = typeof input['Nev'] === 'string' ? input['Nev'].trim() : undefined;
			this.nameOfBirth = typeof input['SzuletesiNev'] === 'string' ? input['SzuletesiNev'].trim() : undefined;
			this.phoneNumber = typeof input['Telefonszam'] === 'string' ? input['Telefonszam'].trim() : undefined;
			this.placeOfBirth = typeof input['SzuletesiHely'] === 'string' ? input['SzuletesiHely'].trim() : undefined;
			this.schoolYearUID = typeof input['TanevUid'] === 'number' ? input['TanevUid'] : undefined;
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'].trim() : undefined;
			this.yearOfBirth = typeof input['SzuletesiEv'] === 'number' ? input['SzuletesiEv'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Cimek(): Array<string> | undefined {
		return this.addressDataList;
	}

	public get Bankszamla(): BankAccountDto | undefined {
		return this.bankAccount;
	}

	public get SzuletesiNap(): number | undefined {
		return this.dayOfBirth;
	}

	public get EmailCim(): string | undefined {
		return this.emailAddress;
	}

	public get Gondviselok(): Array<GuardianDto> | undefined {
		return this.guardianList;
	}

	public get IntezmenyAzonosito(): string | undefined {
		return this.instituteCode;
	}

	public get IntezmenyNev(): string | undefined {
		return this.instituteName;
	}

	public get Intezmeny(): InstitutionDto | undefined {
		return this.institution;
	}

	public get SzuletesiHonap(): number | undefined {
		return this.monthOfBirth;
	}

	public get AnyjaNeve(): string | undefined {
		return this.mothersName;
	}

	public get Nev(): string | undefined {
		return this.name;
	}

	public get SzuletesiNev(): string | undefined {
		return this.nameOfBirth;
	}

	public get Telefonszam(): string | undefined {
		return this.phoneNumber;
	}

	public get SzuletesiHely(): string | undefined {
		return this.placeOfBirth;
	}

	public get TanevUid(): number | undefined {
		return this.schoolYearUID;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	public get SzuletesiEv(): number | undefined {
		return this.yearOfBirth;
	}

	public get json(): StudentFields {
		return {
			AnyjaNeve: this.mothersName,
			Bankszamla: this.bankAccount?.json,
			Cimek: this.addressDataList,
			EmailCim: this.emailAddress,
			Gondviselok: this.guardianList?.map((gdto) => gdto.json),
			Intezmeny: this.institution?.json,
			IntezmenyAzonosito: this.instituteCode,
			IntezmenyNev: this.instituteName,
			Nev: this.name,
			SzuletesiEv: this.yearOfBirth,
			SzuletesiHely: this.placeOfBirth,
			SzuletesiHonap: this.monthOfBirth,
			SzuletesiNap: this.dayOfBirth,
			SzuletesiNev: this.nameOfBirth,
			TanevUid: this.schoolYearUID,
			Telefonszam: this.phoneNumber,
			Uid: this.uid,
		} as StudentFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<StudentFields> = {
			Cimek: this.addressDataList,
			Bankszamla: this.bankAccount,
			SzuletesiNap: this.dayOfBirth,
			EmailCim: this.emailAddress,
			Gondviselok: this.guardianList,
			IntezmenyAzonosito: this.instituteCode,
			IntezmenyNev: this.instituteName,
			Intezmeny: this.institution,
			SzuletesiHonap: this.monthOfBirth,
			AnyjaNeve: this.mothersName,
			Nev: this.name,
			SzuletesiNev: this.nameOfBirth,
			Telefonszam: this.phoneNumber,
			SzuletesiHely: this.placeOfBirth,
			TanevUid: this.schoolYearUID,
			Uid: this.uid,
			SzuletesiEv: this.yearOfBirth,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof StudentFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
