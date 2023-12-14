import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { SelectRoleService } from 'src/app/shared/services/select-role.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assign-new-role-user',
  templateUrl: './assign-new-role-user.component.html',
  styleUrls: ['./assign-new-role-user.component.scss'],
})
export class AssignNewRoleUserComponent implements OnInit {
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
    private genericService: GenericService,
    @Optional() public dialogRef: MatDialogRef<AssignNewRoleUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.loadingService.ChangeStatusLoading(true);
    this.loadingService.loadingPage.subscribe(
      (result) => (this.loading = result)
    );

    this.form = this.formBuilder.group({
      UserId: [this.data.user, Validators.required],
      RoleId: ['', Validators.required],
      IdEstado: 'asdasdasdas',
    });

    this.getListas();
  }

  GetInto() {
    this.form.controls['UserId'].setValue(this.data.user);
    Swal.fire({
      title: '¿Estas seguro?',
      text: '¿Está seguro de asignar al usuario este rol?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingService.ChangeStatusLoading(true);
        this.genericService
          .Post('rolesusuario/RegistrarRolesUsuario', this.form.value)
          .subscribe({
            next: (data) => {
              Swal.fire({
                icon: 'success',
                title: 'Se ha asignado el rol correctamente',
                showConfirmButton: true,
              }).then(() => window.location.reload());
              setTimeout(
                () => this.loadingService.ChangeStatusLoading(false),
                600
              );
            },
            error: (error) => {
              console.error(error.error.message);
              this.openSnackBar(error.error.message);
              setTimeout(
                () => this.loadingService.ChangeStatusLoading(false),
                600
              );
            },
          });
      }
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
    if (
      this.accountService.userData.roleId == environment.psicologoRole ||
      this.accountService.userData.roleId == environment.administradorEmpRole
    )
      this.genericService
        .GetAll(`roles/ConsultarRoles?istInternal=${this.data.internal}`)
        .subscribe((data: any) => {
          this.roleList = data.filter((data: any) => {
            this.accountService.userData.roleId ==
            environment.administradorEmpRole
              ? data
              : data.id != environment.administradorEmpRole;
          });
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
        });
    else
      this.genericService
        .GetAll(`roles/ConsultarRoles`)
        .subscribe((data: any) => {
          this.roleList = data;
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
        });
  }

  onSelected(event: any) {
    this.item = event;
  }
}
