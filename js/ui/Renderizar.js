import { TipoColor } from '../modelos/TipoColor.js';

export class Renderizar {
    
    // Diccionario interno para traducir tipos
    static traducirTipo(tipo) {
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
// Historia 7 - Tarjeta Detallada (Usa el objeto Pokemon procesado)
static crearTarjeta(pokemon) {
    // Validamos que tenga tipos para evitar errores
    const tipos = Array.isArray(pokemon.tipos) && pokemon.tipos.length > 0 
        ? pokemon.tipos 
        : ['normal'];

    // Extraemos color del primer tipo usando la propiedad .tipos de la clase Pokemon
    const colorPrincipal = TipoColor.obtenerColor(tipos[0]);
    
    const tiposHTML = tipos.map(tipo => {
        const color = TipoColor.obtenerColor(tipo);
        return `<span class="tipo-badge" style="background-color: ${color};">${this.traducirTipo(tipo)}</span>`;
    }).join('');

    // Capitalizamos el nombre del Pokémon
    const nombreCapitalizado = pokemon.nombre.charAt(0).toUpperCase() + pokemon.nombre.slice(1);

    return `
        <div class="tarjeta-pokemon" style="
            border-top: 8px solid ${colorPrincipal};
            background-color: ${colorPrincipal}15;
        ">
            <img src="${pokemon.imagen}" alt="${pokemon.nombre}">
            <h2 style="text-transform: capitalize;">${nombreCapitalizado}</h2>
            <div class="datos-pokemon">
                <div class="tipos">${tiposHTML}</div>
                <div class="dato"><strong>Habilidad:</strong> ${pokemon.habilidad}</div>
                <div class="dato"><strong>Primer movimiento:</strong> ${pokemon.movimiento}</div>
            </div>
        </div>`;
}

// Historia 8 - Mini Tarjeta para el equipo
static crearMiniTarjeta(pokemon) {
    // Validación para evitar errores si el objeto viene mal
    const tipos = Array.isArray(pokemon.tipos) && pokemon.tipos.length > 0 
        ? pokemon.tipos 
        : ['normal'];

    const colorPrincipal = TipoColor.obtenerColor(tipos[0]);

    // Capitalizamos el nombre
    const nombreCapitalizado = pokemon.nombre.charAt(0).toUpperCase() + pokemon.nombre.slice(1);
    
    return `
        <div class="mini-tarjeta" style="border-left: 5px solid ${colorPrincipal}">
            <img src="${pokemon.imagen}" alt="${pokemon.nombre}" class="mini-img">
            <div class="mini-info">
                <p class="mini-nombre" style="text-transform: capitalize;">${nombreCapitalizado}</p>
                <small>${this.traducirTipo(tipos[0])}</small>
            </div>
            <button class="btn-eliminar" data-nombre="${pokemon.nombre}">×</button>
        </div>
    `;
}
}