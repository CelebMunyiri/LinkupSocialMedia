"use strict";
const home = document.querySelector(".home");
const Home = document.querySelector(".Home");
const postDiv = document.querySelector(".PostingDiv");
const commentText = document.querySelector(".commentText");

home.addEventListener("click", () => {
  Home.style.display = "block";
  Explore.style.display = "none";
  messagePeople.style.display = "none";
  Messages.style.display = "none";
  Notification.style.display = "none";
  postDiv.style.display = "none";
  profileContent.style.display = "none";
});

const explore = document.querySelector(".explore");
const Explore = document.querySelector(".Explore");
explore.addEventListener("click", () => {
  Explore.style.display = "block";
  Home.style.display = "none";
  messagePeople.style.display = "none";
  Messages.style.display = "none";
  Notification.style.display = "none";
  postDiv.style.display = "none";
  profileContent.style.display = "none";
});

const notification = document.querySelector(".notification");
const Notification = document.querySelector(".Notification");

notification.addEventListener("click", () => {
  Notification.style.display = "block";
  Home.style.display = "none";
  Explore.style.display = "none";
  messagePeople.style.display = "none";
  Messages.style.display = "none";
  postDiv.style.display = "none";
  profileContent.style.display = "none";
});

const Messages = document.querySelector(".Messages");
const messagingBtn = document.querySelector(".messages");
const messagePeople = document.querySelector(".DisplayMessaging");
const messagingContainer = document.querySelectorAll(".messagePerson");

messagingBtn.addEventListener("click", () => {
  messagePeople.style.display = "block";
  Explore.style.display = "none";
  Home.style.display = "none";
  Notification.style.display = "none";
  Messages.style.display = "none";
  postDiv.style.display = "none";
  profileContent.style.display = "none";
});

messagingContainer.forEach((element) => {
  element.addEventListener("click", () => {
    Messages.style.display = "block";
    messagePeople.style.display = "none";
  });
});

const BacktoMessages = document.querySelector(".backMessages");

BacktoMessages.addEventListener("click", () => {
  messagePeople.style.display = "block";
  Explore.style.display = "none";
  Home.style.display = "none";
  Notification.style.display = "none";
  Messages.style.display = "none";
  postDiv.style.display = "none";
});

const backToHome = document.querySelectorAll(".backHome");

backToHome.forEach((btn) => {
  btn.addEventListener("click", () => {
    messagePeople.style.display = "none";
    Explore.style.display = "none";
    Home.style.display = "block";
    Notification.style.display = "none";
    Messages.style.display = "none";
    profileContent.style.display = "none";
    postDiv.style.display = "none";
  });
});

const PostingDiv = document.querySelector(".PostingDiv");
const closePost = document.querySelector(".closePost");

closePost.addEventListener("click", () => {
  PostingDiv.style.display = "none";
  Home.style.display = "block";
});

const postButton = document.querySelector(".post");

postButton.addEventListener("click", () => {
  PostingDiv.style.display = "block";
  messagePeople.style.display = "none";
  Explore.style.display = "none";
  Home.style.display = "none";
  Notification.style.display = "none";
  Messages.style.display = "none";
});

const profileButton = document.querySelectorAll(".profile");
const profileContent = document.querySelector(".profileContent");

profileButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    profileContent.style.display = "block";
    PostingDiv.style.display = "none";
    messagePeople.style.display = "none";
    Explore.style.display = "none";
    Home.style.display = "none";
    Notification.style.display = "none";
    Messages.style.display = "none";
    postDiv.style.display = "none";
  });
});

//posting implementation starts here
const postText = document.getElementById("post-text");
const postImage = document.getElementById("post-image");
const postVideo = document.getElementById("post-video");
const postForm = document.getElementById("post-form");
const postingButton = document.getElementById("post-button");

let imageToPost = "";

postImage.addEventListener("change", (event) => {
  const target = event.target;
  const files = target.files;
  if (files) {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "Notebook");
    formData.append("cloud_name", "dkgtf3hhj");

    fetch("https://api.cloudinary.com/v1_1/dkgtf3hhj/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => (imageToPost = res.url));
  }
});

let videoToPost = "";

postVideo.addEventListener("change", (event) => {
  const target = event.target;
  const files = target.files;
  if (files) {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "Notebook");
    formData.append("cloud_name", "dkgtf3hhj");

    fetch("https://api.cloudinary.com/v1_1/dkgtf3hhj/video/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        videoToPost = res.url;
        localStorage.setItem("videoUrl", videoToPost);
      });
  }
});

postForm.addEventListener("submit", (e) => {
  e.preventDefault();

  axios
    .post(
      "http://localhost:4600/postActions/createPost",

      {
        PostContent: postText.value,
        ImageUrl: imageToPost,
        VideoUrl: videoToPost,
        UserID: localStorage.getItem("UserID"),
      },

      {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          token: localStorage.getItem("tokenToUse"),
        },
      }
    )
    .then((response) => {
      console.log(response.data);

      location.reload();
    })
    .catch((e) => {
      console.log(e);
    });
});


//displaying the posts here
const postsArea = document.querySelector(".lower-posts");

