let request = require('request');
let cheerio = require('cheerio');
let host = "https://www.xvideos.com";

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

function parseTag(body){
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

async function tagCrawler(path){
	let body = await req(host+path);
	let taglist = parseTag(body);
	return taglist
}

/* for testing
(async function(){
	let list = await tagCrawler('/video27146179/nozomi_nishiyama_sparying_breast_milk')
	console.log(list);
}())
*/

exports.tagCrawl = tagCrawler;
