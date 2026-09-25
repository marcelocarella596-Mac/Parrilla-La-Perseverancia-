# Manual Técnico - borrador v0.1

## Núcleo
`shared/production-core.js` es la fuente única de reglas de producción.
`shared/orders-core.js` administra pedidos y estados.
`shared/cash-core.js` administra caja y cierres Z.

## Autenticación
Firebase Authentication Email/Password + perfiles RTDB + custom claims.
Alta de usuarios mediante Cloud Function; no usar `createUserWithEmailAndPassword` desde Dashboard Master porque cambia la sesión del administrador.

## Migración
El modo piloto mantiene ciertas rutas legacy. Desactivar `legacyPilot` sólo cuando todas las pantallas del local hayan sido migradas y verificadas.

## Reglas
`firebase/database.rules.v4.template.json` es una plantilla para la nueva raíz v4. No desplegarla como reemplazo global hasta completar la migración legacy.
