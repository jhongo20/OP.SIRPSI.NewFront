import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { WorkCenterService } from 'src/app/shared/services/work-center.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-remove-user',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.scss'],
})
export class RemoveUserComponent implements OnInit {
  public formInitial: FormGroup;
  reloadTable: number = 0;
  listWorkCenterUser: any;
  countListUsers: number = 0;
  listUsersSelected: any = [];
  public filter: string =
    '&type=2&role=' +
    (this.router.url == '/work-centers/link-unlink-worker'
      ? environment.trabajadorRole
      : environment.psicologoRole);
  public table: string = 'usuario/ConsultarUsuariosEmpresa';
  public columns = [
    { name: 'Tipo documento', data: 'tipoDocumento', property: 'nombre' },
    { name: 'No. Documento', data: 'cedula' },
    { name: 'Correo', data: 'correo' },
    { name: 'Teléfono', data: 'telefono' },
    { name: 'Empresa', data: 'empresa', property: 'nombre' },
    // { name: 'Rol', data: 'role', property: 'name' },
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
    private message: NzMessageService,
    private router: Router
  ) { }

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
        '¿Está seguro de retirar al(os) ' +
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
          var body = {
            Status: environment.retiradoEstado,
            User: this.listUsersSelected[i].id,
            Tipo: this.router.url == '/work-centers/link-unlink-worker' ? 2 : 1,
          };
          this.genericService
            .Put(
              'psicologosCentroTrabajo/RetirarReintegrarPsicologoCentroTrabajo',
              body
            )
            .subscribe({
              next: (data) => {
                if (this.countListUsers == i + 1) {
                  Swal.fire({
                    icon: 'success',
                    title:
                      'Se ha retirado al(los) ' +
                      (this.router.url == '/work-centers/link-unlink-worker'
                        ? 'Trabajador(es)'
                        : 'Psicólogo(s) Especialista(s) SST') +
                      ' seleccionado(s)',
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
                this.message.error(error.error.message, { nzDuration: 4000 });
                setTimeout(
                  () => this.loadingService.ChangeStatusLoading(false),
                  600
                );
              },
            });
        }
      }
    });
  }
}
