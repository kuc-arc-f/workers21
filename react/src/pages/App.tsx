import renderLayout from './renderLayout';
//
export default function Page(props: any) { 
  //
  const htm = `
  <div>
    <div id="root"></div>
  </div>
  `;
  return renderLayout({children: htm, title: "Home"});
}
/*
src="/public/static/entry-client.js"
*/
