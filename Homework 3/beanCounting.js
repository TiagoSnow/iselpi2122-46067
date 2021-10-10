'use strict'

function countChar(word, letter = 'B'){
    let count = 0
    for(let i = 0; i<word.length; i++){
        if(word[i] == letter) count++
    }
    return count
}

console.log(countChar("BBC"));
// → 2
console.log(countChar("kakkerlak", "k"));
// → 4