// Lib
export { type MobileApiV3Fields, type DateFilter, type TimeTableDateFilter } from './lib/MobileApiV3';

// IDP models
export { type AuthenticationFields } from './models/IDP/AuthenticationDto';
export { type ExtendTokenFields } from './models/IDP/ExtendToken';
export { type LoginRequestFields } from './models/IDP/LoginRequest';
export { type NonceRequestFields } from './models/IDP/NonceRequest';
export { type RevokeRefreshTokenFields } from './models/IDP/RevokeRefreshToken';

// MobileApi models
// ClassMaster
export { type EmailFields } from './models/MobileApi/ClassMaster/EmailDto';
export { type EmployeeFields } from './models/MobileApi/ClassMaster/EmployeeDto';
export { type PhoneFields } from './models/MobileApi/ClassMaster/PhoneDto';
export { type TeacherFields } from './models/MobileApi/ClassMaster/TeacherDto';
// Group
export { type MembershipFields } from './models/MobileApi/Group/MembershipDto';
// Homework
import { AttachmentFields } from './models/MobileApi/Homework/AttachmentDto';

export { type AttachmentFields };
// Institution
export { type CustomizationSettingsFields } from './models/MobileApi/Institution/CustomizationSettingsDto';
export { type SystemModuleFields } from './models/MobileApi/Institution/SystemModuleDto';
// Lesson
export type LessonAttachmentFields = Omit<AttachmentFields, 'Tipus'>
// Omission
export { type LessonFields as OmissionLessonFields } from './models/MobileApi/Omission/LessonDto';
// Student
export { type BankAccountFields } from './models/MobileApi/Student/BankAccountDto';
// SubjectAverage
export { type AverageWithTimeFields } from './models/MobileApi/SubjectAverage/AverageWithTimeDto';

export { type AnnouncedTestFields } from './models/MobileApi/AnnouncedTestDto';
export { type BankAccountNumberPostFields } from './models/MobileApi/BankAccountNumberPostDto';
export { type ClassAverageFields } from './models/MobileApi/ClassAverageDto';
export { type ClassMasterFields } from './models/MobileApi/ClassMasterDto';
export { type ConsultingHourFields } from './models/MobileApi/ConsultingHourDto';
export { type ConsultingHourListFields } from './models/MobileApi/ConsultingHourListDto';
export { type ConsultingHourTimeSlotFields } from './models/MobileApi/ConsultingHourTimeSlotDto';
export { type EvaluationFields } from './models/MobileApi/EvaluationDto';
export { type GroupFields } from './models/MobileApi/GroupDto';
export { type Guardian4TFields } from './models/MobileApi/Guardian4TDto';
export { type Guardian4TPostFields } from './models/MobileApi/Guardian4TPostDto';
export { type GuardianFields } from './models/MobileApi/GuardianDto';
export { type HomeworkFields } from './models/MobileApi/HomeworkDto';
export { type InstitutionFields } from './models/MobileApi/InstitutionDto';
export { type LepEventFields } from './models/MobileApi/LepEventDto';
export { type LepEventGuardianPermissionPostFields } from './models/MobileApi/LepEventGuardianPermissionPostDto';
export { type LessonFields } from './models/MobileApi/LessonDto';
export { type NoteFields } from './models/MobileApi/NoteDto';
export { type NoticeBoardItemFields } from './models/MobileApi/NoticeBoardItemDto';
export { type OmissionFields } from './models/MobileApi/OmissionDto';
export { type SchoolClassFields } from './models/MobileApi/SchoolClassDto';
export { type SchoolYearCalendarEntryFields } from './models/MobileApi/SchoolYearCalendarEntryDto';
export { type StudentFields } from './models/MobileApi/StudentDto';
export { type SubjectAverageFields } from './models/MobileApi/SubjectAverageDto';
export { type SubjectDescriptorFields } from './models/MobileApi/SubjectDescriptor';
export { type TeszekRegistrationFields } from './models/MobileApi/TeszekRegistrationDto';
export { type TimeTableWeekFields } from './models/MobileApi/TimeTableWeekDto';
export { type UidNameStructureFields } from './models/MobileApi/UidNameStructure';
export { type UidStructureFields } from './models/MobileApi/UidStructure';
export { type ValueDescriptorFields } from './models/MobileApi/ValueDescriptor';
