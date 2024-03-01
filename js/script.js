
// below code changes the color theme and the sun/moon SVG.
//also does hamburger menu logic 
let isOriginalState = true;
let theme = "";
var retrivedTheme = localStorage.getItem('theme');
var isDarkThemeEnabled = localStorage.getItem('isDarkThemeEnabled')

document.addEventListener("DOMContentLoaded", function() {

    
    hamburger_menu();
    switch_colors();
    toggleSVG();
    trippyButton();


});

// Define toggleSVG outside the DOMContentLoaded event
function toggleSVG() {
    const alternateSVGContent = altSVGContent;
    const originalSVGContent = ogSVGContent;
    const svgContainer = document.getElementById('svgID');

    // Toggle between original and alternate SVG content
    const newSVGContent = isOriginalState ? alternateSVGContent : originalSVGContent;

    // Update the SVG content
    svgContainer.innerHTML = newSVGContent;

    // Toggle the state flag
    isOriginalState = !isOriginalState;
    
}

function trippyButton() {
    // button click audio for light/dark 
    const color_toggle = document.querySelector("#svgNav");
    const audio = new Audio();
    audio.src = "./audio/button.mp3";

    color_toggle.addEventListener("click", () => {
        audio.play();
    });

    // button click audio for light/dark 
    const trippy_toggle = document.querySelector(".nav-bar-play");
    const trippy_toggle_mobile = document.querySelector(".nav-bar-play-mobile");
    const trippy_background = document.querySelector("body");
    const trippy_audio = new Audio();
    trippy_audio.src = "./audio/carti_beat.mp3";

    let isTrippyOn = localStorage.getItem('isTrippyOn') === 'true'; // Retrieve from localStorage
    updateTrippyState(); // Call the function to set the initial state

    function updateTrippyState() {
        if (isTrippyOn) {
            trippy_audio.play();
            trippy_background.style.backgroundImage = "url('../images/trippy.gif')";
        } else {
            trippy_audio.pause();
            trippy_background.style.backgroundImage = "none";
        }
    }

    trippy_toggle.addEventListener("click", () => {
        isTrippyOn = !isTrippyOn; // Toggle the state
        localStorage.setItem('isTrippyOn', isTrippyOn); // Save to localStorage
        updateTrippyState(); // Update the state
    });

    trippy_toggle_mobile.addEventListener("click", () => {
        isTrippyOn = !isTrippyOn; // Toggle the state
        localStorage.setItem('isTrippyOn', isTrippyOn); // Save to localStorage
        updateTrippyState(); // Update the state
    });
}

function switch_colors() {
    if(retrivedTheme == "light") {
        if(theme == "light") {
            theme = "dark";
        } else {
            theme = "light";
        }
        switch_theme();
    }
    
    const switch_color = document.querySelector(".switch-color");
    switch_color.addEventListener("click", () => {
        if(theme == "light") {
            theme = "dark";
        } else {
            theme = "light";
        }

        const isDarkThemeEnabled = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', theme);
        var retrivedTheme = localStorage.getItem('theme');
        localStorage.setItem('isDarkThemeEnabled', isDarkThemeEnabled);

        switch_theme();
 
    });
}


function switch_theme() {
    document.body.classList.toggle('light-theme');
        document.body.querySelectorAll('*').forEach(div => {
            div.classList.toggle('light-theme');
        });
    toggleSVG();
}

function hamburger_menu() {
    const hamburger = document.querySelector(".hamburger");
    const navmenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navmenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener(
        "click", () => {
            hamburger.classList.remove("active");
            navmenu.classList.remove("active");
        }
    ));
}

