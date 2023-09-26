const fs = require('fs');

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

class ProductManager {
    constructor(path) {
        this.path = path;

        // Crear un archivo si no existe
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify([]));
        }
    }

    _readProducts() {
        const data = fs.readFileSync(this.path, 'utf8');
        return JSON.parse(data);
    }

    _writeProducts(products) {
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    }

    addProduct(product) {
        const products = this._readProducts();
        product.id = products.length + 1;
        products.push(product);
        this._writeProducts(products);
    }

    getProducts() {
        return this._readProducts();
    }

    getProductById(productId) {
        const products = this._readProducts();
        return products.find(product => product.id === productId);
    }

    updateProduct(productId, updatedFields) {
        const products = this._readProducts();
        const updatedProducts = products.map(product => {
            if (product.id === productId) {
                return Object.assign({}, product, updatedFields);
            }
            return product;
        });
        this._writeProducts(updatedProducts);
    }

    deleteProduct(productId) {
        const products = this._readProducts();
        const updatedProducts = products.filter(product => product.id !== productId);
        this._writeProducts(updatedProducts);
    }
}

// Ejemplo de uso
const productManager = new ProductManager('productos.json');

// Agregar un producto
const newProduct = new Product('Producto 1', 'Descripción del Producto 1', 10.99, 'thumbnail1.jpg', 'ABC123', 100);
productManager.addProduct(newProduct);
const product1 = new Product('Camisa', 'Camisa de algodón', 20.99, 'shirt.jpg', 'P123', 50);
productManager.addProduct(product1);

const product2 = new Product('Pantalón', 'Pantalón de mezclilla', 25.99, 'pants.jpg', 'P456', 30);
productManager.addProduct(product2);

const product3 = new Product('Zapatos', 'Zapatos deportivos', 35.99, 'shoes.jpg', 'P789', 40);
productManager.addProduct(product3);
// Obtener todos los productos
console.log('Productos:');
console.log(productManager.getProducts());

// Obtener un producto por su ID
const productIdToGet = 1;
console.log(`\nObtener producto con ID ${productIdToGet}:`);
console.log(productManager.getProductById(productIdToGet));

// Actualizar un producto
const productIdToUpdate = 1;
const updatedFields = { price: 15.99, stock: 80 };
console.log(`\nActualizar producto con ID ${productIdToUpdate}:`);
productManager.updateProduct(productIdToUpdate, updatedFields);
console.log(productManager.getProductById(productIdToUpdate));

// Eliminar un producto
const productIdToDelete = 1;
console.log(`\nEliminar producto con ID ${productIdToDelete}:`);
productManager.deleteProduct(productIdToDelete);
console.log(productManager.getProducts());
