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
        //const cookieAuthElem = document.getElementById("userId") as HTMLInputElement;
        const cookieAuthElem = document.getElementById("cookieAuth") as HTMLInputElement;
        let cookieAuth = cookieAuthElem ? Number(cookieAuthElem.value) : null;
        //console.log("cookieAuth", cookieAuth);
        return cookieAuth;
        //return ret;    
      } catch (e) {
        console.error(e);
      }
    },
}
export default LibAuth;
