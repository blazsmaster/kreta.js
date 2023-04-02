export default function dynamicValue(str: string, values: { [key: string]: any }): string {
	return str.replace(/{{(.*?)}}/g, (match: string, key) => values[key] || match);
}
