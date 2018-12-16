const request = require('request');
const cheerio = require('cheerio');
const URL = require('url');
const readline = require('readline')
const host = "https://www.xvideos.com";
/*
Keyword(homepage) -> Page(loop?) -> URI -> request(async)
-> body -> "video_list"(append?)
*/

function homepageUrl(page){
	if(page===0) return host;
	return host+URL.format({
				path:'/new/'+page,
				json:true
			});
}

function keywordUrl(keyword,page){
	return host+URL.format({
				query:{
					k:keyword,
					p:page
				},
				json:true
			});
}

function req(url){
	return new Promise(function(resolve,reject){
		request(
		{
			method:'GET',
			header:{'Content-Type' : 'application/json; charset=UTF-8'},
			uri:url
		},(err,res,body)=>{
			    if(!err){
			    	try{
			    		resolve(body);
			    	}catch(err){
			    		reject(Error('no content'));
			    	}	    	
			    }else{
			    	reject('No response');
			    }
			})
		})
}

const parseVideo = (body,page)=>{
	let $ = cheerio.load(body);
	let content = $('#content');
	let avArray = [];
	let video = content.find('.thumb-block')
	if(video[0]===undefined) throw new Error('no content')
	for(let i=0;i<video.length;i++){
		let obj = {
			page:page,
			attr:{
				index:i,
				name:video.eq(i).children('div.thumb-under').find('a').text(),
				link:video.eq(i).children('div.thumb-under').find('a').attr('href')
			}
		}
		avArray.push(obj);
	}
	return avArray;
}


const parseTag = (body)=>{
	let $ = cheerio.load(body);
	let tagTable = $('.video-tags-list');
	let tag = [];
	let element = tagTable.find('li');
	if(element[1]===undefined) throw new Error('no tag');
	for(let i=0;i<element.length-1;i++){
		text = element.eq(i).children('a').text();
		if(text.charAt(0)!='\n') tag.push(text);
	}
	tag = tag.slice(0,5);//save first five tag
	return tag;
}

exports.tagCrawler  = async (path)=>{
	let body = await req(host+path);
	let taglist = parseTag(body);
	return taglist
}

exports.homepageCrawler = async (page)=>{
	let body = await req(homepageUrl(page));
	let avlist = parseVideo(body,page);
	return avlist;
}

exports.keywordCrawler = async (keyword,page)=>{
	let body = await req(keywordUrl(keyword,page));
	let avlist = parseVideo(body,page);
	return avlist;
}