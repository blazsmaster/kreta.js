import Kreta from '../lib/Kreta';
import Administration from '../lib/Administration';
import KretaError from '../lib/errors/KretaError';

export default function requireCredentials(target: any, propertyName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
	const originalMethod = descriptor.value;
	descriptor.value = function (...args: any[]) {
		const instance: Kreta | Administration = this as Kreta || Administration;
		if (!instance._username || !instance._password || !instance._institute_code)
			throw new KretaError('Missing required credentials');
		return originalMethod.call(this, ...args);
	};
	return descriptor;
}
