'use strict'

function countChar(word, letter = 'B'){
    let count = 0
    for(let i = 0; i<word.length; i++){
        if(word[i] == letter) count++
    }
    return count
}

function countCharRec(word, letter){
    return word.length == 0 || word == null || word[0] != letter ? 
        0 : 1 + countCharRec(word.substring(1, word.length), letter)
}

console.log(countCharRec("BBC", "B"));
// → 2
console.log(countCharRec("kakkerlak", "k"));
// → 4