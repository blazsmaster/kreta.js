import { IsInstance, IsNumber, IsString, validateSync, ValidationError } from 'class-validator';
import TypeDto from './TypeDto';

export interface AddresseeFields {
	azonosito: string;
	kretaAzonosito: number;
	nev: string;
	tipus: TypeDto;
}

export default class AddresseeDto implements Partial<AddresseeFields> {
	@IsString()
	private readonly id?: string;

	@IsNumber()
	private readonly kretaId?: number;

	@IsString()
	private readonly name?: string;

	@IsInstance(TypeDto)
	private readonly type?: TypeDto;

	constructor(input: any) {
		if (typeof input === 'object' && input !== null) {
			this.id = typeof input['azonosito'] === 'string' ? input['azonosito'].trim() : undefined;
			this.kretaId = typeof input['kretaAzonosito'] === 'number' ? input['kretaAzonosito'] : undefined;
			this.name = typeof input['nev'] === 'string' ? input['nev'].trim() : undefined;
			this.type = typeof input['tipus'] === 'object' ? new TypeDto(input['tipus']) : undefined;
		}

		const errors = validateSync(this, { skipMissingProperties: true });
		if (errors.length > 0) {
			throw this.validationErrorResponse(errors);
		}
	}

	public get azonosito(): string | undefined {
		return this.id;
	}

	public get kretaAzonosito(): number | undefined {
		return this.kretaId;
	}

	public get nev(): string | undefined {
		return this.name;
	}

	public get tipus(): TypeDto | undefined {
		return this.type;
	}

	public get json(): AddresseeFields {
		return {
			azonosito: this.id,
			kretaAzonosito: this.kretaId,
			nev: this.name,
			tipus: this.type?.json,
		} as AddresseeFields;
	}

	private validationErrorResponse(errors: Array<ValidationError>): object {
		const validFields: Partial<AddresseeFields> = {
			azonosito: this.id,
			kretaAzonosito: this.kretaId,
			nev: this.name,
			tipus: this.type,
		};
		const errorMessages: Array<string> = [];

		for (const error of errors) {
			validFields[error.property as keyof AddresseeFields] = undefined;
			errorMessages.push(...Object.values(error.constraints || {}));
		}

		return {
			valid: validFields,
			errors: errorMessages,
		};
	}
}
