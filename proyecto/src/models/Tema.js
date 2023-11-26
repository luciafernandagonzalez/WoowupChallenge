class Tema {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
    }
}

const TipoAlerta = {
    INFORMATIVA: 'informativa',
    URGENTE: 'urgente'
};
module.exports = Tema;