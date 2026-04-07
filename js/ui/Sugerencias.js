//historia 3 Lester
import { Servicios } from '../servicios/Servicios.js';

const listaSugerencias = document.getElementById('pokemonSuggestions');


async function cargarSugerenciasIniciales() {
    try {
        const nombres = await Servicios.obtenerNombresSugerencias(150);
        
        const fragmento = document.createDocumentFragment();
        
        nombres.forEach(nombre => {
            const opcion = document.createElement('option');
            opcion.value = nombre;
            fragmento.appendChild(opcion);
        });

        listaSugerencias.appendChild(fragmento);
        
        
    } catch (error) {
        alert("Error al cargar las sugerencias.");
    }//try cath
}//fin funcion cargar sugerencias iniciales
cargarSugerenciasIniciales();//Llamada a la función para cargar las sugerencias al iniciar la página