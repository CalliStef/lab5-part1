var fs = require('fs');

const readFileP = (file) => {
return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
    if (err) {
        reject(err);
    } else {
        resolve(data);
    }
    });
});
};

const promObj = readFileP("menu1.csv");
promObj.then((result) => {
    let data = (result.toString().split('\n'));         // splits each line of the csv into an element and stored in a data called array
    organize(data);
});
promObj.catch((err) => console.log(err));

function organize(data) {
    let menu = [];                  // a new array
    let lunchSec = [];              // new array that will contain objects of all the 'lunch' dishes
    let dinnerSec = [];             // new array that will contain objects of all the 'dinner' dishes
    let dessertSec = [];            // new array that will contain objects of all the 'dessert' dishes
    data.sort();
    for (let value of data){
        let splitData= value.split(',');    // with each element of the data array, split every word into an element of its own with it's own line array
                                            // ---> prints this for each line: [ 'dinner', 'roe', '2 rolls', '$3.95' ] 
        menu.push(splitData);
    }
    for(let food of menu){
        let newFood ={}; 
        newFood.name = food[1];
        newFood.quantity = food[2];
        newFood.price = food[3];
        if(food[0] === 'lunch'){
            lunchSec.push(newFood);         // object with the property name = 'lunch' is now stored into the array with all the 'lunch dishes
        } else if(food[0] === 'dinner'){
            dinnerSec.push(newFood);        // ^^^
        } else if(food[0] === 'dessert'){
            dessertSec.push(newFood);       // ^^^
        }
    }

    // had to use Sync or else the order of the writing that will be appended will be in the wrong order

    fs.writeFileSync('./part1.txt', " * Lunch Items * \n", (err) => console.error(err));
    let lunchMenu = lunch(lunchSec);
    if (!(lunchMenu == undefined)){
        fs.appendFileSync('./part1.txt', lunchMenu, (err) => console.error(err));
    } else {
        fs.appendFileSync('./part1.txt', "No menu added yet.", (err) => console.error(err));
    }


    fs.appendFileSync('./part1.txt', "\n * Dinner Items * \n", (err) => console.error(err));
    let dinnerMenu = dinner(dinnerSec);
    if (!(dinnerMenu == undefined)){
        fs.appendFileSync('./part1.txt', dinnerMenu, (err) => console.error(err));
    } else {
        fs.appendFileSync('./part1.txt', "No menu added yet.", (err) => console.error(err));
    }


    fs.appendFileSync('./part1.txt', "\n * Dessert Items * \n", (err) => console.error(err));
    let dessertMenu = dessert(dessertSec);
    if (!(dessertMenu == undefined)){
        fs.appendFileSync('./part1.txt', dessertMenu, (err) => console.error(err));
    } else {
        fs.appendFileSync('./part1.txt', "No menu added yet.", (err) => console.error(err));
    }

}

function lunch(lunchSec){
    let result = "";        // I couldn't find a better way for it to not append 'undefined' in the text file
    for(let lunch of lunchSec){
        result += '$' + (parseFloat(lunch.price.replace('$','')) * 1.8).toFixed(2) + "  " + lunch.name + ", " + lunch.quantity + "\n";
    }
    return result;
}

function dinner(dinnerSec){
    let result = "";
    for(let dinner of dinnerSec){
        result += '$' + (parseFloat(dinner.price.replace('$','')) * 1.8).toFixed(2) + "  " + dinner.name + ", " + dinner.quantity + "\n";
    }
    return result;
}

function dessert(dessertSec){
    let result = "";
    for(let dessert of dessertSec){
        result += '$' + (parseFloat(dessert.price.replace('$','')) * 1.8).toFixed(2) + "  " + dessert.name + ", " + dessert.quantity + "\n";
    }
    return result;
}
