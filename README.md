<div align="center">
  <br />
  <img src="https://i.imgur.com/Zz8viJd.png" alt="kreta.js" title="kreta.js" />
  <br />
  <p>
    <img alt="kreta.js npm version" src="https://img.shields.io/npm/v/kreta.js?style=for-the-badge&logo=npm&logoColor=fff&color=C12419" />
    <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/blazsmaster/kreta.js?style=for-the-badge" />
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/blazsmaster/kreta.js?style=for-the-badge" />
    <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/blazsmaster/kreta.js?style=for-the-badge" />
  </p>
  <p>
    <img alt="Node.js badge" src="https://img.shields.io/badge/Node.js-none?style=for-the-badge&logo=node.js&logoColor=white&color=339933" />
    <img alt="TypeScript badge" src="https://img.shields.io/badge/TypeScript-none?style=for-the-badge&logo=typescript&logoColor=white&color=3178C6" />
    <img alt="WebStorm badge" src="https://img.shields.io/badge/WebStorm-none?style=for-the-badge&logo=webstorm&logoColor=white&color=000000" />
  </p>
</div>

## About

kreta.js is a powerful and easy-to-use node.js module that wraps the Mobile API v3 of e-kréta.

### Pros

- Object-oriented
- Type declarations
- Simplified usage

### Cons

- The api is not 100% known, some endpoints are maybe missing
- Bad error handling *(check [todo](#todo))*

## Installation

**The module requires node `v14.21.3` or higher for stable operation.**
Tested on node `v14.21.3` `v16.20.0` `v18.15.0`.

```shell
$ npm install kreta.js
```

```shell
$ yarn add kreta.js
```

```shell
$ bower install kreta.js
```

```shell
$ pnpm install kreta.js
```

## Methods

You can use the `KretaAuthentication` class to get the access and refresh tokens if you want to use the authentication methods for your own
purposes. The `Kreta` class is the main class of the module, it contains all the methods that you can use to get data from the api.

```javascript
const { Kreta, KretaAuthentication } = require('kreta.js');

// Create a new instance of Kreta and KretaAuthentication
const kreta = new Kreta({})
const auth = new KretaAuthentication({})

// AUTHENTICATION
auth.getAccessToken()
auth.getRefreshToken()

// KRETA
kreta.getAnnouncedTests()
kreta.getClassAverage()
kreta.getClassMasters()
kreta.getDeviceGivenState()
kreta.getEvaluations()
kreta.getGroups()
kreta.getHomework()
kreta.getHomeworks()
kreta.getInstitute()
kreta.getInstituteList()
kreta.getLepEvents()
kreta.getLesson()
kreta.getLessons()
kreta.getNotes()
kreta.getNoticeBoardItems()
kreta.getOmissions()
kreta.getSchoolYearCalendar()
kreta.getStudent()
kreta.getSubjectAverages()
kreta.getTimeTableWeeks()

// ADMINISTRATION
kreta.Administration.getAccessControlSystemEvents()
kreta.Administration.getAddressableClasses()
kreta.Administration.getAddressableGuardiansForClass()
kreta.Administration.getAddressableSzmkRepesentative()
kreta.Administration.getAddressableType()
kreta.Administration.getAddresseeType()
kreta.Administration.getAdministrators()
kreta.Administration.getCaseTypes()
kreta.Administration.getClassMasters()
kreta.Administration.getCurrentInstitutionDetails()
kreta.Administration.getCurrentInstitutionModules()
kreta.Administration.getDirectors()
kreta.Administration.getMessage()
kreta.Administration.getMessageLimitations()
kreta.Administration.getMessages()
kreta.Administration.getTeachers()
kreta.Administration.getTmgiCaseTypes()
kreta.Administration.getUnreadMessagesCount()
```

## Example

```javascript
const { Kreta } = require('kreta.js');

// ES6
// import { KretaREST } from 'kreta.js';

// login with credentials
const kreta = new Kreta({
  username: 'KRETA_USERNAME',
  password: 'KRETA_PASSWORD',
  institute_code: 'INSTITUTE_CODE',
  version: 'v3'
})

// get student data
kreta.getStudent()
  .then((student) => console.log(`Hello ${student.Nev}!`))
  .catch((err) => console.log(`Oh no, an error occured: ${err}`));

// get evaluations between two dates, then log out the last one
kreta.getEvaluations({ dateFrom: '2023-03-01', dateTo: '2023-03-14' })
  .then((evaluations) => evaulations[evaluations.length - 1])
  .catch((err) => console.log(`Oh no, an error occured: ${err}`));

// get administration messages
kreta.Administration.getMessages()
  .then((messages) => console.log(`You have ${messages.length} messages total!`))
  .catch((err) => console.log(`Oh no, an error occured: ${err}`));
```

## Todo

- [ ] Documentation
    - Detailed usage of each method (usage, parameters, response, etc.)
    - More examples (usage of each method and the module itself)
    - Common errors (e.g. `KretaError: Invalid credentials`, `KretaError: Invalid institute code`, etc.)
        - How to fix, handle and prevent them
        - Which methods can throw them
        - Which error codes and messages can be thrown
- [ ] Better error handling
    - Static KretaError response
        - `KretaError: [ERROR_HERE]`
        - Custom error messages and codes

## Get help

If you have any questions, feel free to open an issue or contact me, or open an issue on
the [GitHub repository](https://github.com/blazsmaster/kreta.js/issues/new/choose) or go to
the [Discussions](https://github.com/blazsmaster/kreta.js/discussions).

### Contact me

- [Discord](https://discord.com/channels/@me/688486778117816383) `Mr. Dogee#6959`

## Contributing

If you want to contribute, feel free to open a [pull request](https://github.com/blazsmaster/kreta.js/pulls) or contact me. Any help or
feedback is appreciated.
