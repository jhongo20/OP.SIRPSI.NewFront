import { Component, Inject, OnInit, Optional } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/shared/services/loading.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { GenericService } from 'src/app/shared/services/generic.service';

@Component({
  selector: 'app-routes-form',
  templateUrl: './routes-form.component.html',
  styleUrls: ['./routes-form.component.scss'],
})
export class RoutesFormComponent implements OnInit {
  public form: FormGroup;
  public option: string;
  id: number | undefined;
  type: number = this.data.type;
  title: string = 'Registrar rutas';
  quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ align: [] }],
        ['link'],
      ],
    },
  };
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private genericService: GenericService,
    private loadingService: LoadingService,
    @Optional() public dialogRef: MatDialogRef<RoutesFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Id: '',
      Nombre: ['', Validators.required],
      Descripcion: '',
      Ruta: ['', Validators.required],
      TieneHijos: [false, Validators.required],
      TieneMensaje: false,
      Mensaje: '',
    });
    if (this.data.item != null) this.onLoadData();
  }

  onSave() {
    console.log(this.form.value);
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .Post('modulos/RegistrarModulos', this.form.value)
      .subscribe({
        next: (data) => {
          this.dialogRef.close();
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 400);
          Swal.fire({
            icon: 'success',
            title: 'Ruta registrado, exitosamente.',
            showConfirmButton: false,
            timer: 2800,
          }).then(() => window.location.reload());
        },
        error: (error) => {
          this.loadingService.ChangeStatusLoading(false);
          console.log('error usuario' + error.error.message);
          Swal.fire({
            icon: 'warning',
            title: 'Ha ocurrido un error! ' + error.error.message,
            showConfirmButton: false,
            timer: 2800,
          });
        },
      });
  }

  onUpdate() {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .Put('modulos/ActualizarModulos', this.form.value)
      .subscribe({
        next: (data) => {
          this.dialogRef.close();
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 400);
          Swal.fire({
            icon: 'success',
            title: 'Ruta actualizada exitosamente.',
            showConfirmButton: false,
            timer: 1200,
          }).then(() => window.location.reload());
        },
        error: (error) => {
          this.loadingService.ChangeStatusLoading(false);
          console.log('error usuario' + error.error.message);
          Swal.fire({
            icon: 'warning',
            title: 'Ha ocurrido un error! ' + error.error.message,
            showConfirmButton: false,
            timer: 2800,
          });
        },
      });
  }

  cancelForm() {
    this.dialogRef.close();
  }

  onLoadData() {
    console.log(this.data.item);
    this.title = 'Actualizar rutas';
    this.form.controls['Id'].setValue(this.data.item.id);
    this.form.controls['Nombre'].setValue(this.data.item.nombre);
    this.form.controls['Descripcion'].setValue(this.data.item.descripcion);
    this.form.controls['Ruta'].setValue(this.data.item.ruta);
    this.form.controls['TieneHijos'].setValue(this.data.item.tieneHijos);
    this.form.controls['TieneHijos'].setValue(this.data.item.tieneHijos);
    this.form.controls['TieneMensaje'].setValue(this.data.item.tieneMensaje);
    this.form.controls['Mensaje'].setValue(this.data.item.mensaje);
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
  }
}
