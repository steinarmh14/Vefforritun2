HelloWorld();
function HelloWorld(){	
	
	return console.log("Hello World!");
}

var hello = function HelloWorld(){	
	
	return console.log("Hello World!");
};

console.log(hello);

HelloWorld.call();

var numbers = [0,1,2,3,4,5,6,7,8,9];


function printArray(numbers){

	for (var i = 0; i < numbers.length; i++)
	 {
		console.log(numbers[i]);
	};
}

printArray(numbers);

function printArray2(numbers){

	for(x in numbers)
	{
		console.log(x);
	}
}

printArray2(numbers);

function printArray3(numbers){

	numbers.forEach(function(numbers){

		console.log(numbers);
	});
}
printArray3(numbers);

var p = {

	name: "Steinar Marinó Hilmarsson", 
	age: 23
};

console.log(p);

function Person(name, age){

	this.name = name;
	this.age = age;
}

var x = new Person("Steinar", 23);
var p2 = new Person("Guðni", 25);

console.log(x);
console.log(p2);





