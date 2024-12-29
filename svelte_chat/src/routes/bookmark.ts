//
const router = {
  /**
  * create
  * @param
  *
  * @return
  */
  create: async function (req: any, res: any, env: any): Promise<Response>
  {
//console.log("/threads/create");
console.log(req);
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (req) {
        const sql = `
        INSERT INTO BookMark ( chatId, chatPostId, userId)
        VALUES(${req.chatId},
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
  delete: async function (req: any, res: any, env: any): Promise<Response>
  {
console.log(req);
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (req) {
        const sql = `
        DELETE FROM BookMark WHERE id = ${req.id}
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
  get_list: async function (req: any, res: any, env: any): Promise<Response>
  {
console.log(req);
    let resulte: any = [];
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      let result: any = {};  
      if (req) {
        const sql = `
        SELECT 
        "BookMark".id as bookmark_id
        ,"BookMark"."chatId"
        ,"BookMark"."userId"
        ,"ChatPost".title
        ,"ChatPost".body
        ,"ChatPost".id as chatPostId
        ,"BookMark"."createdAt"
        ,"BookMark"."updatedAt"
        ,"User".name as user_name
        FROM BookMark
        INNER JOIN "ChatPost" ON
        ("ChatPost".id = "BookMark"."chatPostId")
        INNER JOIN"User" ON
        ("BookMark".userId = "User"."id")
        WHERE "BookMark"."chatId" = ${req.chatId}
        AND "BookMark"."userId" = ${req.userId}
        ORDER BY BookMark.id DESC 
        LIMIT 1000       
        `; 
//console.log(sql);
        resulte = await env.DB.prepare(sql).all();
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
  get_list_chat: async function (req: any, res: any, env: any): Promise<Response>
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
        LEFT OUTER JOIN "User" ON
        ("User".id = "Thread"."userId")
        WHERE "Thread"."chatId" = ${req.chatId}
        ORDER BY Thread.id DESC
        LIMIT 1000
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
        "BookMark".id as bookmark_id
        ,"BookMark"."chatId"
        ,"BookMark"."userId"
        ,"ChatPost".title
        ,"ChatPost".body
        ,"ChatPost".id as chatPostId
        ,"BookMark"."createdAt"
        ,"BookMark"."updatedAt"
        ,"User".name as user_name
        FROM BookMark
        INNER JOIN "ChatPost" ON
        ("ChatPost".id = "BookMark"."chatPostId")
        INNER JOIN"User" ON
        ("BookMark".userId = "User"."id")
        WHERE "BookMark"."chatId" = ${req.chatId}
        AND "BookMark"."userId" = ${req.userId}
        AND "ChatPost"."body" like '%${req.seachKey}%'
        ORDER BY BookMark.id DESC 
        LIMIT 1000       
        `; 
//console.log(sql);
        resulte = await env.DB.prepare(sql).all();
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
