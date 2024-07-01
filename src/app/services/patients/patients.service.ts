import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Patient } from '../../model/Patient';
import { environment } from '../../../environments/environment.development';
import { LoginService } from '../auth/login.service';
import { Pageable } from '../../model/Pageable';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private authService : LoginService, private http : HttpClient) { }

  public getPatientsByName(name : string): Observable<Patient[]>{
    let header = {
      "Authorization" : this.authService.getToken()
    };
    return this.http.get<Patient[]>(`${environment.API_URL}/patients/search?name=${name}`, {headers: header});
  }

  public getPatientById(id : number): Observable<Patient>{
    let header = {
      "Authorization" : this.authService.getToken()
    };
    return this.http.get<Patient>(`${environment.API_URL}/patients/${id}`, {headers: header});
  }

  public getAllPatients(page : number = 0): Observable<Pageable>{
    let header = {
      "Authorization" : this.authService.getToken()
    };
    return this.http.get<Pageable>(`${environment.API_URL}/patients?p=${page}`, {headers: header});
  }

  public createPatient(patient : Patient): Observable<Patient>{
    let header = {
      "Authorization" : this.authService.getToken()
    };
    return this.http.post<Patient>(`${environment.API_URL}/patients`, patient, {headers: header})
  }

  public updatePatient(patient : Patient): Observable<Patient>{
    let header = {
      "Authorization" : this.authService.getToken()
    };
    console.log(patient);
    return this.http.put<Patient>(`${environment.API_URL}/patients/${patient.id}`, patient, {headers: header});
  }
}
