import LibConfig from '../../lib/LibConfig';
import LibAuth from '../../lib/LibAuth';
import HttpCommon from '../../lib/HttpCommon';
//import LibDbSession from '$lib/LibDbSession';

//
const ChatPost = {
  /**
  *
  * @param
  *
  * @return
  */
  search: async function(chatId: number, searchKey: string): Promise<any>
  {
    try {
        let items = [];
        const item = {
          chatId: chatId,
          seachKey : searchKey,
        }
        const json = await HttpCommon.server_post(item, "/chat_posts/search");
        items = json.data
// /console.log(items);	      
      return items;
    } catch (e) {
      console.error(e);
    }
  },   
  /**
  * addItem
  * @param
  *
  * @return
  */
  addItem: async function(id: number)
  {
    try {
      let ret = {};
      const elemBody = document.querySelector<HTMLInputElement>('#body');
      const item = {
        title: '',
        chatId: Number(id),
        body: elemBody?.value,
        userId : LibAuth.getUserId(),
      }
      console.log(item);
      const body: any = JSON.stringify(item);	
      const res = await fetch("/api/chat_posts/create", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      const json = await res.json()
      if (res.status !== 200) {
        console.log(json);   
        throw new Error(await res.text());
      }
      if (json.ret !==  LibConfig.OK_CODE) {
        throw new Error("Error, json.ret <> OK");
      } 
      console.log(json);      
      //items = json.data
      //@ts-ignore
      elemBody.value = "";
      ret = json.data;
      return ret;
    } catch (error) {
        console.error(error);
    }    
  },
  /**
   * getList:
   * @param key: any
   *
   * @return
   */ 
  getList: async function(chatId: number): Promise<any>
  {
    try {
        let items = [];
        const item = {
          chatId: chatId,
          userId : 0,
        }
        const body: any = JSON.stringify(item);	
        const res = await fetch("/api/chat_posts/get_list", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},      
          body: body
        });
        const json = await res.json()
        if (res.status !== 200) {
          console.log(json);   
          throw new Error(await res.text());
        }
        if (json.ret !==  LibConfig.OK_CODE) {
          throw new Error("Error, json.ret <> OK");
        } 
        console.log(json);      
        items = json.data
console.log(items);	      
      return items;
    } catch (e) {
      console.error(e);
    }
  },
  /**
  * delete
  * @param
  *
  * @return ret: true(update)
  */     
  delete : async function (id: number): Promise<void>
  {
    try {
      const item = {
        id: id,
      }
//console.log(item)      
      //const json = await HttpCommon.server_post(item, '/chat_posts/delete');
      const body: any = JSON.stringify(item);	
      const res = await fetch("/api/chat_posts/delete", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      const json = await res.json()
      if (res.status !== 200) {
        console.log(json);   
        throw new Error(await res.text());
      }
      if (json.ret !==  LibConfig.OK_CODE) {
        throw new Error("Error, json.ret <> OK");
      }
      console.log(json.ret);
    } catch (e) {
      console.log(e);
      throw new Error('error, delete');
    }
  },  
  /**
  * getLastTime
  * @param chatId: number
  *
  * @return Promise
  */      
  getLastTime : async function (chatId: number, userId: number): Promise<any>
  {
    try {
      let ret = {};
      const item = {
        chatId: chatId,
        userId: userId,
      }
      const json = await HttpCommon.server_post(item, "/chat_posts/get_last_time");
      if(json.ret === LibConfig.OK_CODE) {
//console.log(json.data);
        ret = json.data;
      }
      return ret;       
    } catch (e) {
      console.log(e);
      throw new Error('error, getLastTime');
    }
   },
  /**
  * 
  * @param chatId: number
  *
  * @return Promise
  */       
  get : async function (chatId: number): Promise<any>
  {
    try {
      let ret = {};
      const item = {
        id: chatId,
        userId : 0,
      }
      const body: any = JSON.stringify(item);	
      const res = await fetch("/api/chat_posts/get", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      const json = await res.json()
      if (res.status !== 200) {
        console.log(json);   
        throw new Error(await res.text());
      }
      if (json.ret !==  LibConfig.OK_CODE) {
        throw new Error("Error, json.ret <> OK");
      } 
      console.log(json);      
      //items = json.data
//console.log(json);
      if(json.ret === LibConfig.OK_CODE) {
        ret = json.data;
      }
      return ret;       
    } catch (e) {
      console.log(e);
      throw new Error('error, get');
    }
   },
}
export default ChatPost;
