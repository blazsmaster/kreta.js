const qs = (obj: Record<string, any>) => {
	return '?' + new URLSearchParams(obj).toString();
};

export default qs;
