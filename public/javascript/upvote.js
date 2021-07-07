// 14.3.4 step TWO set up the button click
async function upvoteClickHandler(event) {
    event.preventDefault();
  
    //console.log('button clicked');
    //14.3.4 step THREE
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    
    //console.log(id);
    //14.3.4 step FOUR replace the console.log statement
    const response = await fetch('/api/posts/upvote', {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}
    
document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);