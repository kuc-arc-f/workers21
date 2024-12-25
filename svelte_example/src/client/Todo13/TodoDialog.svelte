<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { todoSchema, type TodoSchema } from './validation';
  import type { Todo } from './types';

  export let todo: Partial<Todo> = {};
  export let isOpen = false;
  export let mode: 'create' | 'edit' = 'create';

  const dispatch = createEventDispatcher();
  let errors: { [key: string]: string } = {};

  const handleSubmit = async () => {
      try {
console.log("#handleSubmit");
console.log(todo);
          const validatedData = todoSchema.parse(todo);
          dispatch('submit', validatedData);
          isOpen = false;
          errors = {};
      } catch (error) {
          console.error(error);
          if (error.errors) {
              errors = error.errors.reduce((acc, curr) => {
                  acc[curr.path[0]] = curr.message;
                  return acc;
              }, {});
          }
      }
  };

  const handleClose = () => {
      isOpen = false;
      errors = {};
  };
</script>

{#if isOpen}
<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 class="text-xl font-bold mb-4">
            {mode === 'create' ? 'TODO追加' : 'TODO編集'}
        </h2>
        
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
            <!-- Title -->
            <div>
                <label class="block mb-1">タイトル *</label>
                <input
                    type="text"
                    bind:value={todo.title}
                    class="w-full border rounded p-2 {errors.title ? 'border-red-500' : ''}"
                />
                {#if errors.title}
                    <p class="text-red-500 text-sm mt-1">{errors.title}</p>
                {/if}
            </div>

            <!-- Content -->
            <div>
                <label class="block mb-1">内容 *</label>
                <textarea
                    bind:value={todo.content}
                    class="w-full border rounded p-2 {errors.content ? 'border-red-500' : ''}"
                    rows="4"
                ></textarea>
                {#if errors.content}
                    <p class="text-red-500 text-sm mt-1">{errors.content}</p>
                {/if}
            </div>

            <!-- Content Type -->
            <div>
                <label class="block mb-1">コンテンツタイプ</label>
                <input
                    type="text"
                    bind:value={todo.content_type}
                    class="w-full border rounded p-2"
                />
            </div>

            <!-- Public/Private -->
            <div>
                <label class="block mb-1">公開設定</label>
                <div class="space-x-4">
                    <label>
                        <input
                            type="radio"
                            bind:group={todo.is_public}
                            value={true}
                        />
                        公開
                    </label>
                    <label>
                        <input
                            type="radio"
                            bind:group={todo.is_public}
                            value={false}
                        />
                        非公開
                    </label>
                </div>
            </div>

            <!-- Food Checkboxes -->
            <div>
                <label class="block mb-1">食べ物</label>
                <div class="space-x-4">
                    <label>
                        <input
                            type="checkbox"
                            bind:checked={todo.food_orange}
                        />
                        オレンジ
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            bind:checked={todo.food_apple}
                        />
                        りんご
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            bind:checked={todo.food_banana}
                        />
                        バナナ
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            bind:checked={todo.food_melon}
                        />
                        メロン
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            bind:checked={todo.food_grape}
                        />
                        ぶどう
                    </label>
                </div>
            </div>

            <!-- Dates -->
            <div class="grid grid-cols-2 gap-4">
                {#each Array(6) as _, i}
                <div>
                    <label class="block mb-1">日付 {i + 1}</label>
                    <input
                        type="date"
                        bind:value={todo[`pub_date${i + 1}`]}
                        class="w-full border rounded p-2"
                    />
                </div>
                {/each}
            </div>

            <!-- Quantities -->
            <div class="grid grid-cols-2 gap-4">
                {#each Array(6) as _, i}
                <div>
                    <label class="block mb-1">数量 {i + 1}</label>
                    <input
                        type="text"
                        bind:value={todo[`qty${i + 1}`]}
                        class="w-full border rounded p-2"
                    />
                </div>
                {/each}
            </div>

            <div class="flex justify-end space-x-2">
                <button
                    type="button"
                    on:click={handleClose}
                    class="px-4 py-2 border rounded"
                >
                    キャンセル
                </button>
                <button
                    type="submit"
                    class="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    {mode === 'create' ? '追加' : '更新'}
                </button>
            </div>
        </form>
    </div>
</div>
{/if}
