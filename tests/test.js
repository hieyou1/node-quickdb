const fs = require("fs");
if (fs.existsSync("./TESTdbs")) {
    for (let i of fs.readdirSync("./TESTdbs")) fs.unlinkSync(`./TESTdbs/${i}`);
    fs.rmdirSync("./TESTdbs");
}
const QuickDB = require("../");
var working = 0;
let db = new QuickDB(null, "./TESTdbs");
db.writeSync({"Quick": "DB"});
db.writeSync("Quick2", "DB2");
let dbread = db.readEntireSync();
if (dbread["Quick"] == "DB" && dbread["Quick2"] == "DB2" && db.readSync("Quick") == "DB" && db.readSync("Quick2") == "DB2") working++;
db = new QuickDB(null, "./TESTdbs");
db.writeSync({"Quick": "DB"});
db.writeSync("Quick2", "DB2");
dbread = db.readEntireSync();
if (dbread["Quick"] == "DB" && dbread["Quick2"] == "DB2" && db.readSync("Quick") == "DB" && db.readSync("Quick2") == "DB2") working++;
console.log(`Amount working (expected: 2): ${working}.`);