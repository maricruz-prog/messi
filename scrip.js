const formulario = document.getElementById("formulario");
const mensaje = document.getElementById("mensaje");
 
// Validar nombres y apellidos
const camposNombre = ["nombre", "paterno", "materno"];
 
camposNombre.forEach(id => {
    const campo = document.getElementById(id);
 
    campo.addEventListener("input", function () {
        // Convertir letras a minúsculas
        this.value = this.value.toLowerCase();
 
        // Permitir letras, acentos y espacios
        this.value = this.value.replace(/[^\p{L}\p{M}\s]/gu, "");
 
        // Máximo 100 caracteres
        this.value = this.value.slice(0, 100);
    });
});
 
// Validar edad: solo números y máximo 3 dígitos
const edad = document.getElementById("edad");
 
edad.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 3);
});
 
// Validar teléfono: solo números y máximo 10 dígitos
const telefono = document.getElementById("telefono");
 
telefono.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 10);
});
 
// Validar todos los campos al enviar
formulario.addEventListener("submit", function (event) {
    event.preventDefault();
 
    const nombre = document.getElementById("nombre").value.trim();
    const paterno = document.getElementById("paterno").value.trim();
    const materno = document.getElementById("materno").value.trim();
    const edadValor = edad.value;
    const telefonoValor = telefono.value;
    const email = document.getElementById("email").value.trim();
 
    mensaje.style.color = "red";
 
    if (!nombre || !paterno || !materno ||
        !edadValor || !telefonoValor || !email) {
        mensaje.textContent = "Completa todos los campos.";
        return;
    }
 
    // Comprobar que los nombres solo tengan letras y espacios
    const patronNombre = /^[\p{L}\p{M} ]{1,100}$/u;
 
    if (!patronNombre.test(nombre) ||
        !patronNombre.test(paterno) ||
        !patronNombre.test(materno)) {
        mensaje.textContent = "Verifica los nombres y apellidos.";
        return;
    }
 
    // Edad entre 1 y 120 años
    const numeroEdad = Number(edadValor);
 
    if (!/^\d{1,3}$/.test(edadValor) ||
        numeroEdad < 1 || numeroEdad > 120) {
        mensaje.textContent = "Ingresa una edad válida de 1 a 120.";
        return;
    }
 
    // El teléfono debe tener exactamente 10 dígitos
    if (!/^\d{10}$/.test(telefonoValor)) {
        mensaje.textContent = "El teléfono debe tener 10 dígitos.";
        return;
    }
 
    // Comprobar formato básico del correo
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
    if (!patronEmail.test(email)) {
        mensaje.textContent = "Ingresa un correo electrónico válido.";
        return;
    }
 
    mensaje.style.color = "green";
    mensaje.textContent = "¡Registro completado correctamente!";
 
    console.log({
        nombre: nombre,
        apellidoPaterno: paterno,
        apellidoMaterno: materno,
        edad: numeroEdad,
        telefono: telefonoValor,
        email: email
    });
});
 
// Borrar el mensaje al limpiar el formulario
formulario.addEventListener("reset", function () {
    mensaje.textContent = "";
});