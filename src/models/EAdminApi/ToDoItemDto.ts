import { IsBoolean, IsInstance, IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';
import ToDoMandatoryDocumentsListDto from './ToDoMandatoryDocumentsListDto';

export interface ToDoItemFields {
	megnevezes: string;
	dokumentumSablonAzonosito?: number;
	vegrehajtoKretaAzonosito?: number;
	segitseg: string;
	segitsegUrl: string;
	azonosito: number;
	isAutomatikus: boolean;
	isElektronizalt: boolean;
	isKesz: boolean;
	isRendszerKesz: boolean;
	cimke?: string;
	sorrend?: string;
	rendszerKeszSzoveg?: string;
	teendoKotelezoDokumentum?: ToDoMandatoryDocumentsListDto;
}

export default class ToDoItemDto implements Partial<ToDoItemFields> {
	@IsString()
	private readonly appellation?: string;

	@IsOptional()
	@IsNumber()
	private readonly documentTemplateId?: number;

	@IsOptional()
	@IsNumber()
	private readonly executiveId?: number;

	@IsString()
	private readonly help?: string;

	@IsString()
	private readonly helpUrl?: string;

	@IsNumber()
	private readonly id?: number;

	@IsBoolean()
	private readonly isAutomatic?: boolean;

	@IsBoolean()
	private readonly isOnline?: boolean;

	@IsBoolean()
	private readonly isReady?: boolean;

	@IsBoolean()
	private readonly isSystemReady?: boolean;

	@IsOptional()
	@IsString()
	private readonly label?: string;

	@IsOptional()
	@IsString()
	private readonly sequence?: string;

	@IsOptional()
	@IsString()
	private readonly systemReadyText?: string;

	@IsOptional()
	@IsInstance(ToDoMandatoryDocumentsListDto)
	private readonly toDoMandatoryDocumentsList?: ToDoMandatoryDocumentsListDto;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.appellation = typeof input['megnevezes'] === 'string' ? input['megnevezes'].trim() : undefined;
			this.documentTemplateId = typeof input['dokumentumSablonAzonosito'] === 'number' ? input['dokumentumSablonAzonosito'] : undefined;
			this.executiveId = typeof input['vegrehajtoKretaAzonosito'] === 'number' ? input['vegrehajtoKretaAzonosito'] : undefined;
			this.help = typeof input['segitseg'] === 'string' ? input['segitseg'].trim() : undefined;
			this.helpUrl = typeof input['segitsegUrl'] === 'string' ? input['segitsegUrl'].trim() : undefined;
			this.id = typeof input['azonosito'] === 'number' ? input['azonosito'] : undefined;
			this.isAutomatic = typeof input['isAutomatikus'] === 'boolean' ? input['isAutomatikus'] : undefined;
			this.isOnline = typeof input['isElektronizalt'] === 'boolean' ? input['isElektronizalt'] : undefined;
			this.isReady = typeof input['isKesz'] === 'boolean' ? input['isKesz'] : undefined;
			this.isSystemReady = typeof input['isRendszerKesz'] === 'boolean' ? input['isRendszerKesz'] : undefined;
			this.label = typeof input['cimke'] === 'string' ? input['cimke'].trim() : undefined;
			this.sequence = typeof input['sorrend'] === 'string' ? input['sorrend'].trim() : undefined;
			this.systemReadyText = typeof input['rendszerKeszSzoveg'] === 'string' ? input['rendszerKeszSzoveg'].trim() : undefined;
			this.toDoMandatoryDocumentsList = typeof input['teendoKotelezoDokumentum'] === 'object' ?
				new ToDoMandatoryDocumentsListDto(input['teendoKotelezoDokumentum']) : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get megnevezes(): string | undefined {
		return this.appellation;
	}

	public get dokumentumSablonAzonosito(): number | undefined {
		return this.documentTemplateId;
	}

	public get vegrehajtoKretaAzonosito(): number | undefined {
		return this.executiveId;
	}

	public get segitseg(): string | undefined {
		return this.help;
	}

	public get segitsegUrl(): string | undefined {
		return this.helpUrl;
	}

	public get azonosito(): number | undefined {
		return this.id;
	}

	public get isAutomatikus(): boolean | undefined {
		return this.isAutomatic;
	}

	public get isElektronizalt(): boolean | undefined {
		return this.isOnline;
	}

	public get isKesz(): boolean | undefined {
		return this.isReady;
	}

	public get isRendszerKesz(): boolean | undefined {
		return this.isSystemReady;
	}

	public get cimke(): string | undefined {
		return this.label;
	}

	public get sorrend(): string | undefined {
		return this.sequence;
	}

	public get rendszerKeszSzoveg(): string | undefined {
		return this.systemReadyText;
	}

	public get teendoKotelezoDokumentum(): ToDoMandatoryDocumentsListDto | undefined {
		return this.toDoMandatoryDocumentsList;
	}

	public get json(): ToDoItemFields {
		return {
			azonosito: this.id,
			cimke: this.label,
			dokumentumSablonAzonosito: this.documentTemplateId,
			isAutomatikus: this.isAutomatic,
			isElektronizalt: this.isOnline,
			isKesz: this.isReady,
			isRendszerKesz: this.isSystemReady,
			megnevezes: this.appellation,
			rendszerKeszSzoveg: this.systemReadyText,
			segitseg: this.help,
			segitsegUrl: this.helpUrl,
			sorrend: this.sequence,
			teendoKotelezoDokumentum: this.toDoMandatoryDocumentsList?.json,
			vegrehajtoKretaAzonosito: this.executiveId,
		} as ToDoItemFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<ToDoItemFields> = {
			azonosito: this.id,
			cimke: this.label,
			dokumentumSablonAzonosito: this.documentTemplateId,
			isAutomatikus: this.isAutomatic,
			isElektronizalt: this.isOnline,
			isKesz: this.isReady,
			isRendszerKesz: this.isSystemReady,
			megnevezes: this.appellation,
			rendszerKeszSzoveg: this.systemReadyText,
			segitseg: this.help,
			segitsegUrl: this.helpUrl,
			sorrend: this.sequence,
			teendoKotelezoDokumentum: this.toDoMandatoryDocumentsList,
			vegrehajtoKretaAzonosito: this.executiveId,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof ToDoItemFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
