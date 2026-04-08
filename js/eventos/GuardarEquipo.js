// Clase GuardarEquipo
export class GuardarEquipo {

    // Clave para guardar y leer el equipo en localStorage
    static KEY = "mis_pokemon";

    // Método para obtener el equipo guardado en localStorage
    static obtenerEquipoPokemones() {

        // Lee los datos guardados tomando en cuenta KEY
        const datos = localStorage.getItem(this.KEY);

        // Si existen datos los convierte de JSON a arreglo si no devuelve un arreglo vacío
        const equipo = datos ? JSON.parse(datos) : [];

        // Aqui se filtran los datos deseados , en nuestro caso habilidad , primer movimiento y la imagen
        return equipo.filter(p =>
            p &&
            typeof p.nombre === 'string' &&
            Array.isArray(p.tipos) &&
            p.tipos.length > 0 &&
            typeof p.habilidad === 'string' &&
            typeof p.movimiento === 'string' &&
            typeof p.imagen === 'string'
        );
    }//Fin de método obtenerEquipoPokemones

    // Método para guardar un arreglo de pokémones en localStorage
    static guardarEquipoPokemones(pokemones) {

        // Verifica si el arreglo recibido es válido
        if (this.validos(pokemones)) {

            // Guarda el arreglo convertido a JSON en localStorage
            localStorage.setItem(this.KEY, JSON.stringify(pokemones));
            return true;
        }//Fin de if

        // Si no es válido, no guarda nada
        return false;
    }//Fin de método guardarEquipoPokemones

    // Método para agregar un pokémon al equipo
    static agregarPokemon(pokemon) {

        // Obtiene el equipo completo guardado
        const equipo = this.obtenerEquipoPokemones();

        // Verifica que actualmente haya un pokemon para guardar
        if (!pokemon) {
            return { ok: false, mensaje: "No hay Pokémon para capturar." };
        }//Fin de if

        // Verifica si el pokémon ya esta en el equipo
        const existe = equipo.some(p => p.nombre === pokemon.nombre);
        if (existe) {
            return { ok: false, mensaje: "Ese Pokémon ya está en el equipo." };
        }//Fin de if

        // Verifica que el equipo no tenga más de 6 pokémones
        if (equipo.length >= 6) {
            return { ok: false, mensaje: "El equipo ya tiene 6 Pokémon." };
        }//Fin de if

        // Agrega el nuevo pokémon al equipo usando push
        equipo.push(pokemon);

        // Guarda los cambios en el equipo
        const guardado = this.guardarEquipoPokemones(equipo);

        // Verifica si se pudo guardar correctamente
        if (!guardado) {
            return { ok: false, mensaje: "No se pudo guardar el Pokémon." };
        }//Fin de if

        // Convierte la primera letra del nombre en mayúscula (estética)
        const nombre = pokemon.nombre.charAt(0).toUpperCase() + pokemon.nombre.slice(1);

        // Mensaje de confirmación 
        return { ok: true, mensaje: `${nombre} fue agregado al equipo.` };
    }//Fin de método agregarPokemon

    // Método para eliminar un pokémon (según su nombre)
    static eliminarPokemon(nombre) {

        // Obtiene el equipo actual guardado
        const equipo = this.obtenerEquipoPokemones();

        // Crea un nuevo arreglo pero verifica el nombre para quitar ese pokémon del arreglo
        const nuevoEquipo = equipo.filter(p => p.nombre !== nombre);

        // Guarda el nuevo equipo en el localStorage
        localStorage.setItem(this.KEY, JSON.stringify(nuevoEquipo));
    }//Fin de método eliminarPokemon

    // Método para validar las reglas de un equipo
    static validos(pokemones) {

        // Verifica que sea un arreglo
        if (!Array.isArray(pokemones)) return false;

        // Verifica que no tenga más de 6 pokémon
        if (pokemones.length > 6) return false;

        // Conjunto para controlar nombres repetidos
        const nombres = new Set(); //un set es una colección que es más rapida y eficiente al iterar que un arreglo , y permite utilizar .has para verificar si tiene un valor repetido

        // Recorre cada pokémon del arreglo
        for (const p of pokemones) {

            // Verifica que el pokémon exista
            if (!p) return false;

            // Verifica que tenga nombre válido
            if (typeof p.nombre !== 'string') return false;

            // Verifica que tenga tipos válidos y por lo menos uno
            if (!Array.isArray(p.tipos) || p.tipos.length === 0) return false;

            // Verifica que no se repita el nombre
            if (nombres.has(p.nombre)) return false;

            // Agrega el nombre al conjunto
            nombres.add(p.nombre);
        }//Fin de for

        // Si todo está bien, retorna true
        return true;
    }//Fin de método validos
}//Fin de clase GuardarEquipo