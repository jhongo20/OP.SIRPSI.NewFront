import { Component, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { EventEmitter } from 'stream';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-evaluation',
  templateUrl: './register-evaluation.component.html',
  styleUrls: ['./register-evaluation.component.scss'],
})
export class RegisterEvaluationComponent implements OnInit {
  public form: FormGroup;
  public option: string;
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private genericService: GenericService,
    private loadingService: LoadingService,
    private accountService: AccountService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Nombre: ['', Validators.required],
      Descripcion: '',
      FechaInicio: ['', Validators.required],
      FechaFin: ['', Validators.required],
    });
  }

  onSave() {
    console.log(this.form.value);
    Swal.fire({
      title: '¿Estas seguro?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingService.ChangeStatusLoading(true);
        this.genericService
          .Post('evaluacion/RegistrarEvaluacion', this.form.value)
          .subscribe({
            next: (data) => {
              this.loadingService.ChangeStatusLoading(false);
              Swal.fire({
                icon: 'success',
                title: 'Evaluación registrada exitosamente.',
                showConfirmButton: false,
                timer: 1500,
              }).then(() => window.location.reload());
            },
            error: (error) => {
              console.error(error);
              this.message.error(error.error.message, { nzDuration: 4000 });
              this.loadingService.ChangeStatusLoading(false);
            },
          });
      }
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
}
