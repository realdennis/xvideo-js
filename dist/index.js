#!/usr/bin/env node

const chalk = require('chalk');
const RESET = () => process.stdout.write('\x1bc');
const WELCOME = `===============================
|                             |
|     Welcome to ${chalk.bgWhite.red.bold('Xvideo.js')}    |
|                             |
===============================`;

RESET();
console.log(WELCOME);

const inquirer = require('inquirer');
inquirer.prompt([{
    type: 'confirm',
    name: 'NSFW',
    message: 'Are you 18?'
}]).then(ans => {
    if (ans.NSFW) {
        const _menu = require('./lib/menu.js');
        _menu();
    } else {
        RESET();
        console.log('okay goodbye');
        process.stdin.pause();
    }
});
/*arg parse
if(process.argv[2]=='-k'){
    if(process.argv[3]!=undefined){
        const keypress = require('keypress')
        let lis = require('./xvideo/listen.js');
        lis.keywords.keyword = process.argv[3];
        keypress(process.stdin);
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on('keypress',(ch,key)=>{
            if(key && key.ctrl &&key.name=='c'){
                console.reset();
                process.stdin.pause();
            }
        })        
        process.stdin.on('keypress',lis.kchoose);
        lis.keywords.renderTen();
    }
}else{
    */

//need global listen key "q"