<script>
//import LibCookie  from './lib/LibCookie';
import Head from "../components/Head.svelte";
import {link} from 'svelte-spa-router'
import { onMount } from 'svelte';
import LibConfig from '../lib/LibConfig';
import LibCookie from '../lib/LibCookie';
import Chat from './chats/Chat';

let chatId = 0;
let chatData = {id: 0, name: ""};
let recentdisplay = false;

onMount(async () => {
  const key = LibConfig.COOKIE_KEY_LAST_CHAT;
  const value = LibCookie.getCookie(key);
  if(value){    
    chatId = Number(value);
    console.log("chatId=", value);
    const target = await Chat.get(Number(chatId));
    chatData = target;
    //console.log(target);
    const authValue = LibCookie.getCookie(LibConfig.COOKIE_KEY_AUTH);
    if(authValue) {
      console.log("authValue=", authValue);
      chatId = Number(authValue);
    }

    recentdisplay = true;
  }
});
</script>

<Head />
<div class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-4">Home</h1>
  <hr class="my-2" />
  {#if recentdisplay}
    <span>userId: {chatId}</span>
    <hr class="my-2" />
    <h3 class="text-1xl text-gray-400">Recent Chat</h3>
    <hr class="my-2" />
    <span class="text-2xl font-bold"><h3 class="py-1">{chatData.name}</h3>
    </span>
    <span>ID: {chatData.id}</span>
     <a use:link href={`/chatshow/${chatData.id}`}>
      <button class="btn btn-outline-blue ms-2">Open
      </button>		
    </a>
  {/if}
</div>
<!--
  <hr />
  <h3 class="text-2xl font-bold mb-4">Recent Chats</h3>
-->
