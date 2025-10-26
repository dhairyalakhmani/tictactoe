const boardElem = document.getElementById('board')
const messageElem = document.getElementById('message')
const scoreXElem = document.getElementById('scoreX')
const scoreOElem = document.getElementById('scoreO')

let board, currentPlayer, gameMode, gameActive
let scoreX=0, scoreO=0

// start a game
function startGame(mode){
   board = Array(9).fill(null)   // empty grid
   currentPlayer = 'X' // X go first
   gameMode = mode
   gameActive = true
   messageElem.textContent = currentPlayer + " turn"
   renderBoard()
}

// make the grid appear
function renderBoard(){
   boardElem.innerHTML = ''
   board.forEach((c, i)=>{
      let div = document.createElement('div')
      div.classList.add('cell')
      div.textContent = c || ''
      div.addEventListener('click', ()=> makeMove(i))
      boardElem.appendChild(div)
   })
}

// handle a turn
function makeMove(i){
   if(!gameActive || board[i]) return
   board[i] = currentPlayer
   renderBoard()

   if(checkWinner()){
      endGame(currentPlayer + " won!")
      updateScore(currentPlayer)
      return
   }

   if(board.every(c=>c)){
      endGame("draw :(")
      return
   }

   // switch
   currentPlayer = currentPlayer==='X' ? 'O' : 'X'
   messageElem.textContent = currentPlayer + " turn"

   // bot plays
   if(gameMode==='single' && currentPlayer==='O'){
      setTimeout(computerMove,400)
   }
}

// random bot
function computerMove(){
   let empty = board.map((v,i)=> v? null:i).filter(v=>v!==null)
   let rand = empty[Math.floor(Math.random()*empty.length)]
   makeMove(rand)
}

// check win
function checkWinner(){
   let wins = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
   ]
   return wins.some(p=> p.every(i=> board[i]===currentPlayer))
}

function endGame(msg){
   gameActive=false
   messageElem.textContent=msg
}

// add score
function updateScore(winner){
   if(winner==='X'){
      scoreX++
      scoreXElem.textContent=scoreX
   } else {
      scoreO++
      scoreOElem.textContent=scoreO
   }
}

// reset score board
function resetScores(){
   scoreX=0; scoreO=0
   scoreXElem.textContent=0
   scoreOElem.textContent=0
   messageElem.textContent="scores cleared, choose mode"
   boardElem.innerHTML=''
}