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

const promObj = readFileP("menuMe.csv");
promObj.then((result) => {
    let data = (result.toString().split('\n'));
    organize(data);
});
promObj.catch((err) => console.log(err));




function organize(data) {
    let menu = []; // general array
    let lunchSec = [];
    let dinnerSec = [];
    let dessertSec = [];
    for (let value of data){
        let splitData= value.split(',');
        menu.push(splitData);
    }
    for(let food of menu){
        let newFood ={}; 
        newFood.name = food[1];
        newFood.quantity = food[2];
        newFood.price = food[3];
        if(food[0] === 'lunch'){
            lunchSec.push(newFood);
        } else if(food[0] === 'dinner'){
            dinnerSec.push(newFood);
        } else if(food[0] === 'dessert'){
            dessertSec.push(newFood);
        }
    }

    console.log(" * Lunch Items *");
    lunch(lunchSec);
    console.log(" * Dinner Items *");
    dinner(dinnerSec);
    console.log(" * Dessert Items *");
    dessert(dessertSec);
}

function lunch(lunchSec){
    for(let lunch of lunchSec){
        console.log(lunch.price + "  " + lunch.name + ", " + lunch.quantity + "\n");
    }
}

function dinner(dinnerSec){
    for(let dinner of dinnerSec){
        console.log(dinner.price + "  " + dinner.name + ", " + dinner.quantity + "\n");
    }
}

function dessert(dessertSec){
    for(let dessert of dessertSec){
        console.log(dessert.price + "  " + dessert.name + ", " + dessert.quantity + "\n");
    }
}


