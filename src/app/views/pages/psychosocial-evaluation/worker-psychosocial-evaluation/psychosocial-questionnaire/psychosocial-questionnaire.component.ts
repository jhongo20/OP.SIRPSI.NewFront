import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { PsychosocialQuestionnaireService } from 'src/app/shared/services/psychosocial-questionnaire.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-psychosocial-questionnaire',
  templateUrl: './psychosocial-questionnaire.component.html',
  styleUrls: ['./psychosocial-questionnaire.component.scss'],
})
export class PsychosocialQuestionnaireComponent implements OnInit {
  defaultNavActiveId = 1;

  tiempoRestante = 0;

  view = false;

  tab1 = false;
  tab2 = true;
  tab3 = true;
  tab4 = true;

  nombrePsicologo: string = '';
  telPsicologo: string = '';
  docPsicologo: string = '';
  emailPsicologo: string = '';
  radicado: string = '';

  horas: string = '02';
  minutos: string = '00';
  segundos: string = '00';
  cronometroActivo: boolean = false;
  intervalo: any;

  idQuiz = '';
  clasificacion = '';
  final = false;

  datos: any[] = [];

  evaluation: any = null;

  idUsuario: string = this.accountService.userData.id;
  documentoEmpresa: string = this.accountService.userData.empresa.documento;
  consecutivoEmpresa: number =
    this.accountService.userData.empresa.idConsecutivo;

  constructor(
    private loadingService: LoadingService,
    private genericService: GenericService,
    private router: Router,
    private psychosocialQuestionnaireService: PsychosocialQuestionnaireService,
    private accountService: AccountService,
    @Optional()
    public dialogRef: MatDialogRef<PsychosocialQuestionnaireComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.cleanData();
    this.formOfRealization(this.data != null ? this.data.item : null).then(
      (data: any) => {
        console.log(data);
        this.loadingService.ChangeStatusLoading(false);
        this.getQuiz();
        this.comprobarCronometro();
      }
    );
  }

  getDialog() {
    const data = localStorage.getItem('viewQuiz');
    if (data == 'null') this.modalAlertConfirmation();
    else if (data == 'false') this.router.navigate(['/dashboard']);
    else this.view = true;
  }

  getFinal() {
    const data =
      localStorage.getItem('final')?.toLowerCase() === 'true' ? true : false;
    if (data) {
      this.final = true;
      //this.getIdQuizFinal();
    }
  }

  modalAlertConfirmation() {
    var messageInfo =
      '<p class="texto-mensaje"> Estimado/a Usuario/a, este módulo le permite realizar la evaluación psicosocial con la asesoría del Psicólogo Especialista SST de la empresa. Toda la información que proporcione será confidencial y solo estará disponible para el Psicólogo Especialista SST designado por la empresa. Si necesita el informe individual con el resultado de la evaluación, deberá solicitarlo al Psicólogo Especialista SST respectivo. Antes de comenzar la evaluación, es importante que lea y comprenda el consentimiento informado disponible en el siguiente enlace <a href="#">Información de consentimiento</a>.</p>';
    Swal.fire({
      icon: 'info',
      title: 'Estimado(a) usuario(a)',
      html: messageInfo,
      confirmButtonText: 'Sí Acepto',
      cancelButtonText: 'No Acepto',
      showCancelButton: true,
    }).then((result) => {
      this.saveConsent(result.isConfirmed);
      if (result.isConfirmed) {
        this.view = true;
      } else this.router.navigate(['/dashboard']);
    });
  }

