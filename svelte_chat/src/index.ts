
interface Env {
  DB: D1Database;
}
const COOKIE_NAME = "workers21auth";

import Top from './pages/App';
import Login from './pages/Login';
import renderMove from './pages/renderMove';

import { todo11Router } from './routes/todo11';
import { todo13Router } from './routes/todo13';
import { ApiSendRouter } from './routes/api_send';
import testRouter from './routes/test';
import todoRouter from './routes/todo';
import userRouter from './routes/user';
import chatRouter from './routes/chat';
import chatPostRouter from './routes/chat_post';
import threadRouter from './routes/thread';
import bookmarkRouter from './routes/bookmark';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		const path = url.pathname;
		const hostname = url.hostname; 
 		console.log("path=", url.pathname);
		console.log("hostname=", url.hostname);
		//console.log("PUBLIC_API_URL=", env.PUBLIC_API_URL);

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

		//API
		let res = {}; 
		let response = null;
		//user
		if (path === "/users/create") {
			response = await userRouter.create(request, res, env);  
		}
		if (path === "/users/get") {
			response = await userRouter.get(request, res, env);  
		}
		if (path === "/api/chats/create") {
			response = await chatRouter.create(request, null, env);  
		}
		if (path === "/api/chats/get_list") {
			response = await chatRouter.get_list(request, null, env);  
		}
		if (path === "/api/chats/get") {
			response = await chatRouter.get(request, null, env);  
		}
		if (path === "/api/chats/update") {
			response = await chatRouter.update(request, null, env);  
		}
		if (path === "/api/chats/delete") {
			response = await chatRouter.delete(request, null, env);  
		}
		if (path === "/api/chats/search") {
			response = await chatRouter.search(request, res, env);  
		}
    if (path === "/api/chat_posts/create") {
      response = await chatPostRouter.create(request, res, env);  
    }
    if (path === "/api/chat_posts/get") {
      response = await chatPostRouter.get(request, res, env);  
    }   
    if (path === "/api/chat_posts/get_list") {
      response = await chatPostRouter.get_list(request, res, env);  
    }        
    if (path === "/api/chat_posts/delete") {
      response = await chatPostRouter.delete(request, res, env);  
    }        
    if (path === "/api/chat_posts/get_last_time") {
      response = await chatPostRouter.get_last_time(request, res, env);  
    }  
    if (path === "/api/chat_posts/search") {
      response = await chatPostRouter.search(request, res, env);  
    }
    if (path === "/api/threads/create") {
      response = await threadRouter.create(request, res, env);  
    }
    if (path === "/api/threads/get_list") {
      response = await threadRouter.get_list(request, res, env);  
    }
    if (path === "/api/threads/get") {
      response = await threadRouter.get(request, res, env);  
    }
    if (path === "/api/threads/delete") {
      response = await threadRouter.delete(request, res, env);  
    }
    if (path === "/api/threads/get_list_chat") {
      response = await threadRouter.get_list_chat(request, res, env);  
    }
    if (path === "/api/threads/search") {
      response = await threadRouter.search(request, res, env);  
    }

		if (path.startsWith('/api/')) {
			//console.log(response);
			return response;
		}
		if (path.startsWith('/api/api_send')) {
			res = await ApiSendRouter(corsHeaders, request, env, Response);
			if(res.ret) {
				return new Response(res.data, {
					headers: { ...corsHeaders, 'Content-Type': 'application/json' },
					status: res.status
				});
			}
		}


		if (path.startsWith('/api/todo13')) {
			res = await todo13Router(corsHeaders, request, env, Response);
			if(res.ret) {
				return new Response(res.data, {
					headers: { ...corsHeaders, 'Content-Type': 'application/json' },
					status: res.status
				});
			}
		}
		if (path.startsWith('/api/todo11')) {
			res = await todo11Router(corsHeaders, request, env, Response);
			if(res.ret) {
				return new Response(res.data, {
					headers: { ...corsHeaders, 'Content-Type': 'application/json' },
					status: res.status
				});
			}
		}
		if (path.startsWith('/api/')) {
			return new Response(null, {
				headers: { ...corsHeaders, 'Content-Type': 'application/json' },
				status: 404
			});
		}
		if (url.pathname === "/login" && request.method === "POST") {
			// ログイン処理
			return handleLogin(request, env);
		}

		//MPA 
		const coolieAuth = await getCookieAuth(request, env);
		//console.log("coolieAuth=", coolieAuth);
		//console.log("env.USER_ID=", env.USER_ID);
		const htm = Top({coolieAuth: coolieAuth , userId : env.USER_ID});
		return new Response(htm, {
			headers: {"Content-Type": "text/html"}
		});
	},
} satisfies ExportedHandler<Env>;


// ログイン処理
async function handleLogin(request: any, env: any) {
  const body = await request.json();
  const { username, password } = body;
  console.log("#handleLogin");
  console.log(body);
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

async function getCookieAuth(request, env) : boolean
{
  let ret = "";
  if(!env.USER_NAME && !env.PASSWORD){
    return ret;
  }
  const cookies = parseCookies(request);
  //console.log(cookies);
  if (cookies[COOKIE_NAME]) {
    const token = cookies[COOKIE_NAME];
    return token;
  }
  return ret;
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
  console.log(cookies);
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
