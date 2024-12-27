// src/lib/api.ts
//let API_BASE = "http://localhost:8787/api";
let API_BASE = "";

async function getSysApiUrl(){
  try{
    let ret = "";
    const response = await fetch(`/api/common/get_sys_items`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      }
    );
    if (!response.ok) throw new Error("error, getSystemParam");
    const data = await response.json();
    //console.log(data.data);
    ret = data.data.api_url;
    return ret;
  } catch (err) {
    console.error(err);
  }
}
// 
export async function fetchTodos() {
  //console.log("apiUrl=", API_BASE);
  const response = await fetch(`${API_BASE}/api/todo11`);
  if (!response.ok) throw new Error('Failed to fetch todos');
  return response.json();
}

export async function createTodo(todo: Todo) {
  const response = await fetch(`${API_BASE}/api/todo11`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  console.log(response);
  if (!response.ok) throw new Error('Failed to create todo');
  return response.json();
}

export async function updateTodo(id: number, todo: Todo) {
  const response = await fetch(`${API_BASE}/api/todo11/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  if (!response.ok) throw new Error('Failed to update todo');
  return response.json();
}

export async function deleteTodo(id: number) {
  const response = await fetch(`${API_BASE}/api/todo11/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete todo');
  return response.json();
}

export async function searchTodos(query: string) {
  const response = await fetch(`${API_BASE}/api/todo11/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Failed to search todos');
  return response.json();
}