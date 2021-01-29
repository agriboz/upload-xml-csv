<template>
  <div class="columns is-mobile is-centered">
    <div class="column is-half">
      <h5 class="title is-5">Log in</h5>
      <form @submit.prevent="login({ email, password })">
        <b-field
          label="Email"
          :type="validationMessages.checkEmail ? 'is-danger' : ''"
          :message="
            validationMessages.checkEmail ? validationMessages.checkEmail : ''
          "
        >
          <b-input
            v-model="email"
            placeholder="Your E-Mail"
            type="email"
            maxlength="255"
          >
          </b-input>
        </b-field>
        {{ password }}
        <b-field
          label="Password"
          :type="validationMessages.checkPassword ? 'is-danger' : ''"
          :message="
            validationMessages.checkPassword
              ? validationMessages.checkPassword
              : ''
          "
        >
          <b-input
            v-model="password"
            placeholder="password"
            type="password"
            maxlength="30"
          ></b-input>
        </b-field>
        <div class="is-flex is-justify-content-space-between">
          <b-button type="is-ghost" @click="navigateRegister"
            >Register</b-button
          >
          <b-button type="is-primary" native-type="submit">Log in</b-button>
        </div>
      </form>
      <div v-if="alert.message" :class="`notification ${alert.type} mt-2`">
        {{ alert.message }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: () => ({
    email: null,
    password: null,
  }),
  computed: {
    ...mapState(['user', 'alert']),
    validationMessages() {
      const checkEmail =
        this.$store.state.user.validation?.type === 'email' &&
        this.$store.state.user.validation.message
      const checkPassword =
        this.$store.state.user.validation?.type === 'password' &&
        this.$store.state.user.validation.message
      return { checkEmail, checkPassword }
    },
  },
  methods: {
    ...mapActions({
      login: 'user/login',
    }),
    navigateRegister() {
      this.$router.push({ path: 'register' })
    },
  },
}
</script>
