import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class getService {
  constructor(private http: HttpClient) {}
  obtenerDatos(urlServices: string): Observable<any> {
    const url = urlServices;
    return this.http.get(url);
  }
}
