document.addEventListener('DOMContentLoaded', () => {

    // --- 1. REQUISITO: SELECT DINÁMICO ---
    // (Llena el país desde este array, no desde el HTML)
    const paises = ['México', 'Colombia', 'Argentina', 'Chile', 'Perú', 'España', 'Estados Unidos'];
    const selectPais = document.getElementById('pais');
    
    selectPais.innerHTML = '<option value="">Selecciona tu país...</option>';
    paises.forEach(pais => {
        const opcion = document.createElement('option');
        opcion.value = pais.toLowerCase();
        opcion.textContent = pais;
        selectPais.appendChild(opcion);
    });

    // --- 2. REQUISITO: VALIDACIONES AL DAR CLICK ---
    const formulario = document.getElementById('formulario');

    formulario.addEventListener('submit', (e) => {
        // AQUI ESTÁ LA CLAVE: Evitamos que se envíe si hay errores
        e.preventDefault(); 
        
        // Limpiamos errores viejos para volver a validar
        limpiarErrores();
        
        let esValido = true; // Asumimos que todo está bien hasta que encontremos un error

        // --- VALIDACIÓN 1: NOMBRE OBLIGATORIO ---
        const nombre = document.getElementById('nombre');
        if(nombre.value.trim() === '') {
            // Aquí mandamos el "Mensaje Personalizado" que pide la imagen
            mostrarError('error-nombre', '⚠️ El nombre es obligatorio', nombre);
            esValido = false;
        }

        // --- VALIDACIÓN 2: EMAIL VÁLIDO ---
        const email = document.getElementById('email');
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Fórmula mágica para emails
        if(!regexEmail.test(email.value)) {
            mostrarError('error-email', '⚠️ Ingresa un correo válido (ej: hola@sitio.com)', email);
            esValido = false;
        }

        // --- VALIDACIÓN 3: TELÉFONO 10 DÍGITOS ---
        const telefono = document.getElementById('telefono');
        const regexTel = /^[0-9]{10}$/; // Solo acepta 10 números exactos
        if(!regexTel.test(telefono.value)) {
            mostrarError('error-telefono', '⚠️ El teléfono debe tener 10 números exactos', telefono);
            esValido = false;
        }

        // --- VALIDACIÓN 4: ARCHIVO (OBLIGATORIO Y TIPO) ---
        const archivo = document.getElementById('archivo');
        if(archivo.files.length === 0) {
            // Si no subió nada
            mostrarError('error-archivo', '⚠️ Debes subir tu identificación', archivo.parentElement);
            esValido = false;
        } else {
            // Si subió algo, revisamos que sea PDF o Imagen
            const tipo = archivo.files[0].type;
            if(tipo !== 'application/pdf' && !tipo.startsWith('image/')) {
                mostrarError('error-archivo', '⚠️ Formato inválido. Solo aceptamos PDF o Imágenes', archivo.parentElement);
                esValido = false;
            }
        }

        // --- SI TODO ESTÁ BIEN (esValido sigue siendo true) ---
        if(esValido) {
            const mensajeExito = document.getElementById('mensaje-exito');
            mensajeExito.textContent = "¡Registro enviado correctamente! ✅";
            console.log("Formulario válido, enviando...");
            
            // Opcional: Borrar el formulario después de 3 segundos
            setTimeout(() => {
                mensajeExito.textContent = "";
                formulario.reset();
            }, 3000);
        }
    });

    // --- FUNCIONES QUE PINTAN EL ERROR EN LA PANTALLA ---
    function mostrarError(idElementoTexto, textoError, elementoInput) {
        // 1. Busca el <span> pequeñito debajo del input
        const elementoError = document.getElementById(idElementoTexto);
        // 2. Le pone el texto del error
        elementoError.textContent = textoError;
        // 3. Pinta el borde del input de color rojo
        if(elementoInput) {
            elementoInput.classList.add('input-error');
        }
    }

    function limpiarErrores() {
        // Borra todos los textos de error
        const msgs = document.querySelectorAll('.error-msg');
        msgs.forEach(m => m.textContent = '');
        
        // Quita los bordes rojos
        const inputsErr = document.querySelectorAll('.input-error');
        inputsErr.forEach(i => i.classList.remove('input-error'));

        document.getElementById('mensaje-exito').textContent = '';
    }
});