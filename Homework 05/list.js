'use strict'

function arrayToList(arr){
    function createNode(idx){
        let head = null
        if(idx==arr.length-1) 
            head = {value: arr[idx], rest: null}
        else
            head = {value: arr[idx], rest: createNode(idx+1)}
        return head

    }
    return createNode(0);

}

function listToArray(lst){
    let arr = []
    for(let i = 0; lst != null; i++, lst=lst.rest){
        arr[i] = lst.value
    }
    return arr

}

function prepend(val, lst){
    return {value: val, rest: lst}

}

function nth(lst, idx){
    while(idx>0){
        idx--
        lst = lst.rest
    }
    return lst.value

}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20