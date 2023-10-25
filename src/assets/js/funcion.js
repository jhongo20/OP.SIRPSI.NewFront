const infoIniciarSesion = document.querySelector("#info-iniciar-sesion");
const mensajeIniciarSesion = document.querySelector("#mensaje-iniciar-sesion");
const aceptar = document.querySelector("#aceptar");

infoIniciarSesion.addEventListener("click", () => {
  mensajeIniciarSesion.style.display = "block";
});

aceptar.addEventListener("click", () => {
  mensajeIniciarSesion.style.display = "none";
});
/*-----------------------------------------------------------------------------------------------*/
const infoRegistrarEmpresa = document.querySelector("#info-registrar-empresa");
const mensajeRegistrarEmpresa = document.querySelector(
  "#mensaje-registrar-empresa"
);
const aceptar2 = document.querySelector("#aceptar-2");

infoRegistrarEmpresa.addEventListener("click", () => {
  mensajeRegistrarEmpresa.style.display = "block";
});

aceptar2.addEventListener("click", () => {
  mensajeRegistrarEmpresa.style.display = "none";
});
/*-----------------------------------------------------------------------------------------------*/
const infoTutoriales = document.querySelector("#info-tutoriales");
const mensajeTutorialesCapacitacion = document.querySelector(
  "#mensaje-tutoriales-capacitacion"
);
const aceptar3 = document.querySelector("#aceptar-3");

infoTutoriales.addEventListener("click", () => {
  mensajeTutorialesCapacitacion.style.display = "block";
});

aceptar3.addEventListener("click", () => {
  mensajeTutorialesCapacitacion.style.display = "none";
});
/*-----------------------------------------------------------------------------------------------*/
const infoAyudaSoporte = document.querySelector("#info-ayuda-soporte");
const mensajeAyudaSoporte = document.querySelector("#mensaje-ayuda-soporte");
const aceptar4 = document.querySelector("#aceptar-4");

infoAyudaSoporte.addEventListener("click", () => {
  mensajeAyudaSoporte.style.display = "block";
});

aceptar4.addEventListener("click", () => {
  mensajeAyudaSoporte.style.display = "none";
});