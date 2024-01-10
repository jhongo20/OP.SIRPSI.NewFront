import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss'],
})
export class CategoriesFormComponent implements OnInit {
  public form: FormGroup;
  public option: string;
  listRoles: any;
  listTypes: any;
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private genericService: GenericService,
    private loadingService: LoadingService,
    private accountService: AccountService,
    private message: NzMessageService
  ) { }
  ngOnInit(): void {
    this.getListas();
    this.form = this.formBuilder.group({
      Nombre: ['', Validators.required],
      Tipo: '',
      IdRol: [],
    });
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
          .Post('categorias/RegistrarCategorias', this.form.value)
          .subscribe({
            next: (data) => {
              this.loadingService.ChangeStatusLoading(false);
              Swal.fire({
                icon: 'success',
                title: 'La categoría fue registrada exitosamente.',
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
    this.listTypes = [
      { id: 1, name: 'FAQS' },
      { id: 2, name: 'Material de capacitación' },
    ];
    this.genericService
      .GetAll('roles/ConsultarRoles')
      .subscribe((data: any) => {
        this.listRoles = data;
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
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
      if (result.isConfirmed) this.form.reset();
    });
  }
}
