import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../app/interfaces/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly apiURL = 'http://localhost:3000/api/items';

  constructor(private _http: HttpClient) {}

  getData(): Observable<Employee[]> {
    return this._http.get<Employee[]>(`${this.apiURL}`);
  }

  postData(body: any): Observable<any> {
    return this._http.post<any>(`${this.apiURL}`, body);
  }

  deleteData(id: number | undefined): Observable<any> {
    return this._http.delete<any>(`${this.apiURL}/${id}`);
  }

  getDataById(id: number | undefined): Observable<any> {
    return this._http.get<any>(`${this.apiURL}/${id}`);
  }
}
