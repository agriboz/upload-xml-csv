import express from 'express'
import middlewares from './middlewares.js'

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 666
// change port to safe one could be > 8080, 3000 
app.set('port', port)

middlewares(app)

app.listen(port, host)
console.log('Server listening on ' + host + ':' + port)
