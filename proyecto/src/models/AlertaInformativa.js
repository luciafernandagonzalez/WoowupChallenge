const Alerta = require('./Alerta');

class AlertaInformativa extends Alerta {
    constructor(id, tema, mensaje, fechaExpiracion) {
        super(id, 'informativa', tema, mensaje, fechaExpiracion);
    }
}

module.exports = AlertaInformativa;