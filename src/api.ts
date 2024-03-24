enum DktEndpoints {
	GetClassworkTeachingMaterial = 'mobil/intezmenyek/tanulok/orak/tananyagok',
}

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
	Dkt: {
		DeleteHomeworkSolutionAttachment: (haziFeladatBeadasId: string, id: string) => `mobil/intezmenyek/tanulok/orak/hazifeladatok/beadasok/${haziFeladatBeadasId}/fajlok/${id}`,
		DeleteSolutionAttachment: (oraiFeladatBeadasId: string, id: string) => `mobil/intezmenyek/tanulok/orak/oraifeladatok/beadasok/${oraiFeladatBeadasId}/fajlok/${id}`,
		GetClasswork: (oraiFeladatId: string) => `mobil/intezmenyek/tanulok/orak/oraifeladatok/${oraiFeladatId}`,
		GetClassworkAttachmentUrl: (oraiFeladatId: string, id: string) => `mobil/intezmenyek/tanulok/orak/oraifeladatok/${oraiFeladatId}/fajlok/${id}/url`,
		GetClassworkAttachments: (id: string) => `mobil/intezmenyek/tanulok/orak/oraifeladatok/${id}/fajlok`,
		GetClassworkGroups: (groupId: string) => `mobil/intezmenyek/tanulok/orak/oraifeladatok/groupok/${groupId}`,
		GetClassworkSolutionAttachmentUrl: (oraiFeladatBeadasId: string, id: string) => `mobil/intezmenyek/tanulok/orak/oraifeladatok/beadasok/${oraiFeladatBeadasId}/fajlok/${id}/url`,
		GetHomeworkSolutionAttachmentUrl: (haziFeladatBeadasId: string, id: string) => `mobil/intezmenyek/tanulok/orak/hazifeladatok/beadasok/${haziFeladatBeadasId}/fajlok/${id}/url`,
		GetHomeworkSolutionAttachments: (haziFeladatBeadasId: string) => `mobil/intezmenyek/tanulok/orak/hazifeladatok/beadasok/${haziFeladatBeadasId}/fajlok`,
		GetLanguageTask: (groupId: string) => `mobil/intezmenyek/tanulok/orak/nyelvifeladatok/${groupId}`,
		GetLanguageTaskSubmission: (groupId: string) => `mobil/intezmenyek/tanulok/orak/nyelvifeladatok/groupok/${groupId}/beadas`,
		GetSolutionAttachments: (beadasId: string) => `mobil/intezmenyek/tanulok/orak/oraifeladatok/beadasok/${beadasId}/fajlok`,
		GetSubmittedClasswork: (oraiFeladatId: string) => `mobil/intezmenyek/tanulok/orak/oraifeladatok/${oraiFeladatId}/beadas`,
		GetSubmittedHomework: (haziFeladatId: string) => `mobil/intezmenyek/tanulok/orak/hazifeladatok/${haziFeladatId}/beadas`,
		PutSaveSolution: (beadasId: string) => `mobil/intezmenyek/tanulok/orak/oraifeladatok/beadasok/${beadasId}`,
		SaveHomeworkAttachment: (haziFeladatBeadasId: string) => `mobil/intezmenyek/tanulok/orak/hazifeladatok/beadasok/${haziFeladatBeadasId}/fajlok/veglegesites`,
		SaveHomeworkSolution: (haziFeladatId: string) => `mobil/intezmenyek/tanulok/orak/hazifeladatok/beadasok/${haziFeladatId}`,
		SaveSolutionAttachment: (oraiFeladatBeadasId: string) => `mobil/intezmenyek/tanulok/orak/oraifeladatok/beadasok/${oraiFeladatBeadasId}/fajlok/veglegesites`,
		SubmitClassworkSolution: (beadasId: string) => `mobil/intezmenyek/tanulok/orak/oraifeladatok/beadasok/${beadasId}/beadas`,
		SubmitHomeworkSolution: (haziFeladatId: string) => `mobil/intezmenyek/tanulok/orak/hazifeladatok/beadasok/${haziFeladatId}/beadas`,
		...DktEndpoints,
	},
	Eugyintezes: {
		CreateRectification: (ugyId: string) => `ugy/kerelmek/${ugyId}`,
		GetAddressableGuardiansForClass: (osztalyKretaAzonosito: string) => `kreta/gondviselok/osztaly/${osztalyKretaAzonosito}`,
		GetCase: (ugyId: string) => `ugy/kerelmek/${ugyId}`,
		GetMessage: (azonosito: string) => `kommunikacio/postaladaelemek/${azonosito}`,
		GetSigner: (kerelemAzonosito: string, kretaAzonosito: string) => `ugy/alkalmazott/${kerelemAzonosito}/${kretaAzonosito}`,
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
		DeleteAnnouncedTest: (uid: number) => `Orarend/BejelentettSzamonkeres/${uid}`,
		DeleteEvaluation: (uid: number) => `OsztalyCsoport/Tanulok/Ertekeles/${uid}`,
		DeleteHomework: (uid: string) => `HaziFeladat/${uid}`,
		DeleteHomeworkAttachment: (uid: string) => `HaziFeladat/Csatolmany/${uid}`,
		DeleteJustification: (uid: string) => `Igazolas/${uid}`,
		GetAnnouncedTest: (uid: number) => `Orarend/BejelentettSzamonkeres/${uid}`,
		GetHomework: (uid: string) => `HaziFeladat/${uid}`,
		GetStudent: (uid: number) => `OsztalyCsoport/Tanulok/${uid}`,
		PutHomework: (uid: string) => `HaziFeladat/${uid}`,
		UpdateEvaluation: (uid: number) => `OsztalyCsoport/Tanulok/Ertekeles/${uid}`,
		...NaploEndpoints,
	},
	Notification: NotificationEndpoints,
};

enum DktApi {
	Host = 'https://kretadktapi.e-kreta.hu',
	Path = '/dktapi/',
}

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
	Key = '21ff6c25-d1da-4a68-a811-c881a6057463',
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
		Host: (institute_code: string) => `https://${institute_code}.e-kreta.hu`,
		...MobileApi,
	},
	Naplo: {
		Host: (institute_code: string) => `https://${institute_code}.e-kreta.hu`,
		...NaploApi,
	},
	Notification: NotificationApi,
};
