
interface Env {
  DB: D1Database;
}

import Top from './pages/App';

import { todo11Router } from './routes/todo11';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		const path = url.pathname;
		console.log("path=", url.pathname);
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

		//API
		let res = {};
		if (path.startsWith('/api/todo11')) {
			res = await todo11Router(corsHeaders, request, env, Response);
			if(res.ret) {
				return new Response(res.data, {
					headers: { ...corsHeaders, 'Content-Type': 'application/json' },
					status: res.status
				});
			}
		}

		//MPA
		const htm = Top({});
		return new Response(htm, {
			headers: {"Content-Type": "text/html"}
		});
	  //return new Response('Hello World!');
	},
} satisfies ExportedHandler<Env>;

