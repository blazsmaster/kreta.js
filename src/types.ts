export enum Endpoints {
	Token = '/connect/token',
	Nonce = '/nonce',

	PublikusIntezmenyek = '/intezmenyek/kreta/publikus',

	Feljegyzesek = '/Sajat/Feljegyzesek',
	FaliujsagElemek = '/Sajat/FaliujsagElemek',
	Tanulo = '/Sajat/TanuloAdatlap',
	Ertekelesek = '/Sajat/Ertekelesek',
	TantargyiAtlagok = '/Sajat/Ertekelesek/Atlagok/TantargyiAtlagok',
	Mulasztasok = '/Sajat/Mulasztasok',
	OsztalyCsoportok = '/Sajat/OsztalyCsoportok',
	OsztalyCsoportAtlag = '/Sajat/Ertekelesek/Atlagok/OsztalyAtlagok',
	OrarendElemek = '/Sajat/OrarendElemek',
	OrarendElem = '/Sajat/OrarendElem',
	Szamonkeresek = '/Sajat/BejelentettSzamonkeresek',
	HaziFeladatok = '/Sajat/HaziFeladatok',
	Intezmenyek = '/Sajat/Intezmenyek',
	Osztalyfonokok = '/Felhasznalok/Alkalmazottak/Tanarok/Osztalyfonokok',
	OrarendHetek = '/Sajat/Intezmenyek/Hetirendek/Orarendi',
	TanevNaptar = '/Sajat/Intezmenyek/TanevRendjeElemek',
	Eloadasok = '/Lep/Eloadasok',
	EszkozAllapot = '/TargyiEszkoz/IsEszkozKiosztva'
}

export enum AdministrationEndpoints {
	CimzettTipusok = '/adatszotarak/cimzetttipusok',
	KerelemTipusok = '/adatszotarak/kerelemtipusok',
	TmgiIgazolasTipusok = '/adatszotarak/tmgiigazolastipusok',
	Esemenyek = '/belepteto/kartyaesemenyek/sajat',
	JelenlegiIntezmenyModulok = '/intezmenyek/sajat/modulok',
	CimezhetoTipusok = '/kommunikacio/cimezhetotipusok',
	CimezhetoOsztalyok = '/kommunikacio/osztalyok/cimezheto',
	OlvasatlanokSzama = '/kommunikacio/postaladaelemek/olvasatlanokszama',
	Uzenetek = '/kommunikacio/postaladaelemek/sajat',
	Uzenet = '/kommunikacio/postaladaelemek',
	CimezhetoSzmkKepviselok = '/kommunikacio/szmkkepviselok/cimezheto',
	UzenetLimitacio = '/kommunikacio/uzenetek/kuldhetok/korlat',
	Adminisztratorok = '/kreta/alkalmazottak/adminisztrator',
	Igazgatok = '/kreta/alkalmazottak/igazgatosag',
	Osztalyfonokok = '/kreta/alkalmazottak/oszalyfonok',
	Oktatok = '/kreta/alkalmazottak/tanar',
	CimezhetoTanuloSzulok = '/kreta/gondviselok/osztaly',
	JelenlegiIntezmeny = '/ugy/aktualisIntezmenyAdatok'
}

export enum API {
	INSTITUTE = 'https://{{institute_code}}.e-kreta.hu',
	IDP = 'https://idp.e-kreta.hu',
	ADMINISTRATION = 'https://eugyintezes.e-kreta.hu',
	GLOBAL = 'https://kretaglobalapi.e-kreta.hu'
}

export interface RequestDateRangeOptions {
	dateFrom?: string;
	dateTo?: string;
}

export interface RequestDateRangeRequiredOptions {
	dateFrom: string;
	dateTo: string;
}

export interface RequestClassAveragesOptions {
	oktatasiNevelesiFeladatUid?: string;
	subjectUid?: string;
}

export interface RequestHomeWorkOptions extends RequestDateRangeOptions {
	dateFrom: string;
}

export interface RequestAnnouncedTestsOptions extends RequestDateRangeOptions {
	uids?: string[] | number[];
}

export interface ConfigurationDescriptor {
	GlobalMobileApiUrlDEV: string;
	GlobalMobileApiUrlPROD: string;
	GlobalMobileApiUrlTEST: string;
	GlobalMobileApiUrlUAT: string;
}

export interface NonceHashOptions {
	institute_code: string;
	nonce: string;
	username: string;
}

export interface AuthenticationFields {
	institute_code: string;
	password: string;
	username: string;
}

export interface RequestRefreshTokenOptions {
	refreshUserData: boolean;
	refreshToken: string;
}

export interface AccessToken {
	access_token: string | null;
	refresh_token: string | null;
	token_type: string | null;
}

