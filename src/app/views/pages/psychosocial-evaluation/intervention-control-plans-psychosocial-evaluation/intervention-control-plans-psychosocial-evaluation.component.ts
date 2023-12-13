import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { InterventionControlPlansPsychosocialEvaluationFormComponent } from './intervention-control-plans-psychosocial-evaluation-form/intervention-control-plans-psychosocial-evaluation-form.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-intervention-control-plans-psychosocial-evaluation',
  templateUrl:
    './intervention-control-plans-psychosocial-evaluation.component.html',
  styleUrls: [
    './intervention-control-plans-psychosocial-evaluation.component.scss',
  ],
})
export class InterventionControlPlansPsychosocialEvaluationComponent
  implements OnInit
{
  listWorkCenterUser: any;
  listEvaluation: any;
  countListUsers: number = 0;
  listUsersSelected: any = [];
  listInfoPlan: any = [];
  viewTable = false;
  workCenterSelected = '';
  public filter: string = '';
  public table: string =
    'evaluacionPsicosocial/ConsultaRadicadoFinalEvaluacion';
  public columns = [
    { name: 'Número radicado', data: 'radicado' },
    { name: 'Fecha radicado', data: 'fechaRadicado', pipeDate: 'YYYY/dd/MM' },
    { name: 'Total de trabajadores ', data: 'totalTrabajadores' },
    { name: 'Total de centros ', data: 'totalCentrosTrabajo' },
    { name: 'Resultado obtenido ', data: 'resultado' },
  ];
  public options = [
    {
      delete: false,
      edit: false,
      details: false,
      select: true,
      state: false,
      pdf: false,
      validationSelect: false,
      check: false,
    },
  ];
  public dataTableUsers: any = null;

  public columnsUsers = [
    { name: 'Nombre', data: 'nombre' },
    { name: 'Fecha de inicio', data: 'fechaInicio', pipeDate: 'YYYY/dd/MM' },
    {
      name: 'Fecha de fianlización',
      data: 'fechaFinalizacion',
      pipeDate: 'YYYY/dd/MM',
    },
    { name: 'Psicólogo', data: 'usuario', property: 'nombreUsuario' },
    { name: 'Factor', data: 'factorIntervenirNombre' },
  ];
  public optionsUsers = [
    {
      delete: false,
      edit: false,
      details: false,
      select: true,
      state: false,
      pdf: false,
      validationSelect: false,
      check: false,
    },
  ];

  public dataTableNi: any = null;

  public columnsNi = [
    { name: 'Documento', data: 'usuario', property: 'cedula' },
    { name: 'Correo', data: 'usuario', property: 'correo' },
    { name: 'Teléfono', data: 'usuario', property: 'telefono' },
    { name: 'Nombre', data: 'usuario', property: 'nombreUsuario' },
    { name: 'Apellidos', data: 'usuario', property: 'apellidosUsuario' },
  ];
  public optionsNi = [{}];

  public columnsInfoPlan = [
    { name: 'Nombre', data: 'nombre' },
    { name: 'Descripción', data: 'descripcion' },
    { name: 'Factor', data: 'factorIntervenirNombre' },
  ];
  public rowSelected: any;
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
    this.loadingService.ChangeStatusLoading(false);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }

  registerActivitiesPlans() {
    var dialogRef = this.dialog.open(
      InterventionControlPlansPsychosocialEvaluationFormComponent,
      {
        data: {
          item: this.rowSelected,
          details: true,
        },
      }
    );
    dialogRef.afterClosed().subscribe();
  }

  selectedRow(event: any) {
    this.rowSelected = event;
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .GetAll(
        'planIntervencion/ConsultaPlanIntervencion?idCompany=' + event.idEmpresa
      )
      .subscribe((data: any) => {
        this.dataTableUsers = data;
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 1100);
      });
  }

  selectedRowUsers(event: any) {
    this.rowSelected = event;
    this.listInfoPlan = this.dataTableUsers.filter(
      (data: any) => data.id == event.id
    );
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .GetAll(
        'planIntervencion/ConsultaResponsablePlanIntervencion?idPlan=' +
          event.id
      )
      .subscribe((data: any) => {
        this.dataTableNi = data;
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 1100);
      });
  }
}
