import mongoose from 'mongoose'

const ProductSchema = mongoose.Schema({
  data: [{
    handle: {
      type: String,
      required: true
    },
    amount: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    }
  }],
  details: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

const ProductModel = mongoose.model('Products', ProductSchema)

export default ProductModel
