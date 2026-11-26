// Elementos del DOM
const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");
const fechaInput = document.getElementById("fecha");


// Obtener la fecha mínima permitida (mañana)
function fechaMinima() {

    const fecha = new Date();
    fecha.setDate(fecha.getDate() + 1);

    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");

    return `${anio}-${mes}-${dia}`;
}

fechaInput.min = fechaMinima();


// Evento para procesar el formulario
formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    // Obtener los valores del formulario
    const nombre = document.getElementById("nombre").value.trim();

    const correo = document.getElementById("correo").value.trim();

    const telefono = document.getElementById("telefono").value.trim();

    const fecha = fechaInput.value;

    const archivo = document.getElementById("archivo").files[0];


    // Obtener los intereses seleccionados
    const intereses = Array.from(
        document.querySelectorAll('input[name="intereses"]:checked')
    ).map(opcion => opcion.value);


    // Obtener el horario seleccionado
    const horario = document.querySelector(
        'input[name="horario"]:checked'
    );


    // Arreglo para guardar los errores
    let errores = [];


    // Validación 1: nombre
    if (nombre.length < 3) {
        errores.push(
            "El nombre debe contener al menos 3 caracteres."
        );
    }


    // Validación 2: correo electrónico
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(correo)) {
        errores.push(
            "Ingresa un correo electrónico válido."
        );
    }


    // Validación 3: teléfono
    const formatoTelefono = /^\d{10}$/;

    if (!formatoTelefono.test(telefono)) {
        errores.push(
            "El teléfono debe contener exactamente 10 dígitos."
        );
    }


    // Validación 4: intereses
    if (intereses.length === 0) {
        errores.push(
            "Selecciona al menos un interés."
        );
    }


    // Validación 5: horario
    if (!horario) {
        errores.push(
            "Selecciona un horario."
        );
    }


    // Validación 6: fecha
    fechaInput.min = fechaMinima();

    if (!fecha || fecha < fechaInput.min) {
        errores.push(
            "Selecciona una fecha futura para el evento."
        );
    }


    // Validación 7: archivo opcional
    if (archivo) {

        const tiposPermitidos = [
            "application/pdf",
            "image/jpeg",
            "image/png"
        ];

        const tamanoMaximo = 2 * 1024 * 1024;

        if (!tiposPermitidos.includes(archivo.type)) {
            errores.push(
                "El archivo debe ser PDF, JPG o PNG."
            );
        }

        if (archivo.size > tamanoMaximo) {
            errores.push(
                "El archivo no debe superar los 2 MB."
            );
        }
    }


    // Mostrar errores si existen
    if (errores.length > 0) {

        resultado.className = "error";

        resultado.textContent =
            errores.join("\n");

        return;
    }


    // Registro simulado exitoso
    resultado.className = "exito";

    resultado.textContent =
        `¡Registro de prueba exitoso!\n\n` +
        `Nombre: ${nombre}\n` +
        `Correo: ${correo}\n` +
        `Teléfono: ${telefono}\n` +
        `Intereses: ${intereses.join(", ")}\n` +
        `Horario: ${horario.value}\n` +
        `Fecha: ${fecha}\n` +
        `Archivo: ${archivo ? archivo.name : "Ninguno"}`;

    console.log("Formulario validado correctamente.");

    formulario.reset();

});