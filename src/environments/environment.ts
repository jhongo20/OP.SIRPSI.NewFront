// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  psicologoRole: 'd48926cf-b1f7-4d6c-81ef-f9baaf099b25',
  administradorEmpRole: 'a4d6e0c2-444a-4b94-8351-0faa8cc51c2b',
  trabajadorRole: '2f1f4dce-fa74-44ab-aa1e-c476626b2961',
  activoEstado: 'cab25738-41fe-4989-a115-0ac36325dd6c',
  inactivoEstado: 'c22caee5-aba0-4bd8-abf3-cff6305df919',
  retiradoEstado: '10b28980-jhbd-4dc2-11db-57f4c8780b67',
  reintegradoEstado: '84b28980-jhbd-4dc2-11db-57f4c8780b67',
  // urlApi: 'https://opSIRPSIapi.azurewebsites.net/api/v1/',
  urlApi: 'https://localhost:44345/api/',
  divisa: 'https://api.exchangerate-api.com/v4/latest/USD',
  urlApiColombia: 'https://api-colombia.com/api/v1/',
  retornarModal: {
    registrarAdmin: 1,
    registrarPsicologo: 2,
    registrarTrabajador: 3,
    asignarPsicologo: 4,
  },
  reportes: {
    historialRetirosReintegrosTrabajadores:
      'd9bda3f2-bf2a-4269-9d4f-eed5f44f42f2',
    historialRetirosReintegros: 'z3bda3f2-bf2a-4269-9d4f-eed5f44f42f2',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
