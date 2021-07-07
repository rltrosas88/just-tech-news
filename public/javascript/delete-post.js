// 14.5.6 step SIX set up the button-click handler
async function deleteFormHandler(event) {
    event.preventDefault();
    // 14.5.6 step SEVEN 
        //capture the id of the post 
        //use fetch() to make a DELETE request to /api/posts/:id
            //if the request is successful, redirect the user using document.location.replace('/dashboard/')
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });
            
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}
            
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);