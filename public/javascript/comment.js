// 14.3.5 step ONE decalre the post id from the URL and the value of the <textarea> element
async function commentFormHandler(event) {
    event.preventDefault();
  
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
  
    //console.log(comment_text, post_id);
    //14.3.5 step TWO replace the console.log statement
    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
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
}
  
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);