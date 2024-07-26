let boxes= document.querySelectorAll(".box");
let resetButton=document.querySelector("#reset-btn");
let newGameButton=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turnO= true;//player x, player y
let count=0; // to track a draw

const winPatterns= [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame=()=>{
    turnO=true;
    count=0;
    enableleBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        console.log("Box was clicked!");
        if(turnO){
            //playerO
            box.innerText="O" ;
            turnO=false;
        }else{
            //playerX
            box.innerText="X";
            turnO=true;
        }

        box.disabled=true;
        count++;
        
        let isWinner= checkWinner();

        if(count===9 && !isWinner){
            drawGame();
        }
    });
});

const drawGame=() => {
    msg.innerText=`Oops! Game was a Draw.`  
    msgContainer.classList.remove("hide");
    disableBoxes();
    };

const disableBoxes=() => {
    for(let box of boxes){
        box.disabled= true;
    }
};
const enableleBoxes=() => {
    for(let box of boxes){
        box.disabled= false;
        box.innerText="";
    }
}

const showWinner=(winner) => {
    msg.innerText=`Congratulations!, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner=() => {
    for(let pattern of winPatterns){

        let posValue1= boxes[pattern[0]].innerText;
        let posValue2= boxes[pattern[1]].innerText;
        let posValue3= boxes[pattern[2]].innerText;

        if(posValue1 !="" && posValue2 !="" && posValue3 !=""){
            if(posValue1 === posValue2 && posValue2 === posValue3){
                console.log("Winner!", posValue1);
                showWinner(posValue1);
                return true;
            }
        }
    }
};

newGameButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);   