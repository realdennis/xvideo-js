const fs = require('fs');

function addJSONsync(something) {
	let obj;
	try {
		obj = fs.readFileSync('./fav.json');
		obj = JSON.parse(obj);
	} catch (err) {
		//not exist
		obj = [];
	}
	obj.push(something);
	fs.writeFileSync('./fav.json', JSON.stringify(obj));
}

function readJSONsync() {
	let obj;
	try {
		obj = fs.readFileSync('./fav.json');
		obj = JSON.parse(obj);
	} catch (err) {
		obj = [];
	}
	return obj;
}

function cleanJSONsync() {
	let obj = [];
	fs.writeFileSync('./fav.json', JSON.stringify(obj));
}

exports.addjson = addJSONsync;
exports.readjson = readJSONsync;
exports.cleanjson = cleanJSONsync;