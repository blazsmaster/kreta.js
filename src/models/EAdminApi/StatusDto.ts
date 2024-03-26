import { IsArray, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';
import FileHandlerDto from './Status/FileHandlerDto';

export interface StatusFields {
	buildNumber?: string;
	enabledFeatures?: Array<string>;
	fileHandlers?: Map<string, FileHandlerDto>;
	idpUrl?: string;
	trackingId?: string;
}

export default class StatusDto implements Partial<StatusFields> {
	@IsOptional()
	@IsString()
	private readonly _buildNumber?: string;

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	private readonly _enabledFeatures?: Array<string>;

	@IsOptional()
	private readonly _fileHandlers?: Map<string, FileHandlerDto>;

	@IsOptional()
	@IsString()
	private readonly _idpUrl?: string;

	@IsOptional()
	@IsString()
	private readonly _trackingId?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this._buildNumber = typeof input['buildNumber'] === 'string' ? input['buildNumber'].trim() : undefined;
			this._enabledFeatures = Array.isArray(input['enabledFeatures']) ? input['enabledFeatures'].map((value: any) => String(value)) :
				undefined;
			this._fileHandlers = new Map<string, FileHandlerDto>();
			if (typeof input['fileHandlers'] === 'object' && input['fileHandlers'] !== null) {
				for (const key in input['fileHandlers']) {
					if (Object.prototype.hasOwnProperty.call(input['fileHandlers'], key)) {
						this._fileHandlers.set(key, new FileHandlerDto(input['fileHandlers'][key]));
					}
				}
			}
			this._idpUrl = typeof input['idpUrl'] === 'string' ? input['idpUrl'].trim() : undefined;
			this._trackingId = typeof input['trackingId'] === 'string' ? input['trackingId'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get buildNumber(): string | undefined {
		return this._buildNumber;
	}

	public get enabledFeatures(): Array<string> | undefined {
		return this._enabledFeatures;
	}

	public get fileHandlers(): Map<string, FileHandlerDto> | undefined {
		return this._fileHandlers;
	}

	public get idpUrl(): string | undefined {
		return this._idpUrl;
	}

	public get trackingId(): string | undefined {
		return this._trackingId;
	}

	public get json(): StatusFields {
		return {
			buildNumber: this._buildNumber,
			enabledFeatures: this._enabledFeatures,
			fileHandlers: this._fileHandlers,
			idpUrl: this._idpUrl,
			trackingId: this._trackingId,
		} as StatusFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<StatusFields> = {
			buildNumber: this._buildNumber,
			enabledFeatures: this._enabledFeatures,
			fileHandlers: this._fileHandlers,
			idpUrl: this._idpUrl,
			trackingId: this._trackingId,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof StatusFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
