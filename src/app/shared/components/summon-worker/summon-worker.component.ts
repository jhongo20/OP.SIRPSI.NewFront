import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-summon-worker',
  templateUrl: './summon-worker.component.html',
  styleUrls: ['./summon-worker.component.scss'],
})
export class SummonWorkerComponent implements OnInit {
  public formInitial: FormGroup;
  listWorkCenterUser: any;
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private genericService: GenericService,
    private loadingService: LoadingService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    @Optional() public dialogRef: MatDialogRef<SummonWorkerComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.loadingService.ChangeStatusLoading(true);
    this.formInitial = this.formBuilder.group({
      IdCentroTrabajo: [
        this.data.info.usuario.workPlaces[0].id,
        Validators.required,
      ],
      FechaInicio: ['', Validators.required],
      IdUsuario: [this.data.info.usuario.cedula, Validators.required],
    });
    this.loadingService.ChangeStatusLoading(false);
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
        this.genericService
          .Post(
            'evaluacionPsicosocial/RegistrarEvaluacion',
            this.formInitial.value
          )
          .subscribe({
            next: (data) => {
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
}
