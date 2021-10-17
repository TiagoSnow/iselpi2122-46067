'use strict'

function loop(i, test, update, fn){
    while(test(i)){
        fn(i)
        i = update(i)
    } 
}

loop(3, n => n > 0, n => n - 1, console.log);