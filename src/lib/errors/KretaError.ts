export default class KretaError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'KretaError';
	}
}
