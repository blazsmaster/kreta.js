import { IsNumber, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';

export interface ChildFields {
	oktatasiAzonosito?: number;
	vezetekNev: string;
	keresztNev: string;
	osztaly?: string;
}

export default class ChildDto implements Partial<ChildFields> {
	@IsOptional()
	@IsNumber()
	private readonly educationId?: number;

	@IsString()
	private readonly firstName?: string;

	@IsString()
	private readonly lastName?: string;

	@IsOptional()
	@IsString()
	private readonly studentClass?: string;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.educationId = typeof input['oktatasiAzonosito'] === 'number' ? input['oktatasiAzonosito'] : undefined;
			this.firstName = typeof input['vezetekNev'] === 'string' ? input['vezetekNev'].trim() : undefined;
			this.lastName = typeof input['keresztNev'] === 'string' ? input['keresztNev'].trim() : undefined;
			this.studentClass = typeof input['osztaly'] === 'string' ? input['osztaly'].trim() : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get oktatasiAzonosito(): number | undefined {
		return this.educationId;
	}

	public get vezetekNev(): string | undefined {
		return this.firstName;
	}

	public get keresztNev(): string | undefined {
		return this.lastName;
	}

	public get osztaly(): string | undefined {
		return this.studentClass;
	}

	public get json(): ChildFields {
		return {
			keresztNev: this.lastName,
			oktatasiAzonosito: this.educationId,
			osztaly: this.studentClass,
			vezetekNev: this.firstName,
		} as ChildFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<ChildFields> = {
			oktatasiAzonosito: this.educationId,
			vezetekNev: this.firstName,
			keresztNev: this.lastName,
			osztaly: this.studentClass,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof ChildFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
