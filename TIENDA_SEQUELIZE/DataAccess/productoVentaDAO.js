const { ProductoVenta } = require('../models');

class ProductoVentaDAO {
    constructor() { }

    async crearProductoVenta(idventa, idproducto, cantidadVendida, subtotal, precioVenta) {
        try {
            const productoVenta = await ProductoVenta.create({
                idventa,
                idproducto,
                cantidadVendida,
                subtotal,
                precioVenta,
            });
            return productoVenta
        } catch (error) {
            throw error;
        }
    }

    async obtenerProductosVenta() {
        try {
            const productosVenta = await ProductoVenta.findAll();
            return productosVenta
        } catch (error) {
            throw error;
        }
    }

    async obtenerProductoVentaPorId(id) {
        try {
            const productosVenta = await ProductoVenta.findByPk(id);
            return productosVenta
        } catch (error) {
            throw error;
        }
    }

    async actualizarProductoVenta(id, idventa, idproducto, cantidadVendida, subtotal, precioVenta) {
        try {
            await ProductoVenta.update(
                { idventa, idproducto, cantidadVendida, subtotal, precioVenta },
                { where: { id } }
            );
            const productoVentaActualizada = await ProductoVenta.findByPk(id);
            return productoVentaActualizada;
        } catch (error) {
            throw error;
        }
    }

    async eliminarProductoVenta(id) {
        try {
            const ProductoVenta = await ProductoVenta.findByPk(id);
            if (!ProductoVenta) {
                throw new Error('ProductoVenta no encontrada');
            }
            await ProductoVenta.destroy();
            return 'ProductoVenta eliminada con éxito';
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new ProductoVentaDAO();