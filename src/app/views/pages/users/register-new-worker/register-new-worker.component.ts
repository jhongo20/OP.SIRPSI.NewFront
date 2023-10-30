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
  id: number | undefined;
  listRoles: any;
  public hide = true;
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private genericService: GenericService,
    private loadingService: LoadingService,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.title = 'Ficha de Datos Generales';
    this.getListas();
    this.form = this.formBuilder.group({
      IdTypeDocument: ['', Validators.required],
      Document: ['', Validators.required],
      // ExpeditionDate: ['', Validators.required],
      IdCountry: ['', Validators.required],
      IdCompany: this.accountService.userData.empresaId,
      Names: ['', Validators.required],
      Surnames: ['', Validators.required],
      IdRol: environment.trabajadorRole,
      Password: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      PhoneNumberAux: '',
      Email: ['', Validators.required],
      EmailAux: '',
      IdEstado: environment.inactivoEstado,
      IdWorkCenter: ['', Validators.required],
      IdOccupationProfession: ['', Validators.required],
      HaveDisability: '0',
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
    this.form.value.PhoneNumber = '+57' + this.form.value.PhoneNumber;
    this.form.value.PhoneNumberAux =
      this.form.value.PhoneNumberAux.length > 0
        ? '+57' + this.form.value.PhoneNumberAux
        : null;
    console.log(this.form.value);
    this.loadingService.ChangeStatusLoading(true);
    this.genericService.Post('user/RegisterUser', this.form.value).subscribe({
      next: (data) => {
        this.sendNotifications(data.user.codeActivation, data.user.phoneNumber);
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
