import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { SelectRoleService } from 'src/app/shared/services/select-role.service';

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.scss'],
})
export class SelectRoleComponent implements OnInit {
  public form: FormGroup;
  public loading: Boolean = true;
  hide = true;
  item: any = null;
  public roleList: any = [];
  constructor(
    public formBuilder: FormBuilder,
    public accountService: AccountService,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService,
    private roleService: SelectRoleService,
    public router: Router,
    private genericService: GenericService
  ) { }

  ngOnInit(): void {
    this.loadingService.ChangeStatusLoading(true);
    this.loadingService.loadingPage.subscribe(
      (result) => (this.loading = result)
    );

    this.form = this.formBuilder.group({
      Role: ['', Validators.required],
    });

    this.getListas();
    this.ValidateSession();
  }

  GetInto() {
    this.accountService
      .RenewToken(this.accountService.userData.id, this.item.roleId, this.accountService.userData.empresaId)
      .subscribe(() => {
        this.roleService.SelectRoleUser(true);
        this.accountService.ValidateSesion();
      });
  }

  Cancel() {
    this.accountService.CloseUserSession();
    // this.router.navigate(['/account/login']);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }

  ValidateSession() {
    if (this.roleService.roleSelectData) this.router.navigate(['/dashboard']);
    if (!this.accountService.userData) this.router.navigate(['/account/login']);
  }

  getListas() {
    this.genericService
      .GetAll(
        `rolesusuario/ConsultarRolesUsuario?idUser=${this.accountService.userData.id}&idCompany=${this.accountService.userData.empresaId}`
      )
      .subscribe((data: any) => {
        this.roleList = data;
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
      });
  }

  onSelected(event: any) {
    this.item = event;
  }
}
