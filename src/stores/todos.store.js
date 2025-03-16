import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useTodoStore = defineStore('todos', () => {
  const allTodos = ref(JSON.parse(localStorage.getItem('todos')) || [])

  const todayTodos = computed(() => {
    return allTodos.value.filter((todo) => {
      const fullDateNow = new Date()
      const dateNow = fullDateNow.getDate()
      const monthNow = fullDateNow.getMonth()
      const yearNow = fullDateNow.getFullYear()

      const todoFullDate = new Date(todo.date)
      const todoDate = todoFullDate.getDate()
      const todoMonth = todoFullDate.getMonth()
      const todoYear = todoFullDate.getFullYear()
      // check for date
      if (todoDate === dateNow &&
      // check for month
      todoMonth === monthNow &&
      // check for year
      todoYear === yearNow) return true

      return false
    })
  })

  const weekTodos = computed(() => {
    return allTodos.value.filter((todo) => {
      const fullDateNow = new Date()
      const dateNow = fullDateNow.getDate()
      const dayNow = fullDateNow.getDay()
      const monthNow = fullDateNow.getMonth()
      const yearNow = fullDateNow.getFullYear()
      const startDateofWeek = dateNow - dayNow
      
      const todoFullDate = new Date(todo.date)
      const todoDate = todoFullDate.getDate()
      const todoMonth = todoFullDate.getMonth()
      const todoYear = todoFullDate.getFullYear()
      // check for week
      if (7 > (todoDate - startDateofWeek) > 0 &&
      // check for month
      todoMonth === monthNow &&
      // check for year
      todoYear === yearNow) return true
      return false
    })
  })

  const monthTodos = computed(() => {
    return allTodos.value.filter((todo) => {
      const fullDateNow = new Date()
      const monthNow = fullDateNow.getMonth()
      const yearNow = fullDateNow.getFullYear()
      
      const todoFullDate = new Date(todo.date)
      const todoMonth = todoFullDate.getMonth()
      const todoYear = todoFullDate.getFullYear()
      //check for month
      if (todoMonth === monthNow &&
      // check for year
      todoYear === yearNow) return true
      return false
    })
  })

  function addTodo() {
    allTodos.value.push({
      id: allTodos.value.length,
      task: '',
      repeat: false,
      periodicity: null,
      days: [],
      date: null,
      done: false
    })
  }

  function deleteTodo(id) {
    allTodos.value = allTodos.value.filter((todo) => todo.id !== id)
  }

  function refreshId() {
    allTodos.value.forEach((todo, index) => {
      todo.id = index
    })
  }

  function getTodoList() {

  }

  watch([allTodos, allTodos.value], () => {
    refreshId()
    localStorage.setItem('todos', JSON.stringify(allTodos.value))
  })

  return { allTodos, todayTodos, weekTodos, monthTodos, addTodo, deleteTodo }
})