export interface KretaOptions extends AuthenticationFields {
}

export interface AuthenticationResponse {
	access_token: string;
	expires_in: number;
	id_token: string | null;
	refresh_token: string;
	scope: string;
	token_type: string;
}

export interface PreBuiltAuthenticationToken {
	token: string;
	access_token: string;
	refresh_token: string;
}

interface ResponseErrorItem {
	PropertyName: string;
	Message: string;
	ExceptionType: string;
}

export interface ResponseError {
	ExceptionId: string;
	ExceptionType: string;
	Message: string;
	ErrorList: ResponseErrorItem[] | null;
	error?: string;
}

export type RequestResponseError = ResponseError | string | undefined;

interface SystemModule {
	IsAktiv: boolean;
	Tipus: string;
	Url: string | null;
}

interface CustomizationSettings {
	ErtekelesekMegjelenitesenekKesleltetesenekMerteke: number;
	IsDiakRogzithetHaziFeladatot: boolean;
	IsOsztalyAtlagMegjeleniteseEllenorzoben: boolean;
	IsTanorakTemajaMegtekinthetoEllenorzoben: boolean;
	KovetkezoTelepitesDatuma: string;
}

export interface Institution {
	Rendszermodulok: SystemModule[];
	RovidNev: string | null;
	TestreszabasBeallitasok: CustomizationSettings;
	Uid: string;
}

interface ValueDescriptor {
	Leiras: string;
	Nev: string;
	Uid: string;
}

interface UidStructure {
	Uid: string;
}

interface BankAccount {
	BankszamlaSzam: string | null;
	BankszamlaTulajdonosNeve: string | null;
	BankszamlaTulajdonosTipusId: number | null;
	IsReadOnly: boolean | null;
}

interface Guardian {
	EmailCim: string | null;
	IdpUniqueId: string;
	IsTorvenyesKepviselo: boolean | null;
	Nev: string;
	Telefonszam: string | null;
	Uid: string;
}

export interface Student {
	AnyjaNeve: string;
	Bankszamla: BankAccount;
	Cimek: string[];
	EmailCim: string | null;
	Gondviselok: Guardian[];
	IdpUniqueId: string;
	Intezmeny: Institution;
	IntezmenyAzonosito: string;
	IntezmenyNev: string;
	IsEszkozKiosztva: boolean;
	Nev: string;
	SzuletesiDatum: string;
	SzuletesiEv: number;
	SzuletesiHely: string;
	SzuletesiHonap: number;
	SzuletesiNap: number;
	SzuletesiNev: string;
	TanevUid: number;
	Telefonszam: string | null;
	Uid: string;
}

interface SubjectDescriptor {
	Kategoria: ValueDescriptor;
	Nev: string;
	Uid: string;
	SortIndex: number;
}

export interface Institute {
	advertisingUrl: string;
	city: string;
	featureToggleSet: {};
	informationImageUrl: string;
	informationUrl: string;
	instituteCode: string;
	instituteId: number;
	name: string;
	url: string;
}

export interface InstituteGlobal {
	aktivTanevGuid: string;
	aktivTanevId: number;
	aktivTanevNev: string;
	azonosito: string;
	fenntartoAzonosito: string;
	fenntartoNev: string;
	id: string;
	kornyezetId: number;
	kornyezetNev: string;
	kornyezetTeljesNev: string;
	kretaLink: string;
	nev: string;
	omKod: string;
	rovidNev: string;
	telepules: string;
}

export interface Evaluation {
	ErtekFajta: ValueDescriptor;
	ErtekeloTanarNeve: string;
	Jelleg: string | null;
	KeszitesDatuma: string;
	LattamozasDatuma: string | null;
	Mod: ValueDescriptor | null;
	OsztalyCsoport: UidStructure;
	RogzitesDatuma: string;
	SortIndex: number;
	SulySzazalekErteke: number | null;
	SzamErtek: number | null;
	SzovegesErtek: string;
	SzovegesErtekelesRovidNev: string | null;
	Tantargy: SubjectDescriptor | null;
	Tema: string | null;
	Tipus: ValueDescriptor;
	Uid: string;
}

export interface Note {
	Cim: string;
	Datum: string;
	KeszitesDatuma: string;
	KeszitoTanarNeve: string;
	LattamozasDatuma: string | null;
	OsztalyCsoport: UidStructure | null;
	Tartalom: string;
	Tipus: ValueDescriptor;
	Uid: string;
}

export interface AnnouncedTest {
	BejelentesDatuma: string;
	Datum: string;
	Modja: ValueDescriptor;
	OrarendiOraOraszama: number;
	OsztalyCsoport: UidStructure;
	RogzitoTanarNeve: string;
	Tantargy: SubjectDescriptor | null;
	TantargyNeve: string | null;
	Temaja: string | null;
	Uid: string;
}

