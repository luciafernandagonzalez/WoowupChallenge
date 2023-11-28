class Alerta {
    constructor(id, tipo, tema, mensaje, fechaExpiracion){
        this.id = id;
        this.tipo = tipo; //tipo informativa - urgente
        this.tema = tema;
        this.mensaje = mensaje;
        if(fechaExpiracion) { this.fechaExpiracion = new Date(fechaExpiracion) }
        else this.fechaExpiracion= new Date('2999-01-01');
    }
}
module.exports = Alerta;