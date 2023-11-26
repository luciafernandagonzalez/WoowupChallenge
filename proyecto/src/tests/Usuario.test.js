const AlertaInformativa = require('../models/AlertaInformativa');
const Usuario = require('../models/Usuario');
const Tema = require('../models/Tema');
const SistemaAlertas = require('../services/SistemaAlertas');

describe('Pruebas para la clase Usuario', () => {
    let sistemaAlertas;
    let usuario1, usuario2;
    let alertaInformativaT1, alertaInformativaT2;
    let tema1, tema2;

    beforeEach(() => {
        sistemaAlertas = new SistemaAlertas();
        usuario1 = new Usuario(1, 'Usuario1');
        usuario2 = new Usuario(2, 'Usuario2');
        tema1 = new Tema(1, 'Tema1')
        tema2 = new Tema(2, 'Tema2')
        alertaInformativaT1 = new AlertaInformativa(1, tema1, 'Mensaje de alerta 1');
        alertaInformativaT2 = new AlertaInformativa(2, tema2, 'Mensaje de alerta 2, tema 2');
        usuario1.suscribirseTema(tema1);
    })
    
    //Testeo de funcionalidad 1: registrar usuario y recibir alertas
    test('Registrar un usuario y recibir alertas', () => {

        usuario1.recibirAlerta(alertaInformativaT1)
        const alertasNoLeidas = usuario1.obtenerAlertasNoLeidas();

        //assert
        expect(usuario1.id).toBe(1);
        expect(usuario1.nombre).toBe('Usuario1');
        expect(alertasNoLeidas.length).toBe(1);
        expect(alertasNoLeidas[0]).toBe(alertaInformativaT1);
    });

    //Testeo de funcionalidad 2: registrar temas sobre los cuales recibir alertas
    test('Registrar tema a usuario', () => {

        usuario1.recibirAlerta(alertaInformativaT2);
        const alertasNoLeidas = usuario1.obtenerAlertasNoLeidas();

        expect(usuario1.temasSubscritos.size).toBe(1);
        expect(usuario1.temasSubscritos.has(tema1)).toBe(true);

        //F3: Los usuarios pueden optar sobre cuales temas quieren recibir alertas - No recibir si no es su tema
        expect(alertasNoLeidas.length).toBe(0);

    });
    //F5: 
    test('Enviar alerta sobre un tema a un usuario especifico', () => {
        usuario2.suscribirseTema(tema2);

        sistemaAlertas.enviarAlertaEspecifica(usuario1, alertaInformativaT1);

        const alertasNoLeidasUsuario1 = usuario1.obtenerAlertasNoLeidas();
        const alertasNoLeidasUsuario2 = usuario2.obtenerAlertasNoLeidas();

        //Verificar que el usuario recibio la alerta
        expect(alertasNoLeidasUsuario1.length).toBe(1);
        expect(alertasNoLeidasUsuario1[0]).toBe(alertaInformativaT1);
        //Verificar que otro usuario no la recibio
        expect(alertasNoLeidasUsuario2.length).toBe(0);

    })
});