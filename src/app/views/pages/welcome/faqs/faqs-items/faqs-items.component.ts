import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-faqs-items',
  templateUrl: './faqs-items.component.html',
  styleUrls: ['./faqs-items.component.scss'],
})
export class FaqsItemsComponent implements OnInit {
  public form: FormGroup;
  hide = true;
  estadosList: any;
  faqsList: any;
  @Input('list') list: any = [];
  constructor(
    public formBuilder: FormBuilder,
    public accountService: AccountService,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private genericService: GenericService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getListas();
  }

  onRedirectFaqs(id: any) {
    this.router.navigate(['welcome/faqs/items/' + id]);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
  getListas() {
    const id: any = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadingService.ChangeStatusLoading(true);
    this.genericService.GetAll('faqs/ConsultarFaqs').subscribe((data: any) => {
      this.faqsList = data;
      console.log(data);
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
      if (result.isConfirmed) {
        this.router.navigate(['tutorials-training/faqs']);
      }
    });
  }
}
