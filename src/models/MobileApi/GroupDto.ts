import { IsArray, IsBoolean, IsInstance, IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';
import ValueDescriptor from './ValueDescriptor';
import UidStructure from './UidStructure';
import MembershipDto from './Group/MembershipDto';

export interface GroupFields {
	OktatasNevelesiKategoria: ValueDescriptor;
	OsztalyFonok?: UidStructure;
	OsztalyFonokHelyettes?: UidStructure;
	OktatasNevelesiFeladat: ValueDescriptor;
	IsAktiv: boolean;
	Nev: string;
	OktatasNevelesiFeladatSortIndex: number;
	Tipus: string;
	Uid: string;
	Tagsagok: Array<MembershipDto>;
}

export default class GroupDto implements Partial<GroupFields> {
	@IsInstance(ValueDescriptor)
	private readonly category?: ValueDescriptor;

	@IsOptional()
	@IsInstance(UidStructure)
	private readonly classMaster?: UidStructure;

	@IsOptional()
	@IsInstance(UidStructure)
	private readonly classMasterAssistant?: UidStructure;

	@IsInstance(ValueDescriptor)
	private readonly educationType?: ValueDescriptor;

	@IsBoolean()
	private readonly isActive?: boolean;

	@IsString()
	private readonly name?: string;

	@IsOptional()
	@IsNumber()
	private readonly sortIndex?: number;

	@IsString()
	private readonly type?: string;

	@IsString()
	private readonly uid?: string;

	@IsArray()
	@IsInstance(MembershipDto, { each: true })
	private readonly membership?: Array<MembershipDto>;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.category = typeof input['OktatasNevelesiKategoria'] === 'object' ? new ValueDescriptor(input['OktatasNevelesiKategoria']) :
				undefined;
			this.classMaster = typeof input['OsztalyFonok'] === 'object' ? new UidStructure(input['OsztalyFonok']) : undefined;
			this.classMasterAssistant = typeof input['OsztalyFonokHelyettes'] === 'object' ? new UidStructure(input['OsztalyFonokHelyettes']) :
				undefined;
			this.educationType = typeof input['OktatasNevelesiFeladat'] === 'object' ? new ValueDescriptor(input['OktatasNevelesiFeladat']) :
				undefined;
			this.isActive = typeof input['IsAktiv'] === 'boolean' ? input['IsAktiv'] : undefined;
			this.name = typeof input['Nev'] === 'string' ? input['Nev'].trim() : undefined;
			this.sortIndex = typeof input['OktatasNevelesiFeladatSortIndex'] === 'number' ? input['OktatasNevelesiFeladatSortIndex'] : undefined;
			this.type = typeof input['Tipus'] === 'string' ? input['Tipus'].trim() : undefined;
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'].trim() : undefined;
			this.membership = Array.isArray(input['Tagsagok']) ? input['Tagsagok'].map((item: any) => new MembershipDto(item)) : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get OkatasNevelesiKategoria(): ValueDescriptor | undefined {
		return this.category;
	}

	public get OsztalyFonok(): UidStructure | undefined {
		return this.classMaster;
	}

	public get OsztalyFonokHelyettes(): UidStructure | undefined {
		return this.classMasterAssistant;
	}

	public get OktatasNevelesiFeladat(): ValueDescriptor | undefined {
		return this.educationType;
	}

	public get IsAktiv(): boolean | undefined {
		return this.isActive;
	}

	public get Nev(): string | undefined {
		return this.name;
	}

	public get OktatasNevelesiFeladatSortIndex(): number | undefined {
		return this.sortIndex;
	}

	public get Tipus(): string | undefined {
		return this.type;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	public get Tagsagok(): Array<MembershipDto> | undefined {
		return this.membership;
	}

	public get json(): GroupFields {
		return {
			IsAktiv: this.isActive,
			Nev: this.name,
			OktatasNevelesiFeladat: this.educationType?.json,
			OktatasNevelesiFeladatSortIndex: this.sortIndex,
			OktatasNevelesiKategoria: this.category?.json,
			OsztalyFonok: this.classMaster?.json,
			OsztalyFonokHelyettes: this.classMasterAssistant?.json,
			Tagsagok: this.membership?.map((mdto: MembershipDto) => mdto.json),
			Tipus: this.type,
			Uid: this.uid,
		} as GroupFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<GroupFields> = {
			OktatasNevelesiKategoria: this.category,
			OsztalyFonok: this.classMaster,
			OsztalyFonokHelyettes: this.classMasterAssistant,
			OktatasNevelesiFeladat: this.educationType,
			IsAktiv: this.isActive,
			Nev: this.name,
			OktatasNevelesiFeladatSortIndex: this.sortIndex,
			Tipus: this.type,
			Uid: this.uid,
			Tagsagok: this.membership,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof GroupFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
