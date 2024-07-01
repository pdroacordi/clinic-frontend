import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { Observable } from 'rxjs';
import { PathToFile } from '../../model/PathToFile';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http : HttpClient, private auth : LoginService) { }

  public uploadFile(formData : FormData): Observable<PathToFile>{
    let header = {
      "Authorization" : this.auth.getToken()
    };
    return this.http.post<PathToFile>(`${environment.API_URL}/upload`, formData, {headers: header});
  }
}
