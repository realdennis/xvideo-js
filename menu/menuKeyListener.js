//let keypress = require('keypress');
let menu = require('./menu.js');

exports.all = function(index){
    //let index = 0;
    menu.render(index);
    function checkIndexRange(index){
        return (index+4)%4;
    }
    //keypress(process.stdin);
    //process.stdin.setRawMode(true);
    //process.stdin.resume();
    process.stdin.on('keypress',function arrow(ch,key){
        switch(key.name){
            case 'up':
                index--;
                index = checkIndexRange(index)
                menu.render(index);
                break;
            case 'down':
                index++;
                index = checkIndexRange(index);
                menu.render(index);
                break;
            case 'backspace':
            case 'left':
                menu.render(index=3);
                break;
            case 'return':
            case 'right':
                process.stdin.removeListener('keypress',arrow);
                menu.choose(index);
                break;
        };
    });
}