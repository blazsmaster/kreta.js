<div align="center">

<h1>
  <br>
  <img src="https://i.imgur.com/Zz8viJd.png" alt="kreta.js" height="80">
</h1>

**Advanced** and **easy-to-use** object-oriented module for the Student, Guardian and Teacher Kreta API.

<p>

[![NPM Version](https://img.shields.io/npm/v/kreta.js?logo=npm&logoColor=4fa5c9&labelColor=1c2128&color=4fa5c9)](https://npmjs.com/package/kreta.js)
[![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/blazsmaster/kreta.js?logo=github&logoColor=4fa5c9&labelColor=1c2128&color=4fa5c9)](https://github.com/blazsmaster/kreta.js/issues)
[![GitHub Issues or Pull Requests](https://img.shields.io/github/issues-pr/blazsmaster/kreta.js?logo=github&logoColor=4fa5c9&labelColor=1c2128&color=4fa5c9)](https://github.com/blazsmaster/kreta.js/pulls)
[![GitHub License](https://img.shields.io/github/license/blazsmaster/kreta.js?labelColor=1c2128&color=4fa5c9)](https://github.com/blazsmaster/kreta.js/blob/main/LICENSE)
[![GitHub Repo stars](https://img.shields.io/github/stars/blazsmaster/kreta.js?style=flat&labelColor=1c2128&color=ffd800)](https://github.com/blazsmaster/kreta.js/stargazers)
![wakatime](https://wakatime.com/badge/user/9672c6af-fc74-4d8a-bad8-3d9fe7171448/project/2cb15fd8-ab5e-4fed-a8f2-80670981867e.svg?labelColor=1c2128&color=4fa5c9)

</p>

<p>

[Disclaimer](#disclaimer) •
[Features](#features) •
[Installation](#installation) •
[Example](#example) •
[Exports](#exports) •
[Methods](#methods) •
[Licence](#license) •
[Issues](#issues) •
[Contributing](#contributing)

</p>

</div>

## Disclaimer

> [!CAUTION]
> This project is not affiliated with the [eKRÉTA Informatikai Zrt.](https://www.e-kreta.hu/).
> This is an unofficial API client for the Kréta Mobile API.
> Use the library at your own risk.
> The author does not take any responsibility for any damage caused by the usage of this library.

## Features

* Object-oriented library
* Easy-to-use methods and classes
* Easy JSON conversion
* Object validation
* TypeScript support

## Installation

Install the module with your favorite package manager.

```shell
$ npm install kreta.js
$ yarn add kreta.js
$ pnpm add kreta.js
```

Build the module from source.

```shell
# Clone the repository
$ git clone https://github.com/blazsmaster/kreta.js.git

# Go to the project directory
$ cd kreta.js

# Install dependencies (with your favorite package manager)
$ npm install

# Build the module
$ npm run build
```

## Example

```javascript
// Import the module (CommonJS)
const { IdpApiV1, MobileApiV3 } = require('./dist');
```

```javascript
// Import the module (ES6)
import { IdpApiV1, MobileApiV3 } from './dist';

// Login with personal credentials
const idp = new IdpApiV1({
  instituteCode: 'pelda-intezmeny',
  password: 'abcd1234',
  username: '1234567890',
});

// Example function implements the login and getStudent methods
async function tanuloNeve() {
  // Obtain the access token
  await idp.login().then(async (tokenObj) => {
    // Create a new MobileApiV3 instance for the student API
    const api = new MobileApiV3({
      // Use the institute code from the IdpApiV1 instance (optional, but recommended)
      instituteCode: idp.instituteCode,
      // Use the access token from the response
      accessToken: tokenObj.access_token,
    });

    // Get the student data
    await api.getStudent().then((tanulo) => {
      // Every method has a `json` property to return parsed and validated data
      console.log(tanulo.json);
      // Returns the student's name
      return tanulo.Nev;
    });
  });
}

console.log(await tanuloNeve()); // Minta János
```

## Exports

### Classes

* `EAdminApiV1` - E-Ügyintézés API methods

  ```javascript
  new EAdminApiV1({
    accessToken: '',
  });
  ```

  * Params:
    * `accessToken` – Access token obtained from IdpApiV1.login() or IdpApiV1.extendToken() or manually

* `GlobalApiV1` - Global API methods (unauthorized access)

  ```javascript
  new GlobalApiV1();
  ```

* `IdpApiV1` - Authentication API *(& util)* methods

  ```javascript
  new IdpApiV1({
    instituteCode: '',
    password: '',
    username: '',
  });
  ```

  * Params:
    * `instituteCode` – Unique institute code *`string`*
    * `password` – Kreta password *`string`*
    * `username` – Kreta username *`string`*

* `MobileApiV3` - Student and Guardian API methods

  ```javascript
  new MobileApiV3({
    instituteCode: '',
    accessToken: '',
  });
  ```

  * Params:
    * `instituteCode` – Unique institute code *`string`*
    * `accessToken` – Access token obtained from IdpApiV1.login() or IdpApiV1.extendToken() or manually
    * `tokenType` – Access token type (optional) *`string`*

* `NaploApiV3` - Teacher API methods

  ```javascript
  new NaploApiV3({
    instituteCode: '',
    accessToken: '',
  });
  ```

  * Params:
    * `instituteCode` – Unique institute code *`string`*
    * `accessToken` – Access token obtained from IdpApiV1.login() or IdpApiV1.extendToken() or manually

### Functions

* `createKretaInsult` - Generate a random Kreta insult based on the famous "DirtyWords.xml" file

  ```javascript
  createKretaInsult('');
  ```

  * Args:
    * `prefix` - Prefix of the insult (optional) *`string`* (default: "Te")

### Namespaces and Interfaces

* `EAdminApiTypes` - E-Ügyintézés API types
* `GlobalApiTypes` - Global API types
* `IdpApiTypes` - Authentication API types
* `MobileApiTypes` - Student and Guardian API types
* `NaploApiTypes` - Teacher API types


* `DateFilter` - Date filter interface
* `TimeTableDateFilter` - Time table date filter interface

## Methods

### `IdpApiV1`

* `getNonce` – Query nonce

  ```javascript
  idp.getNonce();
  ```

  * Returns: `Promise<string>`

* `login` – Query token information

  ```javascript
  idp.login();
  ```

  * Returns: [`Promise<AuthenticationDto>`](./src/models/IDP/AuthenticationDto.ts)

* `extendToken` – Renews the access token

  ```javascript
  idp.extendToken({
    instituteCode: '',
    refreshToken: '',
    refreshUserData: true,
    username: '',
    accessToken: '',
    tokenType: '',
  });
  ```

  * Params:
    * `instituteCode` – Unique institute code *`string`*
    * `refreshToken` – Refresh token *`string`*
    * `refreshUserData` – Refresh user data *`boolean`*
    * `username` – Kreta username *`string`*
    * `accessToken` – Access token (optional) *`string`*
    * `tokenType` – Token type (optional) *`string`*

  * Returns: [`Promise<AuthenticationDto>`](./src/models/IDP/AuthenticationDto.ts)

* `revokeRefreshToken` – Revokes the refresh token

  ```javascript
  idp.revokeRefreshToken('');
  ```

  * Args:
    * `token` – Refresh token *`string`*

  * Returns: `Promise<void>`

* `isValidToken` – Checks if the token is valid

  ```javascript
  idp.isValidToken('');
  ```

  * Args:
    * `token` – Token *`string`*

  * Returns: `boolean`

* `resolveTokenData` – Resolves the token data

  ```javascript
  idp.resolveTokenData('');
  ```

  * Args:
    * `token` – Token *`string`*

  * Returns: [`TokenDto`](./src/models/IDP/TokenDto.ts)

### `GlobalApiV1`

* `getGlobalConfigurationDescriptors` – Query global configuration descriptors

  ```javascript
  globalApi.getGlobalConfigurationDescriptors();
  ```

  * Returns: `Promise<Record<string, string>>`

* `getInstitutesV1` – Query all institutes *(old version)*

  ```javascript
  globalApi.getInstitutesV1();
  ```

  * Returns: [`Promise<Array<InstituteV1Dto>>`](./src/models/GlobalApi/InstituteV1Dto.ts)

* `getInstitutes` – Query all institutes

  ```javascript
  globalApi.getInstitutes();
  ```

  * Returns: [`Promise<Array<InstituteDto>>`](./src/models/GlobalApi/InstituteDto.ts)

### `MobileApiV3`

* `deleteBankAccountNumber` – Deletes student's bank account data

  ```javascript
  mobileApi.deleteBankAccountNumber();
  ```

  * Returns: `Promise<void>`

* `deleteReservation` – Cancels reservation for a scheduled consultation hour

  ```javascript
  mobileApi.deleteReservation('');
  ```

  * Args:
    * `uid` – Consultation hour unique identifier *`string`*

  * Returns: `Promise<void>`

* `downloadAttachment` – Downloads an attachment

  ```javascript
  mobileApi.downloadAttachment('');
  ```

  * Args:
    * `uid` – Attachment unique identifier *`string`*

  * Returns: `Promise<Blob>`

* `getAnnouncedTests` – Retrieves announced tests within a specified date range

  ```javascript
  mobileApi.getAnnouncedTests({
    startDate: 'YYYY-MM-DD',
    endDate: 'YYYY-MM-DD',
  });
  ```

  * Params:
    * `startDate` – Start date (optional) *`string`*
    * `endDate` – End date (optional) *`string`*

  * Returns: [`Promise<Array<AnnouncedTestDto>>`](./src/models/MobileApi/AnnouncedTestDto.ts)

* `getAnnouncedTest` – Retrieves details of an announced test by its unique identifier

  ```javascript
  mobileApi.getAnnouncedTest('');
  ```

  * Args:
    * `uid` – Announced test unique identifier *`string`*

  * Returns: [`Promise<AnnouncedTestDto>`](./src/models/MobileApi/AnnouncedTestDto.ts)

* `getAnnouncedTestsByUids` – Retrieves announced tests by their unique identifiers

  ```javascript
  mobileApi.getAnnouncedTestsByUids(['']);
  ```

  * Args:
    * `uids` – Announced test unique identifiers *`string | Array<string>`*

  * Returns: [`Promise<Array<AnnouncedTestDto>>`](./src/models/MobileApi/AnnouncedTestDto.ts)

* `getClassAverage` – Retrieves class averages for subjects

  ```javascript
  mobileApi.getClassAverage('');
  ```

  * Args:
    * `oktatasiNevelesiFeladatUid` – Educational task unique identifier *`string`*
    * `tantargyUid` – Subject unique identifier (optional) *`string`*

  * Returns: [`Promise<Array<ClassAverageDto>>`](./src/models/MobileApi/ClassAverageDto.ts)

* `getClassMaster` – Retrieves class masters by their unique identifiers

  ```javascript
  mobileApi.getClassMaster(['']);
  ```

  * Args:
    * `uids` – Class master unique identifiers *`string | Array<string>`*

  * Returns: [`Promise<Array<ClassMasterDto>>`](./src/models/MobileApi/ClassMasterDto.ts)

* `getConsultingHour` – Retrieves consulting hour details for guardians

  ```javascript
  mobileApi.getConsultingHour('');
  ```

  * Args:
    * `uid` – Consulting hour unique identifier *`string`*

  * Returns: [`Promise<ConsultingHourDto>`](./src/models/MobileApi/ConsultingHourDto.ts)

* `getConsultingHours` – Retrieves consulting hours for guardians within a specified date range

  ```javascript
  mobileApi.getConsultingHours({
    startDate: 'YYYY-MM-DD',
    endDate: 'YYYY-MM-DD',
  });
  ```

  * Params:
    * `startDate` – Start date (optional) *`string`*
    * `endDate` – End date (optional) *`string`*

  * Returns: [`Promise<Array<ConsultingHourDto>>`](./src/models/MobileApi/ConsultingHourDto.ts)

* `getDeviceGivenState` – Checks if a device has been allocated to the student

  ```javascript
  mobileApi.getDeviceGivenState();
  ```

  * Returns: `Promise<boolean>`

* `getEvaluations` – Retrieves student's evaluations within a specified date range

  ```javascript
  mobileApi.getEvaluations({
    startDate: 'YYYY-MM-DD',
    endDate: 'YYYY-MM-DD',
  });
  ```

  * Params:
    * `startDate` – Start date *`string`*
    * `endDate` – End date *`string`*

  * Returns: [`Promise<Array<EvaluationDto>>`](./src/models/MobileApi/EvaluationDto.ts)

* `getEvaluation` – Retrieves details of an evaluation by its unique identifier

  ```javascript
  mobileApi.getEvaluation('');
  ```

  * Args:
    * `uid` – Evaluation unique identifier *`string`*

  * Returns: [`Promise<EvaluationDto>`](./src/models/MobileApi/EvaluationDto.ts)

* `getCertificateEvaluations` – Retrieves student's certificate evaluations

  ```javascript
  mobileApi.getCertificateEvaluations();
  ```

  * Returns: [`Promise<Array<EvaluationDto>>`](./src/models/MobileApi/EvaluationDto.ts)

* `getNonCertificateEvaluations` – Retrieves student's non-certificate evaluations

  ```javascript
  mobileApi.getNonCertificateEvaluations();
  ```

  * Returns: [`Promise<Array<EvaluationDto>>`](./src/models/MobileApi/EvaluationDto.ts)

* `getGroups` – Retrieves groups and classes associated with the student

  ```javascript
  mobileApi.getGroups();
  ```

  * Returns: [`Promise<Array<GroupDto>>`](./src/models/MobileApi/GroupDto.ts)

* `getGuardian4T` – Retrieves guardian's information

  ```javascript
  mobileApi.getGuardian4T();
  ```

  * Returns: [`Promise<Guardian4TDto>`](./src/models/MobileApi/Guardian4TDto.ts)

* `getHomework` – Retrieves homework details by its unique identifier

  ```javascript
  mobileApi.getHomework('');
  ```

  * Args:
    * `uid` – Homework unique identifier *`string`*

  * Returns: [`Promise<HomeworkDto>`](./src/models/MobileApi/HomeworkDto.ts)

* `getHomeworks` – Retrieves homework within a specified date range

  ```javascript
  mobileApi.getHomeworks({
    startDate: 'YYYY-MM-DD',
    endDate: 'YYYY-MM-DD',
  });
  ```

  * Params:
    * `startDate` – Start date *`string`*
    * `endDate` – End date *`string`*

  * Returns: [`Promise<Array<HomeworkDto>>`](./src/models/MobileApi/HomeworkDto.ts)

* `getLEPEvents` – Retrieves Lázár Ervin Program events

  ```javascript
  mobileApi.getLEPEvents();
  ```

  * Returns: [`Promise<Array<LEPEventDto>>`](./src/models/MobileApi/LepEventDto.ts)

* `getLesson` – Retrieves lesson details by its unique identifier

  ```javascript
  mobileApi.getLesson('');
  ```

  * Args:
    * `orarendElemUid` – Lesson unique identifier *`string`*

  * Returns: [`Promise<LessonDto>`](./src/models/MobileApi/LessonDto.ts)

* `getLessons` – Retrieves lessons within a specified date range

  ```javascript
  mobileApi.getLessons({
    startDate: 'YYYY-MM-DD',
    endDate: 'YYYY-MM-DD',
  });
  ```

  * Params:
    * `startDate` – Start date *`string`*
    * `endDate` – End date *`string`*

  * Returns: [`Promise<Array<LessonDto>>`](./src/models/MobileApi/LessonDto.ts)

* `getNotes` – Retrieves notes created by teachers during lessons within a specified date range

  ```javascript
  mobileApi.getNotes({
    startDate: 'YYYY-MM-DD',
    endDate: 'YYYY-MM-DD',
  });
  ```

  * Params:
    * `startDate` – Start date *`string`*
    * `endDate` – End date *`string`*

  * Returns: [`Promise<Array<NoteDto>>`](./src/models/MobileApi/NoteDto.ts)

* `getNote` – Retrieves a note by its unique identifier

  ```javascript
  mobileApi.getNote('');
  ```

  * Args:
    * `uid` – Note unique identifier *`string`*

  * Returns: [`Promise<NoteDto>`](./src/models/MobileApi/NoteDto.ts)

* `getNoticeBoardItems` – Retrieves notice board items visible to the student

  ```javascript
  mobileApi.getNoticeBoardItems();
  ```

  * Returns: [`Promise<Array<NoticeBoardItemDto>>`](./src/models/MobileApi/NoticeBoardItemDto.ts)

* `getOmissions` – Retrieves student's absences within a specified date range

  ```javascript
  mobileApi.getOmissions({
    startDate: 'YYYY-MM-DD',
    endDate: 'YYYY-MM-DD',
  });
  ```

  * Params:
    * `startDate` – Start date (optional) *`string`*
    * `endDate` – End date (optionAl) *`string`*

  * Returns: [`Promise<Array<OmissionDto>>`](./src/models/MobileApi/OmissionDto.ts)

* `getOmission` – Retrieves absence details by its unique identifier

  ```javascript
  mobileApi.getOmission('');
  ```

  * Args:
    * `uid` – Absence unique identifier *`string`*

  * Returns: [`Promise<OmissionDto>`](./src/models/MobileApi/OmissionDto.ts)

* `getRegistrationState` – Checks if the guardian has registered

  ```javascript
  mobileApi.getRegistrationState();
  ```

  * Returns: `Promise<boolean>`

* `getSchoolYearCalendar` – Retrieves school year calendar entries

  ```javascript
  mobileApi.getSchoolYearCalendar();
  ```

  * Returns: [`Promise<Array<SchoolYearCalendarDto>>`](./src/models/MobileApi/SchoolYearCalendarEntryDto.ts)

* `getStudent` – Retrieves student's information

  ```javascript
  mobileApi.getStudent();
  ```

  * Returns: [`Promise<StudentDto>`](./src/models/MobileApi/StudentDto.ts)

* `getSubjectAverage` – Retrieves subject averages for the student

  ```javascript
  mobileApi.getSubjectAverage('');
  ```

  * Args:
    * `oktatasiNevelesiFeladatUid` – Educational task unique identifier *`string`*

  * Returns: [`Promise<Array<SubjectAverageDto>>`](./src/models/MobileApi/SubjectAverageDto.ts)

* `getTeszekRegistration` – Retrieves information regarding requested guardian devices

  ```javascript
  mobileApi.getTeszekRegistration();
  ```

  * Returns: [`Promise<TeszekRegistrationDto>`](./src/models/MobileApi/TeszekRegistrationDto.ts)

* `getTimeTableWeeks` – Retrieves timetable week entries

  ```javascript
  mobileApi.getTimeTableWeeks({
    startDate: 'YYYY-MM-DD',
    endDate: 'YYYY-MM-DD',
  });
  ```

  * Params:
    * `startDate` – Start date *`string`*
    * `endDate` – End date *`string`*

  * Returns: [`Promise<Array<TimeTableWeekDto>>`](./src/models/MobileApi/TimeTableWeekDto.ts)

* `getInstitution` – Retrieves information about the institution

  ```javascript
  mobileApi.getInstitution();
  ```

  * Returns: [`Promise<InstitutionDto>`](./src/models/MobileApi/InstitutionDto.ts)

* `getDailyNotificationSummary` – Retrieves a summary of daily notifications

  ```javascript
  mobileApi.getDailyNotificationSummary();
  ```

  * Returns: [`Promise<DailyNotificationSummaryDto>`](./src/models/MobileApi/DailyNotificationSummaryDto.ts)

* `getGuardianIsLegalRepresentative` – Checks if the guardian is a legal representative

  ```javascript
  mobileApi.getGuardianIsLegalRepresentative();
  ```

  * Returns: `Promise<boolean>`

* `postBankAccountNumber` – Posts student's bank account number

  ```javascript
  mobileApi.postBankAccountNumber({
    BankszamlaSzam: '',
    BankszamlaTulajdonosNeve: '',
    BankszamlaTulajdonosTipusId: 0,
    SzamlavezetoBank: '',
  });
  ```

  * Params:
    * `BankszamlaSzam` – Bank account number *`string`*
    * `BankszamlaTulajdonosNeve` – Bank account owner's name *`string`*
    * `BankszamlaTulajdonosTipusId` – Bank account owner's type identifier *`number`*
    * `SzamlavezetoBank` – Bank name *`string`*

  * Returns: `Promise<void>`

* `postContact` – Posts contact information for the student or guardian

  ```javascript
  mobileApi.postContact('', '');
  ```

  * Args:
    * `email` – Email address *`string`*
    * `phoneNumber` – Phone number *`string`*

  * Returns: `Promise<void>`

* `postCovidReport` – Reports a COVID infection

  ```javascript
  mobileApi.postCovidReport();
  ```

  * Returns: `Promise<void>`

* `postReservation` – Registers for a scheduled consultation hour

  ```javascript
  mobileApi.postReservation('');
  ```

  * Args:
    * `uid` – Consultation hour unique identifier *`string`*

  * Returns: `Promise<void>`

* `postTeszekRegistration` – Posts required data for guardian device requests

  ```javascript
  mobileApi.postTeszekRegistration({
    SzuletesiDatum: 'YYYY-MM-DD',
    Utonev: '',
    SzuletesiUtonev: '',
    IsElfogadottAszf: true,
    AnyjaUtonev: '',
    AnyjaVezeteknev: '',
    Elotag: '',
    SzuletesiHely: '',
    Vezeteknev: '',
    SzuletesiVezeteknev: '',
  });
  ```

  * Params:
    * `SzuletesiDatum` – Birth date *`Date`*
    * `Utonev` – Last name *`string`*
    * `SzuletesiUtonev` – Birth last name *`string`*
    * `IsElfogadottAszf` – Is accepted ASZF *`boolean`*
    * `AnyjaUtonev` – Mother's last name *`string`*
    * `AnyjaVezeteknev` – Mother's first name *`string`*
    * `Elotag` – Prefix *`string`*
    * `SzuletesiHely` – Birth place *`string`*
    * `Vezeteknev` – First name *`string`*
    * `SzuletesiVezeteknev` – Birth first name *`string`*

  * Returns: `Promise<void>`

* `updateGuardian4T` – Updates guardian 4T data

  ```javascript
  mobileApi.updateGuardian4T({
    SzuletesiDatum: 'YYYY-MM-DD',
    Utonev: '',
    SzuletesiUtonev: '',
    IsElfogadottAszf: true,
    AnyjaUtonev: '',
    AnyjaVezeteknev: '',
    Elotag: '',
    SzuletesiHely: '',
    Vezeteknev: '',
    SzuletesiVezeteknev: '',
  });
  ```

  * Params:
    * `SzuletesiDatum` – Birth date *`Date`*
    * `Utonev` – Last name *`string`*
    * `SzuletesiUtonev` – Birth last name *`string`*
    * `IsElfogadottAszf` – Is accepted ASZF *`boolean`*
    * `AnyjaUtonev` – Mother's last name *`string`*
    * `AnyjaVezeteknev` – Mother's first name *`string`*
    * `Elotag` – Prefix *`string`*
    * `SzuletesiHely` – Birth place *`string`*
    * `Vezeteknev` – First name *`string`*
    * `SzuletesiVezeteknev` – Birth first name *`string`*

  * Returns: `Promise<void>`

* `updateLepEventPermission` – Updates permission for Lázár Ervin Program events

  ```javascript
  mobileApi.updateLepEventPermission({
	  EloadasId: 0,
	  Dontes: true,
  });
  ```

  * Params:
    * `EloadasId` – Lecture identifier *`number`*
    * `Dontes` – Decision (optional) *`boolean`*

  * Returns: `Promise<void>`

### `EAdminApiV1`

* `createAttachment` – Creates an attachment

  ```javascript
  eAdminApi.createAttachment(Buffer.from(''));
  ```

  * Args:
    * `part` – Attachment data *`Buffer | string`*

  * Returns: `Promise<TemporaryFileDto>`

* `createRectification` – Creates a rectification

  ```javascript
  eAdminApi.createRectification('', {
    azonosito: '',
    tipus: {},
    tipusKod: '',
    csatolmanyok: [],
    statusz: {},
  });
  ```

  * Args:
    * `ugyId` – Case unique identifier *`string`*
    * `body` – Rectification data [*`RectificationPost`*](./src/models/EAdminApi/RectificationPostDto.ts)

  * Params `body`:
    * `azonosito` – Identifier *`string`*
    * `tipus` – Type [*`Type`*](./src/models/EAdminApi/TypeDto.ts)
    * `tipusKod` – Type code *`string`*
    * `csatolmanyok` – Attachments [*`Array<OtherThingsToDoAttachments>`*](./src/models/EAdminApi/OtherThingsToDoAttachmentsDto.ts)
    * `statusz` – Status [*`State`*](./src/models/EAdminApi/StateDto.ts)

  * Returns: `Promise<any>`

* `createTmgiCase` – Creates a TMGI case

  ```javascript
  eAdminApi.createTmgiCase({
    igazolasTipus: {},
    tanuloOsztaly: '',
    igazoltTavolletVegeDatum: 'YYYY-MM-DD',
    kerelemKotelezoDokumentumLista: [],
    csatolmanyok: [],
    igazoltTavolletKezdeteDatum: 'YYYY-MM-DD',
    tanuloCsaladiNev: '',
    tanuloKeresztNev: '',
    tipus: {},
    tipusKod: '',
  });
  ```

  * Params:
    * `igazolasTipus` – Confirmation type [*`Type`*](./src/models/EAdminApi/TypeDto.ts)
    * `tanuloOsztaly` – Student class *`string`*
    * `igazoltTavolletVegeDatum` – End date of the justified absence *`Date`*
    * `kerelemKotelezoDokumentumLista` – List of mandatory documents [*`Array<ApplicationMandatoryDocument>`*](./src/models/EAdminApi/ApplicationMandatoryDocumentDto.ts)
    * `csatolmanyok` – Attachments [*`Array<OtherThingsToDoAttachments>`*](./src/models/EAdminApi/OtherThingsToDoAttachmentsDto.ts)
    * `igazoltTavolletKezdeteDatum` – Start date of the justified absence *`Date`*
    * `tanuloCsaladiNev` – Student's last name *`string`*
    * `tanuloKeresztNev` – Student's first name *`string`*
    * `tipus` – Type [*`Type`*](./src/models/EAdminApi/TypeDto.ts)
    * `tipusKod` – Type code *`string`*

  * Returns: `Promise<any>`

* `deleteMessagePermanently` – Deletes a message permanently

  ```javascript
  eAdminApi.deleteMessagePermanently([''], true);
  ```

  * Args:
    * `postaladaElemAzonositok` – Mailbox item unique identifiers *`Array<number | string>`*
    * `isKuka` – Is trash (optional) *`boolean`*

  * Returns: `Promise<any>`

* `getAccessControlSystemEvents` – Retrieves access control system events

  ```javascript
  eAdminApi.getAccessControlSystemEvents();
  ```

  * Returns: [`Promise<Array<AccessControlSystemItemDto>`](./src/models/EAdminApi/AccessControlSystemItemDto.ts)

* `getAddressableClasses` – Retrieves addressable classes

  ```javascript
  eAdminApi.getAddressableClasses('');
  ```

  * Args:
    * `cimzettKod` – Recipient code *`string`*

  * Returns: [`Promise<Array<KretaClassDto>`](./src/models/MobileApi/KretaClassDto.ts)

* `getAddressableGuardiansForClass` – Retrieves addressable guardians for a class

  ```javascript
  eAdminApi.getAddressableGuardiansForClass('');
  ```

  * Args:
    * `osztalyKretaAzonosito` – Class unique identifier *`number | string`*

  * Returns: [`Promise<Array<GuardianEAdminDto>`](./src/models/MobileApi/GuardianEAdminDto.ts)

* `getAddressableSzmkRepesentative` – Retrieves addressable SZMK representative

  ```javascript
  eAdminApi.getAddressableSzmkRepesentative();
  ```

  * Returns: [`Promise<Array<GuardianEAdminDto>`](./src/models/MobileApi/GuardianEAdminDto.ts)

* `getAddressableType` – Retrieves addressable type

  ```javascript
  eAdminApi.getAddressableType();
  ```

  * Returns: [`Promise<Array<AddresseeTypeDto>`](./src/models/EAdminApi/AddresseeTypeDto.ts)

* `getAddresseeType` – Retrieves addressee type

  ```javascript
  eAdminApi.getAddresseeType();
  ```

  * Returns: [`Promise<Array<AddresseeTypeDto>`](./src/models/EAdminApi/AddresseeTypeDto.ts)

* `getAdministrators` – Retrieves administrators

  ```javascript
  eAdminApi.getAdministrators();
  ```

  * Returns: [`Promise<Array<EmployeeDetailsDto>`](./src/models/EAdminApi/EmployeeDetailsDto.ts)

* `getCase` – Retrieves a case

  ```javascript
  eAdminApi.getCase('');
  ```

  * Args:
    * `ugyId` – Case unique identifier *`string`*

  * Returns: [`Promise<CaseDto>`](./src/models/EAdminApi/CaseDto.ts)

* `getCaseTypes` – Retrieves case types

  ```javascript
  eAdminApi.getCaseTypes();
  ```

  * Returns: [`Promise<Array<TypeDto>`](./src/models/EAdminApi/TypeDto.ts)

* `getCases` – Retrieves cases

  ```javascript
  eAdminApi.getCases(true);
  ```

  * Args:
    * `isLezartakIs` – Is closed (optional) *`boolean`*

  * Returns: [`Promise<Array<CaseDto>`](./src/models/EAdminApi/CaseDto.ts)

* `getChildData` – Retrieves child data

  ```javascript
  eAdminApi.getChildData();
  ```

  * Returns: [`Promise<ChildDto>`](./src/models/EAdminApi/ChildDto.ts)

* `getClassMasters` – Retrieves class masters

  ```javascript
  eAdminApi.getClassMasters();
  ```

  * Returns: [`Promise<Array<EmployeeDetailsDto>`](./src/models/EAdminApi/EmployeeDetailsDto.ts)

* `getCurrentInstitutionDetails` – Retrieves current institution details

  ```javascript
  eAdminApi.getCurrentInstitutionDetails();
  ```

  * Returns: [`Promise<CurrentInstitutionDetailsDto>`](./src/models/EAdminApi/CurrentInstitutionDetailsDto.ts)

* `getCurrentInstitutionModules` – Retrieves current institution modules

  ```javascript
  eAdminApi.getCurrentInstitutionModules();
  ```

  * Returns: `Promise<Array<string>`

* `getDirectors` – Retrieves directors

  ```javascript
  eAdminApi.getDirectors();
  ```

  * Returns: [`Promise<Array<EmployeeDetailsDto>`](./src/models/EAdminApi/EmployeeDetailsDto.ts)

* `getMessage` – Retrieves a message

  ```javascript
  eAdminApi.getMessage('');
  ```

  * Args:
    * `azonosito` – Message unique identifier *`number | string`*

  * Returns: [`Promise<MailboxItemDto>`](./src/models/EAdminApi/MailboxItemDto.ts)

* `getMessageLimitations` – Retrieves message limitations

  ```javascript
  eAdminApi.getMessageLimitations();
  ```

  * Returns: [`Promise<MessageLimitationsDto>`](./src/models/EAdminApi/MessageLimitationsDto.ts)

* `getMessages` – Retrieves messages

  ```javascript
  eAdminApi.getMessages();
  ```

  * Returns: [`Promise<Array<MailboxItemDto>`](./src/models/EAdminApi/MailboxItemDto.ts)

* `getSigner` – Retrieves a signer

  ```javascript
  eAdminApi.getSigner('', '');
  ```

  * Args:
    * `kerelemAzonosito` – Request unique identifier *`number | string`*
    * `kretaAzonosito` – Kreta identifier *`number | string`*

  * Returns: [`Promise<SignerDto>`](./src/models/EAdminApi/SignerDto.ts)

* `getStatus` – Retrieves status

  ```javascript
  eAdminApi.getStatus();
  ```

  * Returns: [`Promise<StatusDto>`](./src/models/EAdminApi/StatusDto.ts)

* `getSzmk` – Retrieves SZMK

  ```javascript
  eAdminApi.getSzmk();
  ```

  * Returns: [`Promise<Array<GuardianDto>`](./src/models/MobileApi/GuardianDto.ts)

* `getTeachers` – Retrieves teachers

  ```javascript
  eAdminApi.getTeachers();
  ```

  * Returns: [`Promise<Array<EmployeeDetailsDto>`](./src/models/EAdminApi/EmployeeDetailsDto.ts)

* `getTmgiCaseTypes` – Retrieves TMGI case types

  ```javascript
  eAdminApi.getTmgiCaseTypes();
  ```

  * Returns: [`Promise<Array<TypeDto>`](./src/models/EAdminApi/TypeDto.ts)

* `getUnreadMessagesCount` – Retrieves unread messages count

  ```javascript
  eAdminApi.getUnreadMessagesCount();
  ```

  * Returns: `Promise<number>`

* `readMessage` – Reads a message

  ```javascript
  eAdminApi.readMessage({
    postaladaElemAzonositok: [],
    isKuka: true,
  });
  ```

  * Args:
    * `body` – Read message request fields [*`ReadMessageRequest`*](./src/models/EAdminApi/ReadMessageRequestDto.ts)

  * Params:
    * `postaladaElemAzonositok` – Mailbox item unique identifiers *`Array<number>`*
    * `isKuka` – Is trash *`boolean`*

  * Returns: `Promise<any>`

* `sendMessage` – Sends a message

  ```javascript
  eAdminApi.sendMessage({
    cimzettLista: [],
    csatolmanyok: [],
    azonosito: 0,
    feladoNev: '',
    feladoTitulus: '',
    kuldesDatum: new Date(),
    targy: '',
    szoveg: '',
    elozoUzenetAzonosito: 0,
  });
  ```

  * Args:
    * `body` – Message fields [*`Message`*](./src/models/EAdminApi/MessageDto.ts)

  * Params `body`:
    * `cimzettLista` – Recipient list [*`Array<AddresseeDto>`*](./src/models/EAdminApi/AddresseeDto.ts)
    * `csatolmanyok` – Attachments [*`Array<AttachmentDto>`*](./src/models/EAdminApi/AttachmentDto.ts)
    * `azonosito` – Identifier *`number`*
    * `feladoNev` – Sender name *`string`*
    * `feladoTitulus` – Sender title *`string`*
    * `kuldesDatum` – Sending date *`Date`*
    * `targy` – Subject *`string`*
    * `szoveg` – Text *`string`*
    * `elozoUzenetAzonosito` – Previous message identifier *`number`*

  * Returns: `Promise<any>`

* `sendMessageToBin` – Sends a message to the bin

  ```javascript
  eAdminApi.sendMessageToBin({
    isKuka: true,
    postaladaElemAzonositoLista: [],
  });
  ```

  * Args:
    * `body` – Send message to bin request fields [*`SendMessageToBinRequest`*](./src/models/EAdminApi/SendMessageToBinRequestDto.ts)

  * Params `body`:
    * `isKuka` – Is trash *`boolean`*
    * `postaladaElemAzonositoLista` – Mailbox item unique identifiers *`Array<number>`*

  * Returns: `Promise<any>`

### `NaploApiV3`

* `getEvaluationMode` – Retrieves evaluation mode

  ```javascript
  naploApi.getEvaluationMode('');
  ```

  * Args:
    * `enumTipus` – Enum type *`string`*

  * Returns: [`Promise<Array<EvaluationModeDto>>`](./src/models/NaploApi/EvaluationModeDto.ts)

* `getHomework` – Retrieves homework

  ```javascript
  naploApi.getHomework('');
  ```

  * Args:
    * `uid` – Homework unique identifier *`string | number`*

  * Returns: [`Promise<HomeworkGetDto>`](./src/models/NaploApi/HomeworkGetDto.ts)

* `postHomework` – Posts homework

  ```javascript
  naploApi.postHomework({
	  OsztalyCsoportId: 0,
	  HataridoDatuma: 'YYYY-MM-DD',
  	Szoveg: '',
	  OraDatum: 'YYYY-MM-DD',
	  TantargyId: 0,
  });
  ```

  * Args:
    * `body` – Homework fields [*`HomeworkPostFields`*](./src/models/NaploApi/HomeworkPostDto.ts)

  * Params `body`:
    * `OsztalyCsoportId` – Class group identifier *`number`*
    * `HataridoDatuma` – Deadline date *`Date`*
    * `Szoveg` – Text *`string`*
    * `OraDatum` – Hour date *`Date`*
    * `TantargyId` – Subject identifier *`number`*

  * Returns: `Promise<number>`

* `putHomework` – Updates homework

  ```javascript
  naploApi.putHomework('', {
    HataridoDatuma: 'YYYY-MM-DD',
    Szoveg: '',
  });
  ```

  * Args:
    * `uid` – Homework unique identifier *`string | number`*
    * `body` – Homework fields [*`HomeworkPutFields`*](./src/models/NaploApi/HomeworkPutDto.ts)

  * Params `body`:
    * `HataridoDatuma` – Deadline date *`Date`*
    * `Szoveg` – Text *`string`*

  * Returns: `Promise<void>`

* `deleteHomework` – Deletes homework

  ```javascript
  naploApi.deleteHomework('');
  ```

  * Args:
    * `uid` – Homework unique identifier *`string | number`*

  * Returns: `Promise<void>`

* `deleteHomeworkAttachment` – Deletes homework attachment

  ```javascript
  naploApi.deleteHomeworkAttachment('');
  ```

  * Args:
    * `uid` – Homework unique identifier *`string | number`*

  * Returns: `Promise<void>`

* `getJustification` – Retrieves justification

  ```javascript
  naploApi.getJustification('');
  ```

  * Args:
    * `tanuloId` – Student identifier *`number | string`*

  * Returns: [`Promise<JustificationDto>`](./src/models/NaploApi/JustificationDto.ts)

* `postJustification` – Posts justification

  ```javascript
  naploApi.postJustification({
    TanuloId: 0,
    OsztalyCsoportId: 0,
    IgazolasKezdete: 'YYYY-MM-DD',
    IgazolasVege: 'YYYY-MM-DD',
    IgazolasTipus: '',
    IgazolasMegjegyzes: '',
  });
  ```

  * Args:
    * `body` – Justification fields [*`JustificationPostFields`*](./src/models/NaploApi/JustificationPostDto.ts)

  * Params `body`:
    * `TanuloId` – Student identifier *`number`*
    * `OsztalyCsoportId` – Class group identifier *`number`*
    * `IgazolasKezdete` – Justification start date *`Date`*
    * `IgazolasVege` – Justification end date *`Date`*
    * `IgazolasTipus` – Justification type *`string`*
    * `IgazolasMegjegyzes` – Justification comment *`string`*

  * Returns: `Promise<void>`

* `deleteJustification` – Deletes justification

  ```javascript
  naploApi.deleteJustification('');
  ```

  * Args:
    * `uid` – Justification unique identifier *`string`*

  * Returns: `Promise<void>`

* `getSchoolGuard` – Retrieves school guard

  ```javascript
  naploApi.getSchoolGuard();
  ```

  * Returns: [`Promise<Array<SchoolGuardDto>`](./src/models/NaploApi/SchoolGuardDto.ts)

* `getNotes` – Retrieves notes

  ```javascript
  naploApi.getNotes();
  ```

  * Returns: [`Promise<Array<StudentNotesDto>`](./src/models/NaploApi/StudentNotesDto.ts)

* `getTimetable` – Retrieves timetable

  ```javascript
  naploApi.getTimetable({
    datumTol: 'YYYY-MM-DD',
    datumIg: 'YYYY-MM-DD',
  });
  ```

  * Args:
    * `df` – Timetable date filter *`DateFilter`*

  * Params `df`:
    * `orarendElemKezdoNapDatuma` – Timetable start date *`Date`*
    * `orarendElemVegNapDatuma` – Timetable end date *`Date`*

  * Returns: [`Promise<Array<TimetableElementDto>`](./src/models/NaploApi/TimetableElementDto.ts)

* `getTimetableElement` – Retrieves timetable element

  ```javascript
  naploApi.getTimetableElement('');
  ```

  * Args:
    * `orarendElemUid` – Timetable element unique identifier *`string`*

  * Returns: [`Promise<TimetableElementDto>`](./src/models/NaploApi/TimetableElementDto.ts)

* `getTimetableWeeks` – Retrieves timetable weeks

  ```javascript
  naploApi.getTimetableWeeks({
    orarendElemKezdoNapDatuma: 'YYYY-MM-DD',
    orarendElemVegNapDatuma: 'YYYY-MM-DD',
  });
  ```

  * Args:
    * `df` – Timetable date filter *`TimeTableDateFilter`*

  * Params `df`:
  * `orarendElemKezdoNapDatuma` – Timetable start date *`Date`*
  * `orarendElemVegNapDatuma` – Timetable end date *`Date`*

  * Returns: [`Promise<Array<TimetableWeekDto>`](./src/models/NaploApi/TimetableWeekDto.ts)

* `postLogging` – Posts logging

  ```javascript
  naploApi.postLogging({
    IsElmaradt: true,
    TanuloLista: [],
    OrarendElemUid: '',
    Tema: '',
  });
  ```

  * Args:
    * `body` – Logging fields [*`LessonLoggingRequestFields`*](./src/models/NaploApi/LessonLoggingRequestDto.ts)

  * Params `body`:
    * `IsElmaradt` – Is missed *`boolean`*
    * `TanuloLista` – Student list [*`Array<StudentDataForLoggingRequestDto>`*](./src/models/NaploApi/StudentDataForLoggingRequestDto.ts)
    * `OrarendElemUid` – Timetable element unique identifier *`string`*
    * `Tema` – Topic *`string`*

  * Returns: `Promise<string>`

* `deleteLogging` – Deletes logging

  ```javascript
  naploApi.deleteLogging('');
  ```

  * Args:
    * `orarendElemUid` – Timetable element unique identifier *`string`*

  * Returns: [`Promise<TimetableElementDto>`](./src/models/NaploApi/TimetableElementDto.ts)

* `getStudentPresence` – Retrieves student presence

  ```javascript
  naploApi.getStudentPresence('');
  ```

  * Args:
    * `orarendElemUid` – Timetable element unique identifier *`string`*

  * Returns: [`Promise<Array<StudentPresenceDto>`](./src/models/NaploApi/StudentPresenceDto.ts)

* `getAnnouncedTests` – Retrieves announced tests

  ```javascript
  naploApi.getAnnouncedTests('', '');
  ```

  * Args:
    * `osztalyCsoportId` – Class group identifier *`number | string`*
    * `datum` – Date *`Date | string | number`*

  * Returns: [`Promise<Array<AnnouncedTestDto>`](./src/models/NaploApi/AnnouncedTestDto.ts)

* `getAnnouncedTest` – Retrieves announced test

  ```javascript
  naploApi.getAnnouncedTest('');
  ```

  * Args:
    * `uid` – Announced test unique identifier *`number | string`*

  * Returns: [`Promise<AnnouncedTestDto>`](./src/models/NaploApi/AnnouncedTestDto.ts)

* `deleteAnnouncedTest` – Deletes announced test

  ```javascript
  naploApi.deleteAnnouncedTest('');
  ```

  * Args:
    * `uid` – Announced test unique identifier *`number | string`*

  * Returns: `Promise<void>`

* `postAnnouncedTest` – Posts announced test

  ```javascript
  naploApi.postAnnouncedTest({
    ErtekelesMod: 0,
    ForceSave: true,
    OrarendElemUid: '',
    Tema: '',
  });
  ```

  * Args:
    * `body` – Announced test fields [*`AnnouncedTestRequestFields`*](./src/models/NaploApi/AnnouncedTestRequestDto.ts)

  * Params `body`:
    * `ErtekelesMod` – Evaluation mode *`number`*
    * `ForceSave` – Force save *`boolean`*
    * `OrarendElemUid` – Timetable element unique identifier *`string`*
    * `Tema` – Topic *`string`*

  * Returns: [`Promise<AnnouncedTestDto>`](./src/models/NaploApi/AnnouncedTestDto.ts)

* `getStudentEvaluations` – Retrieves student evaluations

  ```javascript
  naploApi.getStudentEvaluations('', '', {
    datum: 'YYYY-MM-DD',
    tanuloId: 0,
  });
  ```

  * Args:
    * `tantargyId` – Subject identifier *`number | string`*
    * `osztalyCsoportId` – Class group identifier *`number | string`*
    * `ops` – Options *`{ datum?: Date | string | number, tanuloId?: number | string }`*

  * Params `ops`:
    * `datum` – Date *`Date | string | number`*
    * `tanuloId` – Student identifier (optional) *`number | string`*

  * Returns: [`Promise<Array<StudentEvaluationDto>`](./src/models/NaploApi/StudentEvaluationDto.ts)

* `postClassGroupEvaluations` – Posts class group evaluations

  ```javascript
  naploApi.postClassGroupEvaluations([]);
  ```

  * Args:
    * `body` – Class group evaluations fields [*`Array<StudentEvaluationFields>`*](./src/models/NaploApi/StudentEvaluationDto.ts)

  * Returns: [`Promise<Array<StudentEvaluationDto>`](./src/models/NaploApi/StudentEvaluationDto.ts)

* `getSentenceBankItems` – Retrieves sentence bank items

  ```javascript
  naploApi.getSentenceBankItems('', '');
  ```

  * Args:
    * `tantargyId` – Subject identifier *`number | string`*
    * `osztalyCsoportId` – Class group identifier *`number | string`*

  * Returns: [`Promise<Array<SentenceBankItemDto>`](./src/models/NaploApi/SentenceBankItemDto.ts)

* `getStudents` – Retrieves students

  ```javascript
  naploApi.getStudents('', '');
  ```

  * Args:
    * `osztalyCsoportId` – Class group identifier *`number | string`*
    * `datum` – Date *`Date | string | number`*

  * Returns: [`Promise<Array<StudentDto>`](./src/models/NaploApi/StudentDto.ts)

* `getStudent` – Retrieves student

  ```javascript
  naploApi.getStudent('');
  ```

  * Args:
    * `uid` – Student unique identifier *`number | string`*

  * Returns: [`Promise<ClassGroupStudentDto>`](./src/models/NaploApi/ClassGroupStudentDto.ts)

* `getClassGroups` – Retrieves class groups

  ```javascript
  naploApi.getClassGroups();
  ```

  * Returns: [`Promise<Array<ClassGroupDto>`](./src/models/NaploApi/ClassGroupDto.ts)

* `getEvaluations` – Retrieves evaluations

  ```javascript
  naploApi.getEvaluations('', '', '');
  ```

  * Args:
    * `tanuloId` – Student identifier *`number | string`*
    * `tantargyId` – Subject identifier *`number | string`*
    * `osztalyCsoportId` – Class group identifier *`number | string`*

  * Returns: [`Promise<Array<EvaluationDto>`](./src/models/NaploApi/EvaluationDto.ts)

* `updateEvaluation` – Updates evaluation

  ```javascript
  naploApi.updateEvaluation('', {
    ErtekelesDatum: new Date(),
    ErtekelesOsztalyzatId: 0,
    ErtekelesSzazalek: 0,
    ErtekelesSzoveg: '',
    ErtekelesModId: 0,
    ErtekelesTema: '',
  });
  ```

  * Args:
    * `uid` – Evaluation unique identifier *`number | string`*
    * `body` – Evaluation fields [*`EvaluationUpdateRequestFields`*](./src/models/NaploApi/EvaluationUpdateRequestDto.ts)

  * Params `body`:
    * `ErtekelesDatum` – Evaluation date *`Date`*
    * `ErtekelesOsztalyzatId` – Evaluation grade identifier (optional) *`number`*
    * `ErtekelesSzazalek` – Evaluation percentage (optional) *`number`*
    * `ErtekelesSzoveg` – Evaluation text (optional) *`string`*
    * `ErtekelesModId` – Evaluation mode identifier *`number`*
    * `ErtekelesTema` – Evaluation topic *`string`*

  * Returns: [`Promise<EvaluationDto>`](./src/models/NaploApi/EvaluationDto.ts)

* `deleteEvaluation` – Deletes evaluation

  ```javascript
  naploApi.deleteEvaluation('');
  ```

  * Args:
    * `uid` – Evaluation unique identifier *`number | string`*

  * Returns: `Promise<void>`

* `getProfile` – Retrieves profile

  ```javascript
  naploApi.getProfile();
  ```

  * Returns: [`Promise<TeacherProfileDto>`](./src/models/NaploApi/TeacherProfileDto.ts)

* `getSettings` – Retrieves settings

  ```javascript
  naploApi.getSettings();
  ```

  * Returns: [`Promise<TeacherSettingsDto>`](./src/models/NaploApi/TeacherSettingsDto.ts)

* `postSettings` – Posts settings

  ```javascript
  naploApi.postSettings({
    ElozoOranHianyzoAjanlasa: true,
  });
  ```

  * Args:
    * `body` – Settings fields [*`TeacherSettingsRequestFields`*](./src/models/NaploApi/TeacherSettingsRequestDto.ts)

  * Params `body`:
    * `ElozoOranHianyzoAjanlasa` – Previous lesson missing recommendation *`boolean`*

  * Returns: `Promise<void>`

* `getSubjectDivision` – Retrieves subject division

  ```javascript
  naploApi.getSubjectDivision();
  ```

  * Returns: [`Promise<Array<SubjectDivisionDto>`](./src/models/NaploApi/SubjectDivisionDto.ts)

* `getSyllabus` – Retrieves syllabus

  ```javascript
  naploApi.getSyllabus('', '', '');
  ```

  * Args:
    * `tantargyId` – Subject identifier *`number | string`*
    * `osztalyCsoportId` – Class group identifier *`number | string`*
    * `tanarUid` – Teacher unique identifier *`string`*

  * Returns: [`Promise<Array<SyllabusItemDto>`](./src/models/NaploApi/SyllabusItemDto.ts)

## License

[MIT](./LICENSE)

## Issues

If you find a bug, please file an issue on the [issue tracker](https://github.com/blazsmaster/kreta.js/issues).

## Contributing

Feel free to contribute to this project. Any kind of help is appreciated!
