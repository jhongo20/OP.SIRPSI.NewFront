import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bulk-user-assignmen-form',
  templateUrl: './bulk-user-assignmen-form.component.html',
  styleUrls: ['./bulk-user-assignmen-form.component.scss'],
})
export class BulkUserAssignmenFormComponent implements OnInit {
  public form: FormGroup;
  public workCenter: any = null;
  listWorkCenters: any;
  listUsersCompany: any = [];
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private genericService: GenericService,
    private loadingService: LoadingService,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.getListas();
    this.form = this.formBuilder.group({
      IdTypeDocument: ['', Validators.required],
    });
  }
  getListas() {
    this.genericService
      .GetAll(
        'userWorkPlace/ConsultarCentroDeTrabajoUsuario?user=' +
          this.accountService.userData.id
      )
      .subscribe((data: any) => {
        this.listWorkCenters = data;
        this.getUsers();
      });
  }
  getUsers() {
    this.genericService
      .GetAll(
        'usuario/ConsultarUsuariosEmpresaSinCentro?role=' +
          environment.trabajadorRole
      )
      .subscribe((data: any) => {
        this.listUsersCompany = data;
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
      });
  }
  selectedWorkCenter(workCenter: any) {
    this.workCenter = workCenter;
  }
  AssignUser(user: any) {
    this.loadingService.ChangeStatusLoading(true);
    var body = {
      Workplace: this.workCenter.id,
      User: user.id,
    };
    this.genericService
      .Post('userWorkPlace/RegistrarCentroDeTrabajoUsuario', body)
      .subscribe({
        next: (data) => {
          this.openSnackBar('Usuario asignado exitosamente');
          this.getUsers();
        },
        error: (error) => {
          this.openSnackBar('Ha ocurrido un error! ' + error.error.message);
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
        },
      });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
}
