import renderLayout from './renderLayout';
//
export default function Page(props: any) { 
  //
  const htm = `
  <div>
    <div id="app"></div>
  </div>
  `;
  return renderLayout({children: htm, title: "Home"});
}
/*
*/