  modalAlertNotFountQuiz() {
    var messageInfo =
      '<p class="texto-mensaje">Estimado/a Usuario/a, en este momento la realización de la evaluación psicosocial no está habilitada</p>';
    Swal.fire({
      icon: 'info',
      title: 'Estimado(a) usuario(a)',
      html: messageInfo,
      confirmButtonText: 'Sí Acepto',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.data != null) this.dialogRef.close();
        else this.router.navigate(['/dashboard']);
      }
    });
  }

  startQuiz() {
    // Verificar si ya se ha iniciado el cronómetro
    if (this.tiempoRestante === 0) {
      // Configurar la duración del quiz (2 horas = 7200000 ms)
      this.tiempoRestante = 7200000;

      // Obtener la hora de inicio actual
      const horaInicio = new Date().getTime();

      // Guardar la hora de inicio en localStorage
      localStorage.setItem('horaInicio', horaInicio.toString());

      // Iniciar el cronómetro
      this.iniciarDetenerCronometro();
    }
    this.getIdQuiz();
    this.getClasificacionQuiz();
  }

  getIdQuiz() {
    this.psychosocialQuestionnaireService.getIdQuiz(this.idUsuario).subscribe({
      next: (data) => {
        this.idQuiz = data[0].id;
        this.getFinal();
      },
      error: (err) => {
        this.view = false;
      },
    });
  }

  getClasificacionQuiz() {
    this.psychosocialQuestionnaireService
      .getQuizClasificacion(this.idUsuario)
      .subscribe({
        next: (data) => {
          this.clasificacion = data.clasificacion;
        },
        error: (err) => {
          this.view = false;
        },
      });
  }

  getQuiz() {
    this.psychosocialQuestionnaireService.getIdQuiz(this.idUsuario).subscribe({
      next: (data) => {
        this.evaluation = data;
        localStorage.setItem(
          'viewQuiz',
          `${data.length > 0 ? data[0].consentimiento : null}`
        );
        const dataList: any[] = data;
        if (dataList.length === 0) {
          this.modalAlertNotFountQuiz();
        } else {
          const fechaProvidenciada: Date = new Date(data[0].fechaInicio);
          const fechaActual: Date = new Date();
          fechaActual.setHours(0, 0, 0, 0);
          const quitarHoraZonaHoraria = (fecha: Date): Date => {
            const nuevaFecha = new Date(fecha.toISOString().split('T')[0]);
            nuevaFecha.setHours(0, 0, 0, 0);
            return nuevaFecha;
          };

          if (
            quitarHoraZonaHoraria(fechaProvidenciada).getTime() !==
            quitarHoraZonaHoraria(fechaActual).getTime()
          ) {
            this.modalAlertNotFountQuiz();
          } else {
            this.nombrePsicologo = data[0].namePsicologo;
            this.telPsicologo = data[0].telefono;
            this.docPsicologo = data[0].documentoPsicologo;
            this.emailPsicologo = data[0].emailPsicologo;
            this.getDialog();
          }
        }
      },
      error: (err) => {
        this.modalAlertNotFountQuiz();
      },
    });
  }

  comprobarCronometro() {
    const horaInicio = localStorage.getItem('horaInicio');
    if (horaInicio) {
      // Calcular el tiempo transcurrido desde la hora de inicio
      const horaInicioTimestamp = parseInt(horaInicio, 10);
      const ahora = new Date().getTime();
      const tiempoTranscurrido = ahora - horaInicioTimestamp;

      // Obtener la duración del quiz (2 horas = 7200000 ms)
      const duracionQuiz = 2 * 60 * 60 * 1000;

      // Restar el tiempo transcurrido de la duración del quiz
      this.tiempoRestante = duracionQuiz - tiempoTranscurrido;

      // Asegurarse de que el tiempo restante no sea negativo
      if (this.tiempoRestante < 0) {
        this.tiempoRestante = 0;
      }

      // Iniciar el cronómetro
      this.iniciarDetenerCronometro();
    }
    this.getIdQuiz();
    this.getClasificacionQuiz();
  }

  iniciarDetenerCronometro() {
    if (this.cronometroActivo) {
      clearInterval(this.intervalo);
    } else {
      this.intervalo = setInterval(() => {
        if (this.tiempoRestante <= 0) {
          clearInterval(this.intervalo);
          this.cronometroActivo = false;
        } else {
          const horas = Math.floor(this.tiempoRestante / 3600000); // 1 hora = 3600000 ms
          const minutos = Math.floor((this.tiempoRestante % 3600000) / 60000);
          const segundos = Math.floor((this.tiempoRestante % 60000) / 1000);

          this.tiempoRestante -= 1000; // Restar 1 segundo

          // Formatear los números para mostrarlos con un "0" al frente si son menores a 10
          this.horas = horas < 10 ? `0${horas}` : `${horas}`;
          this.minutos = minutos < 10 ? `0${minutos}` : `${minutos}`;
          this.segundos = segundos < 10 ? `0${segundos}` : `${segundos}`;
        }
      }, 1000);
    }
    this.cronometroActivo = !this.cronometroActivo;
  }

  completeQuiz1() {
    this.updateCompletedQuestionnaires(1);
    this.tab1 = true;
    this.tab2 = false;
    this.defaultNavActiveId = 2;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  completeQuiz2() {
    this.updateCompletedQuestionnaires(2);
    this.tab2 = true;
    this.tab3 = false;
    this.defaultNavActiveId = 3;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  completeQuiz3() {
    this.updateCompletedQuestionnaires(3);
    this.tab3 = true;
    this.tab4 = false;
    this.defaultNavActiveId = 4;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  completeQuiz4() {
    // this.updateCompletedQuestionnaires(4);
    this.radicado = `${this.documentoEmpresa}${
      this.docPsicologo
    }${new Date().getFullYear()}${
      new Date().getMonth() + 1
    }${new Date().getDate()}${this.consecutivoEmpresa}`;
    this.saveRadicado();
  }

  saveRadicado() {
    this.psychosocialQuestionnaireService
      .saveRadicado(this.idQuiz, this.radicado)
      .subscribe({
        next: (data) => {
          this.final = true;
          localStorage.clear();
          localStorage.setItem('final', 'true');
          localStorage.setItem('viewQuiz', 'true');
        },
        error: () => {
          this.final = true;
          localStorage.clear();
          localStorage.setItem('final', 'true');
          localStorage.setItem('viewQuiz', 'true');
        },
      });
  }

  saveConsent(Consent: boolean) {
    var data = {
      Id: this.evaluation[0].id,
      Consentimiento: Consent,
    };
    this.genericService
      .Put('evaluacionPsicosocial/ActualizarConsentimientoEvaluacion', data)
      .subscribe(() => localStorage.setItem('viewQuiz', `${Consent}`));
  }

  async updateCompletedQuestionnaires(Quest: number) {
    this.loadingService.ChangeStatusLoading(true);
    var data = {
      Id: this.evaluation[0].id,
      Cuestionario: Quest,
    };
    this.genericService
      .Put('evaluacionPsicosocial/ActualizarCuestionariosRealizados', data)
      .subscribe(() => {
        setInterval(() => {
          this.loadingService.ChangeStatusLoading(false);
        }, 1000);
        return true;
      });
  }

  async formOfRealization(data?: any) {
    this.idUsuario =
      data != null ? data.idUsuario : this.accountService.userData.id;

    this.documentoEmpresa =
      data != null
        ? data.usuario.empresa.documento
        : this.accountService.userData.empresa.documento;

    this.consecutivoEmpresa =
      data != null
        ? data.usuario.empresa.idConsecutivo
        : this.accountService.userData.empresa.idConsecutivo;
    return true;
  }

  cleanData() {
    localStorage.removeItem('viewQuiz');
    localStorage.removeItem('final');
    localStorage.removeItem('horaInicio');
  }
}
