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
  selector: 'app-summon-workers',
  templateUrl: './summon-workers.component.html',
  styleUrls: ['./summon-workers.component.scss'],
})
export class SummonWorkersComponent implements OnInit {
  public formInitial: FormGroup;
  listWorkCenterUser: any;
  listEvaluation: any;
  countListUsers: number = 0;
  listUsersSelected: any = [];
  viewTable = false;
  workCenterSelected = '';
  public filter: string = '';
  public table: string = '';
  public columns = [
    { name: 'Tipo documento', data: 'tipoDocumento', property: 'nombre' },
    { name: 'Cédula', data: 'cedula' },
    // { name: 'Correo', data: 'correo' },
    // { name: 'Teléfono', data: 'telefono' },
    // { name: 'Empresa', data: 'empresa', property: 'nombre' },
    // { name: 'Rol', data: 'role', property: 'name' },
    { name: 'Nombre', data: 'nombreUsuario' },
    { name: 'Apellidos', data: 'apellidosUsuario' },
    { name: 'Estado', data: 'estado', property: 'nombre' },
  ];
  public options = [
    {
      delete: false,
      edit: false,
      details: false,
      select: false,
      state: false,
      pdf: false,
      validationSelect: false,
      check: true,
    },
  ];
  public title: string = '';
  tab: number = 0;
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private genericService: GenericService,
    private loadingService: LoadingService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadingService.ChangeStatusLoading(true);
    this.getListas();
    this.title = 'hola';
    this.formInitial = this.formBuilder.group({
      IdCentroTrabajo: ['', Validators.required],
      FechaInicio: ['', Validators.required],
    });
  }
  onSave() {
    Swal.fire({
      title: '¿Estas seguro?',
      text: '¿Está seguro de convocar al(os) usuario(s) seleccionado(s)?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingService.ChangeStatusLoading(true);
        for (let i = 0; i < this.countListUsers; i++) {
          var body = {
            IdCentroTrabajo: this.formInitial.value.IdCentroTrabajo,
            IdUsuario: this.listUsersSelected[i].id,
            FechaInicio: this.formInitial.value.FechaInicio,
          };
          this.summonWorkers(body, i);
        }
      }
    });
  }
  summonWorkers(body: any, i: any) {
    this.genericService
      .Post('evaluacionPsicosocial/RegistrarEvaluacion', body)
      .subscribe({
        next: (data) => {
          if (this.countListUsers == i + 1) {
            Swal.fire({
              icon: 'success',
              title: 'Se ha convocado al(los) usuarios(s) seleccionado(s)',
              showConfirmButton: false,
              timer: 1200,
            }).then(() => window.location.reload());
            setTimeout(
              () => this.loadingService.ChangeStatusLoading(false),
              600
            );
          }
        },
        error: (error) => {
          console.error(error.error.message);
          this.openSnackBar(error.error.message);
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
        },
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
      }
    });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
  selectedTab(type: number) {
    console.log(type);
    this.tab = type;
  }

  getListas() {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .GetAll(
        'userWorkPlace/ConsultarCentroDeTrabajoUsuario?user=' +
          this.accountService.userData.id
      )
      .subscribe((data: any) => {
        this.listWorkCenterUser = data;
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
      });
  }
  selectedWorkCenter(event: any) {
    // this.loadingService.ChangeStatusLoading(true);
  }
  selectedRow(event: any) {
    if (this.countListUsers == 0) {
      this.listUsersSelected.push(event);
      this.countListUsers++;
    } else {
      var exist = this.listUsersSelected.filter(
        (data: any) => data == event
      ).length;
      if (exist == 0) {
        this.listUsersSelected.push(event);
        this.countListUsers++;
      } else {
        this.listUsersSelected = this.listUsersSelected.filter(
          (data: any) => data != event
        );
        this.countListUsers--;
      }
    }
    console.log(this.listUsersSelected, this.countListUsers);
  }
  searchWorkers() {
    this.loadingService.ChangeStatusLoading(true);
    this.viewTable = false;
    setInterval(() => {
      this.workCenterSelected = '';
      this.table = '';
      this.filter = '';
      this.workCenterSelected = this.formInitial.value.IdCentroTrabajo;
      this.table = 'evaluacionPsicosocial/ConsultarUsuariosCentroDeTrabajo';
      this.filter = '&workCenter=' + this.workCenterSelected + '&type=1';
      this.viewTable = true;
    }, 1400);
  }
}
