<template>
  <div class="row form">
    <div class="input-field">
      <input placeholder="Add branch...."
             class="materialize-textarea"
             v-model="text"
             @keydown="submitHandler"
             ref="input"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoForm',
  props: ['parent'],
  data: () => ({
    text: ''
  }),
  methods: {
    submitHandler(e) {
      if(e.key === 'Enter') {
        this.$store.dispatch('add', {
          text: this.text,
          parent: this.parent
        })
      }
    }
  },
  mounted() {
    this.$refs.input.focus()
  }
}
</script>

<style scoped>
.form .input-field {
  width: 35.8rem !important;
  margin: 0;
}

.form {
  position: relative;
  bottom: 2rem;
  margin: 0;
}
</style>
