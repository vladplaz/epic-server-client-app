<template>
  <div class="todo-container">
    <div class="todo-item">
      <i class="material-icons prefix edit"
         @click="editHandler"
      >mode_edit</i>
      <div class="todo-item-text">
        {{ todo.text }}
      </div>
      <div v-if="todo.executed" class="executed"></div>
      <div class="todo-item-actions">
        <p>
          <label>
            <input type="checkbox"
                   :checked="todo.executed"
                   @change="execHandler"
            />
            <span></span>
          </label>
        </p>
        <i class="material-icons prefix star"
           :class="{ 'stared':todo.stared }"
           @click="starHandler()">
          {{ todo.stared ? 'star' : 'star_border' }}
        </i>
        <i v-if="!isSearch" class="material-icons prefix delete"
           @click="deleteHandler"
        >
          delete
        </i>
      </div>
      <i v-if="todo.todos.length>0&&!isSearch" class="material-icons open"
         @click="openHandler"
      >
        keyboard_arrow_down
      </i>
      <i v-if="!isSearch" class="material-icons add"
         @click="createTodoHandler"
      >
        add
      </i>
    </div>

    <div class="next" v-if="isCreating">
      <TodoForm :parent="todo.id"/>
    </div>
    <div class="next" v-if="todo.isOpen">
      <TodoList :todos="todo.todos"/>
    </div>
    <EditModal @editFinish="onEditFinish" v-if="isEdit"
               :todoText="todo.text"
               :onEditFinish="onEditFinish"/>
  </div>
</template>

<script>

import EditModal from '@/components/EditModal'
import TodoForm from '@/components/TodoForm'

export default {
  name: 'TodoListItem',
  components: {
    TodoList: () => import('@/components/TodoList'),
    TodoForm,
    EditModal
  },
  props: ['todo'],
  data: () => ({
    isCreating: false,
    isEdit: false
  }),
  methods: {
    editHandler() {
      this.isEdit = !this.isEdit
    },
    execHandler() {
      this.$store.dispatch('markExecuted', {
        executed: !this.todo.executed,
        id: this.todo.id
      })
    },
    starHandler() {
      if(this.isSearch) {
        this.todo.stared = !this.todo.stared
      }
      this.$store.dispatch('markStared', {
        stared: !this.todo.stared,
        id: this.todo.id
      })
    },
    deleteHandler() {
      if(window.confirm('Delete this todo?')) {
        this.$store.dispatch('deleteTodos', this.todo)
      }
    },
    openHandler() {
      this.$store.dispatch('changeOpen', {
        id: this.todo.id,
        isOpen: !this.todo.isOpen
      })
    },
    createTodoHandler() {
      this.isCreating = !this.isCreating
    },
    onEditFinish(result) {
      this.isEdit = false
      if(result.status === 'ok') {
        this.$store.dispatch('edit', {
          text: result.text,
          id: this.todo.id
        })
      }
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
.todo-item {
  position: relative;
  width: 40rem;
  background-color: #957ca5;
  border-radius: 1rem;
  padding: 0.1rem 0.6rem 0.1rem 1rem;
  display: flex;
  justify-content: space-between;
  color: white;
  align-items: center;
  margin-bottom: 2.5rem;
}

.todo-item-actions {
  display: flex;
  margin-left: 1rem;
}

.todo-item-actions p,
.todo-item-actions i {
  margin: 0;
}

.todo-item-text {
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.executed {
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  height: 4.8rem;
  left: 0;
  border-bottom-color: #57db57;
  border-bottom-width: 0.4rem;
  border-bottom-style: solid;
  border-bottom-right-radius: 0.8rem;
  border-bottom-left-radius: 0.8rem;
  width: 40rem;
}

.todo-item-actions .star {
  padding: 10px 0;
  margin-right: 2.5rem;
  cursor: pointer;
  z-index: 100;
}

.todo-item-actions .delete {
  padding: 10px 0;
}

.todo-item-actions .star.stared {
  color: #ffff00;
  transform: scale(1.2);
}

p label span {
  color: white;
  top: 10px;
  margin-right: -5px;
}

.stared {
  cursor: pointer;
}

.open {
  transform: scale(1.3);
  position: absolute;
  left: 0.5rem;
  cursor: pointer;
  z-index: 100;
  bottom: -1.8rem;
}

.add {
  position: absolute;
  left: 2.3rem;
  cursor: pointer;
  z-index: 100;
  bottom: -1.8rem;
}

.delete {
  transform: scale(1.2);
  position: absolute;
  cursor: pointer;
  color: #e02828;
  right: 0.5rem;
  z-index: 99;
}

.next {
  margin-left: 4rem;
}

.prefix {
  cursor: pointer;
  margin-right: 1rem;
}

.edit {
  z-index: 1000;
}
</style>
