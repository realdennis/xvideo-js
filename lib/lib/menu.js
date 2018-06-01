const keypress = require('keypress');
const listen = require('./listen.js');
const readline = require('readline');

module.exports = function () {
    process.stdout.write('\x1bc');
    const inquirer = require('inquirer');
    inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: 'What do you want?',
        choices: [new inquirer.Separator(), { name: 'Watch the home page', value: 'home' }, { name: 'Input your keyword to find', value: 'keyword' }, { name: 'Favorite', value: 'favorite' }, new inquirer.Separator(), { name: 'Exit', value: 'exit' }]
    }]).then(async function (answer) {
        switch (answer.choice) {
            case "home":
                keypress(process.stdin);
                process.stdin.on('keypress', listen.hchoose);
                process.stdin.setRawMode(true);
                process.stdin.resume();
                listen.homes.renderTen();
                break;
            case "keyword":
                if (listen.keywords.keyword != '') {

                    keypress(process.stdin);
                    process.stdin.setRawMode(true);
                    process.stdin.resume();
                    process.stdin.on('keypress', listen.kchoose);
                    listen.keywords.renderTen();
                } else {
                    process.stdin.setRawMode(false);
                    let rl = readline.createInterface({
                        input: process.stdin,
                        output: process.stdout
                    });
                    console.log('Give me keyword: ');
                    rl.on('line', answer => {
                        listen.keywords.keyword = answer;
                        rl.close();
                    });
                    rl.on('close', function () {
                        if (listen.keywords.keyword == '') {
                            console.log('keyword empty');
                            process.exit();
                        }
                        keypress(process.stdin);
                        process.stdin.setRawMode(true);
                        process.stdin.resume();
                        process.stdin.on('keypress', (ch, key) => {
                            if (key && key.ctrl && key.name == 'c') {
                                process.stdin.pause();
                            }
                        });
                        process.stdin.on('keypress', listen.kchoose);
                        listen.keywords.renderTen();
                    });
                }
                break;
            case "favorite":
                keypress(process.stdin);
                process.stdin.setRawMode(true);
                process.stdin.resume();
                process.stdin.on('keypress', listen.fchoose);
                listen.fpages.renderTen();
                //Favorite page listener
                break;
            case "exit":
                process.stdout.write('\x1bc');
                console.log('Good bye');
                process.exit();
                break;
            default:
                break;
        }
    });
};