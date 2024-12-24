
let PATH__FAVICON = "/favicon.ico";
//
export default function Compo(props: any) {
  const html = `<!DOCTYPE html><html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${props.title}</title>
    <link rel="icon" href="${PATH__FAVICON}" type="image/x-icon"></link>
    <link href="/static/main.css" rel="stylesheet"/>
  </head>
  <body>
    <hr />        
    ${props.children}
    <script type="module" src="/static/main.js"></script>
  </body></html>
  `
  return html;
}
/*
<!-- head_wrap -->
<div>
  <a href="/">[ home ]</a>
</div>
*/
