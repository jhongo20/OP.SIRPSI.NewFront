import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account.service';
import { PsychosocialQuestionnaireService } from 'src/app/shared/services/psychosocial-questionnaire.service';

@Component({
  selector: 'app-intra-work-factors-questionnaire',
  templateUrl: './intra-work-factors-questionnaire.component.html',
  styleUrls: ['./intra-work-factors-questionnaire.component.scss'],
})
export class IntraWorkFactorsQuestionnaireComponent implements OnInit {
  @Input() idQuiz: string;
  @Input() clasificacion: string;
  @Input() usuario: any = null;
  @Output() propagar = new EventEmitter();
  @Output() propagarStart = new EventEmitter();

  idUsuario: string = this.accountService.userData.id;

  startQuiz = false;

  progress = 0;
  progressA = 0;

  index = 0;

  dataList: any[] = [];
  dataListA: any[] = [];

  resPutn1: any;
  resPutn2: any;
  resPutn3: any;
  dataListText: any = undefined;
  dataListTextA1 = [
    {
      title:
        'Las siguientes preguntas están relacionadas con las condiciones ambientales del(los) sitio(s) o lugar(es) donde habitualmente rea liza su trabajo. [1-12]',
      option: false,
      quiz: true,
      buton: true,
      min: 1,
      max: 12,
    },
    {
      title:
        'Para responder a las siguientes preguntas piense en la cantidad de trabajo que usted tiene a cargo. [13-15]',
      option: false,
      quiz: true,
      buton: true,
      min: 13,
      max: 15,
    },
    {
      title:
        'Las siguientes preguntas están relacionadas con el esfuerzo mental que le exige su trabajo [16-21]',
      option: false,
      quiz: true,
      buton: true,
      min: 16,
      max: 21,
    },
    {
      title:
        'Las siguientes preguntas están relacionadas con las responsabilidades y actividades que usted debe hacer en su trabajo. [22-30]',
      option: false,
      quiz: true,
      buton: true,
      min: 22,
      max: 30,
    },
    {
      title:
        'Las siguientes preguntas están relacionadas con la jornada de trabajo. [31-38]',
      option: false,
      quiz: true,
      buton: true,
      min: 31,
      max: 38,
    },
    {
      title:
        'Las siguientes preguntas están relacionadas con las decisiones y el control que le permite su trabajo. [39-47]',
      option: false,
      quiz: true,
      buton: true,
      min: 39,
      max: 47,
    },
    {
      title:
        'Las siguientes preguntas están relacionadas con cualquier tipo de cambio que ocurra en su trabajo. [48-52]',
      option: false,
      quiz: true,
      buton: true,
      min: 48,
      max: 52,
    },
    {
      title:
        'Las siguientes preguntas están relacionadas con la información que la empresa le ha dado sobre su trabajo. [53-59]',
      option: false,
      quiz: true,
      buton: true,
      min: 53,
      max: 59,
    },
    {
      title:
        'Las siguientes preguntas están relacionadas con la formación y capacitación que la empresa le facilita para hacer su trabajo. [60-62]',
      option: false,
      quiz: true,
      buton: true,
      min: 60,
      max: 62,
    },
    {
      title:
        'Las siguientes preguntas están relacionadas con el o los jefes con quien tenga más contacto. [63-75]',
      option: false,
      quiz: true,
      buton: true,
      min: 63,
      max: 75,
    },
    {
      title:
        'Las siguientes preguntas indagan sobre las relaciones con otras personas y el apoyo entre las personas de su trabajo. [76-89]',
      option: false,
      quiz: true,
      buton: true,
      min: 76,
      max: 89,
    },
    {
      title:
        'Las siguientes preguntas están relacionadas con la información que usted recibe sobre su rendimiento en el trabajo. [90-94]',
      option: false,
      quiz: true,
      buton: true,
      min: 90,
      max: 94,
    },
    {
      title:
        'Las siguientes preguntas están relacionadas con la satisfacción, reconocimiento y la seguridad que le ofrece su trabajo. [95-105]',
      option: false,
      quiz: true,
      buton: true,
      min: 95,
      max: 105,
    },
    {
      title:
        'Las siguientes preguntas están relacionadas con la atención a clientes y usuarios. En mi trabajo debo brindar servicio a clientes o usuarios. [106-114]',
      option: true,
      quiz: false,
      buton: false,
      min: 106,
      max: 114,
    },
    {
      title: 'Soy jefe de otras personas en mi trabajo.',
      subtitle:
        'Las siguientes preguntas están relacionadas con las personas que usted supervisa o dirige. [115-123]',
      option: true,
      quiz: false,
      buton: false,
      min: 115,
      max: 123,
    },
  ];

