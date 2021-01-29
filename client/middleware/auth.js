export default function ({ store, redirect, route }) {
  if (!store.state.user.user.token) {
    store.state.redirect = route
    return redirect('/')
  }
}
