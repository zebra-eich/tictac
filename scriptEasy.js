let comp = new Array();
let player = new Array();
const wins = [ 
    [11,12,13,14], [21,22,23,24], [31,32,33,34], [41,42,43,44],
     [11,21,31,41], [12,22,32,42], [13,23,33,43], [14,24,34,44],
     [14,23,32,41], [11,22,33,44]
 ];

function playerMove(obj){
    makeMove(obj, player);
}

function makeMove(obj, moves) {
    obj.setAttribute("disabled", 'disabled');
    if(moves == player){
        obj.setAttribute("class", "player");
        obj.value = "X";
    }
    else{
        obj.setAttribute("class", "comp");
        obj.value = "O"
    }
    
    moves.push(Number(obj.id));
    if(isWin(moves)){
        if(moves == player){
            alert("Congratulations you have won!!");
            disabledBoard();
        }
        else if (moves==comp){
            alert("The computer wins!!");
            disabledBoard();
        }
		else{
			alert("Tie!!");
			disabledBoard();
		}
    }
    else if (moves == player){
        setTimeout(function(){ compMove(); }, 100);//delay comp move so player can see comp move easier
    }
}


function compMove() {
    let move;
    let elements = document.getElementsByClassName("fill");

    /* ===== All Possible Moves Comp can make =====*/
    let possibleMoves = new Array();
    for (let i=0; i<elements.length; i++){
        possibleMoves.push(Number(elements[i].id));
    }

    /* ===== Win on next move if possible ===== */
    let temp = Array.from(comp);
    if (temp.length >= 4 ){
        temp.shift();
    }
    if(temp.length == 3){
        for(let i=0; i<possibleMoves.length; i++){
            temp.push(possibleMoves[i]);//tries all possible moves
            if(isWin(temp)){
                move = possibleMoves[i];//computer moves to win if possible in one move
                break;
            }
            else{
                temp.pop();//removes possible move that doesnt win
            }
        }
    }

    /* ===== Block player from winning on next move ===== */
    if (move == null){
        temp = Array.from(player);
        if (temp.length >= 4){
            temp.shift();
        }
        if (temp.length == 3){
            for(let i=1; i<possibleMoves.length; i++){
                temp.push(possibleMoves[i]);//tries all possible moves
                if(isWin(temp)){
                    temp.pop();//computer blocks player if player is about to win
                    break;
                }
                else{
                    temp.pop();//removes possible move that doesnt block win
                }
            }
        }
    }

    if (move == null){
        move = possibleMoves[Math.floor(Math.random())];//pick randomly from list
    }
    let obj = document.getElementById(move);

    makeMove(obj, comp);
}


function isWin(moves) {
    if (moves.length >= 4){
        for (let i = 0; i<10; i++){
            if (wins[i].every(val => moves.includes(val))){
                return true;
            }
        }
    }
    return false;
}



function disabledBoard(){
    let elements = document.getElementsByTagName("input");
    for (let i = 0; i < elements.length; i++) {
        elements[i].disabled =true;
      }

}

function reset(){
    if(confirm("Are you sure you want to reset the board?")){
        location.reload();
    }
}