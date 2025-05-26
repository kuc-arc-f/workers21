<svelte:head>
<title>Posts</title>
<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import { onMount } from 'svelte';
import LibConfig from '../lib/LibConfig';
import LibCommon from '../lib/LibCommon';
import LibChatPost from '../lib/LibChatPost';
import CrudIndex from './chats/CrudIndex';
import LibCookie from '../lib/LibCookie';
import ChatPost from './chats/ChatPost';
import Chat from './chats/Chat';
import ModalPost from './ChatShow/ModalPost.svelte';
import PaginateBox from '../lib/components/PaginateBox.svelte';
import Head from "../components/Head.svelte";
import SideBar from "../components/SideBar.svelte";
const MODE_HOME = "home";
const MODE_THREAD = "thread";
const MODE_BOOKMARK = "bookmark";
//
const postCfg= LibChatPost.get_params()
const chatParams = {
  INIT_TIME : new Date(),
  STAT : postCfg.STATE_ACTIVE,
  STAT_DISPLAY : postCfg.STATE_DISPLAY_ACTIVE,
  REMAIN_TIME : 0,
}
export let params: any;
export let data: any, chat_posts: any[] = [], DATA = chatParams, chat: any = {id: 0, name:""},
post_id = 0, modal_display = false, mTimeoutId: any = 0, user:any = {}, lastCreateTime: string = "";
let id = 0;
let items = [], itemsAll = [], itemPage = 1, perPage: number = 100;
//
onMount(() => {
  console.log("#onMount");
  id = Number(params.id);
console.log("itemId=", id);
  startProc();
});
/**
* addItem
* @param
*
* @return
*/
async function addItem(){
    try {
        const result = await ChatPost.addItem(id);
console.log(result);        
        items = await ChatPost.getList(id);
console.log(items);        

    } catch (error) {
        console.error(error);
    }    
}
/**
 * clickClear
 * @param
 *
 * @return
 */
const clickClear = async function() {
    try{
        const searchKey = document.querySelector<HTMLInputElement>('#searchKey');
        // @ts-ignore
        if(searchKey) {
            searchKey.value = "";
        }
        items = await ChatPost.getList(id);
    } catch (e) {
        console.error(e);
        throw new Error('Error , clickClear');
    }    
}
/**
*
* @param
*
* @return
*/
async function clickSearch(){
    try {
        const searchKey = document.querySelector<HTMLInputElement>('#searchKey');
        const skey = searchKey?.value;
console.log("search:", skey);
        //@ts-ignore
        items = await ChatPost.search(id, skey);
//console.log(items);
        chat_posts = items;
    } catch (error) {
        console.error(error);
    }    
}
/**
*
* @param
*
* @return
*/
const startProc= async function() {
    try{
        const key = LibConfig.COOKIE_KEY_LAST_CHAT;
        LibCookie.setCookie(key, String(id));
        itemsAll = await ChatPost.getList(id);
        items = await CrudIndex.getPageList(itemsAll, itemPage, perPage);
        console.log(itemsAll);
        const chatData = await Chat.get(Number(id));
        chat = chatData;
console.log(chatData);
    } catch (e) {
    console.error(e);
    }
}
//startProc();
/**
 *
 * @param
 *
 * @return
 */
const parentGetList = async function (chat_id: number) {
  try {
//console.log("parentGetList=", chat_id);
      items = await ChatPost.getList(Number(id));
      chat_posts = items;
  } catch (e) {
      console.error(e);
  }    
}

const parentDialogClose = async function () {
  try {
    modal_display = false;
  } catch (e) {
      console.error(e);
  }    
}

/**
 *
 * @param
 *
 * @return
 */
 const parentShow = function (id: number)
{
    try {
console.log("parentShow=", id)
        post_id = id;
        modal_display = false;
        const timer = 100;
        setTimeout(() => {
            console.log("parentShow=", id);
            modal_display = true;
        }
        , timer);
    } catch (e) {
        console.log(e);
    }
}
/**
*
* @param
*
* @return
*/ 
const parentUpdateList = async function(page: number) {
  console.log("parentUpdateList=", page);
  itemPage = page;
  items = await CrudIndex.getPageList(itemsAll, page, perPage);
  console.log(items);
}
</script>



