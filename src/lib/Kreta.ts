import axios, { AxiosResponse } from 'axios';
import moment from 'moment';
import {
	ApiVersion, AnnouncedTest,
	ClassAverage, ClassMaster,
	ConfigurationDescriptor,
	Evaluation,
	Group,
	Homework,
	Institute, Institution, KretaOptions, LepEvent,
	Lesson,
	Note,
	NoticeBoardItem,
	Omission, PreBuiltAuthenticationToken, RequestAnnouncedTestsOptions, RequestClassAveragesOptions,
	RequestDateRangeOptions,
	RequestDateRangeRequiredOptions,
	RequestHomeWorkOptions,
	RequestSubjectAveragesOptions, SchoolYearCalendarEntry,
	Student,
	SubjectAverage, TimeTableWeek, BaseAPIUrls, Endpoints
} from '../types';
import { Authentication } from './Authentication';
import dynamicValue from '../utils/dynamicValue';
import Administration from './Administration';

export default class Kreta {
	private readonly username: string;
	private readonly password: string;
	private readonly institute_code: string;
	private readonly version: ApiVersion;
	private authenticate: Authentication;
	public Administration: Administration;

	constructor(options: KretaOptions) {
		this.username = options.username;
		this.password = options.password;
		this.institute_code = options.institute_code;
		this.version = options.version;
		this.authenticate = new Authentication({ username: this.username, password: this.password, institute_code: this.institute_code });
		this.Administration = new Administration({ username: this.username, password: this.password, institute_code: this.institute_code });
	}

	private buildEllenorzoApiURL(endpointWithSlash: Endpoints, params?: { [key: string]: any }): string {
		const urlParams: string = params ? '?' + new URLSearchParams(params).toString() : '';
		return dynamicValue(BaseAPIUrls.INSTITUTE, { institute_code: this.institute_code }).toString() + '/ellenorzo/' + this.version.toUpperCase() + endpointWithSlash + urlParams;
	}

