import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkerDataFormComponent } from 'src/app/shared/components/worker-data-form/worker-data-form.component';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-advances-psychosocial-evaluation',
  templateUrl: './advances-psychosocial-evaluation.component.html',
  styleUrls: ['./advances-psychosocial-evaluation.component.scss'],
})
export class AdvancesPsychosocialEvaluationComponent implements OnInit {
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
    { name: 'Radicado EPT', data: 'radicado' },
    { name: 'Fecha convocatoria', data: 'fechaInicio' },
    { name: 'Cédula', data: 'usuario', property: 'cedula' },
    { name: 'Nombre', data: 'usuario', property: 'nombreUsuario' },
    { name: 'Apellidos', data: 'usuario', property: 'apellidosUsuario' },
    { name: 'Aceptación consentimiento', data: 'po' },
    { name: 'cuestionarios', data: 'po' },
    { name: 'Porcentaje', data: 'porcentaje', porcentaje: true },
    { name: 'Estado', data: 'estado', property: 'nombre' },
  ];
  public options = [
    {
      delete: false,
      edit: true,
      details: true,
      select: false,
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
  onSave() {
    Swal.fire({
      title: '¿Estas seguro?',
      text: '¿Está seguro de convocar al(os) usuario(s) seleccionado(s)?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingService.ChangeStatusLoading(true);
        for (let i = 0; i < this.countListUsers; i++) {
          var body = {
            IdCentroTrabajo: this.formInitial.value.IdCentroTrabajo,
            IdUsuario: this.listUsersSelected[i].id,
            FechaInicio: this.formInitial.value.FechaInicio,
          };
          this.summonWorkers(body, i);
        }
      }
    });
  }
  summonWorkers(body: any, i: any) {
    this.genericService
      .Post('evaluacionPsicosocial/RegistrarEvaluacion', body)
      .subscribe({
        next: (data) => {
          if (this.countListUsers == i + 1) {
            Swal.fire({
              icon: 'success',
              title: 'Se ha convocado al(los) usuarios(s) seleccionado(s)',
              showConfirmButton: false,
              timer: 1200,
            }).then(() => window.location.reload());
            setTimeout(
              () => this.loadingService.ChangeStatusLoading(false),
              600
            );
          }
        },
        error: (error) => {
          console.error(error.error.message);
          this.openSnackBar(error.error.message);
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
        },
      });
  }
  cancelarForm() {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'no podras revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
      }
    });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
  selectedTab(type: number) {
    console.log(type);
    this.tab = type;
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
  selectedWorkCenter(event: any) {
    // this.loadingService.ChangeStatusLoading(true);
  }
  selectedRow(event: any) {
    // console.log(event);
    const dialogRef = this.dialog.open(WorkerDataFormComponent, {
      data: {
        info: event,
        details: true,
      },
    });
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
      this.table = 'evaluacionPsicosocial/ConsultarUsuariosEvaluacion';
      this.filter = '&workCenter=' + this.workCenterSelected;
      this.viewTable = true;
    }, 1400);
  }
}
