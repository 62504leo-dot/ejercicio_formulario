document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CARGA DE PAÍSES ---
    const paises = ['México', 'Colombia', 'Argentina', 'Chile', 'Perú', 'España', 'Estados Unidos'];
    const selectPais = document.getElementById('pais');
    
    selectPais.innerHTML = '<option value="">Selecciona tu país...</option>';
    paises.forEach(pais => {
        const opcion = document.createElement('option');
        opcion.value = pais.toLowerCase();
        opcion.textContent = pais;
        selectPais.appendChild(opcion);
    });

    // --- 2. REFERENCIAS A LOS ELEMENTOS ---
    const formulario = document.getElementById('formulario');
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');
    const archivo = document.getElementById('archivo');
    const msgExito = document.getElementById('mensaje-exito');

    // --- 3. FUNCIONES DE VALIDACIÓN INDIVIDUAL (Para usar en tiempo real) ---
    
    // Función que pinta Verde (Éxito) o Rojo (Error)
    const validarCampo = (input, idError, esValido, msgError) => {
        const spanError = document.getElementById(idError);
        
        if (esValido) {
            // SI ES CORRECTO: Quita rojo, pone verde, borra mensaje
            input.classList.remove('input-error');
            input.classList.add('input-exito');
            spanError.textContent = '';
            return true;
        } else {
            // SI ES INCORRECTO: Quita verde, pone rojo, muestra mensaje
            input.classList.remove('input-exito');
            input.classList.add('input-error');
            spanError.textContent = msgError;
            return false;
        }
    };

    // Validar Nombre
    const checkNombre = () => {
        const valido = nombre.value.trim() !== '';
        return validarCampo(nombre, 'error-nombre', valido, '⚠️ El nombre es obligatorio');
    };

    // Validar Email
    const checkEmail = () => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const valido = regexEmail.test(email.value);
        return validarCampo(email, 'error-email', valido, '⚠️ Correo inválido');
    };

    // Validar Teléfono
    const checkTelefono = () => {
        const regexTel = /^[0-9]{10}$/;
        const valido = regexTel.test(telefono.value);
        return validarCampo(telefono, 'error-telefono', valido, '⚠️ Deben ser 10 dígitos');
    };

    // Validar Archivo
    const checkArchivo = () => {
        // Validamos si hay archivo y el tipo
        let valido = false;
        let msg = '';

        if (archivo.files.length === 0) {
            msg = '⚠️ Sube tu identificación';
        } else {
            const tipo = archivo.files[0].type;
            if (tipo !== 'application/pdf' && !tipo.startsWith('image/')) {
                msg = '⚠️ Solo PDF o Imágenes';
            } else {
                valido = true;
            }
        }
        // Nota: para el archivo pasamos el parentElement para pintar el borde del contenedor
        const contenedorArchivo = archivo.parentElement; 
        
        const spanError = document.getElementById('error-archivo');
        if(valido) {
            contenedorArchivo.classList.remove('input-error');
            contenedorArchivo.classList.add('input-exito');
            spanError.textContent = '';
        } else {
            contenedorArchivo.classList.remove('input-exito');
            contenedorArchivo.classList.add('input-error');
            spanError.textContent = msg;
        }
        return valido;
    };

    // --- 4. EVENTOS EN TIEMPO REAL (LO QUE PEDISTE) ---
    // Esto hace que se ponga verde o rojo MIENTRAS escribes
    nombre.addEventListener('input', checkNombre);
    email.addEventListener('input', checkEmail);
    telefono.addEventListener('input', checkTelefono);
    archivo.addEventListener('change', checkArchivo); // Archivos usan 'change'

    // --- 5. EVENTO SUBMIT (VALIDACIÓN FINAL) ---
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        // Ejecutamos todas las validaciones
        const nombreOk = checkNombre();
        const emailOk = checkEmail();
        const telOk = checkTelefono();
        const fileOk = checkArchivo();

        // Si TODAS son true (verdaderas)
        if (nombreOk && emailOk && telOk && fileOk) {
            msgExito.textContent = "¡EXITOSO! Todos los datos son correctos. 🎉";
            msgExito.style.color = "#2ecc71"; // Texto verde
            
            // Simular envío
            console.log("Enviando...");
            setTimeout(() => {
                formulario.reset();
                // Quitar clases verdes de todos los inputs
                document.querySelectorAll('.input-exito').forEach(el => el.classList.remove('input-exito'));
                msgExito.textContent = "";
            }, 4000);
        } else {
            msgExito.textContent = "Por favor corrige los campos en rojo.";
            msgExito.style.color = "#e74c3c"; // Texto rojo
        }
    });
});