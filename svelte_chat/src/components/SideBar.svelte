<script lang="ts">
import { onMount } from 'svelte';
import {link} from 'svelte-spa-router'
import LibCookie from "../lib/LibCookie";
import LibConfig from "../lib/LibConfig";  

export let mode: string, id:any;

let BTN_HOME_CSS = "";
let BTN_THREAD_CSS = "";
let BTN_BOOKMARK_CSS = "";
const MODE_ACTIVE_CSS = "bg-blue-600 text-white hover:bg-blue-700";
const MODE_NONE_ACTIVE_CSS = "hover:bg-gray-100";

const MODE_HOME = "home";
const MODE_THREAD = "thread";
const MODE_BOOKMARK = "bookmark";

onMount(() => {
  console.log("SideBar.mode=", mode);
  console.log("SideBar.id=", id);

  BTN_HOME_CSS = MODE_NONE_ACTIVE_CSS;
  BTN_THREAD_CSS = MODE_NONE_ACTIVE_CSS;
  BTN_BOOKMARK_CSS = MODE_NONE_ACTIVE_CSS;

  if(mode === MODE_HOME){
    BTN_HOME_CSS = MODE_ACTIVE_CSS;
  }  
  if(mode === MODE_THREAD){
    BTN_THREAD_CSS = MODE_ACTIVE_CSS;
  }
  if(mode === MODE_BOOKMARK){
    BTN_BOOKMARK_CSS = MODE_ACTIVE_CSS;
  }  
  /* 
  const lightModeButton = document.querySelector('.side_bar_wrap .bg-blue-600');
  lightModeButton.addEventListener('click', () => {
    lightModeButton.classList.toggle('bg-blue-600');
    lightModeButton.classList.toggle('text-white');
    lightModeButton.classList.toggle('hover:bg-blue-700');
  });
  */
});

const logOut = function(): void
{
  //console.log("#logOut.key=" , LibConfig.COOKIE_KEY_USER)
  if (window.confirm("LogOut OK ?")) {
    LibCookie.deleteCookie(LibConfig.COOKIE_KEY_USER);
    location.href = "/#/login";
  }

}  
</script>

<!-- サイドバー  border-b -->
<aside class="side_bar_wrap bg-white w-64 flex flex-col border-r border-gray-200">
  <div class="p-4 border-gray-200">
    <a href="/">
      <div class="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span class="text-lg font-semibold">home</span>
      </div>
    </a>
  </div>
  <div class="p-4">
      <h2 class="text-xs text-gray-500 uppercase mb-2">Main Menu</h2>
      <nav>
          <a href={`/chatshow/${id}`} use:link 
          class={`flex items-center space-x-2 p-2 rounded-md ${BTN_HOME_CSS}`}>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Dashboard</span>
            </a>
          
          <a href={`/thread/${id}`} use:link 
          class={`flex items-center space-x-2 p-2 rounded-md ${BTN_THREAD_CSS}`}>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11h6m-3-3v6" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Thread</span>
          </a>
          <a href={`/bookmark/${id}`} use:link 
           class={`flex items-center space-x-2 p-2 rounded-md ${BTN_BOOKMARK_CSS}`}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11h6m-3-3v6" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>BookMark</span>
          </a>
    </nav>
  </div>
  <div class="p-4 mt-auto">
      <h2 class="text-xs text-gray-500 uppercase mb-2">Preferences</h2>
      <nav>
          <a href="#" class="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <span>Settings</span>
          </a>
      </nav>
      <!--  -->
      <div class="border-t border-gray-200 mt-4 mb-[40px] pt-4">
          <a on:click={() => {logOut()}}
            class="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v-3a5 5 0 00-5-5H6a1 1 0 00-1 1v14a1 1 0 001 1h3.5m8.356-1m-1.18-5.109a4.5 4.5 0 00-1.802-.586m1.18-5.109a4.5 4.5 0 011.801-.586m-3.369-1.443L9 5" />
              </svg>
              <span>Log Out</span>
          </a>
      </div>
  </div>
</aside>