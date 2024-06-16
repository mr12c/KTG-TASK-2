// / / global variables

let user1 = {
    name:"player1",
    score:0,
    isPlaying:true,
    crossOrCircle:1,
    win:0,
    lose:0,
    draw:0,
    id:0,
    move:"O",
    src:"https://hoor72.com/_next/image?url=https%3A%2F%2Fh72.s3.ap-south-1.amazonaws.com%2Fakshay-kumar-phir-hera-pheri-pose.png&w=828&q=75"
}

let user2 = {
    name:"player2",
    score:0,
    isPlaying:true,
    crossOrCircle:2,
    win:0,
    lose:0,
    draw:0,
    id:1,
    move:"X",
    src:"https://i.pinimg.com/236x/a5/1b/b9/a51bb98a21ba07b288961967c5e9464f.jpg"
}

let computer= {
    name:"computer",
    score:0,
    isPlaying:true,
    crossOrCircle:2,
    win:0,
    lose:0,
    draw:0,
    id:2,
    move:"X",
    src:"https://static.toiimg.com/thumb/66854738.cms?resizemode=4&width=400"
}
let move = true;
let data = [];

let gridSize= 0;
let content= document.querySelector(".content")
const choice  = document.createElement("div")
choice.setAttribute("class", "choice-container");

let currentwinner = 0;
let whoIsPlaying = [user1 , user2]
const gameBoard = document.createElement("div");
const winnerContainer = document.getElementById("result-container")

let usercontainer1= document.getElementById('user-container1')
let usercontainer2= document.getElementById('user-container2')
// ////////////////////////////////////
//  random choice generator
const winnerCard = document.createElement("div");

let showWinner = (winner)=>{
       
       
       document.getElementById("player-name").innerHTML = winner.name;
       document.getElementById("player-avatar").src = winner.src;
       winnerContainer.classList.remove("invisible")
       winnerContainer.classList.add("visible")
       setTimeout(() => {
         winnerContainer.classList.remove("visible");
         winnerContainer.classList.add("invisible")
       }, 2000);

}

function randomNotEqualTo(n, min, max) {
    let rand;
    do {
        rand = Math.floor(Math.random() * (max- min + 1)) + min;
    } while (rand === n);

    return rand;
}

// Example usage
console.log(randomNotEqualTo(50, 0, 100));
// 
// function  for checking no of non empty cells;
const noOfNonFilledcells=(size)=>{
    let noOfNonFilledcells = size*size;
   for(let i=0;i<size;i++){
    for(let j=0;j<size;j++){
        if(data[i][j]==="X" || data[i][j]==="O"){
            noOfNonFilledcells--;
        }
    }
   }
    return noOfNonFilledcells;
}

// function for rendering userdetails 
let renderUserData =  (player1,player2) =>{
  
     

    
       usercontainer1.innerHTML=` <div class="user-card  w-[100%]  flex justify-center flex-col items-center  rounded-3xl p-2 " style="
  box-shadow: 0px 5px 10px 0px rgba(0,255,255,0.7);transition:all linear 0.4s">
       <div ><img src=${player1.src} class="w-[4rem] h-[4rem] rounded-full" alt=""></div>
        <div class="username1 text-center     mt-[24%] " >player</div>
         <div class="text-[white] text-center  username2">${player1.name}</div>
       <div class="text-[yellow] text-[1.9rem] " >O</div>
  </div>`
     
        usercontainer2.innerHTML=` <div class="user-card w-[100%] text-center flex justify-center flex-col items-center  rounded-3xl p-2">
       <div><img src=${player2.src} class="w-[4rem] h-[4rem] rounded-full " alt=""></div>
        <div class="username1   mt-[20%]" >player</div>
         <div class="text-[white] username2">${player2.name}</div>
       <div class="text-[#37ff00] text-[1.9rem] " >X</div>
  </div>`
  
     

}

