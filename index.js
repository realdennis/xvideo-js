let menu = require('./menu.js');
const chalk = require('chalk');
console.reset =  function () {
  return process.stdout.write('\033c');
};

console.reset();
console.log('===============================');
console.log('|                             |');
console.log('|     Welcome to '+chalk.bgWhite.red.bold('Xvideo.js')+'    |');
console.log('|                             |');
console.log('===============================');
console.log('');
console.log('      '+chalk.bgCyan.bold('Are you 18?')+' (Enter/q)');

let keypress = require('keypress');

keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();


process.stdin.on('keypress',(ch,key)=>{
    if(key &&key.ctrl && key.name=='c'){
        process.stdin.pause();
    }})

process.stdin.on('keypress',function accept(ch,key){
    if(key.name=='q'){
        console.log('okay goodbye');
        process.stdin.pause();
    }
    if(key.name=='return'){
        process.stdin.removeListener('keypress',accept);
        menu.control(0);
    }
})
