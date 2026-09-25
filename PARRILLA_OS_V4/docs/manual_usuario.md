# Manual de Usuario PARRILLA OS - borrador vivo v0.1

## 1. Salón / Mozo
- Consulta comandas por mesa/canal.
- Ve el estado de cada plato.
- Un plato mixto sólo queda listo cuando todos sus componentes requeridos están en MANOS.
- Marca un plato listo como `EN MESA` sin esperar al resto de la comanda.

## 2. Cocina
- Ve comandas completas pero actúa sólo sobre componentes de Cocina.
- Estados operativos: PENDIENTE -> PREPARACION -> MANOS.
- En platos mixtos, puede quedar `ESPERANDO_PARRILLA`.

## 3. Parrilla
- Ve comandas completas y opera componentes de Parrilla.
- Choripán, Morcipán y Bondiola pertenecen a Parrilla.
- En platos mixtos, puede quedar `ESPERANDO_COCINA`.
- Pickup, Delivery y Mostrador se liberan desde Parrilla cuando la producción está completa y el pedido está cobrado.

## 4. Caja
- Medios: Efectivo, Mercado Pago, Transferencia, Débito, Tarjeta de Crédito.
- Registra cobros, gastos, pagos, compras, retiros e ingresos.
- Caja es única para el local; cada movimiento guarda usuario y medio de pago.
- Permite cargar Cierre Z y comparar contra ventas del sistema.

## 5. Administración
- Dashboard Master crea locales, módulos y usuarios.
- Las contraseñas se gestionan con Firebase Authentication; nunca se almacenan en la base de datos.

## 6. Delivery / Pickup / Mostrador
- La comanda atraviesa producción, cobro y luego liberación.
- La liberación operativa corresponde al sector Parrilla en el piloto.

## 7. Menú / Carta Digital
- Productos, precios, imágenes, agotados y menú del día se gestionan desde el panel de Carta.
- Los QR físicos de mesa no se reimprimen cuando cambia el contenido.

## 8. Contable
- Consulta ventas, egresos y resultado operativo por día/mes/año.
- Visualiza ventas por medio de pago.
- Controla Cierres Z y diferencias.
- IVA/IIBB son valores auxiliares/configurables y no sustituyen la liquidación profesional.
