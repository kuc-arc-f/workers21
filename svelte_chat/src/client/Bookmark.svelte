<svelte:head>
<title>Posts</title>
<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import { onMount } from 'svelte';
import LibConfig from '../lib/LibConfig';
import LibCommon from '../lib/LibCommon';
import LibChatPost from '../lib/LibChatPost';
import LibAuth from '../lib/LibAuth';;
import CrudIndex from './chats/CrudIndex';
import LibCookie from '../lib/LibCookie';
import ChatPost from './chats/ChatPost';
import Chat from './chats/Chat';
import BookMark from './chats/BookMark';

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
let id = 0 , userId = 0;
let items = [], itemsAll = [], itemPage = 1, perPage: number = 100;
//
onMount(() => {
  console.log("#onMount");
  id = Number(params.id);
  userId = LibAuth.getUserId();
console.log("itemId=", id);
console.log("userId=", userId);
  startProc();
});
/**
*
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
 *
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
      const d = await BookMark.getItems(id , userId);
      console.log(d);
      items = d;
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

const parentUpdateList = async function(page: number) {
  console.log("parentUpdateList=", page);
  itemPage = page;
  items = await CrudIndex.getPageList(itemsAll, page, perPage);
  console.log(items);
}

/**
 *
 * @param
 *
 * @return
 */
const deleteBookmark = async function (bookmark_id: number) {
    try {
console.log("deleteBookmark=" , bookmark_id);
        await BookMark.delete(bookmark_id);
        items = await BookMark.getItems(id, userId);
    } catch (e) {
        console.error(e);
    }    
}
</script>

<!-- MarkUp -->
<div class="bg-gray-50 font-sans">
  <div class="flex h-screen">
    <SideBar mode={MODE_BOOKMARK} id={params.id} />
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
        <h1 class="text-xl font-semibold mb-2">Bookmark</h1>
      </div>
      <!-- List -->
      {#each items as item}
      <div class="bg-white rounded-md shadow-md p-4 mt-4">
          <h5>{item.user_name}</h5>
          <hr class="my-1" />
          <p>{@html LibCommon.replaceBrString(item.body)}</p>
          <p>{LibCommon.converDateString(item.createdAt)} , ID: {item.bookmark_id}
          <button class="btn-outline-red mx-2"
           on:click={deleteBookmark(item.bookmark_id)}
          >Delete</button>
          <button on:click={parentShow(item.chatPostId)}
          class="btn btn-sm btn-outline-primary">Show</button>        
          </p>
      </div>      
      {/each}

      <div class="bg-white rounded-md shadow-md p-4 my-2">
        <PaginateBox  itemPage={itemPage} parentUpdateList={parentUpdateList} /> 
        {#if modal_display}
        <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
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

