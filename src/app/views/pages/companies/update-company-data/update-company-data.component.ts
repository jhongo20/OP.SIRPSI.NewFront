import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-update-company-data',
  templateUrl: './update-company-data.component.html',
  styleUrls: ['./update-company-data.component.scss'],
})
export class UpdateCompanyDataComponent implements OnInit {
  listCompaniesUser: any;
  company: any = null;
  public form: FormGroup;
  constructor(
    private genericService: GenericService,
    private loadingService: LoadingService,
    private accountService: AccountService,
    public formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Company: ['', Validators.required],
    });
    this.getListas();
  }
  getListas() {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .GetAll(
        'empresas/ConsultarEmpresasUsuario?user=' +
          this.accountService.userData.id
      )
      .subscribe((data: any) => {
        this.listCompaniesUser = data;
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
      });
  }
  selectedCompanie(event: any) {
    this.company = event;
  }
  cancelar(event: any) {
    if (event) {
      this.company = null;
      this.form.reset();
    }
  }
}
