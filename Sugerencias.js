import { Servicios } from './services/Servicios.js';

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
        
        alert("Historia 4: Sugerencias cargadas correctamente.");
    } catch (error) {
        alert("Historia 4: Falló la carga de sugerencias.");
    }//try cath
}//fin funcion cargar sugerencias iniciales