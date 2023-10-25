import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-history-remove-reinstate',
  templateUrl: './history-remove-reinstate.component.html',
  styleUrls: ['./history-remove-reinstate.component.scss'],
})
export class HistoryRemoveReinstateComponent implements OnInit {
  id: string | undefined;
  @Input('type') type: number = 2;
  public seleted: number;
  public selectedRoom: any = null;
  public item: any;
  public filter: string = '';
  public table: string = 'reportes/ConsultarHistorialRetirosReintegros';
  public columns = [
    { name: 'Fecha', data: 'fecha' },
    { name: 'Estado', data: 'estado', property: 'nombre' },
    { name: 'Tipo documento', data: 'user', property: 'tipoDocumento' },
    { name: 'Documento', data: 'user', property: 'documento' },
    { name: 'Correo electrónico', data: 'user', property: 'correo' },
    { name: 'Teléfono', data: 'user', property: 'telefono' },
    { name: 'Nombre', data: 'user', property: 'nombreCompleto' },
    { name: 'Rol', data: 'user', property: 'role' },
    { name: 'Centro trabajo', data: 'centroTrabajo', property: 'nombre' },
    { name: 'Tipo documento', data: 'registerUser', property: 'tipoDocumento' },
    { name: 'Documento', data: 'registerUser', property: 'documento' },
    { name: 'Correo electrónico', data: 'registerUser', property: 'correo' },
    { name: 'Teléfono', data: 'registerUser', property: 'telefono' },
    { name: 'Nombre', data: 'registerUser', property: 'nombreCompleto' },
    { name: 'Rol', data: 'registerUser', property: 'role' },
  ];

  constructor(
    public genericService: GenericService,
    private router: Router,
    public accountService: AccountService,
    private loadingService: LoadingService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.filter = '&type=' + this.type;
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
  }
}
