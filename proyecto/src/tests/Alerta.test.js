const Alerta = require("../models/Alerta");
const AlertaInformativa = require("../models/AlertaInformativa");
const Tema = require("../models/Tema");
const Usuario = require("../models/Usuario");


describe('Pruebas para la clase Alerta', () => {
    let usuario1, usuario2, usuario3;
    let alerta1, alerta2, alerta3;
    let tema1;
    let arrayUsuarios = [];

    beforeEach(() => {
        usuario1 = new Usuario(1, 'Usuario1');
        usuario2 = new Usuario(2, 'Usuario2');
        usuario3 = new Usuario(3, 'Usuario3');

        tema1 = new Tema(1, 'tema1')

        alerta1 = new AlertaInformativa(1, tema1, 'Mensaje de alerta 1', new Date('2023-12-20T22:30:00'));
        alerta2 = new AlertaInformativa(2, tema1, 'Mensaje de alerta 2', new Date('2023-12-10T13:50:00'));
        alerta3 = new AlertaInformativa(3, tema1, 'Mensaje de alerta 3', new Date('2022-05-10T13:50:00'));

        arrayUsuarios.push(usuario1);
        arrayUsuarios.push(usuario2);
        arrayUsuarios.push(usuario3);

        usuario1.suscribirseTema(tema1);
        usuario2.suscribirseTema(tema1);

    })

    //Testeo funcionalidad 4
    test('Se puede enviar una alerta sobre un tema y lo reciben todos los usuarios que han optado recibir alertas de ese tema.', () => {

        alerta1.enviarAlertadeTema(arrayUsuarios);
        const alertasNoLeidas1 = usuario1.obtenerAlertasNoLeidas()
        const alertasNoLeidas2 = usuario2.obtenerAlertasNoLeidas()
        const alertasNoLeidas3 = usuario3.obtenerAlertasNoLeidas()

        expect(alertasNoLeidas1[0]).toBe(alerta1);
        expect(alertasNoLeidas2[0]).toBe(alerta1);
        expect(alertasNoLeidas3.length).toBe(0);

    })

    //Testeo funcionalidad 8
    test('Un usuario puede marcar una alerta como leída', () => {
        usuario1.recibirAlerta(alerta1);
        usuario1.recibirAlerta(alerta2);

        let alertasNoLeidas = usuario1.obtenerAlertasNoLeidas();

        //Antes de marcar como leida: 2 alertas sin leer
        expect(alertasNoLeidas.length).toBe(2);

        //Despues de marcar una como leida: 1 alerta sin leer
        usuario1.marcarAlertaComoLeida(alerta1.id);

        alertasNoLeidas = usuario1.obtenerAlertasNoLeidas();
        expect(alertasNoLeidas.length).toBe(1);

    })

    //Testeo funcionalidad 9
    test('Obtener todas las alertas no expiradas de un usuario que aún no ha leído', () => {
        
        usuario1.recibirAlerta(alerta1);
        usuario1.recibirAlerta(alerta2);
        usuario1.recibirAlerta(alerta3);

        let alertasNoLeidasNoExpiradas = usuario1.obtenerAlertasNileidasNiExpiradas();

        expect(alertasNoLeidasNoExpiradas.length).toBe(2);
    })
})