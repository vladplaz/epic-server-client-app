<template>
  <div class="container" v-if="!loading">
    <div class="row">
      <form class="col s6" @submit.prevent="submitHandler">
        <div class="image">
          <img class="materialboxed" width="200"
               :src="imagePreview" alt="profile"/>
        </div>
        <div class="file-field input-field">
          <div class="btn">
            <span>File</span>
            <input type="file"
                   @change="imageHandler"/>
          </div>
          <div class="file-path-wrapper">
            <input class="file-path" type="text"/>
          </div>
          <div class="input-field col s6">
            <i class="material-icons prefix">account_circle</i>
            <input type="text"
                   placeholder="Username"
                   v-model="userName"
                   name="userName"/>
          </div>
        </div>
        <button class="btn" type="submit">Save</button>
      </form>
    </div>
  </div>

  <Spinner v-else/>
</template>

<script>

import Spinner from '../components/Spinner'

export default {
  data: () => ({
    userName: '',
    imagePreview: '',
    image: null,
    loading: false
  }),
  methods: {
    imageHandler(e) {
      if(e.target.files && e.target.files[0]) {
        const reader = new FileReader()
        this.image = e.target.files[0]
        reader.onload = (e) => {
          this.imagePreview = e.target.result
        }
        reader.readAsDataURL(e.target.files[0])
      }
    },
    async submitHandler() {
      this.loading = true
      await this.$store.dispatch('editUser', {
        userName: this.userName,
        image: this.image
      })
      this.loading = false
    }
  },
  components: {
    Spinner
  },
  watch: {
    user() {
      this.userName = this.user.userName
      this.imagePreview = this.user.imageUrl
    }
  },
  computed: {
    user() {
      return this.$store.getters.profile
    }
  },
  mounted() {
    const user = this.$store.getters.profile
    this.userName = user.userName
    this.imagePreview = user.imageUrl
  }
}
</script>

<style scoped>
.image {
  margin-top: 2rem;
}

.file-path-wrapper {
  width: 20rem !important;
}

.input-field {
  width: 25rem !important;
}

img {
  border-radius: 5px;
}
</style>
