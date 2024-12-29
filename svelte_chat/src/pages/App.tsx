import renderLayout from './renderLayout';
//
export default function Page(props: any) { 
  console.log(props);
  const htm = `
  <div>
    <div id="app"></div>
    <input type="hidden" id="cookieAuth" value="${props.coolieAuth}"/>
    <input type="hidden" id="userId" value="${props.userId}"/>
  </div>
  `;
  return renderLayout({children: htm, title: "Home"});
}
