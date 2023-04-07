import axios, { AxiosResponse } from 'axios';
import {
	AddresseType,
	AuthenticationFields,
	CardEvent, CurrentInstitutionDetails,
	DefaultType, EmployeeDetails,
	GuardianEAdmin,
	KretaClass,
	MailboxItem, MessageLimitations,
	PreBuiltAuthenticationToken, API, AdministrationEndpoints
} from '../types';
import { Authentication } from './Authentication';
import requireCredentials from '../decorators/requireCredentials';
import tryRequest from '../utils/tryRequest';
import requireParam from '../decorators/requireParam';

export default class Administration {
	private readonly username: string;
	private readonly password: string;
	private readonly institute_code: string;
	private authenticate: Authentication;
	private token?: Promise<string>;

	constructor(options: AuthenticationFields) {
		this.username = options.username;
		this.password = options.password;
		this.institute_code = options.institute_code;
		this.authenticate = new Authentication({ username: this.username, password: this.password, institute_code: this.institute_code });
		if (this.username && this.password && this.institute_code)
			this.token = this.authenticate.getAccessToken().then((r: PreBuiltAuthenticationToken) => r.token);
		axios.defaults.headers['X-Uzenet-Lokalizacio'] = 'hu-HU';
	}

	public get _username() {
		return this.username;
	}

	public get _password() {
		return this.password;
	}

	public get _institute_code() {
		return this.institute_code;
	}

	private buildUgyintezesApiURL(endpointWithSlash: AdministrationEndpoints, params?: { [key: string]: any }): string {
		const urlParams: string = params ? '?' + new URLSearchParams(params).toString() : '';
		return API.ADMINISTRATION + '/api/v1' + endpointWithSlash + urlParams;
	}

	@requireCredentials
	public getAddresseeType(): Promise<AddresseType[]> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.CimzettTipusok), {
				headers: {
					'Authorization': await this.token
				}
			}).then((r: AxiosResponse<AddresseType[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	public getCaseTypes(): Promise<DefaultType[]> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.KerelemTipusok), {
				headers: {
					'Authorization': await this.token
				}
			}).then((r: AxiosResponse<DefaultType[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	public getTmgiCaseTypes(): Promise<DefaultType[]> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.TmgiIgazolasTipusok), {
				headers: {
					'Authorization': await this.token
				}
			}).then((r: AxiosResponse<DefaultType[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	public getAccessControlSystemEvents(): Promise<CardEvent[]> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.Esemenyek), {
				headers: {
					'Authorization': await this.token
				}
			}).then((r: AxiosResponse<CardEvent[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	public getCurrentInstitutionModules(): Promise<string[]> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.JelenlegiIntezmenyModulok), {
				headers: {
					'Authorization': await this.token
				}
			}).then((r: AxiosResponse<string[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	public getAddressableType(): Promise<AddresseType[]> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.CimezhetoTipusok), {
				headers: {
					'Authorization': await this.token
				}
			}).then((r: AxiosResponse<AddresseType[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	@requireParam('addressId')
	public getAddressableClasses(addressId: string | number): Promise<KretaClass[]> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.CimezhetoOsztalyok, { cimzettKod: addressId.toString() }), {
				headers: {
					'Authorization': await this.token
				}
			}).then((r: AxiosResponse<KretaClass[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	public getUnreadMessagesCount(): Promise<number> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.OlvasatlanokSzama), {
				headers: {
					'Authorization': await this.token
				}
			}).then((r: AxiosResponse<number>) => resolve(r.data)));
		});
	}

	@requireCredentials
	public getMessages(): Promise<MailboxItem[]> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.Uzenetek), {
				headers: {
					'Authorization': await this.token
				}
			}).then((r: AxiosResponse<MailboxItem[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	@requireParam('id')
	public getMessage(id: string | number): Promise<MailboxItem> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.Uzenet) + '/' + id.toString(), {
				headers: {
					'Authorization': await this.token
				}
			}).then((r: AxiosResponse<MailboxItem>) => resolve(r.data)));
		});
	}

	@requireCredentials
	public getAddressableSzmkRepesentative(): Promise<GuardianEAdmin[]> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.CimezhetoSzmkKepviselok), {
				headers: {
					'Authorization': await this.token
				}
			}).then((r: AxiosResponse<GuardianEAdmin[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	public getMessageLimitations(): Promise<MessageLimitations> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.UzenetLimitacio), {
				headers: {
					'Authorization': await this.token
				}
			}).then((r: AxiosResponse<MessageLimitations>) => resolve(r.data)));
		});
	}

	@requireCredentials
	public getAdministrators(): Promise<EmployeeDetails[]> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.Adminisztratorok), {
				headers: {
					'Authorization': await this.token
				}
			}).then((r: AxiosResponse<EmployeeDetails[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	public getDirectors(): Promise<EmployeeDetails[]> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.Igazgatok), {
				headers: {
					'Authorization': await this.token
				}
			}).then((r: AxiosResponse<EmployeeDetails[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	public getClassMasters(): Promise<EmployeeDetails[]> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.Osztalyfonokok), {
				headers: {
					'Authorization': await this.token
				}
			}).then((r: AxiosResponse<EmployeeDetails[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	public getTeachers(): Promise<EmployeeDetails[]> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.Oktatok), {
				headers: {
					'Authorization': await this.token
				}
			}).then((r: AxiosResponse<EmployeeDetails[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	@requireParam('classId')
	public getAddressableGuardiansForClass(classId: string | number): Promise<GuardianEAdmin[]> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.CimezhetoTanuloSzulok) + '/' + classId.toString(), {
				headers: {
					'Authorization': await this.token
				}
			}).then((r: AxiosResponse<GuardianEAdmin[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	public getCurrentInstitutionDetails(): Promise<CurrentInstitutionDetails> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildUgyintezesApiURL(AdministrationEndpoints.JelenlegiIntezmeny), {
				headers: {
					'Authorization': await this.token
				}
			}).then((r: AxiosResponse<CurrentInstitutionDetails>) => resolve(r.data)));
		});
	}
}
