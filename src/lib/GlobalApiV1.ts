import axios, { AxiosError } from 'axios';
import { API, Endpoints } from '../api';
import InstituteSchema from '../models/GlobalApi/InstituteSchema';

export class GlobalApiV1 {
	public async getInstitutes(): Promise<Array<InstituteSchema>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await axios.get(API.Global.Host + API.Global.Path + Endpoints.Global.GetInstitutes);

				const institutes: Array<InstituteSchema> = [];
				for (const institute of response.data) {
					institutes.push(new InstituteSchema(institute));
				}

				resolve(institutes);
			} catch (e) {
				reject((e as AxiosError).response?.data || (e as AxiosError).message);
			}
		});
	}
}