  dataListTextA2 = [
    {
      title:
        'Las siguientes preguntas están relacionadas con las condiciones ambientales del(los) sitio(s) o lu gar(es) donde habitualmente realiza su trabajo. [1-12]',
      option: false,
      quiz: true,
      buton: true,
      min: 1,
      max: 12,
    },
    {
      title:
        'Para responder a las siguientes preguntas piense en la cantidad de trabajo que usted tiene a cargo. [13-15]',
      option: false,
      quiz: true,
      buton: true,
      min: 13,
      max: 15,
    },
    {
      title:
        'Las siguientes preguntas están relacionadas con el esfuerzo mental que le exige su trabajo. [16-20]',
      option: false,
      quiz: true,
      buton: true,
      min: 16,
      max: 20,
    },
    {
      title:
        'Las siguientes preguntas están relacionadas con la jornada de trabajo. [21-28]',
      option: false,
      quiz: true,
      buton: true,
      min: 21,
      max: 28,
    },
    {
      title:
        'Las siguientes preguntas están relacionadas con las decisiones y el control que le permite su trabajo. [29-37]',
      option: false,
      quiz: true,
      buton: true,
      min: 29,
      max: 37,
    },
    {
      title:
        'Las siguientes preguntas están relacionadas con cualquier tipo de cambio que ocurra en su trabajo. [38-40]',
      option: false,
      quiz: true,
      buton: true,
      min: 38,
      max: 40,
    },
    {
      title:
        'Las siguientes preguntas están relacionadas con la información que la empresa le ha dado sobre su trabajo. [41-45]',
      option: false,
      quiz: true,
      buton: true,
      min: 41,
      max: 45,
    },
    {
      title:
        'Las siguientes preguntas están relacionadas con la formación y capacitación que la empresa le facilita para hacer su trabajo. [46-48]',
      option: false,
      quiz: true,
      buton: true,
      min: 46,
      max: 48,
    },
    {
      title:
        'Las siguientes preguntas están relacionadas con el o los jefes con quien tenga más contacto. [49-61]',
      option: false,
      quiz: true,
      buton: true,
      min: 49,
      max: 61,
    },
    {
      title:
        'Las siguientes preguntas indagan sobre las relaciones con otras personas y el apoyo entre las personas de su trabajo. [62-73]',
      option: false,
      quiz: true,
      buton: true,
      min: 62,
      max: 73,
    },
    {
      title:
        'Las siguientes preguntas están relacionadas con la información que usted recibe sobre su rendimiento en el trabajo. [74-78]',
      option: false,
      quiz: true,
      buton: true,
      min: 74,
      max: 78,
    },
    {
      title:
        'Las siguientes preguntas están relacionadas con la satisfacción, reconocimiento y la seguridad que le ofrece su trabajo. [79-88]',
      option: false,
      quiz: true,
      buton: true,
      min: 79,
      max: 88,
    },
    {
      title:
        'Las siguientes preguntas están relacionadas con la atención a clientes y usuarios. [89-97]',
      option: true,
      quiz: false,
      buton: false,
      min: 89,
      max: 97,
    },
  ];

  constructor(
    private psychosocialQuestionnaireService: PsychosocialQuestionnaireService,
    private accountService: AccountService
  ) {
    this.loadRadio();
  }

  ngOnInit(): void {
    this.formOfRealization(this.usuario).then((data: any) => {
      console.log(data);
      this.getQuestions();
    });
  }

  calculateProgress() {
    const totalItems = this.dataList.length;
    const answeredItems = this.dataList.filter(
      (data) => data.puntuacionA !== null
    ).length;
    this.progress = (answeredItems / totalItems) * 100;
  }

  calculateProgressA() {
    const totalItems = this.dataListA.length;
    const answeredItems = this.dataListA.filter(
      (data) => data.puntuacionA !== null
    ).length;
    this.progressA = (answeredItems / totalItems) * 100;
  }