<!-- MarkUp -->
<div class="bg-gray-50 font-sans">
  <header 
    class="fixed top-0 left-0 right-0 bg-white border-b border-gray-400 h-[40px] flex items-center justify-center z-10">
    <a  href="/">
      <h1 class="text-lg font-medium text-gray-700">Home</h1>
    </a>
  </header>

  <div class="flex h-screen mt-[40px]">
    <SideBar mode={MODE_HOME} id={params.id} />
    <!-- メインコンテンツ -->
    <main class="flex-1 bg-gray-50 p-4">
      <!-- ヘッダー -->
      <header class="flex items-center justify-between p-4 bg-white shadow-md rounded-md mb-4">
          <div class="relative flex-grow">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-6a7 7 0 10-14 0 7 7 0 0014 0z"></path></svg>
              </div>
              <input type="text" 
              class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="Search Key">
          </div>
          <div class="flex items-center space-x-4 ml-4">
              <button class="p-2 btn-outline-blue">
                Search
              </button>
              <div class="relative">
                <!--
                  <button class="flex items-center space-x-2 focus:outline-none">
                      <span class="text-sm font-semibold">User1</span>
                      <span class="text-sm font-semibold">
                      </span>
                      <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                -->
                <button class="flex items-center space-x-2 focus:outline-none">
                  <svg class="user-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="30" fill="#CCC" />
                    <circle cx="32" cy="24" r="12" fill="#fff" />
                    <path d="M16,54 C16,44 24,36 32,36 C40,36 48,44 48,54 Z" fill="#fff" />
                  </svg>
                </button>
              </div>
          </div>

      </header>

      <!-- コンテンツエリア -->
      <div class="bg-white rounded-md shadow-md p-4">
        <h1 class="text-xl font-semibold mb-2">{chat.name}</h1>
        <!-- ダッシュボードの内容をここに追加 
        ID: {id}
        <div class="row">
          <div class="col-sm-6">
              <h1>{chat.name}</h1>
          </div>
          <div class="col-sm-6 text-center pt-3">
          </div>
        </div>
        <hr class="my-1" />
        -->
        <div class="row">
            <div class="col-sm-9">
            <textarea class="input_textarea" name="body" id="body" rows="3" />
            </div>
            <div class="col-sm-3">
                <button class="mt-2 btn" on:click={addItem} >
                Post</button>
            </div>
        </div>
      </div>
      <!-- List -->
      {#each items as item}
      <div class="bg-white rounded-md shadow-md p-4 mt-4">
        <div>
          <h5 class="text-1xl font-bold">{item.user_name}</h5>
          <hr class="my-1" />
          <p>{@html LibCommon.replaceBrString(item.body)}</p>
          <p>{LibCommon.converDateString(item.createdAt)} , ID: {item.id}
          </p>
          <button on:click={parentShow(item.id)}
          class="btn-outline-blue">Show</button>
        </div>
      </div>
      {/each}

      <div class="bg-white rounded-md shadow-md p-4 my-2">
        <!-- paginate max-w-md -->
        <PaginateBox  itemPage={itemPage} parentUpdateList={parentUpdateList} /> 
        <!-- Modal -->
        {#if modal_display}
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div class="bg-white rounded-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <ModalPost post_id={post_id} parentGetList={parentGetList} 
            parentDialogClose={parentDialogClose} />
          </div>
        </div>
        {/if}            
      </div>

    </main>
  </div>
</div>
<!-- CSS -->
<style>
  .chat_show_modal_wrap #open_post_show { display: none ;}

</style>
<!--
<div class="row">
    <div class="col-md-12 pt-1">
        <button class="btn btn-sm btn-outline-primary" on:click={() => clickClear()} 
        >Clear</button>
        <span class="search_key_wrap">
            <input type="text" size="36" class="mx-2 " name="searchKey"
             id="searchKey" placeholder="Search Key">
        </span>
        <button class="btn btn-sm btn-outline-primary" on:click={() => clickSearch()}>Search</button>
    </div>
</div>
<hr class="my-1" />
--->
