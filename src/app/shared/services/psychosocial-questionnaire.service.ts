import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PsychosocialQuestionnaireService {

  constructor(
    private http: HttpClient,
  ) { }

  public getList(): Observable<any> {
    return this.http
      .get<any>(environment.urlApi + 'Preguntas/ConsultarPreguntas')
      .pipe(
        map((res) => {
          if (res.Status == '400') {
            console.log(res);
          }
          return res;
        })
      );
  }

  public getListResponse(id : string): Observable<any> {
    return this.http
      .get<any>(environment.urlApi + `Preguntas/ConsultarRespuestasUsuarios?idUsuario=${id}`)
      .pipe(
        map((res) => {
          if (res.Status == '400') {
            console.log(res);
          }
          return res;
        })
      );
  }

  public createPsychosocialQuestionnaire(data : any): Observable<any> {
    return this.http
      .post(environment.urlApi + `Preguntas/GuardarRespuestasPreguntas`, data)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public createFinal(data : any): Observable<any> {
    return this.http
      .post(environment.urlApi + `Preguntas/RegitroEmpleados`, data)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public getIdQuiz(id : string): Observable<any> {
    return this.http
      .get<any>(environment.urlApi + `evaluacionPsicosocial/ConsultarEvaluacionUsuarioId?idUsers=${id}`)
      .pipe(
        map((res) => {
          if (res.Status == '400') {
            console.log(res);
          }
          return res;
        })
      );
  }

  public getResultQuizFinal(id : string): Observable<any> {
    return this.http
      .get<any>(environment.urlApi + `Preguntas/ConsultarBrutoDimension?IdEvaluacion=${id}`)
      .pipe(
        map((res) => {
          if (res.Status == '400') {
            console.log(res);
          }
          return res;
        })
      );
  }

  public updatePsychosocialQuestionnaire(id : string, res : number, punt : string): Observable<any> {
    return this.http
      .put(environment.urlApi + `Preguntas/ActualizarRespuestasPreguntas?id_pregunta=${id}&responseData=${res}&puntuacion=${punt}`, {})
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
