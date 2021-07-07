//14.2.4 step SIX create a login request
async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
  
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

// 14.2.4 step TWO listen for the submit event
// 14.2.4 step FOUR add async to the function and await keyword befor the promise
    //async/await acts as "syntactic sugar" for code and helps make Promises more readable
async function signupFormHandler(event) {
    event.preventDefault();
  
    // 14.2.4 step THREE POST the username, email, and password from the form to the server and
        //fetch POST request to the /api/users/
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
      
    if (username && email && password) {
        //14.2.4 step FOUR assign the result of the promis to a variable
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        //.then((response) => 
        //console.log(response);

        // 14.2.4 step FIVE check the response status
        if (response.ok) {
            // 14.5.3 step SIX automatically redirect users to the dashboard after they successfully log in by
                //changin the document.location.replace('/') to document.location.replace('/dashboard')
            document.location.replace('/dashboard');
            //console.log('success');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

