import { Pokemon } from './modelos/Pokemon.js';
import { TipoColor } from './modelos/TipoColor.js';
import { Servicios } from './servicios/Servicios.js';
import { Renderizar } from './ui/Renderizar.js';
import './ui/Sugerencias.js';
import {iniciarEventosBusqueda} from './eventos/eventosBusqueda.js';
import {GuardarEquipo} from './eventos/guardarEquipo.js';

const btnBuscar = document.getElementById('btnBuscar');
const btnCapturar = document.getElementById('btnCapturar');
const btnVerEquipo = document.getElementById('btnVerEquipo');
const inputNombrePokemon = document.getElementById('pokemonName');
const sectionInfoPokemon = document.getElementById('infoPokemon');
let pokemon;

async function buscarPokemon(nombre) {
    sectionInfoPokemon.innerHTML=`<div class="spinner"></div>`;
    sectionInfoPokemon.className = 'info-pokemon';

    try {
        const datos = await Servicios.obtenerPokemon(nombre);
        pokemon = Pokemon.datosAPokemon(datos);
        mostrarInfoPokemon(pokemon);
        
    } catch (error) {
        sectionInfoPokemon.innerHTML = '<p>Ocurrió un error o el Pokémon no existe.</p>';
        sectionInfoPokemon.className = 'info-pokemon';
    }
}
function capturarPokemon() {
    alert('Funcionalidad de mostrar equipo aún no implementada.');
    //GuardarEquipo.guardarEquipoPokemones(pokemon.convertirAJSON());
}

function mostrarEquipo() {
    alert('Funcionalidad de mostrar equipo aún no implementada.');
}

function traducirTipo(tipo) {
    const traducciones = {
        normal: 'Normal',
        fire: 'Fuego',
        water: 'Agua',
        electric: 'Eléctrico',
        grass: 'Planta',
        ice: 'Hielo',
        fighting: 'Lucha',
        poison: 'Veneno',
        ground: 'Tierra',
        flying: 'Volador',
        psychic: 'Psíquico',
        bug: 'Bicho',
        rock: 'Roca',
        ghost: 'Fantasma',
        dragon: 'Dragón',
        dark: 'Siniestro',
        steel: 'Acero',
        fairy: 'Hada'
    };

    return traducciones[tipo] || tipo;
}

function mostrarInfoPokemon(pokemon) {
    const colorPrincipal = TipoColor.obtenerColor(pokemon.tipos[0]);
    
    // Aplicamos el color de fondo a la sección
    sectionInfoPokemon.style.backgroundColor = colorPrincipal + '20';

    // Sustituimos el HTML manual por el método de la clase
    sectionInfoPokemon.innerHTML = Renderizar.crearTarjeta(pokemon);
}

iniciarEventosBusqueda(btnBuscar,inputNombrePokemon,buscarPokemon,sectionInfoPokemon);

btnCapturar.addEventListener('click', capturarPokemon);
btnVerEquipo.addEventListener('click', mostrarEquipo);
