<script lang="ts">
  import AddTodoDialog from './todo/AddTodoDialog.svelte';
  import TodoList from './todo/TodoList.svelte';
  import { todos } from './todo/stores';
  import Head from "../components/Head.svelte";

  let isDialogOpen = false;

  const handleAddTodo = (event: CustomEvent<string>) => {
    todos.add(event.detail);
  };
</script>

<Head />
<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Todo.svelte</h1>

  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4" on:click={() => isDialogOpen = true}>
    TODOを追加
  </button>

  <AddTodoDialog isOpen={isDialogOpen} on:add={handleAddTodo} on:close={() => isDialogOpen = false} />

  <div class="border rounded shadow-md">
    {#each $todos as todo (todo.id)}
      <TodoList {todo} />
    {/each}
    {#if $todos.length === 0}
      <div class="p-4 text-center text-gray-500">
        TODOがありません
      </div>
    {/if}
  </div>
</div>