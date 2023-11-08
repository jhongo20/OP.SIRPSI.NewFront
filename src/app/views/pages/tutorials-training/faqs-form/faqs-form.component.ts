import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-faqs-form',
  templateUrl: './faqs-form.component.html',
  styleUrls: ['./faqs-form.component.scss'],
})
export class FaqsFormComponent implements OnInit {
  public form: FormGroup;
  hide = true;
  estadosList: any;
  categoriasList: any;
  quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['code-block'],
        //  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        //  [{ 'direction': 'rtl' }],                         // text direction

        //  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ align: [] }],

        //  ['clean'],                                         // remove formatting button

        //  ['link'],
        ['link', 'image', 'video'],
      ],
    },
  };
  constructor(
    public formBuilder: FormBuilder,
    public accountService: AccountService,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private genericService: GenericService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      // Id: '',
      Titulo: ['', Validators.required],
      Contenido: ['', Validators.required],
      IdCategoria: '',
      IdEstado: [environment.activoEstado, Validators.required],
    });
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
              this.openSnackBar(error.error.message);
              this.loadingService.ChangeStatusLoading(false);
            },
          });
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
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
