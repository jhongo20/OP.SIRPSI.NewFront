import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AccountService } from 'src/app/shared/services/account.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.scss'],
})
export class ActivateUserComponent implements OnInit {
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
      Company: ['3467', Validators.required],
      Document: ['', Validators.required],
      Code: ['', Validators.required],
    });
    this.accountService.ValidateSesion();
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 800);
  }
  GetInto() {
    this.loadingService.ChangeStatusLoading(true);
    this.accountService.ActivateUser(this.form.value).subscribe(
      (result: any) => {
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 400);
        this.message.success(result.message, {
          nzDuration: 4000
        });
      },
      (error) => {
        console.error(error.error);
        console.error(error);
        this.message.error(error.error.message, {
          nzDuration: 4000
        });
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 800);
      }
    );
  }
}
