import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CEP } from '../../model/cepAPI';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http : HttpClient) { }

  public getZipCodeInfo(zipCode : string): Observable<CEP>{
    return this.http.get<CEP>(`http://viacep.com.br/ws/${zipCode}/json/`)
  }
}
