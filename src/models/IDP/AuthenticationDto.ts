import { IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface AuthenticationFields {
	access_token: string;
	expires_in: number;
	id_token?: string;
	refresh_token: string;
	token_type: string;
}

export default class AuthenticationDto implements Partial<AuthenticationFields> {
	@IsString()
	private readonly accessToken?: string;

	@IsNumber()
	private readonly expiresIn?: number;

	@IsOptional()
	@IsString()
	private readonly idToken?: string;

	@IsString()
	private readonly refreshToken?: string;

	@IsString()
	private readonly tokenType?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.accessToken = typeof input['access_token'] === 'string' ? input['access_token'].trim() : undefined;
			this.expiresIn = typeof input['expires_in'] === 'number' ? input['expires_in'] : undefined;
			this.idToken = typeof input['id_token'] === 'string' ? input['id_token'].trim() : undefined;
			this.refreshToken = typeof input['refresh_token'] === 'string' ? input['refresh_token'].trim() : undefined;
			this.tokenType = typeof input['token_type'] === 'string' ? input['token_type'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get access_token(): string | undefined {
		return this.accessToken;
	}

	public get expires_in(): number | undefined {
		return this.expiresIn;
	}

	public get id_token(): string | undefined {
		return this.idToken;
	}

	public get refresh_token(): string | undefined {
		return this.refreshToken;
	}

	public get token_type(): string | undefined {
		return this.tokenType;
	}

	public get json(): AuthenticationFields {
		return {
			access_token: this.accessToken,
			expires_in: this.expiresIn,
			id_token: this.idToken,
			refresh_token: this.refreshToken,
			token_type: this.tokenType,
		} as AuthenticationFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<AuthenticationFields> = {
			access_token: this.accessToken,
			expires_in: this.expiresIn,
			id_token: this.idToken,
			refresh_token: this.refreshToken,
			token_type: this.tokenType,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof AuthenticationFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
