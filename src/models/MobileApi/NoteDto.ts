import { IsDate, IsInstance, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';
import UidStructure from './UidStructure';
import ValueDescriptor from './ValueDescriptor';

export interface NoteFields {
	Tartalom: string;
	TartalomFormazott: string;
	KeszitesDatuma: Date;
	Datum: Date;
	OsztalyCsoport?: UidStructure;
	LattamozasDatuma?: Date;
	KeszitoTanarNeve: string;
	Cim: string;
	Tipus: ValueDescriptor;
	Uid: string;
}

export default class NoteDto implements Partial<NoteFields> {
	@IsString()
	private readonly content?: string;

	@IsString()
	private readonly contentFormatted?: string;

	@IsDate()
	private readonly creatingTime?: Date;

	@IsDate()
	private readonly date?: Date;

	@IsOptional()
	@IsInstance(UidStructure)
	private readonly group?: UidStructure;

	@IsOptional()
	@IsDate()
	private readonly seenByTutelary?: Date;

	@IsString()
	private readonly teacher?: string;

	@IsString()
	private readonly title?: string;

	@IsInstance(ValueDescriptor)
	private readonly type?: ValueDescriptor;

	@IsString()
	private readonly uid?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.content = typeof input['Tartalom'] === 'string' ? input['Tartalom'].trim() : undefined;
			this.contentFormatted = typeof input['TartalomFormazott'] === 'string' ? input['TartalomFormazott'].trim() : undefined;
			this.creatingTime = typeof input['KeszitesDatuma'] === 'string' ? new Date(input['KeszitesDatuma']) : undefined;
			this.date = typeof input['Datum'] === 'string' ? new Date(input['Datum']) : undefined;
			this.group = typeof input['OsztalyCsoport'] === 'object' ? new UidStructure(input['OsztalyCsoport']) : undefined;
			this.seenByTutelary = typeof input['LattamozasDatuma'] === 'string' ? new Date(input['LattamozasDatuma']) : undefined;
			this.teacher = typeof input['KeszitoTanarNeve'] === 'string' ? input['KeszitoTanarNeve'].trim() : undefined;
			this.title = typeof input['Cim'] === 'string' ? input['Cim'].trim() : undefined;
			this.type = typeof input['Tipus'] === 'object' ? new ValueDescriptor(input['Tipus']) : undefined;
			this.uid = typeof input['Uid'] === 'string' ? input['Uid'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Tartalom(): string | undefined {
		return this.content;
	}

	public get TartalomFormazott(): string | undefined {
		return this.contentFormatted;
	}

	public get KeszitesDatuma(): Date | undefined {
		return this.creatingTime;
	}

	public get Datum(): Date | undefined {
		return this.date;
	}

	public get OsztalyCsoport(): UidStructure | undefined {
		return this.group;
	}

	public get LattamozasDatuma(): Date | undefined {
		return this.seenByTutelary;
	}

	public get KeszitoTanarNeve(): string | undefined {
		return this.teacher;
	}

	public get Cim(): string | undefined {
		return this.title;
	}

	public get Tipus(): ValueDescriptor | undefined {
		return this.type;
	}

	public get Uid(): string | undefined {
		return this.uid;
	}

	public get json(): NoteFields {
		return {
			Cim: this.title,
			Datum: this.date,
			KeszitesDatuma: this.creatingTime,
			KeszitoTanarNeve: this.teacher,
			LattamozasDatuma: this.seenByTutelary,
			OsztalyCsoport: this.group?.json,
			Tartalom: this.content,
			TartalomFormazott: this.contentFormatted,
			Tipus: this.type?.json,
			Uid: this.uid,
		} as NoteFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<NoteFields> = {
			Tartalom: this.content,
			TartalomFormazott: this.contentFormatted,
			KeszitesDatuma: this.creatingTime,
			Datum: this.date,
			OsztalyCsoport: this.group,
			LattamozasDatuma: this.seenByTutelary,
			KeszitoTanarNeve: this.teacher,
			Cim: this.title,
			Tipus: this.type,
			Uid: this.uid,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof NoteFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
