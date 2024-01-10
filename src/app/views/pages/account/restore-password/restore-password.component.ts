import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AccountService } from 'src/app/shared/services/account.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss'],
})
export class RestorePasswordComponent implements OnInit {
  public form: FormGroup;
  public loading: Boolean = true;
  constructor(
    public formBuilder: FormBuilder,
    public accountService: AccountService,
    private message: NzMessageService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.loadingService.ChangeStatusLoading(true);
    this.loadingService.loadingPage.subscribe(
      (result) => (this.loading = result)
    );
    this.form = this.formBuilder.group({
      Empresa: ['3467', Validators.required],
      Document: ['1234567', Validators.required],
      Email: ['jculma@ministerio.gov.co', Validators.required],
    });
    // this.accountService.ValidateSesion();
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 800);
  }
  GetInto() {
    this.loadingService.ChangeStatusLoading(true);
    this.accountService.SendChangedPasswword(this.form.value).subscribe(
      (result: any) => {
        this.message.success(result.message, { nzDuration: 4000 });
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 800);
      },
      (error) => {
        console.error(error.error);
        console.error(error);
        this.message.error(error.error.message, { nzDuration: 4000 });
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 800);
      }
    );
  }
}
