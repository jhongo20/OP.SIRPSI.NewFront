import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../../services/loading.service';
import { SelectRoleService } from '../../services/select-role.service';
import { Router } from '@angular/router';
import { GenericService } from '../../services/generic.service';

@Component({
  selector: 'app-select-role-menu',
  templateUrl: './select-role-menu.component.html',
  styleUrls: ['./select-role-menu.component.scss'],
})
export class SelectRoleMenuComponent implements OnInit {
  @Input() role: string;
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
  }

  GetInto() {
    this.accountService
      .RenewToken(this.accountService.userData.id, this.item.roleId, this.accountService.userData.empresaId)
      .subscribe(() => {
        window.location.reload();
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
