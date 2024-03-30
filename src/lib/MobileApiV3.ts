import axios, { AxiosInstance, AxiosProxyConfig, AxiosRequestConfig } from 'axios';
import { API, Endpoints } from '../api';
import AnnouncedTestDto, { AnnouncedTestFields } from '../models/MobileApi/AnnouncedTestDto';
import ClassAverageDto, { ClassAverageFields } from '../models/MobileApi/ClassAverageDto';
import ClassMasterDto, { ClassMasterFields } from '../models/MobileApi/ClassMasterDto';
import EvaluationDto, { EvaluationFields } from '../models/MobileApi/EvaluationDto';
import GroupDto, { GroupFields } from '../models/MobileApi/GroupDto';
import Guardian4TDto, { Guardian4TFields } from '../models/MobileApi/Guardian4TDto';
import HomeworkDto, { HomeworkFields } from '../models/MobileApi/HomeworkDto';
import LessonDto, { LessonFields } from '../models/MobileApi/LessonDto';
import NoteDto, { NoteFields } from '../models/MobileApi/NoteDto';
import NoticeBoardItemDto, { NoticeBoardItemFields } from '../models/MobileApi/NoticeBoardItemDto';
import OmissionDto, { OmissionFields } from '../models/MobileApi/OmissionDto';
import SchoolYearCalendarEntryDto, { SchoolYearCalendarEntryFields } from '../models/MobileApi/SchoolYearCalendarEntryDto';
import ConsultingHourDto, { ConsultingHourFields } from '../models/MobileApi/ConsultingHourDto';
import ConsultingHourListDto, { ConsultingHourListFields } from '../models/MobileApi/ConsultingHourListDto';
import LepEventDto, { LepEventFields } from '../models/MobileApi/LepEventDto';
import { KretaError } from '../utils/ErrorHandler';
import { DateFilter, TimeTableDateFilter } from '../types';
import StudentDto, { StudentFields } from '../models/MobileApi/StudentDto';
import SubjectAverageDto, { SubjectAverageFields } from '../models/MobileApi/SubjectAverageDto';
import TeszekRegistrationDto, { TeszekRegistrationFields } from '../models/MobileApi/TeszekRegistrationDto';
import TimeTableWeekDto, { TimeTableWeekFields } from '../models/MobileApi/TimeTableWeekDto';
import InstitutionDto, { InstitutionFields } from '../models/MobileApi/InstitutionDto';
import DailyNotificationSummaryDto, { DailyNotificationSummaryFields } from '../models/MobileApi/DailyNotificationSummaryDto';
import BankAccountNumberPostDto, { BankAccountNumberPostFields } from '../models/MobileApi/BankAccountNumberPostDto';
import Guardian4TPostDto, { Guardian4TPostFields } from '../models/MobileApi/Guardian4TPostDto';
import LepEventGuardianPermissionPostDto, {
	LepEventGuardianPermissionPostFields,
} from '../models/MobileApi/LepEventGuardianPermissionPostDto';

export interface MobileApiV3Options {
	/**
	 * @description A bejelentkezés után kapott hozzáférési token
	 */
	accessToken: string;
	/**
	 * @description Az intézmény egyedi azonosítója
	 */
	instituteCode: string;
	/**
	 * @description A hozzáférési token típusa
	 */
	tokenType?: string;
}

export class MobileApiV3 {
	private readonly _accessToken: string;
	private readonly _instituteCode: string;
	private readonly _token_type?: string;

	private readonly api_key: string = '21ff6c25-d1da-4a68-a811-c881a6057463';
	private readonly default_user_agent: string = 'hu.ekreta.student/1.0.5/Android/0/0';

	private readonly instance: AxiosInstance;

	constructor(options: MobileApiV3Options) {
		this._accessToken = options.accessToken;
		this._instituteCode = options.instituteCode;
		this._token_type = options.tokenType;

		this.instance = axios.create({
			baseURL: API.Mobile.Host(this._instituteCode) + API.Mobile.Path,
			headers: {
				Authorization: (this._token_type ?? 'Bearer') + ' ' + this._accessToken,
				apiKey: this.api_key,
				'User-Agent': this.default_user_agent,
			},
		});
	}

