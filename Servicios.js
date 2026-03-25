//Hisoria 3 Lester
export class Servicios {
    
    static BASE_URL = 'https://pokeapi.co/api/v2';

    static async #BusquedaGeneral(endpoint) {
        try {
            const respuesta = await fetch(`${this.BASE_URL}/${endpoint}`);
            
            if (!respuesta.ok) {
                throw new Error(`Error en la API: ${respuesta.status} ${respuesta.statusText}`);
            }
            
            return await respuesta.json();
        } catch (error) {
            console.error("Fallo en la conexion con el servidor:", error);
            throw error;
        }
    }//busqueda general

    static async obtenerPokemon(nombre) {
        return await this.#BusquedaGeneral(`pokemon/${nombre.toLowerCase()}`);
    }

    static async obtenerListaPokemon(limite = 150) {
        return await this.#BusquedaGeneral(`pokemon?limit=${limite}`);
    }
    
}//fin clase servicios