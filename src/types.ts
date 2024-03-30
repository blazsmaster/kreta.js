import { type AccessControlSystemItemFields } from './models/EAdminApi/AccessControlSystemItemDto';
import { type AddresseeFields } from './models/EAdminApi/AddresseeDto';
import { type AddresseeTypeFields } from './models/EAdminApi/AddresseeTypeDto';
import { type AdministratorFields } from './models/EAdminApi/AdministratorDto';
import { type ApplicantsFields } from './models/EAdminApi/ApplicantsDto';
import { type ApplicationDocumentTypeFields } from './models/EAdminApi/ApplicationDocumentTypeDto';
import { type ApplicationMandatoryDocumentFields } from './models/EAdminApi/ApplicationMandatoryDocumentDto';
import { type AttachmentFields } from './models/EAdminApi/AttachmentDto';
import { type CaseFields } from './models/EAdminApi/CaseDto';
import { type ChildFields } from './models/EAdminApi/ChildDto';
import { type DecisionFields } from './models/EAdminApi/DecisionDto';
import { type EmployeeDetailsFields } from './models/EAdminApi/EmployeeDetailsDto';
import { type FileFields } from './models/EAdminApi/FileDto';
import { type FileHandlerFields } from './models/EAdminApi/Status/FileHandlerDto';
import { type FiledApplicationFields } from './models/EAdminApi/FiledApplicationDto';
import { type FiledDecisionFields } from './models/EAdminApi/FiledDecisionDto';
import { type JudgementFields } from './models/EAdminApi/JudgementDto';
import { type MailboxItemFields } from './models/EAdminApi/MailboxItemDto';
import { type MessageFields } from './models/EAdminApi/MessageDto';
import { type MessageLimitationsFields } from './models/EAdminApi/MessageLimitationsDto';
import { type OtherThingsToDoAttachmentsFields } from './models/EAdminApi/OtherThingsToDoAttachmentsDto';
import { type PostStateFields } from './models/EAdminApi/PostStateDto';
import { type ReadMessageRequestFields } from './models/EAdminApi/ReadMessageRequestDto';
import { type RectificationPostFields } from './models/EAdminApi/RectificationPostDto';
import { type SendMessageToBinRequestFields } from './models/EAdminApi/SendMessageToBinRequestDto';
import { type SignerFields } from './models/EAdminApi/SignerDto';
import { type StateFields } from './models/EAdminApi/StateDto';
import { type StatusFields } from './models/EAdminApi/StatusDto';
import { type TemporaryFileFields } from './models/EAdminApi/TemporaryFileDto';
import { type TemporaryIdFields } from './models/EAdminApi/Attachment/TemporaryIdDto';
import { type TmgiCasePostFields } from './models/EAdminApi/TmgiCasePostDto';
import { type ToDoItemFields } from './models/EAdminApi/ToDoItemDto';
import { type ToDoMandatoryDocumentsListFields } from './models/EAdminApi/ToDoMandatoryDocumentsListDto';
import { type TypeFields } from './models/EAdminApi/TypeDto';
import { type EmailFields } from './models/MobileApi/ClassMaster/EmailDto';
import { type EmployeeFields } from './models/MobileApi/ClassMaster/EmployeeDto';
import { type PhoneFields } from './models/MobileApi/ClassMaster/PhoneDto';
import { type TeacherFields } from './models/MobileApi/ClassMaster/TeacherDto';
import { type MembershipFields } from './models/MobileApi/Group/MembershipDto';
import { type CustomizationSettingsFields } from './models/MobileApi/Institution/CustomizationSettingsDto';
import { type SystemModuleFields } from './models/MobileApi/Institution/SystemModuleDto';
import { type LessonFields as OmissionLessonFields } from './models/MobileApi/Omission/LessonDto';
import { type BankAccountFields } from './models/MobileApi/Student/BankAccountDto';
import { type AverageWithTimeFields } from './models/MobileApi/SubjectAverage/AverageWithTimeDto';
import { type AnnouncedTestFields } from './models/MobileApi/AnnouncedTestDto';
import { type BankAccountNumberPostFields } from './models/MobileApi/BankAccountNumberPostDto';
import { type ClassAverageFields } from './models/MobileApi/ClassAverageDto';
import { type ClassMasterFields } from './models/MobileApi/ClassMasterDto';
import { type ConsultingHourFields } from './models/MobileApi/ConsultingHourDto';
import { type ConsultingHourListFields } from './models/MobileApi/ConsultingHourListDto';
import { type ConsultingHourTimeSlotFields } from './models/MobileApi/ConsultingHourTimeSlotDto';
import { type DailyNotificationSummaryFields } from './models/MobileApi/DailyNotificationSummaryDto';
import { type EvaluationFields } from './models/MobileApi/EvaluationDto';
import { type GroupFields } from './models/MobileApi/GroupDto';
import { type Guardian4TFields } from './models/MobileApi/Guardian4TDto';
import { type Guardian4TPostFields } from './models/MobileApi/Guardian4TPostDto';
import { type GuardianFields } from './models/MobileApi/GuardianDto';
import { type GuardianEAdminFields } from './models/MobileApi/GuardianEAdminDto';
import { type HomeworkFields } from './models/MobileApi/HomeworkDto';
import { type InstitutionFields } from './models/MobileApi/InstitutionDto';
import { type KretaClassFields } from './models/MobileApi/KretaClassDto';
import { type LepEventFields } from './models/MobileApi/LepEventDto';
import { type LepEventGuardianPermissionPostFields } from './models/MobileApi/LepEventGuardianPermissionPostDto';
import { type LessonFields } from './models/MobileApi/LessonDto';
import { type NoteFields } from './models/MobileApi/NoteDto';
import { type NoticeBoardItemFields } from './models/MobileApi/NoticeBoardItemDto';
import { type OmissionFields } from './models/MobileApi/OmissionDto';
import { type SchoolClassFields } from './models/MobileApi/SchoolClassDto';
import { type SchoolYearCalendarEntryFields } from './models/MobileApi/SchoolYearCalendarEntryDto';
import { type StudentFields } from './models/MobileApi/StudentDto';
import { type SubjectAverageFields } from './models/MobileApi/SubjectAverageDto';
import { type SubjectDescriptorFields } from './models/MobileApi/SubjectDescriptor';
import { type TeszekRegistrationFields } from './models/MobileApi/TeszekRegistrationDto';
import { type TimeTableWeekFields } from './models/MobileApi/TimeTableWeekDto';
import { type UidNameStructureFields } from './models/MobileApi/UidNameStructure';
import { type UidStructureFields } from './models/MobileApi/UidStructure';
import { type ValueDescriptorFields } from './models/MobileApi/ValueDescriptor';
import { type AttachmentFields as HomeworkAttachmentFields } from './models/MobileApi/Homework/AttachmentDto';
import { type ClassGroupFields } from './models/NaploApi/ClassGroupStudent/ClassGroupDto';
import { type ClassGroupGuardianFields } from './models/NaploApi/ClassGroupStudent/ClassGroupGuardianDto';
import { type AnnouncedTestFields as NaploAnnouncedTestFields } from './models/NaploApi/AnnouncedTestDto';
import { type AnnouncedTestRequestFields } from './models/NaploApi/AnnouncedTestRequestDto';
import { type ClassGroupEvaluationRequestFields } from './models/NaploApi/ClassGroupEvaluationRequestDto';
import { type ClassGroupStudentFields } from './models/NaploApi/ClassGroupStudentDto';
import { type EvaluationFields as NaploEvaluationFields } from './models/NaploApi/EvaluationDto';
import { type EvaluationModeFields } from './models/NaploApi/EvaluationModeDto';
import { type EvaulationRequestFields } from './models/NaploApi/EvaluationRequestDto';
import { type EvaluationUpdateRequestFields } from './models/NaploApi/EvaluationUpdateRequestDto';
import { type HomeworkGetFields } from './models/NaploApi/HomeworkGetDto';
import { type HomeworkPostFields } from './models/NaploApi/HomeworkPostDto';
import { type HomeworkPutFields } from './models/NaploApi/HomeworkPutDto';
import { type JustificationFields } from './models/NaploApi/JustificationDto';
import { type JustificationPostFields } from './models/NaploApi/JustificationPostDto';
import { type LessonLoggingRequestFields } from './models/NaploApi/LessonLoggingRequestDto';
import { type PresenceFields } from './models/NaploApi/PresenceDto';
import { type SchoolGuardFields } from './models/NaploApi/SchoolGuardDto';
import { type SentenceBankItemFields } from './models/NaploApi/SentenceBankItemDto';
import { type StudentDataForLoggingRequestFields } from './models/NaploApi/StudentDataForLoggingRequestDto';
import { type StudentFields as NaploStudentFields } from './models/NaploApi/StudentDto';
import { type StudentEvaluationFields } from './models/NaploApi/StudentEvaluationDto';
import { type StudentEvaluationExemptionFields } from './models/NaploApi/StudentEvaluationExemptionDto';
import { type StudentEvaluationLastFields } from './models/NaploApi/StudentEvaluationLastDto';
import { type StudentEvaluationRequestFields } from './models/NaploApi/StudentEvaluationRequestDto';
import { type StudentNoteFields } from './models/NaploApi/StudentNoteDto';
import { type StudentNotesFields } from './models/NaploApi/StudentNotesDto';
import { type StudentPresenceFields } from './models/NaploApi/StudentPresenceDto';
import { type SubjectDivisionFields } from './models/NaploApi/SubjectDivisionDto';
import { type SyllabusItemFields } from './models/NaploApi/SyllabusItemDto';
import { type TeacherProfileFields } from './models/NaploApi/TeacherProfileDto';
import { type TeacherSettingsFields } from './models/NaploApi/TeacherSettingsDto';
import { type TeacherSettingsRequestFields } from './models/NaploApi/TeacherSettingsRequestDto';
import { type TimetableElementFields } from './models/NaploApi/TimetableElementDto';
import { type TimetableWeekFields } from './models/NaploApi/TimetableWeekDto';
import { type AuthenticationFields } from './models/IDP/AuthenticationDto';
import { type ExtendTokenFields } from './models/IDP/ExtendToken';
import { type LoginRequestFields } from './models/IDP/LoginRequest';
import { type NonceRequestFields } from './models/IDP/NonceRequest';
import { type RevokeRefreshTokenFields } from './models/IDP/RevokeRefreshToken';
import { type TokenFields } from './models/IDP/TokenDto';
import { InstituteFields as GlobalInstituteFields } from './models/GlobalApi/InstituteDto';
import { InstituteV1Fields as GlobalInstituteV1Fields } from './models/GlobalApi/InstituteV1Dto';

