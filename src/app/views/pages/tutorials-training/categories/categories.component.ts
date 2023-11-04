import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  // public filter: string = '&Usuario=' + this.accountService.userData.id;
  public table: string = 'categorias/ConsultarCategorias';
  public nameEmpresa: any;
  public nameWorkCenter: any;
  public columns = [
    { name: 'Nombre', data: 'nombre' },
    { name: 'Tipo', data: 'tipo' },
    { name: 'Rol', data: 'idRol' },
  ];
  public options = [
    {
      delete: true,
      edit: false,
      details: false,
      select: true,
      state: false,
      pdf: false,
      validationSelect: false,
      assign: false,
    },
  ];
  constructor(
    private genericService: GenericService,
    private loadingService: LoadingService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadingService.ChangeStatusLoading(false);
  }
}
