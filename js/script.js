document.addEventListener('DOMContentLoaded', () => {

    // 1. CARGA DINÁMICA DE PAÍSES (REQUISITO)
    const paises = ['México', 'Colombia', 'Argentina', 'Chile', 'Perú', 'España', 'Estados Unidos', 'Brasil'];
    const selectPais = document.getElementById('pais');
    
    // Limpiamos y llenamos
    selectPais.innerHTML = '<option value="">Selecciona tu país...</option>';
    paises.forEach(pais => {
        const opcion = document.createElement('option');
        opcion.value = pais.toLowerCase();
        opcion.textContent = pais;
        selectPais.appendChild(opcion);
    });

    // 2. VALIDACIÓN DEL FORMULARIO
    const formulario = document.getElementById('formulario');

    formulario.addEventListener('submit', (e) => {
        e.preventDefault(); // Evitamos recarga
        
        // Resetear estilos de error
        limpiarErrores();
        
        let esValido = true;

        // Validar Nombre
        const nombre = document.getElementById('nombre');
        if(nombre.value.trim() === '') {
            mostrarError('error-nombre', 'El nombre es obligatorio', nombre);
            esValido = false;
        }

        // Validar Email (HTML5 type="email" ayuda, pero JS valida formato)
        const email = document.getElementById('email');
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regexEmail.test(email.value)) {
            mostrarError('error-email', 'Ingresa un correo válido', email);
            esValido = false;
        }

        // Validar Teléfono (10 dígitos exactos)
        const telefono = document.getElementById('telefono');
        const regexTel = /^[0-9]{10}$/;
        if(!regexTel.test(telefono.value)) {
            mostrarError('error-telefono', 'Debe ser de 10 dígitos numéricos', telefono);
            esValido = false;
        }

        // Validar Archivo (Obligatorio, PDF o Imagen)
        const archivo = document.getElementById('archivo');
        if(archivo.files.length === 0) {
            mostrarError('error-archivo', 'Debes subir tu identificación', archivo.parentElement); // Marcamos el contenedor
            esValido = false;
        } else {
            const tipo = archivo.files[0].type;
            if(tipo !== 'application/pdf' && !tipo.startsWith('image/')) {
                mostrarError('error-archivo', 'Formato inválido. Solo PDF o Imagen', archivo.parentElement);
                esValido = false;
            }
        }

        // Si pasa todas las validaciones
        if(esValido) {
            const mensajeExito = document.getElementById('mensaje-exito');
            mensajeExito.textContent = "¡Registro Exitoso! Bienvenido.";
            console.log("Formulario enviado correctamente.");
            
            // Opcional: Limpiar formulario tras 3 segundos
            setTimeout(() => {
                mensajeExito.textContent = "";
                formulario.reset();
            }, 3000);
        }
    });

    // Funciones auxiliares
    function mostrarError(idElementoMsg, mensaje, elementoInput) {
        document.getElementById(idElementoMsg).textContent = mensaje;
        if(elementoInput) {
            elementoInput.classList.add('input-error');
        }
    }

    function limpiarErrores() {
        // Borrar textos
        const msgs = document.querySelectorAll('.error-msg');
        msgs.forEach(m => m.textContent = '');
        
        // Quitar bordes rojos
        const inputsErr = document.querySelectorAll('.input-error');
        inputsErr.forEach(i => i.classList.remove('input-error'));

        document.getElementById('mensaje-exito').textContent = '';
    }
});