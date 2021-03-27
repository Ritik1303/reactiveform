import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  _url = "";
  constructor(private _http: HttpClient) { }
  register(userdata: any){
    return this._http.post<any>(this._url, userdata);
  }
}
