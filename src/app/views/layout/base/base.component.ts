import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouteConfigLoadStart,
  RouteConfigLoadEnd,
} from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { SelectRoleService } from 'src/app/shared/services/select-role.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
  isLoading: boolean;
  public loading: Boolean = true;
  constructor(
    private router: Router,
    private loadingService: LoadingService,
    public accountService: AccountService,
    public roleService: SelectRoleService
  ) {
    // Spinner for lazyload modules
    router.events.forEach((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading = false;
      }
    });
  }

  ngOnInit(): void {
    this.loadingService.ChangeStatusLoading(true);
    this.loadingService.loadingPage.subscribe(
      (result) => (this.loading = result)
    );
    this.accountService.ValidateSesion(1);
  }
}
