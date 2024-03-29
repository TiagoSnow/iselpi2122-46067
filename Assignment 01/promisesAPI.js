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

function urlFormatter(gameID){
    return 'https://api.boardgameatlas.com/api/search?ids=' + gameID + '&client_id=' + ID
}

/**
 * Obtains a promise to an object containing the game's name and url, who's ID is passed as parameter 
 * Obtained JSON contains 2 properties: game and count -> remove count
 * Since its a single http request per game, 'games' contains a single position array, which contains the properties we want
 * 
 * @param {String} gameID - The game's ID
 * @returns {Promise.<Object>}
 */
function getProperties(gameID){
    return fetch(urlFormatter(gameID))
        .then(res => res.text())
        .then(body => JSON.parse(body)['games'][0])
}

/**
 * Obtains a promise with all of the filtered Objects properties
 * 
 * @param {String[]} IDs Array of a set of game's ID
 * @param {String[]} props Array of the wanted properties
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
    return fs.readFile(fileName, 'utf8')
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
        .catch(e => console.log(e))
}

/**
 * Prints properties from objects obtained from file
 * 
 * @param {String} inName 
 * @param {String[]} properties 
 */
function printWantedProperties(inName, properties){
    readIDs(inName)
        .then(result => getPropertiesN(result, properties))
        .then(res => console.log(res))
        .catch(e => console.log(e))
}

