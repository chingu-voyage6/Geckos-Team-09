'use strict'


// Run onload
window.addEventListener("load", function(){
  if(localStorage.key("BG-Image-Zed") !== null){
  document.body.style.backgroundImage = localStorage.getItem("BG-Image-Zed");
}
}, false);


//array of object for unsplash images (could be just an array, I made an object for a better debugging)
const img = [
    {
        name: 1,
        image: "https://images.unsplash.com/photo-1516692935701-4f35bff8b9f6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5e8b07db9ad1b8626288bbbf77471558&auto=format&fit=crop&w=750&q=80"
    },
    {
        name: 2,
        image: "https://images.unsplash.com/photo-1413752567787-baa02dde3c65?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=00dab0342c1b6498228d16e4a7d82ad3&auto=format&fit=crop&w=755&q=80"
    },
    {
        name: 3,
        image: "https://images.unsplash.com/photo-1419064642531-e575728395f2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=67fd942ed774f3de1db50cf3dd0065eb&auto=format&fit=crop&w=750&q=80"
    },
    {
        name: 4,
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cea32ac97f8ffde3f76df4a646ac8b4d&auto=format&fit=crop&w=750&q=80"
    },
    {
        name: 5,
        image: "https://images.unsplash.com/photo-1503401639559-b16332601594?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=642189d3185b899a6e755f00ab39ef20&auto=format&fit=crop&w=668&q=80"
    },
    {
        name: 6,
        image: "https://images.unsplash.com/photo-1502786129293-79981df4e689?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ca8929ea79462f07dc08e1245b63aa75&auto=format&fit=crop&w=889&q=80"
    },
    {
        name: 7,
        image: ""
    },
    {
        name: 8,
        image: ""
    },
    {
        name: 9,
        image: ""
    }
]

//This function will generate date  Date/Hour/Minute/Second from the user computer at each 1s (1000ms) and change the background image on the exact time that will be set
setInterval(function(){
    let currentDate = new Date();
    let currentHour = currentDate.getHours();
    let currentSecond = currentDate.getSeconds();
    let currentMinute  = currentDate.getMinutes();

    if (currentHour === 10 && currentMinute === 41 && currentSecond === 30 ) {//checks if it's the exact time to change the background image

        randomImg();
    }
},1000);

// Create a random background image
function randomImg(){
  let randomNum = Math.floor(Math.random() * 6); //generates a random number from 0 to 5 (number of images on the object)
  let selectedImg = img[randomNum].image; //gets a random image from the object and assign to a variable
  let imgUrl = "url('" + selectedImg + "')"; // changes the format
  document.body.style.backgroundImage = imgUrl; // changes the background image
  localStorage.setItem("BG-Image-Zed", imgUrl); // Saves background in localStorage
}

