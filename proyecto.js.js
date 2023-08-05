// SON DATA
    // Song data
const songList = [
    {
        title: " Alok, Bruno Martini feat. Zeeba ",
        file: "X2Download.app - Alok, Bruno Martini feat. Zeeba - .mp3",
        cover: "descarga1.jpeg"

    },
    {
        title: "Harddope,Veronica- Flowers",
        file: "Harddope, - Flowers.mp3",
        cover: "happer.jpg"
    },
    {
        title: "XTom's Diner - AnnenMayKantereit",
        file: "XTom's Diner - AnnenMayKantereit.mp3",
        cover: "3.webp" 
    },
]
// cancion  actual 
let  actualSong = null

// capturar elementos del DOM para  trabajar con  js.  
const songs = document.getElementById("songs") 
const audio = document.getElementById("audio")
const cover =document.getElementById ("cover")
const title =document.getElementById ("title")
const play =document.getElementById ("play")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")
progressContainer.addEventListener("click",setProgress)

// escuchar  elemento  audio  
audio.addEventListener ("timeupdate",updateProgress)



// escuchar  clik en  el  boton play  
play.addEventListener("click" , ()=> {
    if (audio.paused){
        playSong()
    } else  {
        pauseSong()
    }
})
next.addEventListener("click", () => nextSong())
prev.addEventListener("click", () => prevSong())
 // cargar canciones y mostrar  e listado 
function loadSongs(){
    //crear un elemto   li  
     songList.forEach( (song, index) => {
        // crear li
        const li = document.createElement("li")
        // crar  a 
        const link =  document.createElement("a")
        // hidratar a 
        link.textContent =song.title
        link.href="#"
        // escuchar clik 
            link.addEventListener("click",()=>loadSong(index))
        // añadir a  li 
        li.appendChild(link)
        // añadir a  li a  ul   
        songs.appendChild(li) 
     })

}

// cagar cancion señecionada
function loadSong(songIndex){
    if(songIndex !== actualSong){
    changeActiveClass (actualSong , songIndex)
  actualSong = songIndex
  audio.src = "./audio/" + songList[songIndex].file
  playSong()
  changeSongtitle(songIndex)
  changeCover(songIndex)
  
    }
}
  // actualizar barra de progreso
  function updateProgress (event){
    
    const { duration,currentTime}= event.srcElement
     const percent =(currentTime /duration) *100 
     progress.style.width =  percent +  "%"
    
  }
   // hacer  la bara de  prgreso clicable 
   function setProgress(event){
    const totalWidth = this.offsetWidth
    const progressWidth = event.offsetX
    const current = (progressWidth / totalWidth) * audio.duration
    audio.currentTime = current
}
   
// actualizar  conroles  
 function updateControls(){
if (audio.paused){
  play.classList.remove("fa-pause")
  play.classList.add("fa-play")
 }
else{
     play.classList.add("fa-pause")
     play.classList.remove("fa-play")
}
 }
 // reproducir cancion 
 function playSong(){
    if (actualSong !== null) {
  audio.play()
  updateControls()
 }
}
 //pause de  cancion 
  function pauseSong(){
 audio.pause()
 updateControls()
  }

// cambiar clase activa 
function changeActiveClass(lastIndex , newIndex){
const links = document.querySelectorAll("a")
  if(lastIndex !==  null){
   links[lastIndex].classList.remove("active")
 }
 links[newIndex].classList.add("active")
}


// cambiar el  cover  de  la  cansion 
function changeCover(songIndex){
    cover.src = "./imaguen/" + songList[songIndex].cover
}
// combiar titulo de la cancion
function changeSongtitle (songIndex){
title.innerText = songList[songIndex].title
}
// Anterior canción
function prevSong() {
    if (actualSong > 0) {
        loadSong(actualSong - 1)
    } else {
        loadSong(songList.length - 1)
    }
}
// Siguiente canción
function nextSong() {
    if (actualSong < songList.length -1) {
        loadSong(actualSong + 1)
    } else {
        loadSong(0)
    }
}
// Lanzar siguiente canción cuando se acaba la actual
audio.addEventListener("ended", () => nextSong())
// GOO
loadSongs()
