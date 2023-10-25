import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/shared/services/account.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loading: Boolean = true;
  public form: FormGroup;
  public siteKey: string = '6Lf_cGcnAAAAAGQM8rP0Vw3vBTTSe8mUPpMS7wUC';
  hide = true;
  constructor(
    public formBuilder: FormBuilder,
    public accountService: AccountService,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadingService.ChangeStatusLoading(true);
    this.loadingService.loadingPage.subscribe(
      (result) => (this.loading = result)
    );
    this.form = this.formBuilder.group({
      IdCompany: ['103365981', Validators.required],
      Document: ['1234567', Validators.required],
      Password: ['Admin123*.', Validators.required],
      // ReCaptcha: ['', Validators.required],
      Tc: [false, Validators.required],
    });
    this.accountService.ValidateSesion();
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 800);
  }
  GetInto() {
    if (this.form.valid && this.form.value.Tc == true) {
      this.loadingService.ChangeStatusLoading(true);
      this.accountService.Authenticate(this.form.value).subscribe(
        (result: any) => {
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
        },
        (error) => {
          console.log(error.error);
          Swal.fire('Error', error.error.message, 'error');
          this.openSnackBar(error.error.message);
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
        }
      );
    } else {
      Swal.fire(
        'Estimado/a Usuario/a',
        'Para continuar, debes aceptar los términos y condiciones del sistema SIRPSI.' +
          '\nPor favor, marca la casilla de aceptación antes de avanzar.',
        'warning'
      );
    }
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
  OpenTermsConditions() {
    Swal.fire(
      'Política de Privacidad y Condiciones de Uso',
      'El Ministerio de Trabajo a través de su portal web www.mintrabajo.gov.co y en las páginas web de otras dependencias o entidades adscritas y vinculadas, a los cuales se accede a través de www.mintrabajo.gov.co facilita a los usuarios información inherente a su misión, visión, objetivos y funciones, así como información relacionada con las actividades del sector Trabajo, Estadísticas, Normatividad, Trámites, Servicios, Contratación, Consultas, PQRSD. ' +
        'Aceptación de las condiciones de uso ' +
        'Los usuarios que acceden al portal web del Ministerio de Trabajo lo hacen bajo su total responsabilidad y de manera voluntaria, por tanto, acepta y reconoce que ha revisado y que está de acuerdo con la Política de Privacidad, en lo que en Derecho corresponda. Será responsabilidad del Usuario la lectura y acatamiento de la Política de Privacidad, cada vez que los utilice. ' +
        'El Ministerio de Trabajo se reserva el derecho de revisar la Política de Privacidad y las Condiciones de Uso cuando lo considere necesario sin previo aviso para el usuario. Será responsabilidad del usuario conocer y aceptar la Política de Privacidad y condiciones de uso cada vez que visite la página web de la entidad. ' +
        'Responsabilidad por las Opiniones e Informaciones vertidas en el Portal ' +
        'El Ministerio Trabajo no se responsabiliza por las informaciones y opiniones emitidas en el sitio Web del MINISTERIO, cuando no sean de su exclusiva emisión. Las informaciones y opiniones emitidas por personas diferentes a éstos no necesariamente reflejan la posición del MINISTERIO, incluyendo sin limitación a sus empleados, directores, asesores y proveedores. En consecuencia, éste no se hace responsable por ninguna de las informaciones y opiniones que se emitan en sus productos Web, en las condiciones descritas. ' +
        'Derechos de autor ' +
        'El portal web y las páginas web de otras dependencias o entidades adscritas y vinculadas y su contenido son propiedad del Ministerio del Trabajo está PROHIBIDA su reproducción total o parcial, su traducción, inclusión, transmisión, almacenamiento o manipulación sin autorización previa y escrita del Ministerio de Trabajo. Se permite la recuperación, copia o descarga e impresión de la información del sitio web únicamente para propósitos internos, personales y no comerciales, siempre que el usuario respete todos los derechos de autor y haga mención expresa de la propiedad en cabeza del Ministerio de Trabajo, de igual manera, debe acogerse a las políticas establecidas y no se permite realizar modificaciones. ' +
        'Los textos y elementos gráficos que constituyen la página Web, así como su presentación y montaje, o son titularidad exclusiva de MINTRABAJO o ésta ostenta los derechos de explotación necesarios. Sin perjuicio de lo anterior, los nombres comerciales, marcas o signos distintivos que aparecen o a los que se hace alusión en el Sitio Web, pertenecen a sus respectivos propietarios y se encuentran protegidos por la legislación vigente al respecto. ' +
        'Los administradores de la página son responsables en los términos previstos por la ley colombiana, con las limitaciones que se detallan a continuación: ' +
        'La información incluida en la página es generada por el Ministerio de Trabajo y no está relacionada con personas concretas. ' +
        'En estas páginas se encuentran incluidos enlaces a páginas externas, sobre las cuales no ejerce ningún control ni responsabilidad. El contenido de los mismos es responsabilidad de las respectivas Entidades. ' +
        'El Ministerio del Trabajo no se hace responsable del servicio ininterrumpido o libre de error de la página. El Ministerio del Trabajo hace sus mejores esfuerzos para que el contenido suministrado sea de óptima calidad, y en tal sentido el Usuario acepta utilizar el servicio. ' +
        'Contenidos del sitio web ' +
        'Los administradores de la página son responsables en los términos previstos por la ley colombiana, con las limitaciones que se detallan a continuación: ' +
        'La información incluida en la página es generada por el Ministerio de Trabajo y no está relacionada con personas concretas. En estas páginas se encuentran incluidos enlaces a páginas externas, sobre las cuales no ejerce ningún control ni responsabilidad. El contenido de los mismos es responsabilidad de las respectivas Entidades. ' +
        'El Ministerio del Trabajo no se hace responsable del servicio ininterrumpido o libre de error de la página. El Ministerio del Trabajo hace sus mejores esfuerzos para que el contenido suministrado sea de óptima calidad, y en tal sentido el Usuario acepta utilizar el servicio. ' +
        'AVISO DE PRIVACIDAD  ' +
        'El presente Aviso de Privacidad (en adelante el “Aviso”) establece los términos y condiciones en virtud de los cuales, el Ministerio del Trabajo identificado con Nit No.830.115.226-3 y con domicilio en la Carrera 14 No. 99 - 33 de Bogotá D.C., realizará el tratamiento de sus datos personales.  ' +
        'El Ministerio del Trabajo ha designado al Grupo de Atención al Ciudadano, como área encargada de recibir las solicitudes de consulta, actualización, rectificación, revocatoria y supresión de datos personales y demás que sean de la naturaleza de la protección de datos personales.  ' +
        'Para atender cualquier tipo de solicitud, se han establecido los siguientes medios para la presentación respectiva, así:  ' +
        'Escrito: Carrera 14 # 99 - 33 Piso 6, en Bogotá D.C.  ' +
        'Líneas de atención telefónica: Línea Nacional Gratuita 018000 112518  ' +
        'Línea Atención Bogotá (601) 3779999 Opción 2  ' +
        'Desde un celular 120  ' +
        'Sistema PQRSD https://www.mintrabajo.gov.co/web/guest/atencion-al-ciudadano/peticiones-quejas-reclamos-y-denuncias  ' +
        'TRATAMIENTO Y FINALIDAD  ' +
        'El tratamiento que realizará el Ministerio del Trabajo con la información personal será el siguiente:  ' +
        'La recolección, recepción, almacenamiento, uso, circulación, supresión, procesamiento, Compilación, transferencia o transmisión con entidades públicas o privadas, con las que se tiene contratos, acuerdos o convenios para que provean servicios al Ministerio del Trabajo.  ' +
        'El tratamiento específico para cada base de datos personales debe ser definido, autorizado previamente, registrado y comunicado al titular de la información, para:  ' +
        '• Cumplir con los objetivos y funciones establecidas en el decreto 4108 de 2011, Ley 1562 de 2012, Ley 1610 de 2013 y las establecidas en las demás disposiciones legales vigentes.  ' +
        '• Gestionar de manera oportuna y clara las solicitudes y consultas realizadas por las partes interesadas del Ministerio, relacionadas con la información general sobre lo misional,  ' +
        '•	funciones, trámites, normatividad vigente, procesos, procedimientos y mecanismos de participación ciudadana.  ' +
        '• Dar respuestas a consultas, reclamos, solicitud de actualización, rectificación o supresión de datos, y revocatorias de la autorización.  ' +
        '• Registrar la información de datos personales en las bases de datos del Ministerio del Trabajo, con la finalidad de analizar, evaluar y generar datos estadísticos, así como indicadores para la formulación de políticas en el sector del trabajo.  ' +
        '• Facilitar la implementación de programas en cumplimiento de mandatos legales.  ' +
        '• Enviar la información a entidades gubernamentales o judiciales por solicitud expresa de las mismas.  ' +
        '• Publicar, soportar, realizar informes, mediante el registro fotográfico, grabación de video o audio de los programas, eventos, capacitaciones realizadas por el Ministerio del Trabajo en cumplimiento de sus objetivos y funciones.  ' +
        'DERECHOS DEL TITULAR  ' +
        'Como titular de sus datos personales Usted tiene derecho a:  ' +
        '1. Acceder en forma gratuita a los datos proporcionados que hayan sido objeto de tratamiento.  ' +
        '2. Conocer, actualizar y rectificar su información frente a datos parciales, inexactos, incompletos, fraccionados, que induzcan a error, o a aquellos cuyo tratamiento esté prohibido o no haya sido autorizado.  ' +
        '3. Solicitar prueba de la autorización otorgada. ' +
        '4. Presentar ante la Superintendencia de Industria y Comercio (SIC), quejas por infracciones a lo dispuesto en la normatividad vigente.  ' +
        '5. Revocar la autorización y/o solicitar la supresión del dato, siempre que no exista un deber legal o contractual que impida eliminarlos.  ' +
        '6. Abstenerse de responder las preguntas sobre datos sensibles. Tendrán carácter facultativo las respuestas que versen sobre datos sensibles o sobre datos de las niñas, niños y adolescentes.  ' +
        'MECANISMOS PARA CONOCER LA POLÍTICA DE TRATAMIENTO  ' +
        'El Titular puede acceder a nuestra Política de Tratamiento de información de datos personales, la cual se encuentra publicada en un lugar visible, en las dependencias de atención al ciudadano de todas las oficinas del Ministerio en todo el país y en la página web del Ministerio https://www.mintrabajo.gov.co. Adicionalmente, deberá ser informada por los centros de atención telefónico y virtual dispuestos por la entidad, para la atención al ciudadano.  ' +
        'Este Aviso de Privacidad ha sido aprobada y adoptada por el Comité de Gestión, gerencia y desempeño en sesión del 21 de diciembre de 2021 y rige a partir de la fecha de aprobación y adopción por el comité de gestión, gerencia y desempeño o de su firma por el representante legal de la entidad y complementa las políticas asociadas, con vigencia indefinida.'
    );
  }
}
