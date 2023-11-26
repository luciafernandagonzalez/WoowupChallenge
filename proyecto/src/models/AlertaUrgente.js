const Alerta = require('./Alerta');

class AlertaUrgente extends Alerta {
    constructor(id, tema, mensaje, destinatarioId = null) {
        super(id, 'urgente', tema, mensaje, destinatarioId);
    }
}

module.exports = AlertaUrgente;