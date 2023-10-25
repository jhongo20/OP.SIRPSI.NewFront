import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-activate-inactive-users',
  templateUrl: './activate-inactive-users.component.html',
  styleUrls: ['./activate-inactive-users.component.scss'],
})
export class ActivateInactiveUsersComponent implements OnInit {
  id: string | undefined;
  public seleted: number;
  public selectedRoom: any = null;
  public item: any;
  // public filter: string = '&Usuario=' + this.accountService.userData.id;
  public table: string = 'usuario/ConsultarUsuariosEmpresa';
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
      state: false,
      pdf: false,
      validationSelect: true,
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
}
