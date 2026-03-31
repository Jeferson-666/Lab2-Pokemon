//Historia 1 Jeferson

// Clase Pokémon
export class Pokemon {

    // Constructor:
    constructor(nombre, tipos, habilidad, movimiento, imagen) {
        this.nombre = nombre;         // Nombre del Pokémon
        this.tipos = tipos;           // Arreglo con todos los tipos
        this.habilidad = habilidad;   // Habilidad 
        this.movimiento = movimiento; // Primer movimiento
        this.imagen = imagen;         // URL de la imagen oficial
    }//Fin de constructor

    // Metodo para convertir los datos a un objeto Pokemon 
    static datosAPokemon(datos) {

        // Extrae los tipos del Pokémon desde la API
        const tipos = datos.types.map(t => t.type.name);

        // Obtiene la primera habilidad del pokémon , en caso de no estar disponible pone el valor por defecto: "No disponible"
        let habilidad = 'No disponible';
        if (datos.abilities.length > 0) {
            habilidad = datos.abilities[0].ability.name;
        }//fin de if habilidad

        // Obtiene el primer movimiento disponible para el pokémon ,en caso de no estar disponible pone el valor por defecto: "No disponible"
        let movimiento = 'No disponible';
        if (datos.moves.length > 0) {
            movimiento = datos.moves[0].move.name;
        }//fin de if movimiento

        // Obtiene la url de la imagen del pokémon
        const imagen = datos.sprites.other['official-artwork'].front_default;

        // Retorna una nueva instancia de la clase Pokemon con los datos procesados
        return new Pokemon(
            datos.name,
            tipos,
            habilidad,
            movimiento,
            imagen
        );
    }//Fin de método datosAPokemon 

    // Método para convertir un Pokémon en formato JSON 
    convertirAJSON() {
        return {
            nombre: this.nombre,
            tipos: this.tipos,
            habilidad: this.habilidad,
            movimiento: this.movimiento,
            imagen: this.imagen
        };
    }//Fin de método convertirAJSON 
}//Fin de clase