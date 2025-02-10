<script lang="ts">
import Router from 'svelte-spa-router'
//
import Head from './components/Head.svelte'
import LibLayout from './client/lib/LibLayout';
  //
  const pages = import.meta.glob('./client/*.svelte', { eager: true })
  
  const routes = Object.keys(pages).map((path) => {
    const name = path.match(/\.\/client\/(.*)\.svelte$/)[1]
    let pathTmp = `/${name.toLowerCase()}`; 
    if(name === 'Home') { pathTmp ='/'};
    if(name === 'ChatShow') { pathTmp ='/chatshow/:id'};
    if(name === 'Thread') { pathTmp ='/thread/:id'};
    if(name === 'Bookmark') { pathTmp ='/bookmark/:id'};
    return {
      name,
      //path: name === 'Home' ? '/' : `/${name.toLowerCase()}`,
      path: pathTmp,
      component: pages[path].default,
    }
  })
  export let routeArray = {};
  routes.forEach((item, idx) => {
    //console.log(item)
    let path = item.path;
    let compo = item.component;
    routeArray[item.path] = compo;
  });
  //console.log(routeArray);
LibLayout.startProc();
</script>


<!-- -->
<main>
  <hr />
  <Router routes={routeArray} />
  <hr />
</main>

<style>
</style>
<!--
<nav>
{#each routes as item}
<div>
  <a href={`/#${item.path}`}>{item.name}</a>
</div>
{/each}	
</nav>
-->
  