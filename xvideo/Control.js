let keypress = require('keypress');
keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

process.stdin.on('keypress',(ch,key)=>{
    if(key &&key.ctrl && key.name=='c'){
        process.stdin.pause();
    }});

console.reset =  function () {
  return process.stdout.write('\033c');
};

let xvideo = require('./ReqParse.js');


let page=0;
let keyword='';
let home_list=[];
let keyword_list=[];


function initial(){
	page=0;
	keyword='';
	home_list=[];
	keyword_list=[];
}

async function homepage(page){
	console.reset();
	console.log('loading ...');
	let temp = await xvideo.hpc(page);
	home_list = home_list.concat(temp);
	page+=1;
}

async function keywordpage(keyword,page){
	console.reset();
	console.log('loading ...');
	let keyword_list =  await xvideo.kwc(keyword,page);
	return keyword_list;
}
