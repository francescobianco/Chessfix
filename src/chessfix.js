/*!
 * Chessfix - chess engine tuning tool
 * by Francesco Bianco <bianco@javanile.org>
 * Copyright(c) 2016-2017 Javanile.org
 * MIT Licensed
 */

const spawn = require('child_process').spawn;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const fs = require('fs');
const util = require('./utility');

app.use(express.static(__dirname + "/../public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const configFile = path.join(process.cwd(), 'chessfix.yml');
const configData = util.loadConfig(configFile);

var runAnalysis = null;
var useAnalysis = false;
var outAnalysis = "";
if (typeof configData.analysis !== 'undefined'
    && typeof configData.analysis.command !== 'undefined') {
    console.log(" - analysis load");
    useAnalysis = true;
    runAnalysis = spawn(configData.analysis.command);
    runAnalysis.stdin.write("uci\n");
    runAnalysis.stdout.on("data", function(output) {
        outAnalysis += output + "";
    });
    runAnalysis.on("exit", function() {
        useAnalysis = false;
        console.log(" - analysis exit");
    });
}

app.post('/init', function (req, res) {
    res.send({
        config: configData
    });
});

app.post('/database', function (req, res) {
    var name = req.body.name;
    var file = configData.databases[name].source;
    var data = util.readPsd(file);

    res.send({
        records: data
    });
});

app.post("/process", function (req, res) {
    var command = configData.utilities[req.body.utility].command;
    var output = require("child_process").execSync(command).toString();
    res.send({
        output: output
    });
});

app.post("/analysis-start", function (req, res) {
    outAnalysis = "";
    runAnalysis.stdin.write("stop\n");
    runAnalysis.stdin.write("go infinite\n");
    res.send({
        output: 1
    });
});

app.post("/analysis-updates", function (req, res) {
    var output = outAnalysis;
    outAnalysis = "";
    res.send({
        output: output
    });
});

app.listen(8864, function () {
    console.log(' - listening on port 8864');
});
