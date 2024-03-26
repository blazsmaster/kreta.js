import axios, { AxiosError, AxiosInstance } from 'axios';
import { API, Endpoints } from '../api';
import EvaluationModeDto from '../models/NaploApi/EvaluationModeDto';
import qs from '../utils/qs';
import HomeworkGetDto from '../models/NaploApi/HomeworkGetDto';
import HomeworkPostDto, { HomeworkPostFields } from '../models/NaploApi/HomeworkPostDto';
import HomeworkPutDto, { HomeworkPutFields } from '../models/NaploApi/HomeworkPutDto';
import JustificationDto from '../models/NaploApi/JustificationDto';
import JustificationPostDto, { JustificationPostFields } from '../models/NaploApi/JustificationPostDto';
import SchoolGuardDto from '../models/NaploApi/SchoolGuardDto';
import StudentNotesDto from '../models/NaploApi/StudentNotesDto';
import { DateFilter, TimeTableDateFilter } from '../types';
import TimetableElementDto from '../models/NaploApi/TimetableElementDto';
import TimetableWeekDto from '../models/NaploApi/TimetableWeekDto';
import { LessonLoggingRequestFields } from '../models/NaploApi/LessonLoggingRequestDto';
import StudentPresenceDto from '../models/NaploApi/StudentPresenceDto';
import AnnouncedTestDto from '../models/NaploApi/AnnouncedTestDto';
import AnnouncedTestRequestDto, { AnnouncedTestRequestFields } from '../models/NaploApi/AnnouncedTestRequestDto';
import StudentEvaluationDto, { StudentEvaluationFields } from '../models/NaploApi/StudentEvaluationDto';
import SentenceBankItemDto from '../models/NaploApi/SentenceBankItemDto';
import StudentDto from '../models/NaploApi/StudentDto';
import ClassGroupStudentDto from '../models/NaploApi/ClassGroupStudentDto';
import ClassGroupDto from '../models/NaploApi/ClassGroupDto';
import EvaluationDto from '../models/NaploApi/EvaluationDto';
import EvaluationUpdateRequestDto, { EvaluationUpdateRequestFields } from '../models/NaploApi/EvaluationUpdateRequestDto';
import TeacherProfileDto from '../models/NaploApi/TeacherProfileDto';
import TeacherSettingsDto from '../models/NaploApi/TeacherSettingsDto';
import TeacherSettingsRequestDto, { TeacherSettingsRequestFields } from '../models/NaploApi/TeacherSettingsRequestDto';
import SubjectDivisionDto from '../models/NaploApi/SubjectDivisionDto';
import SyllabusItemDto from '../models/NaploApi/SyllabusItemDto';

export interface NaploApiV3Fields {
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
	private readonly _access_token: string;
	private readonly _instituteCode: string;

	private readonly instance: AxiosInstance;

	constructor(fields: NaploApiV3Fields) {
		this._access_token = fields.accessToken;
		this._instituteCode = fields.instituteCode;

		this.instance = axios.create({
			baseURL: API.Naplo.Host(this._instituteCode) + API.Naplo.Path,
			headers: {
				Authorization: `Bearer ${this._access_token}`,
				'User-Agent': 'hu.ekreta.teacher/1.0.5/Android/0/0',
			},
		});
	}

