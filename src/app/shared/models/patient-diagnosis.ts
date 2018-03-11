import { MedicalInstitution } from './medical-institution';
export class PatientDiagnosis{
    Id:number;
    PatientId: string;
    DoctorId: string;
    DoctorName: string;
    MedicalInstitution: MedicalInstitution = new MedicalInstitution();
    InOutPatient: boolean;
    DiagnosisDate: Date = null;
    DischargeDate: Date = null;
    InclusionDate: Date = null;
    General: string;
    Symptoms: {[Key:string]:any} = {};

    constructor(pid:string){
        this.PatientId = pid;
    }
    fromJSON(json:Object) {
        for (var propName in json)
            this[propName] = json[propName];
        return this;
    }
}