let keypress = require('keypress');
console.reset =  function () {
  return process.stdout.write('\033c');
};
let xvideo = require('./ReqParse.js');


function homeXv(){
	let obj={};
	obj.page = 0;//initial
	obj.videoList = [];
	obj.nextPage = async function(){
		try{
			let temp = await xvideo.hpc(obj.page);
			obj.videoList = obj.videoList.concat(temp);
			obj.page+=1;
		}catch(err){
				console.log('No more home page :(');
				throw new Error('no content');
			}
	};
	obj.pointer = 0;
	obj.index = 0;
	obj.renderTen = function(){
		try{
			console.reset();
			for(let i=obj.index;i<obj.index+10;i++){
				if(i==obj.pointer) console.log('->	'+obj.videoList[i].attr.name);
				else console.log('  	'+obj.videoList[i].attr.name);
			}
		}catch(err){
			console.reset();
			console.log('loading...')
			obj.nextPage().then(()=>{obj.renderTen()},err=>{console.log(err)});
		}
	}
	obj.down = function(){
		obj.pointer+=1;
		if(Math.floor(obj.pointer/10)> Math.floor((obj.pointer-1)/10)) obj.index+=10;
		//console.log(obj.index);
		obj.renderTen();
	}
	obj.up = function(){
		if(obj.pointer==0){
			obj.renderTen();
			return;
		}
		obj.pointer-=1;
		if(Math.floor(obj.pointer/10)< Math.floor((obj.pointer+1)/10)) obj.index-=10;
		obj.renderTen();
	}
	return obj;
}

function keyXv(key){
	let obj = homeXv();
	obj.keyword = key;
	obj.nextPage = async function(){	
		try{
			let temp = await xvideo.kwc(obj.keyword,obj.page);
			obj.videoList = obj.videoList.concat(temp);
			obj.page+=1;
		}catch(err){
			console.log('No keyword porn find...sorry:(')
			throw new Error('no content');
		}
	};
	return obj;
}


exports.homepage = homeXv;
exports.keypage = keyXv;
