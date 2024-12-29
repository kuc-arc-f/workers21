interface Env {
  DB: D1Database;
}

interface Todo {
  id?: number;
  title: string;
  description?: string;
  completed?: boolean;
  created_at?: string;
  updated_at?: string;
}

export async function ApiSendRouter(
  corsHeaders:any, request: any, env: any, Response:any  
): Promise<Response>
{
  const url = new URL(request.url);
  const path = url.pathname;
  //console.log("url=", url);
  console.log("path=", path);
  // 検索エンドポイント
  if (path === '/api/api_send') {
    if (request.method === 'POST') {
      const retObj = {ret: "NG", message: "Internal Server Error."};
      const body= await request.json();
      console.log(body);
      body.api_key = env.PUBLIC_API_KEY;
      console.log(body);
      const url = env.PUBLIC_API_URL +  body.path;
      console.log("url=", url);
      const sendBody: any = JSON.stringify(body);
      //env.PUBLIC_API_URL
      //env.PUBLIC_API_KEY
      const res = await fetch(env.PUBLIC_API_URL +  body.path, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: sendBody
      });
      if (res.status !== 200) {
          console.error("Error, HTTP <> 200");
          throw new Error(await res.text());
      }        
      const resObj = await res.json();
      console.log(resObj);

      return { data: JSON.stringify(resObj), status: 200 , ret: true}
    }
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