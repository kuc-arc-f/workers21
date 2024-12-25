<template>
  <TodoList />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TodoList from './Todo23/TodoList.vue';

export default defineComponent({
  components: {
    TodoList,
  },
});
</script>