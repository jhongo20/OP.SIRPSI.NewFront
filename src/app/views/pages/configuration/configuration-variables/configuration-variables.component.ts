import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ConfigurationVariablesFormComponent } from './configuration-variables-form/configuration-variables-form.component';
import { ValidationEmailVariableFormComponent } from './validation-email-variable-form/validation-email-variable-form.component';

@Component({
  selector: 'app-configuration-variables',
  templateUrl: './configuration-variables.component.html',
  styleUrls: ['./configuration-variables.component.scss'],
})
export class ConfigurationVariablesComponent implements OnInit {
  id: string | undefined;
  public seleted: number;
  public selectedRoom: any = null;
  // public filter: string = '&Usuario=' + this.accountService.userData.id;
  public table: string = 'variables/ConsultarVariables';
  public columnMo: boolean = false;
  public columns = [
    // { name: 'Id', data: 'id' },
    { name: 'Nombre', data: 'nombre' },
    { name: 'Descripción', data: 'descripcion' },
    { name: 'Modulo', data: 'modulo' },
    { name: 'Role', data: 'role', property: 'name' },
    { name: 'Variable', data: 'variable1' },
    { name: 'Variable 2', data: 'variable2' },
    // { name: 'Variable', data: 'variable3' },
    // { name: 'Variable', data: 'variable4' },
  ];
  public options = [
    {
      delete: true,
      edit: false,
      details: false,
      select: false,
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

  OpenFormDialog(id: number) {
    this.router.navigate(['/reservation/form/' + id + '/' + 'view']);
  }
  openFormDialogUser(type: any = 0) {
    if (type == 0) {
      const dialogRef = this.dialog.open(ConfigurationVariablesFormComponent, {
        data: { id: this.id, type: 0, reload: true },
      });
      dialogRef.afterClosed().subscribe();
    }
    if (type == 1) {
      const dialogRef = this.dialog.open(ValidationEmailVariableFormComponent, {
        data: { id: this.id, type: 0, reload: true },
      });
      dialogRef.afterClosed().subscribe();
    }
  }
}
