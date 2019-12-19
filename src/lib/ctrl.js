const chalk = require('chalk');
const xvideo = require('./ReqParse.js');
const RESET =  ()=> process.stdout.write('\x1bc');
const BOTTOM = `==========================================================
"right" : See the video tag
"space" : Add favorite
"enter" : Watch the video`;

class Page{
  constructor(){
  	this.page = 0;//initial
  	this.videoList = [];
    this.pointer = 0;
    this.index = 0;
    this.loadingState = 0;
  }
	async nextPage(){
		try{
			let temp = await xvideo.homepageCrawler(this.page);
			this.videoList = this.videoList.concat(temp);
			this.page+=1;
		}catch(err){
				console.log('No more home page :(');
				throw new Error('no content');
			}
	};
	renderTen(){
		try{
      RESET();
			for(let i=this.index;i<this.index+10;i++){
				if(i==this.pointer){
					console.log(`->	${chalk.red.bold(this.videoList[i].attr.name)}`)
					if(this.videoList[i].tag!==undefined ){
						if(this.videoList[i].tag[0]!='W'){
							for(let j=0;j<this.videoList[i].tag.length;j++){
								console.log(`	--> ${chalk.bgGreen.white(this.videoList[i].tag[j])}`);
							}
						}else{
							console.log(`	--> ${chalk.bgYellow.white(this.videoList[i].tag)}`);
						}
					}
				}
				else console.log(`  	${this.videoList[i].attr.name}`);
			}
      console.log(BOTTOM);
		}catch(err){
      RESET()
			console.log('loading...')
			if(this.loadingState==0){
				this.nextPage().then(()=>{
						this.renderTen()
						this.loadingState=0;
					},err=>{console.log(err)});
				this.loadingState=1;
			}
		}
	}
	down(){
		this.pointer+=1;
		if(Math.floor(this.pointer/10)> Math.floor((this.pointer-1)/10)) this.index+=10;
		//console.log(obj.index);
		this.renderTen();
	}
	up(){
		if(this.pointer==0){
			this.renderTen();
			return;
		}
		this.pointer-=1;
		if(Math.floor(this.pointer/10)< Math.floor((this.pointer+1)/10)) this.index-=10;
		this.renderTen();
	}

	async right(){
		try{
			if(this.videoList[this.pointer].tag===undefined){
				this.videoList[this.pointer].tag = 'Waiting...'
				this.renderTen();
				let tag = await xvideo.tagCrawler(this.videoList[this.pointer].attr.link);
				this.videoList[this.pointer].tag = tag;
				this.renderTen();
			}
		}catch(err){
				this.videoList[this.pointer].tag = 'No Tag'
				this.renderTen();
			}
	};

	async save(){
			if(this.videoList[this.pointer].tag===undefined){
				this.videoList[this.pointer].tag = 'Waiting...'
				this.renderTen();
				let tag = await xvideo.tagCrawler(this.videoList[this.pointer].attr.link);
				this.videoList[this.pointer].tag = tag;
			}
      const fav = require('./favjson.js');
			fav.addjson(this.videoList[this.pointer]);
			this.renderTen();
			console.log(chalk.bgGreen.white('Save to favorite Success!'));
	}

	open(){
		const opn = require('openurl');

		if(this.videoList[this.pointer]!==undefined){
			const host = 'https://www.xvideos.com'
			let videoUrl = host+this.videoList[this.pointer].attr.link;
			opn.open(videoUrl);
		}
	}
  //default return this
}
exports.homepage =  new Page();

exports.keypage = class Keypage extends Page{
  constructor(key){
    super();
    this.key = key;
  }
	async nextPage(){	
		try{
			let temp = await xvideo.keywordCrawler(this.key, this.page);
			this.videoList = this.videoList.concat(temp);
			this.page+=1;
		}catch(err){
			console.log('No keyword porn find...sorry:(')
			throw new Error('no content');
		}
	};
}

exports.favpage = class Favpage extends Page{
  constructor(){
    super();    
    const favorite = require('./favjson.js');
    this.videoList = favorite.readjson();
  }

	down(){
		this.pointer==this.videoList.length-1?this.pointer=this.videoList.length-1:this.pointer+=1;
		if(Math.floor(this.pointer/10)> Math.floor((this.pointer-1)/10)) this.index+=10;
		//console.log(obj.index);
		this.renderTen();
	}

	delete(){
    RESET();
		try{
			for(let i=this.index;i<this.index+10;i++){
				if(this.videoList[i]==undefined) break;
				if(i==this.pointer) console.log('->	Delete')
				else console.log(`  	${obj.videoList[i].attr.name}`);
			}
			this.videoList.splice(this.pointer,1);
			fav.cleanjson();
			for(let i=0;i<this.videoList.length;i++){
				fav.addjson(this.videoList[i]);
			}

		}catch(err){
			console.log(err);
			console.log('Nothing in your fav list, press "<-" back to menu')
		}
	}

	right() {
		RESET();
		try{
			for(let i=this.index;i<this.index+10;i++){
				if(this.videoList[i]==undefined) break;
				if(i==this.pointer){
					console.log(`->	${chalk.red.bold(this.videoList[i].attr.name)}`);
					if(this.videoList[i].tag!==undefined){
						for(let j=0;j<this.videoList[i].tag.length;j++){
							console.log(`	-->${chalk.bgGreen.white(this.videoList[i].tag[j])}`);
						}
					}	
				}
				else console.log(`  	${this.videoList[i].attr.name}`);
			}
      console.log(BOTTOM)
		}catch(err){
			console.log('press "<-" back to menu')
		}

	}
	renderTen(){
		RESET();
		try{
			for(let i=this.index;i<this.index+10;i++){
				if(this.videoList[i]==undefined) break;
				if(i==this.pointer) console.log(`->	${chalk.red.bold(this.videoList[i].attr.name)}`);
				else console.log(`  	${this.videoList[i].attr.name}`);
			}
      console.log(BOTTOM);
		}catch(err){
      console.log(err)
			console.log('Nothing in your fav list, press "<-" back to menu')
		}
	}
}