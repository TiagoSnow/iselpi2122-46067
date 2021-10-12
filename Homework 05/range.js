'use strict'

function range(start, end, step){
	let sequence = []
	let numElem = Math.round(Math.abs((start - end) / step)) + 1  
    console.log(numElem)
    for(let i = 0; i < numElem; i++){
        sequence.push(start)
        start+=step
    }
	return sequence
}

console.log(range(5, 2, -1));

console.log(range(5, 20, 3));