//  //////////////////////////////////////////
// function for playing with computer
const computerTurn = (size) => {
    const cells = gameBoard.children;

    const handlePlayerClick = (e) => {
        const target = e.target;
        if (target.innerHTML === "") {
            target.style.color = "yellow";
            renderResutls()
            target.innerHTML = "O";
            data[Number(target.getAttribute("row"))][Number(target.getAttribute("col"))] = target.innerHTML;

            if (checkWinner(size) === 1) {
                return;
            }

            else{
                makeComputerMove(size);
            }
        } 
        else {
            alert("This cell is already filled");
        }

        console.log(data);
    };

    const makeComputerMove = (size) => {
        if(noOfNonFilledcells(size)===1 && size%2!=0){
            return;
        }
        let foundEmptyCell = false;
        while (!foundEmptyCell) {
            const rand = randomNotEqualTo(0, 0, size * size - 1);
            if (cells[rand].innerHTML === "") {
                cells[rand].style.color = "#8FDD28";
                cells[rand].innerHTML = "X";
                renderResutls()
                data[Number(cells[rand].getAttribute("row"))][Number(cells[rand].getAttribute("col"))] = cells[rand].innerHTML;
                checkWinner(size);
                console.log(data);
                foundEmptyCell = true;
            }
        }
    };

    for (let i = 0; i < size * size; i++) {
        cells[i].addEventListener('click', handlePlayerClick);
    }
};

 

// function for checking winner //////

// const checkWinner = (size)=>{
//    let noOfNonFilledcell=0;
//     for(let i=0;i<size;i++){
//         for(let j=0;j<size;j++){
//              if(data[i][j]=="X" || data[i][j]=="O"){
//                 noOfNonFilledcell++;
//              }
//         }
//     }
//     if(noOfNonFilledcell==size*size){
        
//         setTimeout(()=>{
//             alert("draw")
//             resetGame(size)
//         },[100])
//         return 3;
//     }
    

//     let coulmn1=0;
//     let coulmn2=0; 
//     for(let i=0;i<size;i++){
//         for(let j=0;j<size;j++){
//              if(data[j][i]=="X"){
//                 coulmn1++;
//              }
//              if(data[j][i]=="O"){
//                 coulmn2++;
//              }
//         }
//         if(coulmn1==size){
//             setTimeout(()=>{
//                 alert("player 2 wins")
//                 resetGame(size)
//             },[100])
//             return 1;
//         }
//         else if(coulmn2==size){
//             setTimeout(()=>{
//                 alert("player 1 wins")
//                 resetGame(size)
//             },[100])
//             return 1;
//         }
//     }



     
//     let counterdiagonal1=0;
//     let counterdiagonal2=0;


//     for(let i=0;i<size;i++){
        
//         for(let j=0;j<size;j++){
//             if(data[i][j]=="X" && i+j==size-1){
//                counterdiagonal1++;
//             }
//             if(data[i][j]=="O" && i+j==size-1){
//                 counterdiagonal2++;
//             }
//         }
//         if(counterdiagonal1==size){
//             setTimeout(()=>{
//                 alert("player 2 wins")
//                 resetGame(size)
//             },[100])
//             return 1;
//         }
//         else if(counterdiagonal2==size){
//             setTimeout(()=>{
//                 alert("player 1 wins")
//                 resetGame(size)
//             },[100])
//             return 1;
//         }
//     }



//     for(let i=0;i<size;i++){
       
//       let count=0;
//       for(let j=0;j<size;j++){

//           if(data[i][j]=="X"){
//               count++;
//               continue;
              

//           }
//           else{
//               break;
//           }
          
//       }
//       if(count==size){
//             setTimeout(()=>{
//                 alert("player 2 wins")
//                 resetGame(size)
//             },[100])
//            return 1;
//       }
//     }
//     let count1=0;
//     let count2=0;
//     for(let i=0;i<size;i++){
        
//         if(data[i][i]=="X"){
//             count1++;
//         }
//         if(data[i][i]=="O"){
//             count2++;
//         }
//         if(count1==size){
//             setTimeout(()=>{
//                 alert("player 2 wins");
//                 resetGame(size)
//             },[100])
//             return 1;
//         }
//         else if(count2==size){
//             setTimeout(()=>{
//                 alert("player 1 wins")
//                 resetGame(size)
//             },[100])
//             return 1
//         }
//     }

