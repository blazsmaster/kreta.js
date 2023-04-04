import axios, { AxiosResponse } from 'axios';
import { BaseAPIUrls, Endpoints, InstituteGlobal } from '../types';

export default class Global {
	constructor() {
	}

	public getInstituteList(): Promise<InstituteGlobal[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			await axios.get(BaseAPIUrls.GLOBAL + Endpoints.PublikusIntezmenyek, {
				headers: {
					'api-version': 'v1'
				}
			}).then((r: AxiosResponse<InstituteGlobal[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}
}
