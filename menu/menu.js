let xvideo = require('../xvideo/ReqParse.js')
let lis = require('../xvideo/listen.js')

console.reset =  function () {
  return process.stdout.write('\033c');
};
const menu = {
    0:'Watch the home page',
    1:'Input your keyword to find',
    2:'Favorite',
    3:'Exit'
};

exports.render = function(index){
	console.reset();
	for(i in menu){
		if(i == index) tab = '->  ';
		else tab = '    '
	    console.log(tab+menu[i]);
	}
};

exports.choose = function menu(index){
	if(index==3){
		console.log('Goodbye!');
		process.stdin.pause();
	}else{
		console.reset();
		switch(index){
			case 0:
				process.stdin.on('keypress',lis.hchoose);
				lis.homes.renderTen();
				//function main page listener
				break;
			case 1:
				lis.kkk.keyword = '';
				lis.keywords.renderTen();
				process.stdin.on('keypress',lis.kchoose);
				//keyword page listener
				break;
			case 2:
				//Favorite page listener
				console.log('2');
				break;
			default:
				break;
		}
	}
}