import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, BehaviorSubject } from 'rxjs';
import {
  ActivateUserRequest,
  AuthenticationRequest,
  ChangeEmailRequest,
  ChangePasswordRequest,
  ChangedPasswwordRequest,
  RecoverPasswordRequest,
} from 'src/app/core/models/users/authentication-request';
import { AuthenticationResponse, Response } from 'src/app/core/models/response';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { RegisterRequest } from 'src/app/core/models/users/register-request';
import { MenuProperties } from 'src/app/core/models/menu-properties';
import { SelectRoleService } from './select-role.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private userSubject: BehaviorSubject<AuthenticationResponse | any>;
  public menuProperties: Observable<AuthenticationResponse>;
  public get userData(): AuthenticationResponse {
    return this.userSubject.value;
  }

  constructor(
    private http: HttpClient,
    public router: Router,
    private roleService: SelectRoleService,
    private loadingService: LoadingService
  ) {
    var session =
      sessionStorage['user'] == undefined
        ? null
        : JSON.parse(sessionStorage['user']);
    this.userSubject = new BehaviorSubject<AuthenticationResponse>(session);
    this.menuProperties = this.userSubject.asObservable();
  }

  public Authenticate(
    data: AuthenticationRequest
  ): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(environment.urlApi + 'User/Login', data)
      .pipe(
        map((res) => {
          if (res) {
            const user: AuthenticationResponse = res;
            // user.menuSettings = {
            //   myHotels: user.rutas.filter((ruta: any) => ruta.ruta == 'hotel-rooms').length > 0,
            //   Reservations: user.rutas.filter((ruta: any) => ruta.ruta == 'reservation').length > 0,
            //   Configurations: user.rutas.filter((ruta: any) => ruta.ruta == 'configuration').length > 0,
            // };
            this.CreateUserSession(user);
          }
          return res;
        })
      );
  }

  public Register(data: RegisterRequest): Observable<Response> {
    return this.http
      .post<Response>(environment.urlApi + 'Account/Register', data)
      .pipe(
        map((res) => {
          if (res.succeeded == true) {
            var authRequest: AuthenticationRequest | any = {
              userName: data.usuario,
              password: data.contrasena,
            };
            this.Authenticate(authRequest).subscribe();
          }
          return res;
        })
      );
  }

  public CreateUserSession(auth: AuthenticationResponse) {
    sessionStorage.setItem('user', JSON.stringify(auth));
    this.userSubject.next(auth);
    this.menuProperties = this.userSubject.asObservable();
    Swal.fire({
      icon: 'success',
      title: 'Se ha iniciado sesión correctamente.',
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      this.ValidateSesion(1);
      // window.location.reload();
    });
  }

  public CloseUserSession() {
    this.loadingService.ChangeStatusLoading(true);
    sessionStorage.removeItem('user');
    this.userSubject.next(null);
    this.roleService.SelectRoleUser(false);
    setInterval(() => {
      this.loadingService.ChangeStatusLoading(false);
    }, 1000);
    this.router.navigate(['/welcome']);
    // this.ValidateSesion();
    // window.location.reload();
  }

  public ValidateSesion(type: number = 0) {
    console.log(type);
    if (this.userData) {
      if (type == 0) this.router.navigate(['/dashboard']);
      if (type == 1) {
        if (!this.roleService.roleSelectData)
          this.router.navigate(['/account/select-role']);
      }
    }
  }

  public SendChangedPasswword(data: ChangedPasswwordRequest): Observable<any> {
    return this.http
      .post<any>(environment.urlApi + 'User/SendEmailChangedPasswword', data)
      .pipe(
        map((res) => {
          if (res.Status == '400') {
            console.log(res);
          }
          return res;
        })
      );
  }

  public RecoverPassword(data: RecoverPasswordRequest): Observable<any> {
    return this.http
      .post<any>(environment.urlApi + 'User/RecoverPassword', data)
      .pipe(
        map((res) => {
          if (res.Status == '400') {
            console.log(res);
          }
          return res;
        })
      );
  }

  public ActivateUser(data: ActivateUserRequest): Observable<any> {
    return this.http
      .post<any>(environment.urlApi + 'User/ActivateUser', data)
      .pipe(
        map((res) => {
          if (res.Status == '400') {
            console.log(res);
          }
          return res;
        })
      );
  }
  public ChangePassword(data: ChangePasswordRequest): Observable<any> {
    return this.http
      .post<any>(environment.urlApi + 'User/ChangePassword', data)
      .pipe(
        map((res) => {
          if (res.Status == '400') {
            console.log(res);
          }
          return res;
        })
      );
  }
  public ChangeEmail(data: ChangeEmailRequest): Observable<any> {
    return this.http
      .post<any>(environment.urlApi + 'User/ChangeEmail', data)
      .pipe(
        map((res) => {
          if (res.Status == '400') {
            console.log(res);
          }
          return res;
        })
      );
  }
}
