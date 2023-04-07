// if you want to test the module, please run "npm run build" or "yarn run build" first (use nodemon if you want to test the module faster)
// then uncomment the blocks you want to test

const { Kreta, KretaAuthentication } = require('../dist')

const kreta = new Kreta({
  username: '', password: '', institute_code: ''
})

// get credentials from Kreta
console.log(kreta._username)
console.log(kreta._password)
console.log(kreta._institute_code)

// Uncomment blocks faster
// Atom:               Ctrl + / (Windows) or Cmd + / (Mac)
// SublimeText:        Ctrl + / (Windows) or Cmd + / (Mac)
// Visual Studio Code: Ctrl + K + U
// WebStorm:           Ctrl + Shift + / (Windows) or Cmd + Shift + / (Mac)


// token testing


/*new KretaAuthentication({ username: '', password: '', institute_code: '' }).getAccessToken().then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
new KretaAuthentication({ username: '', password: '', institute_code: '' }).getRefreshToken({
  refreshToken: '', refreshUserData: false
}).then((r) => {
  console.log(r.access_token, r.refresh_token, r.expires_in)
})*/


// api stuff


// try to get your student data
kreta.getStudent().then((r) => {
  console.log(JSON.stringify(r, null, 2))
})

/*
kreta.Global.getInstituteList().then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.getAnnouncedTests({ dateFrom: '2023-03-01', dateTo: '2023-03-21', uids: ['123456', '789012'] }).then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.getClassAverage().then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.getClassMasters(['123456']).then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.getDeviceGivenState().then((r) => {
  console.log(r)
})
kreta.getEvaluations({ dateFrom: '2023-03-01', dateTo: '2023-03-14' }).then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.getGroups().then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.getHomework('123456').then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.getHomeworks({ dateFrom: '2023-03-01', dateTo: '2023-03-14' }).then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.getInstitute().then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.getInstituteList('7856d350-1fda-45f5-822d-e1a2f3f1acf0').then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.getLepEvents().then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.getLesson('123456,LoremIpsum,2023-03-13T22:00:00Z').then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.getLessons({ dateFrom: '2023-03-01', dateTo: '2023-03-14' }).then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.getNotes({ dateFrom: '2023-03-01', dateTo: '2023-03-14' }).then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.getNoticeBoardItems().then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.getOmissions({ dateFrom: '2023-03-01', dateTo: '2023-03-14' }).then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.getSchoolYearCalendar().then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.getSubjectAverages().then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.getTimeTableWeeks({ dateFrom: '2023-03-01', dateTo: '2023-03-14' }).then((r) => {
  console.log(JSON.stringify(r, null, 2))
})



kreta.Administration.getAccessControlSystemEvents().then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.Administration.getAddressableClasses(123456).then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.Administration.getAddressableGuardiansForClass(123456).then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.Administration.getAddressableSzmkRepesentative().then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.Administration.getAddressableType().then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.Administration.getAddresseeType().then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.Administration.getAdministrators().then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.Administration.getCaseTypes().then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.Administration.getClassMasters().then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.Administration.getCurrentInstitutionDetails().then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.Administration.getCurrentInstitutionModules().then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.Administration.getDirectors().then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.Administration.getMessage(123456).then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.Administration.getMessageLimitations().then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.Administration.getMessages().then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.Administration.getTeachers().then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.Administration.getTmgiCaseTypes().then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
kreta.Administration.getUnreadMessagesCount().then((r) => {
  console.log(r)
})*/
