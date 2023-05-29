<script>
  import { onMount } from 'svelte';
  import { db } from '$lib/firebase'; 
  import { collection, getDocs } from 'firebase/firestore';

   // Reference to the "short_summaries" collection
   const shortSummariesCollectionRef = collection(db, 'short_summaries');

	onMount(async () => {
      // Retrieve all documents in the collection
    try {
      const querySnapshot = await getDocs(shortSummariesCollectionRef);
      querySnapshot.forEach((doc) => {
        // Process each document and add it to the shortSummaries array
        const data = doc.data();
        shortSummaries.push(data);
        console.log(data)
      });
    } catch (error) {
      console.error('Error fetching short summaries:', error);
    }
	});   
</script>

<div class="history">
<div class="overflow-x-auto">
  <table class="table w-full">
    <!-- head -->
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
      <!-- row 2 -->
      <tr class="hover">
        <th>2</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr>
      <!-- row 3 -->
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr>
    </tbody>
  </table>
</div>   
</div>