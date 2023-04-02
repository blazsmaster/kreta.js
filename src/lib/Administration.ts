import axios, { AxiosResponse } from 'axios';
import {
	AddresseType,
	AuthenticationFields,
	CardEvent, CurrentInstitutionDetails,
	DefaultType, EmployeeDetails,
	GuardianEAdmin,
	KretaClass,
	MailboxItem, MessageLimitations,
	PreBuiltAuthenticationToken, BaseAPIUrls, AdministrationEndpoints
} from '../types';
import { Authentication } from './Authentication';

export default class Administration {
	private readonly username: string;
	private readonly password: string;
	private readonly institute_code: string;
	private authenticate: Authentication;

	constructor(options: AuthenticationFields) {
		this.username = options.username;
		this.password = options.password;
		this.institute_code = options.institute_code;
		this.authenticate = new Authentication({ username: this.username, password: this.password, institute_code: this.institute_code });
	}

	private buildUgyintezesApiURL(endpointWithSlash: AdministrationEndpoints, params?: { [key: string]: any }): string {
		const urlParams: string = params ? '?' + new URLSearchParams(params).toString() : '';
		return BaseAPIUrls.ADMINISTRATION + '/api/v1' + endpointWithSlash + urlParams;
	}

	public getAddresseeType(): Promise<AddresseType[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.CimzettTipusok), {
				headers: {
					'Authorization': token,
					'X-Uzenet-Lokalizacio': 'hu-HU'
				}
			}).then((r: AxiosResponse<AddresseType[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getCaseTypes(): Promise<DefaultType[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.KerelemTipusok), {
				headers: {
					'Authorization': token,
					'X-Uzenet-Lokalizacio': 'hu-HU'
				}
			}).then((r: AxiosResponse<DefaultType[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getTmgiCaseTypes(): Promise<DefaultType[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.TmgiIgazolasTipusok), {
				headers: {
					'Authorization': token,
					'X-Uzenet-Lokalizacio': 'hu-HU'
				}
			}).then((r: AxiosResponse<DefaultType[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getAccessControlSystemEvents(): Promise<CardEvent[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.Esemenyek), {
				headers: {
					'Authorization': token,
					'X-Uzenet-Lokalizacio': 'hu-HU'
				}
			}).then((r: AxiosResponse<CardEvent[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getCurrentInstitutionModules(): Promise<string[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.JelenlegiIntezmenyModulok), {
				headers: {
					'Authorization': token,
					'X-Uzenet-Lokalizacio': 'hu-HU'
				}
			}).then((r: AxiosResponse<string[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getAddressableType(): Promise<AddresseType[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.CimezhetoTipusok), {
				headers: {
					'Authorization': token,
					'X-Uzenet-Lokalizacio': 'hu-HU'
				}
			}).then((r: AxiosResponse<AddresseType[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getAddressableClasses(addressId: string | number): Promise<KretaClass[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.CimezhetoOsztalyok, { cimzettKod: addressId.toString() }), {
				headers: {
					'Authorization': token,
					'X-Uzenet-Lokalizacio': 'hu-HU'
				}
			}).then((r: AxiosResponse<KretaClass[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getUnreadMessagesCount(): Promise<number> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.OlvasatlanokSzama), {
				headers: {
					'Authorization': token,
					'X-Uzenet-Lokalizacio': 'hu-HU'
				}
			}).then((r: AxiosResponse<number>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getMessages(): Promise<MailboxItem[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.Uzenetek), {
				headers: {
					'Authorization': token,
					'X-Uzenet-Lokalizacio': 'hu-HU'
				}
			}).then((r: AxiosResponse<MailboxItem[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getMessage(id: string | number): Promise<MailboxItem> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.Uzenet) + '/' + id.toString(), {
				headers: {
					'Authorization': token,
					'X-Uzenet-Lokalizacio': 'hu-HU'
				}
			}).then((r: AxiosResponse<MailboxItem>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getAddressableSzmkRepesentative(): Promise<GuardianEAdmin[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.CimezhetoSzmkKepviselok), {
				headers: {
					'Authorization': token,
					'X-Uzenet-Lokalizacio': 'hu-HU'
				}
			}).then((r: AxiosResponse<GuardianEAdmin[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getMessageLimitations(): Promise<MessageLimitations> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.UzenetLimitacio), {
				headers: {
					'Authorization': token,
					'X-Uzenet-Lokalizacio': 'hu-HU'
				}
			}).then((r: AxiosResponse<MessageLimitations>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getAdministrators(): Promise<EmployeeDetails[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.Adminisztratorok), {
				headers: {
					'Authorization': token,
					'X-Uzenet-Lokalizacio': 'hu-HU'
				}
			}).then((r: AxiosResponse<EmployeeDetails[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getDirectors(): Promise<EmployeeDetails[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.Igazgatok), {
				headers: {
					'Authorization': token,
					'X-Uzenet-Lokalizacio': 'hu-HU'
				}
			}).then((r: AxiosResponse<EmployeeDetails[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getClassMasters(): Promise<EmployeeDetails[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.Osztalyfonokok), {
				headers: {
					'Authorization': token,
					'X-Uzenet-Lokalizacio': 'hu-HU'
				}
			}).then((r: AxiosResponse<EmployeeDetails[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getTeachers(): Promise<EmployeeDetails[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.Oktatok), {
				headers: {
					'Authorization': token,
					'X-Uzenet-Lokalizacio': 'hu-HU'
				}
			}).then((r: AxiosResponse<EmployeeDetails[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getAddressableGuardiansForClass(classId: string | number): Promise<GuardianEAdmin[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.CimezhetoTanuloSzulok) + '/' + classId.toString(), {
				headers: {
					'Authorization': token,
					'X-Uzenet-Lokalizacio': 'hu-HU'
				}
			}).then((r: AxiosResponse<GuardianEAdmin[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getCurrentInstitutionDetails(): Promise<CurrentInstitutionDetails> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.JelenlegiIntezmeny), {
				headers: {
					'Authorization': token,
					'X-Uzenet-Lokalizacio': 'hu-HU'
				}
			}).then((r: AxiosResponse<CurrentInstitutionDetails>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}
}
