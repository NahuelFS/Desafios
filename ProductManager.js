// ProductManager.js
import { promises as fs } from 'fs';

class ProductManager {
  static async getAllProducts(limit) {
    try {
      const productsData = await fs.readFile('products.json', 'utf-8');
      const products = JSON.parse(productsData);

      if (limit) {
        return products.slice(0, limit);
      }

      return products;
    } catch (error) {
      throw new Error('Error al obtener los productos.');
    }
  }

  static async getProductById(pid) {
    try {
      console.log('Intentando obtener producto con ID:', pid); // Mensaje de log
      const productsData = await fs.readFile('products.json', 'utf-8');
      const products = JSON.parse(productsData);

      const product = products.find(p => p.id === parseInt(pid, 10));

      if (product) {
        console.log('Producto encontrado:', product); // Mensaje de log
        return product;
      } else {
        console.log('Producto no encontrado para el ID:', pid); // Mensaje de log
        return null;
      }
    } catch (error) {
      console.error('Error al obtener el producto:', error); // Mensaje de log
      throw new Error('Error al obtener el producto.');
    }
  }
}

export default ProductManager;
