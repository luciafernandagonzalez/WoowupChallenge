const AlertaInformativa = require('../models/AlertaInformativa');
const AlertaUrgente = require('../models/AlertaUrgente');
const Usuario = require('../models/Usuario');
const Tema = require('../models/Tema');

describe('Pruebas para la clase Usuario', () => {
    let usuario1, usuario2;
    let alertaInformativaT1, alertaInformativaT2, alertaUrgenteT2;
    let tema1, tema2;

    beforeEach(() => {
        usuario1 = new Usuario(1, 'Usuario1');
        usuario2 = new Usuario(2, 'Usuario2');

        tema1 = new Tema(1, 'Tema1')
        tema2 = new Tema(2, 'Tema2')

        alertaInformativaT1 = new AlertaInformativa(1, tema1, 'Mensaje de alerta 1', new Date('2023-12-20T22:30:00'));
        alertaInformativaT2 = new AlertaInformativa(2, tema2, 'Mensaje de alerta 2, tema 2');
        alertaUrgenteExpiradaT2 = new AlertaUrgente(3, tema2, 'Mensaje de alerta 3, tema 2', new Date('2022-12-20T22:30:00'));
    })
    
    //Testeo de funcionalidad 1
    test('Registrar un usuario y recibir alertas', () => {

        tema1.subscribirUsuario(usuario1);

        tema1.enviarAlertadeTema(alertaInformativaT1);

        const alertasNoLeidas = usuario1.obtenerAlertasNoLeidas();

        expect(usuario1.id).toBe(1);
        expect(usuario1.nombre).toBe('Usuario1');
        expect(alertasNoLeidas.length).toBe(1);
        expect(alertasNoLeidas[0]).toBe(alertaInformativaT1);
    });

    //Testeo funcionalidad 4
    test('Se puede enviar una alerta sobre un tema y los usuarios suscritos la reciben', () => {

        tema2.subscribirUsuario(usuario1);
        tema2.subscribirUsuario(usuario2);

        tema2.enviarAlertadeTema(alertaInformativaT2);

        const alertasUsuario1 = usuario1.obtenerAlertasNoLeidas();
        const alertasUsuario2 = usuario2.obtenerAlertasNoLeidas();

        expect(alertasUsuario1.length).toBe(1);
        expect(alertasUsuario1[0]).toBe(alertaInformativaT2);

        expect(alertasUsuario2.length).toBe(1);
        expect(alertasUsuario2[0]).toBe(alertaInformativaT2);

    })

    //Testeo funcionalidad 8
    test('Un usuario puede marcar una alerta como leida', () => {

        tema1.subscribirUsuario(usuario1);
        tema1.enviarAlertadeTema(alertaInformativaT1);

        const alertasUsuario1 = usuario1.obtenerAlertasNoLeidas();

        //Antes de marcar como leida
        expect(alertasUsuario1.length).toBe(1);
        expect(alertasUsuario1[0]).toBe(alertaInformativaT1);

        //Despues de marcar como leida
        usuario1.marcarAlertaComoLeida(alertaInformativaT1.id);
        expect(alertasUsuario1.length).toBe(0);
    })

    //Testeo funcionalidad 9
    test('Obtener alertas no expiradas o leidas de un usuario', () => {
        
        tema2.subscribirUsuario(usuario2);
        tema2.enviarAlertadeTema(alertaInformativaT2);
        tema2.enviarAlertadeTema(alertaUrgenteExpiradaT2);

        const alertasNoLeidasOExpiradasU2 = usuario2.obtenerAlertasNileidasNiExpiradas();

        expect(alertasNoLeidasOExpiradasU2.length).toBe(1);
        expect(alertasNoLeidasOExpiradasU2[0]).toBe(alertaInformativaT2);
    })

    //Testeo funcionalidad 11 - parte usuario
    test('Ordenamiento de alertas en Temas', () => {

        tema1.subscribirUsuario(usuario1);

        alertaI1 = new AlertaInformativa(4, tema1, 'Alerta Inf 1 de tema2');
        alertaI2 = new AlertaInformativa(5, tema1, 'Alerta Inf 1 de tema2');
        alertaU1 = new AlertaUrgente(6, tema1, 'Alerta Inf 1 de tema2');
        alertaI3 = new AlertaInformativa(7, tema1, 'Alerta Inf 1 de tema2');
        alertaU2 = new AlertaUrgente(8, tema1, 'Alerta Inf 1 de tema2');
        alertaI4 = new AlertaInformativa(9, tema1, 'Alerta Inf 1 de tema2');

        tema1.enviarAlertadeTema(alertaI1);
        tema1.enviarAlertadeTema(alertaI2);
        tema1.enviarAlertadeTema(alertaU1);
        tema1.enviarAlertadeTema(alertaI3);
        tema1.enviarAlertadeTema(alertaU2);
        tema1.enviarAlertadeTema(alertaI4);

        const alertas = usuario1.obtenerAlertasNoLeidas();

        expect(alertas[0]).toBe(alertaU2);
        expect(alertas[1]).toBe(alertaU1);
        expect(alertas[2]).toBe(alertaI1);
        expect(alertas[3]).toBe(alertaI2);
        expect(alertas[4]).toBe(alertaI3);
        expect(alertas[5]).toBe(alertaI4);

    })
});