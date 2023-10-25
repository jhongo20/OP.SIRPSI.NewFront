import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { CompaniesFormComponent } from '../companies-form/companies-form.component';
import { UsersFormComponent } from '../../users/users-form/users-form.component';
import { AssignWorkCentersFormComponent } from '../../work-centers/assign-work-centers-form/assign-work-centers-form.component';
import { DataTable } from 'simple-datatables';

@Component({
  selector: 'app-companies-user',
  templateUrl: './companies-user.component.html',
  styleUrls: ['./companies-user.component.scss'],
})
export class CompaniesUserComponent implements OnInit {
  id: string | undefined;
  public seleted: number;
  public selectedRoom: any = null;
  // public filter: string = '&Usuario=' + this.accountService.userData.id;
  public table: string = 'empresas/ConsultarEmpresasUsuario';
  public filter: string = '&user=' + this.accountService.userData.id;
  public nameEmpresa: any;
  public nameWorkCenter: any;
  public columns = [
    { name: 'Tipo documento', data: 'tipoDocumento', property: 'nombre' },
    { name: 'Documento', data: 'documento' },
    { name: 'Dígito verificación', data: 'digitoVerificacion' },
    { name: 'Tipo empresa', data: 'tipoEmpresa', property: 'nombre' },
    { name: 'Nombre', data: 'nombre' },
    { name: 'Ministerio', data: 'ministerio', property: 'nombre' },
    // { name: 'Administrador', data: 'usuario', property: 'names' },
    { name: 'Estado', data: 'estado', property: 'nombre' },
  ];
  public options = [
    {
      delete: false,
      edit: true,
      details: false,
      select: true,
      state: false,
      pdf: false,
      validationSelect: false,
      assign: true,
    },
  ];
  public columnsWork = [
    { name: 'Nombre', data: 'nombre' },
    { name: 'Descripción', data: 'descripcion' },
    { name: 'Empresa', data: 'empresa', property: 'nombre' },
    { name: 'Estado', data: 'estados', property: 'nombre' },
    { name: 'Psicologo', data: 'usuario', property: 'names' },
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
  public optionsWork = [
    {
      delete: true,
      edit: false,
      details: false,
      select: true,
      state: false,
      pdf: false,
      validationSelect: false,
      assign: true,
    },
  ];
  public dataTable: any = null;
  public dataTableUsers: any = null;
  constructor(
    public genericService: GenericService,
    private router: Router,
    public accountService: AccountService,
    private loadingService: LoadingService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loadingService.ChangeStatusLoading(false);
      // const dataTable = new DataTable('#dataTableExample');
    }, 1100);
  }

  OpenFormDialog(event: any) {
    const dialogRef = this.dialog.open(AssignWorkCentersFormComponent, {
      data: { id: event },
    });
    dialogRef.afterClosed().subscribe();
  }
  onAssignAdmin(
    item: any,
    table: number = 0,
    estado: number = 1,
    role: number = 1,
    type: number
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
              centroTrabajo: null,
              title:
                table == 0
                  ? 'Asignar administrador'
                  : table == 1
                  ? 'Asignar psicologo'
                  : 'Asignar trabajador',
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
          retornarModal: environment.retornarModal.asignarPsicologo,
          empresa: table != 0 ? item.idEmpresa : item.id,
          centroTrabajo: null,
        },
      });
      dialogRef.afterClosed().subscribe();
    }
  }
  SelectReservation(item: any) {
    this.nameEmpresa = item;
    this.genericService
      .GetAll(
        'centrotrabajo/ConsultarCentroDeTrabajo?PageNumber=1&PageSize=100000&companie=' +
          item.idConsecutivo
      )
      .subscribe((data: any) => {
        this.dataTable = data;
      });
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
  // openFormDialogUser() {
  //   Swal.fire({
  //     title: 'Información importante',
  //     text:
  //       'Bienvenido/a al proceso de registro de Empresas en el Sistema de Información Psicosocial (SIRSPI). Para completar el registro de tu empresa, es necesario contar ' +
  //       'con la documentación correspondiente, incluyendo los documentos de legalización, así como la información del representante legal y un correo electrónico para asignar al ' +
  //       'administrador SIRPSI de la empresa. Cabe destacar que, si la empresa cuenta con varios centros de trabajo, primero se debe registrar la información del centro de trabajo ' +
  //       'principal. Posteriormente, el usuario Administrador SIRPSI de la empresa podrá ingresar al sistema y registrar los demás centros de trabajo que tenga la empresa y asignar ' +
  //       'uno o varios psicólogos especialistas en Salud y Seguridad en el Trabajo (SST) a dichos centros de trabajo (pueden ser varios psicólogos a un mismo centro de trabajo), a ' +
  //       'través del módulo correspondiente, por lo tanto, no es necesario registrar cada centro de trabajo de forma individual en la opción «Registrar Empresa». Además, para ' +
  //       'facilitar el proceso, el sistema incluye una serie de videos tutoriales y material de capacitación que le ayudarán a completar el registro exitosamente. Puede acceder a ' +
  //       'ellos en el siguiente enlace: [link]. Por favor, selecciona "Aceptar" para continuar con el proceso de registro o "Cancelar" si deseas salir.',
  //     icon: 'info',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Aceptar',
  //     cancelButtonText: 'Cancelar',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const dialogRef = this.dialog.open(CompaniesFormComponent, {
  //         data: { id: 0, type: 0, reload: true, table: 0 },
  //       });
  //       dialogRef.afterClosed().subscribe();
  //     }
  //   });
  // }
}