	public getInstituteList(api_key: string): Promise<Institute[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const config_descriptor: AxiosResponse<ConfigurationDescriptor> = await axios.get('https://kretamobile.blob.core.windows.net/configuration/ConfigurationDescriptor.json');

			await axios.get(config_descriptor.data.GlobalMobileApiUrlPROD + '/api/v3/Institute', {
				headers: {
					'User-Agent': 'hu.ekreta.student/1.0.5/Android/0/0',
					apiKey: api_key
				}
			}).then((r: AxiosResponse<Institute[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getStudent(): Promise<Student> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildEllenorzoApiURL(Endpoints.Tanulo), {
				headers: {
					'Authorization': token,
					'User-Agent': 'hu.ekreta.student/1.0.5/Android/0/0'
				}
			}).then((r: AxiosResponse<Student>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getEvaluations(options?: RequestDateRangeOptions): Promise<Evaluation[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			const ops: { datumTol?: string; datumIg?: string } = {};

			if (options?.dateFrom)
				ops.datumTol = moment(options.dateFrom).format('YYYY-MM-DD');
			if (options?.dateTo)
				ops.datumIg = moment(options.dateTo).format('YYYY-MM-DD');

			await axios.get(this.buildEllenorzoApiURL(Endpoints.Ertekelesek, ops), {
				headers: {
					'Authorization': token,
					'User-Agent': 'hu.ekreta.student/1.0.5/Android/0/0'
				}
			}).then((r: AxiosResponse<Evaluation[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getNotes(options?: RequestDateRangeOptions): Promise<Note[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			const ops: { datumTol?: string; datumIg?: string } = {};

			if (options?.dateFrom)
				ops.datumTol = moment(options.dateFrom).format('YYYY-MM-DD');
			if (options?.dateTo)
				ops.datumIg = moment(options.dateTo).format('YYYY-MM-DD');

			await axios.get(this.buildEllenorzoApiURL(Endpoints.Feljegyzesek, ops), {
				headers: {
					'Authorization': token,
					'User-Agent': 'hu.ekreta.student/1.0.5/Android/0/0'
				}
			}).then((r: AxiosResponse<Note[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getAnnouncedTests(options?: RequestAnnouncedTestsOptions): Promise<AnnouncedTest[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			const ops: { datumTol?: string; datumIg?: string, Uids?: string } = {};

			if (options?.dateFrom)
				ops.datumTol = moment(options.dateFrom).format('YYYY-MM-DD');
			if (options?.dateTo)
				ops.datumIg = moment(options.dateTo).format('YYYY-MM-DD');
			if (options?.uids)
				ops.Uids = options.uids.join(';');

			await axios.get(this.buildEllenorzoApiURL(Endpoints.Szamonkeresek, ops), {
				headers: {
					'Authorization': token,
					'User-Agent': 'hu.ekreta.student/1.0.5/Android/0/0'
				}
			}).then((r: AxiosResponse<AnnouncedTest[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getHomeworks(options: RequestHomeWorkOptions): Promise<Homework[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			const ops: { datumTol: string; datumIg?: string } = { datumTol: moment(options.dateFrom).format('YYYY-MM-DD') };

			if (options?.dateTo)
				ops.datumIg = moment(options.dateTo).format('YYYY-MM-DD');

			await axios.get(this.buildEllenorzoApiURL(Endpoints.HaziFeladatok, ops), {
				headers: {
					'Authorization': token,
					'User-Agent': 'hu.ekreta.student/1.0.5/Android/0/0'
				}
			}).then((r: AxiosResponse<Homework[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getHomework(uid: string | number): Promise<Homework> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildEllenorzoApiURL(Endpoints.HaziFeladatok) + '/' + uid.toString(), {
				headers: {
					'Authorization': token,
					'User-Agent': 'hu.ekreta.student/1.0.5/Android/0/0'
				}
			}).then((r: AxiosResponse<Homework>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getOmissions(options?: RequestDateRangeOptions): Promise<Omission[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			const ops: { datumTol?: string; datumIg?: string } = {};

			if (options?.dateFrom)
				ops.datumTol = moment(options.dateFrom).format('YYYY-MM-DD');
			if (options?.dateTo)
				ops.datumIg = moment(options.dateTo).format('YYYY-MM-DD');

			await axios.get(this.buildEllenorzoApiURL(Endpoints.Mulasztasok, ops), {
				headers: {
					'Authorization': token,
					'User-Agent': 'hu.ekreta.student/1.0.5/Android/0/0'
				}
			}).then((r: AxiosResponse<Omission[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getGroups(): Promise<Group[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildEllenorzoApiURL(Endpoints.OsztalyCsoportok), {
				headers: {
					'Authorization': token,
					'User-Agent': 'hu.ekreta.student/1.0.5/Android/0/0'
				}
			}).then((r: AxiosResponse<Group[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getSubjectAverages(options?: RequestSubjectAveragesOptions): Promise<SubjectAverage[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			const onfUid: string = options?.oktatasiNevelesiFeladatUid || await this.getGroups().then((groups: Group[]) => groups[0].OktatasNevelesiFeladat.Uid);

			await axios.get(this.buildEllenorzoApiURL(Endpoints.TantargyiAtlagok, { oktatasiNevelesiFeladatUid: onfUid }), {
				headers: {
					'Authorization': token,
					'User-Agent': 'hu.ekreta.student/1.0.5/Android/0/0'
				}
			}).then((r: AxiosResponse<SubjectAverage[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getLessons(options: RequestDateRangeRequiredOptions): Promise<Lesson[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			const ops: { datumTol: string; datumIg: string } = {
				datumTol: moment(options.dateFrom).format('YYYY-MM-DD'),
				datumIg: moment(options.dateTo).format('YYYY-MM-DD')
			};

			await axios.get(this.buildEllenorzoApiURL(Endpoints.OrarendElemek, ops), {
				headers: {
					'Authorization': token,
					'User-Agent': 'hu.ekreta.student/1.0.5/Android/0/0'
				}
			}).then((r: AxiosResponse<Lesson[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getLesson(uid: string | number): Promise<Lesson> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildEllenorzoApiURL(Endpoints.OrarendElem, { orarendElemUid: uid.toString() }), {
				headers: {
					'Authorization': token,
					'User-Agent': 'hu.ekreta.student/1.0.5/Android/0/0'
				}
			}).then((r: AxiosResponse<Lesson>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getNoticeBoardItems(): Promise<NoticeBoardItem[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildEllenorzoApiURL(Endpoints.FaliujsagElemek), {
				headers: {
					'Authorization': token,
					'User-Agent': 'hu.ekreta.student/1.0.5/Android/0/0'
				}
			}).then((r: AxiosResponse<NoticeBoardItem[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getClassAverage(options?: RequestClassAveragesOptions): Promise<ClassAverage[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			const ops: {
				oktatasiNevelesiFeladatUid: string;
				tantargyUid?: string;
			} = { oktatasiNevelesiFeladatUid: options?.oktatasiNevelesiFeladatUid || await this.getGroups().then((groups: Group[]) => groups[0].OktatasNevelesiFeladat.Uid) };

			if (options?.subjectUid)
				ops.tantargyUid = options.subjectUid;

			await axios.get(this.buildEllenorzoApiURL(Endpoints.OsztalyCsoportAtlag, ops), {
				headers: {
					'Authorization': token,
					'User-Agent': 'hu.ekreta.student/1.0.5/Android/0/0'
				}
			}).then((r: AxiosResponse<ClassAverage[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getInstitute(): Promise<Institution> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildEllenorzoApiURL(Endpoints.Intezmenyek), {
				headers: {
					'Authorization': token,
					'User-Agent': 'hu.ekreta.student/1.0.5/Android/0/0'
				}
			}).then((r: AxiosResponse<Institution>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getClassMasters(uids: string[] | number[]): Promise<ClassMaster[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildEllenorzoApiURL(Endpoints.Osztalyfonokok, { Uids: uids.map((u: string | number) => u.toString()).join(';') }), {
				headers: {
					'Authorization': token,
					'User-Agent': 'hu.ekreta.student/1.0.5/Android/0/0'
				}
			}).then((r: AxiosResponse<ClassMaster[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getTimeTableWeeks(options: RequestDateRangeRequiredOptions): Promise<TimeTableWeek[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildEllenorzoApiURL(Endpoints.OrarendHetek, {
				orarendElemKezdoNapDatuma: moment(options.dateFrom).format('YYYY-MM-DD'),
				orarendElemVegNapDatuma: moment(options.dateTo).format('YYYY-MM-DD')
			}), {
				headers: {
					'Authorization': token,
					'User-Agent': 'hu.ekreta.student/1.0.5/Android/0/0'
				}
			}).then((r: AxiosResponse<TimeTableWeek[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getLepEvents(): Promise<LepEvent[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildEllenorzoApiURL(Endpoints.Eloadasok), {
				headers: {
					'Authorization': token,
					'User-Agent': 'hu.ekreta.student/1.0.5/Android/0/0'
				}
			}).then((r: AxiosResponse<LepEvent[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getSchoolYearCalendar(): Promise<SchoolYearCalendarEntry[]> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildEllenorzoApiURL(Endpoints.TanevNaptar), {
				headers: {
					'Authorization': token,
					'User-Agent': 'hu.ekreta.student/1.0.5/Android/0/0'
				}
			}).then((r: AxiosResponse<SchoolYearCalendarEntry[]>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}

	public getDeviceGivenState(): Promise<boolean> {
		return new Promise(async (resolve, reject): Promise<void> => {
			const { token }: PreBuiltAuthenticationToken = await this.authenticate.getAccessToken();

			await axios.get(this.buildEllenorzoApiURL(Endpoints.EszkozAllapot), {
				headers: {
					'Authorization': token,
					'User-Agent': 'hu.ekreta.student/1.0.5/Android/0/0'
				}
			}).then((r: AxiosResponse<boolean>) => resolve(r.data)).catch((e: Error) => reject(e));
		});
	}
}
