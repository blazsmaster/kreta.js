import axios, { AxiosInstance, AxiosProxyConfig } from 'axios';
import FormData from 'form-data';
import { API, Endpoints } from '../api';
import TemporaryFileDto, { TemporaryFileFields } from '../models/EAdminApi/TemporaryFileDto';
import RectificationPostDto, { RectificationPostFields } from '../models/EAdminApi/RectificationPostDto';
import TmgiCasePostDto, { TmgiCasePostFields } from '../models/EAdminApi/TmgiCasePostDto';
import AccessControlSystemItemDto, { AccessControlSystemItemFields } from '../models/EAdminApi/AccessControlSystemItemDto';
import KretaClassDto, { KretaClassFields } from '../models/MobileApi/KretaClassDto';
import GuardianEAdminDto, { GuardianEAdminFields } from '../models/MobileApi/GuardianEAdminDto';
import AddresseeTypeDto, { AddresseeTypeFields } from '../models/EAdminApi/AddresseeTypeDto';
import EmployeeDetailsDto, { EmployeeDetailsFields } from '../models/EAdminApi/EmployeeDetailsDto';
import CaseDto, { CaseFields } from '../models/EAdminApi/CaseDto';
import TypeDto, { TypeFields } from '../models/EAdminApi/TypeDto';
import ChildDto, { ChildFields } from '../models/EAdminApi/ChildDto';
import CurrentInstitutionDetailsDto, { CurrentInstitutionDetailsFields } from '../models/EAdminApi/CurrentInstitutionDetailsDto';
import MailboxItemDto, { MailboxItemFields } from '../models/EAdminApi/MailboxItemDto';
import MessageLimitationsDto, { MessageLimitationsFields } from '../models/EAdminApi/MessageLimitationsDto';
import SignerDto, { SignerFields } from '../models/EAdminApi/SignerDto';
import StatusDto, { StatusFields } from '../models/EAdminApi/StatusDto';
import GuardianDto, { GuardianFields } from '../models/MobileApi/GuardianDto';
import ReadMessageRequestDto, { ReadMessageRequestFields } from '../models/EAdminApi/ReadMessageRequestDto';
import MessageDto, { MessageFields } from '../models/EAdminApi/MessageDto';
import SendMessageToBinRequestDto, { SendMessageToBinRequestFields } from '../models/EAdminApi/SendMessageToBinRequestDto';
import { KretaError } from '../utils/ErrorHandler';

export interface EAdminApiV1Options {
	/**
	 * @description Hozzáférési token (bearer)
	 */
	accessToken: string;
}

export class EAdminApiV1 {
	private readonly _access_token: string;

	private readonly instance: AxiosInstance;

	constructor(options: EAdminApiV1Options) {
		this._access_token = options.accessToken;

		this.instance = axios.create({
			baseURL: API.Eugyintezes.Host + API.Eugyintezes.Path,
			headers: {
				Authorization: `Bearer ${this._access_token}`,
				'X-Uzenet-Lokalizacio': 'hu-HU',
			},
		});
	}

