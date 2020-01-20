var playingSound;

document.addEventListener('keydown', playDrum);

function playDrum(key)
{
    if (key.key == "a")
    {
        playingSound = document.getElementById("boomsound");
        playingSound.currentTime = 0;
        playingSound.play();
        playingSound.onplaying = () => {
            boom.style.borderColor = "black"
        };
        playingSound.onpause = () => {
            boom.style.borderColor = "red"
        };
    }
    else if(key.key == "s") 
    {
        playingSound = document.getElementById("clapsound");
        playingSound.currentTime = 0;
        playingSound.play();
        playingSound.onplaying = () => {
            clap.style.borderColor = "black"
        };
        playingSound.onpause = () => {
            clap.style.borderColor = "blue"
        };
    }
    else if(key.key == "d") 
    {
        playingSound = document.getElementById("hihatsound");
        playingSound.currentTime = 0;
        playingSound.play();
        playingSound.onplaying = () => {
            hihat.style.borderColor = "black"
        };
        playingSound.onpause = () => {
            hihat.style.borderColor = "orange"
        };
    }
    else if(key.key == "f") 
    {
        playingSound = document.getElementById("kicksound");
        playingSound.currentTime = 0;
        playingSound.play();
        playingSound.onplaying = () => {
            kick.style.borderColor = "black"
        };
        playingSound.onpause = () => {
            kick.style.borderColor = "green"
        };
    }
};