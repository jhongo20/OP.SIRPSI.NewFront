import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/shared/services/account.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { CompaniesFormComponent } from '../companies/companies-form/companies-form.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(
    public accountService: AccountService,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.accountService.ValidateSesion();
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 800);
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
  openFormDialogUser() {
    Swal.fire({
      title: 'Información importante',
      html: '<p>Bienvenido/a al proceso de registro de Empresas en el Sistema de Información Psicosocial (SIRSPI). Para completar el registro de tu empresa, es necesario contar con la documentación correspondiente, incluyendo los documentos de legalización, así como la información del representante legal y un correo electrónico para asignar al administrador SIRPSI de la empresa. Cabe destacar que, si la empresa cuenta con varios centros de trabajo, primero se debe registrar la información del centro de trabajo principal. Posteriormente, el usuario Administrador SIRPSI de la empresa podrá ingresar al sistema y registrar los demás centros de trabajo que tenga la empresa y asignar uno o varios psicólogos especialistas en Salud y Seguridad en el Trabajo (SST) a dichos centros de trabajo (pueden ser varios psicólogos a un mismo centro de trabajo), a través del módulo correspondiente, por lo tanto, no es necesario registrar cada centro de trabajo de forma individual en la opción «Registrar Empresa». Además, para facilitar el proceso, el sistema incluye una serie de videos tutoriales y material de capacitación que le ayudarán a completar el registro exitosamente. Puede acceder a ellos en el siguiente enlace: <a href="#">material de capacitación</a>. Por favor, selecciona "Aceptar" para continuar con el proceso de registro o "Cancelar" si deseas salir.</p>',
      // text:
      //   'Bienvenido/a al proceso de registro de Empresas en el Sistema de Información Psicosocial (SIRSPI). Para completar el registro de tu empresa, es necesario contar ' +
      //   'con la documentación correspondiente, incluyendo los documentos de legalización, así como la información del representante legal y un correo electrónico para asignar al ' +
      //   'administrador SIRPSI de la empresa. Cabe destacar que, si la empresa cuenta con varios centros de trabajo, primero se debe registrar la información del centro de trabajo ' +
      //   'principal. Posteriormente, el usuario Administrador SIRPSI de la empresa podrá ingresar al sistema y registrar los demás centros de trabajo que tenga la empresa y asignar ' +
      //   'uno o varios psicólogos especialistas en Salud y Seguridad en el Trabajo (SST) a dichos centros de trabajo (pueden ser varios psicólogos a un mismo centro de trabajo), a ' +
      //   'través del módulo correspondiente, por lo tanto, no es necesario registrar cada centro de trabajo de forma individual en la opción «Registrar Empresa». Además, para ' +
      //   'facilitar el proceso, el sistema incluye una serie de videos tutoriales y material de capacitación que le ayudarán a completar el registro exitosamente. Puede acceder a ' +
      //   'ellos en el siguiente enlace: [link]. Por favor, selecciona "Aceptar" para continuar con el proceso de registro o "Cancelar" si deseas salir.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const dialogRef = this.dialog.open(CompaniesFormComponent, {
          data: {
            id: 0,
            type: 0,
            reload: true,
            table: 0,
            estado: environment.activoEstado,
            role: 2,
            retornarModal: environment.retornarModal.registrarAdmin,
          },
        });
        dialogRef.afterClosed().subscribe();
      }
    });
  }
  openInfoMessage(type: number) {
    var messageInfo = '';
    console.log(type);
    if (type == 0) {
      messageInfo =
        '<p class="texto-mensaje">Para <strong>Iniciar sesión</strong>, es necesario tener una cuenta registrada como Administrador de Empresa, Psicólogo Especialista SST o Trabajador. Si necesita más información, le recomendamos consultar la sección <strong>Tutoriales y capacitación</strong>.</p>';
    } else if (type == 1) {
      messageInfo =
        '<p class="texto-mensaje">En esta sección, podrás registrar tu empresa, ya sea natural, jurídica o entidad del sector público y asignar a un administrador de empresa. Antes de proceder con el registro, se recomienda consultar la sección <strong>Tutoriales y capacitación</strong> para obtener más información sobre el proceso.</p>';
    } else if (type == 2) {
      messageInfo =
        '<p class="texto-mensaje">Para ayudarle a aprender a utilizar el sistema SIRPSI, se pone a su disposición una serie de videos tutoriales y material de capacitación. Le recomendamos dedicar el tiempo necesario para revisar y estudiar estos recursos, de manera que pueda aprovechar al máximo la herramienta y disfrutar de una experiencia exitosa. </p>';
    } else {
      messageInfo =
        '<p class="texto-mensaje">En este espacio, puede radicar sus PQRSD relacionadas con el funcionamiento del sistema FSIRPSI. Sin embargo, antes de realizar cualquier solicitud, se recomienda consultar el material disponible en la sección <strong>Tutoriales y capacitación</strong> para aclarar cualquier duda o inquietud. </p>';
    }
    Swal.fire({
      icon: 'info',
      title: 'Estimado(a) usuario(a)',
      html: messageInfo,
      confirmButtonText: 'Aceptar',
    });
  }
}
