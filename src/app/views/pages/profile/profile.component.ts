import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private genericService: GenericService,
    private loadingService: LoadingService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
  }
}
