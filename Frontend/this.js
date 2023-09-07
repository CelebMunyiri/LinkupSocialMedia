const postsArea = document.querySelector('.lower-posts');

axios
  .get("http://localhost:4600/postActions/viewAllPosts", {
    headers: {
      "token": localStorage.getItem('tokenToUse')
    },
  })
  .then((response) => {
    const Posts = response.data.result;
    let html = '';

    Posts.forEach((post) => {
      // Replace 'post_id' and 'user_id' with actual post and user IDs
      const postID = post.PostID;
      const userID = localStorage.getItem('userID'); // Get the user's ID from localStorage

      // Handle likes
      const handleLike = () => {
        // Make a POST request to your like API
        axios.post("http://localhost:4600/like", {
          UserID: userID,
          PostID: postID,
        })
          .then((response) => {
            // Handle the like action (e.g., update the UI)
            console.log(`Post ${postID} liked.`);
          })
          .catch((error) => {
            console.error(`Error liking post ${postID}:`, error);
          });
      };

      // Handle comments
      const handleComment = () => {
        // Replace 'comment_text' with the actual comment text
        const commentText = prompt("Enter your comment:");
        if (commentText) {
          // Make a POST request to your comment API
          axios.post("http://localhost:4600/comment", {
            UserID: userID,
            PostID: postID,
            CommentText: commentText,
          })
            .then((response) => {
              // Handle the comment action (e.g., update the UI)
              console.log(`Comment posted on post ${postID}.`);
            })
            .catch((error) => {
              console.error(`Error posting comment on post ${postID}:`, error);
            });
        }
      };

      html += `
        <!-- ... (your existing HTML) ... -->
        <div class="reaction">
          <iconify-icon class="like" icon="fluent-mdl2:like" style="color: black; cursor: pointer;"></iconify-icon>
          <iconify-icon class="unlike" icon="iconamoon:like-fill" style="color: blue;"></iconify-icon>
          <p>${post.Likes}</p>
        </div>
        <div class="reaction">
          <iconify-icon class="comment" icon="iconamoon:comment-light" style="color: black; cursor: pointer;"></iconify-icon>
          <p>${post.Comments}</p>
        </div>
        <!-- ... (your existing HTML) ... -->
      `;

      // Add event listeners to the like and comment buttons
      const postElement = document.createElement('div');
      postElement.className = 'post-body';
      postElement.innerHTML = html;
      postsArea.appendChild(postElement);

      const likeButton = postElement.querySelector('.like');
      const commentButton = postElement.querySelector('.comment');

      likeButton.addEventListener('click', handleLike);
      commentButton.addEventListener('click', handleComment);
    });
  })
  .catch((e) => {
    console.log(e);
  });

