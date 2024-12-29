<script lang="ts">
  import { onMount } from 'svelte';
  import { api } from './Todo13/api';
  import TodoDialog from './Todo13/TodoDialog.svelte';
  import type { Todo } from './Todo13/types';
  import Head from "../components/Head.svelte";

  let todos: Todo[] = [];
  let isDialogOpen = false;
  let currentTodo: Partial<Todo> = {};
  let dialogMode: 'create' | 'edit' = 'create';
  let searchTerm = '';
  let loading = true;
  let error = '';

  onMount(async () => {
      await loadTodos();
  });

  async function loadTodos() {
      try {
          loading = true;
          todos = await api.getTodos(searchTerm);
          //console.log(todos);
      } catch (e) {
          error = 'データの読み込みに失敗しました';
      } finally {
          loading = false;
      }
  }

  function getEmptyTodo(): Partial<Todo> {
      return {
          title: '',
          content: '',
          content_type: '',
          is_public: false,
          food_orange: false,
          food_apple: false,
          food_banana: false,
          food_melon: false,
          food_grape: false,
          pub_date1 : new Date().toISOString().split('T')[0],
          pub_date2 : new Date().toISOString().split('T')[0],
          pub_date3 : new Date().toISOString().split('T')[0],
          pub_date4 : new Date().toISOString().split('T')[0],
          pub_date5 : new Date().toISOString().split('T')[0],
          pub_date6 : new Date().toISOString().split('T')[0],
          qty1: '',
          qty2: '',
          qty3: '',
          qty4: '',
          qty5: '',
          qty6: '',
      };
  }

  function openCreateDialog() {
      currentTodo = getEmptyTodo();
      dialogMode = 'create';
      isDialogOpen = true;
  }

  function openEditDialog(todo: Todo) {
console.log("#openEditDialog");
console.log(todo);
      currentTodo = { ...todo };
      dialogMode = 'edit';
      isDialogOpen = true;
  }

  async function handleSubmit(event: CustomEvent<Todo>) {
      try {
          if (dialogMode === 'create') {
              await api.createTodo(event.detail);
          } else {
              await api.updateTodo(currentTodo.id!, event.detail);
          }
          await loadTodos();
      } catch (e) {
        console.error(e);
        error = '操作に失敗しました';
      }
  }

  async function handleDelete(todo: Todo) {
      if (!confirm('本当に削除しますか？')) return;
      try {
          await api.deleteTodo(todo.id!);
          await loadTodos();
      } catch (e) {
          error = '削除に失敗しました';
      }
  }

  async function handleSearch() {
      await loadTodos();
  }
</script>

<Head />
<div class="container mx-auto p-4">
  <div class="mb-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold">TODOリスト</h1>
      <button
          on:click={openCreateDialog}
          class="px-4 py-2 bg-blue-500 text-white rounded"
      >
          新規追加
      </button>
  </div>

  <!-- Search -->
  <div class="mb-6">
      <div class="flex gap-2">
          <input
              type="text"
              bind:value={searchTerm}
              placeholder="検索..."
              class="flex-1 border rounded p-2"
          />
          <button
              on:click={handleSearch}
              class="px-4 py-2 bg-gray-500 text-white rounded"
          >
              検索
          </button>
      </div>
  </div>

  {#if error}
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
      </div>
  {/if}

  {#if loading}
      <div class="text-center py-4">読み込み中...</div>
  {:else}
      <div class="space-y-4">
          {#each todos as todo (todo.id)}
              <div class="border rounded p-4">
                  <div class="flex justify-between items-start">
                      <div>
                          <h3 class="text-xl font-semibold">{todo.title}</h3>
                          <p class="mt-2">{todo.content}</p>
                          
                          <div class="mt-4 text-sm text-gray-600">
                              <p>公開設定: {todo.is_public ? '公開' : '非公開'}</p>
                              <p>
                                  食べ物:
                                  {[
                                      todo.food_orange && 'オレンジ',
                                      todo.food_apple && 'りんご',
                                      todo.food_banana && 'バナナ',
                                      todo.food_melon && 'メロン',
                                      todo.food_grape && 'ぶどう'
                                  ].filter(Boolean).join(', ') || 'なし'}
                              </p>
                          </div>
                      </div>
                      
                      <div class="flex space-x-2">
                          <button
                              on:click={() => openEditDialog(todo)}
                              class="px-3 py-1 bg-gray-500 text-white rounded"
                          >
                              編集
                          </button>
                          <button
                              on:click={() => handleDelete(todo)}
                              class="px-3 py-1 bg-red-500 text-white rounded"
                          >
                              削除
                          </button>
                      </div>
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
