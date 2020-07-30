<template>
  <div class="container" v-if="!loading">
    <TodoMainForm/>
    <SearchForm/>
    <div class="todos" v-if="items.length">
      <TodoList :todos="items"/>
    </div>
    <div v-else>
      <p v-if="isSearch" class="center no-todos">No items by this search</p>
      <p v-if="!isSearch" class="center no-todos">Lets begin</p>
    </div>
  </div>
  <Spinner v-else/>
</template>

<script>

import Spinner from '../components/Spinner'
import TodoMainForm from '@/components/TodoMainForm'
import SearchForm from '@/components/SearchForm'
import TodoList from '@/components/TodoList'

export default {
  data: () => ({
    loading: true,
    items: []
  }),
  components: {
    Spinner,
    TodoList,
    TodoMainForm,
    SearchForm
  },
  computed: {
    todos() {
      return this.$store.getters.todos
    },
    searchTodos() {
      return this.$store.getters.searchTodos
    },
    isSearch() {
      return this.$store.getters.isSearch
    }
  },
  watch: {
    isSearch() {
      this.items = this.isSearch
          ? this.searchTodos
          : this.todos
    },
    todos() {
      this.items = this.isSearch
          ? this.searchTodos
          : this.todos
    },
    searchTodos() {
      this.items = this.isSearch
          ? this.searchTodos
          : this.todos
    }
  },
  async mounted() {
    await this.$store.dispatch('fetch')
    this.loading = false
    this.items = this.todos
  }
}
</script>

<style scoped>
.no-todos {
  font-weight: bold;
  font-size: 18px;
  color: #a362cd;
}

input::placeholder {
  color: #bf86e3;
}

.todos {
  margin-left: 15%;
}

@media screen and (max-width: 1280px) {
  .todos {
    margin-top: 3rem;
  }
}
</style>
