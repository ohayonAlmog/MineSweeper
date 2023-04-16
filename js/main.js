'use strict'

const FLAG = '🚩'
const MINE = '💣'

// The Model
var gBoard

var gLevel = {SIZE: 4, MINES: 2, FLAGS: 2}
var gLife = 3
var gIsHint = false
var gStartTime = new Date().getTime()
var gStartClicking = 0
var gInterval
var gCellsOff = []
var gIsDarkMode = false
var gMegaHint = 0
var gIMega
var gJMega
var gSafeClick = 3

function onInit() {

    //timer reset
    clearInterval(gInterval)
    gStartClicking = 0
    var elTime = document.querySelector('.time')
    elTime.innerText = `0:0:0`

    //life reset
    gLife = 3
    var elLife = document.querySelector('.life')
    elLife.innerText = '❤❤❤'

    //flags and hints reset
    updateFlags()
    showHints()

    gBoard = buildBoard()
    renderBoard(gBoard)

    if(gIsDarkMode) darkMode()

    var elMega = document.querySelector('.mega')
    elMega.style.pointerEvents = 'auto';

    gSafeClick = 3
    console.log(gBoard)

    //var elCells = document.querySelector('.occupied')
    //elCells.style.pointerEvents = "auto";
    
}

//Builds the board
function buildBoard() {
    
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = { minesAroundCount: 0, isShown: false, isMine: false, isMarked: false };
        }
    }

    var randNotDoubled = [{i: -1, j:-1}] //Array of objects
    
    check: for (var i = 0; i < gLevel.MINES; i++) {

        var rndI = getRandomInclusive(0, gLevel.SIZE - 1)
        var rndJ = getRandomInclusive(0, gLevel.SIZE - 1)

        for (var j = 0; j < randNotDoubled.length; j++) { //There were some cases that the random i & j were the same so this 'for' loop was created for prevention
            if(randNotDoubled[j].i === rndI && randNotDoubled[j].j === rndJ){
                i--
                continue check;
            }
            
        }

        randNotDoubled[i] = {i: rndI, j: rndJ};

        board[rndI][rndJ].innerText = MINE //רק עוזר לי לעקוב, אפשר למחוק אחכ
        board[rndI][rndJ].isMine = true
    }

    setMinesNegsCount(board)

    console.log('board', board) //רק עוזר לי לעקוב, אפשר למחוק אחכ
    return board;
}

//Renders the board
function renderBoard(board) {
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            var className = (currCell) ? 'occupied' : ''
            strHTML += `<td class="${className}"
            data-i="${i}" data-j="${j}" oncontextmenu="onCellMarked(this,${i},${j})" onmousedown="mouseRemoved()" onmouseup="mouseReleased()"
            onclick="onCellClicked(this,${i},${j})"></td>`
        }
        strHTML += '</tr>\n'
    }
    console.log(strHTML)
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

//Counts the mines that are neighbours
function setMinesNegsCount(board){
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j].minesAroundCount = countMineNegs(i, j, board) // countMineNegs > util.js
        }
    }
}

//When the cell is clicked
function onCellClicked(elCell, i, j){  

    if(gMegaHint){
        console.log('IM IN THE IF Of MEGa CLICK')
        switch(gMegaHint) {
            case 1:
                console.log('IM IN case 1')
                makeMegaHint(gIMega, gJMega, i, j)
                setTimeout(cellsoff, 2000);
                gMegaHint--
              break;
            case 2:
                console.log('IM IN case 2')
                gIMega = i
                gJMega = j 
                gMegaHint--
              break;
        }
        return
    }

    if(!gStartClicking){//timer starts when gStartClicking = 0 (when the first cell was clicked)
        gStartTime = new Date().getTime()
        timer()
    }
    gStartClicking++

    if(gIsHint && !gBoard[i][j].isShown){//After the user clicked on the hint button
        showNegs(elCell, i, j)
        setTimeout(cellsoff, 1000);
        gIsHint = false
        return
    }

    if(gBoard[i][j].isShown) return

    if(gBoard[i][j].isMarked) return
       /* gLevel.FLAGS++
        gBoard[i][j].isMarked = false
        updateFlags()*/
    

    var elLife = document.querySelector('.life')
    
    if(gBoard[i][j].isMine){
        
        elCell.innerText = MINE
        if(gIsDarkMode) elCell.style.background = '#333333'
        else elCell.style.background = '#D0C9C0'
        gBoard[i][j].isShown = true
        
        mineMouse()
        
        gLife--

        switch (gLife) {
            case 0:
                //var elCells = document.querySelector('.occupied')
                //console.log(elCells)
                //elCells.style.pointerEvents = 'none';
                elLife.innerText = 'Game Over';
                
                clearInterval(gInterval)
                showAllMines()
                unclickableCells()
                //pauseGame()
                //gameOver();
                break;
            case 1:
                elLife.innerText = '❤';
                break;
            case 2:
                elLife.innerText = '❤❤';
                break;
        }
    }else if(gBoard[i][j].minesAroundCount === 0){
            showAllZeros(elCell, i, j)

        }else {
            elCell.innerText = gBoard[i][j].minesAroundCount
            if(gIsDarkMode) elCell.style.background = '#333333'
            else elCell.style.background = '#D0C9C0'
            gBoard[i][j].isShown = true
        }
    

    console.log(gBoard)

    checkGameOver()

}

function onCellMarked(elCell, i, j){
    if(gBoard[i][j].isShown && !gBoard[i][j].isMine) return
    if(gBoard[i][j].isMarked){
        if(gBoard[i][j].isShown && gBoard[i][j].isMine) elCell.innerText = MINE
        else if((gBoard[i][j].isShown && !gBoard[i][j].isMine)) elCell.innerText = gBoard[i][j].minesAroundCount
        else elCell.innerText = ' '
        gBoard[i][j].isMarked = false
        
        gLevel.FLAGS++
        updateFlags()
        return
    }else if(gLevel.FLAGS){
        elCell.innerText = FLAG

        gLevel.FLAGS--
        gBoard[i][j].isMarked = true
        updateFlags()
        
        checkGameOver()
    } 
}

function checkGameOver(){

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {

            if(!gBoard[i][j].isMine && !gBoard[i][j].isShown) return false
        
            if(gBoard[i][j].isMine && !gBoard[i][j].isMarked) return false
            
        }
    }
    
    openModal()
    return true
}




