import axios, { AxiosError, AxiosInstance } from 'axios';
import { API, Endpoints } from '../api';
import qs from '../utils/qs';
import { DateFilter, TimeTableDateFilter } from '../types';
import AnnouncedTestDto from '../models/MobileApi/AnnouncedTestDto';
import StudentDto from '../models/MobileApi/StudentDto';
import ClassAverageDto from '../models/MobileApi/ClassAverageDto';
import ClassMasterDto from '../models/MobileApi/ClassMasterDto';
import EvaluationDto from '../models/MobileApi/EvaluationDto';
import GroupDto from '../models/MobileApi/GroupDto';
import Guardian4TDto from '../models/MobileApi/Guardian4TDto';
import HomeworkDto from '../models/MobileApi/HomeworkDto';
import LessonDto from '../models/MobileApi/LessonDto';
import KretaExceptionError from '../models/KretaExceptionError';
import NoteDto from '../models/MobileApi/NoteDto';
import NoticeBoardItemDto from '../models/MobileApi/NoticeBoardItemDto';
import OmissionDto from '../models/MobileApi/OmissionDto';
import SchoolYearCalendarEntryDto from '../models/MobileApi/SchoolYearCalendarEntryDto';
import SubjectAverageDto from '../models/MobileApi/SubjectAverageDto';
import TimeTableWeekDto from '../models/MobileApi/TimeTableWeekDto';
import ConsultingHourDto from '../models/MobileApi/ConsultingHourDto';
import ConsultingHourListDto from '../models/MobileApi/ConsultingHourListDto';
import LepEventDto from '../models/MobileApi/LepEventDto';
import TeszekRegistrationDto from '../models/MobileApi/TeszekRegistrationDto';
import BankAccountNumberPostDto, { BankAccountNumberPostFields } from '../models/MobileApi/BankAccountNumberPostDto';
import Guardian4TPostDto, { Guardian4TPostFields } from '../models/MobileApi/Guardian4TPostDto';
import LepEventGuardianPermissionPostDto, {
	LepEventGuardianPermissionPostFields,
} from '../models/MobileApi/LepEventGuardianPermissionPostDto';
import DailyNotificationSummaryDto from '../models/MobileApi/DailyNotificationSummaryDto';
import InstitutionDto from '../models/MobileApi/InstitutionDto';

export interface MobileApiV3Fields {
	/**
	 * @description A bejelentkezés után kapott hozzáférési token
	 */
	accessToken: string;
	/**
	 * @description Az intézmény egyedi azonosítója
	 */
	instituteCode: string;
}

export class MobileApiV3 {
	private readonly _access_token: string;
	private readonly _instituteCode: string;

	private readonly instance: AxiosInstance;

	constructor(fields: MobileApiV3Fields) {
		this._access_token = fields.accessToken;
		this._instituteCode = fields.instituteCode;

		this.instance = axios.create({
			baseURL: API.Mobile.Host(this._instituteCode) + API.Mobile.Path,
			headers: {
				Authorization: `Bearer ${this._access_token}`,
				apiKey: API.Mobile.Key,
				// 'User-Agent': 'hu.ekreta.student/1.0.5/Android/0/0',
			},
		});
	}

	/**
	 * @description Tanuló bankszámlaszámának törlése
	 */
	public deleteBankAccountNumber(): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.delete(Endpoints.Mobile.DeleteBankAccountNumber);
				resolve(response.data);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Jelentkezett fogadóóra időpont lemondás
	 * @param uid A fogadóóra egyedi azonosítója
	 */
	public deleteReservation(uid: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.delete(Endpoints.Mobile.DeleteReservation(uid));
				resolve(response.data);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Csatolmány lekérdezése
	 * @param uid A csatolmány egyedi azonosítója
	 */
	public downloadAttachment(uid: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.DownloadAttachment(uid));
				resolve(response.data);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Bejelentett számonkérések lekérdezése
	 */
	public getAnnouncedTests(df?: DateFilter): Promise<Array<AnnouncedTestDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetAnnouncedTests + qs({
					datumTol: df?.datumTol ? new Date(df.datumTol).toISOString().split('T')[0] : '',
					datumIg: df?.datumIg ? new Date(df.datumIg).toISOString().split('T')[0] : '',
				}));

				const announcedTests: Array<AnnouncedTestDto> = [];
				for (const test of response.data) {
					announcedTests.push(new AnnouncedTestDto(test));
				}

