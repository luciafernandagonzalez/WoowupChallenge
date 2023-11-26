class Usuario {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
        this.temasSubscritos = new Set();
        this.alertasNoLeidas = []
    }

    
    recibirAlerta(alerta) {
        if (this.temasSubscritos.has(alerta.tema) || this.id === alerta.destinatarioId) {
            this.alertasNoLeidas.push(alerta);
        }
    }
    
    suscribirseTema(tema) {
        this.temasSubscritos.add(tema);
    }    

    obtenerAlertasNoLeidas() {
        return this.alertasNoLeidas.filter(alerta => !alerta.leida);
    }

    obtenerAlertasNileidasNiExpiradas(){
        const fechaActual = new Date();

        return this.alertasNoLeidas.filter(alerta => !alerta.leida && alerta.fechaExpiracion > fechaActual);
    }

    marcarAlertaComoLeida(alertaId) {
        const alerta = this.alertasNoLeidas.find(alerta => alerta.id === alertaId);
        if (alerta) {
            alerta.leida = true;
        }
    }
}
module.exports = Usuario;