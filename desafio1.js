
class ProductManager {
    constructor() {
        this.productos = [];
        this.autoIncrementId = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error('Todos los campos son obligatorios.');
            return;
        }

        if (this.productos.some((producto) => producto.code === code)) {
            console.error('El código de producto ya existe.');
            return;
        }

        const producto = {
            id: this.autoIncrementId++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        this.productos.push(producto);
        return producto;
    }

    getProducts() {
        return this.productos;
    }

    getProductById(id) {
        const productoEncontrado = this.productos.find((producto) => producto.id === id);
        if (!productoEncontrado) {
            console.error('Producto no encontrado.');
        }
        return productoEncontrado;
    }
}

const manager = new ProductManager();

manager.addProduct('Televisor', 'Televisor LED de 55 pulgadas', 699.99, 'imagen_televisor.jpg', 'TV001', 20);
manager.addProduct('Laptop', 'Laptop HP Pavilion 15', 899.99, 'imagen_laptop.jpg', 'LT002', 15);
manager.addProduct('Smartphone', 'Smartphone Samsung Galaxy S20', 799.99, 'imagen_smartphone.jpg', 'SP003', 30);

const todosLosProductos = manager.getProducts();
console.log('Todos los productos:', todosLosProductos);

const productoEncontrado = manager.getProductById(2);
console.log('Producto encontrado:', productoEncontrado);

// Intentar agregar un producto con el mismo código (debería mostrar un error)
manager.addProduct('Tablet', 'Tablet Samsung Galaxy Tab A', 199.99, 'imagen_tablet.jpg', 'SP003', 10);