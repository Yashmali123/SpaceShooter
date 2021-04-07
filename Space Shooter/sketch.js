const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine,world;
var PLAY=1;
var END=0;
var gameState=PLAY;
var ground,bg;
var player,playerimg;
var die,checkpoint;
var score=0;
var wall1,wall2,wall3,wall4;
var count;
var aliens1,aliens2,aliens3,aliens4,aliens5,aliens6;
var meter1,meter2,img1,img2,img3,img4,img5,lose;
var satellite,satelliteimg;
var enemy2,enemy3,enemy4,enemy4,enemy5,enemy6,enemy7;
var enemyGroup,satelliteGroup,meterGroup;
var gameover,restart;

function preload() {
 
bg=loadImage("back.png")
playerimg=loadImage("spaceship.png")

enemy1=loadImage("enemy1.png");
enemy2=loadImage("enemy2.png");
enemy3=loadImage("enemy3.png");
enemy4=loadImage("enemy4.png");
enemy5=loadImage("enemy5.png");
enemy6=loadImage("enemy6.png");
enemy7=loadImage("enemy7.png");


img1=loadImage("sprites/meter2.png");
img2=loadImage("sprites/meter4.png");
img3=loadImage("Header.png");
img4=loadImage("re.png");
img5=loadImage("Score.png");
lose=loadSound("end.mp3.wav")

satelliteimg=loadImage("download.png")

  }

  function setup(){
    var canvas  = createCanvas(800,500);
    engine = Engine.create();
    world = engine.world;

    player=createSprite(400,400,20,20)
    player.addImage("ship",playerimg)
    player.scale=0.7;
    player.visible=true;
    player.setCollider("rectangle",0,0,110,110)

     wall1=createSprite(10,390,20,300);
     wall2=createSprite(400,250,800,20);
     wall3=createSprite(400,490,800,20);
     wall4=createSprite(790,390,20,300); 

     gameover=createSprite(400,150,100,100);
     gameover.addImage("iam",img3)
     gameover.visible=false;

     restart=createSprite(400,250,100,100);
     restart.addImage("ia",img4)
     restart.scale=0.5;
     restart.visible=false

     count=createSprite(600,50,100,100);
     count.addImage("ia",img5);
     count.scale=0.6;

    
     wall1.visible=false;
     wall2.visible=false;
     wall3.visible=false;
     wall4.visible=false;
     
     enemyGroup=createGroup();
     satelliteGroup=createGroup();
     meterGroup=createGroup();
    
  }


  function draw(){
    background(bg);

    color(255,255,255)
    textSize(30)
    text(score,700,60)
   
   

  if(gameState===PLAY){


    score=score+Math.round(getFrameRate()/60)
  
    player.velocityX=0;
    player.velocityY=0;

    if(keyDown(LEFT_ARROW)){
    player.velocityX=-8
    player.velocityY=0;
    }

    if(keyDown(RIGHT_ARROW)){
    player.velocityX=8
    player.velocityY=0;
      }

    if(keyDown(UP_ARROW)){
    player.velocityX=0
    player.velocityY=-8;
        }

    if(keyDown(DOWN_ARROW)){
    player.velocityX=0
    player.velocityY=8;
    }
    
    player.collide(wall1);
    player.collide(wall2);
    player.collide(wall3);
    player.collide(wall4);
    Enemy();
    meters1();
    meters2();
    satellites()

   if(player.isTouching(enemyGroup)){
    lose.play();
     gameState=END
   }
   
    }else if(gameState===END){
      enemyGroup.destroyEach();
      satelliteGroup.destroyEach();
      meterGroup.destroyEach();
      gameover.visible=true;
      restart.visible=true;
      player.visible=false;
     
     
      if(keyDown("r")){
        reset();
        }

      }
  
    Engine.update(engine);
    drawSprites();
    }

    function reset(){
      gameState=PLAY
       score=0;
       player.visible=true;
       restart.visible=false
       gameover.visible=false;
      }

   function Enemy(){
    if(frameCount%50===0){
      aliens=createSprite(random(100,700),0,100,100)
      aliens.velocityY=(6+ 3*score/200)
      aliens.scale=0.2;
      var rand = Math.round(random(1,6));
      switch(rand){
          case 1: aliens.addImage("alien",enemy2)
          break;
          case 2: aliens.addImage("alien",enemy3)
          break;
          case 3: aliens.addImage("alien",enemy4)
          break;
          case 4: aliens.addImage("alien",enemy5)
          break;
          case 5: aliens.addImage("alien",enemy6)
          break;
          case 6: aliens.addImage("alien",enemy7)
          break;
      }
      aliens.lifetime=100
      enemyGroup.add(aliens)
   }

  }


  function meters1(){
  if(frameCount%300===0){
  meter1=createSprite(-20,120,20,20)
  meter1.addImage("meter1",img1)
  meter1.scale=0.2;
  meter1.velocityX=10;
  meter1.lifetime=120;
  meterGroup.add(meter1);
    }
  }

  function meters2(){
  if(frameCount%200===0){
  meter2=createSprite(820,250,20,20)
  meter2.addImage("meter1",img2)
  meter2.scale=0.2;
  meter2.velocityX=-10;
  meter2.lifetime=120;
  meterGroup.add(meter2);
    }
  }

  function satellites(){
   if(frameCount%600===0){
  satellite=createSprite(820,225,20,20)
  satellite.addAnimation("meter1",satelliteimg)
  satellite.scale=0.4;
  satellite.velocityX=-5;
  satellite.lifetime=200;
  satelliteGroup.add(satellite)
  }

  }


