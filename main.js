const formularioCalculadora = document.getElementById("formulario-calculadora");
const resultado = document.getElementById("resultado");
//Captura de inputs de forma global
const nombrep = document.getElementById("nombre");
const tipoDocumento = document.querySelector("#tipo_documento");
const NDocumento = document.querySelector("#num_documento");
const Edad = document.querySelector("#edad");
const peso = document.querySelector("#peso");
const altura = document.querySelector("#altura");
const actividad = document.querySelector("#actividad");

formularioCalculadora.addEventListener("submit", (e) => {
  e.preventDefault();

  calcularCalorias();
  limpiarInputs();
  formularioCalculadora.reset();
});

function calcularCalorias() {
  aparecerResultado();

  //llamdo a la funcion del grupo poblacional
  const edad = Number(Edad.value);
  const grupoPoblacional = determinarGrupoPoblacional(edad);

  //Captura del check genero
  const genero = document.querySelector("input[name=genero]:checked");

  const multiplicadorTMB = {
    peso: 10,
    altura: 6.25,
    edad: 5,
  };

  if (
    !(
      nombrep.value &&
      tipoDocumento.value &&
      NDocumento.value &&
      Edad.value &&
      peso.value &&
      altura.value &&
      actividad.value
    )
  ) {
    mostrarMensajeDeError("Por favor asegurese de llenar todos los campos");
    return;
  } else if (Edad.value < 15 || Edad.value > 80) {
    mostrarMensajeDeError("La edad ingresada no es valida");
    return;
  } else if (altura.value < 100 || altura.value > 250) {
    mostrarMensajeDeError("La altura ingresada no es valida");
    return;
  }

  const formulaHombres =
    actividad.value *
      (multiplicadorTMB.peso * peso.value +
        multiplicadorTMB.altura * altura.value -
        multiplicadorTMB.edad * Edad.value) +
    5;

  const formulaMujeres =
    actividad.value *
      (multiplicadorTMB.peso * peso.value +
        multiplicadorTMB.altura * altura.value -
        multiplicadorTMB.edad * Edad.value) -
    161;

  const calculoCalorias =
    genero.id === "masculino" ? formulaHombres : formulaMujeres;
  console.log(calculoCalorias);

  // totalCalorias.value = `${Math.floor(calculoCalorias)} kcal`;

  resultado.innerHTML = `
        <div class=" card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
          <h5 class="card-title h2">Señor@</h5>
          <h6 class="card-title h2">${nombrep.value.toUpperCase()}</h6>
          <h6 class="card-title h2">Identificado con: ${
            tipoDocumento.value
          }</h6>
          <h6 class="card-title h2">No: ${NDocumento.value}</h6>
          <h5 class="card-title h2">Requiere un total de</h5>
            <div class="mb-3 w-100">
                <input class="form-control text-center" value="${Math.floor(
                  calculoCalorias
                )} kcal" style="font-size: 2rem" disabled>
            </div>
            <h6 class="card-title h2">para el mantenimiento de su TBM</h6>
            <h6 class="card-title h2">Usted pertenece al grupo poblacional: <span class="grupoP">${grupoPoblacional}</span></h6>
        </div>
    `;
}

//Funcion para determinar el grupo poblacional
function determinarGrupoPoblacional(edad) {
  if (edad >= 15 && edad < 30) {
    return "Joven";
  } else if (edad >= 30 && edad < 60) {
    return "Adulto";
  } else if (edad >= 60 && edad < 100) {
    return "Adulto mayor";
  } else {
    return "Edad fuera de rango";
  }
}

// Funcion para el uso de solo texto con codigo ASCII
function soloTexto(evt) {
  var code = evt.which ? evt.which : evt.keyCode;

  if (code == 8) {
    // barra espaciadora
    return true;
  } else if (code >= 65 && code <= 90) {
    // letras
    return true;
  } else if (code >= 97 && code <= 122) {
    // letras
    return true;
  } else if (code == 32) {
    // espacio
    return true;
  } else {
    // otros valores
    return false;
  }
}

function soloNumeros(evt) {
  var code = evt.which ? evt.which : evt.keyCode;

  if (code == 8) {
    // backspace.
    return true;
  } else if (code >= 48 && code <= 57) {
    // is a number.
    return true;
  } else {
    // other keys.
    return false;
  }
}

//Funcion para limpiar inputs
function limpiarInputs() {
  nombrep.value = null;
  tipoDocumento.selectIndex = 0;
  NDocumento.value = null;
  Edad.value = null;
  peso.value = null;
  altura.value = null;
  actividad.value = null;
}

//Funcion para mostrar el mensaje de error
function mostrarMensajeDeError(msg) {
  const calculo = document.querySelector("#calculo");
  if (calculo) {
    calculo.remove();
  }

  const divError = document.createElement("div");
  divError.className = "d-flex justify-content-center align-items-center h-100";
  divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

  resultado.appendChild(divError);

  setTimeout(() => {
    divError.remove();
    desvanecerResultado();
  }, 5000);
}

// Animaciones
function aparecerResultado() {
  resultado.style.top = "100vh";
  resultado.style.display = "block";

  let distancia = 100;
  let resta = 0.3;
  let id = setInterval(() => {
    resta *= 1.1;
    resultado.style.top = `${distancia - resta}vh`;
    if (resta > 100) {
      clearInterval(id);
    }
  }, 10);
}

function desvanecerResultado() {
  let distancia = 1;

  let id = setInterval(() => {
    distancia *= 2;
    resultado.style.top = `${distancia}vh`;
    if (distancia > 100) {
      clearInterval(id);
      resultado.style.display = "none";
      resultado.style.top = 0;
    }
  }, 10);
}
