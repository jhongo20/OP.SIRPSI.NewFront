import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shared/services/account.service';
import { getService } from 'src/app/shared/services/get.services';
import { PsychosocialQuestionnaireService } from 'src/app/shared/services/psychosocial-questionnaire.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-general-data-sheet',
  templateUrl: './general-data-sheet.component.html',
  styleUrls: ['./general-data-sheet.component.scss'],
})
export class GeneralDataSheetComponent implements OnInit {
  @Output() propagar = new EventEmitter();
  userForm: FormGroup;
  listDepartament: any;
  listCity: any;
  listCities: any;
  constructor(
    private _fb: FormBuilder,
    private accountService: AccountService,
    private psychosocialQuestionnaireService: PsychosocialQuestionnaireService,
    private servicio: getService
  ) {}

  ngOnInit() {
    this.loadForm();
  }

  loadForm() {
    this.userForm = this._fb.group({
      id: [''],
      nombre_completo: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      otro_genero: [''],
      etnia: ['', [Validators.required]],
      cual_indigena: [''],
      discapacidad: ['', [Validators.required]],
      cual_discapacidad: [''],
      anio_nacimiento: ['', [Validators.required]],
      lugar_residencia: ['', [Validators.required]],
      zona: ['', [Validators.required]],
      cual_rural: [''],
      estado_civil: ['', [Validators.required]],
      nivel_educativo: ['', [Validators.required]],
      ocupacion: ['', [Validators.required]],
      lugar_reidencia: [''],
      estrado: ['', [Validators.required]],
      tipo_vivienda: ['', [Validators.required]],
      dependientes: ['', [Validators.required]],
      lugar_trabajo: ['', [Validators.required]],
      tiempo_laborado: ['', [Validators.required]],
      cargo_empresa: ['', [Validators.required]],
      seleccion_cargo: ['', [Validators.required]],
      tiempoLavorado_Cargo: ['', [Validators.required]],
      departamentoTrabajo: ['', [Validators.required]],
      tipoContrato: ['', [Validators.required]],
      horasTrabajadasDiarias: ['', [Validators.required]],
      tipoSalario: ['', [Validators.required]],
      id_desempleado: [this.accountService.userData.id],
    });

    this.onGetCities();
    this.onGetDepartment(environment.urlApiColombia + 'Department');
  }

  clickSave() {
    this.userForm.controls['lugar_residencia'].setValue(
      this.userForm.value.lugar_residencia.toString()
    );
    this.userForm.controls['dependientes'].setValue(
      this.userForm.value.dependientes.toString()
    );
    this.userForm.controls['horasTrabajadasDiarias'].setValue(
      this.userForm.value.horasTrabajadasDiarias.toString()
    );
    this.createQuiz(this.userForm.value);
  }

  createQuiz(data: any) {
    this.psychosocialQuestionnaireService.createFinal(data).subscribe({
      next: (data) => {
        this.propagar.emit();
      },
      error: () => {},
    });
  }

  onGetDepartment(url: string) {
    this.servicio.obtenerDatos(url).subscribe((data) => {
      this.listDepartament = data.sort((x: any, y: any) =>
        x.name.localeCompare(y.name)
      );
    });
  }

  onGetCity(url: any) {
    this.listCity = [];
    this.userForm.value.lugar_residencia = '';
    this.servicio
      .obtenerDatos(environment.urlApiColombia + `Department/${url.id}/cities`)
      .subscribe((data) => {
        this.listCity = data.sort((x: any, y: any) =>
          x.name.localeCompare(y.name)
        );
      });
  }

  onGetCities() {
    this.servicio
      .obtenerDatos(environment.urlApiColombia + `City`)
      .subscribe((data) => {
        this.listCities = data.sort((x: any, y: any) =>
          x.name.localeCompare(y.name)
        );
      });
  }
}
