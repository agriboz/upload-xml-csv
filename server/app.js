import express from 'express'
import middlewares from './middlewares.js'

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 666

app.set('port', port)

middlewares(app)

app.listen(port, host)
console.log('Server listening on ' + host + ':' + port)