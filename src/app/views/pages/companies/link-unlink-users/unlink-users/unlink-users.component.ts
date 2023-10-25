import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { WorkCenterService } from 'src/app/shared/services/work-center.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-unlink-users',
  templateUrl: './unlink-users.component.html',
  styleUrls: ['./unlink-users.component.scss'],
})
export class UnlinkUsersComponent implements OnInit {
  public formInitial: FormGroup;
  reloadTable: number = 0;
  listWorkCenterUser: any;
  countListUsers: number = 0;
  listUsersSelected: any = [];
  public filter: string = '';
  public table: string =
    this.router.url == '/work-centers/link-unlink-worker'
      ? 'userWorkPlace/ConsultarUsuariosCentroDeTrabajo'
      : 'psicologosCentroTrabajo/ConsultarPsicologosCentroDeTrabajo';
  public columns = [
    { name: 'Tipo documento', data: 'tipoDocumento', property: 'nombre' },
    { name: 'Cédula', data: 'cedula' },
    { name: 'Correo', data: 'correo' },
    { name: 'Teléfono', data: 'telefono' },
    { name: 'Empresa', data: 'empresa', property: 'nombre' },
    { name: 'Rol', data: 'role', property: 'name' },
    { name: 'Nombre', data: 'nombreUsuario' },
    { name: 'Apellidos', data: 'apellidosUsuario' },
    { name: 'Estado', data: 'estado', property: 'nombre' },
  ];
  public options = [
    {
      delete: false,
      edit: false,
      details: false,
      select: false,
      state: false,
      pdf: false,
      validationSelect: false,
      check: true,
    },
  ];
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private workCenterService: WorkCenterService,
    private genericService: GenericService,
    private loadingService: LoadingService,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getListas();
    this.formInitial = this.formBuilder.group({
      WorkCenter: ['', Validators.required],
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
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
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
        this.formInitial.reset();
      }
    });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
  selectedWorkCenter(event: any) {
    this.filter = '&workCenter=' + event.id;
  }
  selectedRow(event: any) {
    if (this.countListUsers == 0) {
      this.listUsersSelected.push(event);
      this.countListUsers++;
    } else {
      var exist = this.listUsersSelected.filter(
        (data: any) => data == event
      ).length;
      if (exist == 0) {
        this.listUsersSelected.push(event);
        this.countListUsers++;
      } else {
        this.listUsersSelected = this.listUsersSelected.filter(
          (data: any) => data != event
        );
        this.countListUsers--;
      }
    }
    console.log(this.listUsersSelected, this.countListUsers);
  }
  unlinkWorker() {
    Swal.fire({
      title: '¿Estas seguro?',
      text:
        '¿Está seguro de desvincular al(os) ' +
        (this.router.url == '/work-centers/link-unlink-worker'
          ? 'Trabajador(es)'
          : 'Psicólogo(s) Especialista(s) SST') +
        ' seleccionado(s)?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingService.ChangeStatusLoading(true);
        for (let i = 0; i < this.countListUsers; i++) {
          this.router.url == '/work-centers/link-unlink-worker'
            ? this.removeWorker(i)
            : this.removePsychologist(i);
        }
      }
    });
  }
  removePsychologist(i: any) {
    this.workCenterService
      .DeletePsychologistWorkCenter(
        this.listUsersSelected[i].id,
        this.listUsersSelected[i].psicologosCentroTrabajo.idCentroTrabajo
      )
      .subscribe({
        next: (data) => {
          if (this.countListUsers == i + 1) {
            Swal.fire({
              icon: 'success',
              title:
                'Se ha desvinculado al(los) Psicólogo(s) Especialista(s) SST seleccionado(s)',
              showConfirmButton: false,
              timer: 1300,
            }).then(() => window.location.reload());
            setTimeout(
              () => this.loadingService.ChangeStatusLoading(false),
              600
            );
          }
        },
        error: (error) => {
          console.error(error.error.message);
          this.openSnackBar(error.error.message);
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
        },
      });
  }
  removeWorker(i: any) {
    this.workCenterService
      .DeleteUserWorkCenter(
        this.listUsersSelected[i].id,
        this.listUsersSelected[i].trabajadorCentroTrabajo.workPlaceId
      )
      .subscribe({
        next: (data) => {
          if (this.countListUsers == i + 1) {
            Swal.fire({
              icon: 'success',
              title:
                'Se ha desvinculado al(los) Trabajador(es) seleccionado(s)',
              showConfirmButton: false,
              timer: 1300,
            }).then(() => window.location.reload());
            setTimeout(
              () => this.loadingService.ChangeStatusLoading(false),
              600
            );
          }
        },
        error: (error) => {
          console.error(error.error.message);
          this.openSnackBar(error.error.message);
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
        },
      });
  }
}
