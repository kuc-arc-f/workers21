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
    const req = await request.json();
console.log(req);
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (req) {
        const sql = `
        INSERT INTO ChatPost ( chatId, userId, title, body)
        VALUES(${req.chatId}, ${req.userId}, '${req.title}','${req.body}')
        `;
console.log(sql);
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
  delete: async function (request: any, res: any, env: any): Promise<Response>
  {
    const req = await request.json();
    console.log(req);
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (req) {
        const sql = `
        DELETE FROM ChatPost WHERE id = ${req.id}
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
        UPDATE ChatPost 
        SET title = '${req.title}', content='${req.body}'
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
//    console.log(req);
    let item = {};
    let result: any = {}; 
    const retObj = {ret: "NG", data: [], message: ''}
    const req = await request.json();
    try{
      if (req) {
        const sql = `
        SELECT "ChatPost".id
        ,"ChatPost"."chatId"
        ,"ChatPost"."userId"
        ,"ChatPost".title
        ,"ChatPost".body
        ,"ChatPost"."createdAt"
        ,"ChatPost"."updatedAt"
        ,"User".name as user_name
        FROM ChatPost
        LEFT OUTER JOIN "User" ON
        ("User".id = "ChatPost"."userId")
        WHERE "ChatPost".id = ${req.id}
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
  get_last_time: async function (req: any, res: any, env: any): Promise<Response>
  {
//    console.log(req);
    let item = {};
    let result: any = {}; 
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (req) {
        const sql = `
        SELECT "ChatPost".id
        , "ChatPost"."createdAt"
        FROM ChatPost
        WHERE chatId = ${req.chatId}
        ORDER BY id DESC LIMIT 1
        `;   
//console.log(sql);   
        result = await env.DB.prepare(sql).all();
//console.log(result.results);
        if(result.results.length < 1) {
          console.error("Error, results.length < 1");
          throw new Error('Error , get_last_time');
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
  get_list: async function (request: any, res: any, env: any): Promise<Response>
  {
    const req = await request.json();
    //console.log(req);
    let resulte: any = [];
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (req) {
        const sql = `
        SELECT "ChatPost".id
        ,"ChatPost"."chatId"
        ,"ChatPost"."userId"
        ,"ChatPost".title
        ,"ChatPost".body
        ,"ChatPost"."createdAt"
        ,"ChatPost"."updatedAt"
        ,"User".name as user_name
        FROM ChatPost
        LEFT OUTER JOIN "User" ON
        ("User".id = "ChatPost"."userId")
        WHERE ChatPost.chatId = ${req.chatId}
        ORDER BY ChatPost.id DESC   
        LIMIT 1000     
        `;  
        resulte = await env.DB.prepare(sql).all();
console.log(sql);
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
//console.log(req);
    let resulte: any = [];
    const retObj = {ret: "NG", data: [], message: ''}
    try{
//      let result: any = {};  
      if (req) {
        const sql = `
        SELECT "ChatPost".id
        ,"ChatPost"."chatId"
        ,"ChatPost"."userId"
        ,"ChatPost".title
        ,"ChatPost".body
        ,"ChatPost"."createdAt"
        ,"ChatPost"."updatedAt"
        ,"User".name as user_name
        FROM ChatPost
        LEFT OUTER JOIN "User" ON
        ("User".id = "ChatPost"."userId")
        WHERE ChatPost.chatId = ${req.chatId}
        AND "body" like '%${req.seachKey}%'
        ORDER BY ChatPost.id DESC   
        LIMIT 1000     
        `;  
        resulte = await env.DB.prepare(sql).all();
console.log(sql);
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
