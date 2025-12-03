document.addEventListener('DOMContentLoaded', () => {

    // 1. FONDO ANIMADO
    function crearFondoAnimado() {
        const contenedor = document.getElementById('fondo-animado');
        const cantidadParticulas = 50; 
        for (let i = 0; i < cantidadParticulas; i++) {
            const particula = document.createElement('div');
            particula.classList.add('particula');
            particula.style.left = Math.random() * 100 + 'vw';
            const tamano = Math.random() * 5 + 2;
            particula.style.width = tamano + 'px';
            particula.style.height = tamano + 'px';
            particula.style.animationDuration = (Math.random() * 10 + 5) + 's';
            particula.style.animationDelay = Math.random() * 5 + 's';
            particula.style.opacity = Math.random() * 0.5 + 0.2;
            contenedor.appendChild(particula);
        }
    }
    crearFondoAnimado();

    // 2. PAÍSES
    const paises = ['México', 'Colombia', 'Argentina', 'Chile', 'Perú', 'España', 'Estados Unidos'];
    const selectPais = document.getElementById('pais');
    selectPais.innerHTML = '<option value="">Selecciona tu país...</option>';
    paises.forEach(pais => {
        const opcion = document.createElement('option');
        opcion.value = pais.toLowerCase();
        opcion.textContent = pais;
        selectPais.appendChild(opcion);
    });

    // 3. REFERENCIAS
    const formulario = document.getElementById('formulario');
    const inputs = {
        nombre: document.getElementById('nombre'),
        email: document.getElementById('email'),
        telefono: document.getElementById('telefono'),
        archivo: document.getElementById('archivo')
    };
    
    // Referencias del Modal
    const modal = document.getElementById('modal-exito');
    const btnCerrarModal = document.getElementById('btn-cerrar-modal');

    // 4. VALIDAR (ROJO/VERDE)
    const validarCampo = (input, condicion, msgError, idError) => {
        const span = document.getElementById(idError);
        const elementoVisual = input.type === 'file' ? input.parentElement : input;

        if (condicion) {
            elementoVisual.classList.remove('input-error');
            elementoVisual.classList.add('input-exito');
            span.textContent = ''; 
            return true;
        } else {
            elementoVisual.classList.remove('input-exito');
            elementoVisual.classList.add('input-error');
            span.textContent = msgError;
            return false;
        }
    };

    const checkNombre = () => validarCampo(inputs.nombre, inputs.nombre.value.trim() !== '', '⚠️ Nombre obligatorio', 'error-nombre');
    const checkEmail = () => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return validarCampo(inputs.email, regexEmail.test(inputs.email.value), '⚠️ Email inválido', 'error-email');
    };
    const checkTelefono = () => {
        const regexTel = /^[0-9]{10}$/;
        return validarCampo(inputs.telefono, regexTel.test(inputs.telefono.value), '⚠️ 10 dígitos requeridos', 'error-telefono');
    };
    const checkArchivo = () => {
        let valido = false;
        if (inputs.archivo.files.length > 0) {
            const tipo = inputs.archivo.files[0].type;
            if (tipo === 'application/pdf' || tipo.startsWith('image/')) valido = true;
        }
        return validarCampo(inputs.archivo, valido, '⚠️ Sube PDF/Imagen', 'error-archivo');
    };

    inputs.nombre.addEventListener('input', checkNombre);
    inputs.email.addEventListener('input', checkEmail);
    inputs.telefono.addEventListener('input', checkTelefono);
    inputs.archivo.addEventListener('change', checkArchivo);

    // 5. ENVIAR FORMULARIO
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombreOk = checkNombre();
        const emailOk = checkEmail();
        const telOk = checkTelefono();
        const archivoOk = checkArchivo();

        if (nombreOk && emailOk && telOk && archivoOk) {
            // --- AQUÍ MOSTRAMOS LA VENTANA MODAL ---
            modal.classList.add('activo');
        } 
    });

    // 6. CERRAR MODAL Y RESETEAR
    btnCerrarModal.addEventListener('click', () => {
        modal.classList.remove('activo'); // Ocultar ventana
        formulario.reset(); // Limpiar formulario
        // Quitar verdes
        document.querySelectorAll('.input-exito').forEach(el => el.classList.remove('input-exito'));
    });
});