	/**
	 * @description Tanuló bankszámla adatainak törlése
	 */
	public deleteBankAccountNumber(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.instance.delete(Endpoints.Mobile.DeleteBankAccountNumber)
				.then(() => resolve())
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Jelentkezett fogadóóra időpont lemondás
	 * @param uid - A fogadóóra egyedi azonosítója
	 */
	public deleteReservation(uid: string): Promise<void> {
		return new Promise((resolve, reject) => {
			this.instance.delete(Endpoints.Mobile.DeleteReservation(uid))
				.then(() => resolve())
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Csatolmány letöltése
	 * @param uid - A csatolmány egyedi azonosítója
	 */
	public downloadAttachment(uid: string): Promise<Blob> {
		return new Promise((resolve, reject) => {
			this.instance.get<Blob>(Endpoints.Mobile.DownloadAttachment(uid), {
				responseType: 'blob',
			})
				.then((r) => resolve(r.data))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Bejelentett számonkérések lekérdezése
	 */
	public getAnnouncedTests(df?: DateFilter): Promise<Array<AnnouncedTestDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<AnnouncedTestFields>>(Endpoints.Mobile.GetAnnouncedTests, {
				params: {
					datumTol: df?.datumTol ? new Date(df.datumTol).toISOString().split('T')[0] :
						new Date(new Date().setDate(new Date().getDate() - 29)).toISOString().split('T')[0],
					datumIg: df?.datumIg ? new Date(df.datumIg).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
				},
			})
				.then((r) => resolve(r.data.map((item) => new AnnouncedTestDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Bejelentett számonkérés lekérdezése
	 * @param uid - A bejelentett számonkérés egyedi azonosítója
	 */
	public getAnnouncedTest(uid: string): Promise<AnnouncedTestDto> {
		return new Promise((resolve, reject) => {
			this.instance.get<AnnouncedTestFields>(Endpoints.Mobile.GetAnnouncedTest(uid))
				.then((r) => resolve(new AnnouncedTestDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Bejelentett számonkérés(ek) lekérdezése
	 * @param uids - A bejelentett számonkérések egyedi azonosítói
	 */
	public getAnnouncedTestsByUids(uids: string | Array<string>): Promise<Array<AnnouncedTestDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<AnnouncedTestFields>>(Endpoints.Mobile.GetAnnouncedTests, {
				params: {
					Uids: Array.isArray(uids) ? uids.join(';') : uids,
				},
			})
				.then((r) => resolve(r.data.map((item) => new AnnouncedTestDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Tanuló összes tanult tantárgyának átlagának és osztályzatainak lekérdezése
	 * @param oktatasiNevelesiFeladatUid - Az oktatási-nevelési feladat egyedi azonosítója
	 * @param tantargyUid - A tantárgy egyedi azonosítója
	 */
	public getClassAverage(oktatasiNevelesiFeladatUid: string, tantargyUid?: string): Promise<Array<ClassAverageDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<ClassAverageFields>>(Endpoints.Mobile.GetClassAverage, {
				params: {
					oktatasiNevelesiFeladatUid,
					tantargyUid: tantargyUid || '',
				},
			})
				.then((r) => resolve(r.data.map((item) => new ClassAverageDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Osztályfőnökök lekérdezése
	 * @param uids - Az osztályfőnök egyedi azonosítója
	 */
	public getClassMaster(uids: string | Array<string>): Promise<Array<ClassMasterDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<ClassMasterFields>>(Endpoints.Mobile.GetClassMaster, {
				params: {
					Uids: Array.isArray(uids) ? uids.join(';') : uids,
				},
			})
				.then((r) => resolve(r.data.map((item) => new ClassMasterDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Fogadóóra lekérdezése gondviselők számára
	 * @param uid - A fogadóóra egyedi azonosítója
	 */
	public getConsultingHour(uid: string): Promise<ConsultingHourDto> {
		return new Promise((resolve, reject) => {
			this.instance.get<ConsultingHourFields>(Endpoints.Mobile.GetConsultingHour(uid))
				.then((r) => resolve(new ConsultingHourDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Fogadóórák időpontjainak lekérdezése gondviselők számára
	 */
	public getConsultingHours(df?: DateFilter): Promise<Array<ConsultingHourListDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<ConsultingHourListFields>>(Endpoints.Mobile.GetConsultingHours, {
				params: {
					datumTol: df?.datumTol ? new Date(df.datumTol).toISOString().split('T')[0] : '',
					datumIg: df?.datumIg ? new Date(df.datumIg).toISOString().split('T')[0] : '',
				},
			})
				.then((r) => resolve(r.data.map((item) => new ConsultingHourListDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description A gondviselőhöz tartozó tanulónak van-e már kiosztott eszköze
	 */
	public getDeviceGivenState(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.instance.get<boolean>(Endpoints.Mobile.GetDeviceGivenState)
				.then((r) => resolve(r.data))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Tanuló értékeléseinek lekérdezése
	 */
	public getEvaluations(df: DateFilter): Promise<Array<EvaluationDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<EvaluationFields>>(Endpoints.Mobile.GetEvaluations, {
				params: {
					datumTol: df?.datumTol ? new Date(df.datumTol).toISOString().split('T')[0] : '',
					datumIg: df?.datumIg ? new Date(df.datumIg).toISOString().split('T')[0] : '',
				},
			})
				.then((r) => resolve(r.data.map((item) => new EvaluationDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Tanuló egy értékelésének lekérdezése
	 * @param uid - Az értékelés egyedi azonosítója
	 */
	public getEvaluation(uid: string): Promise<EvaluationDto> {
		return new Promise((resolve, reject) => {
			this.instance.get<EvaluationFields>(Endpoints.Mobile.GetEvaluation(uid))
				.then((r) => resolve(new EvaluationDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Tanuló bizonyítvány értékeléseinek lekérdezése
	 */
	public getCertificateEvaluations(): Promise<Array<EvaluationDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<EvaluationFields>>(Endpoints.Mobile.GetCertificateEvaluations)
				.then((r) => resolve(r.data.map((item) => new EvaluationDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Tanuló évközi és egyéb értékeléseinek lekérdezése
	 */
	public getNonCertificateEvaluations(): Promise<Array<EvaluationDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<EvaluationFields>>(Endpoints.Mobile.GetNonCertificateEvaluations)
				.then((r) => resolve(r.data.map((item) => new EvaluationDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Tanulóhoz tartozó csoportok és osztályok lekérdezése
	 */
	public getGroups(): Promise<Array<GroupDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<GroupFields>>(Endpoints.Mobile.GetGroups)
				.then((r) => resolve(r.data.map((item) => new GroupDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Gondviselő adatainak lekérdezése
	 */
	public getGuardian4T(): Promise<Guardian4TDto> {
		return new Promise((resolve, reject) => {
			this.instance.get<Guardian4TFields>(Endpoints.Mobile.GetGuardian4T)
				.then((r) => resolve(new Guardian4TDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Házi feladat entitás lekérdezése
	 * @param uid - A házi feladat egyedi azonosítója
	 */
	public getHomework(uid: string): Promise<HomeworkDto> {
		return new Promise((resolve, reject) => {
			this.instance.get<HomeworkFields>(Endpoints.Mobile.GetHomework(uid))
				.then((r) => resolve(new HomeworkDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Házi feladatok lekérdezése
	 */
	public getHomeworks(df: DateFilter): Promise<Array<HomeworkDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<HomeworkFields>>(Endpoints.Mobile.GetHomeworks, {
				params: {
					datumTol: df?.datumTol ? new Date(df.datumTol).toISOString().split('T')[0] :
						new Date(new Date().setDate(new Date().getDate() - 20)).toISOString().split('T')[0],
					datumIg: df?.datumIg ? new Date(df.datumIg).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
				},
			})
				.then((r) => resolve(r.data.map((item) => new HomeworkDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Lázár Ervin Program előadások lekérdezése
	 */
	public getLEPEvents(): Promise<Array<LepEventDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<LepEventFields>>(Endpoints.Mobile.GetLEPEvents)
				.then((r) => resolve(r.data.map((item) => new LepEventDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Órarend elem entitás lekérdezése
	 */
	public getLesson(orarendElemUid: string): Promise<LessonDto> {
		return new Promise((resolve, reject) => {
			this.instance.get<LessonFields>(Endpoints.Mobile.GetLesson, {
				params: {
					orarendElemUid,
				},
			})
				.then((r) => resolve(new LessonDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Tanuló órarendi elemeinek lekérdezése (tanév rendje eseményeket is)
	 */
	public getLessons(df: DateFilter): Promise<Array<LessonDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<LessonFields>>(Endpoints.Mobile.GetLessons, {
				params: {
					datumTol: df?.datumTol ? new Date(df.datumTol).toISOString().split('T')[0] :
						new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0],
					datumIg: df?.datumIg ? new Date(df.datumIg).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
				},
			})
				.then((r) => resolve(r.data.map((item) => new LessonDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Tanuló tanítási órán tanár által létrehozott feljegyzéseinek lekérdezése
	 */
	public getNotes(df: DateFilter): Promise<Array<NoteDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<NoteFields>>(Endpoints.Mobile.GetNotes, {
				params: {
					datumTol: df?.datumTol ? new Date(df.datumTol).toISOString().split('T')[0] : '',
					datumIg: df?.datumIg ? new Date(df.datumIg).toISOString().split('T')[0] : '',
				},
			})
				.then((r) => resolve(r.data.map((item) => new NoteDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Tanuló tanítási órán tanár által létrehozott feljegyzésének lekérdezése
	 * @param uid - A feljegyzés egyedi azonosítója
	 */
	public getNote(uid: string): Promise<NoteDto> {
		return new Promise((resolve, reject) => {
			this.instance.get<NoteFields>(Endpoints.Mobile.GetNote(uid))
				.then((r) => resolve(new NoteDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Tanuló számára megjelenő admin és tanár által rögzített faliújság elemek lekérdezése
	 */
	public getNoticeBoardItems(): Promise<Array<NoticeBoardItemDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<NoticeBoardItemFields>>(Endpoints.Mobile.GetNoticeBoardItems)
				.then((r) => resolve(r.data.map((item) => new NoticeBoardItemDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Tanuló mulasztásainak lekérdezése
	 */
	public getOmissions(df?: DateFilter): Promise<Array<OmissionDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<OmissionFields>>(Endpoints.Mobile.GetOmissions, {
				params: {
					datumTol: df?.datumTol ? new Date(df.datumTol).toISOString().split('T')[0] : '',
					datumIg: df?.datumIg ? new Date(df.datumIg).toISOString().split('T')[0] : '',
				},
			})
				.then((r) => resolve(r.data.map((item) => new OmissionDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Tanuló mulasztás entitás lekérdezése
	 * @param uid - A mulasztás egyedi azonosítója
	 */
	public getOmission(uid: string): Promise<OmissionDto> {
		return new Promise((resolve, reject) => {
			this.instance.get<OmissionFields>(Endpoints.Mobile.GetOmission(uid))
				.then((r) => resolve(new OmissionDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Gondviselő regisztrált-e már
	 */
	public getRegistrationState(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.instance.get(Endpoints.Mobile.GetRegistrationState)
				.then((r) => resolve(r.data))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Tanulóra vonatkozó tanév rendje elemek lekérdezése
	 */
	public getSchoolYearCalendar(): Promise<Array<SchoolYearCalendarEntryDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<SchoolYearCalendarEntryFields>>(Endpoints.Mobile.GetSchoolYearCalendar)
				.then((r) => resolve(r.data.map((item) => new SchoolYearCalendarEntryDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Tanulóval, gondviselőivel és intézményével kapcsolatos információk és elérhetőségek lekérdezése
	 */
	public getStudent(): Promise<StudentDto> {
		return new Promise((resolve, reject) => {
			this.instance.get<StudentFields>(Endpoints.Mobile.GetStudent)
				.then((r) => resolve(new StudentDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Tanuló összes tanult tantárgyának átlagának lekérdezése
	 * @param oktatasiNevelesiFeladatUid - Az oktatási-nevelési feladat egyedi azonosítója
	 */
	public getSubjectAverage(oktatasiNevelesiFeladatUid: string): Promise<Array<SubjectAverageDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<SubjectAverageFields>>(Endpoints.Mobile.GetSubjectAverage, {
				params: {
					oktatasiNevelesiFeladatUid,
				},
			})
				.then((r) => resolve(r.data.map((item) => new SubjectAverageDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Igényelt gondviselői eszköz lekérdezése
	 */
	public getTeszekRegistration(): Promise<TeszekRegistrationDto> {
		return new Promise((resolve, reject) => {
			this.instance.get<TeszekRegistrationFields>(Endpoints.Mobile.GetTeszekRegistration)
				.then((r) => resolve(new TeszekRegistrationDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Órarendhez tartozó hetirendi elemek lekérdezése
	 */
	public getTimeTableWeeks(df: TimeTableDateFilter): Promise<Array<TimeTableWeekDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<TimeTableWeekFields>>(Endpoints.Mobile.GetTimeTableWeeks, {
				params: {
					orarendElemKezdoNapDatuma: new Date(df.orarendElemKezdoNapDatuma).toISOString().split('T')[0],
					orarendElemVegNapDatuma: new Date(df.orarendElemVegNapDatuma).toISOString().split('T')[0],
				},
			})
				.then((r) => resolve(r.data.map((item) => new TimeTableWeekDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Saját intézmény adatainak lekérdezése
	 */
	public getInstitution(): Promise<InstitutionDto> {
		return new Promise((resolve, reject) => {
			this.instance.get<InstitutionFields>(Endpoints.Mobile.GetInstitution)
				.then((r) => resolve(new InstitutionDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Napi értesítés összefoglaló lekérdezése
	 */
	public getDailyNotificationSummary(): Promise<DailyNotificationSummaryDto> {
		return new Promise((resolve, reject) => {
			this.instance.get<DailyNotificationSummaryFields>(Endpoints.Mobile.GetDailyNotificationSummary)
				.then((r) => resolve(new DailyNotificationSummaryDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description A gondviselő "Törvényes képviselő" tulajdonságának lekérdezése
	 */
	public getGuardianIsLegalRepresentative(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.instance.get<boolean>(Endpoints.Mobile.GetGuardianIsLegalRepresentative)
				.then((r) => resolve(r.data))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Bankszámlaszám rögzítése a tanulóhoz
	 */
	public postBankAccountNumber(body: BankAccountNumberPostFields): Promise<void> {
		return new Promise((resolve, reject) => {
			this.instance.post(Endpoints.Mobile.PostBankAccountNumber, new BankAccountNumberPostDto(body).json)
				.then(() => resolve())
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Elérhetőség rögzítése tanulóhoz vagy gondviselőhöz
	 * @param email - Email cím
	 * @param phoneNumber - Telefonszám
	 */
	public postContact(email: string, phoneNumber: string): Promise<void> {
		return new Promise((resolve, reject) => {
			this.instance.post(Endpoints.Mobile.PostContact, {
				email,
				telefonszam: phoneNumber,
			})
				.then(() => resolve())
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Covid fertőzöttség bejelentése
	 */
	public postCovidReport(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.instance.post(Endpoints.Mobile.PostCovidReport)
				.then(() => resolve())
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Gondviselő fogadóóra-időpont jelentkezés
	 * @param uid - A fogadóóra egyedi azonosítója
	 */
	public postReservation(uid: string): Promise<void> {
		return new Promise((resolve, reject) => {
			this.instance.post(Endpoints.Mobile.PostReservation(uid))
				.then(() => resolve())
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Gondviselő eszköz igényléshez szükséges adatainak elküldése
	 */
	public postTeszekRegistration(body: Guardian4TPostFields): Promise<void> {
		return new Promise((resolve, reject) => {
			this.instance.post(Endpoints.Mobile.PostTeszekRegistration, new Guardian4TPostDto(body).json)
				.then(() => resolve())
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Gondviselő 4T adatainak módosítása
	 */
	public updateGuardian4T(body: Guardian4TPostFields): Promise<void> {
		return new Promise((resolve, reject) => {
			this.instance.put(Endpoints.Mobile.UpdateGuardian4T, new Guardian4TPostDto(body).json)
				.then(() => resolve())
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Lázár Ervin Program előadás engedélyezése, elutasítása vagy függőbe tétele
	 */
	public updateLepEventPermission(body: LepEventGuardianPermissionPostFields): Promise<void> {
		return new Promise((resolve, reject) => {
			this.instance.post(Endpoints.Mobile.UpdateLepEventPermission, new LepEventGuardianPermissionPostDto(body).json)
				.then(() => resolve())
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Hozzáférési token
	 */
	public get accessToken() {
		return this._accessToken;
	}

	/**
	 * @description Intézmény egyedi azonosítója
	 */
	public get instituteCode() {
		return this._instituteCode;
	}

	/**
	 * @description Hozzáférési token típusa
	 */
	public get tokenType() {
		return this._token_type;
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

	/**
	 * @description Egyéni kérés küldése (ha nincs még implementálva a metódus vagy egyedi beállítások vagy paraméterek szükségesek)
	 * @param props
	 */
	public customRequest<R = any>(props: CustomRequestProps): Promise<R> {
		return new Promise((resolve, reject) => {
			switch (props.method) {
				case 'GET':
					this.instance.get<R>(props.path, props.config)
						.then((r) => resolve(r.data))
						.catch((e) => reject(new KretaError(e).body));
					break;
				case 'POST':
					this.instance.post<R>(props.path, props.body, props.config)
						.then((r) => resolve(r.data))
						.catch((e) => reject(new KretaError(e).body));
					break;
				case 'PUT':
					this.instance.put<R>(props.path, props.body, props.config)
						.then((r) => resolve(r.data))
						.catch((e) => reject(new KretaError(e).body));
					break;
				case 'DELETE':
					this.instance.delete<R>(props.path, props.config)
						.then((r) => resolve(r.data))
						.catch((e) => reject(new KretaError(e).body));
					break;
				default:
					throw new Error('Method not supported');
			}
		});
	}
}

interface StrippedAxiosRequestConfig extends Omit<AxiosRequestConfig, 'url' | 'baseUrl' | 'lookup'> {
}

interface CustomRequestProps {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	path: string;
	body?: any;
	config?: StrippedAxiosRequestConfig;
}
