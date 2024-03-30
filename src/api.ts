enum EugyintezesEndpoints {
	CreateAttachment = 'ideiglenesfajlok',
	CreateTmgiCase = 'ugy/kerelmek',
	DeleteMessagePermanently = 'kommunikacio/postaladaelemek/torles',
	GetAccessControlSystemEvents = 'belepteto/kartyaesemenyek/sajat',
	GetAddressableClasses = 'kommunikacio/osztalyok/cimezheto',
	GetAddressableSzmkRepesentative = 'kommunikacio/szmkkepviselok/cimezheto',
	GetAddressableType = 'kommunikacio/cimezhetotipusok',
	GetAddresseeType = 'adatszotarak/cimzetttipusok',
	GetAdministrators = 'kreta/alkalmazottak/adminisztrator',
	GetCaseTypes = 'adatszotarak/kerelemtipusok',
	GetCases = 'ugy/kerelmek',
	GetChildData = 'kreta/gyerekemadatok',
	GetClassMasters = 'kreta/alkalmazottak/oszalyfonok',
	GetCurrentInstitutionDetails = 'ugy/aktualisIntezmenyAdatok',
	GetCurrentInstitutionModules = 'intezmenyek/sajat/modulok',
	GetDirectors = 'kreta/alkalmazottak/igazgatosag',
	GetMessageLimitations = 'kommunikacio/uzenetek/kuldhetok/korlat',
	GetMessages = 'kommunikacio/postaladaelemek/sajat',
	GetStatus = 'status',
	GetSzmk = 'kommunikacio/szmkkepviselok/cimezheto',
	GetTeachers = 'kreta/alkalmazottak/tanar',
	GetTmgiCaseTypes = 'adatszotarak/tmgiigazolastipusok',
	GetUnreadMessagesCount = 'kommunikacio/postaladaelemek/olvasatlanokszama',
	ReadMessage = 'kommunikacio/postaladaelemek/olvasott',
	SendMessage = 'kommunikacio/uzenetek',
	SendMessageToBin = 'kommunikacio/postaladaelemek/kuka',
}

enum GlobalEndpoints {
	GetConfigurationDescriptors = 'configuration/ConfigurationDescriptor.json',
	GetInstitutes = 'intezmenyek/kreta/publikus',
}

enum IDPEndpoints {
	ExtendToken = 'connect/token',
	GetNonce = 'nonce',
	Login = 'connect/token',
	RevokeRefreshToken = 'connect/revocation',
}

enum MobileEndpoints {
	DeleteBankAccountNumber = 'sajat/Bankszamla',
	GetAnnouncedTests = 'sajat/BejelentettSzamonkeresek',
	GetCertificateEvaluations = 'sajat/Ertekelesek/Bizonyitvany',
	GetClassAverage = 'sajat/Ertekelesek/Atlagok/OsztalyAtlagok',
	GetClassMaster = 'felhasznalok/Alkalmazottak/Tanarok/Osztalyfonokok',
	GetConsultingHours = 'sajat/Fogadoorak',
	GetDailyNotificationSummary = 'sajat/NapiErtesitesOsszefoglalo',
	GetDeviceGivenState = 'TargyiEszkoz/IsEszkozKiosztva',
	GetEvaluations = 'sajat/Ertekelesek',
	GetGroups = 'sajat/OsztalyCsoportok',
	GetGuardian4T = 'sajat/GondviseloAdatlap',
	GetGuardianIsLegalRepresentative = 'Gondviselo/IsTorvenyesKepviselo',
	GetHomeworks = 'sajat/HaziFeladatok',
	GetInstitution = 'sajat/Intezmenyek',
	GetLEPEvents = 'Lep/Eloadasok',
	GetLesson = 'sajat/OrarendElem',
	GetLessons = 'sajat/OrarendElemek',
	GetNonCertificateEvaluations = 'sajat/Ertekelesek/NemBizonyitvany',
	GetNotes = 'sajat/Feljegyzesek',
	GetNoticeBoardItems = 'sajat/FaliujsagElemek',
	GetOmissions = 'sajat/Mulasztasok',
	GetRegistrationState = 'TargyiEszkoz/IsRegisztralt',
	GetSchoolYearCalendar = 'sajat/Intezmenyek/TanevRendjeElemek',
	GetStudent = 'sajat/TanuloAdatlap',
	GetSubjectAverage = 'sajat/Ertekelesek/Atlagok/TantargyiAtlagok',
	GetTeszekRegistration = 'TargyiEszkoz/Regisztracio',
	GetTimeTableWeeks = 'sajat/Intezmenyek/Hetirendek/Orarendi',
	PostBankAccountNumber = 'sajat/Bankszamla',
	PostContact = 'sajat/Elerhetoseg',
	PostCovidReport = 'Bejelentes/Covid',
	PostTeszekRegistration = 'TargyiEszkoz/Regisztracio',
	UpdateGuardian4T = 'sajat/GondviseloAdatlap',
	UpdateLepEventPermission = 'Lep/Eloadasok/GondviseloEngedelyezes',
}

