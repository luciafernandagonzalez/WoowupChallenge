const Alerta = require("../models/Alerta");
const AlertaInformativa = require("../models/AlertaInformativa");
const AlertaUrgente = require("../models/AlertaUrgente");
const Tema = require("../models/Tema");
const Usuario = require("../models/Usuario");


describe('Pruebas para la clase Tema', () => {
    let alertaInformativa1, alertaInformativa2, alertaUrgente1;
    let tema1, tema2;
    let usuario1, usuario2;
    
    beforeEach(() => {
        tema1 = new Tema(1, 'Tema1');
        tema2 = new Tema(2, 'Tema2');

        usuario1 = new Usuario(1, 'Usuario 1');
        usuario2 = new Usuario(2, 'Usuario 2');

        alertaInformativa1 = new AlertaInformativa(1, tema2, 'Alerta Inf 1 de tema2');
        alertaUrgente1 = new AlertaInformativa(2, tema2, 'Alerta Urgente de tema2');
        alertaInformativa2 = new AlertaInformativa(3, tema2, 'Alerta Inf 2 de tema2', new Date('2022-12-20T22:30:00'));

    })

    //Testeo funcionalidad 2
    test('Registrar temas', () => {

        expect(tema1.id).toBe(1);
        expect(tema1.nombre).toBe('Tema1');
        expect(tema2.id).toBe(2);
        expect(tema2.nombre).toBe('Tema2');

    })

    //Testeo funcionalidad 3
    test('Los usuarios pueden optar temas para recibir alertas', () => {

        tema2.subscribirUsuario(usuario1);

        const usuariosSuscritosTema2 = tema2.obtenerUsuariosSuscritos();
        
        expect(usuariosSuscritosTema2.length).toBe(1);
        expect(usuariosSuscritosTema2[0]).toBe(usuario1);
    })

    //Testeo funcionalidad 10
    test('Obtener todas las alertas no expiradas de un tema', () => {

        tema2.enviarAlertadeTema(alertaInformativa1);
        tema2.enviarAlertadeTema(alertaUrgente1);
        tema2.enviarAlertadeTema(alertaInformativa2);

        const alertasNoExpiradas = tema2.obtenerAlertasNoExpiradas();

        expect(alertasNoExpiradas.length).toBe(2);
    })

    //Testeo funcionalidad 11 . parte Temas
    test('Ordenamiento de alertas en Temas', () => {

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

        const alertas = tema1.obtenerAlertasdeTema();

        expect(alertas[0]).toBe(alertaU2);
        expect(alertas[1]).toBe(alertaU1);
        expect(alertas[2]).toBe(alertaI1);
        expect(alertas[3]).toBe(alertaI2);
        expect(alertas[4]).toBe(alertaI3);
        expect(alertas[5]).toBe(alertaI4);

    })
})