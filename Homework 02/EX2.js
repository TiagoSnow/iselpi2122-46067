'use strict'


function fizzBuzz(){

    for (let val = 1; val <= 100; val++){
        /*
        if(val % 3 == 0){
            console.log('Fizz')
        } else if(val % 5 == 0){
            console.log('Buzz')
        } else console.log(val)
        */
        if(val % 3 == 0 || val % 5 == 0){
            if(val % 3 == 0 && val % 5 == 0) console.log('FizzBuzz')
            else if (val % 3 == 0) console.log('Fizz')
            else console.log('Buzz')
        }
        else console.log(val)
    }
}

fizzBuzz()