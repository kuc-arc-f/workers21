//
const router = {
  /**
  * create
  * @param
  *
  * @return
  */
  create: async function (request: any, res: any, env: any): Promise<Response>
  {
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      const req = await request.json();
      if (req) {
        console.log(req);
        // req.name
        if(!req.name){
          throw new Error('Error , name none');
          //return Response.json(retObj);
        }
        const sql = `
        INSERT INTO Chat ( name, content, userId)
        VALUES('${req.name}', '${req.content}', ${req.userId});
        `;
//console.log(sql);
        const resulte = await env.DB.prepare(sql).run();
//console.log(resulte);
        if(resulte.success !== true) {
          console.error("Error, /create");
          throw new Error('Error , create');
        }
        //id
        const sql_id = "SELECT last_insert_rowid() AS id;";
        const resultId = await env.DB.prepare(sql_id).all();
//console.log(resultId);
        if(resultId.results.length < 1) {
          console.error("Error, resultId.length < 1");
          throw new Error('Error , create, SELECT last_insert_rowid');
        }
        const item_id = resultId.results[0].id;
console.log("item_id=", item_id);
        req.id = item_id;
      }            
      return Response.json({ret: "OK", data: req});
    } catch (e) {
      console.error(e);
      return Response.json(retObj);
    } 
  }, 
  /**
  *
  * @param
  *
  * @return
  */ 
  delete: async function (req: any, res: any, env: any): Promise<Response>
  {
console.log(req);
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (req) {
        const sql = `
        DELETE FROM Chat WHERE id = ${req.id}
        `;
console.log(sql);
        const resulte = await env.DB.prepare(sql).run();
//console.log(resulte);
        if(resulte.success !== true) {
          console.error("Error, delete");
          throw new Error('Error , delete');
        }      
      }
      return Response.json({ret: "OK", data: req});
    } catch (e) {
      console.error(e);
      return Response.json(retObj);
    } 
  },
  /**
  *
  * @param
  *
  * @return
  */ 
  update: async function (req: any, res: any, env: any): Promise<Response>
  {
  //    console.log("#test.update");
console.log(req);
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (req) {
        const sql = `
        UPDATE Chat 
        SET name = '${req.name}', content='${req.content}'
        WHERE id = ${req.id}
        `;
        console.log(sql);
        const resulte = await env.DB.prepare(sql).run();
        if(resulte.success !== true) {
          console.error("Error, update");
          throw new Error('Error , update');
        }           
      }                
      return Response.json({ret: "OK", data: req});
    } catch (e) {
      console.error(e);
      return Response.json(retObj);
    } 
  },
  /**
  *
  * @param
  *
  * @return
  */
  get: async function (request: any, res: any, env: any): Promise<Response>
  {
    const req = await request.json();
    console.log(req);
    let item = {};
    let result: any = {}; 
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (req) {
        const sql = `
        SELECT * FROM Chat
        WHERE id = ${req.id}
        `;   
console.log(sql);     
        result = await env.DB.prepare(sql).all();
//console.log(result.results);
        if(result.results.length < 1) {
          console.error("Error, results.length < 1");
          throw new Error('Error , get');
        }
        item = result.results[0];
      }      
      return Response.json({ret: "OK", data: item});
    } catch (e) {
      console.error(e);
      return Response.json(retObj);
    } 
  }, 
  /**
  *
  * @param
  *
  * @return
  */ 
  get_list: async function (req: any, res: any, env: any): Promise<Response>
  {
//    console.log(req);
    let resulte: any = [];
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      let result: any = {};  
      if (req) {
        const sql = `
        SELECT * FROM Chat
        ORDER BY id DESC
        LIMIT 100
        `;  
console.log(sql);
        resulte = await env.DB.prepare(sql).all();
        //console.log(resulte);
        if(resulte.length < 1) {
          console.error("Error, results.length < 1");
          throw new Error('Error , get');
        }              
      }           
      return Response.json({ret: "OK", data: resulte.results});
    } catch (e) {
      console.error(e);
      return Response.json(retObj);
    } 
  },
  /**
  *
  * @param
  *
  * @return
  */
 search: async function (request: any, res: any, env: any): Promise<Response>
 {
   const req = await request.json();
console.log(req);
   let resulte: any = [];
   const retObj = {ret: "NG", data: [], message: ''}
   try{
     let result: any = {};  
     if (req) {
       const sql = `
       SELECT * FROM Chat
       WHERE "name" like '%${req.seachKey}%'
       ORDER BY id DESC
       LIMIT 100
       `;  
//console.log(sql);
       resulte = await env.DB.prepare(sql).all();
       //console.log(resulte);
       if(resulte.length < 1) {
         console.error("Error, results.length < 1");
         throw new Error('Error , get');
       }              
     }           
     return Response.json({ret: "OK", data: resulte.results});
   } catch (e) {
     console.error(e);
     return Response.json(retObj);
   } 
 },     
}
export default router;
