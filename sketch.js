
var unicorn , unicorn_running , unicorn_collided , unicorn_dash;
var banana ,bananaImage, obstacle, obstacleImage ;
var bananaGrp, obstacleGrp ;
var score = 0 ;
var backgroundImg , backGround;
var ground , groundImg;
var score = 0;
var edge;
var deadSound;
var PLAY = 1 , END = 0 , gameState = 1 ;

function preload(){
  
  
  unicorn_running =            loadAnimation("one.png" , "two.png" ,"three.png")
  
  unicorn_collided = loadAnimation("dead.png");
  
  unicorn_dash = loadAnimation("spark.png");
  
  bananaImage = loadImage("coin.png");
  obstacleImage = loadImage("stone.png");
 backgroundImg =loadImage("pa.jpg");
  //groundImage = loadImage("ground.jpg");
  
  deadSound = loadSound("3.wav");
  jumpSound = loadSound("1.mp3");
  dashSound = loadSound("2.mp3");
  
}



function setup() {
  
  createCanvas (1000,400);
  
  
  backGround = createSprite (0,0,600,600);
 backGround.addImage(backgroundImg);
  backGround.scale = 2.7;
    
  
    edge = createSprite(500,200,10,600);
  edge.visible=false;

  
   
  
 
  unicorn = createSprite (400,320,50,50);
  unicorn.X = 400;
  unicorn.addAnimation("running" , unicorn_running);
  unicorn.addAnimation("dead" , unicorn_collided);
  unicorn.addAnimation("dash" , unicorn_dash);
  unicorn.scale= 0.5;
  
 
  
  
  
  ground = createSprite(200,380,800,10);
 //ground.addImage(groundImg);
  ground.velocityX = -4; 
  ground.shapeColor = "black" ;
  //ground.x = ground.width /2 ;
  
   
   
  
  bananaGrp = createGroup();
   obstacleGrp = createGroup();
 
 
}


function draw() {
  
  //background(200, 500, 100);
score = Math.ceil(frameCount/frameRate());
  stroke("black");
  textSize(20);
  fill("black");
  text ("Score:" +score , 200 ,200 );
  
  unicorn.collide(edge);
  
  if(gameState===PLAY){
    
    //runSound.play();
 backGround.velocityX = (3 + 2*score/5) ;
    
 
  
  
  if(backGround.x > 600) {
     backGround.x = backGround.width/2 ;
     
     }
 
 
  
  if (keyDown("space") && unicorn.y >= 150){
    unicorn.velocityY = -10;
    dashSound.play();
  }
  
unicorn.velocityY = unicorn.velocityY + 0.4;
  unicorn.collide(ground);
  
  if (ground.x < 200){
      ground.x = ground.width/2;
    }
  unicorn.X = 400;
  
  if (frameCount % 200 === 0){
    banana = createSprite (500,300,20,20);
    banana.addImage (bananaImage);
    banana.scale = 0.2 ;
    
    banana.x = Math.round (random(40,50));
    banana.y = Math.round (random(50,200));
    banana.velocityX = (3 + 1*score/5);
    banana.lifetime= 150;
    
    
   bananaGrp.add(banana);
  }
  
  
  
 
  
    
    
  
  
  if(frameCount % 150 === 0){
    obstacle = createSprite(200,200,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.3 ;
    obstacle.y = 352 ; 
    
    obstacle.x = Math.round(random(0,80));
    obstacle.velocityX = (4 + 2*score/5);
    obstacle .lifetime= 150;
    
     obstacle.depth = unicorn.depth;
    unicorn.depth = unicorn.depth + 1;
    
    obstacleGrp.add(obstacle);
}
  
  if(bananaGrp.isTouching(unicorn)){
    bananaGrp.destroyEach();
    
    score = score + 1;
  } 
  
 
  
  if (keyDown("left_arrow")){
    unicorn.changeAnimation("dash" , unicorn_dash);
    unicorn.velocityX= -10;
  }
if (keyWentUp("left_arrow")){
    unicorn.changeAnimation("running" , unicorn_running);
  unicorn.velocityX = 4;
 }
    if(obstacleGrp.isTouching(unicorn)&& unicorn.velocityX>0){
    //unicorn.changeAnimation("dead" , unicorn_collided);
      
      jumpSound.play();
    
     obstacleGrp.destroyEach();
    
    
   //gameState= END;
  }
    
  
    
    if(obstacleGrp.isTouching(unicorn)&& unicorn.velocityX===0){
    unicorn.changeAnimation("dead" , unicorn_collided);
    
     bananaGrp.destroyEach();
     obstacleGrp.destroyEach();
    
      deadSound.play( );
    
   gameState= END;
      
      if(score%5===0){
    obstacle.velocityX = obstacle.velocityX+200;
    banana.velocityX = banana.velocityX + 1;
    backGround.velocityX = backGround.velocityX +2;
  }
 
  }
    
  }
  
  
  if(gameState===END){
    backGround.velocityX =0;
    
    ground.visible = false;
    unicorn.x=300;
    unicorn.y=200;
    
    score.X=-10;
  }

 
  drawSprites();
  
  
  stroke("black");
  textSize(15);
  fill("black");
  text ("Press Space:"  , 20 ,20 );
  
  stroke("black");
  textSize(15);
  fill("black");
  text ("to jump"  , 20 ,34 );
  
  stroke("black");
  textSize(15);
  fill("black");
  text ("Press Left Arrow:"  , 340 ,20 );
  
  stroke("black");
  textSize(15);
  fill("black");
  text ("To surpass Obstacles"  , 340 ,34 );
  
  
  }


  




