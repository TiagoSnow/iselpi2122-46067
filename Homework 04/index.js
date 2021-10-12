'use strict'

const person = {
    name: 'Madame Uppercut',
    age: 39,
    secretIdentity: 'Jane Wilson',
    powers: ['Million tonne punch', 'Damage resistance', 'Superhuman reflexes'],
    func: function() {
        return "method executed";
      }
  }

function inspect(obj){
    /*let propsValue = Object.values(obj);
    let i = 0;
    for (let prop in person) {
        if(typeof obj[prop] == 'function'){
            console.log(prop + " --> " + obj[prop]())
        }
        else console.log(prop + " --> " + propsValue[i])
        i++
      }
*/
    for (let prop in person) {
        const v = obj[prop]
        if(typeof v == 'function'){
            console.log(prop + " --> " + v())
        } else console.log(prop + " --> " + v)
    }
}


inspect(person)