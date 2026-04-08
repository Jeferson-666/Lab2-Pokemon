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
    //Se pone el spinner de carga mientras responde la API
    sectionInfoPokemon.innerHTML = `<div class="spinner"></div>`;
    sectionInfoPokemon.className = 'info-pokemon';

    /* en el try se captura los datos del pokemon, se convierte en un pokemon
    y luego muestra se muestra la información como se modifica el mismo section
    se quita el spinner de carga si algo falla tambien lo hace en el catch 
    */
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
//funcion para mostrar el equipo
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

/*funcion para activar los botones de eliminar que se crean
dinámicamente cuando se muestra el equipo
*/
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

/*funcion para traducir el tipo de pokemon usando el nombre que viene 
de la API como clave y su traducción sería el valor 
*/
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
    //si no existe el tipo por el operador or devolvería lo encontrado en la API
    return traducciones[tipo] || tipo;
}
//funcion para crear la tarjeta ubicado en renderizar
function mostrarInfoPokemon(pokemon) {
    sectionInfoPokemon.style.backgroundColor = 'white';
    sectionInfoPokemon.innerHTML = Renderizar.crearTarjeta(pokemon);
}

//agregamos todos los eventos a partir de esta linea
iniciarEventosBusqueda(btnBuscar, inputNombrePokemon, buscarPokemon, sectionInfoPokemon);

btnCapturar.addEventListener('click', capturarPokemon);
btnVerEquipo.addEventListener('click', mostrarEquipo);