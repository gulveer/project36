

var dog, sadDog, happyDog;
var button1, button2;
var foodObj;
var fedTime, lastFed;
var database;
var foodStock;
var getFoodStock;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database = firebase.database();
  console.log(database);
 
  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  food = new Food(500,500,30,30);

feed = createButton("FEED THE DOG");
feed.position(600,95);
feed.mousePressed(feedDog);

addFood=createButton("ADD FOOD");
addFood.position(800,95);
addFood.mousePressed(addFoods);


}

function draw() {
  background(46,139,87);
  
  food.display();

  
  drawSprites();
}

//function to read food Stock

//function to update food stock and last fed time
function feedDog(){
      
  dog.addImage(happyDog);
  
  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  
  }else {
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  
   }
  }  

//function to add food in stock

function addFoods(){
  foodStock++;
  database.ref('/').update({
    Food:foodStock

  })


}