import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
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
  loading = false;
  switchValue = false;

  constructor(
    public genericService: GenericService,
    private router: Router,
    private accountService: AccountService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private message: NzMessageService,
  ) { }

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
    if (!this.loading) {
      this.loading = true;
      let body = {
        RoleId: role,
        ModuloId: modulo,
      };
      this.genericService
        .Post(
          'modulosUserRole/' +
          (event == false ? 'RegistrarModulosRole' : 'EliminarModulosRole'),
          body
        )
        .subscribe((data: any) => {
          setTimeout(() => {
            this.LoadLists();
            this.loading = false;
          }, 800);
          this.message.success((event == false
            ? 'Se ha asignado correctamente'
            : 'Se ha desasignado correctamente'), { nzDuration: 4000 });
        });
    }
  }

  AssignPermissions(item: any) {
    console.log(item);
  }

  clickSwitch(item: any, type: number, check: any): void {
    if (!this.loading) {
      this.loading = true;
      let body = {
        Id: item,
        Type: type,
      };
      this.genericService
        .Put('modulosUserRole/ChangePermissionsModulosRole', body)
        .subscribe((data: any) => {
          setTimeout(() => {
            this.LoadLists();
            this.loading = false;
          }, 800);
          this.message.success((check == false
            ? 'Se ha asignado correctamente'
            : 'Se ha desasignado correctamente'), { nzDuration: 4000 });
        });
    }
  }
}
