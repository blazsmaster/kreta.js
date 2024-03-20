export enum DktEndpoints {
	// DeleteHomeworkSolutionAttachment = '/mobil/intezmenyek/tanulok/orak/hazifeladatok/beadasok/{haziFeladatBeadasId}/fajlok/{id}',
	// DeleteSolutionAttachment = '/mobil/intezmenyek/tanulok/orak/oraifeladatok/beadasok/{oraiFeladatBeadasId}/fajlok/{id}',
	// GetClasswork = '/mobil/intezmenyek/tanulok/orak/oraifeladatok/{oraiFeladatId}',
	// GetClassworkAttachmentUrl = '/mobil/intezmenyek/tanulok/orak/oraifeladatok/{oraiFeladatId}/fajlok/{id}/url',
	// GetClassworkAttachments = '/mobil/intezmenyek/tanulok/orak/oraifeladatok/{id}/fajlok',
	// GetClassworkGroups = '/mobil/intezmenyek/tanulok/orak/oraifeladatok/groupok/{groupId}',
	// GetClassworkSolutionAttachmentUrl = '/mobil/intezmenyek/tanulok/orak/oraifeladatok/beadasok/{oraiFeladatBeadasId}/fajlok/{id}/url',
	GetClassworkTeachingMaterial = 'mobil/intezmenyek/tanulok/orak/tananyagok',
	// GetHomeworkSolutionAttachmentUrl = '/mobil/intezmenyek/tanulok/orak/hazifeladatok/beadasok/{haziFeladatBeadasId}/fajlok/{id}/url',
	// GetHomeworkSolutionAttachments = '/mobil/intezmenyek/tanulok/orak/hazifeladatok/beadasok/{haziFeladatBeadasId}/fajlok',
	// GetLanguageTask = '/mobil/intezmenyek/tanulok/orak/nyelvifeladatok/{groupId}',
	// GetLanguageTaskSubmission = '/mobil/intezmenyek/tanulok/orak/nyelvifeladatok/groupok/{groupId}/beadas',
	// GetSolutionAttachments = '/mobil/intezmenyek/tanulok/orak/oraifeladatok/beadasok/{beadasId}/fajlok',
	// GetSubmittedClasswork = '/mobil/intezmenyek/tanulok/orak/oraifeladatok/{oraiFeladatId}/beadas',
	// GetSubmittedHomework = '/mobil/intezmenyek/tanulok/orak/hazifeladatok/{haziFeladatId}/beadas',
	// PutSaveSolution = '/mobil/intezmenyek/tanulok/orak/oraifeladatok/beadasok/{beadasId}',
	// SaveHomeworkAttachment = '/mobil/intezmenyek/tanulok/orak/hazifeladatok/beadasok/{haziFeladatBeadasId}/fajlok/veglegesites',
	// SaveHomeworkSolution = '/mobil/intezmenyek/tanulok/orak/hazifeladatok/beadasok/{haziFeladatId}',
	// SaveSolutionAttachment = '/mobil/intezmenyek/tanulok/orak/oraifeladatok/beadasok/{oraiFeladatBeadasId}/fajlok/veglegesites',
	// SubmitClassworkSolution = '/mobil/intezmenyek/tanulok/orak/oraifeladatok/beadasok/{beadasId}/beadas',
	// SubmitHomeworkSolution = '/mobil/intezmenyek/tanulok/orak/hazifeladatok/beadasok/{haziFeladatId}/beadas',
}

