<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">TODO List</h1>

    <div class="flex items-center mb-4">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="検索..."
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
        @input="handleSearch"
      />
      <button @click="openAddDialog" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Add TODO
      </button>
    </div>

    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500">Error: {{ error }}</div>
    <div v-else>
      <div v-if="todos.length === 0" class="text-center">No todos found.</div>
      <div v-for="todo in todos" :key="todo.id" class="bg-white shadow rounded p-4 mb-2 flex justify-between items-center">
        <div>
          <h2 class="font-bold">{{ todo.title }}</h2>
          <p class="text-gray-700">{{ todo.content }}</p>
        </div>
        <div>
          <button @click="openEditDialog(todo)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
            Edit
          </button>
          <button @click="openDeleteConfirmation(todo.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Delete
          </button>
        </div>
      </div>
    </div>

    <TodoDialog :isOpen="isDialogVisible" :todo="editingTodo" @close="closeDialog" @save="saveTodo" />
    <DeleteConfirmation :isOpen="isDeleteConfirmationVisible" :todoId="deletingTodoId" @close="closeDeleteConfirmation" @confirm="deleteTodo" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import TodoDialog from './TodoDialog.vue';
import DeleteConfirmation from './DeleteConfirmation.vue';

interface Todo {
  id: number;
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

export default defineComponent({
  components: {
    TodoDialog,
    DeleteConfirmation,
  },
  setup() {
    const todos = ref<Todo[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const isDialogVisible = ref(false);
    const editingTodo = ref<Todo | null>(null);
    const isDeleteConfirmationVisible = ref(false);
    const deletingTodoId = ref<number | null>(null);
    const searchQuery = ref('');
    const debouncedSearchQuery = ref('');

    const fetchTodos = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await fetch(`/api/todo23?search=${debouncedSearchQuery.value}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        todos.value = await response.json();
      } catch (e: any) {
        error.value = e.message;
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchTodos);

    const openAddDialog = () => {
      editingTodo.value = null;
      isDialogVisible.value = true;
    };

    const openEditDialog = (todo: Todo) => {
      editingTodo.value = { ...todo };
      isDialogVisible.value = true;
    };

    const closeDialog = () => {
      isDialogVisible.value = false;
      editingTodo.value = null;
    };

    const saveTodo = async (todoData: Omit<Todo, 'id'> & { id?: number }) => {
      const isNew = !todoData.id;
      const method = isNew ? 'POST' : 'PUT';
      const url = isNew ? '/api/todo23' : `/api/todo23/${todoData.id}`;

      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(todoData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        fetchTodos(); // リストを再取得
        closeDialog();
      } catch (e: any) {
        error.value = e.message;
      }
    };

    const openDeleteConfirmation = (id: number) => {
      deletingTodoId.value = id;
      isDeleteConfirmationVisible.value = true;
    };

    const closeDeleteConfirmation = () => {
      isDeleteConfirmationVisible.value = false;
      deletingTodoId.value = null;
    };

    const deleteTodo = async () => {
      if (!deletingTodoId.value) return;

      try {
        const response = await fetch(`/api/todo23/${deletingTodoId.value}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        fetchTodos(); // リストを再取得
        closeDeleteConfirmation();
      } catch (e: any) {
        error.value = e.message;
      }
    };

    // 検索処理のdebounce
    watch(searchQuery, (newValue) => {
      const timer = setTimeout(() => {
        debouncedSearchQuery.value = newValue;
      }, 300);
      return () => clearTimeout(timer);
    });

    watch(debouncedSearchQuery, () => {
      fetchTodos();
    });

    const handleSearch = (event: Event) => {
      searchQuery.value = (event.target as HTMLInputElement).value;
    };

    return {
      todos,
      loading,
      error,
      isDialogVisible,
      editingTodo,
      openAddDialog,
      openEditDialog,
      closeDialog,
      saveTodo,
      isDeleteConfirmationVisible,
      deletingTodoId,
      openDeleteConfirmation,
      closeDeleteConfirmation,
      deleteTodo,
      searchQuery,
      handleSearch,
    };
  },
});
</script>
