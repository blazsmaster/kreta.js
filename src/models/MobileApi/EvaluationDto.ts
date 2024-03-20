import { IsDate, IsInstance, IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';
import ValueDescriptor from './ValueDescriptor';
import UidStructure from './UidStructure';
import SubjectDescriptor from './SubjectDescriptor';

export interface EvaluationFields {
	KeszitesDatuma?: Date;
	Jelleg?: string;
	ErtekFajta?: ValueDescriptor;
	OsztalyCsoport?: UidStructure;
	Mod?: ValueDescriptor;
	SzamErtek?: number;
	RogzitesDatuma?: Date;
	LattamozasDatuma?: Date;
	SzovegesErtekelesRovidNev?: string;
	SortIndex?: number;
	Tantargy?: SubjectDescriptor;
	ErtekeloTanarNeve?: string;
	Tema?: string;
	Tipus?: ValueDescriptor;
	Uid?: string;
	SzovegesErtek?: string;
	SulySzazalekErteke?: number;
}

export default class EvaluationDto implements Partial<EvaluationFields> {
	@IsDate()
	private readonly creatingTime?: Date;

	@IsOptional()
	@IsString()
	private readonly form?: string;

	@IsInstance(ValueDescriptor)
	private readonly formType?: ValueDescriptor;

	@IsInstance(UidStructure)
	private readonly group?: UidStructure;

	@IsOptional()
	@IsInstance(ValueDescriptor)
	private readonly mode?: ValueDescriptor;

	@IsOptional()
	@IsNumber()
	private readonly numberValue?: number;

	@IsDate()
	private readonly recordDate?: Date;

	@IsOptional()
	@IsDate()
	private readonly seenByTutelary?: Date;

	@IsOptional()
	@IsString()
	private readonly shortValue?: string;

	@IsNumber()
	private readonly sortIndex?: number;

	@IsOptional()
	@IsInstance(SubjectDescriptor)
	private readonly subject?: SubjectDescriptor;

	@IsString()
	private readonly teacher?: string;

	@IsOptional()
	@IsString()
	private readonly theme?: string;

	@IsInstance(ValueDescriptor)
	private readonly type?: ValueDescriptor;

	@IsString()
	private readonly uid?: string;

	@IsString()
	private readonly value?: string;

	@IsOptional()
	@IsNumber()
	private readonly weight?: number;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.creatingTime = typeof input['KeszitesDatuma'] === 'string' ? new Date(input['KeszitesDatuma']) : undefined;
			this.form = typeof input['Jelleg'] === 'string' ? input['Jelleg'].trim() : undefined;
			this.formType = typeof input['ErtekFajta'] === 'object' ? new ValueDescriptor(input['ErtekFajta']) : undefined;
			this.group = typeof input['OsztalyCsoport'] === 'object' ? new UidStructure(input['OsztalyCsoport']) : undefined;
			this.mode = typeof input['Mod'] === 'object' ? new ValueDescriptor(input['Mod']) : undefined;
			this.numberValue = typeof input['SzamErtek'] === 'number' ? input['SzamErtek'] : undefined;
			this.recordDate = typeof input['RogzitesDatuma'] === 'string' ? new Date(input['RogzitesDatuma']) : undefined;
			this.seenByTutelary = typeof input['LattamozasDatuma'] === 'string' ? new Date(input['LattamozasDatuma']) : undefined;
			this.shortValue = typeof input['SzovegesErtekelesRovidNev'] === 'string' ? input['SzovegesErtekelesRovidNev'].trim() : undefined;
			this.sortIndex = typeof input['SortIndex'] === 'number' ? input['SortIndex'] : undefined;
			this.subject = typeof input['Tantargy'] === 'object' ? new SubjectDescriptor(input['Tantargy']) : undefined;
			this.teacher = typeof input['ErtekeloTanarNeve'] === 'string' ? input['ErtekeloTanarNeve'].trim() : undefined;
			this.theme = typeof input['Tema'] === 'string' ? input['Tema'].trim() : undefined;
			this.type = typeof input['Tipus'] === 'object' ? new ValueDescriptor(input['Tipus']) : undefined;
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'].trim() : undefined;
			this.value = typeof input['SzovegesErtek'] === 'string' ? input['SzovegesErtek'].trim() : undefined;
			this.weight = typeof input['SulySzazalekErteke'] === 'number' ? input['SulySzazalekErteke'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get KeszitesDatuma(): Date | undefined {
		return this.creatingTime;
	}

	public get Jelleg(): string | undefined {
		return this.form;
	}

	public get ErtekFajta(): ValueDescriptor | undefined {
		return this.formType;
	}

	public get OsztalyCsoport(): UidStructure | undefined {
		return this.group;
	}

	public get Mod(): ValueDescriptor | undefined {
		return this.mode;
	}

	public get SzamErtek(): number | undefined {
		return this.numberValue;
	}

	public get RogzitesDatuma(): Date | undefined {
		return this.recordDate;
	}

	public get LattamozasDatuma(): Date | undefined {
		return this.seenByTutelary;
	}

	public get SzovegesErtekelesRovidNev(): string | undefined {
		return this.shortValue;
	}

	public get SortIndex(): number | undefined {
		return this.sortIndex;
	}

	public get Tantargy(): SubjectDescriptor | undefined {
		return this.subject;
	}

	public get ErtekeloTanarNeve(): string | undefined {
		return this.teacher;
	}

	public get Tema(): string | undefined {
		return this.theme;
	}

	public get Tipus(): ValueDescriptor | undefined {
		return this.type;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	public get SzovegesErtek(): string | undefined {
		return this.value;
	}

	public get SulySzazalekErteke(): number | undefined {
		return this.weight;
	}

	public get json(): EvaluationFields {
		return {
			ErtekFajta: this.formType?.json,
			ErtekeloTanarNeve: this.teacher,
			Jelleg: this.form,
			KeszitesDatuma: this.creatingTime,
			LattamozasDatuma: this.seenByTutelary,
			Mod: this.mode?.json,
			OsztalyCsoport: this.group?.json,
			RogzitesDatuma: this.recordDate,
			SortIndex: this.sortIndex,
			SulySzazalekErteke: this.weight,
			SzamErtek: this.numberValue,
			SzovegesErtek: this.value,
			SzovegesErtekelesRovidNev: this.shortValue,
			Tantargy: this.subject?.json,
			Tema: this.theme,
			Tipus: this.type?.json,
			Uid: this.uid,
		} as EvaluationFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<EvaluationFields> = {
			KeszitesDatuma: this.creatingTime,
			Jelleg: this.form,
			ErtekFajta: this.formType,
			OsztalyCsoport: this.group,
			Mod: this.mode,
			SzamErtek: this.numberValue,
			RogzitesDatuma: this.recordDate,
			LattamozasDatuma: this.seenByTutelary,
			SzovegesErtekelesRovidNev: this.shortValue,
			SortIndex: this.sortIndex,
			Tantargy: this.subject,
			ErtekeloTanarNeve: this.teacher,
			Tema: this.theme,
			Tipus: this.type,
			Uid: this.uid,
			SzovegesErtek: this.value,
			SulySzazalekErteke: this.weight,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof EvaluationFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
