document.addEventListener('DOMContentLoaded', () => {

    // 1. ANIMACIÓN DE FONDO
    function crearFondoAnimado() {
        const contenedor = document.getElementById('fondo-animado');
        const cantidad = 50; 
        for (let i = 0; i < cantidad; i++) {
            const p = document.createElement('div');
            p.classList.add('particula');
            p.style.left = Math.random() * 100 + 'vw';
            const size = Math.random() * 5 + 2;
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.animationDuration = (Math.random() * 10 + 5) + 's';
            p.style.animationDelay = Math.random() * 5 + 's';
            p.style.opacity = Math.random() * 0.5 + 0.2;
            contenedor.appendChild(p);
        }
    }
    crearFondoAnimado();

    // 2. PAÍSES
    const paises = ['México', 'Colombia', 'Argentina', 'Chile', 'Perú', 'España', 'Estados Unidos'];
    const select = document.getElementById('pais');
    select.innerHTML = '<option value="">Selecciona tu país...</option>';
    paises.forEach(pais => {
        const op = document.createElement('option');
        op.value = pais.toLowerCase();
        op.textContent = pais;
        select.appendChild(op);
    });

    // 3. REFERENCIAS
    const formulario = document.getElementById('formulario');
    const modal = document.getElementById('modal-exito');
    const btnCerrar = document.getElementById('btn-cerrar-modal');
    
    const inputs = {
        nombre: document.getElementById('nombre'),
        email: document.getElementById('email'),
        telefono: document.getElementById('telefono'),
        archivo: document.getElementById('archivo')
    };

    // 4. FUNCIÓN VALIDAR (ROJO/VERDE)
    const validarCampo = (input, condicion, msg, idError) => {
        const span = document.getElementById(idError);
        const elVisual = input.type === 'file' ? input.parentElement : input;

        if (condicion) {
            elVisual.classList.remove('input-error');
            elVisual.classList.add('input-exito');
            span.textContent = ''; 
            return true;
        } else {
            elVisual.classList.remove('input-exito');
            elVisual.classList.add('input-error');
            span.textContent = msg;
            return false;
        }
    };

    // Funciones individuales
    const checkNombre = () => validarCampo(inputs.nombre, inputs.nombre.value.trim() !== '', '⚠️ Nombre obligatorio', 'error-nombre');
    const checkEmail = () => validarCampo(inputs.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email.value), '⚠️ Email inválido', 'error-email');
    const checkTelefono = () => validarCampo(inputs.telefono, /^[0-9]{10}$/.test(inputs.telefono.value), '⚠️ 10 dígitos', 'error-telefono');
    const checkArchivo = () => {
        let ok = false;
        if(inputs.archivo.files.length > 0) {
            const t = inputs.archivo.files[0].type;
            if(t === 'application/pdf' || t.startsWith('image/')) ok = true;
        }
        return validarCampo(inputs.archivo, ok, '⚠️ PDF o Imagen', 'error-archivo');
    };

    // Eventos tiempo real
    inputs.nombre.addEventListener('input', checkNombre);
    inputs.email.addEventListener('input', checkEmail);
    inputs.telefono.addEventListener('input', checkTelefono);
    inputs.archivo.addEventListener('change', checkArchivo);

    // 5. ENVIAR Y MOSTRAR MODAL
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const v1 = checkNombre();
        const v2 = checkEmail();
        const v3 = checkTelefono();
        const v4 = checkArchivo();

        if (v1 && v2 && v3 && v4) {
            // AQUÍ APARECE LA VENTANA (Agregando la clase 'activo')
            modal.classList.add('activo');
        }
    });

    // 6. CERRAR MODAL
    btnCerrar.addEventListener('click', () => {
        modal.classList.remove('activo');
        formulario.reset();
        document.querySelectorAll('.input-exito').forEach(el => el.classList.remove('input-exito'));
    });
});