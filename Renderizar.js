//Historia 7/8  Jose Solano
//pokemon.types[0].type.name

import { TipoColor } from '../modelos/TipoColor.js';

export class Renderizar {
    
    // Historia 7 - Tarjeta Detallada
    static crearTarjeta(pokemon) {
        const colorPrincipal = TipoColor.obtenerColor(pokemon.types[0].type.name);
        
        const tiposHTML = pokemon.tipos.map(tipo => {
            const color = TipoColor.obtenerColor(tipo);
            return `<span class="tipo-badge" style="background-color: ${color};">${tipo}</span>`;
        }).join('');

        return `
            <div class="tarjeta-pokemon" style="border-top: 8px solid ${colorPrincipal}">
                <img src="${pokemon.imagen}" alt="${pokemon.nombre}">
                <h2>${pokemon.nombre}</h2>
                <div class="datos-pokemon">
                    <div class="tipos">${tiposHTML}</div>
                    <div class="dato"><strong>Habilidad:</strong> ${pokemon.habilidad}</div>
                    <div class="dato"><strong>Primer movimiento:</strong> ${pokemon.movimiento}</div>
                </div>
            </div>`;
    }

    // Historia 8 - Mini Tarjeta para el equipo
    static crearMiniTarjeta(pokemon) {
        const colorPrincipal = TipoColor.obtenerColor(pokemon.types[0].type.name);
        
        return `
            <div class="mini-tarjeta" style="border-left: 5px solid ${colorPrincipal}">
                <img src="${pokemon.imagen}" alt="${pokemon.nombre}" class="mini-img">
                <div class="mini-info">
                    <p class="mini-nombre">${pokemon.nombre}</p>
                    <small>${pokemon.types[0].type.name}</small>
                </div>
                <button class="btn-eliminar" data-nombre="${pokemon.nombre}">×</button>
            </div>
        `;
    }
} 
