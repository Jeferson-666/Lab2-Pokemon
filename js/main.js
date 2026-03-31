import { Pokemon } from './modelos/Pokemon.js';
import { TipoColor } from './modelos/TipoColor.js';
import { Servicios } from './servicios/Servicios.js';
import './ui/Sugerencias.js';

const btnBuscar = document.getElementById('btnBuscar');
const inputNombrePokemon = document.getElementById('pokemonName');
const sectionInfoPokemon = document.getElementById('infoPokemon');

btnBuscar.addEventListener('click', () => {
    const nombre = inputNombrePokemon.value.trim().toLowerCase();

    if (nombre === '') {
        sectionInfoPokemon.innerHTML = '<p>Escribe el nombre de un Pokémon.</p>';
        sectionInfoPokemon.className = 'info-pokemon';
        return;
    }

    buscarPokemon(nombre);
});

inputNombrePokemon.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        btnBuscar.click();
    }
});

async function buscarPokemon(nombre) {
    sectionInfoPokemon.innerHTML = '<p>Buscando Pokémon...</p>';
    sectionInfoPokemon.className = 'info-pokemon';

    try {
        const datos = await Servicios.obtenerPokemon(nombre);
        const pokemon = Pokemon.datosAPokemon(datos);
        mostrarInfoPokemon(pokemon);
    } catch (error) {
        sectionInfoPokemon.innerHTML = '<p>Ocurrió un error o el Pokémon no existe.</p>';
        sectionInfoPokemon.className = 'info-pokemon';
    }
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

    const tiposHTML = pokemon.tipos.map(tipo => {
        const color = TipoColor.obtenerColor(tipo);
        return `<span class="tipo-badge" style="background-color: ${color};">${traducirTipo(tipo)}</span>`;
    }).join('');

    sectionInfoPokemon.style.backgroundColor = colorPrincipal + '20';

    sectionInfoPokemon.innerHTML = `
        <div class="tarjeta-pokemon">
            <img src="${pokemon.imagen}" alt="${pokemon.nombre}">
            <h2>${pokemon.nombre}</h2>

            <div class="datos-pokemon">
                <div class="dato"><strong>Tipos:</strong></div>
                <div class="tipos">${tiposHTML}</div>

                <div class="dato"><strong>Habilidad:</strong> ${pokemon.habilidad}</div>
                <div class="dato"><strong>Primer movimiento:</strong> ${pokemon.movimiento}</div>
            </div>
        </div>
    `;
}