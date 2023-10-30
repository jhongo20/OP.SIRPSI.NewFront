import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { AccountService } from 'src/app/shared/services/account.service';
import { PsychosocialQuestionnaireService } from 'src/app/shared/services/psychosocial-questionnaire.service';

@Component({
  selector: 'app-non-work-factors-questionnaire',
  templateUrl: './non-work-factors-questionnaire.component.html',
  styleUrls: ['./non-work-factors-questionnaire.component.scss']
})
export class NonWorkFactorsQuestionnaireComponent implements OnInit {

  @Input() idQuiz: string;
  @Output() propagar = new EventEmitter();

  startQuiz = false;

  progress = 0;

  dataList: any[] = [];

  dataListText = [
    {
      title: 'Las siguientes preguntas están relacionadas con varias condiciones de la zona donde usted vive: [1-13]'
    },
    {
      title: 'Las siguientes preguntas están relacionadas con su vida fuera del trabajo: [14-31]'
    }
  ]

  constructor(
    private psychosocialQuestionnaireService: PsychosocialQuestionnaireService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.getQuestions();
  }

  calculateProgress() {
    const totalItems = this.dataList.length;
    const answeredItems = this.dataList.filter(data => data.puntuacionA !== null).length;
    this.progress = (answeredItems / totalItems) * 100;
  }


  startQuizData() {
    this.startQuiz = true;
  }


  getDataList(lista: any[]) {
    this.psychosocialQuestionnaireService.getList().subscribe({
      next: (data) => {
        const list: any[] = data;
        this.dataList = list.filter(d => d.forma === 'A3');
        this.dataList.forEach((objeto) => {
          objeto.puntuacion = null;
          objeto.puntuacionA = null;
        });
        this.asignarPuntuaciones(lista);
        this.calculateProgress();
      },
    })
  }

  asignarPuntuaciones(list: any[]) {
    this.dataList.forEach(objeto1 => {
      list.forEach(objeto2 => {
        if (objeto1.id === objeto2.idPreguntaEvaluacion) {
          objeto1.puntuacion = objeto2.puntuacion;
          objeto1.puntuacionA = objeto2.puntuacion;
        }
      });
    });
  }

  clickContinue() {
    this.propagar.emit();
  }

  changeResponse(e: any, data: any) {
    switch (e) {
      case '0':
        this.saveQuestions(data, data.siempre, e);
        break;
      case '1':
        this.saveQuestions(data, data.casiSiempre, e);
        break;
      case '2':
        this.saveQuestions(data, data.algunasVeces, e);
        break;
      case '3':
        this.saveQuestions(data, data.casiNunca, e);
        break;
      case '4':
        this.saveQuestions(data, data.nunca, e);
        break;
      default:
        break;
    }
    this.calculateProgress();
  }

  getQuestions() {
    this.psychosocialQuestionnaireService.getListResponse(this.accountService.userData.id).subscribe({
      next: (data) => {
        const list: any[] = data;
        if (list.length !== 0) {
          this.getDataList(list);
        }
      },
      error: () => {
        this.startQuiz = false;
      },
    })
  }

  saveQuestions(data: any, resp: number, punt: string) {
    if (data.puntuacion === null) {
      this.createQuestions(data, resp, punt);
      data.puntuacion === punt;
    } else if (data.puntuacionA !== data.puntuacion) {
      this.updateQuestions(data, resp, punt);
      data.puntuacion === punt;
    }
  }

  createQuestions(data: any, resp: number, punt: string) {
    const res = {
      idEvaluacionPsicosocialUsuario: this.idQuiz,
      idPreguntaEvaluacion: data.id,
      respuesta: resp,
      puntuacion: punt,
      idUserEvaluacion: this.accountService.userData.id,
      idDimension: data.idDimension,
      idDominio: data.dominio
    }
    this.psychosocialQuestionnaireService.createPsychosocialQuestionnaire(res).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: () => {
        console.log(data);
      },
    })
  }

  updateQuestions(data: any, resp: number, punt: string) {
    this.psychosocialQuestionnaireService.updatePsychosocialQuestionnaire(data.id, resp, punt).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: () => {
        console.log(data);
      },
    })
  }

}
