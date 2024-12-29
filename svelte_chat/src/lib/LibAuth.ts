import LibCookie from './LibCookie';
import LibConfig from './LibConfig';
//
const LibAuth = {
    /**
     *
     * @param key: any
     *
     * @return
     */ 
    getUserId: function(): any
    {
      try {
        let ret = null;
        const cookieAuthElem = document.getElementById("userId") as HTMLInputElement;
        let cookieAuth = cookieAuthElem ? Number(cookieAuthElem.value) : null;
        //console.log("cookieAuth", cookieAuth);
        return cookieAuth;

        /*
        const key = LibConfig.COOKIE_KEY_USER;
        const auth = LibCookie.getCookie(key);
        if(!auth) {
          throw new Error('Error , user cookie nothing.');
        } 
        ret = Number(auth); 
        */
        return ret;    
      } catch (e) {
        console.error(e);
      }
    },
}
export default LibAuth;
