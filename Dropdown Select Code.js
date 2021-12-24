<div style="color:red">
<noscript>For full functionality of this page it is necessary to &amp;amp;amp;amp;amp;amp;amp;amp;amp;lt;a href="http://www.enable-javascript.com/"enable&amp;amp;amp;amp;amp;amp;amp;amp;amp;gt; JavaScript.&amp;amp;amp;amp;amp;amp;amp;amp;amp;lt;/a&amp;amp;amp;amp;amp;amp;amp;amp;amp;gt;</noscript>
</div>

<script>
/*
Date Modified: 11/29/2021
Modified Notes: Strips down Robert Wynter's example code to be much simpler (using fewer fields) 
Author: Michael Kolodner, based on work by Robert Wynter
The purpose of this script is to Prefill a dropdown on your form using the Salesforce Prefill Connector 
to get the values using a repeatable section.

Set the values in lines 37, 39, and 41 for the fields you are working with in your form (in format tfa_XXXX)

On line 55 is the message used when the field has been taken over. 
In this example it's set to "This field has been taken over!" so make it clear what is happening. 
You probably want to use "Please select..." so it looks like other FormAssembly picklists.

The example below, on Windows Load and Select change,
1. clears the dropdown list
2. Uses the connector to grab the Repeater section of selected fields based on a list in a repeating section
3. Loop through the Repeaters and get the REPLACEVALUESFIELD values and put them in an array
4. Add the Array values into the dropdown (TARGETFIELD)

Date Modified: 12/22/2021
Modified Notes: Modified by Ben Swift to use template literals instead of setting field ids multiple times. Added functionality
to pass a different value from the repeater than the label displayed in the dropdown

*/
 </script>
<script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>

<script>

	//####SET FIELD IDS HERE####
	//dropdown field
	let theDropDown = 'tfa_4';//SET THE ID FOR THE DROPDOWN FIELD
	//repeater label
	let theLabel = 'tfa_3';//SET THE ID FOR THE FIELD IN THE REPEATER CONTAINING THE LABEL TO DISPLAY IN THE DROPDOWN (I.E. ACCOUNT NAME)
	//repeater value
	let theValue = 'tfa_7';//SET THE ID FOR THE FIELD IN THE REPEATER CONTAINING THE VALUE TO PASS IN TO SALESFORCE (I.E. ACCOUNT ID)


	// ##########
	// #FORM LOAD
	// ##########

	// On Load for the page
	$(window).load(function() {
		//alert("window load occurred!");
		//Clear dropdown options
		document.getElementById(theDropDown).options.length=0;
		// Add the select option message (Can be anything you want wrapped in double quotes)
		var option = document.createElement("option");
		option.text = "This field has been taken over!";
		option.value = "";//set top value to null so setting required can work
		document.getElementById(theDropDown).add(option);//Dropdown field
	 
	  
		//Loop through repeater and get all the values for field and Add them to an Array
				
		// Gets all the fields from the form, including the hidden fields
		//Dropdown fields
		var dropdownAccount = document.getElementById(theDropDown);//Dropdown field to be updated
				
		// Text Repeater field
		var eventDisplay4Arr = [];// Array for storing all the dropdown names 
		var eventDisplay4Arr = document.querySelectorAll(`[id^=${theLabel}]`); // Example: all the account names from repeating section
		
		var eventStore4Arr = [];// Array for storing all the dropdown values 
		var eventStore4Arr = document.querySelectorAll(`[id^=${theValue}]`); // Example: all the account Ids from repeating section
					  
		var textToWrite; // temp variable for writing to arrays
		var valueToStore; //temp variable for storing value

		//For all contents of the eventDisplay4 array (from repeater - theLabel) ..
		for(var i in eventDisplay4Arr){
					
			//assign current iterations value to var.
			textToWrite = eventDisplay4Arr[i].value;
			valueToStore = eventStore4Arr[i].value;
					
			//if it contains a value ...
			if (textToWrite) {
				//add the eventDisplay4 value to the selection 'main' dropdown
				addToDropdown(textToWrite,valueToStore); //This adds the text to the dropdown box and sets the value...
																			
				if (textToWrite == "" || textToWrite == null) {
					alert("EventDisplay4 TextToWrite BLANK - please contact administrator.");
					textToWrite = "No eventDisplay4 Available."; // Stores the value in the array
				}
				eventDisplay4Arr[i] = textToWrite; //assign textToWrite value to corresponding index of EventDisplay4 array
				// if the contents were blank, it would push 'No eventDisplay4 Available.'
			}
		}  //end of eventDisplay4 for loop
	   
	   /////////////////////////////////////////////////////////////////////////////////////
	   /////////////////////////////////////////////////////////////////////////////////////
	  //----------------------------------
	  
		// Function to add to the dropdown
		function addToDropdown(text,storedValue) {
			var x = document.getElementById(theDropDown);//Dropdown field you are replacing values in
			var option = document.createElement("option");
			option.text = text;
			option.value = storedValue;
			x.add(option);
		}
	  
		//-------------------------------------
		  
		//Add the selected dropdown value into fields on select change
		$(document).ready(function() {

			//the id here should be for the FIELD on the form
			//this line is listening for a change to the field in order to execute the code
			$(`#${theLabel}`).change(function(){
			
				var index = $(`#${theLabel} option:selected`).index()-1;
				//alert('Selected Index is: ' + index);

				var indexLength =$(`#${theLabel} option`).length;

		
				var CountIndex = $(`#${theDropDown}`)[0].selectedIndex;
			
	   
			});//Close tfa_XX-Change-function	
			
			return;
		});//Close Document-ready-function  

	});//Close- Load windows Function

</script>