  startQuizData() {
    this.startQuiz = true;
    this.propagarStart.emit();
    this.getDataList([]);
  }

  getDataList(lista: any[]) {
    this.psychosocialQuestionnaireService.getList().subscribe({
      next: (data) => {
        let list: any[] = data;
        list = list.sort((a, b) => a.posicion - b.posicion);
        this.dataList = list.filter(
          (d) =>
            d.forma === (this.clasificacion === 'Grupo Forma A' ? 'A1' : 'A2')
        );
        this.dataList.forEach((objeto) => {
          objeto.puntuacion = null;
          objeto.puntuacionA = null;
        });
        this.asignarPuntuaciones(lista);
        this.calculateProgress();
        if (this.clasificacion === 'Grupo Forma A') {
          this.dataListText = this.dataListTextA1;
          this.asginarPosicion();
        } else {
          this.dataListText = this.dataListTextA2;
          this.asginarPosicionB();
        }
      },
    });
  }

  asignarPuntuaciones(list: any[]) {
    this.dataList.forEach((objeto1) => {
      list.forEach((objeto2) => {
        if (objeto1.id === objeto2.idPreguntaEvaluacion) {
          objeto1.puntuacion = objeto2.puntuacion;
          objeto1.puntuacionA = objeto2.puntuacion;
        }
      });
    });
  }

  asginarPosicion() {
    let numero;
    if (this.resPutn1 === false) {
      this.dataList = this.dataList.filter(
        (p) => p.posicion < 106 || p.posicion > 114
      );
    }

    if (!this.resPutn2 === false) {
      this.dataList = this.dataList.filter(
        (p) => p.posicion < 115 || p.posicion > 123
      );
    }

    const lista = this.dataList.filter(
      (p) => p.puntuacion === null && p.puntuacionA === null
    );

    if (lista.length === 0) {
      numero = 0;
    } else {
      numero = lista[0].posicion;
    }
    switch (true) {
      case numero >= 1 && numero <= 12:
        this.index = 0;
        break;
      case numero >= 13 && numero <= 15:
        this.index = 1;
        break;
      case numero >= 16 && numero <= 21:
        this.index = 2;
        break;
      case numero >= 22 && numero <= 30:
        this.index = 3;
        break;
      case numero >= 31 && numero <= 38:
        this.index = 4;
        break;
      case numero >= 39 && numero <= 47:
        this.index = 5;
        break;
      case numero >= 48 && numero <= 52:
        this.index = 6;
        break;
      case numero >= 53 && numero <= 59:
        this.index = 7;
        break;
      case numero >= 60 && numero <= 62:
        this.index = 8;
        break;
      case numero >= 63 && numero <= 75:
        this.index = 9;
        break;
      case numero >= 76 && numero <= 89:
        this.index = 10;
        break;
      case numero >= 90 && numero <= 94:
        this.index = 11;
        break;
      case numero >= 95 && numero <= 105:
        this.index = 12;
        break;
      case numero >= 106 && numero <= 114:
        this.index = 13;
        break;
      case numero >= 115 && numero <= 123:
        this.index = 14;
        break;
      case numero === 0:
        this.propagar.emit();
        break;
      default:
        break;
    }
    this.dataListA = this.dataList.filter(
      (r) =>
        r.posicion >= this.dataListText[this.index].min &&
        r.posicion <= this.dataListText[this.index].max
    );
    this.calculateProgressA();
  }

