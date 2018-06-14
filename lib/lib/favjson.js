const fs = require('fs');

exports.addjson = function addJSONsync(something) {
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
};

exports.readjson = function readJSONsync() {
	let obj;
	try {
		obj = fs.readFileSync('./fav.json');
		obj = JSON.parse(obj);
	} catch (err) {
		obj = [];
	}
	return obj;
};

exports.cleanjson = function cleanJSONsync() {
	let obj = [];
	fs.writeFileSync('./fav.json', JSON.stringify(obj));
};