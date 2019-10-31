/**
 * Route for microbit 
 */
"use strict";

const express       = require("express");
const router        = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const microbit        = require("../src/microbit.js");

const sitename      = "| BBC Microbit";

module.exports = router;

router.get("/index", (req, res) => {
    let data = {
        title: `Welcome ${sitename}`
    };

    res.render("microbit/index", data);
});


router.get("/history/:id", async (req, res) => {
    
    let data = {
        title: `Microbit ${sitename}`
    };
    //res.setHeader('Content-Type', 'application/json');

    //res.setHeader('Content-Type', 'application/json');

    let id = req.params.id;
    data.res = await microbit.showHistory(id);

    res.send(data.res);

    //res.send({data:await microbit.showLive(id)});
});

router.get("/history", async (req, res) => {

    let data = {
        title: `Microbit ${sitename}`
    };

    data.res = await microbit.showAll(id);

    res.render("microbit/history", data);
});

router.post("/placebit", urlencodedParser, async (req, res) => {
    console.log("Placing new microbit")
    //console.log(req)
    let microbitId = req.body.microbitId;
    let column = req.body.column; 
    let row = req.body.row;
    console.log("placing microbit" + microbitId + " " + column + " " + row);

    res.setHeader('Content-Type', 'application/json');
    
    res.sendStatus(await microbit.placeMicrobit(microbitId, row, column));
    //Maybe send back the microbitId and put it as an attribute
    //in the div, so we can delete it later
    //should also return -1 if bad action so we can 
    //base our decision upon it
    //res.sendStatus(200);
});

router.get("/deletebit/:id", async (req, res) => {
    let microbitId = req.params.id;
    res.setHeader('Content-Type', 'application/json');

    res.send({data:await microbit.removeMicrobit(microbitId)});
    //data.res = await product.placeMicrobit(7,8,9);
    //res.redirect("/eshop/index");
    //res.render("product/index", data); //
});

router.get("/state", async (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    res.send({data:await microbit.getState()});
    //data.res = await product.placeMicrobit(7,8,9);
    //res.redirect("/eshop/index");
    //res.render("product/index", data); //
});

router.get("/dimensions", async (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    res.send({data:await microbit.getDimensions()});
    //data.res = await product.placeMicrobit(7,8,9);
    //res.redirect("/eshop/index");
    //res.render("product/index", data); //
});

router.post("/dimensions", urlencodedParser, async (req, res) => {
    console.log("Setting new dimensions")
    //console.log(req)
    let length = req.body.length; 
    let height = req.body.height;
    console.log("setting dimensions: " + length + " " + height);

    res.setHeader('Content-Type', 'application/json');
    
    res.sendStatus(await microbit.setDimensions(length, height));
    //Maybe send back the microbitId and put it as an attribute
    //in the div, so we can delete it later
    //should also return -1 if bad action so we can 
    //base our decision upon it
    //res.sendStatus(200);
});


router.post("/index", urlencodedParser, async (req, res) => {
    let data = {
        title: `Microbit ${sitename}`
    };

    data.res = await microbit.createState(req.body.id, req.body.row, req.body.column);

    res.render("microbit/index", data);
});



router.get("/infobit/:id", async (req, res) => {
    
    let data = {
        title: `Microbit ${sitename}`
    };
    //res.setHeader('Content-Type', 'application/json');

    let id = req.params.id;
    data.res = await microbit.showLive(id);

    res.send(data.res);

    //res.send({data:await microbit.showLive(id)});
});



router.get("/info", (req, res) => {
    let data = {
        title: `About ${sitename}`
    };

    res.render("microbit/info", data);
});





