const keypress = require('keypress');
const readline = require('readline');
const ctrl = require('./ctrl.js');
let home =  ctrl.homepage;

function hchoose(ch,key){
  switch(key.name){
    case 'up':
      home.up();
      break;
    case 'down':
      home.down();
      break;
    case 'left':
      process.stdin.removeListener('keypress',hchoose);
      const _menu = require('./menu.js');
      _menu();
      break;
    case 'right':
      home.right()
      break;
    case 'space':
      home.save();
      break;
    case 'return':
      home.open();
      break;
  }
}

function fchoose(ch,key){
  let fav = new ctrl.favpage();
  switch(key.name){
    case 'up':
      fav.up()
      break;
    case 'down':
      fav.down();
      break;
    case 'left':
      process.stdin.removeListener('keypress',fchoose);

      const _menu = require('./menu.js');
      _menu();
      break;
    case 'right':
      fav.right();
      break;
    case 'd':
      fav.delete();
      break;
    case 'return':
      fav.open();
  }
}

module.exports = function(){
    let keyword = new ctrl.keypage('');
    function kchoose(ch,key){
      switch(key.name){
        case 'up':
          keyword.up();
          break;
        case 'down':
          keyword.down();
          break;
        case 'left':
          process.stdin.removeListener('keypress',kchoose);

          const _menu = require('./menu.js');
          _menu();
          break;
        case 'right':
          keyword.right();
          break;
        case 'space':
          keyword.save();
          break;
        case 'return':
          keyword.open();
      } 
    }
    process.stdout.write('\x1bc');
    const inquirer = require('inquirer');
    inquirer.prompt([{
    	type:'list',
    	name:'choice',
    	message:'What do you want?',
    	choices:[        
                new inquirer.Separator(),
    		{name:'Watch the home page',value:'home'},
    		{name:'Input your keyword to find',value:'keyword'},
    		{name:'Favorite',value:'favorite'},
    			new inquirer.Separator(),
    		{name:'Exit',value:'exit'}]
    }]).then(async function(answer){
    	switch(answer.choice){
    		case "home": 
                keypress(process.stdin);
                process.stdin.on('keypress',hchoose);
                process.stdin.setRawMode(true);
                process.stdin.resume();
                home.renderTen();
                break;
    		case "keyword":
                if(keyword.key!==''){
                    
                    keypress(process.stdin);
                    process.stdin.setRawMode(true);
                    process.stdin.resume();
                    process.stdin.on('keypress',kchoose);
                    keyword.renderTen();
                }
                else{
                    process.stdin.setRawMode(false);
                    let rl = readline.createInterface({
                      input: process.stdin,
                      output: process.stdout
                    });
                    console.log('Give me keyword: ')
                    rl.on('line',answer=>{
                        keyword.key = answer;
                        rl.close();
                    })
                    rl.on('close',function(){
                        if(keyword.key===''){
                            console.log('keyword empty');
                            process.exit();
                        }
                        keypress(process.stdin);
                        process.stdin.setRawMode(true);
                        process.stdin.resume();
                        process.stdin.on('keypress',(ch,key)=>{
                            if(key && key.ctrl &&key.name=='c'){
                                process.stdin.pause();
                            }
                        })
                        process.stdin.on('keypress',kchoose);
                        keyword.renderTen();
                    })
                }
                break;
    		case "favorite":

                let fav = new ctrl.favpage();
                keypress(process.stdin);
                process.stdin.setRawMode(true);
                process.stdin.resume();
                process.stdin.on('keypress',fchoose);
                fav.renderTen();
                //Favorite page listener
                break;
    		case "exit":
                process.stdout.write('\x1bc');
                console.log('Good bye')
    			process.exit();
    			break;
    		default:
    			break;
    	}
    })
}
