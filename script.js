console.log('helloo');

let turn = "X";
let music = new Audio("Resources/music.mp3");
let turnAudio = new Audio("Resources/ting.mp3")
let GameOver = new Audio("Resources/gameover.mp3")
let isgameover = false;

//Function to change the user turn
const changeTurn = () => {
    return turn === 'X' ? '0' : 'X';
}

// logic to Check the result
// Function to check for a tie
const CheckTie = () => {
    let boxText = document.querySelectorAll('.textbox');
    for (let i = 0; i < boxText.length; i++) {
        if (boxText[i].innerHTML === '') {
            return false; // If any box is empty, the game is not tied
        }
    }
    return true;
}

// Modify CheckWin function to check for tie as well
const CheckWin = () => {
    let boxText = document.querySelectorAll('.textbox');
    let win = [
        [0, 1, 2, 0, 65, 0],
        [3, 4, 5, 0, 205, 0],
        [6, 7, 8, 0, 340, 0],
        [0, 4, 8, 0, 200, 45],
        [6, 4, 2, 0, 201, 315],
        [0, 3, 6, -140, 200, 90],
        [1, 4, 7, 0, 200, 90],
        [2, 5, 8, 140, 200, 90],
    ];
    win.forEach(e => {
        if ((boxText[e[0]].innerHTML === boxText[e[1]].innerHTML) &&
            (boxText[e[2]].innerHTML === boxText[e[1]].innerHTML) &&
            (boxText[e[0]].innerHTML !== '')) {
            // If conditions met, player wins
            isgameover = true;
            document.querySelector('.Turn-info').innerHTML = `<h1>${boxText[e[0]].innerText} Won</h1>`;
            document.querySelector('.gif').getElementsByTagName('img')[0].style.width = '200px';
            GameOver.play();
            document.querySelector('.line').style.width = '100%';
            document.querySelector('.line').style.transform = `translate(${e[3]}px , ${e[4]}px) rotate(${e[5]}deg)`;
        }
    });

    // Check for a tie
    if (!isgameover && CheckTie()) {
        isgameover = true;
        document.querySelector('.Turn-info').innerHTML = `<h1>It's a Tie!</h1>`;
        GameOver.play();
        document.querySelector('.gif').getElementsByTagName('img')[1].style.width = '200px';
    }
}


//Game Logic
let boxes = document.getElementsByClassName('box');
Array.from(boxes).forEach(element => {
    let boxText = element.querySelector('.textbox');
    element.addEventListener('click', () => {
        if (boxText.innerHTML === '') {
            boxText.innerHTML =turn;
            turn = changeTurn(turn);
            turnAudio.play();
            CheckWin();
            if (!isgameover){
                document.getElementsByClassName("Turn-info")[0].innerHTML = `<h1>Turn for ${turn}</h1>`
            } 
        }
    })
})


//Adding the EventListner to reset button

reset.addEventListener('click',()=>{
    let boxText = document.querySelectorAll('.textbox');
    Array.from(boxText).forEach(element=>{
        element.innerHTML='';
    }) 
    console.log('Reset Button Clicked');
    turn = "X"; 
    isgameover = false
    // document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("Turn-info")[0].innerHTML  =  `<h1>Turn for ${turn}</h1>`
    document.querySelector('.gif').getElementsByTagName('img')[0].style.width = "0px"
    document.querySelector('.gif').getElementsByTagName('img')[1].style.width = "0px"
    document.querySelector('.line').style.width='0';

    });

    //Adding EventLisner to play music button

    let isMusicPlaying = false;

    playM.addEventListener('click', () => {
        if (isMusicPlaying) {
            music.pause();
            playM.innerText = 'Play Music';
        } else {
            playM.style.backgroundColor ='rgb(138, 138, 138)'
            music.play();
            playM.innerText = 'Pause Music';
        }
        isMusicPlaying = !isMusicPlaying; // Toggle the music state
    });
    
    