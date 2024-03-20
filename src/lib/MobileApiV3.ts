import axios, { AxiosError, AxiosInstance } from 'axios';
import { API, Endpoints } from '../api';
import qs from '../utils/qs';
import AnnouncedTestDto from '../models/MobileApi/AnnouncedTestDto';
import StudentDto from '../models/MobileApi/StudentDto';
import ClassAverageDto from '../models/MobileApi/ClassAverageDto';
import ClassMasterDto from '../models/MobileApi/ClassMasterDto';
import EvaluationDto from '../models/MobileApi/EvaluationDto';
import GroupDto from '../models/MobileApi/GroupDto';
import Guardian4TDto from '../models/MobileApi/Guardian4TDto';
import HomeworkDto from '../models/MobileApi/HomeworkDto';
import LessonDto from '../models/MobileApi/LessonDto';
import KretaError from '../models/KretaError';
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

export interface MobileApiV3Fields {
	access_token: string;
	instituteCode: string;
}

export interface DateFilter {
	datumTol?: Date | string;
	datumIg?: Date | string;
}

export interface TimeTableDateFilter {
	orarendElemKezdoNapDatuma: Date | string;
	orarendElemVegNapDatuma: Date | string;
}

export class MobileApiV3 {
	private readonly access_token: string;
	private readonly instituteCode: string;

	private readonly instance: AxiosInstance;

	constructor(fields: MobileApiV3Fields) {
		this.access_token = fields.access_token;
		this.instituteCode = fields.instituteCode;

		this.instance = axios.create({
			baseURL: API.Mobile.Host(this.instituteCode) + API.Mobile.Path,
			headers: {
				Authorization: `Bearer ${this.access_token}`,
				apiKey: API.Mobile.Key,
				'User-Agent': 'hu.ekreta.student/1.0.5/Android/0/0',
			},
		});
	}

	public deleteBankAccountNumber(): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.delete(Endpoints.Mobile.DeleteBankAccountNumber);
				resolve(response.data);
			} catch (e) {
				reject(e);
			}
		});
	}

	public deleteReservation(uid: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.delete(Endpoints.Mobile.DeleteReservation(uid));
				resolve(response.data);
			} catch (e) {
				reject(e);
			}
		});

	}

	public downloadAttachment(uid: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.DownloadAttachment(uid));
				resolve(response.data);
			} catch (e) {
				reject(e);
			}
		});
	}

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
				reject(e);
			}
		});
	}

	public getAnnouncedTestsById(Uids: Array<string> | string): Promise<Array<AnnouncedTestDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetAnnouncedTests + qs({
					Uids: Array.isArray(Uids) ? Uids.join(';') : Uids,
				}));

				const announcedTests: Array<AnnouncedTestDto> = [];
				for (const test of response.data) {
					announcedTests.push(new AnnouncedTestDto(test));
				}

				resolve(announcedTests);
			} catch (e) {
				reject(e);
			}
		});
	}

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
				reject((e as AxiosError).response?.data);
			}
		});
	}

	public getClassMaster(Uids: Array<string> | string): Promise<Array<ClassMasterDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetClassMaster + qs({
					Uids: Array.isArray(Uids) ? Uids.join(';') : Uids,
				}));

				const classMasters: Array<ClassMasterDto> = [];
				for (const master of response.data) {
					classMasters.push(new ClassMasterDto(master));
				}

				resolve(classMasters);
			} catch (e) {
				reject((e as AxiosError).response?.data);
			}
		});
	}

	public getConsultingHour(uid: string): Promise<ConsultingHourDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetConsultingHour(uid));
				resolve(new ConsultingHourDto(response.data));
			} catch (e) {
				reject(e);
			}
		});
	}

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
				reject(e);
			}
		});
	}

	public getDeviceGivenState(): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetDeviceGivenState);
				return resolve(response.data);
			} catch (e) {
				return reject(e);
			}
		});
	}

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
				reject(e);
			}
		});
	}

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
				reject(e);
			}
		});
	}

	public getGuardian4T(): Promise<Guardian4TDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetGuardian4T);
				return resolve(new Guardian4TDto(response.data));
			} catch (e) {
				return reject(e);
			}
		});
	}

	public getHomework(id: string): Promise<HomeworkDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetHomework(id));
				return resolve(new HomeworkDto(response.data));
			} catch (e) {
				return reject(e);
			}
		});
	}

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
				return reject(new KretaError((e as AxiosError).response?.data));
			}
		});
	}

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
				reject(e);
			}
		});
	}

	public getLesson(orarendElemUid: string): Promise<LessonDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetLesson + qs({ orarendElemUid }));
				return resolve(new LessonDto(response.data));
			} catch (e) {
				return reject(e);
			}
		});
	}

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
				return reject((e as AxiosError).response?.data);
			}
		});
	}

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
				return reject((e as AxiosError).response?.data);
			}
		});
	}

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
				reject(e);
			}
		});
	}

	public getRegistrationState(): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetRegistrationState);
				resolve(response.data);
			} catch (e) {
				reject(e);
			}
		});
	}

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
				reject(e);
			}
		});
	}

	public getStudent(): Promise<StudentDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetStudent);
				return resolve(new StudentDto(response.data));
			} catch (e) {
				return reject(e);
			}
		});
	}

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
				reject((e as AxiosError).response?.data);
			}
		});

	}

	public getTeszekRegistration(): Promise<TeszekRegistrationDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Mobile.GetTeszekRegistration);
				resolve(new TeszekRegistrationDto(response.data));
			} catch (e) {
				reject(e);
			}
		});
	}

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
				reject((e as AxiosError).response?.data);
			}
		});
	}

	public postBankAccountNumber(body: BankAccountNumberPostFields): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.post(Endpoints.Mobile.PostBankAccountNumber, new BankAccountNumberPostDto(body).json);
				resolve(response.data);
			} catch (e) {
				reject(e);
			}
		});
	}

	public postContact(email: string, phoneNumber: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.post(Endpoints.Mobile.PostContact, qs({ email, telefonszam: phoneNumber }));
				resolve(response.data);
			} catch (e) {
				reject(e);
			}
		});
	}

	public postCovidForm(): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.post(Endpoints.Mobile.PostCovidForm);
				resolve(response.data);
			} catch (e) {
				reject(e);
			}
		});
	}

	public postReservation(uid: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.post(Endpoints.Mobile.PostReservation(uid));
				resolve(response.data);
			} catch (e) {
				reject(e);
			}
		});
	}

	public postTeszekRegistration(body: Guardian4TPostFields): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.post(Endpoints.Mobile.PostTeszekRegistration, new Guardian4TPostDto(body).json);
				resolve(response.data);
			} catch (e) {
				reject(e);
			}
		});
	}

	public updateGuardian4T(body: Guardian4TPostFields): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.put(Endpoints.Mobile.UpdateGuardian4T, new Guardian4TPostDto(body).json);
				resolve(response.data);
			} catch (e) {
				reject(e);
			}
		});
	}

	public updateLepEventPermission(body: LepEventGuardianPermissionPostFields): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.post(Endpoints.Mobile.UpdateLepEventPermission, new LepEventGuardianPermissionPostDto(body).json);
				resolve(response.data);
			} catch (e) {
				reject(e);
			}
		});
	}

	public get _access_token() {
		return this.access_token;
	}

	public get _instituteCode() {
		return this.instituteCode;
	}
}
