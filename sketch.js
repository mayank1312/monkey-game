var monkey,monkey1,jungle,stone,stones,fruit,fruits,ground,score,invisibleGround,PLAY,END,gameState,gameOver,reset ,over,RESET,highScore;
function preload(){
  monkey1=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
 
  
  jungle=loadImage("jungle.jpg ");
  stone=loadImage("stone.png");
  fruit=loadImage("banana.png");
  gameOver=loadImage("gameover.png");
  reset=loadImage("restart.png");
}


function setup() {
  createCanvas(400, 400);
  jungly=createSprite(200,200,400,400);
  jungly.addImage(jungle);
  jungly.scale=1;
  jungly.velocityX=-4;
  monkey=createSprite(50,345,10,10);
  monkey.addAnimation("monkey1",monkey1);
  monkey.scale=0.13;
ground=createSprite(200,390,400,10)
  ground.visible=false;
 score=0;
  fruity=createGroup();
  stony=createGroup();
  invisibleGround=createSprite(200,170,400,10)
  invisibleGround.visible=false;
  PLAY=2;
  END=6;
  gameState=PLAY;
  over=createSprite(200,120,10,10);
  over.addImage(gameOver);
  over.scale=0.4;
  over.visible=false;
  RESET=createSprite(200,200,10,10);
  RESET.addImage(reset);
  RESET.scale=0.1;
  RESET.visible=false;
  highScore=0;
  
}

function draw() {
  background(220);
  if(gameState===PLAY){
    if(jungly.x<0){
     jungly.x=jungly.width/2;
}
  if(keyDown("space") ){
    monkey.velocityY=-7;
    
  }
    monkey.velocityY+=0.3;
 monkey.collide(ground);
  monkey.bounceOff(invisibleGround);
 spawnObstcale();
  spawnFruits();
    if(monkey.isTouching(fruity)){
  score+=2;
  fruity.destroyEach();
  monkey.scale+=0.02;
   
}
  if(monkey.isTouching(stony)){
    
    stony.destroyEach();
    monkey.scale-=0.03;
    
  }
  if(monkey.scale<=0.07){
    gameState=END;
   
  }
  }
  if(gameState===END){
    jungly.velocityX=0;
over.visible=true;
    RESET.visible=true;
    monkey.x=50;
    monkey.y=345;
    fruity.setVelocityEach(0);
    fruity.destroyEach();
    if(mousePressedOver(RESET)){
       restarting();
       
       }
    
  }
  
  
  drawSprites();
   textSize(20);
  fill("red");
  stroke("yellow");
  text("score: "+score,160,50);
 text("High score:"+highScore,250,50)
}
function spawnObstcale(){
  if(frameCount % 110===0){
     stones=createSprite(Math.round(random(340,370)),368,10,10);
   stony.add(stones);
   stones.addImage(stone);
    stones.scale=0.1; 
    stones.velocityX=-4;
     }
  
}

  function spawnFruits(){
    if(frameCount % 180===0){
     fruits=createSprite(Math.round(random(330,380)),270,10,10);
  fruity.add(fruits);
   fruits.addImage(fruit);
    
  fruits.scale=0.06;
    fruits.velocityX=-4;
    }
  }
function restarting(){
  gameState=PLAY;
  over.visible=false;
  RESET.visible=false;
  
  jungly.velocityX=-3;
  monkey.scale=0.13;
   if(score>highScore){
    highScore=score;
    
  }
  score=0;
}