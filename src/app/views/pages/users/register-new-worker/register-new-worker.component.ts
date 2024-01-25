import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { AssignNewRoleUserComponent } from '../assign-new-role-user/assign-new-role-user.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-register-new-worker',
  templateUrl: './register-new-worker.component.html',
  styleUrls: ['./register-new-worker.component.scss'],
})
export class RegisterNewWorkerComponent implements OnInit {
  public form: FormGroup;
  public formRoleCompany: FormGroup;
  public formValidate: FormGroup;
  public option: string;
  public listCentrosCosto: any;
  public viewStatus: boolean = true;
  public title: string = '';
  estadosList: any;
  listUsuario: any;
  listEmpresas: any;
  listDocs: any;
  listPaises: any;
  listOcupacionProfesion: any;
  listDiscapacidades: any;
  listaTipoTrabajador = [
    {
      id: '1a8274f0-f552-494d-a6c2-63b4c08ed0f6',
      nombre: 'Grupo Forma A',
    },
    {
      id: '2e8a1dbf-2a6d-4d0c-8f3f-635fb351896c',
      nombre: 'Grupo Forma B',
    },
  ];
  id: number | undefined;
  listRoles: any;
  public hide = true;
  existUser: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private genericService: GenericService,
    private loadingService: LoadingService,
    public accountService: AccountService,
    private snackBar: MatSnackBar,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.title = 'Registro de trabajadores';
    this.getListas();
    this.form = this.formBuilder.group({
      Id: [''],
      clasificacion: ['', Validators.required],
      IdTypeDocument: ['', Validators.required],
      Document: ['', Validators.required],
      // ExpeditionDate: ['', Validators.required],
      // IdCountry: ['', Validators.required],
      IdCompany: this.accountService.userData.empresaId,
      Names: ['', Validators.required],
      Surnames: ['', Validators.required],
      IdRol: environment.trabajadorRole,
      Password: '',
      PhoneNumber: ['', Validators.required],
      PhoneNumberAux: '',
      Email: ['', Validators.required],
      EmailAux: '',
      IdEstado: environment.inactivoEstado,
      IdWorkCenter: ['', Validators.required],
      IdOccupationProfession: ['', Validators.required],
      HaveDisability: '0',
      Disability: '',
      ReadingWritingSkills: '0',
    });
    this.formRoleCompany = this.formBuilder.group({
      UserId: ['', Validators.required],
      RoleId: [environment.trabajadorRole, Validators.required],
      IdEstado: [environment.activoEstado, Validators.required],
    });
    this.genericService
      .GetAll('userWorkPlace/ConsultarCentroDeTrabajoUsuario?user=' + this.accountService.userData.id)
      .subscribe((data) => (this.listCentrosCosto = data));
  }

  onSave() {
    this.form.value.HaveDisability = this.form.value.HaveDisability == '0' ? false : true;
    this.form.value.ReadingWritingSkills = this.form.value.ReadingWritingSkills == '0' ? false : true;
    this.form.value.Password = 'Ept_' + this.accountService.userData.empresa.documento + '_' + this.form.value.Document;
    this.form.value.Document = this.form.value.Document.toString();
    this.loadingService.ChangeStatusLoading(true);
    this.genericService.Post('user/RegisterUser', this.form.value).subscribe({
      next: (data) => {
        this.sendNotifications(
          data.user.codeActivation,
          data.user.phoneNumber,
          this.form.value.Password,
          this.form.value.Email
        );
        setTimeout(() => {
          Swal.fire({
            icon: 'success',
            title: 'Usuario Registrado, exitosamente.',
            showConfirmButton: false,
            timer: 2800,
          }).then(() => {
            window.location.reload();
          });
          this.loadingService.ChangeStatusLoading(false);
        }, 1200);
      },
      error: (error) => {
        this.loadingService.ChangeStatusLoading(false);
        if (error.error.assign > 0)
          Swal.fire({
            icon: 'warning',
            title: error.error.message,
            html: error.error.otherdata,
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
          }).then((result) => {
            if (result.isConfirmed) {
              if (error.error.assign == 1) this.onAssignNewRole(false, '1', error.error.id);
              else if (error.error.assign == 2) this.onAssignUserCompany(false, '1', error.error.data);
            }
          });
        else
          Swal.fire({
            icon: 'warning',
            title:
              'Ha ocurrido un error! ' + error.error.message ==
                'Registro de usuario ¡fallido!  Failed : PasswordRequiresNonAlphanumeric,PasswordRequiresLower,PasswordRequiresUpper'
                ? 'Registro de usuario ¡fallido!  Error: La contraseña no cumple los criterios de seguridad.'
                : error.error.message,
            showConfirmButton: false,
          });
      },
    });
  }

  onSaveTwo() {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService.Post('rolesusuario/RegistrarRolesUsuario', this.formRoleCompany.value).subscribe({
      next: (data) => {
        setTimeout(() => {
          Swal.fire({
            icon: 'success',
            title: 'Usuario Registrado, exitosamente.',
            showConfirmButton: false,
            timer: 2800,
          }).then(() => {
            window.location.reload();
          });
          this.loadingService.ChangeStatusLoading(false);
        }, 1200);
      },
      error: (error) => {
        this.loadingService.ChangeStatusLoading(false);
        this.message.error(error.error.message, {
          nzDuration: 4000
        });
      },
    });
  }

  getListas() {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .GetAll('discapacidades/ConsultarDiscapacidades')
      .subscribe((data: any) => {
        this.listDiscapacidades = data;
        this.genericService
          .GetAll('ocupacionProfesion/ConsultarOcupacionProfesion')
          .subscribe((data: any) => {
            this.listOcupacionProfesion = data;
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

  downloadExcel() {
    const templateFileName = 'plantilla.xlsx';
    const templateFilePath = `../../../../../assets/template/${templateFileName}`;

    const a = document.createElement('a');
    a.href = templateFilePath;
    a.download = templateFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  jsonData: any;

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        this.jsonData = XLSX.utils.sheet_to_json(sheet, { raw: true });
      };
      reader.readAsBinaryString(file);
    }
  }

  convertToJson() {
    // Puedes realizar acciones adicionales aquí antes de mostrar los datos JSON.
    console.log(JSON.stringify(this.jsonData));
    this.loadingService.ChangeStatusLoading(true);
    this.genericService.Post('user/RegistrarUsuario', this.jsonData).subscribe({
      next: (data) => {
        setTimeout(() => {
          Swal.fire({
            icon: 'success',
            title: 'Se han cargado los usuarios que estaban correctos!',
            showConfirmButton: false,
            timer: 2800,
          }).then(() => {
            window.location.reload();
          });
          this.loadingService.ChangeStatusLoading(false);
        }, 1200);
      },
      error: (error) => {
        this.loadingService.ChangeStatusLoading(false);
        this.message.error(error.error.message, {
          nzDuration: 4000
        });
      },
    });
  }

  onAssignNewRole(internal: any, role: string, user: any) {
    const dialogRef = this.dialog.open(AssignNewRoleUserComponent, {
      data: {
        id: 0,
        internal: internal,
        user: user,
      },
    });
    dialogRef.afterClosed().subscribe();
  }

  onAssignUserCompany(internal: any, role: string, user: any) {
    this.loadData(user);
    this.existUser = true;
    this.form.disable();
    this.formValidate.disable();
  }

  loadData(data: any) {
    this.loadingService.ChangeStatusLoading(true);
    this.formRoleCompany.controls['UserId'].setValue(data.id);
    this.form.controls['Id'].setValue(data.id);
    this.form.controls['IdTypeDocument'].setValue(data.idTipoDocumento);
    this.form.controls['Document'].setValue(data.cedula);
    // this.form.controls['IdCountry'].setValue(data.idPais);
    this.form.controls['IdCompany'].setValue(data.idEmpresa);
    this.form.controls['Names'].setValue(data.nombreUsuario);
    this.form.controls['Surnames'].setValue(data.apellidosUsuario);
    this.form.controls['IdRol'].setValue(data.idRol);
    this.form.controls['PhoneNumber'].setValue(data.telefono);
    this.form.controls['PhoneNumberAux'].setValue(data.telefonoAux);
    this.form.controls['Email'].setValue(data.correo);
    this.form.controls['EmailAux'].setValue(data.correoAux);
    this.form.controls['IdEstado'].setValue(data.idEstado);
    this.form.controls['HaveDisability'].setValue(data.tieneDiscapacidad == true ? '1' : '0');
    this.form.controls['ReadingWritingSkills'].setValue(data.habilidadesLectoEscritura == true ? '1' : '0');
    this.form.controls['IdOccupationProfession'].setValue(data.idOcupacionProfesion);
    // this.form.controls['IdWorkCenter'].setValue(data.workPlaces[0].workPlaceId);
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
  }
}
