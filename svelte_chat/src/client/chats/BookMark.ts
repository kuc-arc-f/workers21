//import LibDbSession from '$lib/LibDbSession';
//import LibConfig from '$lib/LibConfig';
//import LibAuth from '$lib/LibAuth';
import HttpCommon from '../../lib/HttpCommon';

//
const BookMark = {
  /**
  * getItems
  * @param chatId: number
  *
  * @return
  */   
  getItems : async function (chatId: number, userId: number): Promise<any>
  {
   try{
     const item = {
      chatId: chatId,
      userId: userId,
     }      
     const json = await HttpCommon.server_post(item, "/bookmark/get_list");
console.log(json);
     return json.data;
   } catch (e) {
     console.error(e);
     throw new Error('Error, getItems');
   }
  },
  /**
  * getChatItems : chat単位リスト
  * @param chatId: number
  *
  * @return
  */   
  getChatItems : async function (chatId: number): Promise<any>
  {
   try{
     const item = {
      chatId: chatId,
     }      
     const json = await HttpCommon.server_post(item, "/threads/get_list_chat");
//console.log(json);
     return json.data;
   } catch (e) {
     console.error(e);
     throw new Error('Error, getChatItems');
   }
  },
 
  /**
  * create
  * @param chatPostId: number
  *
  * @return
  */   
  create : async function (chatPostId: number, chatId: number, userId: number): Promise<void>
   {
    try{
      const item = {
        title: '',
        userId: userId,
        chatId: chatId,
        chatPostId: chatPostId,
      }
//console.log(item);
//return;
      const json = await HttpCommon.server_post(item, "/bookmark/create");
      console.log(json);
    } catch (e) {
      console.error(e);
      throw new Error('Error, create');
    }
   },  
  /**
  *
  * @param id: number
  *
  * @return
  */
  delete: async function (id: number): Promise<any>
   {
    try{
      let ret = false;
      const item = {
        id: id
      }
      const json = await HttpCommon.server_post(item, "/bookmark/delete");
      console.log(json);
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error, delete');
    }
   },
  /**
  *
  * @param
  *
  * @return
  */
  search: async function(chatId: number, searchKey: string, userId: number): Promise<any>
  {
    try {
        let items = [];
        const item = {
          chatId: chatId,
          "userId": userId,
          seachKey : searchKey,
        }
// /console.log(items);	      

        const json = await HttpCommon.server_post(item, "/bookmark/search");
        items = json.data
// /console.log(items);	      
      return items;
    } catch (e) {
      console.error(e);
    }
  },       
}
export default BookMark;
