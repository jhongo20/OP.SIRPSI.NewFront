import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesEnum } from 'src/app/core/enums/Roles';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-link-unlink-users',
  templateUrl: './link-unlink-users.component.html',
  styleUrls: ['./link-unlink-users.component.scss'],
})
export class LinkUnlinkUsersComponent implements OnInit {
  public form: FormGroup;
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
    this.title =
      'Vincular | Desvincular ' +
      (this.router.url == '/work-centers/link-unlink-worker'
        ? 'Trabajadores'
        : 'Psicólogo Especialista SST') +
      ' a Centro de Trabajo';
    this.form = this.formBuilder.group({
      IdTypeDocument: ['', Validators.required],
      Document: ['', Validators.required],
      // ExpeditionDate: ['', Validators.required],
      IdCountry: ['', Validators.required],
    });
    this.loadingService.ChangeStatusLoading(false);
  }
  onSave() {}
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
        this.form.reset();
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
}
