export const state = () => ({
  products: [],
  productDetails: [],
})

export const mutations = {
  setProducts(state, products) {
    state.products = products
  },
  setProductDetails(state, productId) {
    const data = state.products.filter((item) => item._id === productId)[0]
    state.productDetails = data
  },
  removeProduct(state, product) {
    state.products = state.products.filter((item) => item._id !== product._id)
  },
  updateProduct(state, product) {
    state.products = state.products.map((item) =>
      item.id === product.id ? product : item
    )
  },
}

export const actions = {
  async getProducts({ commit, dispatch }) {
    try {
      const { data } = await this.$axios.get('/products')
      await commit('setProducts', data)
    } catch (err) {
      await dispatch('alert/error', err.response.data, { root: true })
    }
  },
  async getProductDetails({ commit, dispatch }, productId) {
    try {
      // const { data } = await this.$axios.get(`/products/${productId}`)
      await commit('setProductDetails', productId)
    } catch (err) {
      await dispatch('alert/error', err.response.data, { root: true })
    }
  },
  async saveProduct({ dispatch }, products) {
    try {
      const { data } = await this.$axios.post('/products', products)
      await dispatch('alert/clear', data, { root: true })
      await dispatch('alert/success', 'Your Document Successfuly Created', {
        root: true,
      })
    } catch (err) {
      await dispatch('alert/error', err.response.data, { root: true })
    }
  },
}
