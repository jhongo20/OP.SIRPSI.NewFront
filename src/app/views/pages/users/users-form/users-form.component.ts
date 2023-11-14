import { Component, inject, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { CompaniesFormComponent } from '../../companies/companies-form/companies-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
})
export class UsersFormComponent implements OnInit {
  public form: FormGroup;
  public formEmpresa: FormGroup;
  public option: string;
  public listCentrosCosto: any;
  public viewStatus: boolean = true;
  public title: string =
    this.data.title == undefined ? 'Usuarios' : this.data.title;
  estadosList: any;
  listUsuario: any;
  listEmpresas: any;
  listDocs: any;
  listPaises: any;
  id: number | undefined;
  type: number = this.data.type;
  table: number = this.data.table;
  listRoles: any;
  hide = true;
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private genericService: GenericService,
    private loadingService: LoadingService,
    public dialogRef: MatDialogRef<UsersFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.viewStatus = this.data.estado == undefined;
    this.getListas();
    this.form = this.formBuilder.group({
      IdTypeDocument: ['', Validators.required],
      Document: ['', Validators.required],
      IdCountry: ['', Validators.required],
      IdCompany: this.data.empresa,
      Names: ['', Validators.required],
      Surnames: ['', Validators.required],
      IdRol:
        this.data.role == undefined
          ? ['', Validators.required]
          : this.data.role == 1
          ? environment.administradorEmpRole
          : this.data.role == 2
          ? environment.psicologoRole
          : environment.trabajadorRole,
      Password: ['', Validators.required],
      PhoneNumber: '',
      Email: ['', Validators.required],
      IdEstado:
        this.data.estado != undefined
          ? environment.inactivoEstado
          : ['', Validators.required],
    });
    this.formEmpresa = this.formBuilder.group({
      Usuario: ['', Validators.required],
    });
    this.genericService
      .GetAll('centrotrabajo/ConsultarCentroDeTrabajo')
      .subscribe((data) => (this.listCentrosCosto = data));
  }
  onSave() {
    this.form.value.PhoneNumber = '+57' + this.form.value.PhoneNumber;
    this.loadingService.ChangeStatusLoading(true);
    this.genericService.Post('user/RegisterUser', this.form.value).subscribe({
      next: (data) => {
        if (this.data.reload) '';
        else this.dialogRef.close();
        if (data.estadoId == environment.inactivoEstado)
          this.sendNotifications(
            data.user.codeActivation,
            data.user.phoneNumber
          );
        this.loadingService.ChangeStatusLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Usuario Registrado, exitosamente.',
          showConfirmButton: false,
          timer: 2800,
        }).then(() => {
          this.returnViewOrReload(data.user.id);
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
                            console.log(data);
                            this.listUsuario = data.filter(
                              (data: any) =>
                                data.idRol ==
                                (this.data.table == 0
                                  ? environment.administradorEmpRole
                                  : this.data.table == 1
                                  ? environment.psicologoRole
                                  : environment.trabajadorRole)
                            );
                            if (this.data.empresa != null)
                              this.listUsuario = this.listUsuario.filter(
                                (data: any) =>
                                  data.idEmpresa == this.data.empresa
                              );
                            setTimeout(
                              () =>
                                this.loadingService.ChangeStatusLoading(false),
                              600
                            );
                          });
                      });
                  });
              });
          });
      });
  }
  changeViewFormUser() {
    this.type = 1;
    this.dialogRef.close();
    this.dialog
      .open(UsersFormComponent, {
        data: {
          id: 0,
          type: 0,
          reload: false,
          estado: this.data.estado,
          role: this.data.role,
          retornarModal: this.data.retornarModal,
          empresa: this.data.empresa,
        },
      })
      .afterClosed()
      .subscribe();
  }
  onUpdateEmpresa() {
    if (this.table == 0) {
      var empresa = this.data.item;
      empresa.IdUsuario = this.formEmpresa.value.Usuario;
      this.genericService
        .Put('empresas/ActualizarEmpresaAsignar', empresa)
        .subscribe({
          next: (data) => {
            this.dialogRef.close();
            Swal.fire({
              icon: 'success',
              title: 'Usuario asignado exitosamente.',
              showConfirmButton: false,
              timer: 1600,
            }).then(() => window.location.reload());
          },
          error: (error) => {
            Swal.fire({
              icon: 'warning',
              title: 'Ha ocurrido un error! ' + error.error.message,
              showConfirmButton: false,
              timer: 1600,
            });
          },
        });
    } else if (this.table == 1) {
      var body = {
        Workplace: this.data.item.id,
        User: this.formEmpresa.value.Usuario,
      };
      this.savePsychologist(body);
    } else if (this.table == 2) {
      var body = {
        Workplace: this.data.item.id,
        User: this.formEmpresa.value.Usuario,
      };
      this.genericService
        .Post('userWorkPlace/RegistrarCentroDeTrabajoUsuario', body)
        .subscribe({
          next: (data) => {
            this.dialogRef.close();
            Swal.fire({
              icon: 'success',
              title: 'Usuario asignado exitosamente.',
              showConfirmButton: false,
              timer: 2800,
            }).then(() => window.location.reload());
          },
          error: (error) => {
            Swal.fire({
              icon: 'warning',
              title: 'Ha ocurrido un error! ' + error.error.message,
              showConfirmButton: false,
              timer: 2800,
            });
          },
        });
    }
  }
  sendNotifications(code: string, numberPhone: string) {
    var body = {
      MessageCodeActivation: code,
      MessageReceiver: numberPhone,
    };
    this.genericService
      .Post('mensajes/EnviarNotificaciónMensajeWhatsApp', body)
      .subscribe((data: any) => {
        console.log(data);
      });
  }
  returnViewOrReload(id: string) {
    this.loadingService.ChangeStatusLoading(false);
    if (
      this.data.retornarModal == environment.retornarModal.registrarTrabajador
    )
      window.location.reload();
    if (this.data.retornarModal == undefined) window.location.reload();
    if (this.data.retornarModal == environment.retornarModal.registrarAdmin) {
      this.dialogRef.close();
      this.dialog
        .open(CompaniesFormComponent, { data: { user: id, table: 0 } })
        .afterClosed()
        .subscribe();
    }
    // if (this.data.retornarModal == undefined) window.location.reload();
  }
  savePsychologist(body: any) {
    this.genericService
      .Post('psicologosCentroTrabajo/RegistrarCentroDeTrabajo', body)
      .subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title:
              'Se ha vinculado al(los) Psicólogo(s) Especialista(s) SST seleccionado(s)',
            showConfirmButton: false,
            timer: 1200,
          });
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
        },
        error: (error) => {
          console.error(error.error.message);
          this.openSnackBar(error.error.message);
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
        },
      });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
}