export * from './api';

export { type EAdminApiV1Options } from './lib/EAdminApiV1';
export { type MobileApiV3Options } from './lib/MobileApiV3';
export { type NaploApiV3Options } from './lib/NaploApiV3';

export declare namespace EAdminApiTypes {
	export type AccessControlSystemItem = AccessControlSystemItemFields;
	export type Addressee = AddresseeFields;
	export type AddresseeType = AddresseeTypeFields;
	export type Administrator = AdministratorFields;
	export type Applicants = ApplicantsFields;
	export type ApplicationDocumentType = ApplicationDocumentTypeFields;
	export type ApplicationMandatoryDocument = ApplicationMandatoryDocumentFields;
	export type Attachment = AttachmentFields;
	export type Case = CaseFields;
	export type Child = ChildFields;
	export type Decision = DecisionFields;
	export type EmployeeDetails = EmployeeDetailsFields;
	export type File = FileFields;
	export type FileHandler = FileHandlerFields;
	export type FiledApplication = FiledApplicationFields;
	export type FiledDecision = FiledDecisionFields;
	export type Judgement = JudgementFields;
	export type MailboxItem = MailboxItemFields;
	export type Message = MessageFields;
	export type MessageLimitations = MessageLimitationsFields;
	export type OtherThingsToDoAttachments = OtherThingsToDoAttachmentsFields;
	export type PostState = PostStateFields;
	export type ReadMessageRequest = ReadMessageRequestFields;
	export type RectificationPost = RectificationPostFields;
	export type SendMessageToBinRequest = SendMessageToBinRequestFields;
	export type Signer = SignerFields;
	export type State = StateFields;
	export type Status = StatusFields;
	export type TemporaryFile = TemporaryFileFields;
	export type TemporaryId = TemporaryIdFields;
	export type TmgiCasePost = TmgiCasePostFields;
	export type ToDoItem = ToDoItemFields;
	export type ToDoMandatoryDocumentsList = ToDoMandatoryDocumentsListFields;
	export type Type = TypeFields;
}

