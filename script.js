var right = document.querySelector(".right");
var innerCircle = document.querySelector(".inner-circle");
var soundgif= document.querySelector(".sound");
var backward = document.querySelector("#backward");
var forward = document.querySelector("#forward");
var third = document.querySelector("#third");

var songlist = [
  {
    Name: "Pahle bhi main",
    Image: "pehle-bhi.jpeg",
    URL: "Pehle Bhi Main Animal 320 Kbps.mp3",
    length:"4:10",
  },
  {
    Name: "Audhuri kahani",
    Image: "Audhuri-kahani.jpeg",
    URL: "bollywood_HAK - Hamari Adhuri Kahani.mp3",
    length:"6:38",
  },
  {
    Name: "Afgan jalebi",
    Image: "Afghan-Jalebi.jpg",
    URL: "Afghan Jalebi Ya Baba Phantom 320 Kbps.mp3",
    length:"3:43",
  },
  {
    Name: "Rashke Qamar",
    Image: "Mere-Rashke-Qamar.jpg",
    URL: "Mere Rashke Qamar Baadshaho 320 Kbps.mp3",
    length:"3:40",
  },
  {
    Name: "tere liya",
    Image: "tere-liya.jpeg",
    URL: "Tere Liye Prince 320 Kbps.mp3",
    length:"4:39",
  },
];

var clutter = "";
var audio = new Audio();

let playpause = true;




let idex = 0;
function main() {
var clutter = "";
songlist.forEach((element, index) => {
  clutter += `
      <img height="100px" width="100px" class="leftimg" id="${index}" src="${element.Image}" alt="song">
        <p style="color: rgba(240, 248, 255, 0.76);" id="${index}" >${element.Name}</p>
        <p style="color: palevioletred;" id="${index}" >${element.length}</p>
    `;
});


right.innerHTML = clutter;
  audio.src = songlist[idex].URL;
  innerCircle.style.backgroundImage = `url(${songlist[idex].Image})`;
}
main();

function songPlay() {
  right.addEventListener("click", (details) => {
    firstclick =false;
    idex =details.target.id;
  console.log("3:"+idex);
    main();
    audio.play();
    audio.addEventListener('loadedmetadata', function() {
      const formattedDuration = formatDuration(audio.duration);
      third.innerHTML = formattedDuration;
    });
    
    innerCircle.innerHTML = `
    <i class="fa-solid fa-pause pause" ></i>`;
   
    soundgif.innerHTML=`
    <img id="gif" src="voice up down.gif" alt="gif">`;
  });
 
}
songPlay();

let firstclick = true;

document.querySelector("#playpause").addEventListener("click", () => {
  if (playpause) {
    if (firstclick) {
      audio.src = songlist[0].URL;
      firstclick =false;
    }
    audio.play();
    audio.addEventListener('loadedmetadata', function() {
      const formattedDuration = formatDuration(audio.duration);
      third.innerHTML = formattedDuration;
    });

    innerCircle.innerHTML = `
    <i class="fa-solid fa-pause pause" ></i>`;
    soundgif.innerHTML=`
    <img id="gif" src="voice up down.gif" alt="gif">`
    playpause = false;
  } else {
    innerCircle.innerHTML = `
  <i class="fa-solid fa-play pause" ></i>`;
  soundgif.innerHTML=`
  <img id="gif" src="voice up-down.png" alt="gif">`
    playpause = true;
    audio.pause();
  }
});



function forwardBackward () {
  forward.addEventListener("click",()=> {
    console.log("forward"+idex);
    if(idex < songlist.length) {
      idex++;
      main();
      firstclick =false;
      audio.play();
      audio.addEventListener('loadedmetadata', function() {
        const formattedDuration = formatDuration(audio.duration);
        third.innerHTML = formattedDuration;
      });

      innerCircle.innerHTML = `
      <i class="fa-solid fa-pause pause" ></i>`;
      soundgif.innerHTML=`
      <img id="gif" src="voice up down.gif" alt="gif">`
      playpause = false;
      backward.style.opacity = 10;
    }
    else {
      forward.style.opacity = 0.4;
    }
  });

  backward.addEventListener("click",()=> {
    console.log(idex);
    if(idex > -1) {
      idex--;
      main();
      firstclick =false;
      audio.play();
      audio.addEventListener('loadedmetadata', function() {
        const formattedDuration = formatDuration(audio.duration);
        third.innerHTML = formattedDuration;
      });
      innerCircle.innerHTML = `
      <i class="fa-solid fa-pause pause" ></i>`;
      soundgif.innerHTML=`
      <img id="gif" src="voice up down.gif" alt="gif">`
      playpause = false;
      forward.style.opacity = 10;
    }
    else {
      backward.style.opacity = 0.4;
      // idex=0;
      backward.Disabled;
    }
  })
}
forwardBackward();

function formatDuration(durationInSeconds) {
  // Get whole minutes
  const minutes = Math.floor(durationInSeconds / 60);

  // Get remaining seconds (after removing whole minutes)
  const seconds = Math.floor(durationInSeconds % 60);

  // Format seconds with leading zero (optional)
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${minutes}:${formattedSeconds}`;
}

const timeBar = document.getElementById('timeBar');

timeBar.addEventListener('click', (event) => {
  // Calculate the percentage of the clicked position
  const clickedPosition = event.offsetX / timeBar.offsetWidth;
  const duration = parseInt(songlist[idex].length.split(':')[0]) * 60 + parseInt(songlist[idex].length.split(':')[1]);
  const newTime = clickedPosition * duration;

  // Set the new playback position of the song
  audio.currentTime = newTime;
});

// Update progress bar continuously
audio.addEventListener('timeupdate', () => {
  const currentTime = audio.currentTime;
  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);
  
  // Format minutes and seconds with leading zeros if necessary
  const formattedTime = `${minutes}:${String(seconds).padStart(2, '0')}`;
  
  // Update the HTML element with id "timed" to display the formatted time
  document.getElementById('timed').innerHTML = formattedTime;
  const duration = parseInt(songlist[idex].length.split(':')[0]) * 60 + parseInt(songlist[idex].length.split(':')[1]);
  const progress = (currentTime / duration) * 100;
  timeBar.value = progress;
  document.getElementById('timed').style.color ="rgb(226, 229, 233)";
});












function displayCurrentTime() {
  // Create a new Date object to get the current date and time
  const now = new Date();
  
  // Get the current hour, minute, and second
  let hours = now.getHours();
  const minutes = now.getMinutes();
  
  // Determine whether it's AM or PM
  const meridian = hours >= 12 ? 'PM' : 'AM';
  
  // Convert hours to 12-hour format
  hours = hours % 12 || 12; // If hours is 0, set it to 12
  
  // Format the time to ensure two digits for minutes
  const formattedMinutes = String(minutes).padStart(2, '0');
  
  // Display the formatted time in the HTML element with id "currentTime"
  document.getElementById('third').textContent = `${hours}:${formattedMinutes} ${meridian}`;
}

// Call the function initially to display the current time
displayCurrentTime();

// Update the time every second to keep it current
setInterval(displayCurrentTime, 1000);

window.addEventListener(("load"),()=>{
  document.querySelector(".loading").classList.add("hide")
})