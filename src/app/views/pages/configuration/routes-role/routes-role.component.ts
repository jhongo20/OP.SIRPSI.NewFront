import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-routes-role',
  templateUrl: './routes-role.component.html',
  styleUrls: ['./routes-role.component.scss'],
})
export class RoutesRoleComponent {
  id: string | undefined;
  public rolesList: any;
  constructor(
    public genericService: GenericService,
    private router: Router,
    private accountService: AccountService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.LoadLists();
  }

  LoadLists() {
    this.genericService
      .GetAll('roles/ConsultarRoles')
      .subscribe((data: any) => {
        this.rolesList = data;
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
      });
  }
  SelectedItem(role: string, modulo: string, event: any) {
    this.loadingService.ChangeStatusLoading(true);
    let body = {
      RoleId: role,
      ModuloId: modulo,
    };
    this.genericService
      .Post(
        'modulosUserRole/' +
          (event.checked ? 'RegistrarModulosRole' : 'EliminarModulosRole'),
        body
      )
      .subscribe((data: any) => {
        this.LoadLists();
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
        this.openSnackBar(
          event.checked
            ? 'Se ha asignado correctamente'
            : 'Se ha desasignado correctamente'
        );
      });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
  AssignPermissions(item: any) {
    console.log(item);
  }
}
