<template>
  <nav>
    <div class="nav-wrapper #6a1b9a purple darken-3">
      <div v-if="user.isAuth">
        <ul id="nav-mobile1" class="left">
          <li class="hello"><span>Hi {{ user.userName|capitalize }}</span></li>
        </ul>
      </div>
      <router-link to="/todos">
        <a class="brand-logo center">
          Todos App
        </a>
      </router-link>
      <ul id="nav-mobile" class="right">
        <li v-if="!user.isAuth">
          <router-link to="/">
            <a>Login/Register</a>
          </router-link>
        </li>
        <template v-if="user.isAuth">
          <img :src="user.imageUrl" class="image-profile" alt="profile"/>
          <li>
            <router-link to="/todos">
              <a>Todos</a>
            </router-link>
          </li>
          <li>
            <router-link to="/profile">
              <a>Profile</a>
            </router-link>
          </li>
          <li @click="logout" class="logout">
            <a>Logout</a>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    user() {
      return this.$store.getters.navbar
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  },
  filters: {
    capitalize: function(value) {
      if(!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<style scoped>
#nav-mobile {
  padding-right: 1.5rem;
  padding-bottom: 1rem;
}

a.active {
  background-color: #5f0e90;
}

button {
  background-color: #8626c1 !important;
}

.hello {
  cursor: pointer;
  margin-left: 2rem;
}

.image-profile {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: relative;
  right: 22rem;
  top: 0.8rem;
}
</style>
