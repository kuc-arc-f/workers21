
interface Env {
  DB: D1Database;
}

import Top from './pages/App';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		console.log("path=", url.pathname);

		//MPA
		const htm = Top({});
		return new Response(htm, {
			headers: {"Content-Type": "text/html"}
		});
	  //return new Response('Hello World!');
	},
} satisfies ExportedHandler<Env>;

