"use strict";

const dino = document.getElementById("dino");
const rock = document.getElementById("rock");
const score = document.getElementById("score");
const button = document.getElementById("button");

let counter = 0;
let timeout;
let timer_on = 0;


function timedCount() {
    document.getElementById("score").innerHTML = counter;
    counter++;
    timeout = setTimeout(timedCount, 1000);
  }

function startCount () {
    if (!timer_on) {
        timer_on = 1;
        timedCount();
    }
}

function jump() {
    dino.classList.add("jump-animation");
    setTimeout(() => {
        dino.classList.remove("jump-animation");
    }, 500);
}


document.addEventListener("keypress", () => {
    if (!dino.classList.contains("jump-animation")) {
        jump();
    }
    jump();
})

function rockSlide() {
    rock.classList.add("rock-animation");
}

button.addEventListener("click", () => {
    rockSlide();
});




// COLLISION CODE // 
function nameStorage() {
    let newName = prompt("Game over! Your score was: " + score.innerHTML + "\n\nWrite your name"); // stores the players name in a variable
    const player = getPlayer(newName); // 
    let newScore = Number(score.innerHTML);
    location.reload();
    // localStorage.setItem(newName, score.innerHTML);
    player.newScore = Number(player.newScore || 0) + newScore;
    localStorage.setItem('hiscores', JSON.stringify([player]));
}

/* 
1. Find the existing players index. 
2. Replace item in the index, with the updated score. 
3. Send in setItem, for all of the players. 
*/

function getPlayer (newName) {
    const hiscores = JSON.parse(localStorage.getItem('hiscores')) || [];
    const player = hiscores.find(item => item.newName === newName);
    if(!player) { 
    return {newName, newScore: 0}
}  
return player;
}


function collision() {
    const dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    const rockLeft = parseInt(window.getComputedStyle(rock).getPropertyValue("left"));
    if (rockLeft < 50 && rockLeft > 0 && dinoTop > 150 ) {
        nameStorage();
    }
}

setInterval(() => {
        collision();
}, 50); 


