import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RolesEnum } from 'src/app/core/enums/Roles';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { getService } from 'src/app/shared/services/get.services';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-new-users',
  templateUrl: './register-new-users.component.html',
  styleUrls: ['./register-new-users.component.scss'],
})
export class RegisterNewUsersComponent implements OnInit {
  public form: FormGroup;
  public formEmpresa: FormGroup;
  public formValidate: FormGroup;
  public formLicencia: FormGroup;
  public option: string;
  public viewStatus: boolean = true;
  type: any = RolesEnum.AdminEmp;
  public title: string = '';
  estadosList: any;
  listUsuario: any;
  listEmpresas: any;
  listDocs: any;
  listPaises: any;
  id: number | undefined;
  listRoles: any;
  listSexos: any;
  listDepartament: any;
  listCity: any;
  listCityLicence: any;
  hide = true;
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private genericService: GenericService,
    private loadingService: LoadingService,
    public accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private servicio: getService
  ) {}
  ngOnInit(): void {
    this.type =
      this.router.url == '/users/register-new-administrator'
        ? RolesEnum.AdminEmp
        : this.router.url == '/users/register-new-psychologist'
        ? RolesEnum.Psicologo
        : RolesEnum.Trabajador;
    this.title =
      this.type == RolesEnum.AdminEmp
        ? 'Registrar nuevo Administrador SIRPSI de la Empresa'
        : this.type == RolesEnum.Psicologo
        ? 'Registrar nuevo Psicólogo Especialista SST'
        : 'Ficha de Datos Generales';
    this.getListas();
    this.formValidate = this.formBuilder.group({
      IdTypeDocument: ['', Validators.required],
      Document: ['', Validators.required],
      ExpeditionDate: '',
    });
    this.form = this.formBuilder.group({
      IdTypeDocument: ['', Validators.required],
      Document: ['', Validators.required],
      // ExpeditionDate: ['', Validators.required],
      // IdCountry: ['', Validators.required],
      IdCompany: this.accountService.userData.empresaId,
      Names: ['', Validators.required],
      Surnames: ['', Validators.required],
      IdRol:
        this.type == RolesEnum.AdminEmp
          ? environment.administradorEmpRole
          : this.type == RolesEnum.Psicologo
          ? environment.psicologoRole
          : environment.trabajadorRole,
      Password:
        this.type == RolesEnum.AdminEmp ? ['', Validators.required] : '',
      PhoneNumber: '',
      Email: ['', Validators.required],
      IdEstado:
        this.type == RolesEnum.AdminEmp
          ? environment.activoEstado
          : environment.inactivoEstado,
      IdSex: ['', Validators.required],
      Birthdate: ['', Validators.required],
      PlaceBirthDepartment: [null, Validators.required],
      PlaceBirthCity: [null, Validators.required],
      Address: ['', Validators.required],
      OccupationalLicense: null,
      // PhoneNumberAux: '',
      // EmailAux: '',
      // IdWorkCenter: '',
      // IdOccupationProfession: '',
      // HaveDisability: false,
      // ReadingWritingSkills: false,
    });
    this.formEmpresa = this.formBuilder.group({
      Usuario: ['', Validators.required],
    });
    this.formLicencia = this.formBuilder.group({
      UsuarioId: '1',
      Numero: this.type == RolesEnum.Psicologo ? ['', Validators.required] : '',
      FechaExpedicion:
        this.type == RolesEnum.Psicologo ? ['', Validators.required] : '',
      Titulo: this.type == RolesEnum.Psicologo ? ['', Validators.required] : '',
      Entidad:
        this.type == RolesEnum.Psicologo ? ['', Validators.required] : '',
      IdDepartamento:
        this.type == RolesEnum.Psicologo ? ['', Validators.required] : '',
      IdMunicipio:
        this.type == RolesEnum.Psicologo ? ['', Validators.required] : '',
    });
    this.onGetDepartment(environment.urlApiColombia + 'Department');
  }
  onSave() {
    this.form.value.IdTypeDocument = this.formValidate.value.IdTypeDocument;
    this.form.value.Document = this.formValidate.value.Document;
    this.form.value.OccupationalLicense =
      this.type == RolesEnum.Psicologo ? this.formLicencia.value : null;
    if (this.type != RolesEnum.AdminEmp) {
      this.form.value.Password =
        'Ept_' +
        this.accountService.userData.empresa.documento +
        '_' +
        this.form.value.Document;
    }
    this.loadingService.ChangeStatusLoading(true);
    this.genericService.Post('user/RegisterUser', this.form.value).subscribe({
      next: (data) => {
        if (this.type != RolesEnum.AdminEmp)
          this.sendNotifications(
            data.user.codeActivation,
            data.user.phoneNumber,
            this.form.value.Password,
            this.form.value.Email
          );
          
        this.loadingService.ChangeStatusLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Usuario Registrado, exitosamente.',
          showConfirmButton: false,
          timer: 2800,
        }).then(() => {
          window.location.reload();
        });
      },
      error: (error) => {
        this.loadingService.ChangeStatusLoading(false);
        Swal.fire({
          icon: 'warning',
          title:
            'Ha ocurrido un error! ' + error.error.message ==
            'Registro de usuario ¡fallido!  Failed : PasswordRequiresNonAlphanumeric,PasswordRequiresLower,PasswordRequiresUpper'
              ? 'Registro de usuario ¡fallido!  Error: La contraseña no cumple los criterios de seguridad.'
              : error.error.message,
          showConfirmButton: false,
          timer: 2800,
        });
      },
    });
  }
  getListas() {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService.GetAll('sexo/ConsultarSexo').subscribe((data: any) => {
      this.listSexos = data;
      this.genericService
        .GetAll('empresas/ConsultarEmpresas')
        .subscribe((data: any) => {
          this.listEmpresas = data;
          this.genericService
            .GetAll('tipodocumento/ConsultarTipoDocumento')
            .subscribe((data: any) => {
              this.listDocs = data;
              this.genericService
                .GetAll('pais/ConsultarPaises')
                .subscribe((data: any) => {
                  this.listPaises = data;
                  this.genericService
                    .GetAll('roles/ConsultarRoles')
                    .subscribe((data: any) => {
                      this.listRoles = data;
                      this.genericService
                        .GetAll('estados/ConsultarEstados')
                        .subscribe((data: any) => {
                          this.estadosList = data;
                          this.genericService
                            .GetAll('usuario/ConsultarUsuarios')
                            .subscribe((data: any) => {
                              this.listUsuario = data;
                              setTimeout(
                                () =>
                                  this.loadingService.ChangeStatusLoading(
                                    false
                                  ),
                                600
                              );
                            });
                        });
                    });
                });
            });
        });
    });
  }
  sendNotifications(
    code: string,
    numberPhone: string,
    password: string,
    email: string
  ) {
    var body = {
      CodeActivation: code,
      Receiver: email,
      Password: password,
    };
    this.genericService
      .Post('mensajes/EnviarNotificacionMensajeCorreo', body)
      .subscribe();

    body.Receiver = numberPhone;
    this.genericService
      .Post('mensajes/EnviarNotificacionMensajeWhatsApp', body)
      .subscribe();
  }
  getUser() {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .GetAll(
        'usuario/ConsultarUsuarioDatos?TypeDocumentId=' +
          this.formValidate.value.IdTypeDocument +
          '&Document=' +
          this.formValidate.value.Document +
          '&ExpeditionDate=' +
          this.formValidate.value.ExpeditionDate
      )
      .subscribe({
        next: (data) => {
          this.loadingService.ChangeStatusLoading(false);
          this.form.controls['IdTypeDocument'].setValue(data.tipoDocumento);
          this.form.controls['Document'].setValue(data.documento);
          this.form.controls['Surnames'].setValue(data.apellidos);
          this.form.controls['Names'].setValue(data.nombre);
          Swal.fire({
            icon: 'success',
            title: 'Usuario consultado exitosamente.',
            showConfirmButton: false,
            timer: 1200,
          });
        },
        error: (error) => {
          this.loadingService.ChangeStatusLoading(false);
          Swal.fire({
            icon: 'warning',
            title:
              'Ha ocurrido un error! ' + error.error.message ==
              'Registro de usuario ¡fallido!  Failed : PasswordRequiresNonAlphanumeric,PasswordRequiresLower,PasswordRequiresUpper'
                ? 'Registro de usuario ¡fallido!  Error: La contraseña no cumple los criterios de seguridad.'
                : error.error.message,
            showConfirmButton: false,
            timer: 1200,
          });
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
        this.form.reset();
        this.formValidate.reset();
      }
    });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
  LlenarForm(type: number) {
    if (type == 0)
      this.form.controls['IdTypeDocument'].setValue(
        this.formValidate.value.IdTypeDocument
      );
    if (type == 1)
      this.form.controls['Document'].setValue(this.formValidate.value.Document);
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
    this.form.value.PlaceBirthCity = '';
    if (url.PlaceBirthDepartment == null) return;
    this.servicio
      .obtenerDatos(
        environment.urlApiColombia +
          `Department/${url.PlaceBirthDepartment}/cities`
      )
      .subscribe((data) => {
        this.listCity = data.sort((x: any, y: any) =>
          x.name.localeCompare(y.name)
        );
      });
  }
  onGetCityLicense(url: any) {
    console.log(url);
    this.listCityLicence = [];
    this.formLicencia.value.IdMunicipio = '';
    if (url.IdDepartamento == null) return;
    this.servicio
      .obtenerDatos(
        environment.urlApiColombia + `Department/${url.IdDepartamento}/cities`
      )
      .subscribe((data) => {
        this.listCityLicence = data.sort((x: any, y: any) =>
          x.name.localeCompare(y.name)
        );
      });
  }
}
