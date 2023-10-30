import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ChangeEmailProfileComponent } from '../change-email-profile/change-email-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordProfileComponent } from '../change-password-profile/change-password-profile.component';

@Component({
  selector: 'app-change-data-profile',
  templateUrl: './change-data-profile.component.html',
  styleUrls: ['./change-data-profile.component.scss'],
})
export class ChangeDataProfileComponent implements OnInit {
  public form: FormGroup;
  public formEmail: FormGroup;
  hide = true;
  estadosList: any;
  listUsuario: any;
  listEmpresas: any;
  listDocs: any;
  listPaises: any;
  id: number | undefined;
  listRoles: any;
  public title: string = '';
  constructor(
    public formBuilder: FormBuilder,
    public accountService: AccountService,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private genericService: GenericService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.title =
      this.accountService.userData.roleId == environment.administradorEmpRole
        ? 'Actualizar datos Administrador SIRPSI de la Empresa'
        : 'Actualizar datos Psicólogo Especialista SST';
    this.form = this.formBuilder.group({
      Id: '',
      IdTypeDocument: ['', Validators.required],
      Document: ['', Validators.required],
      // ExpeditionDate: ['', Validators.required],
      IdCountry: ['', Validators.required],
      IdCompany: this.accountService.userData.empresaId,
      Names: ['', Validators.required],
      Surnames: ['', Validators.required],
      IdRol: '',
      PhoneNumber: '',
      Email: '',
      IdEstado: environment.activoEstado,
    });
    this.formEmail = this.formBuilder.group({
      OldEmail: ['', Validators.required],
      Nit: ['', Validators.required],
    });
    this.getListas();
    this.loadData();
  }
  GetInto() {
    this.loadingService.ChangeStatusLoading(true);
    this.accountService.ChangePassword(this.form.value).subscribe(
      (result: any) => {
        this.openSnackBar(result.message);
        Swal.fire({
          icon: 'success',
          title: result.message,
          showConfirmButton: false,
          timer: 2000,
        }).then(() => window.location.reload());
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 800);
      },
      (error) => {
        console.error(error);
        this.openSnackBar(error.error.message);
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 800);
      }
    );
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
  loadData() {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .GetAll('usuario/ConsultarUsuario?id=' + this.accountService.userData.id)
      .subscribe((data: any) => {
        console.log(data.telefono.split('57'));
        this.form.controls['Id'].setValue(data.id);
        this.form.controls['IdTypeDocument'].setValue(data.idTipoDocumento);
        this.form.controls['Document'].setValue(data.cedula);
        this.form.controls['IdCountry'].setValue(data.idPais);
        this.form.controls['IdCompany'].setValue(data.idEmpresa);
        this.form.controls['Names'].setValue(data.nombreUsuario);
        this.form.controls['Surnames'].setValue(data.apellidosUsuario);
        this.form.controls['IdRol'].setValue(data.idRol);
        this.form.controls['PhoneNumber'].setValue(
          data.telefono != undefined && data.telefono != null
            ? data.telefono.split('57')[2]
            : ''
        );
        this.form.controls['Email'].setValue(data.correo);
        this.form.controls['IdEstado'].setValue(data.idEstado);
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
      });
  }
  openChangeEmailForm() {
    if (
      this.formEmail.value.OldEmail ==
        this.accountService.userData.user.email &&
      this.formEmail.value.Nit == this.accountService.userData.empresa.documento
    ) {
      const dialogRef = this.dialog.open(ChangeEmailProfileComponent, {
        data: {
          id: 0,
        },
      });
      dialogRef.afterClosed().subscribe();
    } else
      this.openSnackBar(
        'Por favor ingrese los datos correctamente para actualizar su correo.'
      );
  }
  openFormChangePassword() {
    const dialogRef = this.dialog.open(ChangePasswordProfileComponent, {
      data: {
        type: 1,
      },
    });
    dialogRef.afterClosed().subscribe();
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
        this.formEmail.reset();
        this.loadData();
      }
    });
  }
}
