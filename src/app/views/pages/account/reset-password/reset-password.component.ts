import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AccountService } from 'src/app/shared/services/account.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  public form: FormGroup;
  public loading: Boolean = true;
  hide = true;
  constructor(
    public formBuilder: FormBuilder,
    public accountService: AccountService,
    private message: NzMessageService,
    private loadingService: LoadingService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadingService.ChangeStatusLoading(true);
    this.loadingService.loadingPage.subscribe(
      (result) => (this.loading = result)
    );
    this.form = this.formBuilder.group({
      UserId: ['', Validators.required],
      CodePassword: ['', Validators.required],
      NewPassword: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
    });
    // this.accountService.ValidateSesion();
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 800);
    this.GetPararmsRoute();
  }

  GetInto() {
    this.loadingService.ChangeStatusLoading(true);
    this.accountService.RecoverPassword(this.form.value).subscribe(
      (result: any) => {
        this.message.success(result.message, {
          nzDuration: 4000
        });
        Swal.fire({
          icon: 'success',
          title: result.message,
          showConfirmButton: false,
          timer: 2000,
        }).then(() => this.router.navigate(['/welcome']));
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 800);
      },
      (error) => {
        console.error(error);
        this.message.error(error.error.message, {
          nzDuration: 4000
        });
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 800);
      }
    );
  }

  GetPararmsRoute() {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.form.controls['UserId'].setValue(params.userId);
      this.form.controls['CodePassword'].setValue(
        params.codePassword.replace(/ /g, '+')
      );
      console.log(this.form.value);
    });
  }
}
