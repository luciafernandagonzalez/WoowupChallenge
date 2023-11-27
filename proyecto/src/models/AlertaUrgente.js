const Alerta = require('./Alerta');

class AlertaUrgente extends Alerta {
    constructor(id, tema, mensaje, fechaExpiracion) {
        super(id, 'urgente', tema, mensaje, fechaExpiracion);
    }
}

module.exports = AlertaUrgente;