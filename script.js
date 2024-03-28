console.log("Welcome to Spotify");

//Initialize the Variables
let SongIndex = 0;
let audioElement = new Audio('Songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Tera Yaar Hoon Main", filePath: "Songs/1.mp3", coverPath: "Tera yaar hoon main.png"},
    {songName: "Tera Fitoor", filePath: "Songs/2.mp3", coverPath: "Tera Fitoor.png"},
    {songName: "Channa Mereya", filePath: "Songs/3.mp3", coverPath: "Channa Mereya.png"},
    {songName: "Dekha Hazaro Dafaa", filePath: "Songs/4.mp3", coverPath: "Dekha Hazaro Dafaa.png"},
    {songName: "Phir Kabhi", filePath: "Songs/5.mp3", coverPath: "Phir Kabhi.png"},
    {songName: "Dekh Lena", filePath: "Songs/6.mp3", coverPath: "Dekh Lena.png"},
    {songName: "Thodi Jagah", filePath: "Songs/7.mp3", coverPath: "Thodi Jagah.png"},
    {songName: "Naina", filePath: "Songs/8.mp3", coverPath: "Naina.png"},
    {songName: "Hawayein", filePath: "Songs/9.mp3", coverPath: "Hawayein.png"},
    {songName: "Soch na Sake", filePath: "Songs/10.mp3", coverPath: "Soch na Sake.png"},
]

songItems.forEach((element, i)=>{
   
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
})
// audioElement.play();

//Handle paly/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-circle-pause');
        gif.style.opacity = 0;
    }
})



//Listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause'); 
    }) 
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
       makeAllPlays();
       gif.style.opacity = 1;
       masterSongName.innerText = songs[SongIndex].songName; 
       SongIndex = parseInt(e.target.id);
       e.target.classList.remove('fa-circle-play');
       e.target.classList.add('fa-circle-pause');   
       audioElement.src = `Songs/${SongIndex+1}.mp3`;  
       audioElement.currentTime = 0;
       audioElement.play(); 
       masterPlay.classList.remove('fa-circle-play');
       masterPlay.classList.add('fa-circle-pause');   
    })
}) 

document.getElementById('next').addEventListener('click', ()=>{
    if(SongIndex>=9){
        SongIndex = 0;
    }else{
        SongIndex +=1;
    }
    audioElement.src = `Songs/${SongIndex+1}.mp3`;  
    masterSongName.innerText = songs[SongIndex].songName; 
    audioElement.currentTime = 0;
    audioElement.play(); 
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause'); 
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(SongIndex<=0){
        SongIndex = 0;
    }else{
        SongIndex -= 1;
    }
    audioElement.src = `Songs/${SongIndex+1}.mp3`; 
    masterSongName.innerText = songs[SongIndex].songName; 
    audioElement.currentTime = 0;
    audioElement.play(); 
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause'); 
})






