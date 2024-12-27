import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import type { Todo } from '../types/todo';

const createTodos = () => {
  const { subscribe, update } = writable<Todo[]>([]);

  return {
    subscribe,
    add: (text: string) => {
      update((todos) => [...todos, { id: uuidv4(), text }]);
    },
    remove: (id: string) => {
      update((todos) => todos.filter((todo) => todo.id !== id));
    },
  };
};

export const todos = createTodos();