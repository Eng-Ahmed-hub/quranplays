
let audio = document.querySelector('.quranPplayer');
let surahasContainer = document.querySelector('.surahs');
let ayah = document.querySelector('.ayah');
let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let play = document.querySelector('.play');
getSurahas();
function getSurahas(){
     fetch("https://api.quran.sutanlab.id/surah")
     .then(response => response.json())
     .then(data=>{
        for(let suraha in data.data){
            surahasContainer.innerHTML +=
            `
              <div>
                 <p>${data.data[suraha].name.long}</p>
                 <p>${data.data[suraha].name.transliteration.en}</p>
                 
              </div>  
            `
        }
          // celect all surahas 

         let allSurahas = document.querySelectorAll('.surahs div');
         let ayahsAduios ;
         let ayahstext ;
         allSurahas.forEach((surah , index)=>{
            surah.addEventListener('click',()=>{
                fetch(`https://api.quran.sutanlab.id/surah/${index + 1}`)
                .then(response => response.json())
                .then(data=>{
                    let verses = data.data.verses;
                    ayahsAduios = [];
                    ayahstext = [];
                    verses.forEach(verse=>{
                        ayahsAduios.push(verse.audio.primary);
                        ayahstext.push(verse.text.arab);  
                        
                    })
                     let ayahIndex = 0;
                     changAyaha(ayahIndex);
                     audio.addEventListener('ended',()=>{
                        ayahIndex++;
                        if(ayahIndex < ayahsAduios.length){
                            changAyaha(ayahIndex);
                        }else{
                              
                              ayahIndex = 0;
                              changAyaha(ayahIndex);
                              audio.pause();
                              Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Surah has been ended',
                                showConfirmButton: false,
                                timer: 1500
                              })

                              isPlaying = true ;
                              tangelPlay();
                        }
                        
                     })

                     // hond next and prev 

                     next.addEventListener('click',()=>{
                         ayahIndex < ayahsAduios.length - 1 ? ayahIndex++ : ayahIndex = 0 ;
                         changAyaha(ayahIndex);
                     })

                     prev.addEventListener('click',()=>{
                        ayahIndex == 0 ? ayahIndex = ayahsAduios.length - 1 : ayahIndex-- ;
                        changAyaha(ayahIndex);
                    })

                    // handel play and puse aduoi 

                    let isPlaying = false ;
                    tangelPlay();
                    function tangelPlay(){
                        if(isPlaying){
                            audio.pause();
                            play.innerHTML = `<i class="fas fa-play"></i>`;
                            isPlaying = false;

                        }else{
                            audio.play();
                            play.innerHTML = `<i class="fas fa-pause"></i>`;
                            isPlaying = true ;
                        }
                    }


                    play.addEventListener('click',tangelPlay);
                     function changAyaha(index){

                        audio.src = ayahsAduios[index];
                        ayah.innerHTML = ayahstext[index];
                       

                     }
                     
                })
            })
         })

     })
 
}

