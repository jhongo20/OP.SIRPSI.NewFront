import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import Swal from 'sweetalert2';
import { PsychosocialQuestionnaireComponent } from '../worker-psychosocial-evaluation/psychosocial-questionnaire/psychosocial-questionnaire.component';

@Component({
  selector: 'app-support-psychosocial-evaluation',
  templateUrl: './support-psychosocial-evaluation.component.html',
  styleUrls: ['./support-psychosocial-evaluation.component.scss'],
})
export class SupportPsychosocialEvaluationComponent implements OnInit {
  public formInitial: FormGroup;
  listWorkCenterUser: any;
  listEvaluation: any;
  countListUsers: number = 0;
  listUsersSelected: any = [];
  viewTable = false;
  workCenterSelected = '';
  public filter: string = '';
  public table: string = '';
  public columns = [
    { name: 'Fecha convocatoria', data: 'fechaInicio', pipeDate: 'YYYY/dd/MM' },
    { name: 'Número de documento ', data: 'usuario', property: 'cedula' },
    { name: 'Nombre', data: 'usuario', property: 'nombreUsuario' },
    { name: 'Apellidos', data: 'usuario', property: 'apellidosUsuario' },
    { name: 'Ocupación o profesión', data: 'ocupacion' },
    { name: 'Forma', data: 'forma' },
    // { name: 'Estado', data: 'estado', property: 'nombre' },
  ];
  public options = [
    {
      delete: false,
      edit: false,
      details: false,
      select: true,
      state: false,
      pdf: true,
      validationSelect: false,
      check: false,
    },
  ];
  public title: string = '';
  tab: number = 0;
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private genericService: GenericService,
    private loadingService: LoadingService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadingService.ChangeStatusLoading(true);
    this.getListas();
    this.title = 'hola';
    this.formInitial = this.formBuilder.group({
      IdCentroTrabajo: ['', Validators.required],
      FechaInicio: ['', Validators.required],
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }

  getListas() {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .GetAll(
        'userWorkPlace/ConsultarCentroDeTrabajoUsuario?user=' +
          this.accountService.userData.id
      )
      .subscribe((data: any) => {
        this.listWorkCenterUser = data;
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
      });
  }

  selectedRow(event: any, type: number) {
    const dialogRef = this.dialog.open(
      type == 1
        ? PsychosocialQuestionnaireComponent
        : type == 2
        ? PsychosocialQuestionnaireComponent
        : PsychosocialQuestionnaireComponent,
      {
        data: {
          item: event,
          details: true,
        },
      }
    );
    dialogRef.afterClosed().subscribe();
  }

  searchWorkers() {
    this.loadingService.ChangeStatusLoading(true);
    this.viewTable = false;
    setInterval(() => {
      this.workCenterSelected = '';
      this.table = '';
      this.filter = '';
      this.workCenterSelected = this.formInitial.value.IdCentroTrabajo;
      this.table =
        'evaluacionPsicosocial/ConsultarUsuariosDiscapacidadEvaluacion';
      this.filter = '&workCenter=' + this.workCenterSelected;
      this.viewTable = true;
    }, 1400);
  }

  downloadPdf() {
    const templateFileName =
      'Cuestionario de Factores de Riesgo Psicosocial Intralaboral FORMA A.pdf';
    const templateFilePath = `./../../../../../assets/template/${templateFileName}`;

    const a = document.createElement('a');
    a.href = templateFilePath;
    a.download = templateFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
