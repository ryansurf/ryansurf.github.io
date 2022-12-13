const loader = document.querySelector('.loader');
const main = document.querySelector('.main');
const body = document.querySelector('.body');

function init(){
    setTimeout(() => {
        loader.style.opacity = 0;
        loader.style.display = 'none';
 
        main.style.display = 'block';
        (function(){
            function onReady() {
              document.body.classList.remove('no-scroll');
            }
            
            if ( document.readyState === 'complete' ) {
               onReady();
            } else {
               document.addEventListener('DOMContentLoaded', onReady);
            }
         })();
        setTimeout(() => main.style.opacity = 1, 50);
    }, 4000)
}

init();
