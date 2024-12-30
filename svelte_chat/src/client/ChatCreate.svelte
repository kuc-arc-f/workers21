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
<div class="container mx-auto p-4">
	<a href={`/#/chats`} class="btn">Back
	</a>		
	<hr class="my-2" />
	<h1 class="text-3xl">Create</h1>
	<hr class="my-2" />
	<div class="col-sm-6">
		<label>Name:</label>
        <input type="text" name="name" id="name" class="input_text"
           />		
	</div>
	<button on:click={addPost} class="btn btn-primary my-2">Add</button>
	<hr />
</div>
