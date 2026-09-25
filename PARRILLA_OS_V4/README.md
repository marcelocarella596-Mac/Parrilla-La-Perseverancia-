# PARRILLA OS v4.0 - Base modular multi-local

Esta carpeta es una **nueva base de desarrollo**, separada de los HTML v3.4 ya validados. Los archivos originales quedan en `legacy/` para poder comparar y volver atrás.

## Prioridades preservadas del piloto
- Comanda madre + producción por componentes.
- Choripán, Morcipán y Bondiola (plato o sándwich) => Parrilla.
- Carne de parrilla + fritas/puré/ensalada => plato MIXTO sincronizado.
- Milanesa/Suprema con fritas => Cocina completa.
- Sincronización por plato, no por mesa completa.
- QR físico existente: `menu.html?mesa=Salon_Mesa_X` sigue siendo válido para el local piloto.
- Pickup / Delivery / Mostrador: liberación desde sector Parrilla luego de producción completa y cobro.
- Una sola Caja Central, compartida por roles autorizados.

## Primer arranque del piloto
1. Subir la carpeta V4 a una rama de prueba.
2. Abrir `tools/migrar_piloto_v4.html` y ejecutar una sola vez.
3. Probar `cliente/menu.html?mesa=Salon_Mesa_3`.
4. Probar Cocina / Parrilla / Salón.
5. Probar Caja y Cierre Z.
6. Recién después habilitar Firebase Authentication y desplegar Functions.
7. Al activar Auth, cambiar `pilotBypassAuth:false` y desplegar reglas v4.

## Seguridad
No guardar contraseñas en Realtime Database. El alta segura de usuarios está implementada mediante `firebase/functions/adminCreateUser`. Requiere desplegar Firebase Functions y asignar el claim `super_admin` con el script de bootstrap.

## Estado
Base funcional de desarrollo / piloto. No desplegar las reglas v4 sobre el sistema legacy hasta migrar todos los módulos.
