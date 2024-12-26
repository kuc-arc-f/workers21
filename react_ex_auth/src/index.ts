
interface Env {
  DB: D1Database;
}
const COOKIE_NAME = "workers21auth"; // Cookie名

import Top from './pages/App';
import Login from './pages/Login';
import renderMove from './pages/renderMove';

import { todoRouter } from './routes/todo';
import { todo11Router } from './routes/todo11';
import { todo14Router } from './routes/todo14';
import { todo24Router } from './routes/todo24';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    const url = new URL(request.url);
    const path = url.pathname;
    console.log("path=", path);
    const method = request.method;
    console.log("method=", method);
    try{
      let res = {}
      if (path.startsWith('/api/todo11')) {
        res = await todo11Router(corsHeaders, request, env, Response);
        if(res.ret) {
          return new Response(res.data, {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: res.status
          });
        }
      }
      if (path.startsWith('/api/todo14')) {
        res = await todo14Router(corsHeaders, request, env, Response);
        if(res.ret) {
          return new Response(res.data, {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: res.status
          });
        }
      }
      if (path.startsWith('/api/todo24')) {
        res = await todo24Router(corsHeaders, request, env, Response);
        if(res.ret) {
          return new Response(res.data, {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: res.status
          });
        }
      }
      if (path.startsWith('/api/')) {
        return new Response('', {
          headers: corsHeaders,
          status: 404,
        });
      }

      if (url.pathname === "/login" && request.method === "POST") {
        // ログイン処理
        return handleLogin(request, env);
      }
      if (url.pathname !== "/login" && request.method === "GET") {
        const resAuth = await handleProtectedPage(request);
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
async function handleProtectedPage(request) : boolean
{
  let ret = false;
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
