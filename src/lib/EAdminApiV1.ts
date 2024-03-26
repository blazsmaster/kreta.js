import axios, { AxiosInstance } from 'axios';
import { API, Endpoints } from '../api';
import TemporaryFileDto from '../models/EAdminApi/TemporaryFileDto';
import RectificationPostDto, { RectificationPostFields } from '../models/EAdminApi/RectificationPostDto';
import TmgiCasePostDto, { TmgiCasePostFields } from '../models/EAdminApi/TmgiCasePostDto';
import AccessControlSystemItemDto from '../models/EAdminApi/AccessControlSystemItemDto';
import KretaClassDto from '../models/MobileApi/KretaClassDto';
import GuardianEAdminDto from '../models/MobileApi/GuardianEAdminDto';
import AddresseeTypeDto from '../models/EAdminApi/AddresseeTypeDto';
import EmployeeDetailsDto from '../models/EAdminApi/EmployeeDetailsDto';
import CaseDto from '../models/EAdminApi/CaseDto';
import TypeDto from '../models/EAdminApi/TypeDto';
import ChildDto from '../models/EAdminApi/ChildDto';
import CurrentInstitutionDetailsDto from '../models/EAdminApi/CurrentInstitutionDetailsDto';
import MailboxItemDto from '../models/EAdminApi/MailboxItemDto';
import MessageLimitationsDto from '../models/EAdminApi/MessageLimitationsDto';
import SignerDto from '../models/EAdminApi/SignerDto';
import StatusDto from '../models/EAdminApi/StatusDto';
import GuardianDto from '../models/MobileApi/GuardianDto';
import ReadMessageRequestDto, { ReadMessageRequestFields } from '../models/EAdminApi/ReadMessageRequestDto';
import MessageDto, { MessageFields } from '../models/EAdminApi/MessageDto';
import SendMessageToBinRequestDto, { SendMessageToBinRequestFields } from '../models/EAdminApi/SendMessageToBinRequestDto';

export interface EAdminApiV1Fields {
	/**
	 * @description A bejelentkezés után kapott hozzáférési token
	 */
	accessToken: string;
}

export class EAdminApiV1 {
	private readonly _access_token: string;

	private readonly instance: AxiosInstance;