//     for(let i=0;i<size;i++){
//         let count=0;
//         for(let j=0;j<size;j++){
  
//             if(data[i][j]=="O"){
//                 count++;
//                 continue;
                
  
//             }
//             else{
//                 break;
//             }
            
//         }
//         if(count==size){
//               setTimeout(()=>{
//                   alert("player 1 wins")
//                   resetGame(size)
//               },[100])
//              return 1;
//         }
//       }



    
// }
const checkWinner = (size) => {
   

    // Check columns
    for (let col = 0; col < size; col++) {
        let colXCount = 0;
        let colOCount = 0;
        for (let row = 0; row < size; row++) {
            if (data[row][col] == "X") colXCount++;
            if (data[row][col] == "O") colOCount++;
        }
        if (colXCount == size) {
            showWinner(whoIsPlaying[1])
            setTimeout(() => {
                 
                 
                whoIsPlaying.forEach((player,index)=>{
                     player.move==="X"? player.win++ : player.lose++;

               })
                resetGame(size);
            }, 5000);
            return 1;
        }
        if (colOCount == size) {
            showWinner(whoIsPlaying[0])
            setTimeout(() => {
                
                whoIsPlaying.forEach((player,index)=>{
                    player.move==="O"? player.win++ : player.lose++;

              })
                resetGame(size);
            }, 5000);
            return 1;
        }
    }

    // Check main diagonal
    let mainDiagonalXCount = 0;
    let mainDiagonalOCount = 0;
    for (let i = 0; i < size; i++) {
        if (data[i][i] == "X") mainDiagonalXCount++;
        if (data[i][i] == "O") mainDiagonalOCount++;
    }
    if (mainDiagonalXCount == size) {
        setTimeout(() => {
            showWinner(whoIsPlaying[1])
            whoIsPlaying.forEach((player,index)=>{
                player.move==="X"? player.win++ : player.lose++;

          })
            resetGame(size);
        }, 500);
        return 1;
    }
    if (mainDiagonalOCount == size) {
        setTimeout(() => {
            showWinner(whoIsPlaying[0])
            whoIsPlaying.forEach((player,index)=>{
                player.move==="O"? player.win++ : player.lose++;

          })
            resetGame(size);
        }, 500);
        return 1;
    }

    // Check anti-diagonal
    let antiDiagonalXCount = 0;
    let antiDiagonalOCount = 0;
    for (let i = 0; i < size; i++) {
        if (data[i][size - 1 - i] == "X") antiDiagonalXCount++;
        if (data[i][size - 1 - i] == "O") antiDiagonalOCount++;
    }
    if (antiDiagonalXCount == size) {
        setTimeout(() => {
            showWinner(whoIsPlaying[1])
            whoIsPlaying.forEach((player,index)=>{
                player.move==="X"? player.win++ : player.lose++;

          })
            resetGame(size);
        }, 500);
        return 1;
    }
    if (antiDiagonalOCount == size) {
        setTimeout(() => {
            showWinner(whoIsPlaying[0])
            whoIsPlaying.forEach((player,index)=>{
                player.move==="O"? player.win++ : player.lose++;

          })
            resetGame(size);
        }, 500);
        return 1;
    }

    // Check rows
    for (let row = 0; row < size; row++) {
        let rowXCount = 0;
        let rowOCount = 0;
        for (let col = 0; col < size; col++) {
            if (data[row][col] == "X") rowXCount++;
            if (data[row][col] == "O") rowOCount++;
        }
        if (rowXCount == size) {
            setTimeout(() => {
                showWinner(whoIsPlaying[1])
                whoIsPlaying.forEach((player,index)=>{
                    player.move==="X"? player.win++ : player.lose++;

              })
                resetGame(size);
            }, 500);
            return 1;
        }
        if (rowOCount == size) {
            setTimeout(() => {
                showWinner(whoIsPlaying[0])
                whoIsPlaying.forEach((player,index)=>{
                    player.move==="O"? player.win++ : player.lose++;

              })
                resetGame(size);
            }, 500);
            return 1;
        }
    }

    let noOfNonFilledCells = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (data[i][j] == "X" || data[i][j] == "O") {
                noOfNonFilledCells++;
            }
        }
    }

    if (noOfNonFilledCells == size * size) {
        setTimeout(() => {
            alert("It's a draw");
            whoIsPlaying.forEach((player,index)=>{
                 player.draw++;
            })
            resetGame(size);
        }, 100);
        return 3;
    }

    return "No winner yet";
};

