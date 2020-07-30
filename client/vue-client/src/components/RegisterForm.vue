<template>
  <div class="row">
    <form class="col s12" @submit.prevent="submitHandler">
      <div class="row">
        <div class="input-field">
          <i class="material-icons prefix">account_circle</i>
          <input id="username" type="text"
                 name="userName"
                 v-model="userName"/>
          <label for="username">Username</label>
          <span class="helper-text red-text"
                v-if="$v.userName.$dirty&&!$v.userName.required"
                data-error="wrong"
                data-success="right">Username is required</span>
          <span class="helper-text red-text"
                v-if="$v.userName.$dirty&&!$v.userName.minLength"
                data-error="wrong"
                data-success="right">Username min length is 4</span>
        </div>
        <div class="input-field">
          <i class="material-icons prefix">alternate_email</i>
          <input id="email_r" type="text"
                 name="email"
                 v-model="email"/>
          <label for="email_r">Email</label>
          <span class="helper-text red-text"
                v-if="$v.email.$dirty&&!$v.email.required"
                data-error="wrong"
                data-success="right">Email is required</span>
        </div>
        <div class="input-field">
          <i class="material-icons prefix">vpn_key</i>
          <input id="password_r" type="password"
                 name="password"
                 v-model="password"/>
          <label class="password_r">Password</label>
          <span class="helper-text red-text"
                v-if="$v.password.$dirty&&!$v.password.required">
            Password is required
        </span>
          <span class="helper-text red-text"
                v-if="$v.password.$dirty&&!$v.password.minLength">
            Password min length is 6
        </span>
        </div>
        <div class="input-field">
          <button class="btn"
                  :disabled="loading"
                  type="submit"
          >Register
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>

import {required, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'RegisterForm',
  data: () => ({
    email: '',
    password: '',
    userName: '',
    loading: false
  }),
  validations: {
    email: {required},
    password: {required, minLength: minLength(6)},
    userName: {required, minLength: minLength(4)}
  },
  methods: {
    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      this.loading = true
      this.$store.dispatch('register', {
        email: this.email,
        password: this.password,
        userName: this.userName
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
label{
  z-index: -10;
}
</style>
