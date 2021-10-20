'use strict'

const utils = require('./../lib/utils')

test('filterProperties: Filtering some properties', () => {

    const o = {a: 1, b: 'Thor', c: [1,2,3], d: {x: 10}, e: 2, f: 'Captain America'}

    const props = ['b', 'd', 'g', 'a']

    const actual = utils.filterProperties(props, o)

    expect(actual).toEqual({a: 1, b: 'Thor', d: {x: 10}})
    // oFiltered: {a: 1, b: 'Thor', d: {x: 10}}

})

test('filterProperties: Filtering all properties', () => {

    const o = {a: 1, b: 'Thor', c: [1,2,3], d: {x: 10}, e: 2, f: 'Captain America'}

    const props = []

    const actual = utils.filterProperties(props, o)

    expect(actual).toEqual({})
    // oFiltered: {a: 1, b: 'Thor', d: {x: 10}}

})

test('filterPropertiesN: Filtering some properties', () => {

    const objs = [
        {a: 1, b: 'Thor', c: [1,2,3], d: {x: 10}, e: 2, f: 'Captain America'},
        {b: 'Hulk', a: [1,2,3], d: {x: 10}, e: 2, g: false}, 
        {x: 'Vision', y: false}
    ]
    
    const props = ['b', 'd', 'g', 'a']

    const actual = utils.filterPropertiesN(props, objs)

    expect(actual).toEqual([{a: 1, b: 'Thor', d: {x: 10}},
        {b: 'Hulk', a: [1,2,3], d: {x: 10}, g: false}, 
        { }])

})

test('filterPropertiesN: Filtering all properties', () => {

    const objs = [
        {a: 1, b: 'Thor', c: [1,2,3], d: {x: 10}, e: 2, f: 'Captain America'},
        {b: 'Hulk', a: [1,2,3], d: {x: 10}, e: 2, g: false}, 
        {x: 'Vision', y: false}
    ]
    
    const props = []
    
    const actual = utils.filterPropertiesN(props, objs)

    expect(actual).toEqual([{},{},{}])

})

test('zip: Zip with same size array', () => {
    let a = [1,2,3]
    let actual = a.zip([4,5,6], 
        function(left, right) { return left + right}) 
    expect(actual).toEqual([5,7,9])

})

test('zip: Zip with bigger size array', () => {
    let actual = [1,2,3].zip([4,5,6,7,8], 
        function(left, right) { return left + right}) 
    expect(actual).toEqual([5,7,9])

})

test('zip: Zip with smaller size array', () => {
    let actual = [1,2,3].zip([4,5], 
        function(left, right) { return left + right}) 

    expect(actual).toEqual([5,7])

})

test('zip: Zip array with empty array', () => {
    let actual = [1,2,3].zip([], 
        function(left, right) { return left + right}) 

    console.log(actual)
    expect(actual).toEqual([])

})

test('zip: Zip empty array with non empty', () => {
    let actual = [1,2,3].zip([], 
        function(left, right) { return left + right}) 

    console.log(actual)
    expect(actual).toEqual([])

})


