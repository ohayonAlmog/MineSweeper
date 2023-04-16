function onRestart(){
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'

    gStartClicking = 0

    if(gLevel.SIZE === 4){
        changeLevel('easy')
    }else if(gLevel.SIZE === 8){
        changeLevel('medium')
    }else changeLevel('hard')

}


function showAllZeros(elCell, i, j){
    

    console.log('Get into the showAllZeros')
    //console.log('i ', i)
    //console.log('j ', j)
    if (i < 0 || i > gLevel.SIZE - 1 || j < 0 || j > gLevel.SIZE - 1) return; // check for bounds

        var elNextCell1 = document.querySelector(`[data-i="${i+1}"][data-j="${j}"]`)
        var elNextCell2 = document.querySelector(`[data-i="${i-1}"][data-j="${j}"]`)
        var elNextCell3 = document.querySelector(`[data-i="${i}"][data-j="${j-1}"]`)
        var elNextCell4 = document.querySelector(`[data-i="${i}"][data-j="${j+1}"]`)

        if (gBoard[i][j].minesAroundCount === 0 && !gBoard[i][j].isShown) {
            if(gBoard[i][j].isMarked){
                gLevel.FLAGS++
                updateFlags()
            }
            gBoard[i][j].isShown = true;
            elCell.innerText = ' '
            if(gIsDarkMode) elCell.style.background = '#333333'
            else elCell.style.background = '#D0C9C0'
            expandShown(i, j, elCell)
            showAllZeros(elNextCell1, (i+1), j );
            showAllZeros(elNextCell2, (i-1), j );
            showAllZeros(elNextCell3, i, (j-1) );
            showAllZeros(elNextCell4, i, (j+1) );
        } else {
               return;
           }
}

function changeLevel(str){

    switch(str) {
        case 'easy':
            gLevel.SIZE = 4
            gLevel.MINES = 2
            gLevel.FLAGS = 2
            updateFlags()
            mouseReleased()
            document.documentElement.style.setProperty('--table-width', '200px');
            onInit()
          break;
        case 'medium':
            gLevel.SIZE = 8
            gLevel.MINES = 14
            gLevel.FLAGS = 14
            updateFlags()
            mouseReleased()
            document.documentElement.style.setProperty('--table-width', '400px');
            onInit()
          break;
        case 'hard':
            gLevel.SIZE = 12
            gLevel.MINES = 32
            gLevel.FLAGS = 32
            updateFlags()
            mouseReleased()
            //$(':root').css('--table-width', '595px');
            document.documentElement.style.setProperty('--table-width', '700px');
            onInit()
          break;
        //default: The default is easy by the gVars statement
      }
}

function showAllMines(){
    
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {

            if(gBoard[i][j].isMine) {

                var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
                elCell.innerText = MINE
                elCell.style.background = 'red'

            }
        }
    }

}

function openModal(){
    clearInterval(gInterval)

    //var elCells = document.querySelector('.occupied')
    //elCells.style.pointerEvents = "none";
    unclickableCells()

    var elModal = document.querySelector('.modal')
    elModal.innerText = 'Winner! 😍'
    elModal.style.display = 'block'
}

function mouseRemoved(){
    var elBtn = document.querySelector('.restart')
    elBtn.innerText = '😮'
}

function mouseReleased(){
    var elBtn = document.querySelector('.restart')
    elBtn.innerText = '😁'
}

function movingMouse(){
    var elBtn = document.querySelector('.restart')
    elBtn.innerText = '😈'
}

function mineMouse(){
    var elBtn = document.querySelector('.restart')
    elBtn.innerText = '😫'
}

/*function pauseGame(){
    var elBtn = document.querySelector('.onClick')
    elBtn.pointer = 'none'
}*/

function updateFlags(){
    var elFlag = document.querySelector('h4')
    elFlag.innerText = gLevel.FLAGS + ' ' + FLAG
}

function hint(numOfHint){
    
    switch(numOfHint) {
        case '1':
            var elHint1 = document.querySelector('.hint1')
            if(elHint1.innerText === '✖') return
            elHint1.innerText = '✖'
            gIsHint = true
          break;
        case '2':
            var elHint2 = document.querySelector('.hint2')
            if(elHint2.innerText === '✖') return
            elHint2.innerText = '✖'
            gIsHint = true
          break;
        case '3':
            var elHint3 = document.querySelector('.hint3')
            if(elHint3.innerText === '✖') return
            elHint3.innerText = '✖'
            gIsHint = true
          break;
      }
}

