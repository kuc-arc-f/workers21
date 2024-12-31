<svelte:head>
	<title>Posts</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import CrudCreate from './chats/CrudCreate';

export let data;
console.log(data);

/**
 *
 * @param
 *
 * @return
 */ 
const addPost = async function () {
console.log("add");
	try{
		const result = await CrudCreate.addItem();
console.log(result); 
		if(result) {
			location.href= "/#/chats";
		}
	} catch (e) {
      console.error(e);
      alert("error, add");
    }
}
</script>

<!-- MarkUp -->
<div class="min-h-screen flex items-center justify-center bg-gray-100">
	<div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
		<a href={`/#/chats`} class="btn-outline-blue">Back
		</a>		
		<hr class="my-4" />
		<h1 class="text-3xl">Create</h1>
		<hr class="my-2" />
		<div class="col-sm-6">
			<label>Name:</label>
					<input type="text" name="name" id="name" class="input_text"
						 />		
		</div>
		<button on:click={addPost} 
		class="btn my-4">Add</button>
	
	</div>
</div>
<!--
-->