import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { getService } from 'src/app/shared/services/get,services';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-companies-form',
  templateUrl: './companies-form.component.html',
  styleUrls: ['./companies-form.component.scss'],
})
export class CompaniesFormComponent implements OnInit {
  public form: FormGroup;
  public formWorkCenter: FormGroup;
  public formUser: FormGroup;
  public formRepresentative: FormGroup;
  public option: string;
  @Output() cancelar = new EventEmitter<boolean>();
  listCompaniesUser: any;
  estadosList: any;
  listUsuario: any;
  listMinisterios: any;
  listDocs: any;
  listTipoEmpresa: any;
  listEmpresas: any;
  listPaises: any;
  listDepartament: any;
  listCity: any;
  id: number | undefined;
  listRoles: any;
  listTiposPersona: any;
  listRegimenes: any;
  listActividadEconomica: any;
  hideUser = true;
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private genericService: GenericService,
    private loadingService: LoadingService,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CompaniesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicio: getService
  ) {}
  ngOnInit(): void {
    this.getListas();
    this.form = this.formBuilder.group({
      Id: '21',
      IdTipoPersona: ['', Validators.required],
      IdRegimenTributario: ['', Validators.required],
      TipoDocumento: ['', Validators.required],
      DigitoVerificacion: '',
      IdTipoEmpresa: ['', Validators.required],
      IdActividadEconomica: ['', Validators.required],
      Documento: ['', Validators.required],
      Nombre: ['', Validators.required],
      Descripcion: '',
      Observacion: '',
      IdMinisterio: ['', Validators.required],
      IdEstado:
        this.data.estado == undefined
          ? ['', Validators.required]
          : this.data.estado,
      IdUsuario: '0',
      IdConsecutivo: 1,
    });
    this.formRepresentative = this.formBuilder.group({
      PrimerNombre: ['', Validators.required],
      SegundoNombre: '',
      PrimerApellido: ['', Validators.required],
      SegundoApellido: '',
      IdTipoDocumento: ['', Validators.required],
      NumeroDocumento: ['', Validators.required],
    });
    this.formWorkCenter = this.formBuilder.group({
      Id: '1212',
      Nombre: ['', Validators.required],
      Descripcion: '',
      Principal: true,
      IdEstado: environment.activoEstado,
      IdUsuario: '121212',
      IdEmpresa: '121212',
      IdDepartamento: 0,
      IdMunicipio: 0,
      Email: '',
      Celular: '',
      Telefono: '',
      Direccion: '',
    });
    this.formUser = this.formBuilder.group({
      Id: '21',
      TypeDocument: ['', Validators.required],
      Document: ['', Validators.required],
      IdCountry: ['', Validators.required],
      IdCompany: '',
      Names: ['', Validators.required],
      Surnames: ['', Validators.required],
      IdRol: environment.administradorEmpRole,
      Password: ['', Validators.required],
      PhoneNumber: '',
      Email: ['', Validators.required, Validators.email],
      Status: environment.inactivoEstado,
    });
    this.onGetDepartment(environment.urlApiColombia + 'Department');
  }

  onGetDepartment(url: string) {
    this.servicio.obtenerDatos(url).subscribe((data) => {
      this.listDepartament = data;
    });
  }

  onGetCity(url: any) {
    console.log('city', url.IdDepartamento);
    this.listCity = [];
    this.formWorkCenter.value.IdMunicipio = '';
    if (url.IdDepartamento == null) return;
    this.servicio
      .obtenerDatos(
        environment.urlApiColombia + `Department/${url.IdDepartamento}/cities`
      )
      .subscribe((data) => {
        this.listCity = data;
      });
  }
  onGetTypeDocument(url: any) {
    this.listDocs = [];
    this.form.value.TipoDocumento = '';
    if (url.IdTipoPersona == null) return;
    this.genericService
      .GetAll(
        'tipodocumento/ConsultarTipoDocumento?idTipoPersona=' +
          url.IdTipoPersona
      )
      .subscribe((data: any) => {
        this.listDocs = data;
      });
  }
  onSave() {
    var body = {
      Empresa: this.form.value,
      CentroTrabajo: this.formWorkCenter.value,
      Usuario: this.formUser.value,
      RepresentanteEmpresa: this.formRepresentative.value,
    };
    console.log(body);
    Swal.fire({
      title: '¿Estas seguro?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingService.ChangeStatusLoading(true);
        this.genericService.Post('empresas/RegistrarEmpresa', body).subscribe({
          next: (data) => {
            this.loadingService.ChangeStatusLoading(false);
            Swal.fire({
              icon: 'success',
              title: 'Empresa registrada exitosamente.',
              showConfirmButton: false,
              timer: 1500,
            }).then(() => window.location.reload());
          },
          error: (error) => {
            console.error(error);
            this.openSnackBar(error.error.message);
            this.loadingService.ChangeStatusLoading(false);
          },
        });
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
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .GetAll('ministerio/ConsultarMinisterio')
      .subscribe((data: any) => {
        this.listMinisterios = data;
        this.form.controls['IdMinisterio'].setValue(this.listMinisterios[0].id);
        // this.genericService
        //   .GetAll('tipodocumento/ConsultarTipoDocumento')
        //   .subscribe((data: any) => {
        //     this.listDocs = data;
        this.genericService
          .GetAll('tiposempresa/ConsultarTipoEmpresa')
          .subscribe((data: any) => {
            this.listTipoEmpresa = data;
            this.genericService
              .GetAll('estados/ConsultarEstados')
              .subscribe((data: any) => {
                this.estadosList = data;
                this.genericService
                  .GetAll('empresas/ConsultarEmpresas')
                  .subscribe((data: any) => {
                    this.listEmpresas = data;
                    this.genericService
                      .GetAll('pais/ConsultarPaises')
                      .subscribe((data: any) => {
                        this.listPaises = data;
                        this.genericService
                          .GetAll('roles/ConsultarRoles')
                          .subscribe((data: any) => {
                            this.listRoles = data;
                            this.genericService
                              .GetAll(
                                'regimenesTributario/ConsultarRegimenesTributario'
                              )
                              .subscribe((data: any) => {
                                this.listRegimenes = data;
                                this.genericService
                                  .GetAll('tiposPersonas/ConsultarTiposPersona')
                                  .subscribe((data: any) => {
                                    this.listTiposPersona = data;
                                    this.genericService
                                      .GetAll(
                                        'actividadEconomica/ConsultarActividadEconomica'
                                      )
                                      .subscribe((data: any) => {
                                        this.listActividadEconomica = data;
                                        this.genericService
                                          .GetAll('usuario/ConsultarUsuarios')
                                          .subscribe((data: any) => {
                                            this.listUsuario = data;
                                            this.listUsuario.push({
                                              id: '0',
                                              nombreUsuario: 'Registrar',
                                              apellidosUsuario: '',
                                            });
                                            setTimeout(
                                              () =>
                                                this.loadingService.ChangeStatusLoading(
                                                  false
                                                ),
                                              500
                                            );
                                          });
                                      });
                                  });
                              });
                          });
                      });
                  });
              });
          });
        // });
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
      if (result.isConfirmed) this.cancelar.emit(true);
    });
  }
}