interface LessonAttachmentFields extends Omit<AttachmentFields, 'Tipus'> {
}

export declare namespace MobileApiTypes {
	export type Email = EmailFields;
	export type Employee = EmployeeFields;
	export type Phone = PhoneFields;
	export type Teacher = TeacherFields;
	export type Membership = MembershipFields;
	export type HomeworkAttachment = HomeworkAttachmentFields;
	export type CustomizationSettings = CustomizationSettingsFields;
	export type SystemModule = SystemModuleFields;
	export type LessonAttachment = LessonAttachmentFields;
	export type OmissionLesson = OmissionLessonFields;
	export type BankAccount = BankAccountFields;
	export type AverageWithTime = AverageWithTimeFields;
	export type AnnouncedTest = AnnouncedTestFields;
	export type BankAccountNumberPost = BankAccountNumberPostFields;
	export type ClassAverage = ClassAverageFields;
	export type ClassMaster = ClassMasterFields;
	export type ConsultingHour = ConsultingHourFields;
	export type ConsultingHourList = ConsultingHourListFields;
	export type ConsultingHourTimeSlot = ConsultingHourTimeSlotFields;
	export type DailyNotificationSummary = DailyNotificationSummaryFields;
	export type Evaluation = EvaluationFields;
	export type Group = GroupFields;
	export type Guardian4T = Guardian4TFields;
	export type Guardian4TPost = Guardian4TPostFields;
	export type Guardian = GuardianFields;
	export type GuardianEAdmin = GuardianEAdminFields;
	export type Homework = HomeworkFields;
	export type Institution = InstitutionFields;
	export type KretaClass = KretaClassFields;
	export type LepEvent = LepEventFields;
	export type LepEventGuardianPermissionPost = LepEventGuardianPermissionPostFields;
	export type Lesson = LessonFields;
	export type Note = NoteFields;
	export type NoticeBoardItem = NoticeBoardItemFields;
	export type Omission = OmissionFields;
	export type SchoolClass = SchoolClassFields;
	export type SchoolYearCalendarEntry = SchoolYearCalendarEntryFields;
	export type Student = StudentFields;
	export type SubjectAverage = SubjectAverageFields;
	export type SubjectDescriptor = SubjectDescriptorFields;
	export type TeszekRegistration = TeszekRegistrationFields;
	export type TimeTableWeek = TimeTableWeekFields;
	export type UidNameStructure = UidNameStructureFields;
	export type UidStructure = UidStructureFields;
	export type ValueDescriptor = ValueDescriptorFields;
}

