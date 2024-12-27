
<script lang="ts">
  import { onMount } from 'svelte';
  import Head from "../components/Head.svelte";
  import TodoDialog from './Todo11/TodoDialog.svelte';
  import type { Todo } from './Todo11/types';
  import * as api from './Todo11/api';

  let todos: (Todo & { id: number })[] = [];
  let isDialogOpen = false;
  let currentTodo: Partial<Todo> = {};
  let dialogMode: 'create' | 'edit' = 'create';
  let searchQuery = '';
  let loading = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      todos = await api.fetchTodos();
    } catch (e) {
      error = 'TODOの取得に失敗しました';
    } finally {
      loading = false;
    }
  });

  async function handleSearch() {
    if (!searchQuery.trim()) {
      todos = await api.fetchTodos();
      return;
    }
    todos = await api.searchTodos(searchQuery);
  }

  async function handleSubmit(event: CustomEvent<Todo>) {
    try {
      if (dialogMode === 'create') {
        const newTodo = await api.createTodo(event.detail);
        console.log(newTodo);
        todos = [newTodo, ...todos];
      } else {
        const updatedTodo = await api.updateTodo(currentTodo.id!, event.detail);
        todos = todos.map(todo => 
          todo.id === currentTodo.id ? updatedTodo : todo
        );
      }
    } catch (e) {
      console.error(e);
      error = dialogMode === 'create' ? 
        'TODOの作成に失敗しました' : 
        'TODOの更新に失敗しました';
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('本当に削除しますか？')) return;
    try {
      await api.deleteTodo(id);
      todos = todos.filter(todo => todo.id !== id);
    } catch (e) {
      error = 'TODOの削除に失敗しました';
    }
  }

  function openCreateDialog() {
    dialogMode = 'create';
    currentTodo = { title: '', description: '', completed: false };
    isDialogOpen = true;
  }

  function openEditDialog(todo: Todo & { id: number }) {
    dialogMode = 'edit';
    currentTodo = { ...todo };
    isDialogOpen = true;
  }
</script>

<Head />
<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-8">TODOリスト</h1>

  {#if error}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {error}
    </div>
  {/if}

  <div class="flex justify-between items-center mb-6">
    <div class="flex-1 max-w-sm mr-4">
      <input
        type="text"
        bind:value={searchQuery}
        on:input={() => handleSearch()}
        placeholder="検索..."
        class="w-full px-4 py-2 rounded-md border border-gray-300"
      />
    </div>
    <button
      on:click={openCreateDialog}
      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      新規追加
    </button>
  </div>

  {#if loading}
    <div class="text-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
    </div>
  {:else}
    <div class="space-y-4">
      {#each todos as todo (todo.id)}
        <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow">
          <div class="flex items-center flex-1">
            <input
              type="checkbox"
              checked={todo.completed}
              on:change={() => openEditDialog({ ...todo, completed: !todo.completed })}
              class="h-4 w-4 rounded border-gray-300 text-blue-600"
            />
            <div class="ml-4">
              <h3 class="text-lg font-medium {todo.completed ? 'line-through text-gray-500' : ''}">{todo.title}</h3>
              {#if todo.description}
                <p class="text-gray-600 mt-1">{todo.description}</p>
              {/if}
            </div>
          </div>
          <div class="flex space-x-2">
            <button
              on:click={() => openEditDialog(todo)}
              class="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
            >
              編集
            </button>
            <button
              on:click={() => handleDelete(todo.id)}
              class="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
            >
              削除
            </button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<TodoDialog
  bind:isOpen={isDialogOpen}
  bind:todo={currentTodo}
  mode={dialogMode}
  on:submit={handleSubmit}
/>
