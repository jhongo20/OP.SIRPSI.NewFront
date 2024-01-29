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
import { NzMessageService } from 'ng-zorro-antd/message';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { getService } from 'src/app/shared/services/get.services';
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
  listDocsUser: any;
  listTipoEmpresa: any;
  listEmpresas: any;
  listPaises: any;
  listDepartament: any;
  listCity: any;
  id: number | undefined;
  listRoles: any;
  listTiposPersona: any;
  listRegimenes: any;
  listClasificacion: any;
  listActividadEconomica: any;
  hideUser = true;
  showDigit: boolean = false;
  existAdmin: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private genericService: GenericService,
    private loadingService: LoadingService,
    private accountService: AccountService,
    private message: NzMessageService,
    public dialogRef: MatDialogRef<CompaniesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicio: getService
  ) { }

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
      IdClasificacion: ['', Validators.required],
      EsGubernamental: '0',
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
      Descripcion: ['', Validators.required],
      Principal: true,
      IdEstado: environment.activoEstado,
      IdUsuario: '121212',
      IdEmpresa: '121212',
      IdDepartamento: ['', Validators.required],
      IdMunicipio: ['', Validators.required],
      Email: ['', Validators.required],
      Celular: '',
      Telefono: '',
      Direccion: ['', Validators.required],
    });
    this.formUser = this.formBuilder.group({
      Id: '21',
      TypeDocument: ['', Validators.required],
      Document: ['', Validators.required],
      // IdCountry: ['', Validators.required],
      IdCompany: '',
      Names: ['', Validators.required],
      Surnames: ['', Validators.required],
      IdRol: environment.administradorEmpRole,
      Password: ['', Validators.required],
      VerifyPassword: ['', Validators.required],
      PhoneNumber: '',
      Email: ['', Validators.required, Validators.email],
      Status: environment.inactivoEstado,
    });
    this.onGetDepartment(environment.urlApiColombia + 'Department');
  }

  onGetDepartment(url: string) {
    this.servicio.obtenerDatos(url).subscribe((data) => {
      this.listDepartament = data.sort((x: any, y: any) =>
        x.name.localeCompare(y.name)
      );
    });
  }

  onGetCity(url: any) {
    this.listCity = [];
    this.formWorkCenter.value.IdMunicipio = '';
    if (url.IdDepartamento == null) return;
    this.servicio
      .obtenerDatos(
        environment.urlApiColombia + `Department/${url.IdDepartamento}/cities`
      )
      .subscribe((data) => {
        this.listCity = data.sort((x: any, y: any) =>
          x.name.localeCompare(y.name)
        );
      });
  }

  onGetTypeDocument(url: any) {
    this.listDocs = [];
    this.form.value.TipoDocumento = '';
    this.onGetDigit(undefined);
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

  onGetDigit(item: any) {
    this.showDigit = item == undefined ? false : item.tieneDigito;
  }

  onSave() {
    this.form.controls['Documento'].setValue(this.form.value.Documento.toString());
    this.form.controls['DigitoVerificacion'].setValue(this.form.value.DigitoVerificacion.toString());
    this.formRepresentative.value.NumeroDocumento = this.formRepresentative.value.NumeroDocumento.toString();
    this.formUser.value.Document = this.formUser.value.Document.toString();
    this.form.controls['EsGubernamental'].setValue(this.form.value.EsGubernamental == 1 ? true : false);

    var body = {
      Empresa: this.form.value,
      CentroTrabajo: this.formWorkCenter.value,
      Usuario: this.formUser.value,
      RepresentanteEmpresa: this.formRepresentative.value,
    };

    Swal.fire({
      title: '¿Estas seguro?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingService.ChangeStatusLoading(true);
        if (!this.existAdmin) this.saveOne(body);
        else this.saveTwo(body);
      }
    });
  }

  getListas() {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .GetAll('ministerio/ConsultarMinisterio')
      .subscribe((data: any) => {
        this.listMinisterios = data;
        this.form.controls['IdMinisterio'].setValue(this.listMinisterios[0].id);
        this.genericService
          .GetAll('tiposempresa/ConsultarTipoEmpresa')
          .subscribe((data: any) => {
            this.listClasificacion = data;
            this.genericService
              .GetAll('tipodocumento/ConsultarTipoDocumento')
              .subscribe((data: any) => {
                this.listDocsUser = data;
                this.genericService
                  .GetAll('tiposempresa/ConsultarTipoEmpresa?type=1')
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
                                          .GetAll(
                                            'tiposPersonas/ConsultarTiposPersona'
                                          )
                                          .subscribe((data: any) => {
                                            this.listTiposPersona = data;
                                            this.genericService
                                              .GetAll(
                                                'actividadEconomica/ConsultarActividadEconomica'
                                              )
                                              .subscribe((data: any) => {
                                                this.listActividadEconomica =
                                                  data;
                                                this.genericService
                                                  .GetAll(
                                                    'usuario/ConsultarUsuarios'
                                                  )
                                                  .subscribe((data: any) => {
                                                    this.listUsuario = data;
                                                    this.listUsuario.push({
                                                      id: '0',
                                                      nombreUsuario:
                                                        'Registrar',
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
              });
          });
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

  sendNotifications(code: string, numberPhone: string, password: string, email: string) {
    var body = {
      CodeActivation: code,
      Receiver: email,
      Password: password,
    };
    this.genericService.Post('mensajes/EnviarNotificacionMensajeCorreo', body).subscribe();
    body.Receiver = numberPhone;
    this.genericService.Post('mensajes/EnviarNotificacionMensajeWhatsApp', body).subscribe();
  }

  loadData(data: any) {
    this.formUser.disable();
    this.formUser.controls["Email"].setValue(data.correo);
    this.formUser.controls["Names"].setValue(data.nombreUsuario);
    this.formUser.controls["Surnames"].setValue(data.apellidosUsuario);
    this.formUser.controls["PhoneNumber"].setValue(data.telefono);
    this.existAdmin = true;
  }

  saveOne(body: any) {
    this.genericService.Post('empresas/RegistrarEmpresa', body).subscribe({
      next: (data) => {
        console.log(data.data);
        this.sendNotifications(
          data.data.codeActivation,
          data.data.phoneNumber,
          this.formUser.value.Password,
          this.formUser.value.Email
        );
        this.loadingService.ChangeStatusLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Empresa registrada exitosamente.',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => window.location.reload());
      },
      error: (error) => {
        console.error(error);
        this.message.error(error.error.message, {
          nzDuration: 4000
        });
        if (error.error.assign == 1)
          Swal.fire({
            icon: 'warning',
            title: error.error.message,
            html: error.error.otherdata,
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
          }).then((result) => {
            if (result.isConfirmed) {
              this.loadData(error.error.data);
            }
          });
        this.loadingService.ChangeStatusLoading(false);
      },
    });
  }

  saveTwo(body: any) {
    this.genericService.Post('empresas/RegistrarEmpresaDos', body).subscribe({
      next: (data) => {
        this.loadingService.ChangeStatusLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Empresa registrada exitosamente.',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => window.location.reload());
      },
      error: (error) => {
        console.error(error);
        this.message.error(error.error.message, {
          nzDuration: 4000
        });
        this.loadingService.ChangeStatusLoading(false);
      },
    });
  }
}
