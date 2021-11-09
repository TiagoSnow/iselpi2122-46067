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
 * @returns {Promise.<>}
 */
async function getProperties(gameID){
    return JSON.parse(
        await (
            await fetch(urlFormatter(gameID))
        ).text())['games'][0]
}

/**
 * Obtains a promise with all of the filtered Objects properties
 * 
 * @param {String} file  File to read ID's
 * @param {String[]} props Array of a set of game's ID
 * @returns {Promise<{}[]>}
 */
async function getPropertiesN(file, props){
    let IDs = await readIDs(file)
    return await Promise.all(
        IDs.map(async ID => 
            utils.filterProperties(props, await getProperties(ID))))
}


/**
 * Returns an array with all ID's
 * If file is not found return empty array
 * 
 * @param {String} fileName 
 * @returns {String[]} 
 */

async function readIDs(fileName){
    const data = await fs.readFile(fileName,'utf8')
    return data.toString().split(/'\n'|'\r'|\r\n/g)
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
async function writeWantedProperties(inName, outName, properties){
    try{
        let aux = await getPropertiesN(inName,properties)
        data2File(outName,aux)
    }
    catch(e){
        console.log(e)
    }
}

/**
 * Prints properties from objects obtained from file
 * 
 * @param {String} inName 
 * @param {String[]} properties 
 */
async function printWantedProperties(inName, properties){
    try{
        let aux = await getPropertiesN(inName,properties)
        console.log(aux)
    }
    catch(e){
        console.log(e)
    }
}
