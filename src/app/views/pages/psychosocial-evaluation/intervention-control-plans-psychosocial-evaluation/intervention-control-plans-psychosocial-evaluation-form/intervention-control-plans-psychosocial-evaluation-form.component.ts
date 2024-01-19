import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzMessageService } from 'ng-zorro-antd/message';
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
  implements OnInit {
  public option: string;
  defaultNavActiveId = 1;
  public user: any;
  public userRegister: any;
  public form: FormGroup;
  public formUser: FormGroup;

  listFactors: any = [];
  listUsuario: any = [];
  ResponsablesAdd: any = [];
  countResponsables: number = 0;

  startValue: Date = new Date();
  endValue: Date;
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;

  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private genericService: GenericService,
    private loadingService: LoadingService,
    public accountService: AccountService,
    private message: NzMessageService,
    @Optional()
    public dialogRef: MatDialogRef<InterventionControlPlansPsychosocialEvaluationFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.accountService.userData.userActive);
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
      Responsables: [[]],
    });
    this.formUser = this.formBuilder.group({
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      Cargo: ['', Validators.required],
      Dependencia: ['', Validators.required],
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
    this.form.controls['FechaInicio'].setValue(this.form.value.FechaInicio.toLocaleDateString("fr-CA"));
    this.form.controls['FechaFinalizacion'].setValue(this.form.value.FechaFinalizacion.toLocaleDateString("fr-CA"));
    this.form.value.Responsables = this.ResponsablesAdd;
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
              this.message.error(error.error.message, {
                nzDuration: 4000
              });

              setTimeout(
                () => this.loadingService.ChangeStatusLoading(false),
                600
              );
            },
          });
      }
    });
  }

  addResponsible() {
    if (this.countResponsables < 2) {
      this.ResponsablesAdd.push(this.formUser.value);
      console.log(this.ResponsablesAdd);
      this.countResponsables++;
      Swal.fire({
        icon: 'info',
        title: 'Importante',
        text: 'Se ha agregado un nuevo responsable.',
      });
      this.formUser.reset();
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Importante',
        text: 'El maximo de responsables por actividad es de dos.',
      });
    }
  }

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endDatePicker.open();
    }
    console.log('handleStartOpenChange', open);
  }

  handleEndOpenChange(open: boolean): void {
    console.log('handleEndOpenChange', open);
  }

  addResponsibleMessage() {
    Swal.fire({
      // title: '¿Estas seguro?',
      text: 'Por cada actividad se debe ingresar un mínimo de un responsable y un máximo de dos responsables por cada actividad.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.addResponsible();
      }
    });
  }
}
