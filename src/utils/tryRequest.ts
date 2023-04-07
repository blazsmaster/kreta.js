import { AxiosError } from 'axios';
import KretaError from '../lib/errors/KretaError';
import { RequestResponseError } from '../types';

export default async function tryRequest(axios: Promise<void>): Promise<void> {
	try {
		return await axios;
	} catch (error) {
		const e: AxiosError<RequestResponseError> = error as AxiosError<RequestResponseError>;
		if (e.response?.status) {
			let errorMsg: string = '';
			const rd: RequestResponseError = e.response?.data!;
			if (typeof rd === 'string')
				errorMsg = rd;
			else if (rd.ErrorList && rd.ErrorList.length > 0) {
				if (rd.ErrorList[1]?.Message)
					errorMsg = rd.ErrorList[1].Message;
				else if (rd.ErrorList[0]?.Message)
					errorMsg = rd.ErrorList[0].Message;
			} else if (rd.Message)
				errorMsg = rd.Message;
			else if (rd.error)
				errorMsg = rd.error;
			else
				errorMsg = 'Unknown error';
			throw new KretaError(`Request failed with status code ${e.response?.status}: ${errorMsg}`);
		} else
			throw new KretaError(`Request failed with unknown status`);
	}
}
