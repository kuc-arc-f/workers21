
interface Env {
  DB: D1Database;
}

import Top from './pages/App';

import { todoRouter } from './routes/todo';
import { todo11Router } from './routes/todo11';
import { todo14Router } from './routes/todo14';
import { todo16Router } from './routes/todo16';
import { todo24Router } from './routes/todo24';

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
    console.log("path=", path);
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
      if (path.startsWith('/api/todo16')) {
        res = await todo16Router(corsHeaders, request, env, Response);
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

      //MPA
      const htm = Top({});
      return new Response(htm, {
        headers: {"Content-Type": "text/html"}
      });
      return new Response('Hello World!');
    } catch (error) {
      console.error('Error:', error);
      return new Response('Internal Server Error', {
        headers: corsHeaders,
        status: 500,
      });
    }
  },
};
