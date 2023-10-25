import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/shared/services/loading.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { GenericService } from 'src/app/shared/services/generic.service';

@Component({
  selector: 'app-routes-form',
  templateUrl: './routes-form.component.html',
  styleUrls: ['./routes-form.component.scss'],
})
export class RoutesFormComponent implements OnInit {
  public form: FormGroup;
  public option: string;
  id: number | undefined;
  type: number = this.data.type;
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private genericService: GenericService,
    private loadingService: LoadingService,
    public dialogRef: MatDialogRef<RoutesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Nombre: ['', Validators.required],
      Descripcion: '',
      Ruta: ['', Validators.required],
      TieneHijos: [false, Validators.required],
    });
  }
  onSave() {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .Post('modulos/RegistrarModulos', this.form.value)
      .subscribe({
        next: (data) => {
          this.dialogRef.close();
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 400);
          Swal.fire({
            icon: 'success',
            title: 'Ruta registrado, exitosamente.',
            showConfirmButton: false,
            timer: 2800,
          }).then(() => window.location.reload());
        },
        error: (error) => {
          this.loadingService.ChangeStatusLoading(false);
          console.log('error usuario' + error.error.message);
          Swal.fire({
            icon: 'warning',
            title: 'Ha ocurrido un error! ' + error.error.message,
            showConfirmButton: false,
            timer: 2800,
          });
        },
      });
  }
  changeViewFormUser() {
    this.type = 1;
    this.dialogRef.close();
    this.dialog
      .open(RoutesFormComponent, { data: { id: 0, type: 0, reload: false } })
      .afterClosed()
      .subscribe();
  }
  onUpdateEmpresa() {}
  cancelForm() {
    this.dialogRef.close();
  }
}
