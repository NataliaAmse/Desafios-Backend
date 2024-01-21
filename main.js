import crypto from 'crypto'

console.log(crypto.randomBytes(5).toString('hex'))

class ProductManager {
    constructor() {
        this.products = []
    }

    addProduct(product) {

        if (!product.title || !product.price || !product.thumbnail || !product.code || !product.stock) {
            return 'Son obligatorios todos los campos '
        }

        const exists = this.products.includes(prod => prod.code === product.code)

        if (exists) {
            return 'Este producto ya existe'
        } else {
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

const productManager = new ProductManager();

const viewProducts = productManager.getProducts();
console.log(viewProducts)

const product1 = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25
}

const addProduct1 = productManager.addProduct(product1);

console.log(addProduct1);

console.log(product1);


console.log('Producto recien agregado:', productManager.getProducts());


const product2 = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25
}

const addProduct2 = productManager.addProduct(product2);

if (addProduct2 === undefined) {
    console.log('El producto fue agregado correctamente');
} else {
    console.error('El producto no fue agregado correctamente:', addProduct2);
}


const productIdToFind = productManager.getProducts()[0].id;

const foundProduct = productManager.getProductById(productIdToFind);

if (foundProduct !== null) {
    console.log('El producto que fue encontrado por ID es:', foundProduct);
} else {
    console.error('El producto no fue encontrado');
}