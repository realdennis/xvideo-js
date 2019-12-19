#!/usr/bin/env node
const chalk = require('chalk');
const RESET =  ()=> process.stdout.write('\x1bc');
const WELCOME = `===============================
|                             |
|     Welcome to ${chalk.bgWhite.red.bold('Xvideo.js')}    |
|                             |
===============================`;

RESET();
console.log(WELCOME);

const inquirer = require('inquirer');
inquirer.prompt([{
    type:'confirm',
    name:'NSFW',
    message:'Are you 18?'
}]).then(ans=>{
    if(ans.NSFW){
        const _menu = require('./lib/menu.js')
        _menu();
    }else{
        RESET();
        console.log('okay goodbye');
        process.stdin.pause();
    }
})