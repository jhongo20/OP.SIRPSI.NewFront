import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2,
  Inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import MetisMenu from 'metismenujs';

import { MENU } from './menu';
import { MenuItem } from './menu.model';
import { Router, NavigationEnd } from '@angular/router';
import { SelectRoleService } from 'src/app/shared/services/select-role.service';
import { AccountService } from 'src/app/shared/services/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @ViewChild('sidebarToggler') sidebarToggler: ElementRef;

  menuItems: MenuItem[] = [];
  @ViewChild('sidebarMenu') sidebarMenu: ElementRef;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public accountService: AccountService,
    public roleService: SelectRoleService,
    public router: Router
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        /**
         * Activating the current active item dropdown
         */
        this._activateMenuDropdown();

        /**
         * closing the sidebar
         */
        if (window.matchMedia('(max-width: 991px)').matches) {
          this.document.body.classList.remove('sidebar-open');
        }
      }
    });
  }

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Main',
        isTitle: true,
        view: true,
      },
      {
        label: 'Dashboard',
        icon: 'home',
        link: '/dashboard',
        view: true,
      },
      {
        label: 'APLICACIÓN',
        isTitle: true,
        view: true,
      },
      {
        label: 'Usuarios',
        icon: 'user',
        view:
          this.accountService.userData.rutasAsignadas.filter(
            (ruta: any) => ruta.ruta == 'users'
          ).length > 0,
        subItems: [
          {
            label: 'Lista de usuarios',
            link: '/users/list-users',
            view:
              this.accountService.userData.rutasAsignadas.filter(
                (ruta: any) => ruta.ruta == 'list-users'
              ).length > 0,
          },
          {
            label: 'Usuarios por empresa',
            link: '/users/users-company',
            view:
              this.accountService.userData.rutasAsignadas.filter(
                (ruta: any) => ruta.ruta == 'users-company'
              ).length > 0,
          },
          {
            label: 'Usuarios sin centro de trabajo',
            link: '/users/users-company-not-affiliated',
            view:
              this.accountService.userData.rutasAsignadas.filter(
                (ruta: any) => ruta.ruta == 'users-company-not-affiliated'
              ).length > 0,
          },
          {
            label: 'Registrar nuevo Administrador SIRPSI',
            link: '/users/register-new-administrator',
            showMessage: true,
            message:
              'Estimado/a Usuario/a, en este módulo, el usuario Administrador SIRPSI de la Empresa puede actualizar el correo electrónico y datos de contacto. Solo este usuario tiene los privilegios para actualizar sus propios datos y los del usuario Psicólogo Especialista  SST en el módulo respectivo.  La actualización  de los datos del usuario Trabajador está a cargo únicamente del usuario Psicólogo Especialista SST. El sistema permite asociar un mismo correo electrónico a otros roles que se le asignen al usuario como Trabajador, Psicólogo Especialista SST o Administrador SIRPSI de la Empresa, en una o varias empresas registradas en el sistema, si se requiere .” Para aprender más sobre este proceso puede consultar  el material de capacitación  disponible en el siguiente enlace  <a href="#">material de capacitación</a>.',
            view:
              this.accountService.userData.rutasAsignadas.filter(
                (ruta: any) => ruta.ruta == 'register-new-administrator'
              ).length > 0,
          },
          {
            label: 'Registrar Psicólogo Especialista SST',
            link: '/users/register-new-psychologist',
            showMessage: true,
            message:
              'Estimado/a Usuario/a, en este módulo, el usuario Administrador SIRPSI de la Empresa puede actualizar el correo electrónico y datos de contacto. Solo este usuario tiene los privilegios para actualizar sus propios datos y los del usuario Psicólogo Especialista  SST en el módulo respectivo.  La actualización  de los datos del usuario Trabajador está a cargo únicamente del usuario Psicólogo Especialista SST. El sistema permite asociar un mismo correo electrónico a otros roles que se le asignen al usuario como Trabajador, Psicólogo Especialista SST o Administrador SIRPSI de la Empresa, en una o varias empresas registradas en el sistema, si se requiere .” Para aprender más sobre este proceso puede consultar  el material de capacitación  disponible en el siguiente enlace  <a href="#">material de capacitación</a>.',
            view:
              this.accountService.userData.rutasAsignadas.filter(
                (ruta: any) => ruta.ruta == 'register-new-psychologist'
              ).length > 0,
          },
          {
            label: 'Registrar Trabajador',
            link: '/users/register-new-worker',
            showMessage: true,
            message:
              'Estimado/a Usuario/a, en este módulo, el usuario Administrador SIRPSI de la Empresa puede actualizar el correo electrónico y datos de contacto. Solo este usuario tiene los privilegios para actualizar sus propios datos y los del usuario Psicólogo Especialista  SST en el módulo respectivo.  La actualización  de los datos del usuario Trabajador está a cargo únicamente del usuario Psicólogo Especialista SST. El sistema permite asociar un mismo correo electrónico a otros roles que se le asignen al usuario como Trabajador, Psicólogo Especialista SST o Administrador SIRPSI de la Empresa, en una o varias empresas registradas en el sistema, si se requiere .” Para aprender más sobre este proceso puede consultar  el material de capacitación  disponible en el siguiente enlace  <a href="#">material de capacitación</a>.',
            view:
              this.accountService.userData.rutasAsignadas.filter(
                (ruta: any) => ruta.ruta == 'register-new-worker'
              ).length > 0,
          },
          {
            label: 'Actualizar datos Psicólogo',
            link: '/users/update-psychologist-data',
            showMessage: true,
            message:
              'Estimado/a Usuario/a, en este módulo, el usuario Administrador SIRPSI de la Empresa puede actualizar el correo electrónico y datos de contacto. Solo este usuario tiene los privilegios para actualizar sus propios datos y los del usuario Psicólogo Especialista  SST en el módulo respectivo.  La actualización  de los datos del usuario Trabajador está a cargo únicamente del usuario Psicólogo Especialista SST. El sistema permite asociar un mismo correo electrónico a otros roles que se le asignen al usuario como Trabajador, Psicólogo Especialista SST o Administrador SIRPSI de la Empresa, en una o varias empresas registradas en el sistema, si se requiere .” Para aprender más sobre este proceso puede consultar  el material de capacitación  disponible en el siguiente enlace  <a href="#">material de capacitación</a>.',
            view:
              this.accountService.userData.rutasAsignadas.filter(
                (ruta: any) => ruta.ruta == 'update-psychologist-data'
              ).length > 0,
          },
          {
            label: 'Actualizar datos del Trabajador',
            link: '/users/update-worker-data',
            showMessage: true,
            message:
              'Estimado/a Usuario/a, en este módulo, el usuario Administrador SIRPSI de la Empresa puede actualizar el correo electrónico y datos de contacto. Solo este usuario tiene los privilegios para actualizar sus propios datos y los del usuario Psicólogo Especialista  SST en el módulo respectivo.  La actualización  de los datos del usuario Trabajador está a cargo únicamente del usuario Psicólogo Especialista SST. El sistema permite asociar un mismo correo electrónico a otros roles que se le asignen al usuario como Trabajador, Psicólogo Especialista SST o Administrador SIRPSI de la Empresa, en una o varias empresas registradas en el sistema, si se requiere .” Para aprender más sobre este proceso puede consultar  el material de capacitación  disponible en el siguiente enlace  <a href="#">material de capacitación</a>.',
            view:
              this.accountService.userData.rutasAsignadas.filter(
                (ruta: any) => ruta.ruta == 'update-worker-data'
              ).length > 0,
          },
        ],
      },
      {
        label: 'Empresas',
        icon: 'briefcase',
        view:
          this.accountService.userData.rutasAsignadas.filter(
            (ruta: any) => ruta.ruta == 'companies'
          ).length > 0,
        subItems: [
          {
            label: 'Lista de empresas',
            link: '/companies/list-companies',
            view:
              this.accountService.userData.rutasAsignadas.filter(
                (ruta: any) => ruta.ruta == 'list-companies'
              ).length > 0,
          },
          {
            label: 'Mis empresas',
            link: '/companies/companies-user',
            view:
              this.accountService.userData.rutasAsignadas.filter(
                (ruta: any) => ruta.ruta == 'companies-user'
              ).length > 0,
          },
          {
            label: 'Actualizar datos Empresa',
            link: '/companies/update-company-data',
            showMessage: true,
            message:
              'Estimado/a Usuario/a, en este módulo, el usuario Administrador SIRPSI de la Empresa puede actualizar el correo electrónico y datos de contacto. Solo este usuario tiene los privilegios para actualizar sus propios datos y los del usuario Psicólogo Especialista  SST en el módulo respectivo.  La actualización  de los datos del usuario Trabajador está a cargo únicamente del usuario Psicólogo Especialista SST. El sistema permite asociar un mismo correo electrónico a otros roles que se le asignen al usuario como Trabajador, Psicólogo Especialista SST o Administrador SIRPSI de la Empresa, en una o varias empresas registradas en el sistema, si se requiere .” Para aprender más sobre este proceso puede consultar  el material de capacitación  disponible en el siguiente enlace  <a href="#">material de capacitación</a>.',
            view:
              this.accountService.userData.rutasAsignadas.filter(
                (ruta: any) => ruta.ruta == 'update-company-data'
              ).length > 0,
          },
          {
            label: 'Centros de trabajo',
            link: '/work-centers',
            view:
              this.accountService.userData.rutasAsignadas.filter(
                (ruta: any) => ruta.ruta == 'work-centers'
              ).length > 0,
          },
          {
            label: 'Vincular | Desvincular Psicólogo',
            link: '/companies/link-unlink-psychologist',
            showMessage: true,
            message:
              'Estimado/a Usuario/a, en este módulo, el usuario Administrador SIRPSI de la Empresa puede actualizar el correo electrónico y datos de contacto. Solo este usuario tiene los privilegios para actualizar sus propios datos y los del usuario Psicólogo Especialista  SST en el módulo respectivo.  La actualización  de los datos del usuario Trabajador está a cargo únicamente del usuario Psicólogo Especialista SST. El sistema permite asociar un mismo correo electrónico a otros roles que se le asignen al usuario como Trabajador, Psicólogo Especialista SST o Administrador SIRPSI de la Empresa, en una o varias empresas registradas en el sistema, si se requiere .” Para aprender más sobre este proceso puede consultar  el material de capacitación  disponible en el siguiente enlace  <a href="#">material de capacitación</a>.',
            view:
              this.accountService.userData.rutasAsignadas.filter(
                (ruta: any) => ruta.ruta == 'link-unlink-psychologist'
              ).length > 0,
          },
          {
            label: 'Vincular | Desvincular Trabajador',
            link: '/work-centers/link-unlink-worker',
            showMessage: true,
            message:
              'Estimado/a Usuario/a, en este módulo, el usuario Administrador SIRPSI de la Empresa puede actualizar el correo electrónico y datos de contacto. Solo este usuario tiene los privilegios para actualizar sus propios datos y los del usuario Psicólogo Especialista  SST en el módulo respectivo.  La actualización  de los datos del usuario Trabajador está a cargo únicamente del usuario Psicólogo Especialista SST. El sistema permite asociar un mismo correo electrónico a otros roles que se le asignen al usuario como Trabajador, Psicólogo Especialista SST o Administrador SIRPSI de la Empresa, en una o varias empresas registradas en el sistema, si se requiere .” Para aprender más sobre este proceso puede consultar  el material de capacitación  disponible en el siguiente enlace  <a href="#">material de capacitación</a>.',
            view:
              this.accountService.userData.rutasAsignadas.filter(
                (ruta: any) => ruta.ruta == 'link-unlink-worker'
              ).length > 0,
          },
        ],
      },
      {
        label: 'Ministerio',
        icon: 'monitor',
        view:
          this.accountService.userData.rutasAsignadas.filter(
            (ruta: any) => ruta.ruta == 'configuration'
          ).length > 0,
        // subItems: [
        //   {
        //     label: 'Prueba',
        //     link: '#',
        //     view:
        //       this.accountService.userData.rutasAsignadas.filter(
        //         (ruta: any) => ruta.ruta == 'configuration'
        //       ).length > 0,
        //   },
        // ],
      },
      {
        label: 'Evaluación Psicosocial',
        isTitle: true,
        view:
          this.accountService.userData.rutasAsignadas.filter(
            (ruta: any) => ruta.ruta == 'query-reports'
          ).length > 0,
      },
      {
        label: 'Gestionar',
        icon: 'edit',
        view:
          this.accountService.userData.rutasAsignadas.filter(
            (ruta: any) => ruta.ruta == 'manage'
          ).length > 0,
        subItems: [
          {
            label: 'Convocar trabajadores',
            link: 'psychosocial-evaluation/manage/summon-workers',
            showMessage: true,
            message:
              'Estimado/a Usuario/a, en este módulo, el usuario Administrador SIRPSI de la Empresa puede actualizar el correo electrónico y datos de contacto. Solo este usuario tiene los privilegios para actualizar sus propios datos y los del usuario Psicólogo Especialista  SST en el módulo respectivo.  La actualización  de los datos del usuario Trabajador está a cargo únicamente del usuario Psicólogo Especialista SST. El sistema permite asociar un mismo correo electrónico a otros roles que se le asignen al usuario como Trabajador, Psicólogo Especialista SST o Administrador SIRPSI de la Empresa, en una o varias empresas registradas en el sistema, si se requiere .” Para aprender más sobre este proceso puede consultar  el material de capacitación  disponible en el siguiente enlace  <a href="#">material de capacitación</a>.',
            view:
              this.accountService.userData.rutasAsignadas.filter(
                (ruta: any) => ruta.ruta == 'summon-workers'
              ).length > 0,
          },
          {
            label: 'Avances evaluación psicosocial',
            link: 'psychosocial-evaluation/manage/advances',
            showMessage: true,
            message:
              'Estimado/a Usuario/a, en este módulo, el usuario Administrador SIRPSI de la Empresa puede actualizar el correo electrónico y datos de contacto. Solo este usuario tiene los privilegios para actualizar sus propios datos y los del usuario Psicólogo Especialista  SST en el módulo respectivo.  La actualización  de los datos del usuario Trabajador está a cargo únicamente del usuario Psicólogo Especialista SST. El sistema permite asociar un mismo correo electrónico a otros roles que se le asignen al usuario como Trabajador, Psicólogo Especialista SST o Administrador SIRPSI de la Empresa, en una o varias empresas registradas en el sistema, si se requiere .” Para aprender más sobre este proceso puede consultar  el material de capacitación  disponible en el siguiente enlace  <a href="#">material de capacitación</a>.',
            view:
              this.accountService.userData.rutasAsignadas.filter(
                (ruta: any) => ruta.ruta == 'advances'
              ).length > 0,
          },
          {
            label: 'Generar radicado',
            link: 'psychosocial-evaluation/manage/generate-filed',
            showMessage: true,
            message:
              'Estimado/a Usuario/a, en este módulo, el usuario Administrador SIRPSI de la Empresa puede actualizar el correo electrónico y datos de contacto. Solo este usuario tiene los privilegios para actualizar sus propios datos y los del usuario Psicólogo Especialista  SST en el módulo respectivo.  La actualización  de los datos del usuario Trabajador está a cargo únicamente del usuario Psicólogo Especialista SST. El sistema permite asociar un mismo correo electrónico a otros roles que se le asignen al usuario como Trabajador, Psicólogo Especialista SST o Administrador SIRPSI de la Empresa, en una o varias empresas registradas en el sistema, si se requiere .” Para aprender más sobre este proceso puede consultar  el material de capacitación  disponible en el siguiente enlace  <a href="#">material de capacitación</a>.',
            view:
              this.accountService.userData.rutasAsignadas.filter(
                (ruta: any) => ruta.ruta == 'generate-filed'
              ).length > 0,
          },
        ],
      },
      {
        label: 'Realizar',
        icon: 'file-text',
        view: true,
        subItems: [
          {
            label: 'Convocar trabajadores',
            link: '#',
            view: true,
          },
          {
            label: 'Avances evaluación psicosocial',
            link: '#',
            view: true,
          },
          {
            label: 'Generar radicado evaluación psicosocial',
            link: '#',
            view: true,
          },
        ],
      },
      {
        label: 'Apoyar',
        icon: 'plus',
        view: true,
        link: '#',
      },
      {
        label: 'Planes de Intervención y control',
        icon: 'trello',
        view: true,
        link: '#',
      },
      {
        label: 'Reportes',
        isTitle: true,
        view:
          this.accountService.userData.rutasAsignadas.filter(
            (ruta: any) => ruta.ruta == 'query-reports'
          ).length > 0,
      },
      {
        label: 'Consultas | Reportes',
        icon: 'pie-chart',
        view:
          this.accountService.userData.rutasAsignadas.filter(
            (ruta: any) => ruta.ruta == 'query-reports'
          ).length > 0,
        subItems: [
          {
            label: 'Consulta Evaluación Psicosocial por Vigencia',
            link: '/query-reports/consultation-psychosocial-evaluation-validity',
            view:
              this.accountService.userData.rutasAsignadas.filter(
                (ruta: any) => ruta.ruta == 'worker-management-consultation'
              ).length > 0,
          },
          {
            label: 'Consulta Gestión de Trabajadores',
            link: '/query-reports/worker-management-consultation',
            view:
              this.accountService.userData.rutasAsignadas.filter(
                (ruta: any) => ruta.ruta == 'worker-management-consultation'
              ).length > 0,
          },
        ],
      },
      {
        label: 'Configuración',
        isTitle: true,
        view:
          this.accountService.userData.rutasAsignadas.filter(
            (ruta: any) => ruta.ruta == 'configuration'
          ).length > 0,
      },
      {
        label: 'Configuración',
        icon: 'settings',
        view:
          this.accountService.userData.rutasAsignadas.filter(
            (ruta: any) => ruta.ruta == 'configuration'
          ).length > 0,
        subItems: [
          {
            label: 'Roles',
            link: '/configuration/roles',
            view:
              this.accountService.userData.rutasAsignadas.filter(
                (ruta: any) => ruta.ruta == 'roles'
              ).length > 0,
          },
          {
            label: 'Rutas',
            link: '/configuration/routes',
            view:
              this.accountService.userData.rutasAsignadas.filter(
                (ruta: any) => ruta.ruta == 'routes'
              ).length > 0,
          },
          {
            label: 'Variables',
            link: '/configuration/variables',
            view:
              this.accountService.userData.rutasAsignadas.filter(
                (ruta: any) => ruta.ruta == 'variables'
              ).length > 0,
          },
          {
            label: 'Asignar rutas a roles',
            link: '/configuration/routes-role',
            view:
              this.accountService.userData.rutasAsignadas.filter(
                (ruta: any) => ruta.ruta == 'routes-role'
              ).length > 0,
          },
          {
            label: 'Horario trabajo',
            link: '/apps/calendar',
            view: true,
          },
        ],
      },
    ];
    /**
     * Sidebar-folded on desktop (min-width:992px and max-width: 1199px)
     */
    const desktopMedium = window.matchMedia(
      '(min-width:992px) and (max-width: 1199px)'
    );
    desktopMedium.addEventListener('change', () => {
      this.iconSidebar;
    });
    this.iconSidebar(desktopMedium);
  }

  ngAfterViewInit() {
    // activate menu item
    new MetisMenu(this.sidebarMenu.nativeElement);

    this._activateMenuDropdown();
  }

  /**
   * Toggle sidebar on hamburger button click
   */
  toggleSidebar(e: Event) {
    this.sidebarToggler.nativeElement.classList.toggle('active');
    this.sidebarToggler.nativeElement.classList.toggle('not-active');
    if (window.matchMedia('(min-width: 992px)').matches) {
      e.preventDefault();
      this.document.body.classList.toggle('sidebar-folded');
    } else if (window.matchMedia('(max-width: 991px)').matches) {
      e.preventDefault();
      this.document.body.classList.toggle('sidebar-open');
    }
  }

  /**
   * Toggle settings-sidebar
   */
  toggleSettingsSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('settings-open');
  }

  /**
   * Open sidebar when hover (in folded folded state)
   */
  operSidebarFolded() {
    if (this.document.body.classList.contains('sidebar-folded')) {
      this.document.body.classList.add('open-sidebar-folded');
    }
  }

  /**
   * Fold sidebar after mouse leave (in folded state)
   */
  closeSidebarFolded() {
    if (this.document.body.classList.contains('sidebar-folded')) {
      this.document.body.classList.remove('open-sidebar-folded');
    }
  }

  /**
   * Sidebar-folded on desktop (min-width:992px and max-width: 1199px)
   */
  iconSidebar(mq: MediaQueryList) {
    if (mq.matches) {
      this.document.body.classList.add('sidebar-folded');
    } else {
      this.document.body.classList.remove('sidebar-folded');
    }
  }

  /**
   * Switching sidebar light/dark
   */
  onSidebarThemeChange(event: Event) {
    this.document.body.classList.remove('sidebar-light', 'sidebar-dark');
    this.document.body.classList.add((<HTMLInputElement>event.target).value);
    this.document.body.classList.remove('settings-open');
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

  /**
   * Reset the menus then hilight current active menu item
   */
  _activateMenuDropdown() {
    this.resetMenuItems();
    this.activateMenuItems();
  }

  /**
   * Resets the menus
   */
  resetMenuItems() {
    const links = document.getElementsByClassName('nav-link-ref');

    for (let i = 0; i < links.length; i++) {
      const menuItemEl = links[i];
      menuItemEl.classList.remove('mm-active');
      const parentEl = menuItemEl.parentElement;

      if (parentEl) {
        parentEl.classList.remove('mm-active');
        const parent2El = parentEl.parentElement;

        if (parent2El) {
          parent2El.classList.remove('mm-show');
        }

        const parent3El = parent2El?.parentElement;
        if (parent3El) {
          parent3El.classList.remove('mm-active');

          if (parent3El.classList.contains('side-nav-item')) {
            const firstAnchor = parent3El.querySelector('.side-nav-link-a-ref');

            if (firstAnchor) {
              firstAnchor.classList.remove('mm-active');
            }
          }

          const parent4El = parent3El.parentElement;
          if (parent4El) {
            parent4El.classList.remove('mm-show');

            const parent5El = parent4El.parentElement;
            if (parent5El) {
              parent5El.classList.remove('mm-active');
            }
          }
        }
      }
    }
  }

  /**
   * Toggles the menu items
   */
  activateMenuItems() {
    const links: any = document.getElementsByClassName('nav-link-ref');

    let menuItemEl = null;

    for (let i = 0; i < links.length; i++) {
      // tslint:disable-next-line: no-string-literal
      if (window.location.pathname === links[i]['pathname']) {
        menuItemEl = links[i];

        break;
      }
    }

    if (menuItemEl) {
      menuItemEl.classList.add('mm-active');
      const parentEl = menuItemEl.parentElement;

      if (parentEl) {
        parentEl.classList.add('mm-active');

        const parent2El = parentEl.parentElement;
        if (parent2El) {
          parent2El.classList.add('mm-show');
        }

        const parent3El = parent2El.parentElement;
        if (parent3El) {
          parent3El.classList.add('mm-active');

          if (parent3El.classList.contains('side-nav-item')) {
            const firstAnchor = parent3El.querySelector('.side-nav-link-a-ref');

            if (firstAnchor) {
              firstAnchor.classList.add('mm-active');
            }
          }

          const parent4El = parent3El.parentElement;
          if (parent4El) {
            parent4El.classList.add('mm-show');

            const parent5El = parent4El.parentElement;
            if (parent5El) {
              parent5El.classList.add('mm-active');
            }
          }
        }
      }
    }
  }
  showMessageRedirect(url: any, show: boolean, message: string) {
    if (show == true) this.showMessage(url, message);
    else if (url != undefined) this.router.navigate([url]);
  }
  showMessage(url: any, message: string) {
    var messageInfo = '<p class="texto-mensaje">' + message + '</p>';
    Swal.fire({
      icon: 'info',
      title: 'Estimado(a) usuario(a)',
      html: messageInfo,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate([url]);
      }
    });
  }
}
