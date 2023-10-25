import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  Routes,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AccountService } from 'src/app/shared/services/account.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private accountService: AccountService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.accountService.userData) {
      if (
        route.routeConfig?.path == 'dashboard' ||
        route.routeConfig?.path == 'select-role' ||
        route.routeConfig?.path == 'account'
      )
        return true;
      else if (
        this.accountService.userData.rutasAsignadas.filter(
          (ruta: any) => ruta.ruta == route.routeConfig?.path
        ).length > 0
      )
        return true;
    }
    this.router.navigate(['welcome']);
    return true;
  }
}
