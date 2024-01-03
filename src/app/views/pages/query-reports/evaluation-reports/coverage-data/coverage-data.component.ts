import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account.service';
import { ExportService } from 'src/app/shared/services/export.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-coverage-data',
  templateUrl: './coverage-data.component.html',
  styleUrls: ['./coverage-data.component.scss'],
})
export class CoverageDataComponent implements OnInit {
  constructor(
    private genericService: GenericService,
    private loadingService: LoadingService,
    public exportService: ExportService,
    public accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.getListas();
  }

  getListas() {
    this.genericService
      .GetAll(
        `reportes/ConsultarDatosCobertura?IdCompany=${this.accountService.userData.empresaId}`
      )
      .subscribe((data: any) => {
        console.log(data);
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
      });
  }
}
