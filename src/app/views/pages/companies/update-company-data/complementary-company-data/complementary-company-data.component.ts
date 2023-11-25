import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-complementary-company-data',
  templateUrl: './complementary-company-data.component.html',
  styleUrls: ['./complementary-company-data.component.scss'],
})
export class ComplementaryCompanyDataComponent implements OnInit {
  public form: FormGroup;
  @Input('company') company: any = null;
  @Input('type') type: number;
  public listClaseRiesgo: any;
  public listSectorEconomico: any;

  constructor(
    public genericService: GenericService,
    private router: Router,
    private accountService: AccountService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getListas();
    this.form = this.formBuilder.group({
      Id: this.company.id,
      NumeroTrabajadores: ['', Validators.required],
      ClaseRiesgo: ['', Validators.required],
      IdSectorEconomico: ['', Validators.required],
    });
    this.loadDataCompany(this.company);
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
          .Put(
            'empresas/ActualizarDatosComplementariosEmpresa',
            this.form.value
          )
          .subscribe({
            next: (data) => {
              this.loadingService.ChangeStatusLoading(false);
              Swal.fire({
                icon: 'success',
                title: 'Empresa, Actualizada exitosamente.',
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
    this.listClaseRiesgo = [
      { id: '1', nombre: '1' },
      { id: '2', nombre: '2' },
      { id: '3', nombre: '3' },
      { id: '4', nombre: '4' },
      { id: '5', nombre: '5' },
    ];
    this.genericService
      .GetAll('sectoresEconomicos/ConsultarSectoresEconomicos')
      .subscribe((data: any) => {
        this.listSectorEconomico = data;
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 1100);
      });
  }

  loadDataCompany(event: any) {
    if (event != null && event != undefined) {
      this.form.controls['NumeroTrabajadores'].setValue(
        event.numeroTrabajadores
      );
      this.form.controls['ClaseRiesgo'].setValue(event.claseRiesgo);
      this.form.controls['IdSectorEconomico'].setValue(event.idSectorEconomico);
    }
  }
}
