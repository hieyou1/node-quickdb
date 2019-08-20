const fs = require("fs");
const pathf = require('path');
class QuickDB {
    constructor (id = null, path = "./dbs") {
        if (!fs.existsSync(path) || !fs.statSync(path).isDirectory()) fs.mkdirSync(path);
        if (id == null) {
            if (!fs.existsSync(pathf.join(path, "cid"))) {
                id = 0;
                fs.writeFileSync(pathf.join(path, "cid"), "0");
            } else {
                let lid = Number(fs.readFileSync(pathf.join(path, "cid"), "utf8"));
                id = lid + 1;
                fs.writeFileSync(pathf.join(path, "cid"), id.toString());
            }
        }
        this.id = id;
        let dbpath = pathf.join(path, `${id}.quickdb`);
        fs.writeFileSync(dbpath, "{}");
        this.path = dbpath;
        return id;
    }
    readSync (key) {
        return JSON.parse(fs.readFileSync(this.path, "utf8"))[key];
    }
    read (key) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, "utf8", (err, data) => {
                if (err) reject(err);
                resolve(JSON.parse(data)[key]);
            });
        });
    }
    writeSync (objorkey, val) {
        let db = JSON.parse(fs.readFileSync(this.path, "utf8"));
        if (val == undefined && typeof objorkey == "object") {
            Object.assign(db, objorkey);
        } else if (val !== undefined) {
            db[objorkey] = val;
        } else {
            throw new SyntaxError("Arguments not OK.");
        }
        fs.writeFileSync(this.path, JSON.stringify(db));
    }
    write (objorkey, val) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, "utf8", (err, rawdb) => {
                if (err) reject(err);
                var db = JSON.parse(db);
                if (val == undefined && typeof objorkey == "object") {
                    Object.assign(db, objorkey);
                } else if (val !== undefined) {
                    db[objorkey] = val;
                } else {
                    reject(new SyntaxError("Arguments not OK."));
                }
                fs.writeFile(this.path, JSON.stringify(db), (err2) => {
                    if (err2) reject(err2);
                    resolve();
                });
            });
        });
    }
    readEntire () {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, "utf8", (err, data) => {
                if (err) reject(err);
                resolve(JSON.parse(data));
            });
        });
    }
    readEntireSync () {
        return JSON.parse(fs.readFileSync(this.path, "utf8"));
    }
}
module.exports = QuickDB;