enum NaploEndpoints {
	DeleteLogging = 'Orarend/OraNaplozasTorles',
	GetAnnouncedTests = 'OsztalyCsoport/BejelentettSzamonkeres',
	GetClassGroups = 'OsztalyCsoport',
	GetEvaluationMode = 'Enum/NaploEnum',
	GetEvaluations = 'OsztalyCsoport/Tanulok/Ertekeles',
	GetJustification = 'Igazolas',
	GetNotes = 'Ora/Feljegyzes',
	GetProfile = 'Tanar/Profil',
	GetSchoolGuard = 'Iskolaor',
	GetSentenceBankItems = 'OsztalyCsoport/Ertekeles/Mondatbank',
	GetSettings = 'Tanar/Beallitasok',
	GetStudentEvaluations = 'OsztalyCsoport/Ertekeles',
	GetStudentPresence = 'Orarend/Jelenlet',
	GetStudents = 'OsztalyCsoport/Tanulok',
	GetSubjectDivision = 'Tanar/Tantargyfelosztas',
	GetSyllabus = 'Tanmenet',
	GetTimetable = 'Orarend',
	GetTimetableElement = 'Orarend/OrarendElem',
	GetTimetableWeeks = 'Orarend/Hetirend',
	PostAnnouncedTest = 'Orarend/BejelentettSzamonkeres',
	PostClassGroupEvaluations = 'OsztalyCsoport/Ertekeles',
	PostHomework = 'HaziFeladat',
	PostJustification = 'Igazolas',
	PostLogging = 'Orarend/OraNaplozas',
	PostSettings = 'Tanar/Beallitasok',
}

enum NotificationEndpoints {
	AddPushNotificationRegistration = 'Registration',
	DeletePushNotificationRegistration = 'Registration',
	UpdatePushNotificationRegistration = 'Registration',
}

export const Endpoints = {
	Eugyintezes: {
		CreateRectification: (ugyId: string) => `ugy/kerelmek/${ugyId}`,
		GetAddressableGuardiansForClass: (osztalyKretaAzonosito: string | number) => `kreta/gondviselok/osztaly/${osztalyKretaAzonosito}`,
		GetCase: (ugyId: string) => `ugy/kerelmek/${ugyId}`,
		GetMessage: (azonosito: string | number) => `kommunikacio/postaladaelemek/${azonosito}`,
		GetSigner: (kerelemAzonosito: string | number, kretaAzonosito: string | number) => `ugy/alkalmazott/${kerelemAzonosito}/${kretaAzonosito}`,
		...EugyintezesEndpoints,
	},
	Global: GlobalEndpoints,
	IDP: IDPEndpoints,
	Mobile: {
		DeleteReservation: (uid: string) => `sajat/Fogadoorak/Idopontok/Jelentkezesek/${uid}`,
		DownloadAttachment: (uid: string) => `sajat/Csatolmany/${uid}`,
		GetAnnouncedTest: (uid: string) => `sajat/BejelentettSzamonkeresek/${uid}`,
		GetConsultingHour: (uid: string) => `sajat/Fogadoorak/${uid}`,
		GetEvaluation: (uid: string) => `sajat/Ertekelesek/${uid}`,
		GetHomework: (uid: string) => `sajat/HaziFeladatok/${uid}`,
		GetNote: (uid: string) => `sajat/Feljegyzesek/${uid}`,
		GetOmission: (uid: string) => `sajat/Mulasztasok/${uid}`,
		PostReservation: (uid: string) => `sajat/Fogadoorak/Idopontok/Jelentkezesek/${uid}`,
		...MobileEndpoints,
	},
	Naplo: {
		DeleteAnnouncedTest: (uid: number | string) => `Orarend/BejelentettSzamonkeres/${uid}`,
		DeleteEvaluation: (uid: number | string) => `OsztalyCsoport/Tanulok/Ertekeles/${uid}`,
		DeleteHomework: (uid: number | string) => `HaziFeladat/${uid}`,
		DeleteHomeworkAttachment: (uid: number | string) => `HaziFeladat/Csatolmany/${uid}`,
		DeleteJustification: (uid: string) => `Igazolas/${uid}`,
		GetAnnouncedTest: (uid: number | string) => `Orarend/BejelentettSzamonkeres/${uid}`,
		GetHomework: (uid: number | string) => `HaziFeladat/${uid}`,
		GetStudent: (uid: number | string) => `OsztalyCsoport/Tanulok/${uid}`,
		PutHomework: (uid: number | string) => `HaziFeladat/${uid}`,
		UpdateEvaluation: (uid: number | string) => `OsztalyCsoport/Tanulok/Ertekeles/${uid}`,
		...NaploEndpoints,
	},
	Notification: NotificationEndpoints,
} as const;

enum EugyintezesApi {
	Host = 'https://eugyintezes.e-kreta.hu',
	Path = '/api/v1/',
}

enum GlobalApi {
	Host = 'https://kretaglobalapi.e-kreta.hu',
	WinCore = 'https://kretamobile.blob.core.windows.net',
	Path = '/',
}

enum IDPApi {
	Host = 'https://idp.e-kreta.hu',
	Path = '/',
}

enum MobileApi {
	Path = '/ellenorzo/v3/',
}

enum NaploApi {
	Path = '/naplo/V3/'
}

enum NotificationApi {
	Host = 'https://kretaglobalmobileapi2.ekreta.hu',
	Path = '/api/v3/',
	Key = '7856d350-1fda-45f5-822d-e1a2f3f1acf0',
}

export const API = {
	Eugyintezes: EugyintezesApi,
	Global: GlobalApi,
	IDP: IDPApi,
	Mobile: {
		Host: (instituteCode: string) => `https://${instituteCode}.e-kreta.hu`,
		...MobileApi,
	},
	Naplo: {
		Host: (instituteCode: string) => `https://${instituteCode}.e-kreta.hu`,
		...NaploApi,
	},
	Notification: NotificationApi,
} as const;
