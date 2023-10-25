import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/core/models/response';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';
import { skipApiKey } from 'src/app/core/interceptors/skip-api-key';

@Injectable({
  providedIn: 'root',
})
export class WorkCenterService {
  constructor(
    public http: HttpClient,
    private accountService: AccountService
  ) {}

  public GetAll(origin: string, data?: any): Observable<any> {
    return this.http.get<any>(
      environment.urlApi + origin + (data != null ? data : ''),
      { context: skipApiKey() }
    );
  }
  public GetById(origin: string, id: any): Observable<Response> {
    return this.http.get<Response>(environment.urlApi + origin + '/' + id, {
      context: skipApiKey(),
    });
  }
  public Post(origin: string, data?: any): Observable<any> {
    return this.http.post<any>(environment.urlApi + origin, data);
  }
  public Put(origin: string, data?: any): Observable<any> {
    return this.http.put<any>(environment.urlApi + origin, data);
  }
  public DeleteUserWorkCenter(user: any, workCenter: any): Observable<any> {
    return this.http.delete<any>(
      environment.urlApi +
        `userWorkPlace/EliminarCentroTrabajoUsuario?centroTrabajo=${workCenter}&user=${user}`
    );
  }
  public DeletePsychologistWorkCenter(
    user: any,
    workCenter: any
  ): Observable<any> {
    return this.http.delete<any>(
      environment.urlApi +
        `psicologosCentroTrabajo/DesvincularPsicologoCentroTrabajo?centroTrabajo=${workCenter}&user=${user}`
    );
  }
  public ChangeStatus(
    origin: string,
    id: string,
    estado: string
  ): Observable<any> {
    return this.http.put<any>(environment.urlApi + origin, {
      Id: id,
      IdEstado: estado,
    });
  }
}
