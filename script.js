import { EjemploGuardar } from './js/data/EjemploGuardar.js';



const btnBuscar = document.getElementById('btnBuscar');
const btnGuardar = document.getElementById('btnGuardar');
const btnLeer = document.getElementById('btnLeer');
const inputNombrePokemon = document.getElementById('pokemonName');
const SectionInfoPokemon = document.getElementById('infoPokemon');

btnBuscar.addEventListener('click', () => {
    const nombre = inputNombrePokemon.value.toLowerCase().trim();
});

btnGuardar.addEventListener('click', () => {
    const pokemones = [{nombre:'Pikachu', nviel: 25}, {nombre:'Charizard', nviel: 36}];
    EjemploGuardar.guardarPokemones(pokemones);
    alert('Pokemon guardado');
});
btnLeer.addEventListener('click', () => {
    const pokemones = EjemploGuardar.obtenerPokemones();
    alert(pokemones[0].nombre);
    let datosPojemones = '';
    pokemones.forEach(p => {
        datosPojemones += `Nombre: ${p.nombre}, Nivel: ${p.nviel}\n`;
    });
    alert(datosPojemones);
    
    
    });

async function buscarPokemon(nombre) {
    SectionInfoPokemon.innerHTML = '<p>Buscando...</p>';

    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        
        if (!respuesta.ok) {
            throw new Error('Pokémon no encontrado');
        }

        const datos = await respuesta.json();
        mostrarInfoPokemon(datos);

    } catch (error) {
        SectionInfoPokemon.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

function mostrarInfoPokemon(datos) {
    const tipoPrincipal = datos.types[0].type.name;
     
    document.body.className = `type-${tipoPrincipal}`;

    const pesoKG = datos.weight / 10;
    const alturaM = datos.height / 10;
    const listaTipos = datos.types.map(t => t.type.name).join(', ');

    SectionInfoPokemon.innerHTML = `
        <div class="pokemon-card">
            <img src="${datos.sprites.other['official-artwork'].front_default}" alt="${datos.name}">
            <h2>${datos.name.toUpperCase()}</h2>
            <div class="stats">
                <p><strong>Tipo(s):</strong> ${listaTipos}</p>
                <p><strong>Peso:</strong> ${pesoKG} kg</p>
                <p><strong>Altura:</strong> ${alturaM} m</p>
            </div>
        </div>
    `;
}