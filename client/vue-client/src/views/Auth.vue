<template>
  <div class="row">
    <div class="col s12">
      <ul class="tabs" ref="tabs">
        <li class="tab col s6"><a class="active" href="#login">Login</a></li>
        <li class="tab col s6"><a href="#register">Register</a></li>
      </ul>
    </div>
    <div id="login" class="col s12">
      <LoginForm/>
    </div>
    <div id="register" class="col s12">
      <RegisterForm/>
    </div>
  </div>
</template>

<script>

import MaterialService from '../../../react-client/src/shared/MaterializeService'
import LoginForm from '@/components/LoginForm'
import RegisterForm from '@/components/RegisterForm'

export default {
  mounted() {
    MaterialService.initTabs(this.$refs.tabs)
  },
  components: {
    LoginForm,
    RegisterForm
  }
}
</script>

<style scoped>
.tabs {
  width: 40rem;
  border: none;
}

.tabs a {
  color: #6a1b9a !important;
}

.tabs .indicator {
  background-color: #a340e0;
}

.input-field {
  width: 40rem;
  margin: 2rem auto;
}

.input-field button {
  float: right;
}

label {
  width: 5rem !important;
}

#register, #login {
  transition: all 2s;
}
</style>
