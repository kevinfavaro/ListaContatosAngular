import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url: string = "https://localhost:44383/api/";
  constructor(private http: HttpClient) {

  }

  get(endpoint: string): Observable<any> {
    return this.http.get<any>(this.url + endpoint);
  }

  post(endpoint: string, body: any): Observable<any> {
    return this.http.post<any>(this.url + endpoint, body);
  }

  put(endpoint: string, id: number, body: any): Observable<any> {
    return this.http.put<any>(this.url + endpoint + '/' + id, body);
  }

  delete(endpoint: string, id: number): Observable<any> {
    return this.http.delete<any>(this.url + endpoint + '/' + id);
  }
}
