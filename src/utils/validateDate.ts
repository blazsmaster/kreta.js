import moment from 'moment';
import KretaError from '../lib/errors/KretaError';

export default function validateDate(date: string): string {
	if (!moment(date, 'YYYY-MM-DD', true).isValid())
		throw new KretaError('Invalid date provided');
	else
		return date;
}
