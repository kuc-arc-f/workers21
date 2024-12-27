<script lang="ts">
  import { todoSchema, type Todo } from './types';
  import { createEventDispatcher } from 'svelte';
  import { z } from 'zod';

  export let isOpen = false;
  export let todo: Partial<Todo> = { title: '', description: '', completed: false };
  export let mode: 'create' | 'edit' = 'create';

  const dispatch = createEventDispatcher();
  let errors: { [key: string]: string } = {};

  function handleSubmit() {
    try {
      const validatedTodo = todoSchema.parse(todo);
      dispatch('submit', validatedTodo);
      isOpen = false;
      errors = {};
    } catch (error) {
      console.log(error);
      if (error instanceof z.ZodError) {
        errors = error.errors.reduce((acc, curr) => {
          const field = curr.path[0];
          acc[field] = curr.message;
          return acc;
        }, {});
      }
    }
  }

  function handleClose() {
    isOpen = false;
    errors = {};
    dispatch('close');
  }
</script>

{#if isOpen}
<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
  <div class="bg-white rounded-lg p-6 w-full max-w-md">
    <h2 class="text-xl font-bold mb-4">
      {mode === 'create' ? 'TODO追加' : 'TODO編集'}
    </h2>
    
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">タイトル</label>
        <input
          type="text"
          bind:value={todo.title}
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {#if errors.title}
          <p class="text-red-500 text-sm mt-1">{errors.title}</p>
        {/if}
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">詳細</label>
        <textarea
          bind:value={todo.description}
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows="3"
        ></textarea>
      </div>

      <div class="flex items-center">
        <input
          type="checkbox"
          bind:checked={todo.completed}
          class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label class="ml-2 text-sm text-gray-700">完了</label>
      </div>

      <div class="flex justify-end space-x-3">
        <button
          type="button"
          on:click={handleClose}
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          キャンセル
        </button>
        <button
          type="submit"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          {mode === 'create' ? '追加' : '更新'}
        </button>
      </div>
    </form>
  </div>
</div>
{/if}