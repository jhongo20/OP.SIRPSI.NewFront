import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { getService } from 'src/app/shared/services/get.services';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-occupational-license',
  templateUrl: './occupational-license.component.html',
  styleUrls: ['./occupational-license.component.scss'],
})
export class OccupationalLicenseComponent implements OnInit {
  public form: FormGroup;
  public colSize: string = 'col-md-3';
  countErrorPassword: number = 0;
  hide = true;
  listDepartament: any;
  listCity: any;
  constructor(
    public formBuilder: FormBuilder,
    public accountService: AccountService,
    private message: NzMessageService,
    private loadingService: LoadingService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private servicio: getService,
    private genericService: GenericService,
    @Optional() public dialogRef: MatDialogRef<OccupationalLicenseComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.colSize = this.data != null ? 'col-md-12 mb-2' : 'col-md-3';
    this.form = this.formBuilder.group({
      Id: '',
      Numero: ['', Validators.required],
      FechaExpedicion: ['', Validators.required],
      Titulo: ['', Validators.required],
      Entidad: ['', Validators.required],
      IdDepartamento: ['', Validators.required],
      IdMunicipio: ['', Validators.required],
      UsuarioId: this.data.item.id,
    });
    this.onGetDepartment(environment.urlApiColombia + 'Department');
    this.onLoadData(this.data.item.licenciaOcupacional);
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 800);
  }

  GetInto() {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .Post(
        'licenciaOcupacional/ActualizarLicenciaOcupacional',
        this.form.value
      )
      .subscribe(
        (result: any) => {
          this.message.success(result.message, { nzDuration: 4000 });
          Swal.fire({
            icon: 'success',
            title: result.message,
            showConfirmButton: false,
          }).then(() => window.location.reload());
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 800);
        },
        (error) => {
          console.error(error);
          this.message.error(error.error.message, { nzDuration: 4000 });
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 800);
        }
      );
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
        if (this.data.type != 1) this.form.reset();
        else this.dialogRef.close();
      }
    });
  }

  onGetDepartment(url: string) {
    this.servicio.obtenerDatos(url).subscribe((data) => {
      this.listDepartament = data.sort((x: any, y: any) =>
        x.name.localeCompare(y.name)
      );
    });
  }

  onGetCity(url: any) {
    this.listCity = [];
    this.form.value.PlaceBirthCity = '';
    if (url.IdDepartamento == null) return;
    this.servicio
      .obtenerDatos(
        environment.urlApiColombia + `Department/${url.IdDepartamento}/cities`
      )
      .subscribe((data) => {
        this.listCity = data.sort((x: any, y: any) =>
          x.name.localeCompare(y.name)
        );
      });
  }

  onLoadData(data: any) {
    if (data != null) {
      this.form.controls['Id'].setValue(data.id);
      this.form.controls['Numero'].setValue(data.numero);
      this.form.controls['FechaExpedicion'].setValue(
        data.fechaExpedicion.split('T')[0]
      );
      this.form.controls['Titulo'].setValue(data.titulo);
      this.form.controls['Entidad'].setValue(data.entidad);
      this.form.controls['IdDepartamento'].setValue(data.idDepartamento);
      this.form.controls['IdMunicipio'].setValue(data.idMunicipio);
    }
  }
}
