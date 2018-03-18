import { MedicalInstitution } from './medical-institution';

export class User{
    Id:string;
    UserId: string;
    UserName: string;
    FullName: string;
    EmailAddress: string;
    ContactInfo: string;
    DateOfBirth: Date = null;
    LicenceId: string;
    Rolse: string[];
    Institutions: MedicalInstitution[]

    fromJSON(json:Object) {
        for (var propName in json)
            this[propName] = json[propName];
        return this;
    }
}
