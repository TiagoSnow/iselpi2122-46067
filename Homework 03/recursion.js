'use strict'

function isEven(x){
    return x < 2 ? 
        x % 2 == 0 
        : isEven(x-2)
}


console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
// → ??
console.log(isEven(-22));
// → ??
console.log(isEven(1));
// → ??