postsArea.addEventListener("click", (e) => {
  e.preventDefault();
  
  if(e.target.classList.contains("commentText")){
    
    
  }
})

axios
  .get("http://localhost:4600/postActions/viewAllPosts", {
    headers: {
      token: localStorage.getItem("tokenToUse"),
    },
  })
  .then((response) => {
    //console.log(response.data);
    let Posts = response.data.result;

    let array1 = Posts[0];

    let array2 = Posts[1];

    const combinedArray = array1.map((item, index) => ({
      ...item,
      ...array2[index],
    }));
   // console.log(combinedArray);

    let html = "";
    combinedArray.forEach((post) => {
     
      const commentInputId = `commentInput-${post.PostID}`
      const commentIconId = `commentIcon-${post.PostID}`;
      const commentsContainerId = `commentsContainer-${post.PostID}`;

      html += `
     <div class="post-body">
     <div class="post-head">
         <img src=${post.Profile} alt="">
         <h6>${post.Username}</h6>
         <p>${post.Email}</p>
     </div>
     <div class="post-content">
         <div class="content-part">
             <p>${post.PostContent}</p>
             <img class="postImg" src=${post.ImageUrl} alt="">
         </div>
         <div class="reactionPart">
             <div class="reaction">
                 <iconify-icon id="${commentIconId}" onclick=comentView(${post.PostID,'${commentsContainerId}'}) class="commenti" icon="iconamoon:comment-light" style="color: black; cursor:pointer"></iconify-icon>
                 <p>34</p>
             </div>
             <div class="reaction">
                 <iconify-icon class="repost"  icon="system-uicons:retweet" style="color: black; "></iconify-icon>
                 <p>45</p>
             </div>
             <div class="reaction">
                 <iconify-icon class="like" onclick=likePost(${post.PostID}) icon="fluent-mdl2:like" style="color: black;"></iconify-icon>
                 <iconify-icon class="unlike"  icon="iconamoon:like-fill" style="color: blue;"></iconify-icon>
                 <p>${showLikes(post.PostID)}</p>
             </div>
         </div>
         <div class="commentSection" style="display:block">
             <input type="text" class="commentText" id="${commentInputId}" placeholder="comment here">
             <button type="submit" onclick=addComment(${post.PostID},'${commentInputId}')>send</button>
             </div>
             <div id="${commentsContainerId}" class="comments-container" style="display: none;">
             
     </div>
     </div>
     
     
 </div>
 
 </div>`;

//console.log(commentIconId)
      const postImg = document.querySelector(".postImg");
      //  if(postImg.src=null){
      //   postImg.style.display='none'
      //  }////
      postsArea.innerHTML = html;
    
 
    });
  })
  .catch((e) => {
   console.log(e);
  });
  

//like a post
const like = document.querySelector(".like");
function likePost(id) {
  axios
    .post(
      "http://localhost:4600/like/addlike",

      {
        PostID: id,
        UserID: localStorage.getItem("UserID"),
      },

      {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          token: localStorage.getItem("tokenToUse"),
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      console.log(id);
    })
    .catch((e) => {
      console.log(e);
    });
}
const unlike = document.querySelector(".unlike");

//show likes
function showLikes(iD) {
  axios
    .get(`http://localhost:4600/like/likesOfOne/${iD}`, {
      headers: {
        token: localStorage.getItem("tokenToUse"),
      },
    })
    .then((res) => {
      const noOfLikes = res.data.result.length;
    });
}
///
//const commentIcon = document.getElementById(commentIconId);
      function comentView(PostID,commentsContainerId){
       // const commentsContainer = document.getElementById(commentsContainerId);

alert('hello')

        // Toggle the display of comments
        if (commentsContainerId.style.display === 'none' || commentsContainerId.style.display === '') {
          commentsContainerId.style.display = 'block';
          // Fetch and display comments for this post
          fetchAndDisplayComments(PostID, commentsContainerId);
        } else {
          commentsContainerId.style.display = 'none';
        }
      };
//
function addComment(iD,commentInputId) {
  
  const commentedText=document.getElementById(commentInputId).value

  if(commentedText.trim() !==""){
  axios
    .post(
      "http://localhost:4600/commentActions/createComment",

      {
        PostID: iD,
        CommentText: commentedText,
        UserID: localStorage.getItem("UserID"),
      },

      {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          token: localStorage.getItem("tokenToUse"),
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      console.log(iD);
      
    // location.reload();
    })
    .catch((e) => {
      console.log(e);
    });
  } else{
    alert("Enter a valid comment")
  }
}

//
function fetchAndDisplayComments(postID, commentsContainer) {
  // Make a GET request to your comments API for this postID
  axios.get(`http://localhost:4600/commentActions/commentsOfOnes/${postID}`)
    .then((response) => {
      const comments = response.data.result;
console.log(comments)
      // Generate HTML for comments and add them to the comments container
      let commentsHTML = '';
      if(comments.length !==0){
      comments.forEach((comment) => {
        commentsHTML += `<div class="comment-item">${comment.CommentText}</div>`;
      });
      commentsContainer.innerHTML = commentsHTML;
    }
    })
    .catch((error) => {
      console.error(`Error fetching comments for post ${postID}:`, error);
    });
}





