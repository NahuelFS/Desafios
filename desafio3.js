// desafio3.js
import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const port = 8080; // Cambiado a puerto 8080

app.get('/products', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await ProductManager.getAllProducts(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await ProductManager.getProductById(pid);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});
