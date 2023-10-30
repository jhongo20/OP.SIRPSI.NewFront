import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { GenericService } from 'src/app/shared/services/generic.service';
import { getService } from 'src/app/shared/services/get,services';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assign-work-centers-form',
  templateUrl: './assign-work-centers-form.component.html',
  styleUrls: ['./assign-work-centers-form.component.scss'],
})
export class AssignWorkCentersFormComponent implements OnInit {
  public form: FormGroup;
  public option: string;
  listDepartament: any;
  listCity: any;
  toastr: any;
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    public loadingService: LoadingService,
    private servicio: getService,
    public genericService: GenericService,
    public dialogRef: MatDialogRef<AssignWorkCentersFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Nombre: ['', Validators.required],
      Descripcion: '',
      Principal: false,
      IdEstado: [''],
      IdUsuario: '',
      IdEmpresa: [this.data.id, Validators.required],
      IdDepartamento: 0,
      IdMunicipio: 0,
      Email: ['', Validators.required],
      Celular: '',
      Telefono: '',
      Direccion: '',
    });
  }
  onSaveCentroTrabajo() {
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
          .Post('centrotrabajo/RegistrarCentroDeTrabajo', this.form.value)
          .subscribe({
            next: (data) => {
              setTimeout(
                () => this.loadingService.ChangeStatusLoading(false),
                400
              );
              window.location.reload();
              this.toastr.success('Usuario Registrado, exitosamente!');
            },
            error: (error) => {
              this.loadingService.ChangeStatusLoading(false);
              console.log('error usuario' + error.error.message);
              this.toastr.error('Ha ocurrido un error! ' + error.error.message);
            },
          });
      }
    });
  }
  onGetDepartment(url: string) {
    this.servicio.obtenerDatos(url).subscribe((data) => {
      this.listDepartament = data;
    });
  }
  onGetCity(url: any) {
    console.log('city', url.IdDepartamento);
    this.listCity = [];
    this.form.value.IdMunicipio = '';
    if (url.IdDepartamento == null) return;
    this.servicio
      .obtenerDatos(
        environment.urlApiColombia + `Department/${url.IdDepartamento}/cities`
      )
      .subscribe((data) => {
        this.listCity = data;
      });
  }
}
