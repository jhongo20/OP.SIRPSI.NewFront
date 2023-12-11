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
        console.log(1234, data);
        console.log(1234, data.unlinked[0].usersCount);
        console.log(1234, data.linkedSummoning[0].usersCount);
        console.log(1234, data.linked[1].usersCount);

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
        this.onSave();
        setTimeout(() => {
          this.isLoadingOne = false;
        }, 5000);
      } else this.isLoadingOne = false;
    });
  }

  onSave() {
    var radicado = `EPE_${this.accountService.userData.empresa.idConsecutivo}_${
      this.accountService.userData.empresa.documento
    }_${
      this.accountService.userData.user.document
    }_CC_${new Date().getFullYear()}${
      new Date().getMonth() + 1
    }${new Date().getDate()}`;

    var body: any = {
      idEmpresa: this.accountService.userData.empresa.id,
      radicado: radicado,
      totalTrabajadores: 10,
    };
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .Post('evaluacionPsicosocial/RegistrarRadicadoFinalEvaluacion', body)
      .subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Se ha generado el radicado correctamente!',
            showConfirmButton: false,
            timer: 1200,
          }).then(() => window.location.reload());
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
        },
        error: (error) => {
          console.error(error.error.message);
          this.openSnackBar(error.error.message);
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
        },
      });
  }
}
