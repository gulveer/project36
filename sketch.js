

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

foodObj = new Food(500,500,30,30);
foodStock=database.ref('Food');
foodStock.on("value",readStock);
  
feed = createButton("FEED THE DOG");
feed.position(600,95);
feed.mousePressed(feedDog);

addFood=createButton("ADD FOOD");
addFood.position(800,95);
addFood.mousePressed(addFoods);


}

function draw() {
  background(46,139,87);
  fill("black");
  textSize(20);
  text("TOMMY",770,140);
  
  foodObj.display();
  
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 150,30);
  }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
    text("Last Feed : "+ lastFed + " AM", 150,30);
   }
  
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodStock=data.val();
  foodObj.updateFoodStock(foodStock);
}

//function to update food stock and last fed time
function feedDog(){
      
  dog.addImage(happyDog);
  
  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  
  }else {
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  
   }
   
   database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
  
  
  }  

//function to add food in stock

function addFoods(){
  foodStock++;
  database.ref('/').update({
    Food:foodStock

  })


}