/**
 *
 */
const express = require('express')
const app = express()
var path = require('path');
var fs = require('fs');

app.use(express.static(__dirname + "/../public"));

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

app.listen(8864, function () {
    console.log('Example app listening on port 8864!')
});
