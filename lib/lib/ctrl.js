function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const chalk = require('chalk');
let xvideo = require('./ReqParse.js');
const RESET = () => process.stdout.write('\x1bc');
const BOTTOM = `==========================================================
"right" : See the video tag
"space" : Add favorite
"enter" : Watch the video`;

class Page {
	constructor() {
		this.page = 0; //initial
		this.videoList = [];
		this.pointer = 0;
		this.index = 0;
		this.loadingState = 0;
	}
	nextPage() {
		var _this = this;

		return _asyncToGenerator(function* () {
			try {
				let temp = yield xvideo.homepageCrawler(_this.page);
				_this.videoList = _this.videoList.concat(temp);
				_this.page += 1;
			} catch (err) {
				console.log('No more home page :(');
				throw new Error('no content');
			}
		})();
	}
	renderTen() {
		try {
			RESET();
			for (let i = this.index; i < this.index + 10; i++) {
				if (i == this.pointer) {
					console.log(`->	${chalk.red.bold(this.videoList[i].attr.name)}`);
					if (this.videoList[i].tag !== undefined) {
						if (this.videoList[i].tag[0] != 'W') {
							for (let j = 0; j < this.videoList[i].tag.length; j++) {
								console.log(`	--> ${chalk.bgGreen.white(this.videoList[i].tag[j])}`);
							}
						} else {
							console.log(`	--> ${chalk.bgYellow.white(this.videoList[i].tag)}`);
						}
					}
				} else console.log(`  	${this.videoList[i].attr.name}`);
			}
			console.log(BOTTOM);
		} catch (err) {
			RESET();
			console.log('loading...');
			if (this.loadingState == 0) {
				this.nextPage().then(() => {
					this.renderTen();
					this.loadingState = 0;
				}, err => {
					console.log(err);
				});
				this.loadingState = 1;
			}
		}
	}
	down() {
		this.pointer += 1;
		if (Math.floor(this.pointer / 10) > Math.floor((this.pointer - 1) / 10)) this.index += 10;
		//console.log(obj.index);
		this.renderTen();
	}
	up() {
		if (this.pointer == 0) {
			this.renderTen();
			return;
		}
		this.pointer -= 1;
		if (Math.floor(this.pointer / 10) < Math.floor((this.pointer + 1) / 10)) this.index -= 10;
		this.renderTen();
	}

	right() {
		var _this2 = this;

		return _asyncToGenerator(function* () {
			try {
				if (_this2.videoList[_this2.pointer].tag === undefined) {
					_this2.videoList[_this2.pointer].tag = 'Waiting...';
					_this2.renderTen();
					let tag = yield xvideo.tagCrawler(_this2.videoList[_this2.pointer].attr.link);
					_this2.videoList[_this2.pointer].tag = tag;
					_this2.renderTen();
				}
			} catch (err) {
				_this2.videoList[_this2.pointer].tag = 'No Tag';
				_this2.renderTen();
			}
		})();
	}

	save() {
		var _this3 = this;

		return _asyncToGenerator(function* () {
			if (_this3.videoList[_this3.pointer].tag === undefined) {
				_this3.videoList[_this3.pointer].tag = 'Waiting...';
				_this3.renderTen();
				let tag = yield xvideo.tagCrawler(_this3.videoList[_this3.pointer].attr.link);
				_this3.videoList[_this3.pointer].tag = tag;
			}
			const fav = require('./favjson.js');
			fav.addjson(_this3.videoList[_this3.pointer]);
			_this3.renderTen();
			console.log(chalk.bgGreen.white('Save to favorite Success!'));
		})();
	}

	open() {
		const opn = require('openurl');

		if (this.videoList[this.pointer] !== undefined) {
			const host = 'https://www.xvideos.com';
			videoUrl = host + this.videoList[this.pointer].attr.link;
			opn.open(videoUrl);
		}
	}
	//default return this
}
exports.homepage = new Page();

exports.keypage = class Keypage extends Page {
	constructor(key) {
		super();
		this.key = key;
	}
	nextPage() {
		var _this4 = this;

		return _asyncToGenerator(function* () {
			try {
				let temp = yield xvideo.keywordCrawler(_this4.key, _this4.page);
				_this4.videoList = _this4.videoList.concat(temp);
				_this4.page += 1;
			} catch (err) {
				console.log('No keyword porn find...sorry:(');
				throw new Error('no content');
			}
		})();
	}
};

exports.favpage = class Favpage extends Page {
	constructor() {
		super();
		const favorite = require('./favjson.js');
		this.videoList = favorite.readjson();
	}

	down() {
		this.pointer == this.videoList.length - 1 ? this.pointer = this.videoList.length - 1 : this.pointer += 1;
		if (Math.floor(this.pointer / 10) > Math.floor((this.pointer - 1) / 10)) this.index += 10;
		//console.log(obj.index);
		this.renderTen();
	}

	delete() {
		RESET();
		try {
			for (let i = this.index; i < this.index + 10; i++) {
				if (this.videoList[i] == undefined) break;
				if (i == this.pointer) console.log('->	Delete');else console.log(`  	${obj.videoList[i].attr.name}`);
			}
			this.videoList.splice(this.pointer, 1);
			fav.cleanjson();
			for (let i = 0; i < this.videoList.length; i++) {
				fav.addjson(this.videoList[i]);
			}
		} catch (err) {
			console.log(err);
			console.log('Nothing in your fav list, press "<-" back to menu');
		}
	}

	right() {
		RESET();
		try {
			for (let i = this.index; i < this.index + 10; i++) {
				if (this.videoList[i] == undefined) break;
				if (i == this.pointer) {
					console.log(`->	${chalk.red.bold(this.videoList[i].attr.name)}`);
					if (this.videoList[i].tag !== undefined) {
						for (let j = 0; j < this.videoList[i].tag.length; j++) {
							console.log(`	-->${chalk.bgGreen.white(this.videoList[i].tag[j])}`);
						}
					}
				} else console.log(`  	${this.videoList[i].attr.name}`);
			}
			console.log(BOTTOM);
		} catch (err) {
			console.log('press "<-" back to menu');
		}
	}
	renderTen() {
		RESET();
		try {
			for (let i = this.index; i < this.index + 10; i++) {
				if (this.videoList[i] == undefined) break;
				if (i == this.pointer) console.log(`->	${chalk.red.bold(this.videoList[i].attr.name)}`);else console.log(`  	${this.videoList[i].attr.name}`);
			}
			console.log(BOTTOM);
		} catch (err) {
			console.log(err);
			console.log('Nothing in your fav list, press "<-" back to menu');
		}
	}
};