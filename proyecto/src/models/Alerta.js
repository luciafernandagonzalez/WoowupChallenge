
class Alerta {
    constructor(id, tipo, tema, mensaje, fechaExpiracion, destinatarioId = null){
        this.id = id;
        this.tipo = tipo;
        this.tema = tema;
        this.mensaje = mensaje;
        this.destinatarioId = destinatarioId;
        this.fechaExpiracion = fechaExpiracion;
        this.leida = false;
    }

    enviarAlertadeTema(usuariosSubscritos) {
        usuariosSubscritos.forEach(usuario => {
            usuario.recibirAlerta(this);
        });
    }

    // alertaExpirada() {
    //     const ahora = new Date();
    //     if(this.tiempo < ahora) {
    //         return true;
    //     } else return false;
    // }


}
module.exports = Alerta;