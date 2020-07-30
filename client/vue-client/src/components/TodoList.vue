<template>
  <div>
    <div class="item" v-for="(todo,index) in todos"
         :key="JSON.stringify(todo)">
      <div class="circle"></div>
      <div v-if="index < todos.length - 1" class="line"></div>
      <TodoListItem :todo="todo"/>
    </div>
  </div>
</template>

<script>
import TodoListItem from '@/components/TodoListItem'

export default {
  name: 'TodoList',
  props: ['todos'],
  components: {
    TodoListItem
  }
}
</script>

<style scoped>
.item {
  position: relative;
}

.circle {
  position: absolute;
  top: 0.7rem;
  left: -3rem;
  height: 2rem;
  width: 2rem;
  background-color: #57db57;
  z-index: 10;
  border: 1px dashed #3f0066;
}

.line {
  position: absolute;
  height: 130%;
  top: 2.5rem;
  left: -2.2rem;
  width: 0.4rem;
  background-color: #57db57;
}

.row {
  margin-bottom: 0;
}

.list-enter {
  opacity: 0.01;
}

.list-enter.list-enter-active {
  opacity: 1;
  transition: opacity 1000ms ease-in;
}

.list-leave {
  opacity: 1;
}

.list-leave.list-leave-active {
  opacity: 0.01;
  transition: opacity 1000ms ease-in;
}
</style>
