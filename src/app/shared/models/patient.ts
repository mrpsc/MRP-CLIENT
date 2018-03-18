import { PatientDiagnosis } from './patient-diagnosis'
export class Patient{
    Id:string;
    PatientId:string;
    Name: string;
    DateOfBirth: Date = null;
    Gender: Gender;
    Race: Race;
    InclusionDate: Date = null;
    General: string;
    Diagnosis:PatientDiagnosis[] = new Array<PatientDiagnosis>();

    fromJSON(json:Object) {
        for (var propName in json)
            this[propName] = json[propName];
        return this;
    }
}

export enum Gender{
    Male,
    Female
}
export enum Race{
    Caucasian,
    Black,
    Latino,
    Asian,
    Other
}