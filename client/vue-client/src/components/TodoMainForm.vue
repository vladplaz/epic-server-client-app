<template>
  <div class="row">
    <div class="input-field">
      <i class="material-icons prefix">mode_edit</i>
      <input placeholder="Add todo..."
             class="materialize-input"
             v-model="text"
             @keydown="submitHandler"
             :disabled="isSearch"
      />
      <i class="material-icons prefix"
         :class="{'stared':stared}"
         @click="starHandler"
      >
        {{ stared ? 'star' : 'star_border' }}
      </i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoMainForm',
  data: () => ({
    text: '',
    stared: false
  }),
  methods: {
    submitHandler(e) {
      if(e.key === 'Enter') {
        if(this.text.trim()) {
          this.$store.dispatch('add', {
            text: this.text,
            stared: this.stared
          })
          this.text = ''
          this.stared = false
        }
      }
    },
    starHandler() {
      this.stared = !this.stared
    }
  },
  computed: {
    isSearch() {
      return this.$store.getters.isSearch
    }
  }
}
</script>

<style scoped>
.input-field i {
  cursor: pointer;
}

i.stared {
  color: yellow;
}
</style>
