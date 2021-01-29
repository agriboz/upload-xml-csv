export default function ({ $axios, redirect, store }) {
  $axios.onError((error) => {
    if (error.response.status === 500) {
      redirect('/sorry')
    }
  })
  $axios.onRequest((config) => {
    const token = store.state.user.user.token
    if (token) {
      $axios.setToken(token)
    }
  })
}
