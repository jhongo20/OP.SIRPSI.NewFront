import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users-company-not-affiliated',
  templateUrl: './users-company-not-affiliated.component.html',
  styleUrls: ['./users-company-not-affiliated.component.scss'],
})
export class UsersCompanyNotAffiliatedComponent implements OnInit {
  id: string | undefined;
  public seleted: number;
  public selectedRoom: any = null;
  public item: any;
  public filter: string = '&role=' + environment.trabajadorRole;
  public table: string = 'usuario/ConsultarUsuariosEmpresaSinCentro';
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
      state: true,
      pdf: false,
      validationSelect: true,
    },
  ];
  constructor(
    public genericService: GenericService,
    private router: Router,
    public accountService: AccountService,
    private loadingService: LoadingService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
  }
}
