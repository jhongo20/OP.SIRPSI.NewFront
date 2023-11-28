import { Component, OnInit, Input } from '@angular/core';
import { ExportService } from 'src/app/shared/services/export.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-results-intra-work-factors-questionnaire',
  templateUrl: './results-intra-work-factors-questionnaire.component.html',
  styleUrls: ['./results-intra-work-factors-questionnaire.component.scss'],
})
export class ResultsIntraWorkFactorsQuestionnaireComponent implements OnInit
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
        `Preguntas/ConsultarBrutoDominio?IdEvaluacion=${this.evaluacion.id}&formaId=A1`
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
    this.exportService.DownloadPdfFromHTML(html, "Cuestionario de Factores de Riesgo - Forma A");
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
  }
}
