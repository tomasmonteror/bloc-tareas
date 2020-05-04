import './styles.css';
import { Tarea, ListaTareas } from './classes';
import { creatTareaHtml } from './js/componentes';


//La exportamos para poderla usar fuera
export const listaTareas = new ListaTareas();

// Se crea una tarea en html por cada objeto almacenado en el localStorage
listaTareas.arrTareas.forEach(tarea => creatTareaHtml(tarea));



// Al principio creábamos a mano una tarea, tanto como objeto como en el html
//const tarea =  new Tarea('Aprender JS moderno');
//listaTareas.annadirTarea(tarea);
//console.log(listaTareas);
//creatTareaHtml(tarea);

//LocalStorage por cada dominio. Es visible para el usuario --> No almacenar nunca contraseñas, etc.
//localStorage.setItem('miClave', '123');

//Se puede poner un timeout
//setTimeout( () => {
//  localStorage.removeItem('miClave');  
//}, 10000);