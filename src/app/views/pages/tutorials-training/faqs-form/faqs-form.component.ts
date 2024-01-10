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
  selector: 'app-faqs-form',
  templateUrl: './faqs-form.component.html',
  styleUrls: ['./faqs-form.component.scss'],
})
export class FaqsFormComponent implements OnInit {
  public form: FormGroup;
  hide = true;
  estadosList: any;
  categoriasList: any;
  public id: string | null = this.activatedRoute.snapshot.paramMap.get('id');
  public title: string = 'Registrar preguntas frecuentes - FAQs';
  quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ align: [] }],
        ['link', 'image', 'video'],
      ],
    },
  };
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
    this.form = this.formBuilder.group({
      Id: '',
      Titulo: ['', Validators.required],
      Contenido: ['', Validators.required],
      IdCategoria: '',
      IdEstado: [environment.activoEstado, Validators.required],
    });
    if (this.id != null) this.onLoadData();
    this.getListas();
  }

  onSave() {
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
              }).then(() => this.router.navigate(['tutorials-training/faqs']));
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

  onUpdate() {
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
          .Put('faqs/ActualizarFaqs', this.form.value)
          .subscribe({
            next: (data) => {
              this.loadingService.ChangeStatusLoading(false);
              Swal.fire({
                icon: 'success',
                title:
                  'La pregunta frecuente (FAQS) fue actualizada exitosamente.',
                showConfirmButton: false,
                timer: 1500,
              }).then(() => this.router.navigate(['tutorials-training/faqs']));
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

  onLoadData() {
    this.title = 'Actualizar preguntas frecuentes - FAQs';
    this.genericService
      .GetAll('faqs/ConsultarFaq?id=' + this.id)
      .subscribe((data: any) => {
        this.form.controls['Id'].setValue(data.id);
        this.form.controls['Titulo'].setValue(data.titulo);
        this.form.controls['Contenido'].setValue(data.contenido);
        this.form.controls['IdCategoria'].setValue(data.idCategoria);
        this.form.controls['IdEstado'].setValue(data.idEstado);
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
      });
  }
}
