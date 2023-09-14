"use strict";
const home = document.querySelector(".home");
const Home = document.querySelector(".Home");
const postDiv = document.querySelector(".PostingDiv");
const commentText = document.querySelector(".commentText");
const WatchArea=document.querySelector('.Watch')

home.addEventListener("click", () => {
  home.style.color='black'
  Home.style.display = "block";
  Explore.style.display = "none";
  messagePeople.style.display = "none";
  Messages.style.display = "none";
  Notification.style.display = "none";
  postDiv.style.display = "none";
  profileContent.style.display = "none";
  WatchArea.style.display='none'
});

const explore = document.querySelector(".explore");
const Explore = document.querySelector(".Explore");
explore.addEventListener("click", () => {
  home.style.color='black'
  Explore.style.display = "block";
  Home.style.display = "none";
  messagePeople.style.display = "none";
  Messages.style.display = "none";
  Notification.style.display = "none";
  postDiv.style.display = "none";
  profileContent.style.display = "none";
  WatchArea.style.display='none'
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
  WatchArea.style.display='none'
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
  WatchArea.style.display='none'
});

messagingContainer.forEach((element) => {
  element.addEventListener("click", () => {
    Messages.style.display = "block";
    messagePeople.style.display = "none";
    WatchArea.style.display='none'
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
  WatchArea.style.display='none'
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
    WatchArea.style.display='none'
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
  WatchArea.style.display='none'
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
    WatchArea.style.display='none'
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
  console.log(files);
  if (files) {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "Linkup");
    formData.append("cloud_name", "dhbfxndxb");

    fetch("https://api.cloudinary.com/v1_1/dhbfxndxb/image/upload", {
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
    formData.append("upload_preset", "Linkup");
    formData.append("cloud_name", "dhbfxndxb");

    fetch("https://api.cloudinary.com/v1_1/dhbfxndxb/video/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => ( videoToPost = res.url ));
  }
});
//console.log(imageToPost);
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
postsArea.innerHTML = "";
Notification.style.display = "none";
WatchArea.style.display='none'
const postsDisplayer = document.querySelector(".postDisplayer");

axios
  .get("http://localhost:4600/postActions/viewAllPosts", {
    headers: {
      token: localStorage.getItem("tokenToUse"),
    },
  })
  .then((response) => {
    console.log(response.data);
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
      const commentInputId = `commentInput-${post.PostID}`;
      const commentIconId = `commentIcon-${post.PostID}`;
      const commentsContainerId = `commentsContainer-${post.PostID}`;
      const pID = `likesCount-${post.PostID}`;
      const commentCount = `commentCount-${post.PostID}`;
      const postImg = `img-${post.PostID}`;
      const likeID = `like-${post.PostID}`;
      const unlikeID = `unlike-${post.PostID}`;
      showLikes(post.PostID, `${pID}`);
      ShowCommentsNumber(post.PostID);
      hideEmptyImage(`${postImg}`);
let dayFromCreation=(`${post.CreatedAt}`).split("T")
dayFromCreation=dayFromCreation[0]     // console.log(post.ImageUrl);

      html += `
     <div class="post-body">
     <div class="post-head">
         <img src=${post.Profile} alt="">
         <h4>${post.Username}</h4>
         <p class="mail">${post.Email}   <span>${dayFromCreation}</span></p>
     </div>
     <div class="post-content">
         <div class="content-part">
             <p>${post.PostContent}</p>`


             html += (post.ImageUrl !== null ? `<img id="${postImg}" src=${post.ImageUrl} alt="">` : `<p style="padding:20px; font-size:30px; font-weight:bold;display:none">${post.PostContent[0]}</p>` ) 
         
         html += `</div>
         <div class="reactionPart">
             <div class="reaction">
                 <iconify-icon id="${commentIconId}" onclick=fetchAndDisplayComments(${post.PostID},'${commentsContainerId}') class="commenti" icon="iconamoon:comment-light" style="color: black; cursor:pointer"></iconify-icon>
                 <p id="${commentCount}"></p>
             </div>
             <div class="reaction">

             </div>
             <div class="reaction">
                 <iconify-icon class="like" id="${likeID}" onclick=likePost(${post.PostID},"${unlikeID}","${likeID}",${post.UserID}) icon="fluent-mdl2:like" style="color: black;"></iconify-icon>
                 <iconify-icon class="unlike" id="${unlikeID}" onclick=unlikePost(${post.PostID},"${unlikeID}","${likeID}") icon="iconamoon:like-fill" style="color: blue;"></iconify-icon>
                 <p id="${pID}"></p>
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

      postsArea.innerHTML = html;
    });
  })
  .catch((e) => {
    console.log(e);
  });
//hide empty images for posts with empty images
function hideEmptyImage(imageId) {
  const checkimage = document.getElementById(`${imageId}`);



  if (checkimage == null || checkimage == "") {
  
  } else {
    checkimage.style.display = "block";
  }
}

//like a post
const like = document.querySelector(".like");
function likePost(id, unlikeId, likeId, ID) {
  const unlikeBtn = document.getElementById(unlikeId);
  unlikeBtn.style.display = "block";
  const likeBtn = document.getElementById(likeId);
  likeBtn.style.display = "none";
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
      //console.log(id);
      likeNotification(ID);
    })
    .catch((e) => {
      console.log(e);
    });
}

//unlike a post
function unlikePost(id, unlikeId, likeId) {
  const unlikeBtn = document.getElementById(unlikeId);
  unlikeBtn.style.display = "none";
  const likeBtn = document.getElementById(likeId);
  likeBtn.style.display = "block";
  axios
    .delete(
      `http://localhost:4600/like/unlike/${id}`,

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
      //console.log(id);
    })
    .catch((e) => {
      console.log(e);
    });
}
const unlike = document.querySelector(".unlike");

//show likes
function showLikes(iD, pID) {
  axios
    .get(`http://localhost:4600/like/likesOfOne/${iD}`, {
      headers: {
        token: localStorage.getItem("tokenToUse"),
      },
    })
    .then((res) => {
      const noOfLikes = res.data.result.length;

      const paragraphId = document.getElementById(pID);
      if (paragraphId) {
        paragraphId.textContent = noOfLikes;
      }
    });
}

//function for adding comment

function addComment(iD, commentInputId) {
  const commentedText = document.getElementById(commentInputId).value;

  if (commentedText.trim() !== "") {
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
        commentedText = "";
        location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    alert("Enter a valid comment");
  }
}

//
function fetchAndDisplayComments(postID, commentsContainer) {
  axios
    .get(`http://localhost:4600/commentActions/commentsOfOne/${postID}`)
    .then((response) => {
      const comments = response.data.result[0];

      let commentsContainered = document.getElementById(`${commentsContainer}`);
      if (commentsContainered.style.display === "none") {
        commentsContainered.style.display = "block";
        let commentsHTML = "";

        comments.forEach((comment) => {
          const subCommentId = `subCommentDiv-${comment.CommentID}`;
          const subCommentValue = `SubCommentValue-${comment.CommentID}`;

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
        });
      } else {
        commentsContainered.style.display = "none";
      }
    });
}

//show number of comments
function ShowCommentsNumber(postID) {
  axios
    .get(`http://localhost:4600/commentActions/commentsOfOne/${postID}`)
    .then((response) => {
      const comments = response.data.result[0];
      //console.log(comments.length)
      const commentCount = document.getElementById(`commentCount-${postID}`);
      if (commentCount) {
        commentCount.textContent = comments.length;
      }

      //console.log(comments)
    });
}
//handle follow and unfollow
const showUser = document.querySelector(".showUsers");
const followersArea = document.querySelector(".postDisplayer");

followersArea.addEventListener("click", () => {
  window.location.reload();
});

showUser.addEventListener("click", () => {
  postsArea.innerHTML = "";

  axios.get(`http://localhost:4600/user/allUsers`).then((res) => {
    const users = res.data.result[0];

    let userHtml = "";
    users.forEach((user) => {
      let followID = `follow-${user.UserID}`;
      let unfollowID = `unfollow-${user.UserID}`;

      userHtml += `
<div class="users">
<img src=${user.UserProfile} alt="">
<h4>${user.Username}</h4>
<button class="chat-button" onclick="initiateChat(${user.UserID})">Chat</button>
<button id='${followID}' onclick=followUser(${user.UserID},'${unfollowID}','${followID}',${user.UserID})>follow</button>
<button id='${unfollowID}' style="display:none" onclick=unfollowUser(${user.UserID},'${unfollowID}','${followID}')>unfollow</button>
</div>`;
      postsArea.innerHTML = userHtml;
    });
  });
});
//handle following a user
function followUser(followeeId, stopfollowBtnId, followBtnId, userId) {
  const unfollowBtn = document.getElementById(stopfollowBtnId);
  const followBtn = document.getElementById(followBtnId);
  followBtn.style.display = "none";
  unfollowBtn.style.display = "block";

  axios
    .post(
      "http://localhost:4600/followActions/follow",

      {
        UserID: localStorage.getItem("UserID"),
        FollowerUserID: `${followeeId}`,
      },

      {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      followNotification(userId);
    })
    .catch((e) => {
      console.log(e);
    });
}

//unfollow a user
function unfollowUser(followeeId, stopfollowBtnId, followBtnId) {
  const unfollowBtn = document.getElementById(stopfollowBtnId);
  const followBtn = document.getElementById(followBtnId);
  followBtn.style.display = "block";
  unfollowBtn.style.display = "none";

  axios
    .post(
      "http://localhost:4600/followActions/unfollow",

      {
        UserID: localStorage.getItem("UserID"),
        FollowerUserID: `${followeeId}`,
      },

      {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
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
function addSubComment(comentId, subCommentValue) {
  const subCommentContent = document.getElementById(subCommentValue).value;
  axios
    .post(
      "http://localhost:4600/subComment/addSubComment",

      {
        CommentID: comentId,
        UserID: localStorage.getItem("UserID"),
        SubCommentContent: subCommentContent,
      },

      {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      }
    )
    .then((response) => {
      // console.log(response.data);
      window.location.reload();
    })
    .catch((e) => {
      console.log(e);
    });
}

//Display Subcomments
function displaySubComments(commentId, subCommentId) {
  axios
    .get(`http://localhost:4600/subComment/viewAllSubComments/${commentId}`)
    .then((response) => {
      const comments = response.data.result[0];

      let subCommentContainer = document.getElementById(subCommentId);
      if (subCommentContainer.style.display === "none") {
        subCommentContainer.style.display = "block";
        let SubcommentsHTML = "";

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
        });
      } else {
        subCommentContainer.style.display = "none";
      }
    });
}
//get user details after login
const Username = document.querySelector(".Username");
const UserProfileImg = document.querySelector(".UserProfile");
const UserEmail = document.querySelector(".UserEmail");

UserEmail.textContent = localStorage.getItem("Email");
Username.textContent = localStorage.getItem("Username");
UserProfileImg.src = localStorage.getItem("UserProfile");

//send notification functions
function followNotification(userId) {
  axios
    .post(
      "http://localhost:4600/notification/send",

      {
        UserID: userId,
        SenderID: localStorage.getItem("UserID"),
        NotificationText: `${localStorage.getItem(
          "Username"
        )}started Following You!`,
      },

      {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
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

//like post notification
function likeNotification(userId) {
  axios
    .post(
      "http://localhost:4600/notification/send",

      {
        UserID: userId,
        SenderID: localStorage.getItem("UserID"),
        NotificationText: `${localStorage.getItem(
          "Username"
        )} started Following You!`,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
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

///Displaying Notifications
axios
  .get(
    `http://localhost:4600/notification/get/${localStorage.getItem("UserID")}`,
    {
      headers: {
        token: localStorage.getItem("tokenToUse"),
      },
    }
  )
  .then((res) => {
    //console.log(res.data.result[0]);
    let notifications = res.data.result[0];
    let html = "";
    notifications.forEach((notification) => {
      html += `
        <img class="notImg" src=${notification.UserProfile} alt="">
        <p>${notification.NotificationText}</p>`;
      Notification.innerHTML = html;
    });
  });

  //watching area
  const watchBtn=document.querySelector('.watch')
 

  watchBtn.addEventListener('click',()=>{
    messagePeople.style.display = "none";
    Explore.style.display = "none";
    Home.style.display = "none";
    Notification.style.display = "none";
    Messages.style.display = "none";
    profileContent.style.display = "none";
    postDiv.style.display = "none";
    WatchArea.style.display='block'
//display videos
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
      const commentInputId = `commentInput-${post.PostID}`;
      const commentIconId = `commentIcon-${post.PostID}`;
      const commentsContainerId = `commentsContainer-${post.PostID}`;
      const pID = `likesCount-${post.PostID}`;
      const commentCount = `commentCount-${post.PostID}`;
      const postImg = `vid-${post.PostID}`;
      const likeID = `like-${post.PostID}`;
      const unlikeID = `unlike-${post.PostID}`;
      showLikes(post.PostID, `${pID}`);
      ShowCommentsNumber(post.PostID);
      hideEmptyImage(`${postImg}`);


      html += `
     <div>
     
     <video class="video-container" controls>
     <source
       src=${post.VideoUrl}
       type="video/mp4"
     />
     type="video/mp4"  />
   </video>
   <button class="switch-btn">
   <span class="play hidden">play</span> <span class="pause">pause</span>
   <span class="switch"></span>
 </button>
      
 </div>`;

    //WatchArea.innerHTML = html;
    });
  })
  .catch((e) => {
    console.log(e);
  });
  const btn = document.querySelector(".switch-btn");
const video = document.querySelector(".video-container");
const play = document.querySelector(".play");
const pause = document.querySelector(".pause");


btn.addEventListener("click", function () {
  if (!btn.classList.contains("slide")) {
    btn.classList.add("slide");
    video.pause();
    play.classList.add("hidden");
    pause.classList.remove("hidden");
  } else {
    btn.classList.remove("slide");
    video.play();
    pause.classList.add("hidden");

    play.classList.remove("hidden");
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Space") video.play;
  else if (e.key === "Enter") {
    video.pause;
  }
});
  })
  //displaying the update form
  const editButton=document.querySelector('.editProfile')

  

  //working on user profile
  let userBackgroundImg=document.querySelector('.UserBackgroundImage')
  let img=document.querySelector('.img')
  let userBio=document.querySelector('.userBio')

  

  const updateProfile=document.querySelector('.updateProfile')
  const UserBio=document.querySelector('.UserBio')
  const profilePicture=document.querySelector('.profilePicture')
  const backgroundImage=document.querySelector('.backgroundImage')
//display form update
editButton.addEventListener('click',()=>{
    updateProfile.style.display='block'
    console.log('helooo')
})
//hide form update
window.addEventListener('click',()=>{
 // updateProfile.style.display='none'
})

  
let profile=''
let BackgroundPic=''
  profilePicture.addEventListener("change", (event) => {
    const target = event.target;
    const files = target.files;
    console.log(files);
    if (files) {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", "Linkup");
      formData.append("cloud_name", "dhbfxndxb");
  
      fetch("https://api.cloudinary.com/v1_1/dhbfxndxb/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => (profile = res.url));
    }
  })

  backgroundImage.addEventListener("change", (event) => {
    const target = event.target;
    const files = target.files;
    console.log(files);
    if (files) {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", "Linkup");
      formData.append("cloud_name", "dhbfxndxb");
  
      fetch("https://api.cloudinary.com/v1_1/dhbfxndxb/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => (BackgroundPic = res.url));
    }
  })

  updateProfile.addEventListener('submit',(e)=>{
    e.preventDefault()
    axios
    .put(
      `http://localhost:4600/user/update/${localStorage.getItem('UserID')}`,

      {
        UserBio: UserBio.value,
        UserProfile: profile,
        UserBackgroundImage: BackgroundPic,
        
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
  })

  
 
//fetch details from the Api if not updated profile

axios
    .get(`http://localhost:4600/user/oneUser/${localStorage.getItem('UserID')}`,
    {
      headers: {
        token: localStorage.getItem("tokenToUse"),
      },
    }
    )
    .then((response) =>{
      let user=response.data.result[0][0]
      console.log(user)
      console.log('1234')
      userBio.textContent=user.UserBio
      img.src=user.UserProfile
     userBackgroundImg.src=user.UserBackgroundImage
     UserProfileImg.src=user.UserProfile
    })

    //implementing the user profile selections
const userPosts=document.querySelector('.userPosts')
const userReplies=document.querySelector('.userReplies')
const userFollowers=document.querySelector('.userFollowers')
const userFollowings=document.querySelector('.userFollowings')
const userArea=document.querySelector('.userArea')

//displaying user posts
function userPosting(){
  userArea.innerHTML=''
  axios
  .get("http://localhost:4600/postActions/viewAllPosts", {
    headers: {
      token: localStorage.getItem("tokenToUse"),
    },
  })
  .then((response) => {
    console.log(response.data);
    let Posts = response.data.result;

    let array1 = Posts[0];

    let array2 = Posts[1];

    const combinedArray = array1.map((item, index) => ({
      ...item,
      ...array2[index],
    }));
    // console.log(combinedArray);
    let filteredArray=combinedArray.filter(items=>items.UserID==localStorage.getItem('UserID'))
    console.log(filteredArray)

    let html = "";
    filteredArray.forEach((post) => {
      const commentInputId = `commentInput-${post.PostID}`;
      const commentIconId = `commentIcon-${post.PostID}`;
      const commentsContainerId = `commentsContainer-${post.PostID}`;
      const pID = `likesCount-${post.PostID}`;
      const commentCount = `commentCount-${post.PostID}`;
      const postImg = `img-${post.PostID}`;
      const likeID = `like-${post.PostID}`;
      const unlikeID = `unlike-${post.PostID}`;
      showLikes(post.PostID, `${pID}`);
      ShowCommentsNumber(post.PostID);
      hideEmptyImage(`${postImg}`);
let dayFromCreation=(`${post.CreatedAt}`).split("T")
dayFromCreation=dayFromCreation[0]     // console.log(post.ImageUrl);

      html += `
     <div class="post-body">
     <div class="post-head">
         <img src=${post.Profile} alt="">
         <h4>${post.Username}</h4>
         <p class="mail">${post.Email}   <span>${dayFromCreation}</span></p>
     </div>
     <div class="post-content">
         <div class="content-part">
             <p>${post.PostContent}</p>`


             html += (post.ImageUrl !== null ? `<img id="${postImg}" src=${post.ImageUrl} alt="">` : `<p style="padding:20px; font-size:30px; font-weight:bold;display:none">${post.PostContent[0]}</p>` ) 
         
         html += `</div>
         <div class="reactionPart">
             <div class="reaction">
                 <iconify-icon id="${commentIconId}" onclick=fetchAndDisplayComments(${post.PostID},'${commentsContainerId}') class="commenti" icon="iconamoon:comment-light" style="color: black; cursor:pointer"></iconify-icon>
                 <p id="${commentCount}"></p>
             </div>
             <div class="reaction">

             </div>
             <div class="reaction">
                 <iconify-icon class="like" id="${likeID}" onclick=likePost(${post.PostID},"${unlikeID}","${likeID}",${post.UserID}) icon="fluent-mdl2:like" style="color: black;"></iconify-icon>
                 <iconify-icon class="unlike" id="${unlikeID}" onclick=unlikePost(${post.PostID},"${unlikeID}","${likeID}") icon="iconamoon:like-fill" style="color: blue;"></iconify-icon>
                 <p id="${pID}"></p>
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

      userArea.innerHTML = html;
    });
  })
  .catch((e) => {
    console.log(e);
  });

}

userPosting()
userPosts.addEventListener('click',userPosting())