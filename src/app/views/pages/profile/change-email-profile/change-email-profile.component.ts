import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-email-profile',
  templateUrl: './change-email-profile.component.html',
  styleUrls: ['./change-email-profile.component.scss'],
})
export class ChangeEmailProfileComponent implements OnInit {
  public formEmail: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public accountService: AccountService,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService,
    private genericService: GenericService,
    @Optional() public dialogRef: MatDialogRef<ChangeEmailProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.formEmail = this.formBuilder.group({
      OldEmail: this.accountService.userData.user.email,
      NewEmail: ['', Validators.required],
      ConfirmEmail: ['', Validators.required],
    });
  }
  GetInto() {
    this.loadingService.ChangeStatusLoading(true);
    this.accountService.ChangeEmail(this.formEmail.value).subscribe(
      (result: any) => {
        this.openSnackBar(result.message);
        Swal.fire({
          icon: 'success',
          title: result.message,
          text: 'Por favor vuelve a iniciar sessión',
          showConfirmButton: false,
          timer: 2200,
        }).then(() => {
          this.dialogRef.close();
          this.accountService.CloseUserSession();
        });
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 800);
      },
      (error) => {
        console.error(error);
        this.openSnackBar(error.error.message);
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 800);
      }
    );
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
  cancelarForm() {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'no podras revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dialogRef.close();
      }
    });
  }
}
