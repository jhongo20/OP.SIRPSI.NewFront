import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generate-filed-evaluation-psychosocial',
  templateUrl: './generate-filed-evaluation-psychosocial.component.html',
  styleUrls: ['./generate-filed-evaluation-psychosocial.component.scss'],
})
export class GenerateFiledEvaluationPsychosocialComponent implements OnInit {
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
  public options = null;
  public title: string = '';
  tab: number = 0;
  public linked: any = null;
  public unlinked: any = null;
  public linkedSummoning: any = null;
  isLoadingOne = false;

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
    this.onGetData();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }

  selectedRow(event: any, type: number) {}

  onGetData() {
    this.genericService
      .GetAll(
        'evaluacionPsicosocial/ConsultaGenerarRadicadoFinal?companyId=' +
          this.accountService.userData.empresa.id
      )
      .subscribe((data: any) => {
        this.linked = data != null ? data.linked : null;
        this.unlinked = data != null ? data.unlinked : null;
        this.linkedSummoning = data != null ? data.linkedSummoning : null;
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 1000);
      });
  }

  loadOne(): void {
    this.isLoadingOne = true;
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Una vez generado el radicado, la información del módulo “Avances evaluación psicosocial” ya no estará disponible. Solo podrá consultar y descargar las evaluaciones psicosociales realizadas por los trabajadores en el módulo “Consultas | Reportes”.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(() => {
          this.isLoadingOne = false;
        }, 5000);
      } else this.isLoadingOne = false;
    });
  }
}
