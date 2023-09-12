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

let imageToPost = '';

postImage.addEventListener('change', (event)=>{
        
  const target = event.target
  const files = target.files
  console.log(files)
  if(files){
      const formData = new FormData()
      formData.append("file", files[0])
      formData.append("upload_preset", "Linkup")
      formData.append("cloud_name", "dhbfxndxb")

      fetch('https://api.cloudinary.com/v1_1/dhbfxndxb/image/upload', {
          method: "POST",
          body: formData
      }).then((res) => res.json()).then(res => imageToPost = res.url)
  }
})


let videoToPost = "";

postVideo.addEventListener("change", (event) => {
  const target = event.target;
  const files = target.files;
  if (files) {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "Linkup");
    formData.append("cloud_name", "dhbfxndxb");

    fetch("https://api.cloudinary.com/v1_1/dhbfxndxb/video/upload", {
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
console.log(imageToPost)
postForm.addEventListener("submit", (e) => {
  e.preventDefault();

  axios
    .post(
      "http://localhost:4600/postActions/createPost",

      {
        PostContent: postText.value,
        ImageUrl: imageToPost,
        VideoUrl:videoToPost,
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

const postsDisplayer=document.querySelector('.postDisplayer')




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
      const likesCountElement = `likesCount-${post.PostID}`;
      const commentCount=`commentCount-${post.PostID}`
      const postImg=`img-${post.PostID}`
     showLikes(post.PostID)
     ShowCommentsNumber(post.PostID)
     

      html += `
     <div class="post-body">
     <div class="post-head">
         <img src=${post.Profile} alt="">
         <h4>${post.Username}</h4>
         <p class="mail">${post.Email}</p>
     </div>
     <div class="post-content">
         <div class="content-part">
             <p>${post.PostContent}</p>
             <img id="${postImg}" src=${post.ImageUrl} alt="">
         </div>
         <div class="reactionPart">
             <div class="reaction">
                 <iconify-icon id="${commentIconId}" onclick=fetchAndDisplayComments(${post.PostID},'${commentsContainerId}') class="commenti" icon="iconamoon:comment-light" style="color: black; cursor:pointer"></iconify-icon>
                 <p id="${commentCount}"></p>
             </div>
             <div class="reaction">

             </div>
             <div class="reaction">
                 <iconify-icon class="like" onclick=likePost(${post.PostID}) icon="fluent-mdl2:like" style="color: black;"></iconify-icon>
                 <iconify-icon class="unlike"  icon="iconamoon:like-fill" style="color: blue;"></iconify-icon>
                 <p id="${likesCountElement}"></p>
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


      const postImage = document.getElementById(postImg);
      // if(!post.ImageUrl){
      //   postImage.style.display='none'
      // }
 
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
      const likesCountElement = document.getElementById(`likesCount-${iD}`);
      if (likesCountElement) {
          likesCountElement.textContent = noOfLikes;
      }
    });
}


//function for adding comment
     
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
      commentedText=''
      location.reload()
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
  
  
  axios.get(`http://localhost:4600/commentActions/commentsOfOne/${postID}`)
    .then((response) => {
      const comments = response.data.result[0];
      
      let commentsContainered=document.getElementById(`${commentsContainer}`)
      if(commentsContainered.style.display==='none'){
        commentsContainered.style.display='block'
        let commentsHTML = '';
      
        comments.forEach((comment) => {
          const subCommentId=`subCommentDiv-${comment.CommentID}`
          const subCommentValue=`SubCommentValue-${comment.CommentID}`
          
          commentsHTML += `
          <div class="comentBody">
          <div class="comentHead">
          <img src=${comment.UserProfile} alt="">
          <h4>${comment.Username}</h4>
          <p class="mail">${comment.Email}</p>
          </div>
          <p>${comment.CommentText}</p>
          <iconify-icon onclick=displaySubComments(${comment.CommentID},'${subCommentId}') icon="iconamoon:comment-light" style="color: black;"></iconify-icon>
          <input type="text" id="${subCommentValue}" class="subComment" placeholder=" add subcomment here">
          <button type="submit" onclick=addSubComment(${comment.CommentID},'${subCommentValue}')>send</button>
          <div id="${subCommentId}" class="SubComments"></div>
          </div> `;
          
          commentsContainered.innerHTML = commentsHTML;
        })
      } else{
        commentsContainered.style.display='none'
      }
    
    
    })
    
}

//show number of comments
function ShowCommentsNumber(postID){
axios.get(`http://localhost:4600/commentActions/commentsOfOne/${postID}`)
.then((response) => {
  const comments = response.data.result[0];
  //console.log(comments.length)
  const commentCount = document.getElementById(`commentCount-${postID}`)
  if(commentCount){
    commentCount.textContent=comments.length
  }
  
console.log(comments)
})
}
//handle follow and unfollow
const showUser=document.querySelector('.showUsers')
const followersArea=document.querySelector('.postDisplayer')

followersArea.addEventListener('click',()=>{
  
})

showUser.addEventListener('click',()=>{
  postsArea.innerHTML=''

  axios.get(`http://localhost:4600/user/allUsers`,
  ).then((res)=>{
    const users=res.data.result[0]
    
    let userHtml=''
    users.forEach((user)=>{
      let followID=`follow-${user.UserID}`
      let unfollowID=`unfollow-${user.UserID}`
      
userHtml+=`
<img src=${user.userProfile} alt="">
<h4>${user.Username}</h4>
<button id='${followID}'>follow</button>
<button id='${unfollowID}' style="display:none">unfollow</button>`
postsArea.innerHTML=userHtml

    })
  })
  
})
//handle following a user
function followUser(followeeId,unfollowId,followId){
const unfollowBtn=document.getElementById(unfollowId)
followId=document.getElementById(followId)
unfollowBtn.style.display='block'

  axios
  .post(
    "http://localhost:4600/followActions/follow",

    {
      UserID:localStorage.getItem('UserID'),
      FollowerUserID:followeeId
  },

    {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
    }
  )
  .then((response) => {
    console.log(response.data);
  
  })
  .catch((e) => {
    console.log(e);
  });

}

//adding subComments
function addSubComment(comentId,subCommentValue){
  const subCommentContent=document.getElementById(subCommentValue).value
  axios
    .post(
      "http://localhost:4600/subComment/addSubComment",

      {
        CommentID: comentId,
        UserID: localStorage.getItem('UserID'),
        SubCommentContent: subCommentContent,
      },

      {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
      }
    )
    .then((response) => {
     // console.log(response.data);
     window.location.reload()
    
    })
    .catch((e) => {
      console.log(e);
    });

}

//Display Subcomments
function displaySubComments(commentId,subCommentId){

axios.get(`http://localhost:4600/subComment/viewAllSubComments/${commentId}`)
.then((response) => {
  const comments = response.data.result[0];
  
  
  let subCommentContainer=document.getElementById(subCommentId)
  if(subCommentContainer.style.display==='none'){
    subCommentContainer.style.display='block'
    let SubcommentsHTML = '';
  
    comments.forEach((comment) => {
     
      
      SubcommentsHTML += `
      <div class="comentBody">
      <div class="comentHead">
      <img src=${comment.SubCommentProfileImage} alt="">
      <h4>${comment.SubCommentUsername}</h4>
      <p class="mail">${comment.SubCommentEmail}</p>
      </div>
      <p>${comment.SubCommentContent}</p>
    
      </div> `;
      
      subCommentContainer.innerHTML = SubcommentsHTML;
    })
  } else{
    subCommentContainer.style.display='none'
  }

})

}
//get user details after login
const Username=document.querySelector('.Username')
const UserProfileImg=document.querySelector('.UserProfile')
const UserEmail=document.querySelector('.UserEmail')

UserEmail.textContent=localStorage.getItem('Email')
Username.textContent=localStorage.getItem('Username')
UserProfileImg.src=localStorage.getItem('UserProfile')




