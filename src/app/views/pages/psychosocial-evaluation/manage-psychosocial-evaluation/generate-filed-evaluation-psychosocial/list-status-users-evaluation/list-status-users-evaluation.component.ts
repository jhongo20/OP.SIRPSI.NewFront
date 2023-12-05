import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTable } from 'simple-datatables';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-list-status-users-evaluation',
  templateUrl: './list-status-users-evaluation.component.html',
  styleUrls: ['./list-status-users-evaluation.component.scss'],
})
export class ListStatusUsersEvaluationComponent implements OnInit {
  @Input('data') data: any;
  @Input('type') type: number;

  viewTable = false;
  public filter: string = '';
  public table: string = '';
  public dataTable: any = null;
  public view: boolean = false;
  public columns: any = [
    { name: 'Fecha convocatoria', data: 'fechaInicio', pipeDate: 'YYYY/dd/MM' },
    { name: 'Forma', data: 'forma' },
    { name: 'Número de documento ', data: 'usuario', property: 'cedula' },
    { name: 'Nombre', data: 'usuario', property: 'nombreUsuario' },
    { name: 'Apellidos', data: 'usuario', property: 'apellidosUsuario' },
    { name: 'Estado', data: 'estado', property: 'nombre' },
  ];

  public options = null;
  public title: string = '';
  tab: number = 0;
  public DataTable: DataTable;

  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private genericService: GenericService,
    private loadingService: LoadingService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadingService.ChangeStatusLoading(true);
    if (this.data != null) this.onLoadData();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }

  selectedRow(event: any, type: number) {}

  onLoadData() {
    if (this.type == 1)
      this.columns = [
        {
          name: 'Fecha convocatoria',
          data: 'fechaInicio',
          pipeDate: 'YYYY/dd/MM',
        },
        { name: 'Forma', data: 'forma' },
        { name: 'Número de documento ', data: 'usuario', property: 'cedula' },
        { name: 'Nombre', data: 'usuario', property: 'nombreUsuario' },
        { name: 'Apellidos', data: 'usuario', property: 'apellidosUsuario' },
        { name: 'Estado', data: 'estado', property: 'nombre' },
      ];
    if (this.type == 2)
      this.columns = [
        { name: 'Forma', data: 'forma' },
        { name: 'Número de documento ', data: 'usuario', property: 'cedula' },
        { name: 'Nombre', data: 'usuario', property: 'nombreUsuario' },
        { name: 'Apellidos', data: 'usuario', property: 'apellidosUsuario' },
      ];
    this.title = this.data.statusName;
    this.dataTable = this.data.details;
    setTimeout(() => {
      // this.adjustDataTable();
      this.loadingService.ChangeStatusLoading(false), 1200;
    });
  }

  adjustDataTable() {
    this.DataTable = new DataTable('#dataTableExample' + this.title, {
      perPageSelect: [5, 10, 15, 20],
      perPage: 5,
      labels: {
        placeholder: 'Buscar...', // The search input placeholder
        perPage: '{select} Número de registro por página', // per-page dropdown label
        noRows: 'No se encontraron registros', // Message shown when there are no records to show
        noResults: 'Ningún resultado coincide con su consulta de búsqueda', // Message shown when there are no search results
        info: 'Mostrando {start} a {end} de {rows} entradas', //
      },
    });
  }
}
