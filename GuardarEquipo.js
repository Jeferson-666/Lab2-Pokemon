export class GuardarEquipo {

    static KEY = "mis_pokemon";

    static guardarEquipoPokemones(pokemones) {
        if (validarGuardados()) {
            localStorage.setItem(this.KEY, JSON.stringify(pokemones));
        }
    }

    static validos(pokemones) {
        if (pokemones.length > 6) return false;
        const revisados = new Set();
        const duplicados = new Set();
        pokemones.forEach(p => {
            const nombre = p["name"];
            if (nombre) {
                if (revisados.has(nombre)) {
                    duplicados.add(nombre);
                    return false;
                } else {
                    revisados.add(nombre);
                }
            }
        });
        return true;;
    }

}