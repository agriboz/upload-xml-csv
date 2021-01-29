import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config.js';

import AuthRoute from './routes/auth.js'
import ProductsRoute from './routes/products.js'

export default (app) => {
  app.use(express.json())
  app.use(cors())

  mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected')
  });

  app.use('/api/user', AuthRoute)
  app.use('/api/products', ProductsRoute)
}