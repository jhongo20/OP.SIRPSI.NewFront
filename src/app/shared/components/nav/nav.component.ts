import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuProperties } from 'src/app/core/models/menu-properties';
import { AccountService } from '../../services/account.service';
import { SelectRoleService } from '../../services/select-role.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public enableSesion: boolean = false;
  public menuSettings: any = {
    Dashboard: false,
    Roles: false,
    Routes: false,
    RoutesRole: false,
    Configuration: false,
    MinisterioUno: false,
    Ministerio: false,
    WorkCenters: false,
    Countries: false,
  };
  constructor(
    public accountService: AccountService,
    public roleService: SelectRoleService
  ) {
    if (this.accountService.userData) {
      this.menuSettings = {
        Dashboard: true,
        Users:
          this.accountService.userData.rutasAsignadas.filter(
            (ruta: any) => ruta.ruta == 'users'
          ).length > 0,
        UsersList:
          this.accountService.userData.rutasAsignadas.filter(
            (ruta: any) => ruta.ruta == 'list-users'
          ).length > 0,
        UsersCompany:
          this.accountService.userData.rutasAsignadas.filter(
            (ruta: any) => ruta.ruta == 'users-company'
          ).length > 0,
        Roles:
          this.accountService.userData.rutasAsignadas.filter(
            (ruta: any) => ruta.ruta == 'roles'
          ).length > 0,
        Routes:
          this.accountService.userData.rutasAsignadas.filter(
            (ruta: any) => ruta.ruta == 'routes'
          ).length > 0,
        RoutesRole:
          this.accountService.userData.rutasAsignadas.filter(
            (ruta: any) => ruta.ruta == 'routes-role'
          ).length > 0,
        Configuration:
          this.accountService.userData.rutasAsignadas.filter(
            (ruta: any) => ruta.ruta == 'configuration'
          ).length > 0,
        MinisterioUno:
          this.accountService.userData.rutasAsignadas.filter(
            (ruta: any) => ruta.ruta == 'configuration'
          ).length > 0,
        Ministerio:
          this.accountService.userData.rutasAsignadas.filter(
            (ruta: any) => ruta.ruta == 'configuration'
          ).length > 0,
        WorkCenters:
          this.accountService.userData.rutasAsignadas.filter(
            (ruta: any) => ruta.ruta == 'work-centers'
          ).length > 0,
        Companies:
          this.accountService.userData.rutasAsignadas.filter(
            (ruta: any) => ruta.ruta == 'companies'
          ).length > 0,
        CompaniesList:
          this.accountService.userData.rutasAsignadas.filter(
            (ruta: any) => ruta.ruta == 'list-companies'
          ).length > 0,
        CompaniesUser:
          this.accountService.userData.rutasAsignadas.filter(
            (ruta: any) => ruta.ruta == 'companies-user'
          ).length > 0,
        Variables:
          this.accountService.userData.rutasAsignadas.filter(
            (ruta: any) => ruta.ruta == 'variables'
          ).length > 0,
      };
    }
  }
  ngOnInit(): void {}
  CloseSesion() {
    this.accountService.CloseUserSession();
  }
}
