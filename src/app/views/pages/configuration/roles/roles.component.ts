import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { RolesFormComponent } from './roles-form/roles-form.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  id: string | undefined;
  public seleted: number;
  public selectedRoom: any = null;
  // public filter: string = '&Usuario=' + this.accountService.userData.id;
  public table: string = 'roles/ConsultarRoles';
  public columns = [
    // { name: 'Id', data: 'id' },
    { name: 'Nombre', data: 'name' },
    { name: 'Descripción', data: 'description' },
    { name: 'Estado', data: 'estado', property: 'nombre' },
    { name: 'Es interno', data: 'istInternal' },
    { name: 'F. Registro', data: 'registrationDate', pipeDate: 'YYYY/dd/MM' },
  ];
  public options = [
    {
      delete: true,
      edit: true,
      details: false,
      select: false,
      state: false,
      pdf: false,
      validationSelect: false,
    },
  ];

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

  openFormDialogUser(item: any = null, type: number = 0) {
    const dialogRef = this.dialog.open(RolesFormComponent, {
      data: { item: item, type: type, reload: true },
    });
    dialogRef.afterClosed().subscribe();
  }
}
