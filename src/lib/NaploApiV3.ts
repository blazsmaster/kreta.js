import axios, { AxiosInstance, AxiosProxyConfig } from 'axios';
import { API, Endpoints } from '../api';
import EvaluationModeDto, { EvaluationModeFields } from '../models/NaploApi/EvaluationModeDto';
import qs from '../utils/qs';
import HomeworkGetDto, { HomeworkGetFields } from '../models/NaploApi/HomeworkGetDto';
import HomeworkPostDto, { HomeworkPostFields } from '../models/NaploApi/HomeworkPostDto';
import HomeworkPutDto, { HomeworkPutFields } from '../models/NaploApi/HomeworkPutDto';
import JustificationDto, { JustificationFields } from '../models/NaploApi/JustificationDto';
import JustificationPostDto, { JustificationPostFields } from '../models/NaploApi/JustificationPostDto';
import SchoolGuardDto, { SchoolGuardFields } from '../models/NaploApi/SchoolGuardDto';
import StudentNotesDto, { StudentNotesFields } from '../models/NaploApi/StudentNotesDto';
import { DateFilter, TimeTableDateFilter } from '../types';
import TimetableElementDto, { TimetableElementFields } from '../models/NaploApi/TimetableElementDto';
import TimetableWeekDto, { TimetableWeekFields } from '../models/NaploApi/TimetableWeekDto';
import { LessonLoggingRequestFields } from '../models/NaploApi/LessonLoggingRequestDto';
import StudentPresenceDto, { StudentPresenceFields } from '../models/NaploApi/StudentPresenceDto';
import AnnouncedTestDto, { AnnouncedTestFields } from '../models/NaploApi/AnnouncedTestDto';
import AnnouncedTestRequestDto, { AnnouncedTestRequestFields } from '../models/NaploApi/AnnouncedTestRequestDto';
import StudentEvaluationDto, { StudentEvaluationFields } from '../models/NaploApi/StudentEvaluationDto';
import SentenceBankItemDto, { SentenceBankItemFields } from '../models/NaploApi/SentenceBankItemDto';
import StudentDto, { StudentFields } from '../models/NaploApi/StudentDto';
import ClassGroupStudentDto, { ClassGroupStudentFields } from '../models/NaploApi/ClassGroupStudentDto';
import ClassGroupDto, { ClassGroupFields } from '../models/NaploApi/ClassGroupDto';
import EvaluationDto, { EvaluationFields } from '../models/NaploApi/EvaluationDto';
import EvaluationUpdateRequestDto, { EvaluationUpdateRequestFields } from '../models/NaploApi/EvaluationUpdateRequestDto';
import TeacherProfileDto, { TeacherProfileFields } from '../models/NaploApi/TeacherProfileDto';
import TeacherSettingsDto, { TeacherSettingsFields } from '../models/NaploApi/TeacherSettingsDto';
import TeacherSettingsRequestDto, { TeacherSettingsRequestFields } from '../models/NaploApi/TeacherSettingsRequestDto';
import SubjectDivisionDto, { SubjectDivisionFields } from '../models/NaploApi/SubjectDivisionDto';
import SyllabusItemDto from '../models/NaploApi/SyllabusItemDto';
import { KretaError } from '../utils/ErrorHandler';

export interface NaploApiV3Options {
	/**
	 * @description A bejelentkezés után kapott hozzáférési token
	 */
	accessToken: string;
	/**
	 * @description Az intézmény egyedi azonosítója
	 */
	instituteCode: string;
}

export class NaploApiV3 {
	private readonly _accessToken: string;
	private readonly _instituteCode: string;

	private readonly instance: AxiosInstance;

	constructor(options: NaploApiV3Options) {
		this._accessToken = options.accessToken;
		this._instituteCode = options.instituteCode;

		this.instance = axios.create({
			baseURL: API.Naplo.Host(this._instituteCode) + API.Naplo.Path,
			headers: {
				Authorization: `Bearer ${this._accessToken}`,
				'User-Agent': 'hu.ekreta.teacher/1.0.5/Android/0/0',
			},
		});
	}

