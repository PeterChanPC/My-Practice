<template>
  <div class="todo-list">
    <div class="todo-header">
      <div class="todo-list-name">{{ title }}</div>
      <i class="fi fi-rr-pencil" @click="toggleEdit"></i>
    </div>
    <TodoItem v-bind="$attrs" 
              v-for="todoItem in todoList" 
              :key="todoItem.id" 
              :todoItem="todoItem"
              :editMode="editMode">
    </TodoItem>
  </div>
</template>

<script setup>
import TodoItem from './TodoItem.vue'
import { defineProps, ref } from 'vue'

const props = defineProps({
  todoList: Array,
  title: {
    type: String,
    default: 'What to do next ...'
  }
})

let editMode = ref(false)
const toggleEdit = () => {
  editMode.value = !editMode.value
}

</script>

<style scoped>
  .todo-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 1em;
    border: 1px solid #ddd;
    background: #eee;
      
    .todo-header {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;

      .todo-list-name {
        padding: .7em .7em;
        text-transform: capitalize;
        font-size: 1.5em;
        font-weight: bold;
        text-align: start;
      }

      i {
        margin: 1em;
        font-size: 1.2em;

        &:hover {
          cursor: pointer;
        }
      }
    }

    &:hover {
      border-color: #ccc;
    }
  }

</style>