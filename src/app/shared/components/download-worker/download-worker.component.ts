import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { GenericService } from '../../services/generic.service';
import { LoadingService } from '../../services/loading.service';
import { AccountService } from '../../services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-download-worker',
  templateUrl: './download-worker.component.html',
  styleUrls: ['./download-worker.component.scss'],
})
export class DownloadWorkerComponent implements OnInit {
  public option: string;
  defaultNavActiveId = 1;
  public user: any;
  public userRegister: any;

  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private genericService: GenericService,
    private loadingService: LoadingService,
    public accountService: AccountService,
    private snackBar: MatSnackBar,
    @Optional() public dialogRef: MatDialogRef<DownloadWorkerComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.defaultNavActiveId = this.data.info.forma == 'Grupo Forma A' ? 1 : 2;
    this.user = this.data.info.usuario;
    this.userRegister = this.data.info.usuarioRegistra;
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
        // this.formInitial.reset();
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
}
