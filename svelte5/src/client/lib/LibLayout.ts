import LibCookie from './LibCookie';

const LibLayout = {
  /**
   *
   * @param key: any
   *
   * @return
   */  
  startProc : async function() : Promise<any>
  {
    try{
      let ret = false;
      const parsedUrl = new URL(window.location.href);
      if(
          !(parsedUrl.pathname === '/login' ||
          parsedUrl.pathname === '/user/create'
          )
      )
      {
  console.log("LibLayout.pathname=", parsedUrl.pathname);
        const authValue = LibCookie.getAuthValue()
        //console.log("LibLayout.getCookie=", authValue);
        if(!authValue){
          location.href = '/#/login';
          return;
        }
      }
      return ret;  
    } catch (e) {
      console.error(e);
    }
  }

}
export default LibLayout;