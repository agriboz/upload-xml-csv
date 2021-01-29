import Product from '../model/Product.js'

export const getProducts = async (req, res) => {
  try {
    await Product.find({ createdBy: req.user._id }, (err, posts) => {
      res.send(posts)
    })
  } catch (err) {
    res.status(400).send(err)
  }
}

export const createProducts = async (req, res) => {
  const products = Product({
    ...req.body,
    createdBy: req.user._id
  })

  try {
    const savedProducts = await products.save()
    res.send(savedProducts)
  } catch (err) {
    res.status(400).send(err)
  }
}

export const getProductById = async (req, res) => {
  const products = Product({
    ...req.body,
    createdBy: req.user._id
  })

  try {
    const savedProducts = await products.save()
    res.send(savedProducts)
  } catch (err) {
    res.status(400).send(err)
  }
}

export const deleteProduct = async (req, res) => {
  const products = Product({
    ...req.body,
    createdBy: req.user._id
  })

  try {
    const savedProducts = await products.save()
    res.send(savedProducts)
  } catch (err) {
    res.status(400).send(err)
  }
}
