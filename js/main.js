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
    }, 2700)
}

init();

// CHANGE TEXT Function
var text = ["Programmer", "Student", "Programmer", "Surfer", "Programmer", "Fisherman", "Programmer", "Backpacker", "Programmer", "Snowboarder"];
var counter = 0;
var elem = document.getElementById("changeText");
var inst = setInterval(change, 1300);

function change() {
  elem.innerHTML = text[counter];
  counter++;
  if (counter >= text.length) {
    counter = 0;
    // clearInterval(inst); // uncomment this if you want to stop refreshing after one cycle
  }
}

