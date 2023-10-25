import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportsEnum } from 'src/app/core/enums/reports';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-worker-management-consultation',
  templateUrl: './worker-management-consultation.component.html',
  styleUrls: ['./worker-management-consultation.component.scss'],
})
export class WorkerManagementConsultationComponent implements OnInit {
  listReportsRole: any;
  report: any = null;
  viewReport: number = 0;
  public form: FormGroup;
  constructor(
    private genericService: GenericService,
    private loadingService: LoadingService,
    private accountService: AccountService,
    public formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Reporte: ['', Validators.required],
    });
    this.getListas();
  }
  getListas() {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .GetAll(
        'reportes/ConsultarTiposReportesRole?role=' +
          this.accountService.userData.roleId
      )
      .subscribe((data: any) => {
        this.listReportsRole = data;
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
      });
  }
  selectedCompanie(event: any) {
    this.report = event;
    this.viewReport = 0;
    switch (event.reporteId) {
      case environment.reportes.historialRetirosReintegrosTrabajadores: {
        this.viewReport = ReportsEnum.HistorialRetirosReintegrosTrabajadores;
        break;
      }
      case environment.reportes.historialRetirosReintegros: {
        this.viewReport = ReportsEnum.HistorialRetirosReintegros;
        break;
      }
      default: {
        this.viewReport = ReportsEnum.Seleccione;
        break;
      }
    }
  }
  cancelar(event: any) {
    if (event) {
      this.report = null;
      this.form.reset();
    }
  }
}
