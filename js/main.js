import { Pokemon } from './modelos/Pokemon.js';
import { Servicios } from './servicios/Servicios.js';
import { Renderizar } from './ui/Renderizar.js';
import './ui/Sugerencias.js';
import { iniciarEventosBusqueda } from './eventos/eventosBusqueda.js';
import { GuardarEquipo } from './eventos/GuardarEquipo.js';

const btnBuscar = document.getElementById('btnBuscar');
const btnCapturar = document.getElementById('btnCapturar');
const btnVerEquipo = document.getElementById('btnVerEquipo');
const inputNombrePokemon = document.getElementById('pokemonName');
const sectionInfoPokemon = document.getElementById('infoPokemon');

let pokemonActual = null;

async function buscarPokemon(nombre) {
    sectionInfoPokemon.innerHTML = `<div class="spinner"></div>`;
    sectionInfoPokemon.className = 'info-pokemon';
    sectionInfoPokemon.style.backgroundColor = 'white';

    try {
        const datos = await Servicios.obtenerPokemon(nombre);
        pokemonActual = Pokemon.datosAPokemon(datos);
        mostrarInfoPokemon(pokemonActual);
    } catch (error) {
        pokemonActual = null;
        sectionInfoPokemon.innerHTML = '<p>Ocurrió un error o el Pokémon no existe.</p>';
        sectionInfoPokemon.style.backgroundColor = 'white';
    }
}

function capturarPokemon() {
    if (!pokemonActual) {
        alert('Primero debes buscar un Pokémon.');
        return;
    }

    const resultado = GuardarEquipo.agregarPokemon(pokemonActual.convertirAJSON());
    alert(resultado.mensaje);
}

function mostrarEquipo() {
    const equipo = GuardarEquipo.obtenerEquipoPokemones();

    sectionInfoPokemon.style.backgroundColor = 'white';

    if (equipo.length === 0) {
        sectionInfoPokemon.innerHTML = `
            <div class="equipo-vacio">
                <h2>Mi Equipo</h2>
                <p>No has capturado Pokémon todavía.</p>
            </div>
        `;
        return;
    }

    const tarjetas = equipo.map(pokemon => Renderizar.crearMiniTarjeta(pokemon)).join('');

    sectionInfoPokemon.innerHTML = `
        <div class="equipo-pokemon">
            <h2>Mi Equipo</h2>
            <p>${equipo.length}/6 Pokémon capturados</p>
            <div class="lista-equipo">
                ${tarjetas}
            </div>
        </div>
    `;

    activarEventosEliminar();
}

function activarEventosEliminar() {
    const botonesEliminar = document.querySelectorAll('.btn-eliminar');

    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', () => {
            const nombre = boton.dataset.nombre;
            GuardarEquipo.eliminarPokemon(nombre);
            mostrarEquipo();
        });
    });
}

function mostrarInfoPokemon(pokemon) {
    sectionInfoPokemon.style.backgroundColor = 'white';
    sectionInfoPokemon.innerHTML = Renderizar.crearTarjeta(pokemon);
}

iniciarEventosBusqueda(btnBuscar, inputNombrePokemon, buscarPokemon, sectionInfoPokemon);

btnCapturar.addEventListener('click', capturarPokemon);
btnVerEquipo.addEventListener('click', mostrarEquipo);