import { MedicalInstitution } from '../../shared/models/medical-institution';
export class RegistrationInfo {
    UserId:string
    Username: string;
    Password: string;
    FullName: string;
    EmailAddress: string;
    ContactInfo: string;
    DateOfBirth: Date;
    LicenceId: string;
    Institutions: MedicalInstitution[];
}