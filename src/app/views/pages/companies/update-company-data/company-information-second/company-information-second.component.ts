import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { AssignWorkCentersFormComponent } from '../../../work-centers/assign-work-centers-form/assign-work-centers-form.component';
import { UsersFormComponent } from '../../../users/users-form/users-form.component';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { CompaniesFormComponent } from '../../companies-form/companies-form.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-company-information-second',
  templateUrl: './company-information-second.component.html',
  styleUrls: ['./company-information-second.component.scss'],
})
export class CompanyInformationSecondComponent implements OnInit {
  public form: FormGroup;
  @Input('company') company: any = null;
  public filter: string;
  public listClaseRiesgo: any;
  public listSectorEconomico: any;
  public table: string = 'centrotrabajo/ConsultarCentroDeTrabajo';
  public columns = [
    { name: 'Nombre', data: 'nombre' },
    { name: 'Descripción', data: 'descripcion' },
    { name: 'Empresa', data: 'empresa', property: 'nombre' },
    { name: 'Estado', data: 'estados', property: 'nombre' },
    // { name: 'Psicologo', data: 'usuario', property: 'names' },
  ];
  public optionsWork = [
    {
      delete: true,
      edit: false,
      details: false,
      select: false,
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
    private accountService: AccountService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.filter = '&companie=' + this.company.idConsecutivo;
    this.getListas();
    this.form = this.formBuilder.group({
      Id: this.company.id,
      NumeroTrabajadores: ['', Validators.required],
      ClaseRiesgo: ['', Validators.required],
      IdSectorEconomico: ['', Validators.required],
    });
    this.loadDataCompany(this.company);
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
    role: number = 1
  ) {
    const dialogRef = this.dialog.open(UsersFormComponent, {
      data: {
        id: 0,
        type: 1,
        item: item,
        reload: true,
        table: table,
        estado: estado,
        role: role,
        retornarModal: environment.retornarModal.asignarPsicologo,
        empresa: table != 0 ? item.idEmpresa : item.id,
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
  openFormDialogUser() {
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
        const dialogRef = this.dialog.open(CompaniesFormComponent, {
          data: { id: 0, type: 0, reload: true, table: 0 },
        });
        dialogRef.afterClosed().subscribe();
      }
    });
  }
  onSave() {
    console.log(this.form.value);
    Swal.fire({
      title: '¿Estas seguro?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingService.ChangeStatusLoading(true);
        this.genericService
          .Put(
            'empresas/ActualizarDatosComplementariosEmpresa',
            this.form.value
          )
          .subscribe({
            next: (data) => {
              this.loadingService.ChangeStatusLoading(false);
              Swal.fire({
                icon: 'success',
                title: 'Empresa, Actualizada exitosamente.',
                showConfirmButton: false,
                timer: 1500,
              }).then(() => window.location.reload());
            },
            error: (error) => {
              console.error(error);
              this.openSnackBar(error.error.message);
              this.loadingService.ChangeStatusLoading(false);
            },
          });
      }
    });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
  getListas() {
    this.loadingService.ChangeStatusLoading(true);
    this.listClaseRiesgo = [
      { id: '1', nombre: '1' },
      { id: '2', nombre: '2' },
      { id: '3', nombre: '3' },
      { id: '4', nombre: '4' },
      { id: '5', nombre: '5' },
    ];
    this.genericService
      .GetAll('sectoresEconomicos/ConsultarSectoresEconomicos')
      .subscribe((data: any) => {
        this.listSectorEconomico = data;
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 1100);
      });
  }
  loadDataCompany(event: any) {
    if (event != null && event != undefined) {
      this.form.controls['NumeroTrabajadores'].setValue(
        event.numeroTrabajadores
      );
      this.form.controls['ClaseRiesgo'].setValue(event.claseRiesgo);
      this.form.controls['IdSectorEconomico'].setValue(event.idSectorEconomico);
    }
  }
}
