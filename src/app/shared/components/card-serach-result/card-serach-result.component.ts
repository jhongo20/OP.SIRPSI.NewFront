import { DatePipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AccountService } from '../../services/account.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-card-serach-result',
  templateUrl: './card-serach-result.component.html',
  styleUrls: ['./card-serach-result.component.scss']
})
export class CardSerachResultComponent implements OnInit {
  @Input('image') image: string | any;
  @Input('title') title: string | any;
  @Input('text') text: string | any;
  @Input('city') city: string | any;
  @Input('price') price: number | any;
  @Input('tipo') tipo: string | any;
  @Input('description') description: string | any;
  @Input('stars') stars: number = 0;
  @Input('room') room: number = 0;
  @Input('botton') botton: boolean = true;
  @Input('state') state: number = 0;
  @Input('message') message: string = "";
  public estrellas: any[] = [0];
  constructor(public router: Router, public rutaActiva: ActivatedRoute, private datePipe: DatePipe,
    private accountService: AccountService, private loadingService: LoadingService) { }

  async ngOnInit() {
    this.loadingService.ChangeStatusLoading(true);
    this.estrellas.length = this.stars;
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
  }
  GoBooking() {
    var fechaInicio = this.datePipe.transform(this.rutaActiva.snapshot.params['fechaIni'], 'yyyy-MM-dd');
    var fechaFin = this.datePipe.transform(this.rutaActiva.snapshot.params['fechaFin'], 'yyyy-MM-dd');
    var personas = this.rutaActiva.snapshot.params['personas'];
    if (this.accountService.userData)
      this.router.navigate(['bookings/selection/' + this.room + '/' + fechaInicio + '/' + fechaFin + '/' + personas]);
    else {
      Swal.fire({
        icon: 'info',
        title: 'Debes ingresar',
        text: 'Para continuar con la reserva debes ingresar con tu cuenta. Ingresa con tu cuenta y vuelve a realizar la busqueda.',
        footer: '<a style="padding: 10px;" href="/account/login">Ingresar</a><a style="padding: 10px;" href="/account/register">Registrarse</a>'
      })
    }
  }
}
