Array.prototype.last = function () {
    return this[this.length - 1];
};

var object = {foo: "bar", bar: "foo"};
var array = [1, 2, 3];

array.last(); //3

for (var key in object) {
    console.log(key); //"foo", "bar"
}

for (var key in array) {
    if (array.hasOwnProperty(key)) {
        console.log(key); //"0", "1", "2", "last"
    }
}

var object = {foo: "bar", bar: "foo"};
var array = [1, 2, 3];

//IE > 8
array.forEach(function (elem, index) {
    console.log(elem); //1,2,3
});

//IE > 8
Object.keys(object).forEach(function (key, index) {
    console.log(object[key]);
});

//the new shit
for (var keyValue of Object.entries(object)) {
    console.log(keyValue[0], keyValue[1]);
}

//literal
function logGrumpily(message) {
    console.log(":( " + message);
};

//variable
var logHappily = function (message) {
    console.log(":) " + message);
};

//arguments or return types
var createLogger = function (logger, message) {
    return function () {
        logger(message);
    }
};

var grumpyCatLogger = createLogger(logGrumpily, "Cat");
var happyDogLogger = createLogger(logHappily, "Dog")
grumpyCatLogger(); // :( Cat
happyDogLogger(); // :) Dog

//Object properties or array elements
var obj = {
    foo: true, bar: function (message) {
        logHappily(message)
    }
};
var arr = [true, function (message) {
    logHappily(message)
}]
obj.bar("object"); //:) object
arr[1]("array"); // :) array

//usage .apply, arguments and this
function addPrefix() {
    var argumentsArray = Array.prototype.slice.call(arguments);
    var callbackFn = argumentsArray.pop();
    var prefix = argumentsArray.shift();
    var newValues = argumentsArray.map(elem => prefix + elem);
    callbackFn.apply({prefix: prefix, state: "SUCCESS"}, newValues);
};

addPrefix("un-", "cool", "happy", function (cool, happy) {
    console.log(this, cool, happy); //{prefix: "un-", state: "SUCCESS"} "un-cool" "un-happy"
});

addPrefix("super-", "smart", "dumb", "cool", "nervous", function (smart, dumb, cool, nervous) {
    console.log(this, smart, dumb, cool, nervous); //{prefix: "super-", state: "SUCCESS"} "super-smart" "super-dumb" "super-cool" "super-nervous"
});

//you can even dynamically create functions from strings :O
var logDynamic = function (suffix) {
    return new Function("message", "prefix", 'return prefix + message + "' + suffix + '";');
};

var logWithExclamation = logDynamic("!");
logWithExclamation("Cat", "Prefixed"); // "CatPrefixed!"

//no arguments, no this, mainly shorthand:
// - no bracket for single argument
// - no curly braces: line is returned
var addFiveArrow = number => number + 5;
var addFive = function (number) {
    return number + 5;
};

var addFiveAndSixArrow = (number1, number2) => {
    return number1 + number2 + 5 + 6;
};


//Syntax standard
var foo = function () {
    console.log(arguments, this); //Arguments Object, {foo:'bar'}
};

//Syntax arrow function
var fooArrow = () => {
    console.log(typeof arguments, this); //undefined, window
};

foo.apply({foo: 'bar'}, [0, 1, 2]);
fooArrow.apply({foo: 'bar'}, [0, 1, 2]);

//Shortcut syntax, for single argument and return
var bar = function (num) {
    return num + 1;
};

//no bracket for single argument, no curly braces means statement ist returned
var barArrow = num => num + 1;

//multiline with brackets
var barArrow2 = num => ({
    num: num + 1
});

//often used with chaining
[1, 2, 3, 4, 5].filter(item => item % 2 > 0).map(item => item * 2);

(function () {
    var foo = "bar";
})();

console.log(foo); //ERROR: Uncaught ReferenceError: foo is not defined

//scoping
(function () {
    var foo = "foo1";
    var bar = "bar";

    function doStuff() {
        var foo = "foo2";
        console.log(foo); // foo2
        console.log(bar); // bar
    }

    doStuff();
    console.log(foo); // foo1
    console.log(bar); // bar
})();


//Closures are handy to hold internal state
var dog = function (name) {
    var age;
    return {
        setAge: newAge => {age = newAge;},
        bark: message => {
            return age
                ? ["BARK!", message, "I'm", name, ",", age].join(" ")
                : "WHINE!";
        },
        //no arrow function as we want to use "this"
        getBarker: function (messagePrefix) {
            // when a function is called as an object prop 'this' refers to the parent object
            return (message) => {
                return this.bark(messagePrefix + " : " + message);
            }
        }
    }
};

var paul = dog("paul");
console.log(paul.bark("Hello.")); //WHINE!
paul.setAge(4);
console.log(paul.bark("Hello")); //BARK! Goodbye I'm paul , 4

var maggie = dog("maggie");
maggie.setAge(10);
console.log(maggie.bark("Go Away!")); //BARK! Go Away! I'm maggie , 10

var ekki = dog("Ekki");
var ekkiDefaultBarker = ekki.getBarker("GEIL!");
ekki.setAge(12);
console.log(ekkiDefaultBarker("Hello.")); //BARK! GEIL! : Hello. I'm Ekki , 12
ekki.setAge(25);
console.log(ekkiDefaultBarker("Hello.")); //BARK! GEIL! : Hello. I'm Ekki , 25

//var declarations and function literals are hoisted to the top of their scope
var cat = function(name) {
    if(name) {
        var newName = name + ", the Cat.";
        meow(newName); //Meow, Mary, the Cat.
        purr(); //Uncaught TypeError: purr is not a function
    }

    function meow(message){
        console.log("Meow, " + message);
    }

    var purr = function() {
        console.log("Purr, " + message);
    }
};

cat("Mary");

//this is how the JS compiler changes the code
var hoistedCat = function(){+
    var name, purr;
    function meow(message){
        console.log("Meow, " + message);
    }
    if(name) {
        var newName = name + ", the Cat.";
        meow(newName); //Meow, Mary, the Cat.
        purr(); //Uncaught TypeError: purr is not a function
    }
    purr = function() {
        console.log("Purr, " + message);
    }
};

// let and const are block scoped variables
var cat = function(name) {
    if (name) {
        const newName = name + ", the Cat."; //newName is only visible in the if-block
        let catAge = 5;
        catAge = 7; //works!
        newName = "foo"; //TypeError: Assignment to constant variable.
    }
    console.log(catAge); //ReferenceError: catAge is not defined
};

cat("Mary");

//modules let you encapsulate things in an easy manner on a file basis
//using imports and exports
//square.js
export const name = 'square';

export function draw(ctx, length, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, length, length);

    return {
        length: length,
        x: x,
        y: y,
        color: color
    };
};

//app.js
import { name, draw } from 'square.js';

// Promises are chainable and a good was of handling errors anywhere in the chain
const getRoles = new function (userInfo) {
    return new Promise((resolve, reject) => {
        database.connect()
            .then((connection) => connection.query('get roles sql'))
            .then((result) => resolve(result))
            .catch(reject)
    });
};

// Promises are an improvment but still clunky.
// Async / Await provides a way fo writing async functions synchronously
// a function must be declared async if it uses await or another async function
// async / await internally works with Promises
const verifyUser = async function(){
    try {
        const connection = await database.connect();
        const result = await connection.query('get roles sql');
        return userInfo;
    }catch (e){
        //handle errors as needed
    }
};



