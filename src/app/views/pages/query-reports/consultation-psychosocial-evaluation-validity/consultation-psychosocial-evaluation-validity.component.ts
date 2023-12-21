import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportsEnum, ReportsEvaluationEnum } from 'src/app/core/enums/reports';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-consultation-psychosocial-evaluation-validity',
  templateUrl: './consultation-psychosocial-evaluation-validity.component.html',
  styleUrls: ['./consultation-psychosocial-evaluation-validity.component.scss'],
})
export class ConsultationPsychosocialEvaluationValidityComponent
  implements OnInit
{
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
        `reportes/ConsultarTiposReportesRole?role=${this.accountService.userData.roleId}&type=1`
      )
      .subscribe((data: any) => {
        this.listReportsRole = data;
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
      });
  }
  selectedReport(event: any) {
    this.report = event;
    this.viewReport = 0;
    switch (event.reporteId) {
      case environment.reportes.respuestasEvaluacionesPsicosociales: {
        this.viewReport =
          ReportsEvaluationEnum.RespuestasEvaluacionesPsicosociales;
        break;
      }
      case environment.reportes.nivelRiesgoIntralaboralTotalEmpresa: {
        this.viewReport =
          ReportsEvaluationEnum.NivelRiesgoIntralaboralTotalEmpresa;
        break;
      }
      default: {
        this.viewReport = ReportsEvaluationEnum.Seleccione;
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
