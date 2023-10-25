import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { RolesFormComponent } from './roles-form/roles-form.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  id: string | undefined;
  public seleted: number;
  public selectedRoom: any = null;
  // public filter: string = '&Usuario=' + this.accountService.userData.id;
  public table: string = 'roles/ConsultarRoles';
  public columns = [
    { name: 'Id', data: 'id' },
    { name: 'Nombre', data: 'name' },
    { name: 'Descripción', data: 'description' },
    { name: 'Estado', data: 'estado', property: 'nombre' },
    { name: 'F. Registro', data: 'registrationDate', pipeDate: 'YYYY/dd/MM' },
  ];
  public options = [
    // {
    //   delete: true,
    //   edit: true,
    //   details: true,
    //   select: true,
    //   state: true,
    //   pdf: true,
    //   validationSelect: true,
    // },
  ];

  constructor(
    public genericService: GenericService,
    private router: Router,
    private accountService: AccountService,
    private loadingService: LoadingService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
  }

  OpenFormDialog(id: number) {
    this.router.navigate(['/reservation/form/' + id + '/' + 'view']);
  }
  DownloadPDF(id: number) {
    this.router.navigate(['/reservation/form/' + id + '/' + 'download']);
  }
  SelectReservation(id: any) {
    this.genericService
      .GetAll('BookingPersons?PageNumber=1&PageSize=100000&Reserva=' + id)
      .subscribe((data: any) => {
        // this.dataTable = data.data;
      });
  }
  openFormDialogUser() {
    const dialogRef = this.dialog.open(RolesFormComponent, {
      data: { id: this.id, type: 0, reload: true },
    });
    dialogRef.afterClosed().subscribe();
  }
}
