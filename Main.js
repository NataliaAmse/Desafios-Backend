import { Product } from "./config/Product.js";
import { ProductManager } from "./config/ProductManager.js";

const app = express()
const PORT = 8000
const productManager = new ProductManager('./data/Products.json')

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hola, desde mi primer servidor en Express")
})

app.get('/products', async (req, res) => {
    try {
        const { limit } = req.query
        const prods = await productManager.getProducts()
        let limite = parseInt(limit)
        if (!limite)
            limite = prods.length
        console.log(limite)
        const prodsLimit = prods.slice(0, limite)
        res.status(200).send(prodsLimit)

    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar productos: ${error}`)
    }
})

app.get('/products/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid 
        const prod = await productManager.getProductById(idProducto)
        if (prod)
            res.status(200).send(prod)
        else
            res.status(404).send("Producto no existe")
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar producto: ${error}`)
    }
})

app.post('/products', async (req, res) => {
    try {
        const product = req.body
        console.log(product)
        const mensaje = await productManager.addProduct(product)
        if (mensaje == "Producto creado correctamente")
            res.status(200).send(mensaje)
        else
            res.status(400).send(mensaje)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al crear producto: ${error}`)
    }
})

app.put('/products/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid
        const updateProduct = req.body
        const mensaje = await productManager.updateProduct(idProducto, updateProduct)
        if (mensaje == "Producto actualizado correctamente")
            res.status(200).send(mensaje)
        else
            res.status(404).send(mensaje)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al actualizar producto: ${error}`)
    }
})

app.delete('/products/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid
        const mensaje = await productManager.deleteProduct(idProducto)
        if (mensaje == "Producto eliminado correctamente")
            res.status(200).send(mensaje)
        else
            res.status(404).send(mensaje)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al eliminar producto: ${error}`)
    }
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})



/*

const producto1 = new Product("Pelota para perros", "Juguete", 3000, 8, "j987")
const producto2 = new Product("Cucha para perros", "Descanso", 50000, 4, "d654")
const producto3 = new Product("Pipeta para pulgas y garrapatas", "Antipulgas", 1000, 32, "a321")
const producto4 = new Product("Arnes para perros", "Paseos", 9000, 23, "p098")


const productManager = new ProductManager('./data/Products.json') */
