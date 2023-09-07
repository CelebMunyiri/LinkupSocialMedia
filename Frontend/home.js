"use strict"
const home=document.querySelector('.home')
const Home=document.querySelector('.Home')
const postDiv=document.querySelector('.PostingDiv')

home.addEventListener('click',()=>{
    Home.style.display='block'
    Explore.style.display='none'
    messagePeople.style.display='none'
    Messages.style.display='none'
    Notification.style.display='none'
    postDiv.style.display='none'
    profileContent.style.display='none'
})

const explore=document.querySelector('.explore')
const Explore=document.querySelector('.Explore')
explore.addEventListener('click',()=>{
    Explore.style.display='block'
    Home.style.display='none'
    messagePeople.style.display='none'
    Messages.style.display='none'
    Notification.style.display='none'
    postDiv.style.display='none'
    profileContent.style.display='none'
})

const notification=document.querySelector('.notification')
const Notification=document.querySelector('.Notification')

notification.addEventListener('click',()=>{
    Notification.style.display='block'
    Home.style.display='none'
    Explore.style.display='none'
    messagePeople.style.display='none'
    Messages.style.display='none'
    postDiv.style.display='none'
    profileContent.style.display='none'
})

const Messages=document.querySelector('.Messages')
const messagingBtn=document.querySelector('.messages')
const messagePeople=document.querySelector('.DisplayMessaging')
const messagingContainer=document.querySelectorAll('.messagePerson')

messagingBtn.addEventListener('click',()=>{
    messagePeople.style.display='block'
    Explore.style.display='none'
    Home.style.display='none'
    Notification.style.display='none'
    Messages.style.display='none'
    postDiv.style.display='none'
    profileContent.style.display='none'
})

messagingContainer.forEach(element => {
    element.addEventListener('click',()=>{
        Messages.style.display='block'
        messagePeople.style.display='none'
        
    })
});

const BacktoMessages=document.querySelector('.backMessages')

BacktoMessages.addEventListener('click',()=>{
    messagePeople.style.display='block'
    Explore.style.display='none'
    Home.style.display='none'
    Notification.style.display='none'
    Messages.style.display='none'
    postDiv.style.display='none'

})

const backToHome=document.querySelectorAll('.backHome')

backToHome.forEach(btn=>{
    btn.addEventListener('click',()=>{
    messagePeople.style.display='none'
    Explore.style.display='none'
    Home.style.display='block'
    Notification.style.display='none'
    Messages.style.display='none'
    profileContent.style.display='none'
    postDiv.style.display='none'
})
})

const PostingDiv=document.querySelector('.PostingDiv')
const closePost=document.querySelector('.closePost')

closePost.addEventListener('click',()=>{
PostingDiv.style.display='none'
Home.style.display='block'
})

const postButton=document.querySelector('.post')

postButton.addEventListener('click',()=>{
    PostingDiv.style.display='block'
    messagePeople.style.display='none'
    Explore.style.display='none'
    Home.style.display='none'
    Notification.style.display='none'
    Messages.style.display='none'
})

const profileButton=document.querySelectorAll('.profile')
const profileContent=document.querySelector('.profileContent')

profileButton.forEach(btn=>{
    btn.addEventListener('click',()=>{
    profileContent.style.display='block'
    PostingDiv.style.display='none'
    messagePeople.style.display='none'
    Explore.style.display='none'
    Home.style.display='none'
    Notification.style.display='none'
    Messages.style.display='none'
    postDiv.style.display='none'
    })
})

//posting implementation starts here
const postText = document.getElementById("post-text");
const postImage = document.getElementById("post-image");
const postVideo = document.getElementById("post-video");
const postForm=document.getElementById("post-form")
const postingButton = document.getElementById("post-button");

let imageToPost=''

postImage.addEventListener('change', (event)=>{
        
    const target = event.target
    const files = target.files
    if(files){
        const formData = new FormData()
        formData.append("file", files[0])
        formData.append("upload_preset", "Notebook")
        formData.append("cloud_name", "dkgtf3hhj")

        fetch('https://api.cloudinary.com/v1_1/dkgtf3hhj/image/upload', {
            method: "POST",
            body: formData
        }).then((res) => res.json()).then(res => imageToPost = res.url)
    }
})

