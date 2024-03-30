import { IsArray, IsDate, IsString, validateSync, ValidationError } from 'class-validator';

export interface TokenFields {
	Issuer: string;
	NotBefore: Date;
	IssuedAt: Date;
	Expiration: Date;
	Audience: Array<string>;
	Scope: Array<string>;
	AuthenticationMethod: Array<string>;
	ClientID: string;
	Subject: string;
	AuthenticationTime: Date;
	IdentityProvider: string;
	Name: string;
	KretaUserName: string;
	KretaInstituteUserUniqueId: string;
	KretaSchoolYearId: string;
	Role: string;
	KretaInstituteUserIdpUniqueId: string;
	KretaInstituteCode: string;
	KretaInstituteUserId: string;
	KretaSchoolYearUniqueId: string;
	KretaInstituteUniqueId: string;
	KretaUserType: string;
	JWTID: string;
}

export default class TokenDto implements Partial<TokenFields> {
	@IsString()
	private readonly _iss?: string;

	@IsDate()
	private readonly _nbf?: Date;

	@IsDate()
	private readonly _iat?: Date;

	@IsDate()
	private readonly _exp?: Date;

	@IsArray()
	@IsString({ each: true })
	private readonly _aud?: Array<string>;

	@IsArray()
	@IsString({ each: true })
	private readonly _scope?: Array<string>;

	@IsArray()
	@IsString({ each: true })
	private readonly _amr?: Array<string>;

	@IsString()
	private readonly _client_id?: string;

	@IsString()
	private readonly _sub?: string;

	@IsDate()
	private readonly _auth_time?: Date;

	@IsString()
	private readonly _idp?: string;

	@IsString()
	private readonly _name?: string;

	@IsString()
	private readonly _kreta_user_name?: string;

	@IsString()
	private readonly _kreta_institute_user_unique_id?: string;

	@IsString()
	private readonly _kreta_school_year_id?: string;

	@IsString()
	private readonly _role?: string;

	@IsString()
	private readonly _kreta_institute_user_idp_unique_id?: string;

	@IsString()
	private readonly _kreta_institute_code?: string;

	@IsString()
	private readonly _kreta_institute_user_id?: string;

	@IsString()
	private readonly _kreta_school_year_unique_id?: string;

	@IsString()
	private readonly _kreta_institute_unique_id?: string;

	@IsString()
	private readonly _kreta_user_type?: string;

	@IsString()
	private readonly _jti?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this._iss = typeof input['iss'] === 'string' ? input['iss'] : undefined;
			this._nbf = typeof input['nbf'] === 'number' ? new Date(input['nbf'] * 1000) : undefined;
			this._iat = typeof input['iat'] === 'number' ? new Date(input['iat'] * 1000) : undefined;
			this._exp = typeof input['exp'] === 'number' ? new Date(input['exp'] * 1000) : undefined;
			this._aud = Array.isArray(input['aud']) ? input['aud'].map((e: any) => e.trim()) : [];
			this._scope = Array.isArray(input['scope']) ? input['scope'].map((e: any) => e.trim()) : [];
			this._amr = Array.isArray(input['amr']) ? input['amr'].map((e: any) => e.trim()) : [];
			this._client_id = typeof input['client_id'] === 'string' ? input['client_id'] : undefined;
			this._sub = typeof input['sub'] === 'string' ? input['sub'] : undefined;
			this._auth_time = typeof input['auth_time'] === 'number' ? new Date(input['auth_time'] * 1000) : undefined;
			this._idp = typeof input['idp'] === 'string' ? input['idp'] : undefined;
			this._name = typeof input['name'] === 'string' ? input['name'] : undefined;
			this._kreta_user_name = typeof input['kreta:user_name'] === 'string' ? input['kreta:user_name'] : undefined;
			this._kreta_institute_user_unique_id = typeof input['kreta:institute_user_unique_id'] === 'string' ?
				input['kreta:institute_user_unique_id'] : undefined;
			this._kreta_school_year_id = typeof input['kreta:school_year_id'] === 'string' ? input['kreta:school_year_id'] : undefined;
			this._role = typeof input['role'] === 'string' ? input['role'] : undefined;
			this._kreta_institute_user_idp_unique_id = typeof input['kreta:institute_user_idp_unique_id'] === 'string' ?
				input['kreta:institute_user_idp_unique_id'] : undefined;
			this._kreta_institute_code = typeof input['kreta:institute_code'] === 'string' ? input['kreta:institute_code'] : undefined;
			this._kreta_institute_user_id = typeof input['kreta:institute_user_id'] === 'string' ? input['kreta:institute_user_id'] : undefined;
			this._kreta_school_year_unique_id = typeof input['kreta:school_year_unique_id'] === 'string' ? input['kreta:school_year_unique_id'] :
				undefined;
			this._kreta_institute_unique_id = typeof input['kreta:institute_unique_id'] === 'string' ? input['kreta:institute_unique_id'] :
				undefined;
			this._kreta_user_type = typeof input['kreta:user_type'] === 'string' ? input['kreta:user_type'] : undefined;
			this._jti = typeof input['jti'] === 'string' ? input['jti'] : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get Issuer(): string | undefined {
		return this._iss;
	}

