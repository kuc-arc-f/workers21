//import moment from 'moment'
import LibConfig from '../../lib/LibConfig'
import HttpCommon from '../../lib/HttpCommon';
//
const LibChat = {
  /**
  * get :
  * @param
  *
  * @return Promise<any>
  */      
  get: async function(id: number): Promise<any>
  {
    try{
      //console.log("#Get");
      let ret = {};
      let item: any = {
        "id": id
      };
      const body: any = JSON.stringify(item);	
      const res = await fetch("/api/chats/get", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      if (res.status !== 200) {
        throw new Error(await res.text());
      }
      const json = await res.json()
      //console.log(json);   
      ret = json.data;

      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error , get');
    }    
  }, 
  /**
  *
  * @param
  *
  * @return
  */
  search: async function(searchKey: string): Promise<any>
  {
    try {
        let items = [];
        const item = {
          seachKey : searchKey,
        }
        const json = await HttpCommon.server_post(item, "/chats/search");
        items = json.data
console.log(items);	      
      return items;
    } catch (e) {
      console.error(e);
    }
  },     
}
export default LibChat;
