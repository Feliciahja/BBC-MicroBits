/**
 * A module exporting functions to access the microbit database
 */
"use strict";

module.exports = {
    "createState": createState,
    "showLive" : showLive,
    "showCategories": showCategories,
    "showHistory": showHistory,
    "placeMicrobit": placeMicrobit,
    "removeMicrobit": removeMicrobit,
    "getState": getState,
    "setDimensions": setDimensions,
    "getDimensions": getDimensions,
    "showProducts": showProducts
    
};

const mysql = require("promise-mysql");
const config = require("../config/db/microbit.json");
let db;

/**
 * Main function.
 * @async
 * @returns void
 */
(async function() {
    db = await mysql.createConnection(config);

    process.on("exit", () => {
        db.end();
    });
})();


async function createState(id, row, column) {
    let sql = `CALL create_state(?,?,?);`;
    let res;

    res = await db.query(sql, [id, row, column]);
    //console.log(res);
    //console.info(`SQL: ${sql} got ${res.length} rows.`);

    return res[0];
}

async function showLive(id) {
    let sql = `CALL show_live(?);`;
    let res;

    res = await db.query(sql, [id]);
    //console.log(res);
    //console.info(`SQL: ${sql} got ${res.length} rows.`);

    return res[0];
}

/**
 * Show all entries in the category table.
 *
 * @async
 * @returns {RowDataPacket} Resultset from the query.
 */
async function showCategories() {
    let sql = `CALL show_live(1);`;
    let res;

    res = await db.query(sql);
    //console.log(res);
    console.info(`SQL: ${sql} got ${res.length} rows.`);

    return res[0];
}

/**
 * Show entries from the customer table.
 *
 * @async
 * @returns {RowDataPacket} Resultset from the query.
 */
async function showHistory(id) {
    let sql = `CALL show_history(?);`;
    let res;

    res = await db.query(sql, [id]);
    console.info(`SQL: ${sql} got ${res.length} rows.`);

    return res[0];
}

async function placeMicrobit (microbitId, row, column) {
    let insertSql = `CALL create_state(?, ?, ?);`;
    let res;

    //Insert into database
    //TRY CATCH THIS AND SAY ID IS ALREADY TAKEN
    res = await db.query(insertSql, [microbitId, row, column]);

    //Confirm entry was inserted correctly
    //Tänk inte för mkt på detta
    let confirmSql = `CALL get_id(?,?);`;
    let microbitIdConfirmation = await db.query(confirmSql, [row, column]);
    //let jsonConfirmation = JSON.parse(microbitIdConfirmation);
    
    
    if(microbitIdConfirmation.length == 1){
        return 200; //Insert went well
    } else {
        return 304;//Some error code
    }
}

async function removeMicrobit(microbitId) {
    let sql = `DELETE FROM state WHERE id=?;`

    let res = await db.query(sql,[microbitId]);
    console.log(res);
    console.info(`Returning state`);
    return res;
}


async function getState() {
    let sql = `SELECT * FROM state;`

    let res = await db.query(sql);
    console.log(res);
    console.info(`Returning state`);
    return res;
}

async function getDimensions() {
    let sql = ` SELECT * FROM dimensions ORDER BY id DESC LIMIT 1;`

    let res = await db.query(sql);
    console.log(res);
    return res;
}

async function setDimensions(length, height) {
    let sql = `CALL set_dimensions(?,?);`

    let res = await db.query(sql, [length, height]);
    console.log(res);

    if(res.length == 1){
        return 200; //Insert went well
    } else {
        return 304;//Some error code
    }
}

async function showProducts() {
    let sql = `CALL show_history(2);`;
    let res;

    res = await db.query(sql);
    console.info(`SQL: ${sql} got ${res.length} rows.`);

    return res[0];
}


