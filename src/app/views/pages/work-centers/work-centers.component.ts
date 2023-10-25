import { Component, OnInit } from '@angular/core';
import { UsersFormComponent } from '../users/users-form/users-form.component';
import { GenericService } from 'src/app/shared/services/generic.service';
import { AccountService } from 'src/app/shared/services/account.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { WorkCenterService } from 'src/app/shared/services/work-center.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterNewUsersComponent } from '../users/register-new-users/register-new-users.component';

@Component({
  selector: 'app-work-centers',
  templateUrl: './work-centers.component.html',
  styleUrls: ['./work-centers.component.scss'],
})
export class WorkCentersComponent implements OnInit {
  id: string | undefined;
  public seleted: number;
  public selectedRoom: any = null;
  public nameWorkCenter: any;
  // public filter: string = '&Usuario=' + this.accountService.userData.id;
  public table: string = 'userWorkPlace/ConsultarCentroDeTrabajoUsuario';
  public filter: string = '&user=' + this.accountService.userData.id;
  public columnsWork = [
    { name: 'Nombre', data: 'nombre' },
    { name: 'Descripción', data: 'descripcion' },
    { name: 'Empresa', data: 'empresa', property: 'nombre' },
    { name: 'Estado', data: 'estados', property: 'nombre' },
    // { name: 'Psicologo', data: 'usuario', property: 'names' },
  ];
  public optionsWork = [
    {
      delete: false,
      edit: false,
      details: false,
      select: true,
      state: false,
      pdf: false,
      validationSelect: false,
      assign: false,
    },
  ];
  public columnsUsers = [
    { name: 'Tipo documento', data: 'tipoDocumento', property: 'nombre' },
    { name: 'Documento', data: 'cedula' },
    { name: 'Correo', data: 'correo' },
    { name: 'Teléfono', data: 'telefono' },
    { name: 'Nombre', data: 'nombreUsuario' },
    { name: 'Apellidos', data: 'apellidosUsuario' },
    { name: 'Estado', data: 'estado', property: 'nombre' },
  ];
  public optionsUsers = [
    {
      deletePer: true,
    },
  ];
  public dataTableUsers: any = null;
  constructor(
    public genericService: GenericService,
    private router: Router,
    public accountService: AccountService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private workCenterService: WorkCenterService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
  }

  onAssignAdmin(
    item: any,
    table: number = 0,
    estado: number = 1,
    role: number = 1,
    type: number = 0
  ) {
    if (type == 0) {
      Swal.fire({
        title: 'Información importante',
        html: '<p>Bienvenido/a al proceso de registro de Empresas en el Sistema de Información Psicosocial (SIRSPI). Para completar el registro de tu empresa, es necesario contar con la documentación correspondiente, incluyendo los documentos de legalización, así como la información del representante legal y un correo electrónico para asignar al administrador SIRPSI de la empresa. Cabe destacar que, si la empresa cuenta con varios centros de trabajo, primero se debe registrar la información del centro de trabajo principal. Posteriormente, el usuario Administrador SIRPSI de la empresa podrá ingresar al sistema y registrar los demás centros de trabajo que tenga la empresa y asignar uno o varios psicólogos especialistas en Salud y Seguridad en el Trabajo (SST) a dichos centros de trabajo (pueden ser varios psicólogos a un mismo centro de trabajo), a través del módulo correspondiente, por lo tanto, no es necesario registrar cada centro de trabajo de forma individual en la opción «Registrar Empresa». Además, para facilitar el proceso, el sistema incluye una serie de videos tutoriales y material de capacitación que le ayudarán a completar el registro exitosamente. Puede acceder a ellos en el siguiente enlace: <a href="#">material de capacitación</a>. Por favor, selecciona "Aceptar" para continuar con el proceso de registro o "Cancelar" si deseas salir.</p>',
        // text:
        //   'Bienvenido/a al proceso de registro de Empresas en el Sistema de Información Psicosocial (SIRSPI). Para completar el registro de tu empresa, es necesario contar ' +
        //   'con la documentación correspondiente, incluyendo los documentos de legalización, así como la información del representante legal y un correo electrónico para asignar al ' +
        //   'administrador SIRPSI de la empresa. Cabe destacar que, si la empresa cuenta con varios centros de trabajo, primero se debe registrar la información del centro de trabajo ' +
        //   'principal. Posteriormente, el usuario Administrador SIRPSI de la empresa podrá ingresar al sistema y registrar los demás centros de trabajo que tenga la empresa y asignar ' +
        //   'uno o varios psicólogos especialistas en Salud y Seguridad en el Trabajo (SST) a dichos centros de trabajo (pueden ser varios psicólogos a un mismo centro de trabajo), a ' +
        //   'través del módulo correspondiente, por lo tanto, no es necesario registrar cada centro de trabajo de forma individual en la opción «Registrar Empresa». Además, para ' +
        //   'facilitar el proceso, el sistema incluye una serie de videos tutoriales y material de capacitación que le ayudarán a completar el registro exitosamente. Puede acceder a ' +
        //   'ellos en el siguiente enlace: [link]. Por favor, selecciona "Aceptar" para continuar con el proceso de registro o "Cancelar" si deseas salir.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          const dialogRef = this.dialog.open(RegisterNewUsersComponent, {
            data: {
              id: 0,
              type: type,
              item: item,
              reload: true,
              table: table,
              estado: estado,
              role: role,
              retornarModal: environment.retornarModal.registrarTrabajador,
              empresa: type != 0 ? item.idEmpresa : item.id,
              title: 'Ficha de Datos Generales',
            },
          });
          dialogRef.afterClosed().subscribe();
        }
      });
    } else {
      const dialogRef = this.dialog.open(UsersFormComponent, {
        data: {
          id: 0,
          type: type,
          item: item,
          reload: true,
          table: table,
          estado: estado,
          role: role,
          retornarModal: environment.retornarModal.registrarTrabajador,
          empresa: type != 0 ? item.idEmpresa : item.id,
        },
      });
      dialogRef.afterClosed().subscribe();
    }
  }
  SelectCentroTrabajo(item: any) {
    this.nameWorkCenter = item;
    this.genericService
      .GetAll(
        'userWorkPlace/ConsultarUsuariosCentroDeTrabajo?workCenter=' + item.id
      )
      .subscribe((data: any) => {
        this.dataTableUsers = data;
      });
  }
  DeleteUser(workCenter: any, user: any) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'no podras revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingService.ChangeStatusLoading(true);
        this.workCenterService
          .DeleteUserWorkCenter(user.id, workCenter.id)
          .subscribe(
            (data) => {
              this.openSnackBar(data.message);
              setTimeout(
                () => this.loadingService.ChangeStatusLoading(false),
                600
              );
              window.location.reload();
            },
            (error) => {
              console.error(error);
              this.openSnackBar(error.error.message);
              setTimeout(
                () => this.loadingService.ChangeStatusLoading(false),
                1000
              );
            }
          );
      }
    });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
}
