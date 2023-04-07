import KretaError from '../lib/errors/KretaError';

export default function requireParam(param: string) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
		const originalMethod = descriptor.value;
		descriptor.value = function (...args: any[]) {
			const value = args[0];
			if (value === null || value === '' || value === undefined)
				throw new KretaError(`'${param}' is a required parameter`);
			if (typeof value === 'object') {
				if (Array.isArray(value)) {
					if (value.length === 0)
						throw new KretaError(`'${param}' must not be an empty array`);
				} else {
					const [objName, propName]: string[] = param.split('.');
					if (propName != null && value[propName] == null)
						throw new KretaError(`'${propName}' is a required property in '${objName}'`);
				}
			}
			return originalMethod.apply(this, args);
		};
	};
}
