import axios, { AxiosResponse } from 'axios';
import { API, Endpoints, InstituteGlobal } from '../types';
import tryRequest from '../utils/tryRequest';

export default class Global {
	constructor() {
	}

	public getInstituteList(): Promise<InstituteGlobal[]> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(API.GLOBAL + Endpoints.PublikusIntezmenyek, {
				headers: {
					'api-version': 'v1'
				}
			}).then((r: AxiosResponse<InstituteGlobal[]>) => resolve(r.data)));
		});
	}
}
