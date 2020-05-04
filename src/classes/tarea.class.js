
export class Tarea {

    //static fromJsonToTarea (obj) {
    //    const tempTarea = new Tarea(obj.nombre);
    //    tempTarea.id = obj.id;
    //    tempTarea.completada = obj.completada;
    //    tempTarea.creada = obj.creada;
    //    return tempTarea;
    //}

    static fromJsonToTarea ({id, nombre, completada, creada}) {
        const tempTarea = new Tarea(nombre);
        tempTarea.id = id;
        tempTarea.completada = completada;
        tempTarea.creada = creada;

        return tempTarea;
    }


    constructor(nombre) {
        this.nombre = nombre;
        this.creada = new Date();
        this.id = this.creada.getTime(); //Momento de creación
        this.completada = false;
        
    }

}
