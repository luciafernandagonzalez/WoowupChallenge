class Usuario {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
        this.alertasNoLeidas = [] //las leidas van borrandose
    }

    
    recibirAlerta(alerta) {
        if(alerta.tipo === 'urgente'){
            this.alertasNoLeidas.unshift(alerta);
        }else if(alerta.tipo === 'informativa'){
            this.alertasNoLeidas.push(alerta); 
        }
    }

    obtenerAlertasNoLeidas() {
        return this.alertasNoLeidas;
    }

    obtenerAlertasNileidasNiExpiradas(){
        const fechaActual = new Date();

        return this.alertasNoLeidas.filter(alerta => {
            if(alerta.fechaExpiracion) {
                return alerta.fechaExpiracion > fechaActual;
            }
            // return true;
        })
    }

    marcarAlertaComoLeida(alertaId) {
        const indexAlerta = this.alertasNoLeidas.findIndex(alerta => alerta.id === alertaId);
        if (indexAlerta !== -1) {
            this.alertasNoLeidas.splice(indexAlerta, 1);
        }
    }
}
module.exports = Usuario;