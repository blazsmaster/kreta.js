import axios, { AxiosProxyConfig, AxiosResponse } from 'axios';
import moment from 'moment';
import {
	AnnouncedTest,
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
	SchoolYearCalendarEntry,
	Student,
	SubjectAverage, TimeTableWeek, API, Endpoints
} from '../types';
import { Authentication } from './Authentication';
import dynamicValue from '../utils/dynamicValue';
import Administration from './Administration';
import Global from './Global';
import requireCredentials from '../decorators/requireCredentials';
import tryRequest from '../utils/tryRequest';
import validateDate from '../utils/validateDate';
import requireParam from '../decorators/requireParam';

export default class Kreta {
	private readonly username?: string;
	private readonly password?: string;
	private readonly institute_code?: string;
	private authenticate?: Authentication;
	public Administration?: Administration;
	public Global: Global;
	private token?: Promise<string>;

	constructor(options?: KretaOptions) {
		this.username = options?.username || '';
		this.password = options?.password || '';
		this.institute_code = options?.institute_code || '';

		axios.defaults.headers.common['User-Agent'] = 'hu.ekreta.student/1.0.5/Android/0/0';

		this.Global = new Global();
		this.authenticate = new Authentication({ username: this.username!, password: this.password!, institute_code: this.institute_code! });
		if (this.username && this.password && this.institute_code)
			this.token = this.authenticate.getAccessToken().then((r: PreBuiltAuthenticationToken) => r.token);
		this.Administration = new Administration({ username: this.username!, password: this.password!, institute_code: this.institute_code! });
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

	@requireParam('proxy.host')
	@requireParam('proxy.port')
	public setProxy(proxy: AxiosProxyConfig): this {
		axios.defaults.proxy = proxy;
		return this;
	}

	@requireParam('ua')
	public setUserAgent(ua: string): this {
		axios.defaults.headers.common['User-Agent'] = ua;
		return this;
	}

	private buildEllenorzoApiURL(endpointWithSlash: Endpoints, params?: { [key: string]: any }): string {
		const urlParams: string = params ? '?' + new URLSearchParams(params).toString() : '';
		return dynamicValue(API.INSTITUTE, { institute_code: this.institute_code }).toString() + '/ellenorzo/V3' + endpointWithSlash + urlParams;
	}

	@requireParam('api_key')
	public getInstituteList(api_key: string): Promise<Institute[]> {
		return new Promise(async (resolve): Promise<void> => {
			const config_descriptor: AxiosResponse<ConfigurationDescriptor> = await axios.get('https://kretamobile.blob.core.windows.net/configuration/ConfigurationDescriptor.json');

			await tryRequest(axios.get(config_descriptor.data.GlobalMobileApiUrlPROD + '/api/v3/Institute', {
				headers: {
					apiKey: api_key
				}
			}).then((r: AxiosResponse<Institute[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	public getStudent(): Promise<Student> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildEllenorzoApiURL(Endpoints.Tanulo), {
				headers: {
					'Authorization': await this.token,
				}
			}).then((r: AxiosResponse<Student>) => resolve(r.data)));
		});
	}

	@requireCredentials
	public getEvaluations(options?: RequestDateRangeOptions): Promise<Evaluation[]> {
		return new Promise(async (resolve): Promise<void> => {
			const ops: { datumTol?: string; datumIg?: string } = {};

			if (options?.dateFrom)
				ops.datumTol = validateDate(moment(options.dateFrom).format('YYYY-MM-DD'));
			if (options?.dateTo)
				ops.datumIg = validateDate(moment(options.dateTo).format('YYYY-MM-DD'));

			await tryRequest(axios.get(this.buildEllenorzoApiURL(Endpoints.Ertekelesek, ops), {
				headers: {
					'Authorization': await this.token,
				}
			}).then((r: AxiosResponse<Evaluation[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	public getNotes(options?: RequestDateRangeOptions): Promise<Note[]> {
		return new Promise(async (resolve): Promise<void> => {
			const ops: { datumTol?: string; datumIg?: string } = {};

			if (options?.dateFrom)
				ops.datumTol = validateDate(moment(options.dateFrom).format('YYYY-MM-DD'));
			if (options?.dateTo)
				ops.datumIg = validateDate(moment(options.dateTo).format('YYYY-MM-DD'));

			await tryRequest(axios.get(this.buildEllenorzoApiURL(Endpoints.Feljegyzesek, ops), {
				headers: {
					'Authorization': await this.token,
				}
			}).then((r: AxiosResponse<Note[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	public getAnnouncedTests(options?: RequestAnnouncedTestsOptions): Promise<AnnouncedTest[]> {
		return new Promise(async (resolve): Promise<void> => {
			const ops: { datumTol?: string; datumIg?: string, Uids?: string } = {};

			if (options?.dateFrom)
				ops.datumTol = validateDate(moment(options.dateFrom).format('YYYY-MM-DD'));
			if (options?.dateTo)
				ops.datumIg = validateDate(moment(options.dateTo).format('YYYY-MM-DD'));
			if (options?.uids)
				ops.Uids = options.uids.map((uid: string | number) => uid.toString()).join(';');

			await tryRequest(axios.get(this.buildEllenorzoApiURL(Endpoints.Szamonkeresek, ops), {
				headers: {
					'Authorization': await this.token,
				}
			}).then((r: AxiosResponse<AnnouncedTest[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	@requireParam('options.dateFrom')
	public getHomeworks(options: RequestHomeWorkOptions): Promise<Homework[]> {
		return new Promise(async (resolve): Promise<void> => {
			const ops: { datumTol: string; datumIg?: string } = { datumTol: validateDate(moment(options.dateFrom).format('YYYY-MM-DD')) };

			if (options?.dateTo)
				ops.datumIg = validateDate(moment(options.dateTo).format('YYYY-MM-DD'));

			await tryRequest(axios.get(this.buildEllenorzoApiURL(Endpoints.HaziFeladatok, ops), {
				headers: {
					'Authorization': await this.token,
				}
			}).then((r: AxiosResponse<Homework[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	@requireParam('uid')
	public getHomework(uid: string | number): Promise<Homework> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildEllenorzoApiURL(Endpoints.HaziFeladatok) + '/' + uid.toString(), {
				headers: {
					'Authorization': await this.token,
				}
			}).then((r: AxiosResponse<Homework>) => resolve(r.data)));
		});
	}

	@requireCredentials
	public getOmissions(options?: RequestDateRangeOptions): Promise<Omission[]> {
		return new Promise(async (resolve): Promise<void> => {
			const ops: { datumTol?: string; datumIg?: string } = {};

			if (options?.dateFrom)
				ops.datumTol = validateDate(moment(options.dateFrom).format('YYYY-MM-DD'));
			if (options?.dateTo)
				ops.datumIg = validateDate(moment(options.dateTo).format('YYYY-MM-DD'));

			await tryRequest(axios.get(this.buildEllenorzoApiURL(Endpoints.Mulasztasok, ops), {
				headers: {
					'Authorization': await this.token,
				}
			}).then((r: AxiosResponse<Omission[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	public getGroups(): Promise<Group[]> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildEllenorzoApiURL(Endpoints.OsztalyCsoportok), {
				headers: {
					'Authorization': await this.token,
				}
			}).then((r: AxiosResponse<Group[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	public getSubjectAverages(onfUid?: string): Promise<SubjectAverage[]> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildEllenorzoApiURL(Endpoints.TantargyiAtlagok, { oktatasiNevelesiFeladatUid: onfUid || await this.getGroups().then((groups: Group[]) => groups[0].OktatasNevelesiFeladat.Uid) }), {
				headers: {
					'Authorization': await this.token,
				}
			}).then((r: AxiosResponse<SubjectAverage[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	@requireParam('options.dateFrom')
	@requireParam('options.dateTo')
	public getLessons(options: RequestDateRangeRequiredOptions): Promise<Lesson[]> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildEllenorzoApiURL(Endpoints.OrarendElemek, {
				datumTol: validateDate(moment(options.dateFrom).format('YYYY-MM-DD')),
				datumIg: validateDate(moment(options.dateTo).format('YYYY-MM-DD'))
			}), {
				headers: {
					'Authorization': await this.token,
				}
			}).then((r: AxiosResponse<Lesson[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	@requireParam('uid')
	public getLesson(uid: string | number): Promise<Lesson> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildEllenorzoApiURL(Endpoints.OrarendElem, { orarendElemUid: uid.toString() }), {
				headers: {
					'Authorization': await this.token,
				}
			}).then((r: AxiosResponse<Lesson>) => resolve(r.data)));
		});
	}

	@requireCredentials
	public getNoticeBoardItems(): Promise<NoticeBoardItem[]> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildEllenorzoApiURL(Endpoints.FaliujsagElemek), {
				headers: {
					'Authorization': await this.token,
				}
			}).then((r: AxiosResponse<NoticeBoardItem[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	public getClassAverage(options?: RequestClassAveragesOptions): Promise<ClassAverage[]> {
		return new Promise(async (resolve): Promise<void> => {
			const ops: {
				oktatasiNevelesiFeladatUid: string;
				tantargyUid?: string;
			} = { oktatasiNevelesiFeladatUid: options?.oktatasiNevelesiFeladatUid || await this.getGroups().then((groups: Group[]) => groups[0].OktatasNevelesiFeladat.Uid) };

			if (options?.subjectUid)
				ops.tantargyUid = options.subjectUid;

			await tryRequest(axios.get(this.buildEllenorzoApiURL(Endpoints.OsztalyCsoportAtlag, ops), {
				headers: {
					'Authorization': await this.token,
				}
			}).then((r: AxiosResponse<ClassAverage[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	public getInstitute(): Promise<Institution> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildEllenorzoApiURL(Endpoints.Intezmenyek), {
				headers: {
					'Authorization': await this.token,
				}
			}).then((r: AxiosResponse<Institution>) => resolve(r.data)));
		});
	}

	@requireCredentials
	@requireParam('uids')
	public getClassMasters(uids: string[] | number[]): Promise<ClassMaster[]> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildEllenorzoApiURL(Endpoints.Osztalyfonokok, { Uids: uids.map((u: string | number) => u.toString()).join(';') }), {
				headers: {
					'Authorization': await this.token,
				}
			}).then((r: AxiosResponse<ClassMaster[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	@requireParam('options.dateFrom')
	@requireParam('options.dateTo')
	public getTimeTableWeeks(options: RequestDateRangeRequiredOptions): Promise<TimeTableWeek[]> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildEllenorzoApiURL(Endpoints.OrarendHetek, {
				orarendElemKezdoNapDatuma: validateDate(moment(options.dateFrom).format('YYYY-MM-DD')),
				orarendElemVegNapDatuma: validateDate(moment(options.dateTo).format('YYYY-MM-DD'))
			}), {
				headers: {
					'Authorization': await this.token,
				}
			}).then((r: AxiosResponse<TimeTableWeek[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	public getLepEvents(): Promise<LepEvent[]> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildEllenorzoApiURL(Endpoints.Eloadasok), {
				headers: {
					'Authorization': await this.token,
				}
			}).then((r: AxiosResponse<LepEvent[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	public getSchoolYearCalendar(): Promise<SchoolYearCalendarEntry[]> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildEllenorzoApiURL(Endpoints.TanevNaptar), {
				headers: {
					'Authorization': await this.token,
				}
			}).then((r: AxiosResponse<SchoolYearCalendarEntry[]>) => resolve(r.data)));
		});
	}

	@requireCredentials
	public getDeviceGivenState(): Promise<boolean> {
		return new Promise(async (resolve): Promise<void> => {
			await tryRequest(axios.get(this.buildEllenorzoApiURL(Endpoints.EszkozAllapot), {
				headers: {
					'Authorization': await this.token,
				}
			}).then((r: AxiosResponse<boolean>) => resolve(r.data)));
		});
	}
}
