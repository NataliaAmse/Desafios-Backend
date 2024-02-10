import express from 'express'
import cartRouter from './routes/cartRouter.js'
import productsRouter from './routes/productsRouter.js'
import upload from './config/multer.js'


const app = express()
const PORT = 8000
const productManager = new ProductManager('./data/Products.json')

app.use(express.json())

app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)
app.post('/upload', upload.single('product'), (req, res) => {
    try {
        console.log(req.file)
        res.status(200).send("Imagen cargada correctamente")
    } catch (e) {
        res.status(500).send("Error al cargar imagen")
    }
})


app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

