import { todoRouter } from './routes/todo';

interface Env {
  DB: D1Database;
}

import Top from './pages/App';

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