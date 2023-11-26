const Usuario = require('./Usuario');
const Tema = require('./Tema');
const AlertaInformativa = require('./AlertaInformativa');
const AlertaUrgente = require('./AlertaUrgente');
const AlertaInformativa = require('./AlertaInformativa');
const AlertaUrgente = require('./AlertaUrgente');

//registrar usuarios
// const usuario1 = new Usuario(1, 'Usuario1');
// const usuario2 = new Usuario(2, 'Usuario2');

//registrar temas
// const tema1 = new Tema(1, 'Tema1');
// const tema2 = new Tema(2, 'Tema2');

//Suscribir usuarios a temas
// usuario1.suscribirseTema(tema1);
// usuario2.suscribirseTema(tema2);

//crear y enviar alertas
const AlertaInformativa = new AlertaInformativa(1, tema1, 'Mensaje de alerta informativa para tema 1');
const AlertaUrgente = new AlertaUrgente(2, tema2, 'Mensaje de alerta urgente para tema 2', usuario1.id);

//enviar alertas a los usuarios
// usuario1.recibirAlerta(AlertaInformativa);
// usuario2.recibirAlerta(AlertaUrgente);

//obtener alertas no leidas para un usuario especifico
const alertasNoLeidasUsuario1 = usuario1.obtenerAlertasNoLeidas();
console.log('Alertas no leidas para usuario1: ', alertasNoLeidasUsuario1);

//Marcar una alerta como leida para un usuario
usuario1.marcarAlertaComoLeida(AlertaInformativa.id);