let videoToPost=''

postVideo.addEventListener('change', (event)=>{
        
    const target = event.target
    const files = target.files
    if(files){
        const formData = new FormData()
        formData.append("file", files[0])
        formData.append("upload_preset", "Notebook")
        formData.append("cloud_name", "dkgtf3hhj")

        fetch('https://api.cloudinary.com/v1_1/dkgtf3hhj/video/upload', {
            method: "POST",
            body: formData
        }).then((res) => res.json()).then(res =>{
            console.log(res)
             videoToPost = res.url
             localStorage.setItem('videoUrl',videoToPost) })
             
    }
})

postForm.addEventListener('submit',(e)=>{
e.preventDefault()

axios
.post(
  "http://localhost:4600/postActions/createPost",
  
  {
    PostContent: postText.value,
    ImageUrl:imageToPost,
    VideoUrl:videoToPost,
    UserID:localStorage.getItem('UserID')

  },

  {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      "token":localStorage.getItem('tokenToUse')
    },
  }
)
.then((response) => {
  console.log(response.data);
  
  location.reload()
})
.catch((e) => {
  console.log(e);
});

})

let likesNo=0
//displaying the posts here
const postsArea=document.querySelector('.lower-posts')


axios
.get(
  "http://localhost:4600/postActions/viewAllPosts",
  {
    headers: {
     "token":localStorage.getItem('tokenToUse')
    },
  }
)
.then((response) => {

  //console.log(response.data);
let Posts=response.data.result

let array1=Posts[0]

let array2=Posts[1]

const combinedArray=array1.map((item, index)=>({
    ...item,...array2[index],
}))
console.log(combinedArray)


let html=''
combinedArray.forEach((post) => {
   // const PostID=post.PostID
   // const UserID=localStorage.getItem('UserID')

    //like
    
    
   
     html+=`
     <div class="post-body">
     <div class="post-head">
         <img src="chacha.jpg" alt="">
         <h6>${post.Username}</h6>
         <p>${post.Email}</p>
     </div>
     <div class="post-content">
         <div class="content-part">
             <p>${post.PostContent}</p>
             <img src=${post.ImageUrl} alt="">
         </div>
         <div class="reactionPart">
             <div class="reaction">
                 <iconify-icon class="comment" icon="iconamoon:comment-light" style="color: black;"></iconify-icon>
                 <p>34</p>
             </div>
             <div class="reaction">
                 <iconify-icon class="repost" icon="system-uicons:retweet" style="color: black;"></iconify-icon>
                 <p>45</p>
             </div>
             <div class="reaction">
                 <iconify-icon class="like" onclick=likePost(${post.PostID}) icon="fluent-mdl2:like" style="color: black;"></iconify-icon>
                 <iconify-icon class="unlike"  icon="iconamoon:like-fill" style="color: blue;"></iconify-icon>
                 <p>${likesNo}</p>
             </div>
             

         </div>
     </div>
 </div>
 
 </div>`;
 postsArea.innerHTML=html

  const like=document.querySelector('.like')

//   like.addEventListener('click',async(e)=>{
//     e.preventDefault()
//     const iD=post.PostID
//      const res=await likePost(iD)
   
//   })
 
   })
   
  
 })
  
.catch((e) => {
  console.log(e);
});

//like a post

function likePost(id){
    axios
    .post(
      "http://localhost:4600/like/addlike",
      
      {
        PostID:id,
        UserID:localStorage.getItem('UserID')
    
      },
    
      {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          "token":localStorage.getItem('tokenToUse')
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
const unlike=document.querySelector('.unlike')



//show likes
function showLikes(iD){
    
    axios
    .get(
      `http://localhost:4600/like/likesOfOne/${iD}`,
      {
        headers: {
         "token":localStorage.getItem('tokenToUse')
        },
      }
    )
    .then((res) => {
        const noOfLikes=res.data.result.length
        likesNo=noOfLikes
        
    })
}