	/**
	 * @description Fájl csatolása
	 * @param part - Fájl
	 */
	public createAttachment(part: Buffer | string): Promise<TemporaryFileDto> {
		return new Promise((resolve, reject) => {
			const form = new FormData();
			form.append('file', part);

			this.instance.post<TemporaryFileFields>(Endpoints.Eugyintezes.CreateAttachment, form, {
				headers: form.getHeaders(),
			})
				.then((r) => resolve(new TemporaryFileDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Javító intézkedés létrehozása
	 * @param ugyId - Az ügy azonosítója
	 * @param body
	 */
	public createRectification(ugyId: string, body: RectificationPostFields): Promise<any> {
		return new Promise((resolve, reject) => {
			this.instance.post(Endpoints.Eugyintezes.CreateRectification(ugyId), new RectificationPostDto(body).json)
				.then((r) => resolve(r.data))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description TMGI igazolás létrehozása
	 * @param body
	 */
	public createTmgiCase(body: TmgiCasePostFields): Promise<any> {
		return new Promise((resolve, reject) => {
			this.instance.post(Endpoints.Eugyintezes.CreateTmgiCase, new TmgiCasePostDto(body).json)
				.then((r) => resolve(r.data))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Üzenetek (végleges) törlése
	 * @param postaladaElemAzonositok - Az üzenetek azonosítói
	 * @param isKuka - Ha [true], akkor a kukába kerülnek az üzenetek
	 */
	public deleteMessagePermanently(postaladaElemAzonositok: Array<(number | string)>, isKuka?: boolean): Promise<any> {
		return new Promise((resolve, reject) => {
			this.instance.delete(Endpoints.Eugyintezes.DeleteMessagePermanently, {
				params: {
					postaladaElemAzonositok: postaladaElemAzonositok.map(item => typeof item === 'string' ? parseInt(item) : item),
					isKuka,
				},
			})
				.then((r) => resolve(r.data))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Beléptető rendszer eseményeinek lekérdezése
	 */
	public getAccessControlSystemEvents(): Promise<Array<AccessControlSystemItemDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<AccessControlSystemItemFields>>(Endpoints.Eugyintezes.GetAccessControlSystemEvents)
				.then((r) => resolve(r.data.map((item) => new AccessControlSystemItemDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Címezhető osztályok lekérdezése
	 * @param cimzettKod - A címzett kódja
	 */
	public getAddressableClasses(cimzettKod: string): Promise<Array<KretaClassDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<KretaClassFields>>(Endpoints.Eugyintezes.GetAddressableClasses, {
				params: {
					cimzettKod,
				},
			})
				.then((r) => resolve(r.data.map((item) => new KretaClassDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Címezhető szülők lekérdezése
	 * @param osztalyKretaAzonosito - Az osztály Kréta azonosítója
	 */
	public getAddressableGuardiansForClass(osztalyKretaAzonosito: number | string): Promise<Array<GuardianEAdminDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<GuardianEAdminFields>>(Endpoints.Eugyintezes.GetAddressableGuardiansForClass(osztalyKretaAzonosito))
				.then((r) => resolve(r.data.map((item) => new GuardianEAdminDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Címezhető SZMK képviselők lekérdezése
	 */
	public getAddressableSzmkRepesentative(): Promise<Array<GuardianEAdminDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<GuardianEAdminFields>>(Endpoints.Eugyintezes.GetAddressableSzmkRepesentative)
				.then((r) => resolve(r.data.map((item) => new GuardianEAdminDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Címezhető típusok lekérdezése
	 */
	public getAddressableType(): Promise<Array<AddresseeTypeDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<AddresseeTypeFields>>(Endpoints.Eugyintezes.GetAddressableType)
				.then((r) => resolve(r.data.map((item) => new AddresseeTypeDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Címzett típusok lekérdezése
	 */
	public getAddresseeType(): Promise<Array<AddresseeTypeDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<AddresseeTypeFields>>(Endpoints.Eugyintezes.GetAddresseeType)
				.then((r) => resolve(r.data.map((item) => new AddresseeTypeDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Adminisztrátorok lekérdezése
	 */
	public getAdministrators(): Promise<Array<EmployeeDetailsDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<EmployeeDetailsFields>>(Endpoints.Eugyintezes.GetAdministrators)
				.then((r) => resolve(r.data.map((item) => new EmployeeDetailsDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Ügy lekérdezése
	 * @param ugyId - Az ügy azonosítója
	 */
	public getCase(ugyId: string): Promise<CaseDto> {
		return new Promise((resolve, reject) => {
			this.instance.get<CaseFields>(Endpoints.Eugyintezes.GetCase(ugyId))
				.then((r) => resolve(new CaseDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Ügy típusok lekérdezése
	 */
	public getCaseTypes(): Promise<Array<TypeDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<TypeFields>>(Endpoints.Eugyintezes.GetCaseTypes)
				.then((r) => resolve(r.data.map((item) => new TypeDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Ügyek lekérdezése
	 * @param isLezartakIs - Ha [true], akkor a lezárt ügyek is visszaadódnak
	 */
	public getCases(isLezartakIs?: boolean): Promise<Array<CaseDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<CaseFields>>(Endpoints.Eugyintezes.GetCases, {
				params: {
					isLezartakIs,
				},
			})
				.then((r) => resolve(r.data.map((item) => new CaseDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Gyermek adatok lekérdezése
	 */
	public getChildData(): Promise<ChildDto> {
		return new Promise((resolve, reject) => {
			this.instance.get<ChildFields>(Endpoints.Eugyintezes.GetChildData)
				.then((r) => resolve(new ChildDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Osztályfőnökök lekérdezése
	 */
	public getClassMasters(): Promise<Array<EmployeeDetailsDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<EmployeeDetailsFields>>(Endpoints.Eugyintezes.GetClassMasters)
				.then((r) => resolve(r.data.map((item) => new EmployeeDetailsDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Jelenlegi intézmény adatainak lekérdezése
	 */
	public getCurrentInstitutionDetails(): Promise<CurrentInstitutionDetailsDto> {
		return new Promise((resolve, reject) => {
			this.instance.get<CurrentInstitutionDetailsFields>(Endpoints.Eugyintezes.GetCurrentInstitutionDetails)
				.then((r) => resolve(new CurrentInstitutionDetailsDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Jelenlegi intézmény moduljainak lekérdezése
	 */
	public getCurrentInstitutionModules(): Promise<Array<string>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<string>>(Endpoints.Eugyintezes.GetCurrentInstitutionModules)
				.then((r) => resolve(r.data))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Igazgatóság tagjainak lekérdezése
	 */
	public getDirectors(): Promise<Array<EmployeeDetailsDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<EmployeeDetailsFields>>(Endpoints.Eugyintezes.GetDirectors)
				.then((r) => resolve(r.data.map((item) => new EmployeeDetailsDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Üzenet lekérdezése
	 * @param azonosito - Az üzenet azonosítója
	 */
	public getMessage(azonosito: number | string): Promise<MailboxItemDto> {
		return new Promise((resolve, reject) => {
			this.instance.get<MailboxItemFields>(Endpoints.Eugyintezes.GetMessage(azonosito))
				.then((r) => resolve(new MailboxItemDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Üzenetkorlátok lekérdezése
	 */
	public getMessageLimitations(): Promise<MessageLimitationsDto> {
		return new Promise((resolve, reject) => {
			this.instance.get<MessageLimitationsFields>(Endpoints.Eugyintezes.GetMessageLimitations)
				.then((r) => resolve(new MessageLimitationsDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Üzenetek lekérdezése
	 */
	public getMessages(): Promise<Array<MailboxItemDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<MailboxItemFields>>(Endpoints.Eugyintezes.GetMessages)
				.then((r) => resolve(r.data.map((item) => new MailboxItemDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Aláíró lekérdezése
	 * @param kerelemAzonosito - A kérelem azonosítója
	 * @param kretaAzonosito - Aláíró Kréta azonosítója
	 */
	public getSigner(kerelemAzonosito: number | string, kretaAzonosito: number | string): Promise<SignerDto> {
		return new Promise((resolve, reject) => {
			this.instance.get<SignerFields>(Endpoints.Eugyintezes.GetSigner(kerelemAzonosito, kretaAzonosito))
				.then((r) => resolve(new SignerDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Státusz lekérdezése
	 */
	public getStatus(): Promise<StatusDto> {
		return new Promise((resolve, reject) => {
			this.instance.get<StatusFields>(Endpoints.Eugyintezes.GetStatus)
				.then((r) => resolve(new StatusDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Címezhető SZMK képviselők lekérdezése
	 */
	public getSzmk(): Promise<Array<GuardianDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<GuardianFields>>(Endpoints.Eugyintezes.GetSzmk)
				.then((r) => resolve(r.data.map((item) => new GuardianDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Tanárok lekérdezése
	 */
	public getTeachers(): Promise<Array<EmployeeDetailsDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<EmployeeDetailsFields>>(Endpoints.Eugyintezes.GetTeachers)
				.then((r) => resolve(r.data.map((item) => new EmployeeDetailsDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description TMGI igazolás típusok lekérdezése
	 */
	public getTmgiCaseTypes(): Promise<Array<TypeDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<TypeFields>>(Endpoints.Eugyintezes.GetTmgiCaseTypes)
				.then((r) => resolve(r.data.map((item) => new TypeDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Olvasatlan üzenetek számának lekérdezése
	 */
	public getUnreadMessagesCount(): Promise<number> {
		return new Promise((resolve, reject) => {
			this.instance.get<number>(Endpoints.Eugyintezes.GetUnreadMessagesCount)
				.then((r) => resolve(r.data))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Üzenet elolvasása
	 * @param body
	 */
	public readMessage(body: ReadMessageRequestFields): Promise<any> {
		return new Promise((resolve, reject) => {
			this.instance.post(Endpoints.Eugyintezes.ReadMessage, new ReadMessageRequestDto(body).json)
				.then((r) => resolve(r.data))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Üzenet küldése
	 * @param body
	 */
	public sendMessage(body: MessageFields): Promise<any> {
		return new Promise((resolve, reject) => {
			this.instance.post(Endpoints.Eugyintezes.SendMessage, new MessageDto(body).json)
				.then((r) => resolve(r.data))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Üzenetek kukába küldése
	 * @param body
	 */
	public sendMessageToBin(body: SendMessageToBinRequestFields): Promise<any> {
		return new Promise((resolve, reject) => {
			this.instance.post(Endpoints.Eugyintezes.SendMessageToBin, new SendMessageToBinRequestDto(body).json)
				.then((r) => resolve(r.data))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Hozzáférési token
	 */
	public get accessToken(): string {
		return this._access_token;
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
