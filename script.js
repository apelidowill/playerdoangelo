const nomedamusica = document.getElementById('nome-da-musica');
const nomedabanda = document.getElementById('nome-da-banda');

const song = document.getElementById('audio');
const capa = document.getElementById('capa');
const progressoatual = document.getElementById('progresso-atual')
const contemProgresso =document.getElementById('contem-progesso')
const shuffle = document.getElementById('shuffle');
const play = document.getElementById('play');
const previous= document.getElementById('previous');
const next= document.getElementById('next');
const repeatButton= document.getElementById('repeat');
const songTime= document.getElementById('song-time');
const totalTime= document.getElementById('total-time');
const like_button= document.getElementById('like');



const m1 = {
    nomedamusica: 'Viva a vida',
    artista: 'Turma do Pagode',
    file: 'Viva a Vida',        // audio
    file2: 'Turma do Pagode',   // 
    liked: false,
};
const m2 = {
    nomedamusica: 'Lapada Dela',
    artista: 'Menos é mais',
    file: 'Lapada Dela',        //audio
    file2: 'Menos é mais',      //capa
    liked: false,
};
const m3 = {
    nomedamusica: 'Imprevisível',
    artista: 'Tribo da Periferia',
    file: 'Imprevisível',               //audio
    file2: 'Tribo da periferia',        //capa
    liked: false,
};
const m4 = {
    nomedamusica: 'Quem é o louco entre nós',
    artista: 'Nadson Feirinha',
    file: 'QUEM É O LOUCO ENTRE NÓS',               //audio
    file2: 'nadson feirinha',        //capa
    liked: false,
};
const m5 = {
    nomedamusica: 'Melhor eu ir',
    artista: 'Menos é mais',
    file: 'Melhor eu ir',               //audio
    file2: 'Melhor eu ir',        //capa
    liked: false,
};
const m6 = {
    nomedamusica: 'Eterno Amor',
    artista: 'Sampa Crew',
    file: 'Eterno Amor',               //audio
    file2: 'sampa crew',        //capa
    liked: false,
}

const OriginalPlaylist = [m1,m2,m3,m4,m5,m6]; //colocar a coleção de variavel dentro de colchetes
let sortedPlaylist = [...OriginalPlaylist]    // os três pontinhos são para tornar a plylist em m1,m2,m3,m4,m5 e não outro array dentro do array
let index = 0;                        // os ... espalha o array 


//nomedamusica.innerText = 'Viva a vida'
//nomedabanda.innerText = 'Turma do Pagode'

let tocando = false;
let isShuffle = false;
let reapeatOn = false;
// const = variavel constante, 
//let = vai ser quando quiser modificar minha variavel

// song.play faz a musica tocar
// song.pause faz a musica parar


function tocarmusica() {
    play.querySelector('.bi').classList.remove('bi-play-circle');
    play.querySelector('.bi').classList.add('bi-pause-circle');
    song.play();
    tocando = true;
}

function pausemusica() {
    play.querySelector('.bi').classList.remove('bi-pause-circle');
    play.querySelector('.bi').classList.add('bi-play-circle');
    song.pause();
    tocando = false;
}

function decidir_play_pause(){
    if(tocando==true){
        pausemusica();
    }
    else{
        tocarmusica();
    }
}


function iniciarmusica(){
    capa.src= `/imagens/${sortedPlaylist[index].file2}.jpg`;
    song.src= `songs/${sortedPlaylist[index].file}.mp3`;
    nomedamusica.innerText = `${sortedPlaylist[index].nomedamusica}`;
    nomedabanda.innerText= `${sortedPlaylist[index].artista}`;
    likeButtonRender(); //desenhar o botão de like para a musica
}

iniciarmusica();

function  likeButtonRender(){       //desenhar botão de like
    if (sortedPlaylist[index].liked === true){
        like_button.querySelector('.bi').classList.remove('bi-heart');
        like_button.querySelector('.bi').classList.add('bi-heart-fill');
        like_button.classList.add('button-active');
    }
    else{
        like_button.querySelector('.bi').classList.add('bi-heart');
        like_button.querySelector('.bi').classList.remove('bi-heart-fill');
        like_button.classList.remove('button-active');
    }
}
function likeButtonClicked(){
    if(sortedPlaylist[index].liked === false){  //se ele for falso, quando cliclar vai assumir valor verdadeiro true
        sortedPlaylist[index].liked = true;
    }
    else{
        sortedPlaylist[index].liked = false; // se for verdadeiro, quando cliclar, vai assumir valor falso
    }
    likeButtonRender();
    localStorage.setItem('Playlist',JSON.stringify(OriginalPlaylist));
}


