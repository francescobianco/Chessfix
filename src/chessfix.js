/**
 *
 */
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path');
const fs = require('fs');

app.use(express.static(__dirname + "/../public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/setting', function (req, res) {
    var cwd = process.cwd();
    var setting = require(cwd + "/chessfix.json");
    if (typeof setting.epd === "string") {
        var base = cwd + "/" + setting.epd;
        var files = fs.readdirSync(base);
        setting.epd = {};
        for (i in files) {
            var file = base + "/" + files[i];
            setting.epd[file] = path.basename(file, ".epd");
        }
    }
    res.send(setting);
});

app.post('/positions', function (req, res) {
    var file = req.body.epd;
    var line = fs.readFileSync(file).toString().split("\n");
    var data = [];
    for (i in line) {
        var item = {};
        var part = line[i].split(";");
        var bmof = part[0].indexOf("bm ");
        if (bmof > 0) {
            item.fen = part[0].substr(0, bmof).trim();
            item.bm = part[0].substr(bmof +2).trim();
        } else {
            item.fen = part[0].trim();
            item.bm = "";
        }
        for (p in part) {
            var cell = part[p].trim();
            if (cell.substr(0, 3) === "id ") {
                item.id = cell.substr(3).trim().replace(/^"+|\"+$/g, '');
            }
        }
        data.push(item);
    }
    res.send(data);
});

app.post("/exec", function (req, res) {
    var data = {};
    console.log(req.body.script);
    data.terminal = require("child_process").execSync(req.body.script).toString();
    res.send(data);
});

app.listen(8864, function () {
    console.log('Example app listening on port 8864!')
});
