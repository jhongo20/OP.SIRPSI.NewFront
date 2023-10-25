import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { SelectRoleService } from '../../services/select-role.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformationComponent implements OnInit {
  constructor(
    public accountService: AccountService,
    public roleService: SelectRoleService
  ) {}
  ngOnInit(): void {}
}
