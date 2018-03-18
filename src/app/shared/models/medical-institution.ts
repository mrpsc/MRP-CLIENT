export class MedicalInstitution{
    Id:number;
    Name:string;

    fromJSON(json:Object) {
        for (var propName in json)
            this[propName] = json[propName];
        return this;
    }
}