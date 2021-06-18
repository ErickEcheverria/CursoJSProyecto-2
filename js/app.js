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


    btnReset.addEventListener('click', resetFormulario);
    formulario.addEventListener('submit', enviarEmail);
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

     setTimeout(() =>{
        spinner.style.display = 'none';

        const parrafo = document.createElement('p');
        parrafo.textContent='El mensaje se envio!!!';
        parrafo.classList.add('text-center','my-10','p-2','bg-green-500','text-white','font-bold','uppercase')

        formulario.insertBefore(parrafo,spinner);
        
        setTimeOut(()=>{
            parrafo.remove();
            resetFormulario();
        },500);

     },3000);

     
}

function resetFormulario() {
    formulario.reset();
    iniciarAplicacion();
}