	constructor(fields: EAdminApiV1Fields) {
		this._access_token = fields.accessToken;

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
	 * @param multipartBody
	 */
	public createAttachment(multipartBody: any): Promise<TemporaryFileDto> {
		return new Promise((resolve, reject) => {
			this.instance.post(Endpoints.Eugyintezes.CreateAttachment, multipartBody)
				.then((response) => resolve(new TemporaryFileDto(response.data)))
				.catch((e) => reject(e.response?.data));
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
				.then((response) => resolve(response.data))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description TMGI ügy létrehozása
	 * @param body
	 */
	public createTmgiCase(body: TmgiCasePostFields): Promise<any> {
		return new Promise((resolve, reject) => {
			this.instance.post(Endpoints.Eugyintezes.CreateTmgiCase, new TmgiCasePostDto(body).json)
				.then((response) => resolve(response.data))
				.catch((e) => reject(e.response?.data));
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
					postaladaElemAzonositok: postaladaElemAzonositok.map(i => typeof i === 'string' ? parseInt(i) : i),
					isKuka,
				},
			})
				.then((response) => resolve(response.data))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description Beléptető rendszer eseményeinek lekérdezése
	 */
	public getAccessControlSystemEvents(): Promise<Array<AccessControlSystemItemDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get(Endpoints.Eugyintezes.GetAccessControlSystemEvents)
				.then((response) => resolve(response.data.map((item: any) => new AccessControlSystemItemDto(item))))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description Címezhető osztályok lekérdezése
	 * @param cimzettKod - A címzett kódja
	 */
	public getAddressableClasses(cimzettKod: string): Promise<Array<KretaClassDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get(Endpoints.Eugyintezes.GetAddressableClasses, {
				params: {
					cimzettKod,
				},
			})
				.then((response) => resolve(response.data.map((item: any) => new KretaClassDto(item))))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description Címezhető szülők lekérdezése
	 * @param osztalyKretaAzonosito - Az osztály Kréta azonosítója
	 */
	public getAddressableGuardiansForClass(osztalyKretaAzonosito: number | string): Promise<Array<GuardianEAdminDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get(Endpoints.Eugyintezes.GetAddressableGuardiansForClass(osztalyKretaAzonosito))
				.then((response) => resolve(response.data.map((item: any) => new GuardianEAdminDto(item))))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description Címezhető SZMK képviselők lekérdezése
	 */
	public getAddressableSzmkRepesentative(): Promise<Array<GuardianEAdminDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get(Endpoints.Eugyintezes.GetAddressableSzmkRepesentative)
				.then((response) => resolve(response.data.map((item: any) => new GuardianEAdminDto(item))))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description Címezhető típusok lekérdezése
	 */
	public getAddressableType(): Promise<Array<AddresseeTypeDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get(Endpoints.Eugyintezes.GetAddressableType)
				.then((response) => resolve(response.data.map((item: any) => new AddresseeTypeDto(item))))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description Címzett típusok lekérdezése
	 */
	public getAddresseeType(): Promise<Array<AddresseeTypeDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get(Endpoints.Eugyintezes.GetAddresseeType)
				.then((response) => resolve(response.data.map((item: any) => new AddresseeTypeDto(item))))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description Adminisztrátorok lekérdezése
	 */
	public getAdministrators(): Promise<Array<EmployeeDetailsDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get(Endpoints.Eugyintezes.GetAdministrators)
				.then((response) => resolve(response.data.map((item: any) => new EmployeeDetailsDto(item))))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description Ügy lekérdezése
	 * @param ugyId - Az ügy azonosítója
	 */
	public getCase(ugyId: string): Promise<CaseDto> {
		return new Promise((resolve, reject) => {
			this.instance.get(Endpoints.Eugyintezes.GetCase(ugyId))
				.then((response) => resolve(new CaseDto(response.data)))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description Ügy típusok lekérdezése
	 */
	public getCaseTypes(): Promise<Array<TypeDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get(Endpoints.Eugyintezes.GetCaseTypes)
				.then((response) => resolve(response.data.map((item: any) => new TypeDto(item))))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description Ügyek lekérdezése
	 * @param isLezartakIs - Ha [true], akkor a lezárt ügyek is visszaadódnak
	 */
	public getCases(isLezartakIs?: boolean): Promise<Array<CaseDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get(Endpoints.Eugyintezes.GetCases, {
				params: {
					isLezartakIs,
				},
			})
				.then((response) => resolve(response.data.map((item: any) => new CaseDto(item))))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description Gyermek adatok lekérdezése
	 */
	public getChildData(): Promise<ChildDto> {
		return new Promise((resolve, reject) => {
			this.instance.get(Endpoints.Eugyintezes.GetChildData)
				.then((response) => resolve(new ChildDto(response.data)))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description Osztályfőnökök lekérdezése
	 */
	public getClassMasters(): Promise<Array<EmployeeDetailsDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get(Endpoints.Eugyintezes.GetClassMasters)
				.then((response) => resolve(response.data.map((item: any) => new EmployeeDetailsDto(item))))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description Jelenlegi intézmény adatainak lekérdezése
	 */
	public getCurrentInstitutionDetails(): Promise<CurrentInstitutionDetailsDto> {
		return new Promise((resolve, reject) => {
			this.instance.get(Endpoints.Eugyintezes.GetCurrentInstitutionDetails)
				.then((response) => resolve(new CurrentInstitutionDetailsDto(response.data)))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description Jelenlegi intézmény moduljainak lekérdezése
	 */
	public getCurrentInstitutionModules(): Promise<Array<string>> {
		return new Promise((resolve, reject) => {
			this.instance.get(Endpoints.Eugyintezes.GetCurrentInstitutionModules)
				.then((response) => resolve(response.data))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description Igazgatóság tagjainak lekérdezése
	 */
	public getDirectors(): Promise<Array<EmployeeDetailsDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get(Endpoints.Eugyintezes.GetDirectors)
				.then((response) => resolve(response.data.map((item: any) => new EmployeeDetailsDto(item))))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description Üzenet lekérdezése
	 * @param azonosito - Az üzenet azonosítója
	 */
	public getMessage(azonosito: number | string): Promise<MailboxItemDto> {
		return new Promise((resolve, reject) => {
			this.instance.get(Endpoints.Eugyintezes.GetMessage(azonosito))
				.then((response) => resolve(new MailboxItemDto(response.data)))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description Üzenetkorlátok lekérdezése
	 */
	public getMessageLimitations(): Promise<MessageLimitationsDto> {
		return new Promise((resolve, reject) => {
			this.instance.get(Endpoints.Eugyintezes.GetMessageLimitations)
				.then((response) => resolve(new MessageLimitationsDto(response.data)))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description Üzenetek lekérdezése
	 */
	public getMessages(): Promise<Array<MailboxItemDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get(Endpoints.Eugyintezes.GetMessages)
				.then((response) => resolve(response.data.map((item: any) => new MailboxItemDto(item))))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description Aláíró lekérdezése
	 * @param kerelemAzonosito - A kérelem azonosítója
	 * @param kretaAzonosito - Aláíró Kréta azonosítója
	 */
	public getSigner(kerelemAzonosito: number | string, kretaAzonosito: number | string): Promise<SignerDto> {
		return new Promise((resolve, reject) => {
			this.instance.get(Endpoints.Eugyintezes.GetSigner(kerelemAzonosito, kretaAzonosito))
				.then((response) => resolve(new SignerDto(response.data)))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description Státusz lekérdezése
	 */
	public getStatus(): Promise<StatusDto> {
		return new Promise((resolve, reject) => {
			this.instance.get(Endpoints.Eugyintezes.GetStatus)
				.then((response) => resolve(new StatusDto(response.data)))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description Címezhető SZMK képviselők lekérdezése
	 */
	public getSzmk(): Promise<Array<GuardianDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get(Endpoints.Eugyintezes.GetSzmk)
				.then((response) => resolve(response.data.map((item: any) => new GuardianDto(item))))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description Tanárok lekérdezése
	 */
	public getTeachers(): Promise<Array<EmployeeDetailsDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get(Endpoints.Eugyintezes.GetTeachers)
				.then((response) => resolve(response.data.map((item: any) => new EmployeeDetailsDto(item))))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description TMGI igazolás típusok lekérdezése
	 */
	public getTmgiCaseTypes(): Promise<Array<TypeDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get(Endpoints.Eugyintezes.GetTmgiCaseTypes)
				.then((response) => resolve(response.data.map((item: any) => new TypeDto(item))))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description Olvasatlan üzenetek számának lekérdezése
	 */
	public getUnreadMessagesCount(): Promise<number> {
		return new Promise((resolve, reject) => {
			this.instance.get(Endpoints.Eugyintezes.GetUnreadMessagesCount)
				.then((response) => resolve(response.data))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description Üzenet olvasása
	 * @param body
	 */
	public readMessage(body: ReadMessageRequestFields): Promise<any> {
		return new Promise((resolve, reject) => {
			this.instance.post(Endpoints.Eugyintezes.ReadMessage, new ReadMessageRequestDto(body).json)
				.then((response) => resolve(response.data))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description Üzenet küldése
	 * @param body
	 */
	public sendMessage(body: MessageFields): Promise<any> {
		return new Promise((resolve, reject) => {
			this.instance.post(Endpoints.Eugyintezes.SendMessage, new MessageDto(body).json)
				.then((response) => resolve(response.data))
				.catch((e) => reject(e.response?.data));
		});
	}

	/**
	 * @description Üzenetek kukába küldése
	 * @param body
	 */
	public sendMessageToBin(body: SendMessageToBinRequestFields): Promise<any> {
		return new Promise((resolve, reject) => {
			this.instance.post(Endpoints.Eugyintezes.SendMessageToBin, new SendMessageToBinRequestDto(body).json)
				.then((response) => resolve(response.data))
				.catch((e) => reject(e.response?.data));
		});
	}

	public get accessToken(): string {
		return this._access_token;
	}
}
