import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shared/services/account.service';
import { PsychosocialQuestionnaireService } from 'src/app/shared/services/psychosocial-questionnaire.service';

@Component({
  selector: 'app-general-data-sheet',
  templateUrl: './general-data-sheet.component.html',
  styleUrls: ['./general-data-sheet.component.scss']
})
export class GeneralDataSheetComponent implements OnInit {


  @Output() propagar = new EventEmitter();
  userForm: FormGroup;

  departamentos = [
    'Amazonas',
    'Antioquia',
    'Arauca',
    'Atlántico',
    'Bolívar',
    'Boyacá',
    'Caldas',
    'Caquetá',
    'Casanare',
    'Cauca',
    'Cesar',
    'Chocó',
    'Córdoba',
    'Cundinamarca',
    'Guaviare',
    'Huila',
    'Guainía',
    'Magdalena',
    'Meta',
    'Nariño',
    'Norte de Santander',
    'Putumayo',
    'Quindío',
    'Risaralda',
    'San Andrés y Providencia',
    'Santander',
    'Sucre',
    'Tolima',
    'Valle del Cauca',
    'Vaupés',
    'Vichada'
  ];

  municipios = [
    'Bogotá',
    'Medellín',
    'Cali',
    'Barranquilla',
    'Cartagena',
    'Bucaramanga',
    'Pereira',
    'Santa Marta',
    'Cúcuta',
    'Villavicencio',
    'Ibagué',
    'Pasto',
    'Neiva',
    'Manizales',
    'Montería',
    'Popayán',
    'Tunja',
    'Florencia',
    'Riohacha',
    'Arauca'
  ];

  ciudades = [
    'Bogotá',
    'Medellín',
    'Cali',
    'Barranquilla',
    'Cartagena',
    'Bucaramanga',
    'Pereira',
    'Santa Marta',
    'Cúcuta',
    'Villavicencio',
    'Ibagué',
    'Pasto',
    'Neiva',
    'Manizales',
    'Montería',
    'Popayán',
    'Tunja',
    'Florencia',
    'Riohacha'
  ];

  constructor(
    private _fb: FormBuilder,
    private accountService: AccountService,
    private psychosocialQuestionnaireService : PsychosocialQuestionnaireService
  ) { }

  ngOnInit(){
    this.loadForm();
  }

  loadForm() {
    this.userForm = this._fb.group({
      id: [''],
      nombre_completo: ['',[Validators.required] ],
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
      cual_rural:  [''],
      estado_civil:  ['', [Validators.required]],      
      nivel_educativo:  ['', [Validators.required]],
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
  }

  clickSave(){
    this.createQuiz(this.userForm.value);
  }

  createQuiz(data: any) {
    this.psychosocialQuestionnaireService.createFinal(data).subscribe({
      next: (data) => {
        this.propagar.emit();
      },
      error: () => {
      },
    })
  }

}
