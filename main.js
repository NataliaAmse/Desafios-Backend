// El modulo crypto permite trabajar cryptografia con nodejs
import crypto from 'crypto'

console.log(crypto.randomBytes(5).toString('hex'))

class ProductManager {
    constructor() {
        this.products = []
    }

    addProduct(product) {

        // Validar que todos los datos se hayan ingresado
        if (!product.title || !product.price || !product.thumbnail || !product.code || !product.stock) {
            return 'Todos los campos son obligatorios'
        }

        // array.includes() devuelve un booleano para saber si ya existe ese product
        const exists = this.products.includes(prod => prod.code === product.code)

        // Si existe el producto en el array, devolver error
        if (exists) {
            return 'Producto ya existente'
        } else {
            // crypto permite agregar un id autoincrementable, devuelve un num random y lo pasa a string, asi tengo un id unico
            product.id = crypto.randomBytes(5).toString('hex')
            this.products.push(product)
        }
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        const product = this.products.find(prod => prod.id === id);

        if (product) {
            return product;
        } else {
            console.error('Not found. ID:', id);
            return null;
        }
    }
}

// Se creará una instancia de la clase “ProductManager”
const productManager = new ProductManager();


// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
const viewProducts = productManager.getProducts();
console.log(viewProducts)


// Se llamará al método “addProduct” con los campos:
const product1 = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25
}

// El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
const addProduct1 = productManager.addProduct(product1);

console.log(addProduct1);

console.log(product1);


// Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log('Productos actuales:', productManager.getProducts());



// Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
const product2 = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25
}

const addProduct2 = productManager.addProduct(product2);

// Verificar si se agrega de nuevo el mismo producto, debería ser un mensaje de error, pero no da error
if (addProduct2 === undefined) {
    console.log('Producto agregado correctamente');
} else {
    console.error('Error al agregar el producto nuevamente:', addProduct2);
}



// Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
const productIdToFind = productManager.getProducts()[0].id;

const foundProduct = productManager.getProductById(productIdToFind);

// Verificar si se encontró el producto
if (foundProduct !== null) {
    console.log('Producto encontrado por ID:', foundProduct);
} else {
    console.error('Not found');
}