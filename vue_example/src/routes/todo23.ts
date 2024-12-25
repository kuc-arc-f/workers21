interface Env {
  DB: D1Database;
}

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

export async function todo23Router(
  corsHeaders:any, request: any, env: any, Response:any  
): Promise<Response>
{    
const url = new URL(request.url);
const path = url.pathname;
//console.log("url=", url);
console.log("path=", path);
const method = request.method;
console.log("method=", method);


  // Create TODO
  if (path === '/api/todo23' && request.method === 'POST') {
    console.log("# /api/todo23")
    const body: TodoInput = await request.json();

    const { success } = await env.DB
      .prepare(
        `INSERT INTO todo23 (title, content, public_type, food_orange, food_apple, food_banana, pub_date1, pub_date2, pub_date3, qty1, qty2, qty3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        body.title,
        body.content || null,
        body.public_type,
        body.food_orange ? 1 : 0,
        body.food_apple ? 1 : 0,
        body.food_banana ? 1 : 0,
        body.pub_date1 || null,
        body.pub_date2 || null,
        body.pub_date3 || null,
        body.qty1 || null,
        body.qty2 || null,
        body.qty3 || null
      )
      .run();

    if (!success) {
      return new Response('Failed to create todo', { status: 500 });
    }

    //return new Response(JSON.stringify({ message: 'Todo created successfully' }), {
    //  status: 201,
    //  headers: { 'Content-Type': 'application/json' },
    //});  
    return { 
      data: JSON.stringify({ message: 'Todo created successfully' }), status: 201 , ret: true
    }
  }
  // Read TODOs (with search)
  if (path === '/api/todo23' && request.method === 'GET') {
    console.log("# /api/todo23");
    const params = url.searchParams;
    const searchTerm = params.get('search');
    let query = 'SELECT * FROM todo23';
    const queryParams: any[] = [];
  
    if (searchTerm) {
      query += ' WHERE title LIKE ? OR content LIKE ?';
      queryParams.push(`%${searchTerm}%`, `%${searchTerm}%`);
    }
  
    const { results } = await env.DB.prepare(query).bind(...queryParams).all();
    //console.log(results);
    return { data:JSON.stringify(results), status: 200 , ret: true}
  }  

  // Update TODO
  //   if (path.match(/\/api\/todo21\/\d+/) && request.method === 'PUT') {
  if (path === '/api/todo21' && request.method === 'PUT') {
    //const id = path.split('/').pop();
    const todo: Todo = await request.json();
    console.log(todo);
    const id = todo.id;
    if (!id || !todo) {
      return { data: null, status: 400 , ret: true}
    }
  
    const { title, completed } = todo;
    const updatedTodo = await env.DB.prepare("UPDATE todo21 SET title = ?, completed = ? WHERE id = ? RETURNING *")
      .bind(title, completed ? 1 : 0, id)
      .first();
  
    if (!updatedTodo) {
      return { data: null, status: 400 , ret: true}
    }

    return { data:JSON.stringify(updatedTodo), status: 200 , ret: true}
  }    
  // Delete TODO
  if (path.match(/\/api\/todo23\/\d+/) && request.method === 'DELETE') {
    const id = path.split('/').pop();
    const result = await env.DB.prepare('DELETE FROM todo23 WHERE id = ?')
        .bind(id)
        .run();
    return { data:JSON.stringify(result), status: 200 , ret: true}
  }
  
}
// ユーティリティ関数
function jsonResponse(data: any, headers: HeadersInit, status = 200): Response {
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    status,
  });
}
