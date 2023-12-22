import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ExportService } from 'src/app/shared/services/export.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-consolidated-result-factors-risk-form-b',
  templateUrl: './consolidated-result-factors-risk-form-b.component.html',
  styleUrls: ['./consolidated-result-factors-risk-form-b.component.scss'],
})
export class ConsolidatedResultFactorsRiskFormBComponent implements OnInit {
  @ViewChild('formulario', { static: false }) el!: ElementRef;
  @Input('evaluacion') evaluacion: any;
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
        `reportes/ConsultarResultadoEvaluacion?IdEvaluacion=${this.evaluacion}&formaId=A2`
      )
      .subscribe((data: any) => {
        this.cuestionarioList = data.contadorPorDominio;
        this.totalQuest =
          (this.cuestionarioList
            .map((item: any) => item.sumaRespuestas)
            .reduce((prev: number, curr: number) => prev + curr, 0) /
            388) *
          100;
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
      });
  }

  downloadReportQuestionnaire() {
    const pages = document.querySelector('#formulario') as HTMLElement;
    this.loadingService.ChangeStatusLoading(true);
    this.exportService.exportAllToPDF(
      pages,
      'Resultado Consolidado de Factores de Riesgo - Forma B'
    );
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
  }
}
