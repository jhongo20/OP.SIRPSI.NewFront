import { Component, OnInit } from '@angular/core';
import { LoadingService } from './shared/services/loading.service';
import { AccountService } from './shared/services/account.service';
import { SelectRoleService } from './shared/services/select-role.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public loading: Boolean = true;
  constructor(
    private loadingService: LoadingService,
    public accountService: AccountService,
    public roleService: SelectRoleService
  ) {}
  ngOnInit(): void {
    this.loadingService.ChangeStatusLoading(true);
    this.loadingService.loadingPage.subscribe(
      (result) => (this.loading = result)
    );
    this.accountService.ValidateSesion(1);
  }
  title = 'OP.SIRPSI.Front';
}
