import { Tarea } from "../classes";

import { listaTareas } from '../index';

// Referencias en el HTML
const divListaTareas = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrarCompletados = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const marcoEnlaceFiltros = document.querySelectorAll('.filtro');

//Crea cada item con la tarea
export const creatTareaHtml = (tarea) => {
    // El código html lo cogemos del index, donde se crea de manera estática una tarea
    const htmlTarea = `
        <li class="${ (tarea.completado) ? 'completed' : ''}" data-id="${tarea.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${ (tarea.completado) ? 'checked' : ''}>
                <label>${tarea.nombre}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>`;

    //Nos creamos un div para poder insertar el código html
    const divTarea = document.createElement('div');
    divTarea.innerHTML = htmlTarea;

    //En lugar del div completo, al ser una lista (<ul>) añadimos su primer elemento (<li)
    divListaTareas.append(divTarea.firstElementChild);

    return divTarea;
}

//Eventos
txtInput.addEventListener('keyup', (event) => {
    if ( event.keyCode === 13 && txtInput.value.length > 0 ) {
        //Enter--> se debe almacenar en la lista de tareas y mostrarlo en el HTML
        const nuevaTarea = new Tarea(txtInput.value);
        //Utilizamos la const definida en index.js
        listaTareas.annadirTarea(nuevaTarea);

        creatTareaHtml(nuevaTarea);

        txtInput.value = '';
    }
});

divListaTareas.addEventListener('click' , (event) => {
    //Hacer click en el check de completado o en el aspa para eliminar
    const nombreElemento = event.target.localName; // input, label, button
    const elementoListaTarea = event.target.parentElement.parentElement; //li
    const idTareaCompletada = elementoListaTarea.getAttribute('data-id');
    console.log(idTareaCompletada);
    
    if(nombreElemento.includes('input')) { // check
        listaTareas.marcarCompletada(idTareaCompletada);
        //Se incluye la clase completed en el li (si no la tiene ya)
        elementoListaTarea.classList.toggle('completed');
   
    } else if(nombreElemento.includes('button')) { // aspa
        listaTareas.eliminarCompletadas(idTareaCompletada);
        divListaTareas.removeChild(elementoListaTarea);
    }

    console.log(listaTareas);
});

btnBorrarCompletados.addEventListener('click' , () => {
    listaTareas.eliminarCompletadas();
    
    // Recorremos los li desde el final hasta el principio
    for (let i = divListaTareas.children.length-1; i >= 0; i--) {
        const tareaTemp = divListaTareas.children[i];
        
        if(tareaTemp.classList.contains('completed')) {
            //Eliminamos las tareas que tengan el class completed
            divListaTareas.removeChild(tareaTemp);
        }
    }
});

ulFiltros.addEventListener('click' , (event) => {
    const filtroPulsado = event.target;
    const txtfiltroPulsado = event.target.text;
    if (!filtroPulsado) {
        // cuando pulsamos entre un filtro y otro
        return;
    }

    // Quitamos los marcos a los enlaces y se lo ponemos sólo al que está funcionando
    marcoEnlaceFiltros.forEach( enlace => enlace.classList.remove('selected'));
    filtroPulsado.classList.add('selected');
    
    for (const tarea of divListaTareas.children) {
        // De primeras muestro todas, y luego ocultaré las que no cumplan el filtro
        tarea.classList.remove('hidden');
        const tareaCompletada = tarea.classList.contains('completed');

        switch (txtfiltroPulsado) {
            case 'Pendientes':
                if (tareaCompletada) {
                    tarea.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!tareaCompletada) {
                    tarea.classList.add('hidden');
                }
                break;

            default:
                break;
        }
    }
});
