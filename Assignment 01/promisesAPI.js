'use strict'
module.exports = {
    getProperties,
    getPropertiesN,
    readIDs,
    data2File,
    writeWantedProperties,
    printWantedProperties
}

const fs = require('fs/promises')

const utils = require('./utils/lib/utils')

const fetch = require('node-fetch') 

const ID = process.env.ATLAS_CLIENT_ID

/**
 * Obtains a promise to an object containing the game's name and url, who's ID is passed as parameter 
 * Obtained JSON contains 2 properties: game and count -> remove count
 * Since its a single http request per game, 'games' contains a single position array, which contains the properties we want
 * 
 * @param {String} gameID - The game's ID
 * @returns {Promise.<Object>}
 */

function getProperties(gameID){
    return fetch('https://api.boardgameatlas.com/api/search?ids=' + gameID + '&client_id=' + ID)
        .then(res => res.text())
        .then(body => JSON.parse(body)['games'][0])
}

/**
 * Obtains a promise with all of the filtered Objects properties
 * 
 * @param {String[]} IDs Array of a set of game's ID
 * @returns {Promise<{}[]>}
 */

function getPropertiesN(IDs, props){
    return Promise.all(IDs.map(id => getProperties(id)
        .then(r => utils.filterProperties(props, r))))
}

/**
 * Returns promise containing an array with all ID's
 * If file is not found return empty array
 * 
 * @param {String} fileName 
 * @returns {String[]} 
 */

function readIDs(fileName){
    return fs.readFile(fileName, 'utf8').
        catch(() => {
            console.log('Input file \''+ fileName + '\' not found!\nReturning...')
            return null
        })
        .then(data => data == null ? [] : data.toString().split(/'\n'|'\r'|\r\n/g)
        )
}

function data2File(fileName, data){
    fs.writeFile(fileName,JSON.stringify(data))
}

/**
 * Writes to output file, the properties in properties array, obtained from
 *      requests using the IDs in input file
 * 
 * @param {*} inName Input file's name
 * @param {*} outName Output file's name
 * @param {*} properties Properties array
 */

function writeWantedProperties(inName, outName, properties){
    readIDs(inName)
        .then(result => getPropertiesN(result, properties))
        .then(res => data2File(outName, res))
}

/**
 * Prints properties from objects obtained from file
 * 
 * @param {String} fileName 
 * @param {String[]} properties 
 */

function printWantedProperties(fileName, properties){
    readIDs(fileName)
        .then(result => getPropertiesN(result, properties))
        .then(res => console.log(res))
}

//printWantedProperties('./utils/gameIDs.txt', ['name', 'url'])
//writeWantedProperties('./utils/gameIDs.txt', 'a.json', ['name', 'url'])

/*let t = '{'+
   '"games":['+
    '  {'+
     '"id":"GP7Y2xOUzj",'+
          '"handle":"codenames",'+
          '"url":"https://www.boardgameatlas.com/game/GP7Y2xOUzj/codenames",'+
          '"edit_url":"https://www.boardgameatlas.com/game/GP7Y2xOUzj/edit",'+
          '"name":"Codenames",'+
          '"price":"11.35",'+
          '"price_ca":"16.89",'+
          '"price_uk":"12.29",'+
          '"price_au":"21.99",'+
          '"msrp":19.95,'+
          '"description_preview":" The two rival spymasters know the secret identities of 25 agents. Their teammates know the agents only by their CODENAMES.  The teams compete to see who can make contact with all of their agents first. Spymasters give one-word clues that can point to multiple words on the board. Their teammates try to guess words of the right color while avoiding those that belong to the opposing team. And everyone wants to avoid the assassin.  Codenames: win or lose, its fun to figure out the clues. "'+
       '}'+
    '],'+
    '"count":1'+
 '}'
//let b = a.then(result => utils.filterProperties(props2, result)).then(result => console.log(result))
//let u = JSON.parse(t)['games']
//let o1 = utils.filterProperties(props,u)
*/
