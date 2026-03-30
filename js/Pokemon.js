export class Pokemon {
    constructor(nombre, tipos, habilidad, movimiento, imagen) {
        this.nombre = nombre;
        this.tipos = tipos;
        this.habilidad = habilidad;
        this.movimiento = movimiento;
        this.imagen = imagen;
    }

    static desdeAPI(datos) {
        const tipos = datos.types.map(t => t.type.name);

        let habilidad = 'No disponible';
        if (datos.abilities.length > 0) {
            habilidad = datos.abilities[0].ability.name;
        }

        let movimiento = 'No disponible';
        if (datos.moves.length > 0) {
            movimiento = datos.moves[0].move.name;
        }

        const imagen = datos.sprites.other['official-artwork'].front_default;

        return new Pokemon(
            datos.name,
            tipos,
            habilidad,
            movimiento,
            imagen
        );
    }

    convertirAJSON() {
        return {
            nombre: this.nombre,
            tipos: this.tipos,
            habilidad: this.habilidad,
            movimiento: this.movimiento,
            imagen: this.imagen
        };
    }
}