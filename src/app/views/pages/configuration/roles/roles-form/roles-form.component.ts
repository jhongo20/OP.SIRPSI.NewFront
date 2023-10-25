import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.scss'],
})
export class RolesFormComponent implements OnInit {
  public form: FormGroup;
  public option: string;
  id: number | undefined;
  type: number = this.data.type;
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private genericService: GenericService,
    private loadingService: LoadingService,
    public dialogRef: MatDialogRef<RolesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Id: '0',
      Status: environment.activoEstado,
      Name: ['', Validators.required],
      Description: '',
    });
  }
  onSave() {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .Post('roles/RegistrarRoles', this.form.value)
      .subscribe({
        next: (data) => {
          this.dialogRef.close();
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 400);
          Swal.fire({
            icon: 'success',
            title: 'Role Registrado, exitosamente.',
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
      .open(RolesFormComponent, { data: { id: 0, type: 0, reload: false } })
      .afterClosed()
      .subscribe();
  }
  onUpdateEmpresa() {
    // if (this.table == 0) {
    //   var empresa = this.data.item;
    //   empresa.IdUsuario = this.formEmpresa.value.Usuario;
    //   this._empresas.updateEmpresa(empresa).subscribe({
    //     next: (data) => {
    //       window.location.reload();
    //       this.toastr.success('Usuario asignado exitosamente!');
    //     },
    //     error: (error) => {
    //       console.log('error usuario' + error.error.message);
    //       this.toastr.error('Ha ocurrido un error! ' + error.error.message);
    //     },
    //   });
    // } else {
    //   var centroTrabajo = this.data.item;
    //   centroTrabajo.IdUsuario = this.formEmpresa.value.Usuario;
    //   console.log(this.data.item);
    //   console.log(this.formEmpresa.value.Usuario);
    //   this._centroTrabajo.updateCentroTrabajo(centroTrabajo).subscribe({
    //     next: (data) => {
    //       window.location.reload();
    //       this.toastr.success('Usuario asignado exitosamente!');
    //     },
    //     error: (error) => {
    //       console.log('error usuario' + error.error.message);
    //       this.toastr.error('Ha ocurrido un error! ' + error.error.message);
    //     },
    //   });
    // }
  }
  cancelForm() {
    this.dialogRef.close();
  }
}