export enum EugyintezesEndpoints {
	CreateAttachment = 'ideiglenesfajlok',
	// CreateRectification = '/ugy/kerelmek/{ugyId}',
	CreateTmgiCase = 'ugy/kerelmek',
	DeleteMessagePermanently = 'kommunikacio/postaladaelemek/torles',
	GetAccessControlSystemEvents = 'belepteto/kartyaesemenyek/sajat',
	GetAddressableClasses = 'kommunikacio/osztalyok/cimezheto',
	// GetAddressableGuardiansForClass = '/kreta/gondviselok/osztaly/{osztalyKretaAzonosito}',
	GetAddressableSzmkRepesentative = 'kommunikacio/szmkkepviselok/cimezheto',
	GetAddressableType = 'kommunikacio/cimezhetotipusok',
	GetAddresseeType = 'adatszotarak/cimzetttipusok',
	GetAdministrators = 'kreta/alkalmazottak/adminisztrator',
	// GetCase = '/ugy/kerelmek/{ugyId}',
	GetCaseTypes = 'adatszotarak/kerelemtipusok',
	GetCases = 'ugy/kerelmek',
	GetChildData = 'kreta/gyerekemadatok',
	GetClassMasters = 'kreta/alkalmazottak/oszalyfonok',
	GetCurrentInstitutionDetails = 'ugy/aktualisIntezmenyAdatok',
	GetCurrentInstitutionModules = 'intezmenyek/sajat/modulok',
	GetDirectors = 'kreta/alkalmazottak/igazgatosag',
	// GetMessage = '/kommunikacio/postaladaelemek/{azonosito}',
	GetMessageLimitations = 'kommunikacio/uzenetek/kuldhetok/korlat',
	GetMessages = 'kommunikacio/postaladaelemek/sajat',
	// GetSigner = '/ugy/alkalmazott/{kerelemAzonosito}/{kretaAzonosito}',
	GetStatus = 'status',
	GetSzmk = 'kommunikacio/szmkkepviselok/cimezheto',
	GetTeachers = 'kreta/alkalmazottak/tanar',
	GetTmgiCaseTypes = 'adatszotarak/tmgiigazolastipusok',
	GetUnreadMessagesCount = 'kommunikacio/postaladaelemek/olvasatlanokszama',
	ReadMessage = 'kommunikacio/postaladaelemek/olvasott',
	SendMessage = 'kommunikacio/uzenetek',
	SendMessageToBin = 'kommunikacio/postaladaelemek/kuka',
}

export enum GlobalEndpoints {
	GetInstitutes = 'intezmenyek/kreta/publikus',
}

export enum IDPEndpoints {
	ExtendToken = 'connect/token',
	GetNonce = 'nonce',
	Login = 'connect/token',
	RevokeRefreshToken = 'connect/revocation',
}

export enum MobileEndpoints {
	DeleteBankAccountNumber = 'sajat/Bankszamla',
	// DeleteReservation = '/sajat/Fogadoorak/Idopontok/Jelentkezesek/{uid}',
	// DownloadAttachment = '/sajat/Csatolmany/{uid}',
	GetAnnouncedTests = 'sajat/BejelentettSzamonkeresek',
	// GetAnnouncedTestsByDate = 'sajat/BejelentettSzamonkeresek',
	GetClassAverage = 'sajat/Ertekelesek/Atlagok/OsztalyAtlagok',
	GetClassMaster = 'felhasznalok/Alkalmazottak/Tanarok/Osztalyfonokok',
	// GetConsultingHour = '/sajat/Fogadoorak/{uid}',
	GetConsultingHours = 'sajat/Fogadoorak',
	GetDeviceGivenState = 'TargyiEszkoz/IsEszkozKiosztva',
	GetEvaluations = 'sajat/Ertekelesek',
	GetGroups = 'sajat/OsztalyCsoportok',
	GetGuardian4T = 'sajat/GondviseloAdatlap',
	// GetHomework = '/sajat/HaziFeladatok/{id}',
	GetHomeworks = 'sajat/HaziFeladatok',
	GetLEPEvents = 'Lep/Eloadasok',
	GetLesson = 'sajat/OrarendElem',
	GetLessons = 'sajat/OrarendElemek',
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
	PostCovidForm = 'Bejelentes/Covid',
	// PostReservation = '/sajat/Fogadoorak/Idopontok/Jelentkezesek/{uid}',
	PostTeszekRegistration = 'TargyiEszkoz/Regisztracio',
	UpdateGuardian4T = 'sajat/GondviseloAdatlap',
	UpdateLepEventPermission = 'Lep/Eloadasok/GondviseloEngedelyezes',
}

export enum NotificationEndpoints {
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
		GetConsultingHour: (uid: string) => `sajat/Fogadoorak/${uid}`,
		GetHomework: (id: string) => `sajat/HaziFeladatok/${id}`,
		PostReservation: (uid: string) => `sajat/Fogadoorak/Idopontok/Jelentkezesek/${uid}`,
		...MobileEndpoints,
	},
	Notification: NotificationEndpoints,
};

export enum DktApi {
	Host = 'https://kretadktapi.e-kreta.hu',
	Path = '/dktapi/',
}

export enum EugyintezesApi {
	Host = 'https://eugyintezes.e-kreta.hu',
	Path = '/api/v1/',
}

export enum GlobalApi {
	Host = 'https://kretaglobalapi.e-kreta.hu',
	Path = '/',
}

export enum IDPApi {
	Host = 'https://idp.e-kreta.hu',
	Path = '/',
}

export enum MobileApi {
	Path = '/ellenorzo/v3/',
	Key = '21ff6c25-d1da-4a68-a811-c881a6057463',
}

export enum NotificationApi {
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
	Notification: NotificationApi,
};