function previousSong(){
    if(index === 0){
        index=sortedPlaylist.length -1;
    }
    else{
        index= index -1
    }
    iniciarmusica();
    tocarmusica();
}
function nextSong(){
    if(index === sortedPlaylist.length -1){
        index= 0;
    }
    else{
        index= index +1
    }
    iniciarmusica();
    tocarmusica();
}

function updateProgressBar(){
    // song.currentTime é o  tempoatual da musica
    // song.duration é o tempo total da musica = duração
    const porcentagem =(song.currentTime/song.duration)*100;
    progressoatual.style.setProperty('--progresso', `${porcentagem}%`);
    songTime.innerText= ToHHMMSS(song.currentTime);
}
function jumpTo(event){
    const width= contemProgresso.clientWidth;  //barra de progresso largura total
    const clickPosition= event.offsetX;  // é o local, ou seja, a largura da barra onde foi o click
    const jumpToTime = (clickPosition/width)*song.duration;
    song.currentTime= jumpToTime; //.currentime é o ponto da musica atual
    
}

function    shuffleArray(preShuffleArray){
        const size= preShuffleArray.length;
        let currentIndex = size-1;
        while(currentIndex > 0){
            let randomIndex= Math.floor(Math.random()*size);        //floor é piso, arredonda para baixo
            let aux =  preShuffleArray[currentIndex];
            preShuffleArray[currentIndex]= preShuffleArray[randomIndex];
            preShuffleArray[randomIndex]= aux;
            currentIndex = currentIndex -1; 
        }


}
function shuffleClick(){
    if(isShuffle===false){
        isShuffle = true;
        shuffleArray(sortedPlaylist);
        shuffle.classList.add('button-active');
    }
    else{
        isShuffle = false;
        sortedPlaylist = [...OriginalPlaylist];
        shuffle.classList.remove('button-active'); 

    }
}
function    repeatClick(){
    if(reapeatOn===false){
    reapeatOn = true;
    repeatButton.classList.add('button-active');  // classlit é a lista de classe, apontando pra classe que deixa o botao verde
    }
    else{
    reapeatOn = false;
    repeatButton.classList.remove('button-active');
}
}
function nextOrRepeat(){
    if(reapeatOn===false){
        nextSong();
    }
    else{
        tocarmusica();
    }
}

function  ToHHMMSS(originalNumber){
    let hours= Math.floor(originalNumber/3600); 
    let min = Math.floor((originalNumber-hours*3600)/60);
    let seconds= Math.floor(((originalNumber-hours*3600)-(min*60)));
    //return (`${hours.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`);
    return (`${hours.toString().
        padStart(2,'0')}:${min.toString().
        padStart(2,'0')}:${seconds.toString().
        padStart(2,'0')}`);
}

function updateCurrentTime(){
    songTime.innerText = ToHHMMSS(song.currentTime); 
    // isso foi colado na função da barra de progresso,
    // para ir atualizando em tempo real

}

function updateTotalTime(){
    totalTime.innerText = ToHHMMSS(song.duration);
}

//let tempo_total=(song.duration);
//let HH = Math.floor(tempo_total / 3600);
//let MM = Math.floor((tempo_total - HH*3600)/60);
//let SS = Math.floor(tempo_total - HH*3600 - MM*60);
//totalTime.innerText= (`${HH.toString().padStart(2,'0')}:${MM.toString().padStart(2,'0')}:${SS.toString().padStart(2,'0')}`);  // texto corrido é string





previous.addEventListener('click',previousSong);
next.addEventListener('click',nextSong);
play.addEventListener('click',decidir_play_pause);
song.addEventListener('timeupdate',updateProgressBar);
song.addEventListener('ended',nextOrRepeat )   // ended é o evento de final da musica
song.addEventListener('loadedmetadata',updateCurrentTime);
song.addEventListener('loadedmetadata',updateTotalTime);
contemProgresso.addEventListener('click', jumpTo);
shuffle.addEventListener('click',shuffleClick);
repeatButton.addEventListener('click',repeatClick);
like_button.addEventListener('click',likeButtonClicked); 


//tocarmusica();






// song.play();
//song.pause();







