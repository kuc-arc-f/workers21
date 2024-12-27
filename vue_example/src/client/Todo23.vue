<template>
  <Head />
  <TodoList />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TodoList from './Todo23/TodoList.vue';
import Head from "../components/Head.vue";

export default defineComponent({
  components: {
    TodoList,
    Head,
  },
});
</script>