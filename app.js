const $ = document.querySelector.bind(document); 
const $$ = document.querySelectorAll.bind(document); 
var song = $('.dashboard__audio'); 
var btnPlay = $('.wrap-play-pause .icon-play'); 
var btnPause = $('.wrap-play-pause .icon-pause'); 
var progress = $('.dashboard__progress'); 
var CD = $('.dashboard__cd-thumb'); 
var dashboardInfo = $('.dashboard__header'); 
var dashboardAudio = $('.dashboard__audio'); 
var dashboard = $('.dashboard'); 
var playPause = $('.wrap-play-pause'); 
var playList = $('.playlist'); 
var btnRepeat = $('.btnRepeat'); 
var playList = $('.playlist'); 
var btnPreSong = $('.btnPreSong');
var btnNextSong = $('.btnNextSong');
var btnRandom = $('.btnRandom'); 
var container = $('.container');
var backgroundSecond = $('.background-second'); 
var PLAYER_STORAGE_KEY = 'ART OF THE SOUND'; 
const app = { 
    

    start : function() { 
        this.render();  
        this.handleEvents(); 
    },
    
    songs: [
        {
            "name": "Nevada", 
            "singer": "Vicetone",
            "path": "./assets/songs/Vicetone-Nevada.mp3",
            "image": "./assets/img/Vicetone-Nevada.jpg"
        }
        ,{
            "name": "Cupid", 
            "singer": "FIFTY FIFTY",
            "path": "./assets/songs/'Cupid' (TwinVer.).mp3",
            "image": "./assets/img/Cupid.jpg"
        }
        ,{
            "name": "Here With Me", 
            "singer": "d4vd",
            "path": "./assets/songs/HereWithMe.mp3",
            "image": "./assets/img/HereWithMe.jpg"
        }
        ,{
            "name": "Double take", 
            "singer": "dhruv",
            "path": "./assets/songs/doubleTake.mp3",
            "image": "./assets/img/doubleTake.jpg"
        }
        ,{
            "name": "comethru", 
            "singer": "Jeremy Zucker",
            "path": "./assets/songs/comethru.mp3",
            "image": "./assets/img/comethru.jpg"
        }
        ,{
            "name": "Interstellar", 
            "singer": "Hans Zimmer",
            "path": "./assets/songs/Hans Zimmer-Interstellar.mp3",
            "image": "./assets/img/Hans_Zimmer-Interstellar.jpg"
        }
        ,{
            "name": "I love you 3000", 
            "singer": "Stephanie Poetri",
            "path": "./assets/songs/ILoveYou3000.mp3",
            "image": "./assets/img/ILoveYou3000.jpg"
        }
        ,{
            "name": "Head In The Clouds", 
            "singer": "Hayd",
            "path": "./assets/songs/Head_In_The_Clouds.mp3",
            "image": "./assets/img/Head_In_The_Clouds.jpg"
        }
        ,{
            "name": "Dancing with your ghost", 
            "singer": "Sasha Alex Sloan",
            "path": "./assets/songs/Sasha_Alex_Sloan-Dancing_With_Your_Ghost.mp3",
            "image": "./assets/img/Sasha_Alex_Sloan-Dancing_With_Your_Ghost.jpg"
        }
        ,{
            "name": "Khi em lớn", 
            "singer": "Orange x Hoàng Dũng",
            "path": "./assets/songs/KhiEmLon.mp3",
            "image": "./assets/img/KhiEmLon.jpg"
        }
        ,{
            "name": "Bao tiền một mớ bình yên ?", 
            "singer": "14 Casper & Bon Nghiêm",
            "path": "./assets/songs/baotienmotmobinhyen.mp3",
            "image": "./assets/img/baotienmotmobinhyen.jpg"
        }
        ,{
            "name": "Take me to church", 
            "singer": "Hozier",
            "path": "./assets/songs/Hozier-Take Me To Church.mp3",
            "image": "./assets/img/Hozier-Take_Me_To_Church.jpg"
        }
        ,{
            "name": "vaicaunoicokhiennguoithaydoi", 
            "singer": "GREY D x tlinh",
            "path": "./assets/songs/GREY D x tlinh - vaicaunoicokhiennguoithaydoi.mp3",
            "image": "./assets/img/GREY_D_x_tlinh_-_vaicaunoicokhiennguoithaydoi.jpg"
        }
        ,{
            "name": "Sinh Ra Đã Là Thứ Đối Lập Nhau", 
            "singer": "Emcee L (Da LAB)",
            "path": "./assets/songs/Sinh Ra Đã Là Thứ Đối Lập Nhau - Emcee L (Da LAB).mp3",
            "image": "./assets/img/SinhRaDaLaThuDoiLap.jpg"
        }
    ],
    render : function() { 
        // render song in playlist
        var htmlSongs = this.songs.map(function(song, index) { 
            return `<div class="song" data-index="${index}">
                        <div class="thumbnai_wrap">
                            <div class="song_thumbnai" style="background-image: url('${song.image}')">
                            </div>
                        </div>
                        <div class="song__info">
                            <div class="song__name">${song.name}</div>
                            <div class="song__author">${song.singer}</div>
                        </div>
                        <div class="song__control">
                            <i class="fa-solid fa-ellipsis"></i>
                        </div>
                    </div>`
        }).join('\n'); 
        playList.innerHTML = htmlSongs;
    }, 

    handleEvents: function() { 
        var _this = this; 
        var config = JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {}; 
        var CDwidth = CD.offsetWidth; 
        var currentIndex = 0; 
        var lengthSongs = this.songs.length; 
        var isRepeat = false; 
        var isRandom = false;  
        var currentProgress = 0; 
        
        function setConfig(key, value) { 
            config[key] = value;  
            localStorage.setItem(PLAYER_STORAGE_KEY,JSON.stringify(config)); 
        }

        function loadConfig() { 
            isRepeat = config.isRepeat; 
            isRandom = config.isRandom; 
            currentIndex = config.currentIndex ? config.currentIndex : 0; 
            currentProgress = config.currentProgress ? config.currentProgress : 0; 

            if(isRepeat) 
                btnRepeat.classList.add('active--color'); 
            if(isRandom) 
                btnRandom.classList.add('active--color'); 
        }
        
        loadConfig(); 
        function songPause() { 
            song.pause(); 
            btnPause.style.display = 'none'; 
            btnPlay.style.display = 'block'; 
            cdAnimation.pause(); 
        }

        function songPlay() { 
            song.play(); 
            btnPause.style.display = 'block'; 
            btnPlay.style.display = 'none'; 
            cdAnimation.play(); 
        }

        playPause.onclick = (e) => {
            if(song.paused) 
                songPlay(); 
            else 
                songPause(); 
        }; 

        // khi tua Progress

        progress.oninput = function() { 
            var currentTime = song.duration * this.value / 100; 
            console.log(currentTime); 
            song.currentTime = currentTime; 
        }

        progress.onchange = function() { 
            var currentTime = song.duration * this.value / 100; 
            song.currentTime = currentTime; 
        }

        // Progress khi song playing
        var isUpdateProgress = currentProgress > 0; 
        song.ontimeupdate = () => { 
            if(isUpdateProgress) {
                if(song.duration) {
                    song.currentTime = song.duration * currentProgress / 100;
                    isUpdateProgress = false; 
                }
            } else  
                currentProgress =  Math.floor(song.currentTime / song.duration * 100); 
            var totalTime = song.duration; 
            var currentTime = song.currentTime;
            if(!currentProgress) 
                currentProgress = 0; 
            progress.value = currentProgress;
            progress.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${progress.value}%, #ddd ${progress.value}%, #ddd 100%)`;
            setConfig('currentProgress', currentProgress);
        }

        // tự động chuyển bài khi kết thúc  // phát lại nhạc 
        song.onended = ()=>{
            if(!isRepeat)
                btnNextSong.click(); 
            else  
                song.play(); 
        }
        
        btnRepeat.onclick = () => { 
            isRepeat = !isRepeat;
            btnRepeat.classList.toggle('active--color'); 
            setConfig('isRepeat', isRepeat); 
        }
        
        // quay đĩa CD
        var cdAnimation = CD.animate(
            [
                {transform: 'rotate(0deg)'}, 
                {transform: 'rotate(360deg)'}
            ],
            {
                duration: 10000,
                iterations: Infinity, 
            }
        );
        cdAnimation.pause();   
        
        //sroll playlist => thu nhỏ/ phóng to CD
        backgroundSecond.style.height = dashboard.offsetHeight + 'px'; 
        document.onscroll = () => { 
            var scrollTop = window.scrollY | document.documentElement.scrollTop; 
            var newCDwidth =Math.max(0, CDwidth - scrollTop ); 
            CD.style.width = newCDwidth + "px"; 
            CD.style.height = newCDwidth + "px"; 
            CD.style.opacity = newCDwidth/CDwidth; 
            backgroundSecond.style.height = dashboard.offsetHeight + 'px'; 
        };    
        
        // hight light current song item 
        function hightLightCurrentSong() { 
            var currentSongElement = $(`.song:nth-child(${currentIndex+1})`); 
            currentSongElement.classList.add('active'); 
        }
        function RemovehightLightCurrentSong() { 
            var currentSongElement = $(`.song:nth-child(${currentIndex+ 1})`); 
            currentSongElement.classList.remove('active');
        }

        //random 
        btnRandom.onclick = function() { 
            isRandom = !isRandom; 
            this.classList.toggle('active--color'); 
            setConfig('isRandom', isRandom); 
        }

        function playRandom() { 
            RemovehightLightCurrentSong(); 
            var newCurrentIndex = 0; 
            do {
                newCurrentIndex = Math.round(Math.random()*(lengthSongs-1)); 
            } while (newCurrentIndex===currentIndex);
            currentIndex = newCurrentIndex; 
            loadCurrentSong(); 
        }


        //pre song, next song  (currentIndex change)
        btnNextSong.onclick = () => {  
            if(isRandom) 
                playRandom() 
            else { 
                RemovehightLightCurrentSong(); 
                currentIndex = (currentIndex + 1) % lengthSongs; 
                loadCurrentSong(); 
            }
            scrollCurrentSongIntoView(); 
        }

        

        btnPreSong.onclick = () => { 
            if(isRandom) 
                playRandom() 
            else { 
                RemovehightLightCurrentSong() 
                currentIndex = (currentIndex - 1 + lengthSongs) % lengthSongs; 
                loadCurrentSong(); 
            }
            scrollCurrentSongIntoView(); 
        }
        
        // click item song to play
        playList.onclick = (e) => {
            if( e.target.closest('.song__control') ) { 
                
            } else if(e.target.closest('.song:not(.active)')) { 
                RemovehightLightCurrentSong(); 
                var itemSong = e.target.closest('.song:not(.active)'); 
                currentIndex =parseInt(itemSong.dataset.index); 
                loadCurrentSong();
                songPlay(); 
            }
        }

        // load current song
        function loadCurrentSong() {
            var currentSong = _this.songs[currentIndex]; 
            var htmlCurrentSong = `<h2 class="song-name"> ${currentSong.name} </h2>
                                    <p class="song-author"> ${currentSong.singer} </p>`; 
            dashboardInfo.innerHTML = htmlCurrentSong; 
            dashboardAudio.src = currentSong.path; 
            CD.style.backgroundImage = `url(${currentSong.image})`; 
            if(btnPause.style.display === 'block')
                songPlay(); 

            hightLightCurrentSong(); 
            setConfig('currentIndex', currentIndex); 
        }
        loadCurrentSong(); 

        function scrollCurrentSongIntoView() {  
            $('.song.active').scrollIntoView({
                behavior: "smooth", 
                block: "center",
                inline: "nearest", 
            });
        }
    },
}

app.start(); 


