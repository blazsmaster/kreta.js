// if you want to test the module, please run "npm run build" or "yarn run build" first (use nodemon if you want to test the module faster)
// then uncomment the blocks you want to test
const { Kreta, KretaAuthentication } = require('../dist')

const kreta = new Kreta({
  username: '', password: '', institute_code: '', version: 'v3'
});

// Uncomment blocks faster
// Atom:               Ctrl + / (Windows) or Cmd + / (Mac)
// SublimeText:        Ctrl + / (Windows) or Cmd + / (Mac)
// Visual Studio Code: Ctrl + K + U
// WebStorm:           Ctrl + Shift + / (Windows) or Cmd + Shift + / (Mac)


// token testing


/*new KretaAuthentication({ username: '', password: '', institute_code: '' }).getAccessToken().then((r) => {
  console.log(r.token)
})*/
/*new KretaAuthentication({ username: '', password: '', institute_code: '' }).getRefreshToken({
  institute_code: '', username: '', refresh_token: '', refreshUserData: false
}).then((r) => {
  console.log(r.access_token, r.refresh_token, r.expires_in)
})*/


// api stuff


/*kreta.getAnnouncedTests({ dateFrom: '2023-03-01', dateTo: '2023-03-21', uids: ['1234', '5678'] }).then((r) => {
  console.log(JSON.stringify(r[0], null, 2))
})*/
/*kreta.getClassAverage().then((r) => {
  console.log(JSON.stringify(r[0], null, 2))
})*/
/*kreta.getClassMasters(['123456']).then((r) => {
  console.log(JSON.stringify(r[0], null, 2))
})*/
/*kreta.getDeviceGivenState().then((r) => {
  console.log(r);
})*/
/*kreta.getEvaluations({ dateFrom: '2023-03-01', dateTo: '2023-03-14' }).then((r) => {
  console.log(JSON.stringify(r[0], null, 2))
})*/
/*kreta.getGroups().then((r) => {
  console.log(JSON.stringify(r[0], null, 2))
})*/
/*kreta.getHomework('1234').then((r) => {
  console.log(JSON.stringify(r, null, 2))
})*/
/*kreta.getHomeworks({ dateFrom: '2023-03-01', dateTo: '2023-03-14' }).then((r) => {
  console.log(JSON.stringify(r[0], null, 2))
})*/
/*kreta.getInstitute().then((r) => {
  console.log(JSON.stringify(r, null, 2))
})*/
/*kreta.getInstituteList('7856d350-1fda-45f5-822d-e1a2f3f1acf0').then((r) => {
  console.log(JSON.stringify(r[0], null, 2))
})*/
/*kreta.getLepEvents().then((r) => {
  console.log(JSON.stringify(r[0], null, 2))
})*/
/*kreta.getLesson('1234567,LoremIpsum,2023-04-01T01:00:00Z').then((r) => {
  console.log(JSON.stringify(r, null, 2));
})*/
/*kreta.getLessons({ dateFrom: '2023-03-01', dateTo: '2023-03-14' }).then((r) => {
  console.log(JSON.stringify(r[0], null, 2))
})*/
/*kreta.getNotes({ dateFrom: '2023-03-01', dateTo: '2023-03-14' }).then((r) => {
  console.log(JSON.stringify(r[0], null, 2))
})*/
/*kreta.getNoticeBoardItems().then((r) => {
  console.log(JSON.stringify(r[0], null, 2))
})*/
/*kreta.getOmissions({ dateFrom: '2023-03-01', dateTo: '2023-03-14' }).then((r) => {
  console.log(JSON.stringify(r[0], null, 2))
})*/
/*kreta.getSchoolYearCalendar().then((r) => {
  console.log(JSON.stringify(r[0], null, 2));
})*/
kreta.getStudent().then((r) => {
  console.log(JSON.stringify(r, null, 2))
})
/*kreta.getSubjectAverages().then((r) => {
  console.log(JSON.stringify(r[0], null, 2));
})*/
/*kreta.getTimeTableWeeks({ dateFrom: '2023-03-01', dateTo: '2023-03-14' }).then((r) => {
  console.log(JSON.stringify(r[0], null, 2));
})*/


// still api stuff but administartion :d


/*kreta.Administration.getAccessControlSystemEvents().then((r) => {
  console.log(JSON.stringify(r[0], null, 2));
})*/
/*kreta.Administration.getAddressableClasses(1).then((r) => {
  console.log(JSON.stringify(r[0], null, 2));
})*/
/*kreta.Administration.getAddressableGuardiansForClass(123456).then((r) => {
  console.log(JSON.stringify(r[0], null, 2));
})*/
/*kreta.Administration.getAddressableSzmkRepesentative().then((r) => {
  console.log(JSON.stringify(r[0], null, 2));
})*/
/*kreta.Administration.getAddressableType().then((r) => {
  console.log(JSON.stringify(r[0], null, 2));
})*/
/*kreta.Administration.getAddresseeType().then((r) => {
  console.log(JSON.stringify(r[0], null, 2));
})*/
/*kreta.Administration.getAdministrators().then((r) => {
  console.log(JSON.stringify(r[0], null, 2));
})*/
/*kreta.Administration.getCaseTypes().then((r) => {
  console.log(JSON.stringify(r[0], null, 2));
})*/
/*kreta.Administration.getClassMasters().then((r) => {
  console.log(JSON.stringify(r[0], null, 2));
})*/
/*kreta.Administration.getCurrentInstitutionDetails().then((r) => {
  console.log(JSON.stringify(r, null, 2));
})*/
/*kreta.Administration.getCurrentInstitutionModules().then((r) => {
  console.log(r[0]);
})*/
/*kreta.Administration.getDirectors().then((r) => {
  console.log(JSON.stringify(r[0], null, 2));
})*/
/*kreta.Administration.getMessage(123456789).then((r) => {
  console.log(JSON.stringify(r, null, 2));
})*/
/*kreta.Administration.getMessageLimitations().then((r) => {
  console.log(JSON.stringify(r, null, 2));
})*/
/*kreta.Administration.getMessages().then((r) => {
  console.log(JSON.stringify(r[0], null, 2));
})*/
/*kreta.Administration.getTeachers().then((r) => {
  console.log(JSON.stringify(r[0], null, 2));
})*/
/*kreta.Administration.getTmgiCaseTypes().then((r) => {
  console.log(JSON.stringify(r[0], null, 2));
})*/
/*kreta.Administration.getUnreadMessagesCount().then((r) => {
  console.log(r);
})*/
