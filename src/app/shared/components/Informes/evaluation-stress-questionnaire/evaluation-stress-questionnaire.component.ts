import { Component, OnInit, Input } from '@angular/core';
import { jsPDF } from 'jspdf';
import { ExportService } from 'src/app/shared/services/export.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-evaluation-stress-questionnaire',
  templateUrl: './evaluation-stress-questionnaire.component.html',
  styleUrls: ['./evaluation-stress-questionnaire.component.scss'],
})
export class EvaluationStressQuestionnaireComponent implements OnInit {
  @Input('user') user: any;
  @Input('userRegister') userRegister: any;
  @Input('evaluacion') evaluacion: any;
  @Input('clasificacion') clasificacion: any;
  public cuestionarioList: any;
  public totalQuest: number = 0;

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
        this.totalQuest =
          (this.cuestionarioList
            .map((item: any) => item.sumaRespuestas)
            .reduce((prev: number, curr: number) => prev + curr, 0) /
            124) *
          100;
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
      });
  }

  downloadReportQuestionnaire() {
    const pages = document.querySelector('#formulario') as HTMLElement;
    this.loadingService.ChangeStatusLoading(true);
    this.exportService.exportAllToPDF(pages, 'Cuestionario Estrés');
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
  }
}
