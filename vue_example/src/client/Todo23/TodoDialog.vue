<template>
  <div v-if="isOpen" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
            {{ editingTodo.id ? 'Edit TODO' : 'Add TODO' }}
          </h3>
          <div class="mt-2">
            <form @submit.prevent="handleSubmit">
              <div class="mb-4">
                <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title</label>
                <input type="text" id="title" v-model="editingTodo.title" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <p v-if="formErrors.title" class="text-red-500 text-xs italic">{{ formErrors.title }}</p>
              </div>
              <div class="mb-4">
                <label for="content" class="block text-gray-700 text-sm font-bold mb-2">Content</label>
                <textarea id="content" v-model="editingTodo.content" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                <p v-if="formErrors.content" class="text-red-500 text-xs italic">{{ formErrors.content }}</p>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Public Type</label>
                <div class="flex items-center">
                  <input type="radio" id="public" value="public" v-model="editingTodo.public_type" class="mr-2" />
                  <label for="public" class="text-gray-700 text-sm mr-4">Public</label>
                  <input type="radio" id="private" value="private" v-model="editingTodo.public_type" class="mr-2" />
                  <label for="private" class="text-gray-700 text-sm">Private</label>
                </div>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Foods</label>
                <div class="flex items-center">
                  <input type="checkbox" id="food_orange" v-model="editingTodo.food_orange" class="mr-2" />
                  <label for="food_orange" class="text-gray-700 text-sm mr-4">Orange</label>
                  <input type="checkbox" id="food_apple" v-model="editingTodo.food_apple" class="mr-2" />
                  <label for="food_apple" class="text-gray-700 text-sm mr-4">Apple</label>
                  <input type="checkbox" id="food_banana" v-model="editingTodo.food_banana" class="mr-2" />
                  <label for="food_banana" class="text-gray-700 text-sm">Banana</label>
                </div>
              </div>
              <div class="mb-4">
                <label for="pub_date1" class="block text-gray-700 text-sm font-bold mb-2">Pub Date 1</label>
                <input type="date" id="pub_date1" v-model="editingTodo.pub_date1" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div class="mb-4">
                <label for="pub_date2" class="block text-gray-700 text-sm font-bold mb-2">Pub Date 2</label>
                <input type="date" id="pub_date2" v-model="editingTodo.pub_date2" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div class="mb-4">
                <label for="pub_date3" class="block text-gray-700 text-sm font-bold mb-2">Pub Date 3</label>
                <input type="date" id="pub_date3" v-model="editingTodo.pub_date3" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div class="mb-4">
                <label for="qty1" class="block text-gray-700 text-sm font-bold mb-2">Qty 1</label>
                <input type="text" id="qty1" v-model="editingTodo.qty1" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div class="mb-4">
                <label for="qty2" class="block text-gray-700 text-sm font-bold mb-2">Qty 2</label>
                <input type="text" id="qty2" v-model="editingTodo.qty2" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div class="mb-4">
                <label for="qty3" class="block text-gray-700 text-sm font-bold mb-2">Qty 3</label>
                <input type="text" id="qty3" v-model="editingTodo.qty3" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="submit" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Save
                </button>
                <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="$emit('close')">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { z } from 'zod';

interface Todo {
  id?: number;
  title: string;
  content?: string;
  public_type: 'public' | 'private';
  food_orange: boolean;
  food_apple: boolean;
  food_banana: boolean;
  pub_date1?: string;
  pub_date2?: string;
  pub_date3?: string;
  qty1?: string;
  qty2?: string;
  qty3?: string;
}

const todoSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  public_type: z.enum(['public', 'private']),
  food_orange: z.boolean().default(false),
  food_apple: z.boolean().default(false),
  food_banana: z.boolean().default(false),
  pub_date1: z.string().optional(),
  pub_date2: z.string().optional(),
  pub_date3: z.string().optional(),
  qty1: z.string().optional(),
  qty2: z.string().optional(),
  qty3: z.string().optional(),
});

export default defineComponent({
  props: {
    isOpen: Boolean,
    todo: {
      type: Object as () => Todo | null,
      default: null,
    },
  },
  emits: ['close', 'save'],
  setup(props, { emit }) {
    const editingTodo = ref<Todo>({
      title: '',
      content: '',
      public_type: 'public',
      food_orange: false,
      food_apple: false,
      food_banana: false,
      pub_date1: undefined,
      pub_date2: undefined,
      pub_date3: undefined,
      qty1: undefined,
      qty2: undefined,
      qty3: undefined,
    });
    const formErrors = ref<{ [key: string]: string }>({});

    watch(() => props.todo, (newTodo) => {
      if (newTodo) {
        editingTodo.value = { ...newTodo };
      } else {
        editingTodo.value = {
          title: '',
          content: '',
          public_type: 'public',
          food_orange: false,
          food_apple: false,
          food_banana: false,
          pub_date1: undefined,
          pub_date2: undefined,
          pub_date3: undefined,
          qty1: undefined,
          qty2: undefined,
          qty3: undefined,
        };
        formErrors.value = {};
      }
    }, { immediate: true });

    const handleSubmit = () => {
      formErrors.value = {};
      const result = todoSchema.safeParse(editingTodo.value);
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          formErrors.value[issue.path.join('.')] = issue.message;
        });
        return;
      }
      emit('save', editingTodo.value);
    };

    return {
      editingTodo,
      formErrors,
      handleSubmit,
    };
  },
});
</script>
