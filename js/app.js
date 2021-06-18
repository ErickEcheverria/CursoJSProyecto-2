//Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail')

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', iniciarAplicacion);

    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    // Boton de enviar en el submit
    formularioEnviar.addEventListener('submit', enviarEmail);

    // Boton de reset
    resetBtn.addEventListener('click', resetFormulario);

}

// Funciones
function iniciarAplicacion(){
    btnEnviar.disable = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
    btnReset.disable = true;
    btnReset.classList.add('cursor-not-allowed', 'opacity-50');
}

function validarFormulario(e){

    if(e.target.value.length > 0){
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }
        
        e.target.classList.remove('border','border-red-800');
        e.target.classList.add('border','border-green-500');

        
    }else{
        e.target.classList.remove('border','border-green-500');
        e.target.classList.add('border','border-red-800');

        mostrarError('Campos Obligatorios!!!');
    }


    if(e.target.type === 'email'){
        const expresionregular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(expresionregular.test(e.target.value)){
            const error = document.querySelector('p.error');
            if(error){
            error.remove();
        }
            
            e.target.classList.remove('border','border-red-800');
            e.target.classList.add('border','border-green-500');
        }else{
            e.target.classList.remove('border','border-green-500');
            e.target.classList.add('border','border-red-800');

            mostrarError('El Correo NO tiene dominio!!!');
        }
    }

    if(email.value !== '' && asunto.value !== '' && mensaje.value !== '' ) {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('opacity-50');
        btnEnviar.classList.remove('cursor-not-allowed');
     }

     if(email.value !== '' || asunto.value !== '' || mensaje.value || '' ) {
        btnReset.disabled = false;
        btnReset.classList.remove('opacity-50');
        btnReset.classList.remove('cursor-not-allowed');
     }


}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent=mensaje;
    mensajeError.classList.add('border','border-red-500','background-red-100','text-red-500','p-3','mt-5','text-center','error');

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0){
        formulario.insertBefore(mensajeError,document.querySelector('.mb-10'));
    }
}

function enviarEmail(e) {

    e.preventDefault();


     // Spinner al presionar Enviar
     const spinner = document.querySelector('#spinner');
     spinner.style.display = 'flex';

     // Gif que envia email
     const enviado = document.createElement('p');
     enviado.textContent = 'Mensaje Enviado Correctamente';
     enviado.classList.add('bg')

     // Ocultar Spinner y mostrar gif de enviado
     setTimeout( () => {
          spinner.style.display = 'none';

          document.querySelector('#loaders').appendChild( enviado );

          setTimeout(() =>  {
               enviado.remove();
               formularioEnviar.reset();
          }, 5000);
     }, 3000);

     
}

function resetFormulario(e) {
    formularioEnviar.reset();
    e.preventDefault();
}