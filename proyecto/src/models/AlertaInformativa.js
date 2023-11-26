const Alerta = require('./Alerta');

class AlertaInformativa extends Alerta {
    constructor(id, tema, mensaje, destinatarioId = null) {
        super(id, 'informativa', tema, mensaje, destinatarioId);
    }
}

module.exports = AlertaInformativa;