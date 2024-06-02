import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import messageModel from './models/messages.js'
import indexRouter from './routes/indexRouter.js'
import initializePassport from './config/passport/passport.js'
import varenv from './dotenv.js'
import { addLogger } from './utils/logger.js'
import { Server } from 'socket.io'
import { engine } from 'express-handlebars'
import { __dirname } from './path.js'

//Configuraciones o declaraciones
const app = express()
const PORT = 8000

//Server
const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

const io = new Server(server)

//Connection DB
mongoose.connect(varenv.mongo_url)
    .then(() => console.log("DB is connected"))
    .catch(e => console.log(e))

//Middlewares
app.use(express.json())

app.use(session({
    secret: varenv.session_secret,
    resave: true,
    store: MongoStore.create({
        mongoUrl: varenv.mongo_url,
        ttl: 60 * 60
    }),
    saveUninitialized: true
}))

app.use(cookieParser(varenv.cookies_secret))
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(addLogger)

app.get('/', (req, res) => {
    try {
        res.send("Hola")
        req.logger.error("ERROR")
    } catch (e) {
        req.logger.error(e)
        res.status(500).send(e)
    }

})

app.get('/suma', (req, res) => {
    try {
        let suma = 0
        for (let i = 0; i < 10000; i++) {
            suma += 1
        }
        res.status(200).send(`El resultado de la suma es ${suma}`)
    } catch (e) {
        console.log(e)
        req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        res.status(500).send(e)
    }
})

app.get('/multiplicacion', (req, res) => {
    try {
        let multiplicacion = 1
        for (let i = 0; i < 4000; i++) {
            multiplicacion *= 1
        }
        res.status(200).send(`El resultado de la multiplicacion es ${multiplicacion}`)
    } catch (e) {
        req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        res.status(500).send(e)
    }

})


app.listen(4000, () => console.log("Server on port 4000"))

//Routes

app.use('/', indexRouter)

//Routes Cookies
app.get('/setCookie', (req, res) => {
    res.cookie('CookieCookie', 'Esto es una cookie :)', { maxAge: 3000000, signed: true }).send("Cookie creada")
})

app.get('/getCookie', (req, res) => {
    res.send(req.signedCookies)
})

app.get('/deleteCookie', (req, res) => {
    res.clearCookie('CookieCookie').send("Cookie eliminada")
    //res.cookie('CookieCokie', '', { expires: new Date(0) })
})

//Session Routes

app.get('/session', (req, res) => {
    console.log(req.session)
    if (req.session.counter) {
        req.session.counter++
        res.send(`Sos el usuario N° ${req.session.counter} en ingresar a la pagina`)
    } else {
        req.session.counter = 1
        res.send("Sos el primer usuario que ingresa a la pagina")
    }
})

app.post('/login', (req, res) => {
    const { email, password } = req.body

    if (email == "admin@admin.com" && password == "1234") {
        req.session.email = email
        req.session.password = password


    }
    console.log(req.session)
    res.send("Login")
})

io.on('connection', (socket) => {
    console.log("Conexion con Socket.io")

    socket.on('mensaje', async (mensaje) => {
        try {
            await messageModel.create(mensaje)
            const mensajes = await messageModel.find()
            io.emit('mensajeLogs', mensajes)
        } catch (e) {
            io.emit('mensajeLogs', e)
        }

    })

})