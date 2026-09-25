# Arquitectura PARRILLA OS v4

Dashboard Master -> Locales -> Usuarios/Roles -> Sectores -> Módulos.

Sectores de manual y operación: Salón/Mozo, Cocina, Parrilla, Caja, Administración, Delivery/Pickup/Mostrador, Menú/Carta Digital, Contable.

La capa `shared/` concentra Firebase, Auth, permisos, motor de producción, pedidos, caja, menú y auditoría. Las pantallas de sector no duplican reglas de negocio.

La ruta principal nueva es `parrillaOS/locales/<localId>/...`; durante el piloto, `orders`, `platos_agotados` y `mensajes_chat` del local La Perseverancia pueden seguir usando las rutas legacy para compatibilidad.
