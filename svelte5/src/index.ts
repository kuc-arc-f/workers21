
interface Env {
  DB: D1Database;
}
const COOKIE_NAME = "workers21auth";

import Top from './pages/App';
import renderMove from './pages/renderMove';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		const path = url.pathname;
		const hostname = url.hostname; 
		console.log("path=", url.pathname);
		console.log("hostname=", url.hostname);
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

		//API
		let res = {};
		if (path.startsWith('/api/')) {
			return new Response(null, {
				headers: { ...corsHeaders, 'Content-Type': 'application/json' },
				status: 404
			});
		}

		//MPA 
		const htm = Top({coolieAuth: "" });
		return new Response(htm, {
			headers: {"Content-Type": "text/html"}
		});
	},
} satisfies ExportedHandler<Env>;

