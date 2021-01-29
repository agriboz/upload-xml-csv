<template>
  <div class="columns is-mobile is-centered">
    <div class="column is-half">
      <h5 class="title is-5">Register</h5>
      <form @submit.prevent="register({ name, email, password })">
        <b-field
          label="Name"
          :type="validationMessages.name ? 'is-danger' : ''"
          :message="validationMessages.name ? validationMessages.name : ''"
        >
          <b-input v-model="name" placeholder="Name" maxlength="255"> </b-input>
        </b-field>
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
        <b-field
          v-model="password"
          label="Password"
          :type="validationMessages.password ? 'is-danger' : ''"
          :message="
            validationMessages.password ? validationMessages.password : ''
          "
        >
          <b-input
            placeholder="password"
            type="password"
            maxlength="30"
          ></b-input>
        </b-field>
        <div class="is-flex is-justify-content-space-between">
          <b-button type="is-primary" expanded native-type="submit"
            >Register</b-button
          >
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
    name: null,
    email: null,
    password: null,
  }),
  computed: {
    ...mapState(['user', 'alert']),
    validationMessages() {
      const checkName =
        this.$store.state.user.validation?.type === 'name' &&
        this.$store.state.user.validation.message
      const checkEmail =
        this.$store.state.user.validation?.type === 'email' &&
        this.$store.state.user.validation.message
      const password =
        this.$store.state.user.validation?.type === 'password' &&
        this.$store.state.user.validation.message
      return { checkName, checkEmail, password }
    },
  },
  beforeMount() {
    this.clearAlerts()
    this.clearValidation()
  },
  methods: {
    ...mapActions({
      clearValidation: 'user/clearValidation',
      clearAlerts: 'alert/clear',
      register: 'user/register',
    }),
  },
}
</script>
