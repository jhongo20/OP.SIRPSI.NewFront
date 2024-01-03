import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ExportService } from 'src/app/shared/services/export.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-consolidated-result-stress',
  templateUrl: './consolidated-result-stress.component.html',
  styleUrls: ['./consolidated-result-stress.component.scss'],
})
export class ConsolidatedResultStressComponent implements OnInit {
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
        `reportes/ConsultarResultadoEvaluacion?IdEvaluacion=${this.evaluacion}&formaId=A4&division=492`
      )
      .subscribe((data: any) => {
        this.cuestionarioList = data.contadorPorDominio;
        this.totalQuest = data.resultadoTransformado;
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
      });
  }

  downloadReportQuestionnaire() {
    const pages = document.querySelector('#formulario') as HTMLElement;
    this.loadingService.ChangeStatusLoading(true);
    this.exportService.exportAllToPDF(
      pages,
      'Resultado Consolidado de Factores de Riesgo - Forma A'
    );
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
  }
}