  asginarPosicionB() {
    let numero;
    if (this.resPutn3 === false) {
      this.dataList = this.dataList.filter(
        (p) => p.posicion < 89 || p.posicion > 97
      );
    }
    const lista = this.dataList.filter(
      (p) => p.puntuacion === null && p.puntuacionA === null
    );

    if (lista.length === 0) {
      numero = 0;
    } else {
      numero = lista[0].posicion;
    }
    switch (true) {
      case numero >= 1 && numero <= 12:
        this.index = 0;
        break;
      case numero >= 13 && numero <= 15:
        this.index = 1;
        break;
      case numero >= 16 && numero <= 20:
        this.index = 2;
        break;
      case numero >= 21 && numero <= 28:
        this.index = 3;
        break;
      case numero >= 29 && numero <= 37:
        this.index = 4;
        break;
      case numero >= 38 && numero <= 40:
        this.index = 5;
        break;
      case numero >= 41 && numero <= 45:
        this.index = 6;
        break;
      case numero >= 46 && numero <= 48:
        this.index = 7;
        break;
      case numero >= 49 && numero <= 61:
        this.index = 8;
        break;
      case numero >= 62 && numero <= 73:
        this.index = 9;
        break;
      case numero >= 74 && numero <= 78:
        this.index = 10;
        break;
      case numero >= 79 && numero <= 88:
        this.index = 11;
        break;
      case numero >= 89 && numero <= 97:
        this.index = 12;
        break;
      case numero === 0:
        this.propagar.emit();
        break;
      default:
        break;
    }
    this.dataListA = this.dataList.filter(
      (r) =>
        r.posicion >= this.dataListText[this.index].min &&
        r.posicion <= this.dataListText[this.index].max
    );
    this.calculateProgressA();
  }

  clickContinue() {
    if (this.dataListText.length === this.index + 1) {
      this.propagar.emit();
    } else {
      this.index++;
      this.progressA = 0;
      this.dataListA = this.dataList.filter(
        (r) =>
          r.posicion >= this.dataListText[this.index].min &&
          r.posicion <= this.dataListText[this.index].max
      );
    }
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
    this.calculateProgressA();
  }

  changeOption1(e: any, i: number) {
    if (e) {
      localStorage.setItem('resPutn1', `${e}`);
      this.dataListTextA1[i].quiz = e;
      this.dataListTextA1[i].buton = e;
      this.calculateProgressA();
    } else {
      console.log(localStorage.getItem('resPutn1'));
      this.dataListTextA1[i].buton = true;
      this.dataListTextA1[i].quiz = e;
      this.progressA = 100;
    }
  }

  changeOption2(e: any, i: number) {
    console.log(e, i);
    if (e) {
      localStorage.setItem('resPutn2', `${e}`);
      this.dataListTextA1[i].quiz = e;
      this.dataListTextA1[i].buton = e;
      this.calculateProgressA();
    } else {
      localStorage.setItem('resPutn2', `${e}`);
      this.dataListTextA1[i].buton = true;
      this.dataListTextA1[i].quiz = e;
      this.progressA = 100;
    }
  }

  changeOption3(e: any, i: number) {
    if (e) {
      localStorage.setItem('resPutn3', `${e}`);
      this.dataListTextA2[i].quiz = e;
      this.dataListTextA2[i].buton = e;
      this.calculateProgressA();
    } else {
      localStorage.setItem('resPutn3', `${e}`);
      this.dataListTextA2[i].buton = true;
      this.dataListTextA2[i].quiz = e;
      this.progressA = 100;
    }
  }

  loadRadio() {
    const data = localStorage.getItem('resPutn1');
    const data2 = localStorage.getItem('resPutn2');
    const data3 = localStorage.getItem('resPutn3');
    if (data === 'true') {
      this.resPutn1 = true;
    } else if (data === 'false') {
      this.resPutn1 = false;
    }

    if (data2 === 'true') {
      this.resPutn2 = true;
    } else if (data2 === 'false') {
      this.resPutn2 = false;
    }

    if (data3 === 'true') {
      this.resPutn3 = true;
    } else if (data3 === 'false') {
      this.resPutn3 = false;
    }
  }

  getQuestions() {
    this.psychosocialQuestionnaireService
      .getListResponse(this.idUsuario)
      .subscribe({
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
      });
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
      idUserEvaluacion: this.idUsuario,
      idDimension: data.idDimension,
      idDominio: data.dominio,
    };
    this.psychosocialQuestionnaireService
      .createPsychosocialQuestionnaire(res)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: () => {
          console.log(data);
        },
      });
  }

  updateQuestions(data: any, resp: number, punt: string) {
    this.psychosocialQuestionnaireService
      .updatePsychosocialQuestionnaire(data.id, resp, punt)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: () => {
          console.log(data);
        },
      });
  }

  async formOfRealization(data?: any) {
    console.log(data);
    this.idUsuario =
      data != null ? data.idUsuario : this.accountService.userData.id;
    return true;
  }

  cleanData() {
    localStorage.removeItem('resPutn1');
    localStorage.removeItem('resPutn2');
    localStorage.removeItem('resPutn3');
  }
}
