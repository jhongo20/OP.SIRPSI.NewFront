import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
})
export class FaqsComponent implements OnInit {
  public filter: string;
  public table: string = 'faqs/ConsultarFaqs';
  public columns = [
    { name: 'Nombre', data: 'titulo' },
    { name: 'Contenido', data: 'contenido' },
    { name: 'Estado', data: 'estado', property: 'nombre' },
    { name: 'Categoría', data: 'categoria', property: 'nombre' },
    // { name: 'Psicologo', data: 'usuario', property: 'names' },
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
      assign: false,
    },
  ];
  public dataTable: any = null;
  public dataTableUsers: any = null;
  constructor(
    public genericService: GenericService,
    private router: Router,
    private accountService: AccountService,
    private loadingService: LoadingService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadingService.ChangeStatusLoading(false);
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
  onRegisterFAQS() {
    this.router.navigate(['tutorials-training/faqs/create']);
  }
}
