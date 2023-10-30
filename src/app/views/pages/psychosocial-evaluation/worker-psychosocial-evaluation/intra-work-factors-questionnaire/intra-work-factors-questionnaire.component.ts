import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account.service';
import { PsychosocialQuestionnaireService } from 'src/app/shared/services/psychosocial-questionnaire.service';

@Component({
  selector: 'app-intra-work-factors-questionnaire',
  templateUrl: './intra-work-factors-questionnaire.component.html',
  styleUrls: ['./intra-work-factors-questionnaire.component.scss']
})
export class IntraWorkFactorsQuestionnaireComponent implements OnInit {


  @Input() idQuiz: string;
  @Output() propagar = new EventEmitter();
  @Output() propagarStart = new EventEmitter();

  startQuiz = false;

  progress = 0;

  dataList: any[] = [];

  dataListText = [
    {
      title: 'Las siguientes preguntas están relacionadas con las condiciones ambientales del(los) sitio(s) o lugar(es) donde habitualmente rea liza su trabajo. [1-12]'
    },
    {
      title: 'Para responder a las siguientes preguntas piense en la cantidad de trabajo que usted tiene a cargo. [13-15]'
    },
    {
      title: 'Las siguientes preguntas están relacionadas con el esfuerzo mental que le exige su trabajo [16-21]'
    },
    {
      title: 'Las siguientes preguntas están relacionadas con las responsabilidades y actividades que usted debe hacer en su trabajo. [22-30]'
    },
    {
      title: 'Las siguientes preguntas están relacionadas con la jornada de trabajo. [31-38]'
    },
    {
      title: 'Las siguientes preguntas están relacionadas con las decisiones y el control que le permite su trabajo. [39-47]'
    },
    {
      title: 'Las siguientes preguntas están relacionadas con cualquier tipo de cambio que ocurra en su trabajo. [48-52]'
    },
    {
      title: 'Las siguientes preguntas están relacionadas con la información que la empresa le ha dado sobre su trabajo. [53-59]'
    },
    {
      title: 'Las siguientes preguntas están relacionadas con la formación y capacitación que la empresa le facilita para hacer su trabajo. [60-62]'
    },
    {
      title: 'Las siguientes preguntas están relacionadas con el o los jefes con quien tenga más contacto. [63-75]'
    },
    {
      title: 'Las siguientes preguntas indagan sobre las relaciones con otras personas y el apoyo entre las personas de su trabajo. [76-89]'
    },
    {
      title: 'Las siguientes preguntas están relacionadas con la información que usted recibe sobre su rendimiento en el trabajo. [90-94]'
    },
    {
      title: 'Las siguientes preguntas están relacionadas con la satisfacción, reconocimiento y la seguridad que le ofrece su trabajo. [95-105]'
    },
    {
      title: 'Las siguientes preguntas están relacionadas con la atención a clientes y usuarios. En mi trabajo debo brindar servicio a clientes o usuarios: Si [ ] No [ ]. [106-114]'
    },
    {
      title: 'Soy jefe de otras personas en mi trabajo: Si [ ] No [ ], Las siguientes preguntas están relacionadas con las personas que usted supervisa o dirige. [115-123]'
    },
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
    this.propagarStart.emit();
    this.getDataList([]);
  }


  getDataList(lista: any[]) {
    this.psychosocialQuestionnaireService.getList().subscribe({
      next: (data) => {
        const list: any[] = data;
        this.dataList = list.filter(d => d.forma === 'A1');
        this.dataList.forEach((objeto) => {
          objeto.puntuacion = null;
          objeto.puntuacionA = null;
        });
        this.asignarPuntuaciones(lista);
        this.calculateProgress();
      },
    })
  }

  asignarPuntuaciones(list : any[]) {
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
          this.startQuiz = true;
          this.getDataList(list);
        }
      },
      error: () => {
        this.startQuiz = false;
      },
    })
  }

  saveQuestions(data: any, resp: number, punt: string){
    if(data.puntuacion === null){
      this.createQuestions(data, resp, punt);
      data.puntuacion === punt;
    }else if(data.puntuacionA !== data.puntuacion){
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

  updateQuestions(data: any, resp : number,punt: string) {
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
