import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { fontawesome } from './helpers/fontawesome.js'
import compression from 'compression'
import helmet from 'helmet'

const app = express()
const server = http.createServer(app)
const socket = new Server(server)

const port = process.env.PORT || 3000

fontawesome(app)

app.set('view engine', 'ejs')
app.set('views', 'src/views')
app.set('trust proxy', true)

app.use(compression())
app.use(helmet())
app.use(express.static('src/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('**', (req, res) => res.render('index'))

socket.on('connection', (client) => {
	client.on('chat', (msg) => {
		socket.emit('chat', msg)
	})
})

server.listen(port, () => console.log(`Example app listening on port http://localhost:${port}/`))