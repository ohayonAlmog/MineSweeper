'use strict'

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function getTime() {
    return new Date().toString().split(' ')[4];
}


function countMineNegs(cellI, cellJ, mat) {
    var mineNegsCount = 0

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue
            if (i === cellI && j === cellJ) continue
            if (mat[i][j].isMine === true) mineNegsCount++
            //if (mat[i][j]) negsCount++
        }
    }
    return mineNegsCount
}

function expandShown(cellI, cellJ, currCell) {

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {

            if (j < 0 || j >= gBoard[i].length) continue
            if(gBoard[i][j].isShown) continue

            if(gBoard[i][j].minesAroundCount !== 0) {
                var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
                elCell.innerText = gBoard[i][j].minesAroundCount
                if(gIsDarkMode) elCell.style.background = '#333333'
                else elCell.style.background = '#D0C9C0'
                gBoard[i][j].isShown = true

                if(gBoard[i][j].isMarked){
                    gLevel.FLAGS++
                    updateFlags()
                }
            }
        }
    }
}

/*function showNegs(currCell, cellI, cellJ){

    if(gIsHint){
        if(currCell.isMine){
            currCell.innerText = MINE
        }else currCell.innerText = gBoard[cellI][cellJ].minesAroundCount
    }else currCell.innerText = ' '
    
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {

            if (j < 0 || j >= gBoard[i].length) continue
            else if(gBoard[i][j].isShown) continue
            else if(gIsHint){
                var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
                if(gBoard[i][j].isMine){
                    elCell.innerText = MINE
                }else elCell.innerText = gBoard[i][j].minesAroundCount
            }else{
                var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
                elCell.innerText = ' '
            }
        }
    }

}*/


function showNegs(currCell, cellI, cellJ){

    var counter = 0
    
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {

            if (j < 0 || j >= gBoard[i].length) continue
            else if(gBoard[i][j].isShown) continue
            
            var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
            if(gBoard[i][j].isMine){
                elCell.innerText = MINE
            }else elCell.innerText = gBoard[i][j].minesAroundCount

            gCellsOff[counter] = elCell
            counter++
            
        }
    }
}

function cellsoff(){

    for (var i = 0; i < gCellsOff.length; i++) {
        gCellsOff[i].innerText = ' '
    }

    gCellsOff = []
}

function showHints(){
    gIsHint = false

    var elHint1 = document.querySelector('.hint1')
    elHint1.innerText = '💡'

    var elHint2 = document.querySelector('.hint2')
    elHint2.innerText = '💡'

    var elHint3 = document.querySelector('.hint3')
    elHint3.innerText = '💡'
}

function unclickableCells(){
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
            elCell.style.pointerEvents = 'none';
        }
        
    }
}



