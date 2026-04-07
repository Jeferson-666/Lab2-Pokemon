export function iniciarEventosBusqueda(btnBuscar,inputNombrePokemon,buscarPokemon,sectionInfoPokemon){
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
}