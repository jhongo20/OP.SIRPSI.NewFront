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

@Component({
  selector: 'app-register-new-worker',
  templateUrl: './register-new-worker.component.html',
  styleUrls: ['./register-new-worker.component.scss'],
})
export class RegisterNewWorkerComponent implements OnInit {
  public form: FormGroup;
  public formEmpresa: FormGroup;
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
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private genericService: GenericService,
    private loadingService: LoadingService,
    public accountService: AccountService,
    private snackBar: MatSnackBar,
  ) {}
  ngOnInit(): void {
    this.title = 'Registro de trabajadores';
    this.getListas();
    this.form = this.formBuilder.group({
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
    this.formEmpresa = this.formBuilder.group({
      Usuario: ['', Validators.required],
    });
    this.genericService
      .GetAll(
        'centrotrabajo/ConsultarCentroDeTrabajo?companie=' +
          this.accountService.userData.empresa.idConsecutivo
      )
      .subscribe((data) => (this.listCentrosCosto = data));
  }
  onSave() {
    this.form.value.HaveDisability =
      this.form.value.HaveDisability == '0' ? false : true;
    this.form.value.ReadingWritingSkills =
      this.form.value.ReadingWritingSkills == '0' ? false : true;
    this.form.value.Password =
      'Ept_' +
      this.accountService.userData.empresa.documento +
      '_' +
      this.form.value.Document;
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
    console.log(this.jsonData);
  }
}
