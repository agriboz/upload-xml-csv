import { Router } from 'express'
import verify from '../utils/verifyToken.js'
import { getProducts, createProducts, getProductById, deleteProduct } from '../controllers/product.js'

const router = Router()

router.get('/', verify, getProducts)
router.post('/', verify, createProducts)
router.get('/:id', verify, getProductById)
router.delete('/:id', verify, deleteProduct)

export default router