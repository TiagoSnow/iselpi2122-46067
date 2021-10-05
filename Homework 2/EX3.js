'use strict'

function chessboard(width, length){
    let base = '# '
    let count = 0
    while(length){
        let line = ''
        if(count % 2 != 0) line = ' '
        for(let w = width; w; w-- ) line = line + base
        console.log(line)
        length--
        count++
    }
}
chessboard(4, 8)