// score reset btn

// const scoreResetBtn = document.querySelector('#score-reset-btn');
// scoreResetBtn.addEventListener('click', () => {
//     whoIsPlaying.forEach((player,index)=>{
//         player.win=0;
//         player.lose=0;
//         player.draw=0;
//     })
// })


//  /////////// function -for -rendering -results///////////////////////////
let renderResutls = () =>{
    let table = document.querySelector('.result-container');
    
    

    table.innerHTML=` <div class="container resultcard mx-auto px-4">
                               <div>  <h1 class="font-bold text-[1.4rem] mt-10 text-center" style="color:#3EC5F3">LeaderBoard</h1>  </div>
                                <div class="flex justify-center mt-6">
                                    <div class="w-full max-w-4xl overflow-x-auto">
                                        <table class="min-w-full rounded-lg shadow-md">
                                            <thead>
                                                <tr class="  text-white text-lg leading-normal">
                                                    <th class="py-3 px-6 text-left">Player</th>
                                                    <th class="py-3 px-6 text-center">Wins</th>
                                                    <th class="py-3 px-6 text-center">Losses</th>
                                                    <th class="py-3 px-6 text-center">Draws</th>
                                                </tr>
                                            </thead>
                                            <tbody class="text-lg  ">
                                                <tr>
                                                    <td class="py-3 px-6 text-left text-[1.4rem] font-medium text-indigo-500">Player 1</td>
                                                    <td class="py-3 px-6 text-center text-red-500">${user1.win}</td>
                                                    <td class="py-3 px-6 text-center text-yellow-500">${user1.lose}</td>
                                                    <td class="py-3 px-6 text-center text-green-500">${user1.draw}</td>
                                                </tr>
                                                <tr>
                                                    <td class="py-3 px-6 text-left text-[1.4rem] font-medium text-indigo-500">Player 2</td>
                                                    <td class="py-3 px-6 text-center text-red-500">${user2.win}</td>
                                                    <td class="py-3 px-6 text-center text-yellow-500">${user2.lose}</td>
                                                    <td class="py-3 px-6 text-center text-green-500">${user2.draw}</td>
                                                </tr>
                                                <tr>
                                                    <td class="py-3 px-6 text-left text-[1.4rem] font-medium text-indigo-500">Computer</td>
                                                    <td class="py-3 px-6 text-center text-red-500">${computer.win}</td>
                                                    <td class="py-3 px-6 text-center text-yellow-500">${computer.lose}</td>
                                                    <td class="py-3 px-6 text-center text-green-500">${computer.draw}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>`
       
                            table.classList.remove("invisible")
                            table.classList.add("visible")

                        
     


}

 


// function for defualt state////

 const addImage = () =>{
    let img = document.createElement("img")
    img.id="mylogoimg"
    img.src="i2.png"
    img.className="my-logo-img lg:mt-[5%] mt-[30%]"
    
    content.appendChild(img)

 }
 addImage();
// /renderding choices 
const  renderingChoices = () =>{
     
    choice.style="display:none;"
    choice.innerHTML  = `<p class="choice-header">Enter Details</p>
           
           <div className="bg-white">
               <p class="text-[white] text-[1.2rem] ">Choose Grid Size</p>
               <div class="choices-grid grid grid-cols-3 *px-5 w-[100%] lg:w-[50%] *:text-center gap-2 choices *:bg-white *:rounded-full   *:p-2 *:text-black *:cursor-pointer"> <p id="3">3x3</p> <p id="4">4x4</p> <p id="5">5x5</p> <p id="6">6x6</p> <p id="7">7x7</p> <p id="8">8x8</p></div> 
           </div>
            <div class="flex mt-10  gap-4 lg:*:w-[30%] *:w-[100%]">
            <button id="btn-1p" class=" start-btn hover:scale-[1.02] mx-auto bg-[yellow] text-[white] linearg1 p-2 rounded-full lg:text-[1.4rem] text-[1rem]">Play with human</button>
                <button id="btn-2p" class="  start-btn text-nowrap hover:scale-[1.02] mx-auto bg-[yellow] text-[white] linearg1 p-2 rounded-full lg:text-[1.4rem] text-[1rem]">play with computer</button>
            </div>
            `
 content.appendChild(choice);

 
}

