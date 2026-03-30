export class TipoColor {
    static obtenerColor(tipo) {
        if (tipo === 'fire') return '#FF5733';
        if (tipo === 'water') return '#3498DB';
        if (tipo === 'electric') return '#F1C40F';
        if (tipo === 'grass') return '#2ECC71';
        if (tipo === 'psychic') return '#9B59B6';
        return '#D5D8DC';
    }
}