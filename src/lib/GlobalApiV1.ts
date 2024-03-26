import axios, { AxiosError } from 'axios';
import { API, Endpoints } from '../api';
import InstituteDto from '../models/GlobalApi/InstituteDto';
import InstituteV1Dto from '../models/GlobalApi/InstituteV1Dto';

export class GlobalApiV1 {
	private readonly api_key: string = '7856d350-1fda-45f5-822d-e1a2f3f1acf0';

	/**
	 * @description Globális konfigurációs leírók lekérése
	 */
	public getGlobalConfigurationDescriptors(): Promise<Record<string, string>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await axios.get(API.Global.WinCore + API.Global.Path + Endpoints.Global.GetConfigurationDescriptors);
				resolve(response.data);
			} catch (e) {
				reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Intézmények lekérése
	 */
	public getInstitutesV1(): Promise<Array<InstituteV1Dto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await axios.get((await this.getGlobalConfigurationDescriptors())['GlobalMobileApiUrlPROD'] + '/api/v1/Institute', {
					headers: {
						'apiKey': this.api_key,
					},
				});

				const institutes: Array<InstituteV1Dto> = [];
				for (const institute of response.data) {
					institutes.push(new InstituteV1Dto(institute));
				}

				resolve(institutes);
			} catch (e) {
				reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Intézmények lekérése
	 */
	public getInstitutes(): Promise<Array<InstituteDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await axios.get(API.Global.Host + API.Global.Path + Endpoints.Global.GetInstitutes, {
					headers: {
						'api-version': 'v1',
					},
				});

				const institutes: Array<InstituteDto> = [];
				for (const institute of response.data) {
					institutes.push(new InstituteDto(institute));
				}

				resolve(institutes);
			} catch (e) {
				reject((e as AxiosError).response?.data);
			}
		});
	}
}
