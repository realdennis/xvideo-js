let lis = require('../xvideo/listen.js')

console.reset =  function () {
  return process.stdout.write('\033c');
};

exports.render = function(index){	
	const menu = {
	    0:'Watch the home page',
	    1:'Input your keyword to find',
	    2:'Favorite',
	    3:'Exit'
	};
	console.reset();
	for(i in menu){
		if(i == index) tab = '->	';
		else tab = '  	'
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
				process.stdin.setRawMode(false);
				process.stdin.removeAllListeners();

				var readline = require('readline');
				var rl = readline.createInterface({
				  input: process.stdin,
				  output: process.stdout
				});
				rl.question('Give me keyword: ', answer=>{
					//rl.removeListener('line',input);
					lis.kkk.keyword = answer;
					rl.close();
				});
				rl.on('close',function(){
					if(lis.kkk.keyword==''){
						console.log('keyword empty');
						process.exit();
					}
					//var keypress = require('keypress');
					process.stdin.setRawMode(true);
					process.stdin.resume()
					//keypress(process.stdin);
					process.stdin.on('keypress',lis.kchoose);
					process.stdin.on('keypress',(ch,key)=>{
						if(key && key.ctrl &&key.name=='c'){
							process.stdin.pause();
						}
					})
					lis.keywords.renderTen();
				})
				break;
			case 2:
				process.stdin.on('keypress',lis.fchoose);
				lis.fpages.renderTen();
				//Favorite page listener
				break;
		}
	}
}