renderingChoices();

//  /////////// function -for -updating -results///////////////////////////
let updateResult=(id,result)=>{

   
      if(result=="win"){
        whoIsPlaying.forEach((user)=>{
            if(user.id==id){
                user[result]++;
            }
            else{
                user.lose++;
            }
        })

      }

         else if(result=="draw"){
        whoIsPlaying.forEach((user)=>{
            user.draw++;
        })
      }
    
}
// 
// announce Result function
let announceResult = (id,result)=>{
    let resultContainer = document.createElement("div");
    resultContainer.classList.add("result-container");
    


}
// function for reseting game

const resetGame = (size)=>{
    for(let i=0;i<size;i++){

        for(let j=0;j<size;j++){
            data[i][j]="";
        }

    }
    usercontainer1.children[0].style="box-shadow:0px 5px 10px 0px rgba(0,255,255,0.7);"
    usercontainer2.children[0].style="box-shadow:none;"

    const gameBoard = document.getElementById('game-board');

Array.from(gameBoard.children).forEach((item) => {
  item.innerHTML = '';
});
move=true
      

    }


// ////////

 
// ///creatin grid on the basis of  choice 
function createTicTacToeGrid(size) {
     
    gameBoard.id= "game-board"
  
    gameBoard.className = `grid w-fit mx-auto  mt-[10%] gap-[3px] grid-cols-${size} *:border-[1px] *:rounded-2xl`;
    gameBoard.innerHTML = '';
    document.querySelector('.content').appendChild(gameBoard);
  
    for (let i = 0; i < size; i++) {
        data[i]=[]
      for (let j= 0; j < size; j++) {
        data[i][j]=""; 
        const cell = document.createElement('div');
        cell.setAttribute("row",i)
        cell.setAttribute("col",j)
        cell.className = 'tttcell  border-gray-300 w-[4rem] h-[4rem] flex items-center justify-center text-[3rem] cursor-pointer';
        gameBoard.appendChild(cell);
        cell.innerHTML="";
      }
    }
     
     
    if(whoIsPlaying[1]==computer){
          computerTurn(size)
    }
    else if(whoIsPlaying[1]==user2){
        for(let i = 0 ; i <size*size; i++) {
            gameBoard.children[i].addEventListener('click',(e)=>{
                if (e.target.innerHTML === "") {  
                    if (move) {
                        e.target.style="color:yellow"
                        e.target.innerHTML = "O";
                        data[Number(e.target.getAttribute("row"))][Number(e.target.getAttribute("col"))] =e.target.innerHTML;
                        checkWinner(gridSize)
                        renderResutls()
    
                    } else {
                        e.target.style="color:#37ff00"
                        e.target.innerHTML = "X";
                        data[Number(e.target.getAttribute("row"))][Number(e.target.getAttribute("col"))] =e.target.innerHTML;
                        checkWinner(gridSize)
                        renderResutls()
    
                    }
                    move = !move;
                    if(move){
                        usercontainer1.children[0].style=" box-shadow: 0px 5px 10px 0px rgba(0,255,255,0.7);"
                        usercontainer2.children[0].style=" box-shadow:none;"
                    }
                    else if(!move){
                         usercontainer1.children[0].style=" box-shadow: none;"
                        usercontainer2.children[0].style=" box-shadow:0px 5px 10px 0px rgba(0,255,255,0.7);"
                    }
                }
                else{
                    alert("this cell is already filled")
                }
    
                 
                console.log(data)
            })
        }

    }
  

  }

  


