import axios, { AxiosInstance, AxiosProxyConfig } from 'axios';
import { API, Endpoints } from '../api';
import InstituteDto, { InstituteFields } from '../models/GlobalApi/InstituteDto';
import InstituteV1Dto, { InstituteV1Fields } from '../models/GlobalApi/InstituteV1Dto';
import { KretaError } from '../utils/ErrorHandler';

export class GlobalApiV1 {
	private readonly api_key: string = '7856d350-1fda-45f5-822d-e1a2f3f1acf0';

	private readonly instance: AxiosInstance;

	constructor() {
		this.instance = axios.create();
	}

	/**
	 * @description Globális konfigurációs leírók lekérése
	 */
	public getGlobalConfigurationDescriptors(): Promise<Record<string, string>> {
		return new Promise((resolve, reject) => {
			this.instance.get(API.Global.WinCore + API.Global.Path + Endpoints.Global.GetConfigurationDescriptors)
				.then((r) => resolve(r.data))
				.catch((e) => reject(new KretaError(e).body));
		});
	};

	/**
	 * @description Intézmények lekérése
	 */
	public getInstitutesV1(): Promise<Array<InstituteV1Dto>> {
		return new Promise(async (resolve, reject) => {
			this.instance.get<Array<InstituteV1Fields>>((await this.getGlobalConfigurationDescriptors())['GlobalMobileApiUrlPROD'] + '/api/v1/Institute', {
				headers: {
					'apiKey': this.api_key,
				},
			})
				.then((r) => resolve(r.data.map(item => new InstituteV1Dto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Intézmények lekérése
	 */
	public getInstitutes(): Promise<Array<InstituteDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<InstituteFields>>(API.Global.Host + API.Global.Path + Endpoints.Global.GetInstitutes, {
				headers: {
					'api-version': 'v1',
				},
			})
				.then((r) => resolve(r.data.map(item => new InstituteDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Egyéni User-Agent beállítása
	 */
	public setUserAgent(ua: string): Omit<this, 'setUserAgent'> {
		this.instance.defaults.headers['User-Agent'] = ua;
		return this;
	}

	/**
	 * @description Proxy beállítása
	 */
	public setProxy(p: AxiosProxyConfig): Omit<this, 'setProxy'> {
		this.instance.defaults.proxy = p;
		return this;
	}
}
