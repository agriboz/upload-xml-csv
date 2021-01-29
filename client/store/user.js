import jwtDecode from 'jwt-decode'
const user = JSON.parse(localStorage.getItem('user'))

export const state = () => ({
  user: user || {},
  validation: null,
})

export const mutations = {
  setUser(state, token) {
    state.user = { ...jwtDecode(token), token }
  },
  setValidation(state, error) {
    state.validation = error
  },
  setClearValidation(state) {
    state.validation = null
  },
}

export const actions = {
  async login({ commit, dispatch }, { email, password }) {
    try {
      const { data } = await this.$axios.post('/user/login', {
        email,
        password,
      })
      localStorage.setItem(
        'user',
        JSON.stringify({ ...jwtDecode(data), token: data })
      )
      await dispatch('alert/clear', data, { root: true })
      await commit('setUser', data)
      await this.$router.push({
        path: '/products',
      })
    } catch (err) {
      await dispatch('alert/error', err.response.data, { root: true })
      await commit('setValidation', err.response.data)
    }
  },

  async clearValidation({ commit }) {
    await commit('setClearValidation')
  },
}
