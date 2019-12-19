const fs = require("fs");

function addjson(something) {
  let obj;
  try {
    obj = fs.readFileSync("./fav.json");
    obj = JSON.parse(obj);
  } catch (err) {
    //not exist
    obj = [];
  }
  obj.push(something);
  fs.writeFileSync("./fav.json", JSON.stringify(obj));
}

function readjson() {
  let obj;
  try {
    obj = fs.readFileSync("./fav.json");
    obj = JSON.parse(obj);
  } catch (err) {
    obj = [];
  }
  return obj;
}

function cleanjson() {
  let obj = [];
  fs.writeFileSync("./fav.json", JSON.stringify(obj));
}

export { addjson, readjson, cleanjson };
