class Tema {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
        this.usuariosSuscritos = []; 
        this.alertas = [];
    }

    subscribirUsuario(usuario) {
        this.usuariosSuscritos.push(usuario);
    }

    enviarAlertadeTema(alerta) { 
        if(alerta.tipo === 'urgente'){
            this.alertas.unshift(alerta);
        }else if(alerta.tipo === 'informativa'){
            this.alertas.push(alerta); //guarda la alerta en el final del array
        }
        for(const usuario of this.usuariosSuscritos) { //manda a los usuarios suscritos
            usuario.recibirAlerta(alerta);
        }
    }

    obtenerUsuariosSuscritos() {
        return this.usuariosSuscritos;
    }

    obtenerAlertasdeTema() {
        return this.alertas;
    }

    obtenerAlertasNoExpiradas() {
        const fechaActual = new Date();

        return this.alertas.filter(alerta => {
            if(alerta.fechaExpiracion) {
                return alerta.fechaExpiracion > fechaActual;
            }
            return true;
        })

    }
}
module.exports = Tema;