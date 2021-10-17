'use strict'

function everyLoop(array, test) {
    for(let element of array){
        if(!test(element)) return false
    }
    return true
}

function everySome(array, test){
    return !array.some(element => !test(element));
}

console.log(everyLoop([1, 3, 5], n => n < 10));
// → true
console.log(everyLoop([2, 4, 16], n => n < 10));
// → false
console.log(everyLoop([], n => n < 10));
// → true
