import { Diagnosis } from "./Diagnosis";

export class Patient {
    id: number = 0;
    name: string = "";
    birthday: string = "";
    gender: string = "";
    phoneNumber : string = "";
    email : string = "";
    zipCode: string = "";
    address: string = "";
    addOn: string = "";
    num: string = "";
    city: string = "";
    state: string = "";
    occupation: string = "";
    diagnosis: Diagnosis = new Diagnosis();
    active: number = 0;
}
  