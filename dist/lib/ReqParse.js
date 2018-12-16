function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const request = require('request');
const cheerio = require('cheerio');
const URL = require('url');
const readline = require('readline');
const host = "https://www.xvideos.com";
/*
Keyword(homepage) -> Page(loop?) -> URI -> request(async)
-> body -> "video_list"(append?)
*/

function homepageUrl(page) {
	if (page === 0) return host;
	return host + URL.format({
		path: '/new/' + page,
		json: true
	});
}

function keywordUrl(keyword, page) {
	return host + URL.format({
		query: {
			k: keyword,
			p: page
		},
		json: true
	});
}

function req(url) {
	return new Promise(function (resolve, reject) {
		request({
			method: 'GET',
			header: { 'Content-Type': 'application/json; charset=UTF-8' },
			uri: url
		}, (err, res, body) => {
			if (!err) {
				try {
					resolve(body);
				} catch (err) {
					reject(Error('no content'));
				}
			} else {
				reject('No response');
			}
		});
	});
}

const parseVideo = (body, page) => {
	let $ = cheerio.load(body);
	let content = $('#content');
	let avArray = [];
	let video = content.find('.thumb-block');
	if (video[0] === undefined) throw new Error('no content');
	for (let i = 0; i < video.length; i++) {
		let obj = {
			page: page,
			attr: {
				index: i,
				name: video.eq(i).children('div.thumb-under').find('a').text().substr(0, 30),
				link: video.eq(i).children('div.thumb-under').find('a').attr('href')
			}
		};
		avArray.push(obj);
	}
	return avArray;
};

const parseTag = body => {
	let $ = cheerio.load(body);
	let tagTable = $('.video-tags-list');
	let tag = [];
	let element = tagTable.find('li');
	if (element[1] === undefined) throw new Error('no tag');
	for (let i = 0; i < element.length - 1; i++) {
		text = element.eq(i).children('a').text();
		if (text.charAt(0) != '\n') tag.push(text);
	}
	tag = tag.slice(0, 5); //save first five tag
	return tag;
};

exports.tagCrawler = (() => {
	var _ref = _asyncToGenerator(function* (path) {
		let body = yield req(host + path);
		let taglist = parseTag(body);
		return taglist;
	});

	return function (_x) {
		return _ref.apply(this, arguments);
	};
})();

exports.homepageCrawler = (() => {
	var _ref2 = _asyncToGenerator(function* (page) {
		let body = yield req(homepageUrl(page));
		let avlist = parseVideo(body, page);
		return avlist;
	});

	return function (_x2) {
		return _ref2.apply(this, arguments);
	};
})();

exports.keywordCrawler = (() => {
	var _ref3 = _asyncToGenerator(function* (keyword, page) {
		let body = yield req(keywordUrl(keyword, page));
		let avlist = parseVideo(body, page);
		return avlist;
	});

	return function (_x3, _x4) {
		return _ref3.apply(this, arguments);
	};
})();