import LibConfig from '../../lib/LibConfig';
import Crud from './Crud';
import HttpCommon from '../../lib/HttpCommon';
//
const CrudCreate = {

  /**
   * addItem:
   * @param key: any
   *
   * @return
   */
  addItem : async function() : Promise<any>
  {
    try{
      let ret = false;
      let values = Crud.getInputValues();
      values.userId = 0;
console.log(values);
      const body: any = JSON.stringify(values);	
      const res = await fetch("/api/chats/create", {
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
      return json;
    } catch (e) {
      console.error("Error, addItem");
      console.error(e);
      throw new Error('Error , addItem');
    }
  },  
  /**
  * startProc
  * @param
  *
  * @return
  */   
  startProc :async function (): Promise<void> 
  {
    try{
      console.log("#startProc");
      //btn
      const button: any = document.querySelector('#btn_save');
      button.addEventListener('click', async () => {
        const result = await this.addItem();
        console.log("result=", result);
        if(result === true) {
          window.location.href = '/chats';
        }
      }); 
    } catch (e) {
      console.error(e);
    }    
  } 
}
//
//CrudCreate.startProc();

export default CrudCreate;
