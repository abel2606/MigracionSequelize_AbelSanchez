const { Venta } = require('../models');

class VentaDAO {
    constructor() { }

    async crearVenta(total, iva) {
        try {
            const venta = await Venta.create({ total, iva });
            return venta;
        } catch (error) {
            throw error;
        }
    }

    async obtenerVentas(){
        try {
            const ventas = await Venta.findAll();
            return ventas;
        } catch (error) {
           throw error; 
        }
    }

    async obtenerVentaPorId(){
        try {
            const venta = await Venta.findByPk(id);
            return venta;
        } catch (error) {
            throw error;
        }
    }

    async actualizarVenta(id, total,iva){
        try {
            await Venta.update(
                {total,iva},
                {where: {id}}
            );
            const ventaActualizada = await Venta.findByPk(id);
            return ventaActualizada;
        } catch (error) {
            throw error;
        }
    }

    async eliminarVenta(id){
        try {
            const venta = await Venta.findByPk(id);
            if(!venta){
                throw new Error('Venta no encontrada');
            }
            await venta.destroy();
            return 'Venta eliminada con éxito';
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new VentaDAO();