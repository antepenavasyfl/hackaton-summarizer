<script>
   import { db } from '$lib/firebase'; 
   import { collection, addDoc } from 'firebase/firestore';
   // import { docStore } from 'sveltefire';
	import './global.css';
   import { Configuration, OpenAIApi } from "openai";
   export let data;
   const { config } = data;

   const configuration = new Configuration(config);
   const openai = new OpenAIApi(configuration);
   let systemMessage = "Create short and concise summary from this text: "
   let categories = '';
   let systemCategoriesExamples = "And now add suitable category/s. Follow this format: Summary: {summary} Label: {politics, sport, weather, etc}.";

   let value = '';
   let response;
   let summary = '';
   let generating = false;
   let prompt = '';
   let error = '';
   
   async function handleClick() {
      generating = true;
      try {
        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{role: "user", content: systemMessage + value + systemCategoriesExamples}],
        });
        response = completion.data.choices[0].message;
        categories = response.content.split("Label: ")[1].split(", ");
                  
        const labelIndex = response.content.indexOf("Label: ");
        summary = response.content.substring(0, labelIndex).replace("Summary: ", "");
        prompt = systemMessage + value + systemCategoriesExamples;
        value = '';
        generating = false;
        error = '';
      } catch (e) {
        if (e.response) {
          error = e.response.data.error;
          console.log(e.response.status);
          console.log(e.response.data.error);
        } else {
          error = e.message;
          console.log(e.message);
        }  
        generating = false;
        value = '';
      }      
   }

   function saveToDb() {     
      // Assuming you have the response stored in a variable called `response`
      const responseToSave = {
        prompt,
        summary,
        createdAt: Date.now(),
        categories,
      };
      
      // Save the response to Firestore
      const collectionRef = collection(db, 'short_summaries');
      addDoc(collectionRef, responseToSave)
        .then((docRef) => {
          console.log('Response saved to Firestore with ID:', docRef.id);
        })
        .catch((error) => {
          console.error('Error saving response:', error);
        });      
   }
</script>

<div class="container">
   <!-- <a href="/history">Saved articles</a> -->
   <h1 class="text-accent">Summarizer & Categorizer</h1>
   <p>Analyze and summarize long articles or any text you want!</p>
   
   <ul class="steps w-full">
     <li class="step step-primary">Type</li>
     <li class="step {value ? "step-primary" : ""}">Submit</li>
     <li class="step">Wait</li>
     <li class="step">Enjoy!</li>
   </ul>
   
   <textarea bind:value class="textarea textarea-bordered textarea-lg w-full max-w-xl" placeholder="Input here..."></textarea>
   
   <button on:click={handleClick} disabled={value.length >= 1 ? false : true} class="btn {generating === true ? "loading" : "btn-primary"}">
      {generating === true ? "Generating" : "Submit Prompt"}
   </button>
   
   <h3>RESULT:</h3>

   {#if error}
      <p class="text-orange-600">{error.code}</p>
   {:else if response}
      <p>{summary}</p>
   {:else}
      <p class="note">*Type your text or article in <code>`textarea`</code> to get short summary.</p>
   {/if}

   {#if categories?.length}
      <p class="categories bg-accent">
         Categories:
         {#each categories as category}
            <div class="badge badge-outline badge-{category}">{category}</div>
         {/each}
      </p>
   {/if}

   {#if response}
      Save response to database
      <button class="btn btn-secondary" on:click={saveToDb}>Save to DB</button>
   {/if}
   <div class="inspired-by">
     <i>Inspired by: </i>
     <a class="link link-primary" target=anysummary href="https://www.anysummary.app/?summary=334e3edb-5dad-4d6a-a401-c93cd5ca2251&activeTab=bulletPoints">Any Summary</a>
     <p class="p-1">Build with sveltekit and firebase. Using daisy-ui & tailwind utility framework. Summarized and categorized with Openai API</p>
   </div>
</div>

<style>
   h1 {
      font-size: 18px;
      text-transform: uppercase;
      font-weight: 700;
   }

   h1, h3 {
      margin: 20px 0;
   }

   ul {
      margin: 20px 0;
   }

   code {
    background: #dfdfdf;
    border-radius: 5px;
    padding: 2px;
   }

   h1, 
   h3,
   p,
   .btn {
      width: 100%;
      text-align: center;
   }

   .container {
      height: 100vh;
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
   }

   .categories {
     margin: 10px auto;
     border-radius: 5px;
     padding: 5px 0;
   }

   .textarea {
      margin-bottom: 20px;
   }

   .inspired-by {
      font-size: 12px;
      text-align: center;
      margin: 50px auto 0;
      width: 100%;
   }

   .note {
      color: #838383;
   }
</style>