interface Attachment {
	Nev: string;
	Tipus: string;
	Uid: string;
}

export interface Homework {
	Csatolmanyok: Attachment[] | null;
	FeladasDatuma: string;
	HataridoDatuma: string;
	IsBeadhato: boolean;
	IsCsatolasEngedelyezes: boolean;
	IsMegoldva: boolean;
	IsTanarRogzitette: boolean;
	IsTanuloHaziFeladatEnabled: boolean;
	OsztalyCsoport: UidStructure | null;
	RogzitesIdopontja: string;
	RogzitoTanarNeve: string;
	Szoveg: string | null;
	Tantargy: SubjectDescriptor | null;
	TantargyNeve: string | null;
	Uid: string;
}

interface OmissionLesson {
	KezdoDatum: string;
	Oraszam: number;
	VegDatum: string;
}

type JustificationState = 'None' | 'Igazolatlan' | 'Igazolt' | 'Igazolando'

export interface Omission {
	Datum: string;
	IgazolasAllapota: JustificationState;
	IgazolasTipusa: ValueDescriptor | null;
	KesesPercben: number | null;
	KeszitesDatuma: string;
	Mod: ValueDescriptor;
	Ora: OmissionLesson;
	OsztalyCsoport: UidStructure;
	RogzitoTanarNeve: string;
	Tantargy: SubjectDescriptor;
	Tipus: ValueDescriptor;
	Uid: string;
}

interface GroupMembership {
	BesorolasDatuma: string | null;
	KisorolasDatuma: string | null;
}

export interface Group {
	IsAktiv: boolean;
	Nev: string;
	OktatasNevelesiFeladat: ValueDescriptor;
	OktatasNevelesiFeladatSortIndex: number;
	OktatasNevelesiKategoria: ValueDescriptor;
	OsztalyFonok: UidStructure | null;
	OsztalyFonokHelyettes: UidStructure | null;
	Tagsagok: GroupMembership[];
	Tipus: string;
	Uid: string;
}

interface AverageWithTime {
	Atlag: number;
	Datum: string;
}

export interface SubjectAverage {
	Atlag: number | null;
	AtlagAlakulasaIdoFuggvenyeben: AverageWithTime[];
	SortIndex: number;
	SulyozottOsztalyzatOsszege: number | null;
	SulyozottOsztalyzatSzama: number | null;
	Tantargy: SubjectDescriptor;
	Uid: string;
}

interface LessonAttachment {
	Nev: string;
	Uid: string;
}

interface UidNameStructure {
	Nev: string;
	Uid: string;
}

export interface Lesson {
	Allapot: ValueDescriptor;
	BejelentettSzamonkeresUid: string | null;
	Csatolmanyok: LessonAttachment[] | null;
	Datum: string;
	DigitalisEszkozTipus: string | null;
	DigitalisPlatformTipus: string | null;
	DigitalisTamogatoEszkozTipusList: string[] | null;
	FeladatGroupUid: string | null;
	HaziFeladatUid: string | null;
	HelyettesTanarNeve: string | null;
	IsDigitalisOra: boolean;
	IsHaziFeladatMegoldva: boolean;
	IsTanuloHaziFeladatEnabled: boolean;
	KezdetIdopont: string;
	Letrehozas: string;
	Nev: string | null;
	NyelviFeladatGroupUid: string | null;
	OraEvesSorszama: number | null;
	Oraszam: number;
	OsztalyCsoport: UidNameStructure;
	TanarNeve: string | null;
	Tantargy: SubjectDescriptor;
	TanuloJelenlet: ValueDescriptor | null;
	Tema: string | null;
	TeremNeve: string | null;
	Tipus: ValueDescriptor;
	Uid: string;
	UtolsoModositas: string | null;
	VegIdopont: string;
}

export interface NoticeBoardItem {
	Cim: string;
	ErvenyessegKezdete: string;
	ErvenyessegVege: string;
	RogzitoNeve: string;
	Tartalom: string;
	Uid: string;
}

export interface ClassAverage {
	OsztalyCsoportAtlag: number | null;
	OsztalyCsoportAtlagtolValoElteres: number | null;
	Tantargy: SubjectDescriptor;
	TanuloAtlag: number | null;
	Uid: string;
}

interface Employee {
	Emailek: string[] | null;
	Nev: string;
	Telefonok: string[] | null;
	Uid: string;
}

interface Teacher {
	Alkalmazott: Employee;
	Uid: string;
}

interface Class {
	Nev: string;
	OktatasiNevelesiKategoria: ValueDescriptor;
	Uid: string;
}

