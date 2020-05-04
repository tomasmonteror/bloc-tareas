import { Tarea } from "./tarea.class";

export class ListaTareas {
    constructor() {
        //this.arrTareas = [];
        this.cargarTareasLocalStorage();
    }

    annadirTarea (tarea) {
        this.arrTareas.push(tarea);
        this.guardarTareasLocalStorage();
    }

    eliminarTarea(id) {
        // Se obtiene un nuevo array con todas las tareas menos la que tenga el id recibido
        this.arrTareas = this.arrTareas.filter ( tarea => tarea.id != id);
        this.guardarTareasLocalStorage();
    }

    marcarCompletada(id) {
        for (const tarea of this.arrTareas) {
            if (tarea.id == id) {
                tarea.completada = !tarea.completada;
                break;
            }
        }
    }

    eliminarCompletadas() {
         // Se obtiene un nuevo array con todas las tareas menos las completadas
         this.arrTareas = this.arrTareas.filter ( tarea => !tarea.completada);
         this.guardarTareasLocalStorage();
    }

    guardarTareasLocalStorage() {
        //localStorage.setItem('tareas', this.arrTareas); // No, se deben meter JSON
        localStorage.setItem('tareas', JSON.stringify(this.arrTareas)); // clave-valor
    }

    cargarTareasLocalStorage() {
        //Si se han almacenado tareas, se obtienen, pero son instancias de Object, no de Tarea
        this.arrTareas = (localStorage.getItem('tareas')) 
                             ? JSON.parse(localStorage.getItem('tareas')) :
                                [];

        //NO es obligatorio, pero cada elemento del array lo convierto a Tarea
        this.arrTareas = this.arrTareas.map(Tarea.fromJsonToTarea);
        //Tarea.fromJsonToTarea equivale a obj => Tarea.fromJsonToTarea(obj)
    }

}
