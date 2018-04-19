/*
 * Author: Bryce Brown
 * Date: April 18 2018
 */
function validate(e)
{



	// Ensure all error fields are hidden
		hideErrors();

	//Determine if the form has errors
	if(formHasErrors()){
		
		e.preventDefault();

		return false;
	}
	
		return true;	
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e)
{
	// Confirm that the user wants to reset the form.
	if ( confirm('Reset form?') )
	{
		// Ensure all error fields are hidden
		hideErrors();
		
		// Set focus to the first text field on the page
		document.getElementById("name").focus();
		
		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();
	
	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;	
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors()
{
	
	//assume the form has no errors
	var errorflag = false;

	//an array of textfield ids to check if the user has entered a value 
	var requiredTextFields = ["name", "phone", "email", "comments"];

	// loop through the texfields ids
	for(var i = 0; i < requiredTextFields.length; i++)
	{
			
		// determine if the textfield has input
		if((document.getElementById(requiredTextFields[i])).value == "" || (document.getElementById(requiredTextFields[i])).value == null)
		{
			// get the error object from the DOM for the appropriate textfield and make it visible 
			document.getElementById(requiredTextFields[i]+"_error").style.display = "block";
			
			// determine if this is the first error if so, set focus to the textfield
			if(!errorflag )
			{
				(document.getElementById(requiredTextFields[i])).focus();
				(document.getElementById(requiredTextFields[i])).select();
			}

			//raise the error flag indicating validation error
			errorflag  = true;
		} 	   

	}

	//Phone number validation
		var regexPhone = new RegExp(/[^\d]/g,'');

	// determine if the phone number is valid
	//!regexPhone.test(document.getElementById("phone").value) &&
	    if (!regexPhone.test(document.getElementById("email").value))
	    {
			    // get the error object from the DOM for the appropriate textfield and make it visible 
				document.getElementById("phoneformat_error").style.display = "block";
					
				// determine if this is the first error if so, set focus to the textfield
				if(!errorflag )
				{
					document.getElementById("phone").focus();
					document.getElementById("phone").select();
				}

			       errorflag = true;
	    }

	    //email validation
	    var regexEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

	    // determine if the email is valid
	    if (!regexEmail.test(document.getElementById("email").value))
	    {
		    // get the error object from the DOM for the appropriate textfield and make it visible 
			document.getElementById("emailformat_error").style.display = "block";
				
			// determine if this is the first error if so, set focus to the textfield
			if(!errorflag )
			{
				document.getElementById("email").focus();
				document.getElementById("email").select();
			}

		       errorflag = true;
	    }

	return errorflag ;

}

/*
 * Hides all of the error elements.
 */

	function hideErrors()
{
	var errorFields = document.getElementsByClassName("nameError error")
	console.log(errorFields);
	for(var i = 0; i < errorFields.length; i++)
	{
		errorFields[i].style.display = "none";
	}

	var errorFields = document.getElementsByClassName("contactsError error")

	for(var i = 0; i < errorFields.length; i++)
	{
		errorFields[i].style.display = "none";
	}

	var errorFields = document.getElementsByClassName("commentsError error")

	for(var i = 0; i < errorFields.length; i++)
	{
		errorFields[i].style.display = "none";
	}

}

/*
 * Handles the load event of the document.
 */
function load()
{


	hideErrors();

	//add event listener for the form submit
	document.getElementById("submit").addEventListener("click", validate, false);

	//add event listener for the form ckear
	document.getElementById("reset").addEventListener("click", resetForm, false);



}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load, false);
