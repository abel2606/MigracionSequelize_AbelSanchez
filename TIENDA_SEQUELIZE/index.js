const ProductoDAO = require('./DataAccess/productoDAO');
const VentaDAO = require('./DataAccess/ventaDAO');
const ProductoVentaDAO = require('./DataAccess/productoVentaDAO');
const { sequelize } = require('./models'); //Se asegura de importar el objeto sequelize

//Función asincrónica para realizar tranasacciones
async function realizarTransacciones() {

    try {
        await sequelize.sync();

        //Crear un producto
        const producto = await ProductoDAO.crearProducto('Producto 2', 10.99, 50);
        console.log('Producto creado: ', producto.toJSON());

        //Crear una venta
        const venta = await VentaDAO.crearVenta(100.0, 15.0);
        console.log('Venta creada: ', venta.toJSON());

        const productoVenta = await ProductoVentaDAO.crearProductoVenta(
            venta.id,
            producto.id,
            3,
            32.97,
            10.99
        );
        console.log('ProductoVenta creado:', productoVenta.toJSON());

        //Leer productos y ventas
        const productos = await ProductoDAO.obtenerProductos();
        console.log('Productos:', productos);

        const ventas = await VentaDAO.obtenerVentas();
        console.log('Ventas: ', ventas);

        //Actualizar un producto
        await ProductoDAO.actualizarProducto(producto.id, 'Producto Actualizado', 15.99, 40, 'Se actualizó el producto');
        console.log('Producto actualizado');

        //Eliminar una venta
        await VentaDAO.eliminarVenta(venta.id);
        console.log('Venta eliminada');

        //Obtener todas las ventas nuevamente
        const ventasActualizadas = await VentaDAO.obtenerVentas();
        console.log('Ventas actualizadas:', ventasActualizadas);
    } catch (error) {
        console.error('Error en las transacciones:', error);
    } finally {
        //Cierra la conexión a la base de datos cuando todas las transacciones se han terminado
        await sequelize.close();
    }
}


//sequelize.close para cerrar la conexion
realizarTransacciones();