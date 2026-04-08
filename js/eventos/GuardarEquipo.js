export class GuardarEquipo {
    static KEY = "mis_pokemon";

    static obtenerEquipoPokemones() {
        const datos = localStorage.getItem(this.KEY);
        const equipo = datos ? JSON.parse(datos) : [];

        return equipo.filter(p =>
            p &&
            typeof p.nombre === 'string' &&
            Array.isArray(p.tipos) &&
            p.tipos.length > 0 &&
            typeof p.habilidad === 'string' &&
            typeof p.movimiento === 'string' &&
            typeof p.imagen === 'string'
        );
    }

    static guardarEquipoPokemones(pokemones) {
        if (this.validos(pokemones)) {
            localStorage.setItem(this.KEY, JSON.stringify(pokemones));
            return true;
        }
        return false;
    }

    static agregarPokemon(pokemon) {
        const equipo = this.obtenerEquipoPokemones();

        if (!pokemon) {
            return { ok: false, mensaje: "No hay Pokémon para capturar." };
        }

        const existe = equipo.some(p => p.nombre === pokemon.nombre);
        if (existe) {
            return { ok: false, mensaje: "Ese Pokémon ya está en el equipo." };
        }

        if (equipo.length >= 6) {
            return { ok: false, mensaje: "El equipo ya tiene 6 Pokémon." };
        }

        equipo.push(pokemon);

        const guardado = this.guardarEquipoPokemones(equipo);

        if (!guardado) {
            return { ok: false, mensaje: "No se pudo guardar el Pokémon." };
        }
        const nombre = pokemon.nombre.charAt(0).toUpperCase() + pokemon.nombre.slice(1); /*Para que la primer letra sea en mayuscula*/

        return { ok: true, mensaje: `${nombre} fue agregado al equipo.` };
    }

    static eliminarPokemon(nombre) {
        const equipo = this.obtenerEquipoPokemones();
        const nuevoEquipo = equipo.filter(p => p.nombre !== nombre);
        localStorage.setItem(this.KEY, JSON.stringify(nuevoEquipo));
    }

    static validos(pokemones) {
        if (!Array.isArray(pokemones)) return false;
        if (pokemones.length > 6) return false;

        const nombres = new Set();

        for (const p of pokemones) {
            if (!p) return false;
            if (typeof p.nombre !== 'string') return false;
            if (!Array.isArray(p.tipos) || p.tipos.length === 0) return false;
            if (nombres.has(p.nombre)) return false;

            nombres.add(p.nombre);
        }

        return true;
    }
}