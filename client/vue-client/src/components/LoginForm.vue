<template>
  <div class="row">
    <form class="col s12" @submit.prevent="submitHandler">
      <div class="row">
        <div class="input-field">
          <i class="material-icons prefix">alternate_email</i>
          <input id="email_l" type="text"
                 name="email"
                 v-model="email"/>
          <label for="email_l">Email</label>
          <span v-if="$v.email.$dirty&&!$v.email.required"
                class="helper-text red-text">Email is required</span>
        </div>
        <div class="input-field">
          <i class="material-icons prefix">vpn_key</i>
          <input id="password_l" type="password"
                 name="password"
                 v-model="password"/>
          <label for="password_l">Password</label>
          <span v-if="$v.password.$dirty&&!$v.password.required"
                class="helper-text red-text">Password is required</span>
        </div>
        <div class="input-field">
          <button class="btn"
                  :disabled="loading"
                  type="submit"
          >Login
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>

import {required} from 'vuelidate/lib/validators'

export default {
  name: 'LoginForm',
  data: () => ({
    email: '',
    password: '',
    loading: false
  }),
  validations: {
    email: {required},
    password: {required}
  },
  methods: {
    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      this.loading = true
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      }).catch(err => {
        this.$notify({
          text: err.message || 'Error',
          type: 'error',
          duration: 3000
        })
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
