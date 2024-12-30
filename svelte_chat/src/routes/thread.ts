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
    //console.log("/threads/create");
    const req = await request.json();
    const retObj = {ret: "NG", data: [], message: ''}
    console.log(req);
    try{
      if (req) {
        const sql = `
        INSERT INTO Thread ( title, body, chatId, chatPostId, userId)
        VALUES('${req.title}', '${req.body}', ${req.chatId},
         ${req.chatPostId}, ${req.userId});
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
        DELETE FROM Thread WHERE id = ${req.id}
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
  },
  /**
  *
  * @param
  *
  * @return
  */
  get: async function (req: any, res: any, env: any): Promise<Response>
  {
//    console.log(req);
    let item = {};
    let result: any = {}; 
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (req) {
        const sql = `
        SELECT * FROM Thread
        WHERE id = ${req.id}
        `;        
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
  get_list: async function (request: any, res: any, env: any): Promise<Response>
  {
    const req = await request.json();
console.log(req);
    let resulte: any = [];
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      let result: any = {};  
      if (req) {
        const sql = `
        SELECT 
        "Thread".id as thread_id
        ,"Thread"."chatId"
        ,"Thread"."chatPostId"
        ,"Thread"."userId"
        ,"Thread".title
        ,"Thread".body
        ,"Thread"."createdAt"
        ,"Thread"."updatedAt"
        ,"User".name as user_name
        FROM Thread
        INNER JOIN "ChatPost" ON
        ("Thread".chatPostId = "ChatPost".id)        
        LEFT OUTER JOIN "User" ON
        ("User".id = "Thread"."userId")
        WHERE "Thread"."chatPostId" = ${req.chatPostId}
        ORDER BY Thread.id DESC
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
  * chat 単位のスレッド一覧
  * @param
  *
  * @return
  */   
  get_list_chat: async function (request: any, res: any, env: any): Promise<Response>
  {
    const req = await request.json();
console.log(req);
    let resulte: any = [];
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      let result: any = {};  
      if (req) {
        const sql = `
        SELECT 
        "Thread".id as thread_id
        ,"Thread"."chatId"
        ,"Thread"."chatPostId"
        ,"Thread"."userId"
        ,"Thread".title
        ,"Thread".body
        ,"Thread"."createdAt"
        ,"Thread"."updatedAt"
        ,"User".name as user_name
        FROM Thread
        INNER JOIN "ChatPost" ON
        ("Thread".chatPostId = "ChatPost".id)        
        LEFT OUTER JOIN "User" ON
        ("User".id = "Thread"."userId")
        WHERE "Thread"."chatId" = ${req.chatId}
        ORDER BY Thread.id DESC
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
 search: async function (req: any, res: any, env: any): Promise<Response>
 {
console.log(req);
   let resulte: any = [];
   const retObj = {ret: "NG", data: [], message: ''}
   try{
     let result: any = {};  
     if (req) {
       const sql = `
       SELECT 
       "Thread".id as thread_id
       ,"Thread"."chatId"
       ,"Thread"."chatPostId"
       ,"Thread"."userId"
       ,"Thread".title
       ,"Thread".body
       ,"Thread"."createdAt"
       ,"Thread"."updatedAt"
       ,"User".name as user_name
       FROM Thread
       INNER JOIN "ChatPost" ON
       ("Thread".chatPostId = "ChatPost".id)        
       LEFT OUTER JOIN "User" ON
       ("User".id = "Thread"."userId")
       WHERE "Thread"."chatId" = ${req.chatId}
       AND "Thread"."body" like '%${req.seachKey}%'
       ORDER BY Thread.id DESC
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
