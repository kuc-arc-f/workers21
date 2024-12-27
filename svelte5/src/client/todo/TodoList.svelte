<script lang="ts">
  import { todos } from './stores';
  import type { Todo } from './types';

  export let todo: Todo;

  const handleDelete = () => {
    todos.remove(todo.id);
  };
</script>

<div class="flex items-center justify-between p-2 border-b border-gray-200">
  <span>{todo.text}</span>
  <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" on:click={handleDelete}>
    削除
  </button>
</div>