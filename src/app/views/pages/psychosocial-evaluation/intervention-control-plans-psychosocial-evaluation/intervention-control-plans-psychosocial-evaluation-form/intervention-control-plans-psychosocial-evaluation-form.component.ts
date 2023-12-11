import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-intervention-control-plans-psychosocial-evaluation-form',
  templateUrl:
    './intervention-control-plans-psychosocial-evaluation-form.component.html',
  styleUrls: [
    './intervention-control-plans-psychosocial-evaluation-form.component.scss',
  ],
})
export class InterventionControlPlansPsychosocialEvaluationFormComponent
  implements OnInit
{
  public option: string;
  defaultNavActiveId = 1;
  public user: any;
  public userRegister: any;
  public form: FormGroup;

  listFactors: any = [];
  listUsuario: any = [];

  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private genericService: GenericService,
    private loadingService: LoadingService,
    public accountService: AccountService,
    private snackBar: MatSnackBar,
    @Optional()
    public dialogRef: MatDialogRef<InterventionControlPlansPsychosocialEvaluationFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getListas();
    this.form = this.formBuilder.group({
      Id: 'asd',
      IdEmpresa: [this.accountService.userData.empresa.id, Validators.required],
      IdEvaluacionPsicosocial: [this.data.item.id, Validators.required],
      IdUsuario: [this.accountService.userData.user.id, Validators.required],
      IdFactorIntervenir: ['', Validators.required],
      Nombre: ['', Validators.required],
      Descripcion: ['', Validators.required],
      FechaInicio: ['', Validators.required],
      FechaFinalizacion: ['', Validators.required],
      Observaciones: ['', Validators.required],
      Responsables: [[], Validators.required],
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
        // this.formInitial.reset();
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }

  getListas() {
    this.genericService
      .GetAll(`factoresIntervenir/ConsultarFactoresIntervenir`)
      .subscribe((data: any) => {
        this.listFactors = data;
        this.genericService
          .GetAll(
            'usuario/consultarUsuariosEmpresa?role=' + environment.psicologoRole
          )
          .subscribe((data: any) => {
            this.listUsuario = data;
            setTimeout(
              () => this.loadingService.ChangeStatusLoading(false),
              600
            );
          });
      });
  }

  onSave() {
    console.log(this.form.value);
    Swal.fire({
      title: '¿Estas seguro?',
      text: '¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingService.ChangeStatusLoading(true);
        this.genericService
          .Post('planIntervencion/RegistrarPlanIntervencion', this.form.value)
          .subscribe({
            next: (data) => {
              Swal.fire({
                icon: 'success',
                title: 'Se ha registrado exitosamente',
                showConfirmButton: false,
                timer: 1200,
              }).then(() => window.location.reload());
              setTimeout(
                () => this.loadingService.ChangeStatusLoading(false),
                600
              );
            },
            error: (error) => {
              console.error(error.error.message);
              this.openSnackBar(error.error.message);
              setTimeout(
                () => this.loadingService.ChangeStatusLoading(false),
                600
              );
            },
          });
      }
    });
  }
}
