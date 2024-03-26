import { IsNumber, IsObject, IsString, validateSync, ValidationError } from 'class-validator';

export interface InstituteV1Fields {
	instituteId: number;
	instituteCode: string;
	name: string;
	city: string;
	url: string;
	advertisingUrl: string;
	informationImageUrl: string;
	informationUrl: string;
	featureToggleSet: object;
}

export default class InstituteV1Dto implements Partial<InstituteV1Fields> {
	@IsNumber()
	private readonly _instituteId?: number;

	@IsString()
	private readonly _instituteCode?: string;

	@IsString()
	private readonly _name?: string;

	@IsString()
	private readonly _city?: string;

	@IsString()
	private readonly _url?: string;

	@IsString()
	private readonly _advertisingUrl?: string;

	@IsString()
	private readonly _informationImageUrl?: string;

	@IsString()
	private readonly _informationUrl?: string;

	@IsObject()
	private readonly _featureToggleSet?: object;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this._instituteId = typeof input['instituteId'] === 'number' ? input['instituteId'] : undefined;
			this._instituteCode = typeof input['instituteCode'] === 'string' ? input['instituteCode'].trim() : undefined;
			this._name = typeof input['name'] === 'string' ? input['name'].trim() : undefined;
			this._city = typeof input['city'] === 'string' ? input['city'].trim() : undefined;
			this._url = typeof input['url'] === 'string' ? input['url'].trim() : undefined;
			this._advertisingUrl = typeof input['advertisingUrl'] === 'string' && input['advertisingUrl'].length ?
				input['advertisingUrl'].trim() : undefined;
			this._informationImageUrl = typeof input['informationImageUrl'] === 'string' ? input['informationImageUrl'].trim() : undefined;
			this._informationUrl = typeof input['informationUrl'] === 'string' && input['informationUrl'].length ?
				input['informationUrl'].trim() : undefined;
			this._featureToggleSet = typeof input['featureToggleSet'] === 'object' ? input['featureToggleSet'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get instituteId(): number | undefined {
		return this._instituteId;
	}

	public get instituteCode(): string | undefined {
		return this._instituteCode;
	}

	public get name(): string | undefined {
		return this._name;
	}

	public get city(): string | undefined {
		return this._city;
	}

	public get url(): string | undefined {
		return this._url;
	}

	public get advertisingUrl(): string | undefined {
		return this._advertisingUrl;
	}

	public get informationImageUrl(): string | undefined {
		return this._informationImageUrl;
	}

	public get informationUrl(): string | undefined {
		return this._informationUrl;
	}

	public get featureToggleSet(): object | undefined {
		return this._featureToggleSet;
	}

	public get json(): InstituteV1Fields {
		return {
			advertisingUrl: this._advertisingUrl,
			city: this._city,
			featureToggleSet: this._featureToggleSet,
			informationImageUrl: this._informationImageUrl,
			informationUrl: this._informationUrl,
			instituteCode: this._instituteCode,
			instituteId: this._instituteId,
			name: this._name,
			url: this._url,
		} as InstituteV1Fields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<InstituteV1Fields> = {
			instituteId: this._instituteId,
			instituteCode: this._instituteCode,
			name: this._name,
			city: this._city,
			url: this._url,
			advertisingUrl: this._advertisingUrl,
			informationImageUrl: this._informationImageUrl,
			informationUrl: this._informationUrl,
			featureToggleSet: this._featureToggleSet,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof InstituteV1Fields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