export declare namespace NaploApiTypes {
	export type ClassGroup = ClassGroupFields;
	export type ClassGroupGuardian = ClassGroupGuardianFields;
	export type AnnouncedTest = NaploAnnouncedTestFields;
	export type AnnouncedTestRequest = AnnouncedTestRequestFields;
	export type ClassGroupEvaluationRequest = ClassGroupEvaluationRequestFields;
	export type ClassGroupStudent = ClassGroupStudentFields;
	export type Evaluation = NaploEvaluationFields;
	export type EvaluationMode = EvaluationModeFields;
	export type EvaluationRequest = EvaulationRequestFields;
	export type EvaluationUpdateRequest = EvaluationUpdateRequestFields;
	export type HomeworkGet = HomeworkGetFields;
	export type HomeworkPost = HomeworkPostFields;
	export type HomeworkPut = HomeworkPutFields;
	export type Justification = JustificationFields;
	export type JustificationPost = JustificationPostFields;
	export type LessonLoggingRequest = LessonLoggingRequestFields;
	export type Presence = PresenceFields;
	export type SchoolGuard = SchoolGuardFields;
	export type SentenceBankItem = SentenceBankItemFields;
	export type StudentDataForLoggingRequest = StudentDataForLoggingRequestFields;
	export type Student = NaploStudentFields;
	export type StudentEvaluation = StudentEvaluationFields;
	export type StudentEvaluationExemption = StudentEvaluationExemptionFields;
	export type StudentEvaluationLast = StudentEvaluationLastFields;
	export type StudentEvaluationRequest = StudentEvaluationRequestFields;
	export type StudentNote = StudentNoteFields;
	export type StudentNotes = StudentNotesFields;
	export type StudentPresence = StudentPresenceFields;
	export type SubjectDivision = SubjectDivisionFields;
	export type SyllabusItem = SyllabusItemFields;
	export type TeacherProfile = TeacherProfileFields;
	export type TeacherSettings = TeacherSettingsFields;
	export type TeacherSettingsRequest = TeacherSettingsRequestFields;
	export type TimetableElement = TimetableElementFields;
	export type TimetableWeek = TimetableWeekFields;
}

export declare namespace IdpApiTypes {
	export type Authentication = AuthenticationFields;
	export type ExtendToken = ExtendTokenFields;
	export type LoginRequest = LoginRequestFields;
	export type NonceRequest = NonceRequestFields;
	export type RevokeRefreshToken = RevokeRefreshTokenFields;
	export type Token = TokenFields;
}

export declare namespace GlobalApiTypes {
	export type GlobalConfigurationDescriptors = Record<string, string>;
	export type Institute = GlobalInstituteFields;
	export type InstituteV1 = GlobalInstituteV1Fields;
}

export interface DateFilter {
	/**
	 * @description Kezdő dátum
	 */
	datumTol?: Date | string;
	/**
	 * @description Végdátum
	 */
	datumIg?: Date | string;
}

export interface TimeTableDateFilter {
	/**
	 * @description Kezdő időpont
	 */
	orarendElemKezdoNapDatuma: Date | string;
	/**
	 * @description Záró időpont
	 */
	orarendElemVegNapDatuma: Date | string;
}
