import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
  Renderer2,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { SelectRoleService } from 'src/app/shared/services/select-role.service';
import { AccountService } from 'src/app/shared/services/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public enableSesion: boolean = false;
  public menuSettings: any = {
    Dashboard: false,
    Roles: false,
    Routes: false,
    RoutesRole: false,
    Configuration: false,
    MinisterioUno: false,
    Ministerio: false,
    WorkCenters: false,
    Countries: false,
  };
  constructor(
    public accountService: AccountService,
    public roleService: SelectRoleService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngOnInit(): void {}

  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  onLogout(e: Event) {
    this.accountService.CloseUserSession();
  }
  updateDataPersonal() {
    var messageInfo =
      '<p class="texto-mensaje">Estimado/a Usuario/a, en este módulo, el usuario Administrador SIRPSI de la Empresa puede actualizar el correo electrónico y datos de contacto. Solo este usuario tiene los privilegios para actualizar sus propios datos y los del usuario Psicólogo Especialista  SST en el módulo respectivo.  La actualización  de los datos del usuario Trabajador está a cargo únicamente del usuario Psicólogo Especialista SST. El sistema permite asociar un mismo correo electrónico a otros roles que se le asignen al usuario como Trabajador, Psicólogo Especialista SST o Administrador SIRPSI de la Empresa, en una o varias empresas registradas en el sistema, si se requiere .” Para aprender más sobre este proceso puede consultar  el material de capacitación  disponible en el siguiente enlace  <a href="#">material de capacitación</a>.</p>';
    Swal.fire({
      icon: 'info',
      title: 'Estimado(a) usuario(a)',
      html: messageInfo,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['profile/change-data']);
      }
    });
  }
}
