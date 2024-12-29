import type { Todo } from './types';
import ClientUtil from '../lib/ClientUtil';

let API_BASE = '';

export const api = {
    async getTodos(search?: string) {
        //API_BASE = await ClientUtil.getSysApiUrl();
        const url = search 
            ? `${API_BASE}/api/todo13?search=${encodeURIComponent(search)}`
            : `${API_BASE}/api/todo13`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Fetch error');
        const json = await response.json();
        const target = json.results;
        const out = [];
        target.forEach((element) => {
            //console.log(element);
            let row = element;
            row.is_public = element.is_public === 0 ? false: true; 
            row.food_orange = element.food_orange === 0 ? false: true; 
            row.food_apple = element.food_apple === 0 ? false: true; 
            row.food_banana = element.food_banana === 0 ? false: true; 
            row.food_melon = element.food_melon === 0 ? false: true; 
            row.food_grape = element.food_grape === 0 ? false: true; 
            out.push(row);
        });
        //console.log(out)
        return json.results;
    },

    async createTodo(todo: Todo) {
        const response = await fetch(`${API_BASE}/api/todo13`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo)
        });
        if (!response.ok) throw new Error('Create error');
        return response.json();
    },

    async updateTodo(id: number, todo: Todo) {
        const response = await fetch(`${API_BASE}/api/todo13/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo)
        });
        if (!response.ok) throw new Error('Update error');
        return response.json();
    },

    async deleteTodo(id: number) {
        const response = await fetch(`${API_BASE}/api/todo13/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Delete error');
        return response.json();
    }
};