export interface ClassMaster {
	Osztalyai: Class[];
	Tanar: Teacher;
	Uid: string;
}

export interface TimeTableWeek {
	HetSorszama: number;
	KezdoNapDatuma: string;
	Tipus: ValueDescriptor | null;
	Uid: string;
	VegNapDatuma: string;
}

export interface LepEvent {
	Datum: string;
	EloadasKezdete: string;
	EloadasNev: string;
	EloadasVege: string;
	GondviseloElfogadas: boolean | null;
	Helyszin: string;
	Megjelent: boolean;
	SzervezetNev: string;
	Uid: string;
}

export interface SchoolYearCalendarEntry {
	Datum: string;
	ElteroOrarendSzerintiTanitasiNap: ValueDescriptor | null;
	Naptipus: ValueDescriptor;
	OrarendiNapHetirendje: ValueDescriptor;
	OsztalyCsoport: UidStructure | null;
	Uid: string;
}

export interface AddresseType {
	azonosito: number | null;
	kod: string | null;
	leiras: string | null;
	nev: string | null;
	rovidNev: string | null;
}

export interface DefaultType {
	azonosito: number;
	kod: string;
	leiras: string;
	nev: string;
	rovidNev: string;
}

export interface CardEvent {
	azonosito: number;
	idopont: string;
	irany: string | null;
	megjegyzes: string | null;
}

export interface KretaClass {
	kretaAzonosito: number;
	nev: string | null;
}

interface Addresse {
	azonosito: number;
	kretaAzonosito: number;
	nev: string;
	tipus: DefaultType;
}

interface TemporaryId {
	azonosito: number | null;
	fileHandler: string | null;
	ideiglenesFajlAzonosito: string | null;
	utvonal: string | null;
}

interface AdministrationAttachment {
	azonosito: number;
	fajl: TemporaryId | null;
	fajlNeve: string;
}

interface Message {
	azonosito: number | null;
	cimzettLista: Addresse[] | null;
	csatolmanyok: AdministrationAttachment[] | null;
	elozoUzenetAzonosito: number | null;
	feladoNev: string | null;
	feladoTitulus: string | null;
	kuldesDatum: string | null;
	szoveg: string | null;
	targy: string | null;
}

export interface MailboxItem {
	azonosito: number;
	isElolvasva: boolean;
	isToroltElem: boolean;
	tipus: DefaultType;
	uzenet: Message;
}

export interface GuardianEAdmin {
	SZMKOsztaly: string | null;
	emailCim: string | null;
	gondviseloNev: string | null;
	isSZMK: boolean | null;
	isSZMKHelyettes: boolean | null;
	isTorvenyesKepviselo: boolean | null;
	kretaAzonosito: number | null;
	rokonsagiFok: string | null;
	sZMKOsztalyHelyettes: string | null;
	sZMKOsztalyHelyettesKretaAzonosito: number | null;
	sZMKOsztalyKretaAlkalmazott: number | null;
	sZMKOsztalyKretaAzonosito: number | null;
	tanuloNev: string | null;
	tanuloOktatasiAzonosito: string | null;
	tanuloOsztaly: string | null;
	tanuloOsztalyKretaAzonosito: number | null;
}

export interface MessageLimitations {
	isCsakEgyCimzettLehet: boolean;
	isKuldhetoUzenetekSzamaKorlatozvaVan: boolean;
	kuldhetoUzenetekSzamaMegMa: number;
}

export interface EmployeeDetails {
	isAdmin: boolean | null;
	isAlairo: boolean | null;
	isIgazgato: boolean | null;
	isIgazgatoHelyettes: boolean | null;
	isOsztalyfonok: boolean | null;
	isOsztalyfonokHelyettes: boolean | null;
	isTanar: boolean | null;
	isTorolt: boolean | null;
	kretaAzonosito: number | null;
	nev: string | null;
	oktatasiAzonosito: string | null;
	osztaly: string | null;
	osztalyHelyettes: string | null;
	osztalyHelyettesKretaAzonosito: number | null;
	osztalyKretaAzonosito: number | null;
	titulus: string | null;
}

export interface CurrentInstitutionDetails {
	azonosito: number | null;
	kretaIntezmenyAzonosito: string | null;
	omAzonosito: string | null;
	nev: string | null;
	tankeruletNeve: string | null;
	intezmenyCim: string | null;
	penztarjelentesAzonositoElotag: string | null;
	isAltalanos: false;
	isKozepfoku: true;
	isSzeusz: false;
	ertesitesiEmailCim: string | null;
	IsUzenetKezelesElerheto: true;
	IsRFIDIntezmeny: false;
	tagozatLista: string[];
	etkezesMegrendelesTipus: DefaultType | null;
}
