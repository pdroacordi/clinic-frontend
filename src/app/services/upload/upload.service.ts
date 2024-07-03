import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { Observable } from 'rxjs';
import { PathToFile } from '../../model/PathToFile';
import { environment } from '../../../environments/environment';
import { Media } from '../../model/Media';

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

  public saveMedia(media : Media, patientId : number): Observable<Media>{
    let header = {
      "Authorization" : this.auth.getToken()
    };
    return this.http.post<Media>(`${environment.API_URL}/media/${patientId}`, media, {headers: header});
  }

  public deleteFile(media : Media): Observable<any>{
    let header = {
      "Authorization" : this.auth.getToken()
    };
    return this.http.delete<any>(`${environment.API_URL}/upload?path=${encodeURIComponent(media.link)}`, {headers: header});
  }

  public deleteMedia(media : Media): Observable<any>{
    let header = {
      "Authorization" : this.auth.getToken()
    };
    return this.http.delete<Media>(`${environment.API_URL}/media/${media.id}`, {headers: header});
  }
}
