async function renderizarPokemon(pokemonName, containerId) {
    const container = document.getElementById(containerId);

    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}');
        if(!response.ok) throw new Error("Pokemon no encontrado");

        const data = await response.json;

        //Construcción del HTML dinamico
        const cardHTML = <div class="pokemon-card">
            <div class="card-header">
                <h3>${data.name.toUpperCase()}</h3>
                <span>#${data.id}</span>
            </div>
            <img src="${data.sprites.other['oficcial-artwork'].front_default}" alt="${data.name}">
            <div class="card-body">
                <p><strong>Tipo:</strong>
                ${data.types.map(t => t.type.name).join(' , ')}
                </p>
                <div class="stats">
                    ${data.stats.map(s => `
                        <div class = "stat-line">
                        <span>${s.stat.name}:</span>
                        <div class="bar-container">
                            <div class = "bar" styler="width: ${Math.min(s.base_stat, 100)}%"></div>
                            </div>
                            </div>
                        `).join('')}
                </div>
            </div>
            </img>
        </div>

                        container.innerHTML = cardHTML;

    } catch (error) {
        container.innerHTML= `<p class="error">Error: ${error.message}</p>`;
        console.error(error);
    }
}