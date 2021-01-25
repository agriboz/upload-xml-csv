import express from 'express'
import mongoose from 'mongoose'
import AuthRoute from './routes/auth.js'
import 'dotenv/config.js';

const app = express()
app.use(express.json())

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 666

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('connected')
});

app.set('port', port)


app.use('/api/user', AuthRoute)

app.listen(port, host)
console.log('Server listening on ' + host + ':' + port)