				resolve(announcedTests);
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Bejelentett számonkérés lekérdezése
	 * @param uid A bejelentett számonkérés egyedi azonosítója
	 */
	public getAnnouncedTest(uid: string): Promise<AnnouncedTestDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetAnnouncedTest(uid));
				resolve(new AnnouncedTestDto(response.data));
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Bejelentett számonkérés lekérdezése uid lista alapján
	 * @param uids A bejelentett számonkérések egyedi azonosítói
	 */
	public getAnnouncedTestsByUids(uids: Array<string>): Promise<Array<AnnouncedTestDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetAnnouncedTests + qs({
					Uids: uidFilter(uids),
				}));

				const announcedTests: Array<AnnouncedTestDto> = [];
				for (const test of response.data) {
					announcedTests.push(new AnnouncedTestDto(test));
				}

				resolve(announcedTests);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Tanuló összes tanult tantárgyának átlaga és osztályátlaga
	 * @param oktatasiNevelesiFeladatUid Az oktatási-nevelési feladat egyedi azonosítója
	 * @param tantargyUid A tantárgy egyedi azonosítója
	 */
	public getClassAverage(oktatasiNevelesiFeladatUid: string, tantargyUid?: string): Promise<Array<ClassAverageDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetClassAverage + qs({
					oktatasiNevelesiFeladatUid,
					tantargyUid: tantargyUid || '',
				}));

				const classAverage: Array<ClassAverageDto> = [];
				for (const average of response.data) {
					classAverage.push(new ClassAverageDto(average));
				}

				resolve(classAverage);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Osztályfőnökök lekérése
	 * @param uids Az osztályfőnök(ök) egyedi azonosítói
	 */
	public getClassMaster(uids: string | Array<string>): Promise<Array<ClassMasterDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetClassMaster + qs({
					Uids: Array.isArray(uids) ? uidFilter(uids) : uids,
				}));

				const classMasters: Array<ClassMasterDto> = [];
				for (const master of response.data) {
					classMasters.push(new ClassMasterDto(master));
				}

				resolve(classMasters);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Fogadóóra lekérdezése gondviselők számára
	 * @param uid A fogadóóra egyedi azonosítója
	 */
	public getConsultingHour(uid: string): Promise<ConsultingHourDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetConsultingHour(uid));
				resolve(new ConsultingHourDto(response.data));
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Fogadóórák időpontjainak lekérdezése gondviselők számára
	 */
	public getConsultingHours(df?: DateFilter): Promise<Array<ConsultingHourListDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetConsultingHours + qs({
					datumTol: df?.datumTol ? new Date(df.datumTol).toISOString().split('T')[0] : '',
					datumIg: df?.datumIg ? new Date(df.datumIg).toISOString().split('T')[0] : '',
				}));

				const consultingHours: Array<ConsultingHourListDto> = [];
				for (const hour of response.data) {
					consultingHours.push(new ConsultingHourListDto(hour));
				}

				resolve(consultingHours);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description A gondviselőhöz tartozó tanulónak van-e már kiosztott eszköze
	 */
	public getDeviceGivenState(): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetDeviceGivenState);
				return resolve(response.data);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Tanuló értékelései
	 */
	public getEvaluations(df: DateFilter): Promise<Array<EvaluationDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetEvaluations + qs({
					datumTol: df?.datumTol ? new Date(df.datumTol).toISOString().split('T')[0] : '',
					datumIg: df?.datumIg ? new Date(df.datumIg).toISOString().split('T')[0] : '',
				}));

				const evaluations: Array<EvaluationDto> = [];
				for (const evaluation of response.data) {
					evaluations.push(new EvaluationDto(evaluation));
				}

				resolve(evaluations);
			} catch (e) {
				return reject(e);
			}
		});
	}

	/**
	 * @description Tanuló egy értékelése
	 * @param uid Az értékelés egyedi azonosítója
	 */
	public getEvaluation(uid: string): Promise<EvaluationDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetEvaluation(uid));
				resolve(new EvaluationDto(response.data));
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Tanuló bizonyítvány értékelései
	 */
	public getCertificateEvaluations(): Promise<Array<EvaluationDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetCertificateEvaluations);

				const evaluations: Array<EvaluationDto> = [];
				for (const evaluation of response.data) {
					evaluations.push(new EvaluationDto(evaluation));
				}

				resolve(evaluations);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Tanuló évközi + egyéb értékelései
	 */
	public getNonCertificateEvaluations(): Promise<Array<EvaluationDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetNonCertificateEvaluations);

				const evaluations: Array<EvaluationDto> = [];
				for (const evaluation of response.data) {
					evaluations.push(new EvaluationDto(evaluation));
				}

				resolve(evaluations);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Osztályok és csoportok, amikbe a tanuló valaha be volt sorolva az aktuális tanévben
	 */
	public getGroups(): Promise<Array<GroupDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetGroups);

				const groups: Array<GroupDto> = [];
				for (const group of response.data) {
					groups.push(new GroupDto(group));
				}

				resolve(groups);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Gondviselő 4T adatainak lekérdezése
	 */
	public getGuardian4T(): Promise<Guardian4TDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetGuardian4T);
				return resolve(new Guardian4TDto(response.data));
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Házi feladat entitás lekérdezése
	 * @param uid A házi feladat egyedi azonosítója
	 */
	public getHomework(uid: string): Promise<HomeworkDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetHomework(uid));
				return resolve(new HomeworkDto(response.data));
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Házi feladatok lekérdezése határidő alapján
	 */
	public getHomeworks(df: DateFilter): Promise<Array<HomeworkDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetHomeworks + qs({
					datumTol: df?.datumTol ? new Date(df.datumTol).toISOString().split('T')[0] :
						new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0],
					datumIg: df?.datumIg ? new Date(df.datumIg).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
				}));

				const homeworks: Array<HomeworkDto> = [];
				for (const homework of response.data) {
					homeworks.push(new HomeworkDto(homework));
				}

				resolve(homeworks);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Lázár Ervin Program előadások lekérdezése
	 */
	public getLEPEvents(): Promise<Array<LepEventDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetLEPEvents);

				const lepEvents: Array<LepEventDto> = [];
				for (const event of response.data) {
					lepEvents.push(new LepEventDto(event));
				}

				resolve(lepEvents);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Órarend elem entitás lekérdezése
	 */
	public getLesson(orarendElemUid: string): Promise<LessonDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetLesson + qs({ orarendElemUid }));
				return resolve(new LessonDto(response.data));
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Visszaadja a tanuló órarendi elemeit egy megadott időszakra (tanév rendje eseményeket is)
	 */
	public getLessons(df: DateFilter): Promise<Array<LessonDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetLessons + qs({
					datumTol: df?.datumTol ? new Date(df.datumTol).toISOString().split('T')[0] :
						new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0],
					datumIg: df?.datumIg ? new Date(df.datumIg).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
				}));

				const lessons: Array<LessonDto> = [];
				for (const lesson of response.data) {
					lessons.push(new LessonDto(lesson));
				}

				resolve(lessons);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Tanuló tanítási órán tanár által generált feljegyzései
	 */
	public getNotes(df: DateFilter): Promise<Array<NoteDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetNotes + qs({
					datumTol: df?.datumTol ? new Date(df.datumTol).toISOString().split('T')[0] : '',
					datumIg: df?.datumIg ? new Date(df.datumIg).toISOString().split('T')[0] : '',
				}));

				const notes: Array<NoteDto> = [];
				for (const note of response.data) {
					notes.push(new NoteDto(note));
				}

				resolve(notes);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Tanuló tanítási órán tanár által generált feljegyzése
	 * @param uid A feljegyzés egyedi azonosítója
	 */
	public getNote(uid: string): Promise<NoteDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetNote(uid));
				resolve(new NoteDto(response.data));
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Tanuló számára megjelenő admin és tanár által rögzített faliújság elemek
	 */
	public getNoticeBoardItems(): Promise<Array<NoticeBoardItemDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetNoticeBoardItems);

				const boardItems: Array<NoticeBoardItemDto> = [];
				for (const item of response.data) {
					boardItems.push(new NoticeBoardItemDto(item));
				}

				return resolve(boardItems);
			} catch (e) {
				return reject(e);
			}
		});
	}

	/**
	 * @description Tanuló mulasztásai
	 */
	public getOmissions(df?: DateFilter): Promise<Array<OmissionDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetOmissions + qs({
					datumTol: df?.datumTol ? new Date(df.datumTol).toISOString().split('T')[0] : '',
					datumIg: df?.datumIg ? new Date(df.datumIg).toISOString().split('T')[0] : '',
				}));

				const omissions: Array<OmissionDto> = [];
				for (const omission of response.data) {
					omissions.push(new OmissionDto(omission));
				}

				resolve(omissions);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Tanuló mulasztás entitás lekérdezése
	 * @param uid A mulasztás egyedi azonosítója
	 */
	public getOmission(uid: string): Promise<OmissionDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetOmission(uid));
				resolve(new OmissionDto(response.data));
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Gondviselő regisztrált-e már
	 */
	public getRegistrationState(): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetRegistrationState);
				resolve(response.data);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Tanulóra vonatkozó tanév rendje elemek
	 */
	public getSchoolYearCalendar(): Promise<Array<SchoolYearCalendarEntryDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetSchoolYearCalendar);

				const calendarItems: Array<SchoolYearCalendarEntryDto> = [];
				for (const entry of response.data) {
					calendarItems.push(new SchoolYearCalendarEntryDto(entry));
				}

				resolve(calendarItems);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Tanulóval, gondviselőivel és intézményével kapcsolatos információk és elérhetőségek
	 */
	public getStudent(): Promise<StudentDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetStudent);
				return resolve(new StudentDto(response.data));
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Tanuló összes tanult tantárgyának átlaga
	 * @param oktatasiNevelesiFeladatUid Az oktatási-nevelési feladat egyedi azonosítója
	 */
	public getSubjectAverage(oktatasiNevelesiFeladatUid: string): Promise<Array<SubjectAverageDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetSubjectAverage + qs({
					oktatasiNevelesiFeladatUid,
				}));

				const subjectAverages: Array<SubjectAverageDto> = [];
				for (const average of response.data) {
					subjectAverages.push(new SubjectAverageDto(average));
				}

				resolve(subjectAverages);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	public getTeszekRegistration(): Promise<TeszekRegistrationDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetTeszekRegistration);
				resolve(new TeszekRegistrationDto(response.data));
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Órarendhez tartozó hetirendi elemek
	 */
	public getTimeTableWeeks(df: TimeTableDateFilter): Promise<Array<TimeTableWeekDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetTimeTableWeeks + qs({
					orarendElemKezdoNapDatuma: new Date(df.orarendElemKezdoNapDatuma).toISOString().split('T')[0],
					orarendElemVegNapDatuma: new Date(df.orarendElemVegNapDatuma).toISOString().split('T')[0],
				}));

				const timeTableWeeks: Array<TimeTableWeekDto> = [];
				for (const week of response.data) {
					timeTableWeeks.push(new TimeTableWeekDto(week));
				}

				resolve(timeTableWeeks);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Saját intézmény adatai
	 */
	public getInstitution(): Promise<InstitutionDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetInstitution);
				resolve(new InstitutionDto(response.data));
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Napi értesítés összefoglaló lekérdezése
	 */
	public getDailyNotificationSummary(): Promise<DailyNotificationSummaryDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetDailyNotificationSummary);
				resolve(new DailyNotificationSummaryDto(response.data));
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description A gondviselő "Törvényes képviselő" tulajdonságának lekérdezése
	 */
	public getGuardianIsLegalRepresentative(): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetGuardianIsLegalRepresentative);
				resolve(response.data);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Bankszámlaszám rögzítése a tanulóhoz
	 */
	public postBankAccountNumber(body: BankAccountNumberPostFields): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.post(Endpoints.Mobile.PostBankAccountNumber, new BankAccountNumberPostDto(body).json);
				resolve(response.data);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Elérhetőség rögzítése tanulóhoz vagy gondviselőhöz
	 * @param email Email cím
	 * @param phoneNumber Telefonszám
	 */
	public postContact(email: string, phoneNumber: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.post(Endpoints.Mobile.PostContact, qs({ email, telefonszam: phoneNumber }));
				resolve(response.data);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Covid fertőzöttség bejelentése
	 */
	public postCovidReport(): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.post(Endpoints.Mobile.PostCovidReport);
				resolve(response.data);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Gondviselő fogadóóra-időpont jelentkezés
	 * @param uid A fogadóóra egyedi azonosítója
	 */
	public postReservation(uid: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.post(Endpoints.Mobile.PostReservation(uid));
				resolve(response.data);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Gondviselő eszköz igényléshez szükséges adatainak elküldése
	 */
	public postTeszekRegistration(body: Guardian4TPostFields): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.post(Endpoints.Mobile.PostTeszekRegistration, new Guardian4TPostDto(body).json);
				resolve(response.data);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Gondviselő 4T adatainak módosítása
	 */
	public updateGuardian4T(body: Guardian4TPostFields): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.put(Endpoints.Mobile.UpdateGuardian4T, new Guardian4TPostDto(body).json);
				resolve(response.data);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	/**
	 * @description Lázár Ervin Program előadás engedélyezése, elutasítása vagy függőbe tétele
	 */
	public updateLepEventPermission(body: LepEventGuardianPermissionPostFields): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.post(Endpoints.Mobile.UpdateLepEventPermission, new LepEventGuardianPermissionPostDto(body).json);
				resolve(response.data);
			} catch (e) {
				return reject(new KretaExceptionError((e as AxiosError).response?.data));
			}
		});
	}

	public get access_token() {
		return this._access_token;
	}

	public get instituteCode() {
		return this._instituteCode;
	}
}
