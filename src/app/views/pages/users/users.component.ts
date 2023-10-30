import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { UsersFormComponent } from './users-form/users-form.component';
import { AssignWorkCentersUserFormComponent } from '../work-centers/assign-work-centers-user-form/assign-work-centers-user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  id: string | undefined;
  public seleted: number;
  public selectedRoom: any = null;
  public item: any;
  // public filter: string = '&Usuario=' + this.accountService.userData.id;
  public table: string = 'usuario/ConsultarUsuarios';
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
      delete: true,
      edit: true,
      details: true,
      select: true,
      state: true,
      pdf: false,
      validationSelect: true,
    },
  ];
  public columnsWork = [
    { name: 'Nombre', data: 'nombre' },
    { name: 'Descripción', data: 'descripcion' },
    { name: 'Empresa', data: 'empresa', property: 'nombre' },
    { name: 'Estado', data: 'estados', property: 'nombre' },
    { name: 'Psicologo', data: 'usuario', property: 'names' },
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
  constructor(
    public genericService: GenericService,
    private router: Router,
    private accountService: AccountService,
    private loadingService: LoadingService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
  }

  OpenFormDialog(id: any) {
    const dialogRef = this.dialog.open(AssignWorkCentersUserFormComponent, {
      data: { id: id, type: 0, reload: true },
    });
    dialogRef.afterClosed().subscribe();
  }
  DownloadPDF(id: number) {
    this.router.navigate(['/reservation/form/' + id + '/' + 'download']);
  }
  SelectReservation(item: any) {
    this.item = item;
    this.genericService
      .GetAll(
        'userWorkPlace/ConsultarCentroDeTrabajoUsuario?PageNumber=1&PageSize=100000&user=' +
          item.id
      )
      .subscribe((data: any) => {
        this.dataTable = data;
      });
  }
  openFormDialogUser() {
    const dialogRef = this.dialog.open(UsersFormComponent, {
      data: { id: this.id, type: 0, reload: true },
    });
    dialogRef.afterClosed().subscribe();
  }
  onAssignAdmin(item: any, table: number = 0) {
    const dialogRef = this.dialog.open(UsersFormComponent, {
      data: { id: 0, type: 1, item: item, reload: true, table: table },
    });
    dialogRef.afterClosed().subscribe();
  }
}
