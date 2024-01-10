import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tutorials-training',
  templateUrl: './tutorials-training.component.html',
  styleUrls: ['./tutorials-training.component.scss'],
})
export class TutorialsTrainingComponent implements OnInit {
  public form: FormGroup;
  hide = true;
  estadosList: any;
  categoriasList: any;
  constructor(
    public formBuilder: FormBuilder,
    public accountService: AccountService,
    private message: NzMessageService,
    private loadingService: LoadingService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private genericService: GenericService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getListas();
  }

  onSave() {
    console.log(this.form.value);
    Swal.fire({
      title: '¿Estas seguro?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingService.ChangeStatusLoading(true);
        this.genericService
          .Post('faqs/RegistrarFaqs', this.form.value)
          .subscribe({
            next: (data) => {
              this.loadingService.ChangeStatusLoading(false);
              Swal.fire({
                icon: 'success',
                title:
                  'La pregunta frecuente (FAQS) fue registrada exitosamente.',
                showConfirmButton: false,
                timer: 1500,
              }).then(() => window.location.reload());
            },
            error: (error) => {
              console.error(error);
              this.message.error(error.error.message, { nzDuration: 4000 });
              this.loadingService.ChangeStatusLoading(false);
            },
          });
      }
    });
  }

  getListas() {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .GetAll('estados/ConsultarEstados')
      .subscribe((data: any) => {
        this.estadosList = data;
        this.genericService
          .GetAll('categorias/ConsultarCategorias?type=1')
          .subscribe((data: any) => {
            this.categoriasList = data;
            setTimeout(
              () => this.loadingService.ChangeStatusLoading(false),
              600
            );
          });
      });
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
        this.router.navigate(['tutorials-training/faqs']);
      }
    });
  }
}
