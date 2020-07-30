<template>
  <div class="input-field search">
    <input type="text" v-model="text"
           placeholder="Search items..."
           class="input-search"/>
    <i class="material-icons search-icon"
       :class="{'is-search':isSearch}"
    >search</i>
  </div>
</template>

<script>
export default {
  name: 'SearchForm',
  data: () => ({
    text: ''
  }),
  watch: {
    text() {
      this.$store.dispatch('onSearch',this.text)
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
.search {
  position: fixed;
  top: 5.3rem;
  z-index: 10;
  margin: 0 !important;
  height: 4rem;
  right: 0;
}

.input-search {
  padding: 0 !important;
  padding-right: 2rem !important;
  width: 8rem !important;
}

.search-icon {
  position: relative;
  top: 5px;
  right: 25px;
  transition: all 0.5s ease-in-out;
}

.is-search {
  color: rgb(8, 125, 49);
}

@media screen and (max-width: 1280px) {
  .search {
    top: 10.5rem;
  }
}
</style>
