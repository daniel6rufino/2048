
var board;
var score = 0;
var rows = 4;
var cols = 4;

window.onload = function(){
    setGame();
}

function setGame(){
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    // board = [
    //     [2, 2, 2, 2],
    //     [2, 2, 2, 2],
    //     [4, 4, 8, 8],
    //     [4, 4, 8, 8]
    // ]

    for(let r = 0; r < rows; r++){
        for(let c = 0; c < rows; c++){

            let bloco = document.createElement("div");
            bloco.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            trocarBloco(bloco, num);
            document.getElementById("board").append(bloco);
        }
    }

    setTwo();
    setTwo();
}

function TemVazio(){
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < cols; c++){
            if(board[r][c] == 0){
                return true;
            }
        }
    }
    return false;
}

function setTwo() {
    if(!TemVazio()) {
        return;
    }

    let found = false;
    while(!found){
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * cols);

        if(board[r][c] == 0){
            board[r][c] = 2;
            let bloco = document.getElementById(r.toString() +"-"+ c.toString());
            bloco.innerText = "2";
            bloco.classList.add("b2");
            found = true;
        }
    }
}

function trocarBloco(bloco, num){
    bloco.innerText = ""; //limpar conteudo
    bloco.classList.value = ""; //evitar multiplas classes
    bloco.classList.add("bloco")
    if(num > 0) {
        bloco.innerText = num;
        if(num <= 4096){
            bloco.classList.add("b"+num.toString());
        } else {
            bloco.classList.add("b8192");
        }
    }
}

document.addEventListener("keyup", (e) => {
    if(e.code == "ArrowLeft") {
        slideLeft();
        setTwo();
    } else if(e.code == "ArrowRight"){
        slideRight();
        setTwo();
    } else if(e.code == "ArrowUp"){
        slideUp();
        setTwo();
    } else if(e.code == "ArrowDown"){
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score;
})

function filtrarZeros(row){
    return row.filter(num => num != 0); //um vetor sem os zeros
}

function slide(row){
    row = filtrarZeros(row); //sem zeros

    for(let i = 0; i < row.length; i++){
        if(row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    }

    row = filtrarZeros(row);

    while(row.length < cols){
        row.push(0);
    }

    return row;
}

function slideLeft(){ // tirar zeros - mesclar blocos - tirar zeros - mover - recolocar zeros
    for(let r = 0; r < rows; r ++){
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for(let c = 0; c < cols; c++){
            let bloco = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            trocarBloco(bloco, num);
        }
    }
}

function slideRight(){ // inverter - silde - inverter
    for(let r = 0; r < rows; r ++){
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for(let c = 0; c < cols; c++){
            let bloco = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            trocarBloco(bloco, num);
        }
    }
}

function slideUp(){ //criar uma nova row para a column
    for(let c = 0; c < cols; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

        for(let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let bloco = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            trocarBloco(bloco, num);
        }
    }
}

function slideDown(){
    for(let c = 0; c < cols; c++){ //inverter - slide - inverter
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        // board[0][c] = row[3];
        // board[1][c] = row[2];
        // board[2][c] = row[1];
        // board[3][c] = row[0];

        for(let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let bloco = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            trocarBloco(bloco, num);
        }
    }
}