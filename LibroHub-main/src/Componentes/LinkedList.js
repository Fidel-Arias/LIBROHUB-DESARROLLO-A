class Nodo {
    constructor(valor) {
        this.next = null;
        this.prev = null;
        this.valor = valor; 
    }
}

class Lista {
    constructor() {
        this.init = null;
        this.last = null;
    }

    agregar(libro) {
        const nuevo = new Nodo(libro);
        if (!this.init) {
            this.init = nuevo;
            this.last = nuevo;
        } else {
            this.last.next = nuevo;
            nuevo.prev = this.last;
            this.last = nuevo;
        }
    }

    obtenerLibros() {
        let nodo = this.init;
        const libros = [];
        while (nodo) {
            libros.push(nodo.valor);
            nodo = nodo.next; 
        }

        return libros.sort((a, b) => a.autor.localeCompare(b.autor));
    }
}

export default Lista;
