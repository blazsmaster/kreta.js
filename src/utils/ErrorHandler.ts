import { AxiosError } from 'axios';
import KretaExceptionError from '../models/KretaExceptionError';
import KError from '../models/KretaError';

class Err {
	message?: string;
	code?: string;
	body?: any;

	constructor(message?: string, status?: string, body?: any) {
		this.message = message;
		this.code = status;
		this.body = body;
	}
}

export class KretaError {
	private readonly _err: any;

	constructor(err: any) {
		this._err = err;
	}

	get body() {
		if (this._err instanceof AxiosError) {
			if (this._err.response && this._err.response.data) {
				const e = this._err.response.data;
				if (e.error) { // IDP authentication error?
					return new Err(this._err.message, this._err.code, new KError(e).json);
				} else if (e.ExceptionId && e.ExceptionType && e.Message) { // API error?
					return new Err(e.Message, e.ExceptionType, new KretaExceptionError(e).json);
				}
				return new Err(this._err.message, this._err.code, this._err.response.data);
			}
			return new Err(this._err.message, this._err.code);
		} else if ((this._err as any)?.valid && (this._err as any)?.errors) { // Dto validation error?
			return new Err('Dto validációs hiba', undefined, this._err);
		} else if (this._err instanceof Error) {
			return new Err(this._err.message, this._err.name);
		} else {
			return new Err(undefined, undefined, this._err); // dawg idk why this would happen
		}
	}
}