// /////////////////////////////////////events
let playersCard = document.querySelector(".player-cards");
let startBtn = document.querySelector(".start-btn");
startBtn.addEventListener("click",(e)=>{
    console.log(e)
    console.log(playersCard)
    choice.style="display:block"
    
    content.children[0].style="display:none"
    startBtn.classList.add("invisible");
    document.querySelector(".start-btn-cover").classList.add("invisible");
    
   
    
})


document.querySelector("#btn-1p").addEventListener("click",(e)=>{
    whoIsPlaying = [user1 , user2]
    console.log(e)
    createTicTacToeGrid(gridSize);
    renderUserData(user1,user2);
    renderResutls()
    document.querySelector(".btn-set").classList.remove("invisible");
    document.querySelector(".btn-set").classList.add("visible");
    playersCard.style="opacity:1;margin-top:5%"
    choice.style="display:none"
  
     
})

document.querySelector("#btn-2p").addEventListener("click",(e)=>{
    
    whoIsPlaying= [user1,computer]
    createTicTacToeGrid(gridSize);
    renderUserData(user1,computer);
    renderResutls()
    playersCard.style="opacity:1;margin-top:5%"
    choice.style="display:none"
    document.querySelector(".btn-set").classList.add("visible");
    document.querySelector(".btn-set").classList.remove("invisible");
     


})


for(let i=0;i<6;i++){
    document.querySelector(".choices-grid").children[i].addEventListener("click",(e)=>{
       
       
       gridSize=Number(e.target.id);
       if (e.target.id === String(gridSize)) {
        console.log(e);
        e.target.style.backgroundColor = "rgb(137, 64, 239)";
        e.target.style.color = "white";
    }
     for(let j=0;j<6;j++){
           if(j!=i){
            document.querySelector(".choices-grid").children[j].style.backgroundColor = "white";
        document.querySelector(".choices-grid").children[j].style.color = "black";
           }
     }
    })

}


 

// document.querySelector(".game-board").forEach((item)=>{
//     item.addEventListener("click",(e)=>{
//      console.log(item)
//      console.log(e)
//       if(move){
//          item.innerHTML="0"
//       }
//       else{
//          item.innerHTML="X"
//       }
//       move=!move
//     })
//  })
 


 
 


// function for returning to home page 



document.querySelector("#home-btn").addEventListener("click",(e)=>{
    location.reload();
})

// function for resetting game
let isResetModelVisible = false;
document.querySelector("#reset-btn").addEventListener("click",(e)=>{
   if(!isResetModelVisible){
       document.querySelector("#refresh-model-container").classList.remove("invisible");
       document.querySelector("#refresh-model-container").classList.add("visible");
   }
   else if(isResetModelVisible){
    document.querySelector("#refresh-model-container").classList.add("invisible");
       document.querySelector("#refresh-model-container").classList.remove("visible");
   }
})

document.querySelector("#r2").addEventListener("click",()=>{
    
    document.querySelector("#refresh-model-container").classList.add("invisible");
    document.querySelector("#refresh-model-container").classList.remove("visible");
})

document.querySelector("#r1").addEventListener("click",()=>{
    resetGame(gridSize)
    document.querySelector("#refresh-model-container").classList.add("invisible");
    document.querySelector("#refresh-model-container").classList.remove("visible");
})

// function for checking winner




window.addEventListener("beforeunload",()=>{
    localStorage.setItem("p1", JSON.stringify(user1))
    localStorage.setItem("p2", JSON.stringify(user2))
    localStorage.setItem("c1", JSON.stringify(computer))
})

window.addEventListener("load",()=>{
    user1 = JSON.parse(localStorage.getItem("p1"))
    user2 = JSON.parse(localStorage.getItem("p2"))
    computer = JSON.parse(localStorage.getItem("c1"))
    console.log(user1)
    console.log(user2)
    console.log(computer)
     
})



// score reset btn

const scoreResetBtn = document.querySelector('#reset-score-btn');
scoreResetBtn.addEventListener('click', () => {
    user1.win=0
    user1.lose=0
    user1.draw=0;
    user2.win=0
    user2.lose=0
    user2.draw=0;
    computer.win=0
    computer.lose=0
    computer.draw=0;
    renderResutls()
})