	public get NotBefore(): Date | undefined {
		return this._nbf;
	}

	public get IssuedAt(): Date | undefined {
		return this._iat;
	}

	public get Expiration(): Date | undefined {
		return this._exp;
	}

	public get Audience(): Array<string> | undefined {
		return this._aud;
	}

	public get Scope(): Array<string> | undefined {
		return this._scope;
	}

	public get AuthenticationMethod(): Array<string> | undefined {
		return this._amr;
	}

	public get ClientID(): string | undefined {
		return this._client_id;
	}

	public get Subject(): string | undefined {
		return this._sub;
	}

	public get AuthenticationTime(): Date | undefined {
		return this._auth_time;
	}

	public get IdentityProvider(): string | undefined {
		return this._idp;
	}

	public get Name(): string | undefined {
		return this._name;
	}

	public get KretaUserName(): string | undefined {
		return this._kreta_user_name;
	}

	public get KretaInstituteUserUniqueId(): string | undefined {
		return this._kreta_institute_user_unique_id;
	}

	public get KretaSchoolYearId(): string | undefined {
		return this._kreta_school_year_id;
	}

	public get Role(): string | undefined {
		return this._role;
	}

	public get KretaInstituteUserIdpUniqueId(): string | undefined {
		return this._kreta_institute_user_idp_unique_id;
	}

	public get KretaInstituteCode(): string | undefined {
		return this._kreta_institute_code;
	}

	public get KretaInstituteUserId(): string | undefined {
		return this._kreta_institute_user_id;
	}

	public get KretaSchoolYearUniqueId(): string | undefined {
		return this._kreta_school_year_unique_id;
	}

	public get KretaInstituteUniqueId(): string | undefined {
		return this._kreta_institute_unique_id;
	}

	public get KretaUserType(): string | undefined {
		return this._kreta_user_type;
	}

	public get JWTID(): string | undefined {
		return this._jti;
	}

	public get json(): TokenFields {
		return {
			Audience: this._aud,
			AuthenticationMethod: this._amr,
			AuthenticationTime: this._auth_time,
			ClientID: this._client_id,
			Expiration: this._exp,
			IdentityProvider: this._idp,
			IssuedAt: this._iat,
			Issuer: this._iss,
			JWTID: this._jti,
			KretaInstituteCode: this._kreta_institute_code,
			KretaInstituteUniqueId: this._kreta_institute_unique_id,
			KretaInstituteUserId: this._kreta_institute_user_id,
			KretaInstituteUserIdpUniqueId: this._kreta_institute_user_idp_unique_id,
			KretaInstituteUserUniqueId: this._kreta_institute_user_unique_id,
			KretaSchoolYearId: this._kreta_school_year_id,
			KretaSchoolYearUniqueId: this._kreta_school_year_unique_id,
			KretaUserName: this._kreta_user_name,
			KretaUserType: this._kreta_user_type,
			Name: this._name,
			NotBefore: this._nbf,
			Role: this._role,
			Scope: this._scope,
			Subject: this._sub,
		} as TokenFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<TokenFields> = {
			Issuer: this._iss,
			NotBefore: this._nbf,
			IssuedAt: this._iat,
			Expiration: this._exp,
			Audience: this._aud,
			Scope: this._scope,
			AuthenticationMethod: this._amr,
			ClientID: this._client_id,
			Subject: this._sub,
			AuthenticationTime: this._auth_time,
			IdentityProvider: this._idp,
			Name: this._name,
			KretaUserName: this._kreta_user_name,
			KretaInstituteUserUniqueId: this._kreta_institute_user_unique_id,
			KretaSchoolYearId: this._kreta_school_year_id,
			Role: this._role,
			KretaInstituteUserIdpUniqueId: this._kreta_institute_user_idp_unique_id,
			KretaInstituteCode: this._kreta_institute_code,
			KretaInstituteUserId: this._kreta_institute_user_id,
			KretaSchoolYearUniqueId: this._kreta_school_year_unique_id,
			KretaInstituteUniqueId: this._kreta_institute_unique_id,
			KretaUserType: this._kreta_user_type,
			JWTID: this._jti,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof TokenFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
