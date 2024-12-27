import { todoRouter } from './routes/todo';
interface Env {
  DB: D1Database;
}
const COOKIE_NAME = "workers21auth"; // Cookie名
const ASSET_URL = "/public/"; // 静的ファイルのベース URL

import Top from './pages/App';
import renderMove from './pages/renderMove';

import { todo21Router } from './routes/todo21';
import { todo23Router } from './routes/todo23';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // CORS プリフライトリクエストの処理
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders,
      });
    }  
    const url = new URL(request.url);
    const path = url.pathname;
//console.log("url=", url);
console.log("path=", path);
const method = request.method;
console.log("method=", method);
    try{
      let res = {}
      //API
      if (path.startsWith('/api/todo21')) {
        res = await todo21Router(corsHeaders, request, env, Response);
        if(res.ret) {
          return new Response(res.data, {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: res.status
          });
        }
      }
      if (path.startsWith('/api/todo23')) {
        res = await todo23Router(corsHeaders, request, env, Response);
        if(res.ret) {
          return new Response(res.data, {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: res.status
          });
        }
      }
      if (path.startsWith('/api/')) {
        return new Response('Not Found', {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404,
        });
      }
      if (url.pathname === "/login" && request.method === "POST") {
        // ログイン処理
        return handleLogin(request, env);
      }
      if (url.pathname !== "/login" && request.method === "GET") {
        const resAuth = await handleProtectedPage(request, env);
        console.log("resAuth=", resAuth);
        if(!resAuth){
          const htm = renderMove({path : '/login'});
          return new Response(htm, {headers: {"Content-Type": "text/html"}});
        }      
      }
      //MPA
      const htm = Top({});
      return new Response(htm, {
        headers: {"Content-Type": "text/html"}
      });      
    } catch (error) {
      console.error('Error:', error);
      return new Response('Internal Server Error', {
        headers: corsHeaders,
        status: 500,
      });
    }
  },
};
// ログイン処理
async function handleLogin(request: any, env: any) {
  const body = await request.json();
  const { username, password } = body;
  //console.log("#handleLogin");
  //console.log(body);

  // 認証チェック (例: 固定ユーザー)
  if (username === env.USER_NAME && password === env.PASSWORD) {
    // トークンを生成 (簡易例: 暗号化)
    const token = btoa(`${username}:${Date.now()}:SECRET_KEY`);
    // Cookieを設定
    return new Response("Login successful", {
      headers: {
        "Set-Cookie": `${COOKIE_NAME}=${token}; HttpOnly; Path=/; Secure`,
        "Content-Type": "text/plain",
      },
    });
  }

  return new Response("Invalid credentials", { status: 401 });
}

// 認証が必要なページ
// * @return true: sucsess
async function handleProtectedPage(request, env) : boolean
{
  let ret = false;
  if(!env.USER_NAME && !env.PASSWORD){
    return true;
  }
  const cookies = parseCookies(request);
  //console.log(cookies);
  if (cookies[COOKIE_NAME]) {
    const token = cookies[COOKIE_NAME];
    return true;
  }
  return ret;
}
// Cookieを解析
function parseCookies(request) {
  const cookieHeader = request.headers.get("Cookie") || "";
  return Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const [key, ...v] = c.trim().split("=");
      return [key, decodeURIComponent(v.join("="))];
    })
  );
}