	/**
	 * @description Az értékelés módjainak lekérdezése
	 * @param enumTipus - Az értékelés módjának típusa
	 */
	public getEvaluationMode(enumTipus: string): Promise<Array<EvaluationModeDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Naplo.GetEvaluationMode + qs({
					enumTipus,
				}));
				resolve(response.data);
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * Házi feladat lekérdezése
	 * @param uid - A házi feladat egyedi azonosítója
	 */
	public getHomework(uid: string): Promise<HomeworkGetDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Naplo.GetHomework(uid));
				resolve(new HomeworkGetDto(response.data));
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Házi feladat rögzítése
	 * @param body
	 */
	public postHomework(body: HomeworkPostFields): Promise<number> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.post(Endpoints.Naplo.PostHomework, new HomeworkPostDto(body).json);
				resolve(response.data);
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Házi feladat módosítása
	 * @param uid - A házi feladat egyedi azonosítója
	 * @param body
	 */
	public putHomework(uid: string, body: HomeworkPutFields): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.put(Endpoints.Naplo.PutHomework(uid), new HomeworkPutDto(body).json);
				resolve(response.data);
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Házi feladat törlése
	 * @param uid - A házi feladat egyedi azonosítója
	 */
	public deleteHomework(uid: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.delete(Endpoints.Naplo.DeleteHomework(uid));
				resolve(response.data);
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});

	}

	/**
	 * @description Házi feladat csatolmány törlése
	 * @param uid - A házi feladat csatolmány egyedi azonosítója
	 */
	public deleteHomeworkAttachment(uid: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.delete(Endpoints.Naplo.DeleteHomeworkAttachment(uid));
				resolve(response.data);
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Igazolás lekérdezése
	 * @param tanuloId - A tanuló egyedi azonosítója
	 */
	public getJustification(tanuloId: string): Promise<JustificationDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Naplo.GetJustification + qs({
					tanuloId,
				}));
				resolve(new JustificationDto(response.data));
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Igazolás rögzítése
	 * @param body
	 */
	public postJustification(body: JustificationPostFields): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.post(Endpoints.Naplo.PostJustification, new JustificationPostDto(body).json);
				resolve(response.data);
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Igazolás törlése
	 * @param uid - Az igazolás egyedi azonosítója
	 */
	public deleteJustification(uid: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.delete(Endpoints.Naplo.DeleteJustification(uid));
				resolve(response.data);
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});

	}

	/**
	 * @description Iskolaőrök lekérdezése
	 */
	public getSchoolGuard(): Promise<Array<SchoolGuardDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Naplo.GetSchoolGuard);

				const schoolGuards: Array<SchoolGuardDto> = [];
				for (const schoolGuard of response.data) {
					schoolGuards.push(new SchoolGuardDto(schoolGuard));
				}

				resolve(schoolGuards);
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});

	}

	/**
	 * @description Naplózott feljegyzések lekérdezése
	 */
	public getNotes(): Promise<Array<StudentNotesDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Naplo.GetNotes);

				const notes: Array<StudentNotesDto> = [];
				for (const note of response.data) {
					notes.push(new StudentNotesDto(note));
				}

				resolve(notes);
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Órarend lekérdezése
	 */
	public getTimetable(df: DateFilter): Promise<Array<TimetableElementDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Naplo.GetTimetable + qs({
					datumTol: df?.datumTol ? new Date(df.datumTol).toISOString().split('T')[0] : '',
					datumIg: df?.datumIg ? new Date(df.datumIg).toISOString().split('T')[0] : '',
				}));

				console.log('Response:', response); // Log the response

				const timetable: Array<TimetableElementDto> = [];
				for (const element of response.data) {
					timetable.push(new TimetableElementDto(element));
				}

				console.log('Timetable:', timetable); // Log the timetable

				resolve(timetable);
			} catch (e) {
				console.error('Error:', e); // Log the error
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Órarend elem entitás lekérdezése
	 * @param orarendElemUid - Az órarend elem egyedi azonosítója
	 */
	public getTimetableElement(orarendElemUid: string): Promise<TimetableElementDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Naplo.GetTimetableElement + qs({
					orarendElemUid,
				}));
				resolve(new TimetableElementDto(response.data));
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Órarend hetek lekérdezése
	 */
	public getTimetableWeeks(df: TimeTableDateFilter): Promise<Array<TimetableWeekDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Naplo.GetTimetableWeeks + qs({
					orarendElemKezdoNapDatuma: new Date(df.orarendElemKezdoNapDatuma).toISOString().split('T')[0],
					orarendElemVegNapDatuma: new Date(df.orarendElemVegNapDatuma).toISOString().split('T')[0],
				}));

				const timetableWeeks: Array<TimetableWeekDto> = [];
				for (const week of response.data) {
					timetableWeeks.push(new TimetableWeekDto(week));
				}

				resolve(timetableWeeks);
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});

	}

	/**
	 * @description Óra naplózása
	 * @param body
	 */
	public postLogging(body: LessonLoggingRequestFields): Promise<string> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.post(Endpoints.Naplo.PostLogging, body);
				resolve(response.data);
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Óra naplózásának törlése
	 * @param orarendElemUid - Az órarend elem egyedi azonosítója
	 */
	public deleteLogging(orarendElemUid: string): Promise<TimetableElementDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.delete(Endpoints.Naplo.DeleteLogging + qs({
					orarendElemUid,
				}));
				resolve(response.data);
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Tanulók jelenlétének lekérdezése
	 * @param orarendElemUid - Az órarend elem egyedi azonosítója
	 */
	public getStudentPresence(orarendElemUid: string): Promise<Array<StudentPresenceDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Naplo.GetStudentPresence + qs({
					orarendElemUid,
				}));

				const studentPresence: Array<StudentPresenceDto> = [];
				for (const presence of response.data) {
					studentPresence.push(new StudentPresenceDto(presence));
				}

				resolve(studentPresence);
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Bejelentett számonkérések lekérdezése
	 * @param osztalyCsoportId - Az osztálycsoport egyedi azonosítója
	 * @param datum - A számonkérés dátuma
	 */
	public getAnnouncedTests(osztalyCsoportId: number, datum?: Date): Promise<Array<AnnouncedTestDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Naplo.GetAnnouncedTests + qs({
					osztalyCsoportId,
					datum: datum ? new Date(datum).toISOString().split('T')[0] : '',
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
	 * @param uid - A bejelentett számonkérés egyedi azonosítója
	 */
	public getAnnouncedTest(uid: number): Promise<AnnouncedTestDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Naplo.GetAnnouncedTest(uid));
				resolve(new AnnouncedTestDto(response.data));
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Bejelentett számonkérés törlése
	 * @param uid - A bejelentett számonkérés egyedi azonosítója
	 */
	public deleteAnnouncedTest(uid: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			try {
				await this.instance.delete(Endpoints.Naplo.DeleteAnnouncedTest(uid));
				resolve(void 0);
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Bejelentett számonkérés rögzítése
	 * @param body
	 */
	public postAnnouncedTest(body: AnnouncedTestRequestFields): Promise<AnnouncedTestDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.post(Endpoints.Naplo.PostAnnouncedTest, new AnnouncedTestRequestDto(body).json);
				resolve(new AnnouncedTestDto(response.data));
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Tanulói értékelések lekérdezése
	 * @param tantargyId - A tantárgy egyedi azonosítója
	 * @param osztalyCsoportId - Az osztálycsoport egyedi azonosítója
	 * @param ops
	 */
	public getStudentEvaluations(tantargyId: number, osztalyCsoportId: number, ops?: {
		datum?: Date,
		tanuloId?: number
	}): Promise<Array<StudentEvaluationDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Naplo.GetStudentEvaluations + qs({
					tantargyId,
					osztalyCsoportId,
					datum: ops?.datum ? new Date(ops.datum).toISOString().split('T')[0] : '',
					tanuloId: ops?.tanuloId ?? '',
				}));

				const studentEvaluations: Array<StudentEvaluationDto> = [];
				for (const evaluation of response.data) {
					studentEvaluations.push(new StudentEvaluationDto(evaluation));
				}

				resolve(studentEvaluations);
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Tanulói értékelések rögzítése
	 * @param body
	 */
	public postClassGroupEvaluations(body: Array<StudentEvaluationFields>): Promise<Array<StudentEvaluationDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.post(Endpoints.Naplo.PostClassGroupEvaluations, body.map(efields => new StudentEvaluationDto(efields).json));

				const studentEvaluations: Array<StudentEvaluationDto> = [];
				for (const evaluation of response.data) {
					studentEvaluations.push(new StudentEvaluationDto(evaluation));
				}

				resolve(studentEvaluations);
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Mondatbank lekérdezése
	 * @param tantargyId - A tantárgy egyedi azonosítója
	 * @param osztalyCsoportId - Az osztálycsoport egyedi azonosítója
	 */
	public getSentenceBankItems(tantargyId: number, osztalyCsoportId: number): Promise<Array<SentenceBankItemDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Naplo.GetSentenceBankItems + qs({
					tantargyId,
					osztalyCsoportId,
				}));

				const sentenceBankItems: Array<SentenceBankItemDto> = [];
				for (const item of response.data) {
					sentenceBankItems.push(new SentenceBankItemDto(item));
				}

				resolve(sentenceBankItems);
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Tanulók lekérdezése
	 * @param osztalyCsoportId - Az osztálycsoport egyedi azonosítója
	 * @param datum - A dátum
	 */
	public getStudents(osztalyCsoportId: number, datum?: Date): Promise<Array<StudentDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Naplo.GetStudents + qs({
					osztalyCsoportId,
					datum: datum ? new Date(datum).toISOString().split('T')[0] : '',
				}));

				const students: Array<StudentDto> = [];
				for (const student of response.data) {
					students.push(new StudentDto(student));
				}

				resolve(students);
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Tanuló lekérdezése
	 * @param uid - A tanuló egyedi azonosítója
	 */
	public getStudent(uid: number): Promise<ClassGroupStudentDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Naplo.GetStudent(uid));
				resolve(new ClassGroupStudentDto(response.data));
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Osztálycsoportok lekérdezése
	 */
	public getClassGroups(): Promise<Array<ClassGroupDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Naplo.GetClassGroups);

				const classGroups: Array<ClassGroupDto> = [];
				for (const classGroup of response.data) {
					classGroups.push(new ClassGroupDto(classGroup));
				}

				resolve(classGroups);
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Értékelések lekérdezése
	 * @param tanuloId - A tanuló egyedi azonosítója
	 * @param tantargyId - A tantárgy egyedi azonosítója
	 * @param osztalyCsoportId - Az osztálycsoport egyedi azonosítója
	 */
	public getEvaluations(tanuloId: number, tantargyId: number, osztalyCsoportId: number): Promise<Array<EvaluationDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Naplo.GetEvaluations + qs({
					tanuloId,
					tantargyId,
					osztalyCsoportId,
				}));

				const evaluations: Array<EvaluationDto> = [];
				for (const evaluation of response.data) {
					evaluations.push(new EvaluationDto(evaluation));
				}

				resolve(evaluations);
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Értékelés frissítése
	 * @param uid - Az értékelés egyedi azonosítója
	 * @param body
	 */
	public updateEvaluation(uid: number, body: EvaluationUpdateRequestFields): Promise<EvaluationDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.put(Endpoints.Naplo.UpdateEvaluation(uid), new EvaluationUpdateRequestDto(body).json);
				resolve(new EvaluationDto(response.data));
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Értékelés törlése
	 * @param uid - Az értékelés egyedi azonosítója
	 */
	public deleteEvaluation(uid: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			try {
				await this.instance.delete(Endpoints.Naplo.DeleteEvaluation(uid));
				resolve(void 0);
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Tanár profiljának lekérdezése
	 */
	public getProfile(): Promise<TeacherProfileDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Naplo.GetProfile);
				resolve(new TeacherProfileDto(response.data));
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Tanár beállításainak lekérdezése
	 */
	public getSettings(): Promise<TeacherSettingsDto> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Naplo.GetSettings);
				resolve(new TeacherSettingsDto(response.data));
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Tanár beállításainak frissítése
	 * @param body
	 */
	public postSettings(body: TeacherSettingsRequestFields): Promise<void> {
		return new Promise(async (resolve, reject) => {
			try {
				await this.instance.post(Endpoints.Naplo.PostSettings, new TeacherSettingsRequestDto(body).json);
				resolve(void 0);
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Tantárgyfelosztás lekérdezése
	 */
	public getSubjectDivision(): Promise<Array<SubjectDivisionDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Naplo.GetSubjectDivision);

				const subjectDivisions: Array<SubjectDivisionDto> = [];
				for (const division of response.data) {
					subjectDivisions.push(new SubjectDivisionDto(division));
				}

				resolve(subjectDivisions);
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});
	}

	/**
	 * @description Tanmenetek lekérdezése
	 * @param tantargyId - A tantárgy egyedi azonosítója
	 * @param osztalyCsoportId - Az osztálycsoport egyedi azonosítója
	 * @param tanarUid - A tanár egyedi azonosítója
	 */
	public getSyllabus(tantargyId: number, osztalyCsoportId: number, tanarUid: string): Promise<Array<SyllabusItemDto>> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.instance.get(Endpoints.Naplo.GetSyllabus + qs({
					tantargyId,
					osztalyCsoportId,
					tanarUid,
				}));

				const syllabusItems: Array<SyllabusItemDto> = [];
				for (const item of response.data) {
					syllabusItems.push(new SyllabusItemDto(item));
				}

				resolve(syllabusItems);
			} catch (e) {
				return reject((e as AxiosError).response?.data);
			}
		});

	}

	public get access_token(): string {
		return this._access_token;
	}

	public get instituteCode(): string {
		return this._instituteCode;
	}
}
