// prevent default behaviour of form
const signupForm = document.getElementById("signupForm");
signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
});


document.getElementById("signupBtn").addEventListener("click", async () => {
  // get input values
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const passwordConfirmation = document.getElementById("passwordConfirmation").value;
  // check if email is valid and if passwords match
  const isValidEmail = emailIsValid(email);
  const pwMatch = passwordsMatch(password, passwordConfirmation);
  // if the preconditions aren't met, inform user by modifying placeholders of input fields
  if(!isValidEmail || !pwMatch) {
    if(!isValidEmail) {
      document.getElementById("email").value = "";
      document.getElementById("email").classList.add("redPlaceholder");
      document.getElementById("email").placeholder = "Invalid Email-Address";
    }
    if(!pwMatch) {
      document.getElementById("password").value = "";
      document.getElementById("password").classList.add("redPlaceholder");
      document.getElementById("password").placeholder = "Passwords don't match";
      document.getElementById("passwordConfirmation").value = "";
      document.getElementById("passwordConfirmation").classList.add("redPlaceholder");
      document.getElementById("passwordConfirmation").placeholder = "***";
    }
  } else {
    // send values to signup endpoint
    const response = await fetch("http://localhost:8080/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation
      })
    });
    const data = await response.json();
    evaluateResonse(data);
  }
});

//////////////////////////////
// implement helper functions
//////////////////////////////

function evaluateResonse(response) {
  console.log("response.success");
  console.log(response.success);
  console.log("response.message");
  console.log(response.message);
  console.log("response.emailExists");
  console.log(response.emailExists);
  console.log("response.emailIsValid");
  console.log(response.emailIsValid);
  console.log("response.passwordsMatch");
  console.log(response.passwordsMatch);

}

// check if email is valid
function emailIsValid(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
// check if the provided passwords match
function passwordsMatch(password, passwordConfirmation) {
  if(password === passwordConfirmation) {
    return true; 
  } else {
    return false;
  }
}




