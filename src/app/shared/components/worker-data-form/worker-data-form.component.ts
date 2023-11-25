import { Component, OnInit, Input, Optional, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-worker-data-form',
  templateUrl: './worker-data-form.component.html',
  styleUrls: ['./worker-data-form.component.scss'],
})
export class WorkerDataFormComponent implements OnInit {
  public form: FormGroup;
  public option: string;
  company: any = null;
  estadosList: any;
  listUsuario: any;
  listEmpresas: any;
  listDocs: any;
  listPaises: any;
  listOcupacionProfesion: any;
  id: number | undefined;
  listRoles: any;
  listWorkCenterUser: any;
  public listCentrosCosto: any;
  @Input('userInfo') userInfo: any;
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private genericService: GenericService,
    private loadingService: LoadingService,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    @Optional() public dialogRef: MatDialogRef<WorkerDataFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.getListas();
    this.form = this.formBuilder.group({
      Id: ['', Validators.required],
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
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .Put('usuario/ActualizarUsuario', this.form.value)
      .subscribe({
        next: (data) => {
          // this.sendNotifications(
          //   data.user.codeActivation,
          //   data.user.phoneNumber,
          //   this.form.value.Password,
          //   this.form.value.Email
          // );
          this.loadingService.ChangeStatusLoading(false);
          Swal.fire({
            icon: 'success',
            title: 'Usuario Actualizado, exitosamente.',
            showConfirmButton: false,
            timer: 1400,
          }).then(() => {
            window.location.reload();
          });
        },
        error: (error) => {
          this.loadingService.ChangeStatusLoading(false);
          Swal.fire({
            icon: 'warning',
            title: error.error.message,
            showConfirmButton: false,
            timer: 2800,
          });
        },
      });
  }
  getListas() {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .GetAll(
        'centrotrabajo/ConsultarCentroDeTrabajo?companie=' +
          this.accountService.userData.empresa.idConsecutivo
      )
      .subscribe((data: any) => {
        this.listWorkCenterUser = data;
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
                                    this.LoadData(this.data.info.usuario);
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
        // this.formInitial.reset();
      }
    });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
  LoadData(data: any) {
    console.log(data);
    // this.genericService
    //   .GetAll('usuario/ConsultarUsuario?id=' + user.id)
    //   .subscribe((data: any) => {
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
    this.form.controls['HaveDisability'].setValue(
      data.tieneDiscapacidad == true ? '1' : '0'
    );
    this.form.controls['ReadingWritingSkills'].setValue(
      data.habilidadesLectoEscritura == true ? '1' : '0'
    );
    this.form.controls['IdOccupationProfession'].setValue(
      data.idOcupacionProfesion
    );
    this.form.controls['IdWorkCenter'].setValue(data.workPlaces[0].workPlaceId);
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 300);
    // });
  }
}
