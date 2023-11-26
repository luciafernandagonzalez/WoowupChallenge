const Usuario = require('../models/Usuario');


class SistemaAlertas {

    enviarAlertaEspecifica(Usuario, alerta) {
        
        // const temasSuscritosUsuario = Usuario.
        // const temaAlerta = alerta.obtenerTema
        if(Usuario.temasSubscritos.has(alerta.tema)) {
            Usuario.recibirAlerta(alerta);
        }
    }
}
module.exports = SistemaAlertas;