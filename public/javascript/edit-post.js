//14.5.6 step EIGHT set up the form submit handler
async function editFormHandler(event) {
    event.preventDefault();
    //14.5.6 setp NINE
        //capture the id of the post and the value of the post-title form element
            //the id will be included in the URL of the PUT request
            //the title will need to part of the body
            //the body will need to be stringified
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
          
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}
          
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);