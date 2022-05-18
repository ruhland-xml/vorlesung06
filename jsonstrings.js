const fs = require('fs');
const { getSystemErrorMap } = require('util');

let keywords = [];

function printValues(obj) {
    for(var key in obj) {
        if(obj[key] instanceof Object) {
            printValues(obj[key]);
        } else {
            let value = obj[key];
            if ( typeof value ===  "string" ){
                newString = value.replace(/[`~!@#$%^&*()_|+\-=?;:,.'"<>\{\}\[\]\\\/]/gi, ' ')
                let stringArray = newString.split(/(\s+)/);
                for ( let i=0; i< stringArray.length; i++ ){
                    let singleString = stringArray[i].trim().toLowerCase();
                    if ( singleString.length>0 && keywords.includes(singleString) === false )
                        keywords.push(singleString);
                }
            }
        };
    }
};


fs.readFile('test.json', 'utf8', function(err, data) {
    if (err) throw err;

    let my_object = JSON.parse(data);
    printValues(my_object);
    for ( let i=0; i< keywords.length; i++ ){
        keyword = keywords[i];
        console.log(keyword);
    }
});
