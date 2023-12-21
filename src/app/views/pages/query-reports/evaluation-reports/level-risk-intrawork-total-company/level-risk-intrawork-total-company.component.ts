import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-level-risk-intrawork-total-company',
  templateUrl: './level-risk-intrawork-total-company.component.html',
  styleUrls: ['./level-risk-intrawork-total-company.component.scss'],
})
export class LevelRiskIntraworkTotalCompanyComponent implements OnInit {
  public form: FormGroup;
  public option: string;
  defaultNavActiveId = 1;
  public user: any;
  public userRegister: any;
  listEvaluaciones: any = [];
  evaluation: any = undefined;
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private genericService: GenericService,
    private loadingService: LoadingService,
    public accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Evaluacion: ['', Validators.required],
    });
    this.getLists();
  }

  cancelarForm() {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'no podras revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        // this.formInitial.reset();
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }

  getLists() {
    this.genericService
      .GetAll(`evaluacionPsicosocial/ConsultaRadicadoFinalEvaluacion`)
      .subscribe((data: any) => {
        this.listEvaluaciones = data;
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
      });
  }

  selectEvaluation(event: any) {
    console.log(event);
    this.evaluation = event != undefined ? event.id : undefined;
  }
}
