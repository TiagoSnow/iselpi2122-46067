'use strict'
module.exports = {
    filterProperties,
    filterPropertiesN,
}

function filterProperties(propNames, obj){
    let newObj = {}
    for (let prop of propNames) {
        if(obj[prop] != null) newObj[prop] = obj[prop]
    }
    return newObj
}

function filterPropertiesN(propNames, objs){
    let newObj = []
    newObj.push(filterProperties(propNames,objs[0]))
    objs.shift()            //remove already filtered object from objs
    return objs[0] == null ? 
        newObj : 
        newObj.concat(filterPropertiesN(propNames, objs))
}


Array.prototype.zip = function (a, combiner){
    let newArr = []
    for (let index = 0; index < this.length && index < a.length; index++) {
        newArr.push(combiner(this[index], a[index]))
    }
    return newArr
}