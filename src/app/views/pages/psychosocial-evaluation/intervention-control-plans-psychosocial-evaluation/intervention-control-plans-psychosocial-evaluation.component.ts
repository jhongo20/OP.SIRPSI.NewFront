import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

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

  selectedRow(event: any, type: number) {}
}
