import { Component, OnInit, Input } from '@angular/core';
import { ExportService } from 'src/app/shared/services/export.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-factors-risk-extra-work-questionnaire',
  templateUrl: './factors-risk-extra-work-questionnaire.component.html',
  styleUrls: ['./factors-risk-extra-work-questionnaire.component.scss']
})
export class FactorsRiskExtraWorkQuestionnaireComponent implements OnInit
{
  @Input('user') user: any;
  @Input('userRegister') userRegister: any;
  @Input('evaluacion') evaluacion: any;
  public cuestionarioList: any;

  constructor(
    private genericService: GenericService,
    private loadingService: LoadingService,
    public exportService: ExportService
  ) {}

  ngOnInit(): void {
    this.getListas();
  }

  getListas() {
    this.genericService
      .GetAll(
        `Preguntas/ConsultarBrutoDominio?IdEvaluacion=${this.evaluacion.id}&formaId=A4`
      )
      .subscribe((data: any) => {
        this.cuestionarioList = data.contadorPorDominio;
        console.log(this.cuestionarioList);
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
      });
  }

  downloadReportQuestionnaire() {
    this.loadingService.ChangeStatusLoading(true);
    const html = document.getElementById('formulario');
    this.exportService.DownloadPdfFromHTML(html, "Cuestionario Factores Extralaborales");
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
  }
}