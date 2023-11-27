Los tests se ejecutan con "npm test"
El modelo de datos esta incluido en el archivo challengeWoowup\diagrama.png

Supuestos:

* Segun funcionalidad "5. Se puede enviar una alerta sobre un tema a un usuario específico, solo lo recibe ese único usuario."

Considero que esta funcionalidad se cumple cuando un tema tiene un solo usuario suscrito.

* Segun funcionalidad "8. Un usuario puede marcar una alerta como leída"
Considero que cuando el usuario lee una alerta esta se borra de su array alertasNoLeidas. No asi del array de alertas en la clase tema.

