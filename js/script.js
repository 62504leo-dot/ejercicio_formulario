document.addEventListener('DOMContentLoaded', () => {

    // --- NUEVO: 1. CREAR FONDO ANIMADO (Partículas Tech) ---
    function crearFondoAnimado() {
        const contenedor = document.getElementById('fondo-animado');
        const cantidadParticulas = 50; // Ajusta la cantidad si quieres más o menos

        for (let i = 0; i < cantidadParticulas; i++) {
            const particula = document.createElement('div');
            particula.classList.add('particula');
            
            // Posición horizontal aleatoria (0 a 100vw)
            particula.style.left = Math.random() * 100 + 'vw';
            // Tamaño aleatorio (un poco de variación)
            const tamano = Math.random() * 5 + 2; // entre 2px y 7px
            particula.style.width = tamano + 'px';
            particula.style.height = tamano + 'px';
            // Duración de caída aleatoria (entre 5s y 15s)
            const duracion = Math.random() * 10 + 5;
            particula.style.animationDuration = duracion + 's';
            // Retraso inicial aleatorio para que no caigan todas juntas
            particula.style.animationDelay = Math.random() * 5 + 's';
            // Opacidad aleatoria
            particula.style.opacity = Math.random() * 0.5 + 0.2;

            contenedor.appendChild(particula);
        }
    }
    // Ejecutar la animación
    crearFondoAnimado();


    // --- 2. CARGA DE PAÍSES ---
    const paises = ['México', 'Colombia', 'Argentina', 'Chile', 'Perú', 'España', 'Estados Unidos'];
    const selectPais = document.getElementById('pais');
    
    selectPais.innerHTML = '<option value="">Selecciona tu país...</option>';
    paises.forEach(pais => {
        const opcion = document.createElement('option');
        opcion.value = pais.toLowerCase();
        opcion.textContent = pais;
        selectPais.appendChild(opcion);
    });

    // --- 3. LÓGICA DE VALIDACIÓN EN TIEMPO REAL (ROJO/VERDE) ---
    const formulario = document.getElementById('formulario');
    const inputs = {
        nombre: document.getElementById('nombre'),
        email: document.getElementById('email'),
        telefono: document.getElementById('telefono'),
        archivo: document.getElementById('archivo')
    };
    const msgExito = document.getElementById('mensaje-exito');

    // Función para pintar Rojo o Verde
    const validarCampo = (input, condicion, msgError, idError) => {
        const span = document.getElementById(idError);
        const elementoVisual = input.type === 'file' ? input.parentElement : input;

        if (condicion) {
            // VERDE (Correcto)
            elementoVisual.classList.remove('input-error');
            elementoVisual.classList.add('input-exito');
            span.textContent = ''; 
            return true;
        } else {
            // ROJO (Incorrecto)
            elementoVisual.classList.remove('input-exito');
            elementoVisual.classList.add('input-error');
            span.textContent = msgError;
            return false;
        }
    };

    // Validaciones individuales
    const checkNombre = () => validarCampo(inputs.nombre, inputs.nombre.value.trim() !== '', '⚠️ El nombre es obligatorio', 'error-nombre');
    const checkEmail = () => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return validarCampo(inputs.email, regexEmail.test(inputs.email.value), '⚠️ Correo inválido (falta @ o .)', 'error-email');
    };
    const checkTelefono = () => {
        const regexTel = /^[0-9]{10}$/;
        return validarCampo(inputs.telefono, regexTel.test(inputs.telefono.value), '⚠️ Debe tener 10 dígitos exactos', 'error-telefono');
    };
    const checkArchivo = () => {
        let valido = false;
        if (inputs.archivo.files.length > 0) {
            const tipo = inputs.archivo.files[0].type;
            if (tipo === 'application/pdf' || tipo.startsWith('image/')) valido = true;
        }
        return validarCampo(inputs.archivo, valido, '⚠️ Sube PDF o Imagen', 'error-archivo');
    };

    // Eventos "tiempo real"
    inputs.nombre.addEventListener('input', checkNombre);
    inputs.email.addEventListener('input', checkEmail);
    inputs.telefono.addEventListener('input', checkTelefono);
    inputs.archivo.addEventListener('change', checkArchivo);

    // Evento Enviar (Botón)
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombreOk = checkNombre();
        const emailOk = checkEmail();
        const telOk = checkTelefono();
        const archivoOk = checkArchivo();

        if (nombreOk && emailOk && telOk && archivoOk) {
            msgExito.textContent = "¡REGISTRO EXITOSO! Bienvenido a la era de la IA. 🎉";
            msgExito.style.color = "#2ecc71";
            setTimeout(() => {
                formulario.reset();
                document.querySelectorAll('.input-exito').forEach(el => el.classList.remove('input-exito'));
                msgExito.textContent = "";
            }, 4000);
        } else {
            msgExito.textContent = "Por favor corrige los campos marcados.";
            msgExito.style.color = "#e74c3c";
        }
    });
});