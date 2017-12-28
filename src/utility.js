
var fs = require("fs"),
    path = require("path"),
    yaml = require("yamljs");


module.exports = {


    loadConfig: function (configFile) {

        return yaml.load(configFile);

    },

    readPsd: function (file) {

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

        return data;
    }




};