function timer() {

    gInterval = setInterval(()=> {

        // Get todays date and time
        var now = new Date().getTime();
    
        // Find the distance between now an the gStartTime
        var distance = now - gStartTime
    
        // Time calculations for hours, minutes and seconds
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        var elTime = document.querySelector('.time')
        elTime.innerText = `${hours}:${minutes}:${seconds}`

    }, 1000);

}

function darkMode(){
    gIsDarkMode = true

    var elDiv = document.querySelector('.divy')
    elDiv.style.background = 'black'
    elDiv.style.color = 'white'
    elDiv.style.borderColor = 'white'

    var elH1 = document.querySelector('h1')
    elH1.style.background = 'black'
    elH1.style.borderColor = 'white'

    var elH2 = document.querySelector('h2')
    elH2.style.background = 'black'
    elH2.style.borderColor = 'white'

    var elTable = document.querySelector('table')
    elTable.style.background = 'black'

    var elBtn = document.querySelector('button')
    elBtn.style.background = 'white'

    var elBtn1 = document.querySelector('.btn1')
    elBtn1.style.background = 'white'

    var elBtn2 = document.querySelector('.btn2')
    elBtn2.style.background = 'white'

    var elBtn3 = document.querySelector('.btn3')
    elBtn3.style.background = 'white'
    
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {

            var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
            elCell.style.background = 'black'
            elCell.style.borderColor = 'white'
 
        }
    }
    
}

function markMegaHint(){
    gMegaHint = 2
    console.log('Im In Mega Hint Func!')
}

function makeMegaHint(i1, j1, i2, j2){
    var startJ = j1
    var counter = 0

    console.log('Im In makeMegaHint Func!')

    for (i1; i1 <= i2; i1++) {
        console.log('Im In the I LOOP')
        for (j1; j1 <= j2; j1++) {
            console.log('Im In the J LOOP')
            var elCell = document.querySelector(`[data-i="${i1}"][data-j="${j1}"]`)
            console.log(elCell)
            if(gBoard[i1][j1].isShown) continue
            gCellsOff[counter] = elCell
            if(gBoard[i1][j1].isMine) elCell.innerText = MINE
            else elCell.innerText = gBoard[i1][j1].minesAroundCount
            counter++
        }
        
        j1 = startJ
    }

    var elMega = document.querySelector('.mega')
    elMega.style.pointerEvents = 'none';

}

function exterminator(){
    if(gLevel.SIZE === 4){
        alert('This function does not work in Begginers mode')
        return
    }
    var allMines = [{i: -1, j:-1}]
    var counter = 0

    for (var m = 0; m < gBoard.length; m++) {
        for (var n = 0; n < gBoard[m].length; n++) {
            if(gBoard[m][n].isMine){
                //var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
                allMines[counter] = {i: m, j: n};
                counter++
            }
            
        }
    }

    for (var m = 0; m < 3; m++) {
        
        var rndMine = getRandomInclusive(0, allMines.length - 1)
        var elCell = document.querySelector(`[data-i="${allMines[rndMine].i}"][data-j="${allMines[rndMine].j}"]`)

        gBoard[allMines[rndMine].i][allMines[rndMine].j].isMine = false
        gBoard[allMines[rndMine].i][allMines[rndMine].j].innerText = 'Mine Extr' //הערה בשביל שאוכל לעקוב, אפשר למחוק אחכ
        console.log('Ive EX 1 MINE')

        elCell.innerText = MINE

        gCellsOff[m] = elCell

        gLevel.FLAGS--
        
    }

    updateFlags()
    setTimeout(cellsoff, 2000)
    setMinesNegsCount(gBoard)
    console.log(gBoard)
    

}

function safeClick(){
    
    if(!gSafeClick){
        alert('You dont have any more clicks!')
        return
    }

    var allSafes = [{i: -1, j:-1}]
    var counter = 0

    for (var m = 0; m < gBoard.length; m++) {
        for (var n = 0; n < gBoard[m].length; n++) {
            if(!gBoard[m][n].isMine && !gBoard[m][n].isShown){
                //var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
                allSafes[counter] = {i: m, j: n};
                counter++
            }
            
        }
    }

    var rndMine = getRandomInclusive(0, allSafes.length - 1)
    var elCell = document.querySelector(`[data-i="${allSafes[rndMine].i}"][data-j="${allSafes[rndMine].j}"]`)

    gCellsOff[0] = elCell

    elCell.innerText = '✔'

    gSafeClick--

    setTimeout(cellsoff, 2000)
    

}