	/**
	 * @description Az értékelés módjainak lekérdezése
	 * @param enumTipus - Az értékelés módjának típusa
	 */
	public getEvaluationMode(enumTipus: string): Promise<Array<EvaluationModeDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<EvaluationModeFields>>(Endpoints.Naplo.GetEvaluationMode, {
				params: {
					enumTipus,
				},
			})
				.then((r) => resolve(r.data.map(item => new EvaluationModeDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * Házi feladat lekérdezése
	 * @param uid - A házi feladat egyedi azonosítója
	 */
	public getHomework(uid: string | number): Promise<HomeworkGetDto> {
		return new Promise((resolve, reject) => {
			this.instance.get<HomeworkGetFields>(Endpoints.Naplo.GetHomework(uid))
				.then((r) => resolve(new HomeworkGetDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Házi feladat rögzítése
	 * @param body
	 */
	public postHomework(body: HomeworkPostFields): Promise<number> {
		return new Promise((resolve, reject) => {
			this.instance.post<number>(Endpoints.Naplo.PostHomework, new HomeworkPostDto(body).json)
				.then((r) => resolve(r.data))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Házi feladat módosítása
	 * @param uid - A házi feladat egyedi azonosítója
	 * @param body
	 */
	public putHomework(uid: string | number, body: HomeworkPutFields): Promise<void> {
		return new Promise((resolve, reject) => {
			this.instance.put(Endpoints.Naplo.PutHomework(uid), new HomeworkPutDto(body).json)
				.then(() => resolve())
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Házi feladat törlése
	 * @param uid - A házi feladat egyedi azonosítója
	 */
	public deleteHomework(uid: number | string): Promise<void> {
		return new Promise((resolve, reject) => {
			this.instance.delete(Endpoints.Naplo.DeleteHomework(uid))
				.then(() => resolve())
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Házi feladat csatolmány törlése
	 * @param uid - A házi feladat csatolmány egyedi azonosítója
	 */
	public deleteHomeworkAttachment(uid: number | string): Promise<void> {
		return new Promise((resolve, reject) => {
			this.instance.delete(Endpoints.Naplo.DeleteHomeworkAttachment(uid))
				.then(() => resolve())
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Igazolás lekérdezése
	 * @param tanuloId - A tanuló egyedi azonosítója
	 */
	public getJustification(tanuloId: number | string): Promise<JustificationDto> {
		return new Promise((resolve, reject) => {
			this.instance.get<JustificationFields>(Endpoints.Naplo.GetJustification, {
				params: {
					tanuloId,
				},
			})
				.then((r) => resolve(new JustificationDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Igazolás rögzítése
	 * @param body
	 */
	public postJustification(body: JustificationPostFields): Promise<void> {
		return new Promise((resolve, reject) => {
			this.instance.post(Endpoints.Naplo.PostJustification, new JustificationPostDto(body).json)
				.then(() => resolve())
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Igazolás törlése
	 * @param uid - Az igazolás egyedi azonosítója
	 */
	public deleteJustification(uid: string): Promise<void> {
		return new Promise((resolve, reject) => {
			this.instance.delete(Endpoints.Naplo.DeleteJustification(uid))
				.then(() => resolve())
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Iskolaőrök lekérdezése
	 */
	public getSchoolGuard(): Promise<Array<SchoolGuardDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<SchoolGuardFields>>(Endpoints.Naplo.GetSchoolGuard)
				.then((r) => resolve(r.data.map(item => new SchoolGuardDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Naplózott feljegyzések lekérdezése
	 */
	public getNotes(): Promise<Array<StudentNotesDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<StudentNotesFields>>(Endpoints.Naplo.GetNotes)
				.then((r) => resolve(r.data.map(item => new StudentNotesDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Órarend lekérdezése
	 */
	public getTimetable(df?: DateFilter): Promise<Array<TimetableElementDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<TimetableElementFields>>(Endpoints.Naplo.GetTimetable, {
				params: {
					datumTol: df?.datumTol ? new Date(df.datumTol).toISOString().split('T')[0] :
						new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0],
					datumIg: df?.datumIg ? new Date(df.datumIg).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
				},
			})
				.then((r) => resolve(r.data.map(item => new TimetableElementDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Órarend elem entitás lekérdezése
	 * @param orarendElemUid - Az órarend elem egyedi azonosítója
	 */
	public getTimetableElement(orarendElemUid: string): Promise<TimetableElementDto> {
		return new Promise((resolve, reject) => {
			this.instance.get<TimetableElementFields>(Endpoints.Naplo.GetTimetableElement, {
				params: {
					orarendElemUid,
				},
			})
				.then((r) => resolve(new TimetableElementDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Órarend hetek lekérdezése
	 */
	public getTimetableWeeks(df: TimeTableDateFilter): Promise<Array<TimetableWeekDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<TimetableWeekFields>>(Endpoints.Naplo.GetTimetableWeeks + qs({
				orarendElemKezdoNapDatuma: new Date(df.orarendElemKezdoNapDatuma).toISOString().split('T')[0],
				orarendElemVegNapDatuma: new Date(df.orarendElemVegNapDatuma).toISOString().split('T')[0],
			}))
				.then((r) => resolve(r.data.map(item => new TimetableWeekDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});

	}

	/**
	 * @description Óra naplózása
	 * @param body
	 */
	public postLogging(body: LessonLoggingRequestFields): Promise<string> {
		return new Promise((resolve, reject) => {
			this.instance.post<string>(Endpoints.Naplo.PostLogging, body)
				.then((r) => resolve(r.data))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Óra naplózásának törlése
	 * @param orarendElemUid - Az órarend elem egyedi azonosítója
	 */
	public deleteLogging(orarendElemUid: string): Promise<TimetableElementDto> {
		return new Promise((resolve, reject) => {
			this.instance.delete<TimetableElementFields>(Endpoints.Naplo.DeleteLogging, {
				params: {
					orarendElemUid,
				},
			})
				.then((r) => resolve(new TimetableElementDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Tanulók jelenlétének lekérdezése
	 * @param orarendElemUid - Az órarend elem egyedi azonosítója
	 */
	public getStudentPresence(orarendElemUid: string): Promise<Array<StudentPresenceDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<StudentPresenceFields>>(Endpoints.Naplo.GetStudentPresence, {
				params: {
					orarendElemUid,
				},
			})
				.then((r) => resolve(r.data.map(item => new StudentPresenceDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Bejelentett számonkérések lekérdezése
	 * @param osztalyCsoportId - Az osztálycsoport egyedi azonosítója
	 * @param datum - A számonkérés dátuma
	 */
	public getAnnouncedTests(osztalyCsoportId: number | string, datum?: Date | string | number): Promise<Array<AnnouncedTestDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<AnnouncedTestFields>>(Endpoints.Naplo.GetAnnouncedTests, {
				params: {
					osztalyCsoportId,
					datum: datum ? new Date(datum).toISOString().split('T')[0] : '',
				},
			})
				.then((r) => resolve(r.data.map(item => new AnnouncedTestDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Bejelentett számonkérés lekérdezése
	 * @param uid - A bejelentett számonkérés egyedi azonosítója
	 */
	public getAnnouncedTest(uid: number | string): Promise<AnnouncedTestDto> {
		return new Promise((resolve, reject) => {
			this.instance.get<AnnouncedTestFields>(Endpoints.Naplo.GetAnnouncedTest(uid))
				.then((r) => resolve(new AnnouncedTestDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Bejelentett számonkérés törlése
	 * @param uid - A bejelentett számonkérés egyedi azonosítója
	 */
	public deleteAnnouncedTest(uid: number | string): Promise<void> {
		return new Promise((resolve, reject) => {
			this.instance.delete(Endpoints.Naplo.DeleteAnnouncedTest(uid))
				.then(() => resolve())
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Bejelentett számonkérés rögzítése
	 * @param body
	 */
	public postAnnouncedTest(body: AnnouncedTestRequestFields): Promise<AnnouncedTestDto> {
		return new Promise((resolve, reject) => {
			this.instance.post<AnnouncedTestFields>(Endpoints.Naplo.PostAnnouncedTest, new AnnouncedTestRequestDto(body).json)
				.then((r) => resolve(new AnnouncedTestDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Tanulói értékelések lekérdezése
	 * @param tantargyId - A tantárgy egyedi azonosítója
	 * @param osztalyCsoportId - Az osztálycsoport egyedi azonosítója
	 * @param ops
	 */
	public getStudentEvaluations(tantargyId: number | string, osztalyCsoportId: number | string, ops?: {
		datum?: Date | string | number,
		tanuloId?: number | string
	}): Promise<Array<StudentEvaluationDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<StudentEvaluationFields>>(Endpoints.Naplo.GetStudentEvaluations, {
				params: {
					tantargyId,
					osztalyCsoportId,
					datum: ops?.datum ? new Date(ops.datum).toISOString().split('T')[0] : '',
					tanuloId: ops?.tanuloId || '',
				},
			})
				.then((r) => resolve(r.data.map(item => new StudentEvaluationDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Tanulói értékelések rögzítése
	 * @param body
	 */
	public postClassGroupEvaluations(body: Array<StudentEvaluationFields>): Promise<Array<StudentEvaluationDto>> {
		return new Promise((resolve, reject) => {
			this.instance.post<Array<StudentEvaluationFields>>(Endpoints.Naplo.PostClassGroupEvaluations, body.map((item) => new StudentEvaluationDto(item).json))
				.then((r) => resolve(r.data.map(item => new StudentEvaluationDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Mondatbank lekérdezése
	 * @param tantargyId - A tantárgy egyedi azonosítója
	 * @param osztalyCsoportId - Az osztálycsoport egyedi azonosítója
	 */
	public getSentenceBankItems(tantargyId: number | string, osztalyCsoportId: number | string): Promise<Array<SentenceBankItemDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<SentenceBankItemFields>>(Endpoints.Naplo.GetSentenceBankItems, {
				params: {
					tantargyId,
					osztalyCsoportId,
				},
			})
				.then((r) => resolve(r.data.map(item => new SentenceBankItemDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Tanulók lekérdezése
	 * @param osztalyCsoportId - Az osztálycsoport egyedi azonosítója
	 * @param datum - A dátum
	 */
	public getStudents(osztalyCsoportId: number | string, datum?: Date | string | number): Promise<Array<StudentDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<StudentFields>>(Endpoints.Naplo.GetStudents, {
				params: {
					osztalyCsoportId,
					datum: datum ? new Date(datum).toISOString().split('T')[0] : '',
				},
			})
				.then((r) => resolve(r.data.map(item => new StudentDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Tanuló lekérdezése
	 * @param uid - A tanuló egyedi azonosítója
	 */
	public getStudent(uid: number | string): Promise<ClassGroupStudentDto> {
		return new Promise((resolve, reject) => {
			this.instance.get<ClassGroupStudentFields>(Endpoints.Naplo.GetStudent(uid))
				.then((r) => resolve(new ClassGroupStudentDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Osztálycsoportok lekérdezése
	 */
	public getClassGroups(): Promise<Array<ClassGroupDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<ClassGroupFields>>(Endpoints.Naplo.GetClassGroups)
				.then((r) => resolve(r.data.map(item => new ClassGroupDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Értékelések lekérdezése
	 * @param tanuloId - A tanuló egyedi azonosítója
	 * @param tantargyId - A tantárgy egyedi azonosítója
	 * @param osztalyCsoportId - Az osztálycsoport egyedi azonosítója
	 */
	public getEvaluations(tanuloId: number | string, tantargyId: number | string, osztalyCsoportId: number | string): Promise<Array<EvaluationDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<EvaluationFields>>(Endpoints.Naplo.GetEvaluations, {
				params: {
					tanuloId,
					tantargyId,
					osztalyCsoportId,
				},
			})
				.then((r) => resolve(r.data.map(item => new EvaluationDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Értékelés frissítése
	 * @param uid - Az értékelés egyedi azonosítója
	 * @param body
	 */
	public updateEvaluation(uid: number | string, body: EvaluationUpdateRequestFields): Promise<EvaluationDto> {
		return new Promise((resolve, reject) => {
			this.instance.put<EvaluationFields>(Endpoints.Naplo.UpdateEvaluation(uid), new EvaluationUpdateRequestDto(body).json)
				.then((r) => resolve(new EvaluationDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Értékelés törlése
	 * @param uid - Az értékelés egyedi azonosítója
	 */
	public deleteEvaluation(uid: number | string): Promise<void> {
		return new Promise((resolve, reject) => {
			this.instance.delete(Endpoints.Naplo.DeleteEvaluation(uid))
				.then(() => resolve())
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Tanár profiljának lekérdezése
	 */
	public getProfile(): Promise<TeacherProfileDto> {
		return new Promise((resolve, reject) => {
			this.instance.get<TeacherProfileFields>(Endpoints.Naplo.GetProfile)
				.then((r) => resolve(new TeacherProfileDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Tanár beállításainak lekérdezése
	 */
	public getSettings(): Promise<TeacherSettingsDto> {
		return new Promise((resolve, reject) => {
			this.instance.get<TeacherSettingsFields>(Endpoints.Naplo.GetSettings)
				.then((r) => resolve(new TeacherSettingsDto(r.data)))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Tanár beállításainak frissítése
	 * @param body
	 */
	public postSettings(body: TeacherSettingsRequestFields): Promise<void> {
		return new Promise((resolve, reject) => {
			this.instance.post(Endpoints.Naplo.PostSettings, new TeacherSettingsRequestDto(body).json)
				.then(() => resolve())
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Tantárgyfelosztás lekérdezése
	 */
	public getSubjectDivision(): Promise<Array<SubjectDivisionDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<SubjectDivisionFields>>(Endpoints.Naplo.GetSubjectDivision)
				.then((r) => resolve(r.data.map(item => new SubjectDivisionDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Tanmenetek lekérdezése
	 * @param tantargyId - A tantárgy egyedi azonosítója
	 * @param osztalyCsoportId - Az osztálycsoport egyedi azonosítója
	 * @param tanarUid - A tanár egyedi azonosítója
	 */
	public getSyllabus(tantargyId: number | string, osztalyCsoportId: number | string, tanarUid: string): Promise<Array<SyllabusItemDto>> {
		return new Promise((resolve, reject) => {
			this.instance.get<Array<SyllabusItemDto>>(Endpoints.Naplo.GetSyllabus, {
				params: {
					tantargyId,
					osztalyCsoportId,
					tanarUid,
				},
			})
				.then((r) => resolve(r.data.map(item => new SyllabusItemDto(item))))
				.catch((e) => reject(new KretaError(e).body));
		});
	}

	/**
	 * @description Hozzáférési token
	 */
	public get accessToken(): string {
		return this._accessToken;
	}

	/**
	 * @description Intézmény kód
	 */
	public get instituteCode(): string {
		return this._instituteCode;
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
