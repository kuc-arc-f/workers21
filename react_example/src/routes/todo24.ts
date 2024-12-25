interface Env {
  DB: D1Database;
}


interface Todo {
  id: number;
  title: string;
  content: string | null;
  public_type: '公開' | '非公開';
  food_orange: boolean;
  food_apple: boolean;
  food_banana: boolean;
  pub_date1: string | null;
  pub_date2: string | null;
  pub_date3: string | null;
  qty1: string | null;
  qty2: string | null;
  qty3: string | null;
}

interface CreateTodoRequest {
  title: string;
  content?: string;
  public_type: '公開' | '非公開';
  food_orange?: boolean;
  food_apple?: boolean;
  food_banana?: boolean;
  pub_date1?: string;
  pub_date2?: string;
  pub_date3?: string;
  qty1?: string;
  qty2?: string;
  qty3?: string;
}

interface UpdateTodoRequest {
  title?: string;
  content?: string;
  public_type?: '公開' | '非公開';
  food_orange?: boolean;
  food_apple?: boolean;
  food_banana?: boolean;
  pub_date1?: string;
  pub_date2?: string;
  pub_date3?: string;
  qty1?: string;
  qty2?: string;
  qty3?: string;
}



export async function todo24Router(
  corsHeaders:any, request: any, env: any, Response:any  
): Promise<Response>
{    
const url = new URL(request.url);
const path = url.pathname;
//console.log("url=", url);
console.log("path=", path);
const method = request.method;
//const requestBody = method === 'POST' || method === 'PUT' ? await request.json() : null;
console.log("method=", method);


  // Create TODO
  if (path === '/api/todo24' && request.method === 'POST') {
    console.log("# /api/todo24")
    //const todo = await request.json();
    //const body: CreateTodoRequest = await request.json();
    const body = await request.json();
    const { success } = await env.DB.prepare(
      `INSERT INTO todo24 (title, content, public_type, food_orange, food_apple, food_banana, pub_date1, pub_date2, pub_date3, qty1, qty2, qty3)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        body.title,
        body.content || null,
        body.public_type,
        body.food_orange || false,
        body.food_apple || false,
        body.food_banana || false,
        body.pub_date1 || null,
        body.pub_date2 || null,
        body.pub_date3 || null,
        body.qty1 || null,
        body.qty2 || null,
        body.qty3 || null
      )
      .run();
  
    if (!success) {
      //return new Response('Failed to create todo', { status: 500 });
      return { data: 'Failed to create todo', status: 500 , ret: true}
    }
    //return new Response('Todo created successfully', { status: 201 });

    return { data: 'Todo created successfully', status: 201 , ret: true}
  }
  // Read TODOs (with search)
  if (path === '/api/todo24' && request.method === 'GET') {
    console.log("# /api/todo24");
    const { results } = await env.DB.prepare('SELECT * FROM todo24').all();
    //return Response.json(results);

    //console.log(results);
    return { data:JSON.stringify(results), status: 200 , ret: true}
  }  

  // Update TODO
  if (path.match(/\/api\/todo24\/\d+/) && request.method === 'PUT') {
    const id = path.split('/').pop();
    const todo: Todo = await request.json();
    
    const body: UpdateTodoRequest = await request.json();
    const { success } = await env.DB.prepare(
      `UPDATE todo24 SET
        title = COALESCE(?, title),
        content = COALESCE(?, content),
        public_type = COALESCE(?, public_type),
        food_orange = COALESCE(?, food_orange),
        food_apple = COALESCE(?, food_apple),
        food_banana = COALESCE(?, food_banana),
        pub_date1 = COALESCE(?, pub_date1),
        pub_date2 = COALESCE(?, pub_date2),
        pub_date3 = COALESCE(?, pub_date3),
        qty1 = COALESCE(?, qty1),
        qty2 = COALESCE(?, qty2),
        qty3 = COALESCE(?, qty3)
      WHERE id = ?`
    )
      .bind(
        body.title,
        body.content,
        body.public_type,
        body.food_orange,
        body.food_apple,
        body.food_banana,
        body.pub_date1,
        body.pub_date2,
        body.pub_date3,
        body.qty1,
        body.qty2,
        body.qty3,
        id
      )
      .run();
  
    if (!success) {
      //return new Response('Failed to update todo', { status: 500 });
      return { data: 'Failed to update todo', status: 500 , ret: true}
    }
    //return new Response('Todo updated successfully');

    return { data: 'Todo updated successfully', status: 200 , ret: true}
  }    
  // Delete TODO
  if (path.match(/\/api\/todo24\/\d+/) && request.method === 'DELETE') {
    const id = path.split('/').pop();
    const result = await env.DB.prepare('DELETE FROM todo24 WHERE id = ?')
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