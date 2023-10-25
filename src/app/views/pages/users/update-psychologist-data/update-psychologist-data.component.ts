import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { OccupationalLicenseComponent } from './occupational-license/occupational-license.component';
import { getService } from 'src/app/shared/services/get,services';

@Component({
  selector: 'app-update-psychologist-data',
  templateUrl: './update-psychologist-data.component.html',
  styleUrls: ['./update-psychologist-data.component.scss'],
})
export class UpdatePsychologistDataComponent implements OnInit {
  public form: FormGroup;
  public formInitial: FormGroup;
  public formEmail: FormGroup;
  hide = true;
  estadosList: any;
  listUsuario: any;
  listEmpresas: any;
  listDocs: any;
  listPaises: any;
  listSexos: any;
  listDepartament: any;
  listCity: any;
  id: number | undefined;
  listRoles: any;
  constructor(
    public formBuilder: FormBuilder,
    public accountService: AccountService,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private genericService: GenericService,
    public dialog: MatDialog,
    private servicio: getService
  ) {}

  ngOnInit(): void {
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
      IdSex: ['', Validators.required],
      Birthdate: ['', Validators.required],
      PlaceBirthDepartment: [0, Validators.required],
      PlaceBirthCity: [0, Validators.required],
    });
    this.formEmail = this.formBuilder.group({
      OldEmail: ['', Validators.required],
      Nit: ['', Validators.required],
    });
    this.formInitial = this.formBuilder.group({
      User: ['', Validators.required],
    });
    this.formInitial.reset();
    this.onGetDepartment(environment.urlApiColombia + 'Department');
    this.getListas();
  }
  GetInto() {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .Put('usuario/ActualizarUsuario', this.form.value)
      .subscribe(
        (result: any) => {
          this.openSnackBar(result.message);
          Swal.fire({
            icon: 'success',
            title: result.message,
            showConfirmButton: false,
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
                            .GetAll(
                              'usuario/consultarUsuariosEmpresa?role=' +
                                environment.psicologoRole
                            )
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
  loadData(data: any) {
    this.loadingService.ChangeStatusLoading(true);
    this.form.controls['Id'].setValue(data.id);
    this.form.controls['IdTypeDocument'].setValue(data.idTipoDocumento);
    this.form.controls['Document'].setValue(data.cedula);
    this.form.controls['IdCountry'].setValue(data.idPais);
    this.form.controls['IdCompany'].setValue(data.idEmpresa);
    this.form.controls['Names'].setValue(data.nombreUsuario);
    this.form.controls['Surnames'].setValue(data.apellidosUsuario);
    this.form.controls['IdRol'].setValue(data.idRol);
    this.form.controls['PhoneNumber'].setValue(data.telefono);
    this.form.controls['Email'].setValue(data.correo);
    this.form.controls['IdEstado'].setValue(data.idEstado);

    this.form.controls['IdSex'].setValue(data.idSex);
    this.form.controls['Birthdate'].setValue(
      data.birthdate != null ? data.birthdate.split('T')[0] : ''
    );
    this.form.controls['PlaceBirthDepartment'].setValue(
      data.placeBirthDepartment
    );
    this.onGetCity({ PlaceBirthDepartment: data.placeBirthDepartment });
    this.form.controls['PlaceBirthCity'].setValue(data.placeBirthCity);
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
  }
  openChangeEmailForm() {
    if (
      this.formEmail.value.OldEmail ==
        this.accountService.userData.user.email &&
      this.formEmail.value.Nit == this.accountService.userData.empresa.documento
    ) {
      // const dialogRef = this.dialog.open(ChangeEmailProfileComponent, {
      //   data: {
      //     id: 0,
      //   },
      // });
      // dialogRef.afterClosed().subscribe();
    } else
      this.openSnackBar(
        'Por favor ingrese los datos correctamente para actualizar su correo.'
      );
  }
  openOccupationalLicense() {
    const dialogRef = this.dialog.open(OccupationalLicenseComponent, {
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
        this.formInitial.reset();
      }
    });
  }
  selectedUser(event: any) {
    if (event == undefined) {
      this.formInitial.reset();
      return;
    }
    this.loadData(event);
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
}
