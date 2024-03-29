var bk;
var run_r, run_l, stoping, bot1, bot2;
var pc;
var ball, ballimg;
var pl;
var p1,p2,p3,p4;
var area1, area2;
var estado = "jogar";
var linhapc, linhapl;
var scorepc=0;
var scorepl=0;

function preload(){ // função que carregar todas as imagens e animações
  bk = loadImage("assets/bk.png");
  run_r = loadAnimation("assets/p2.png","assets/p3.png","assets/p4.png","assets/p5.png","assets/p6.png","assets/p7.png");
  run_l = loadAnimation("assets/p8.png","assets/p9.png","assets/p10.png","assets/p11.png","assets/p12.png","assets/p13.png");
  stoping = loadAnimation("assets/p1.png");
  bot1 = loadAnimation("assets/p14.png","assets/p15.png","assets/p16.png");
  bot2 = loadAnimation("assets/p17.png","assets/p18.png","assets/p19.png");
  ballimg = loadImage ("assets/bola.png")
}

function setup(){ // todas as configuraçoes dos objetos
  createCanvas(900,600);
  
  //paredes
 
  p1 = createSprite (650,85,10,100)
  p2 = createSprite (170,85,10,100)
  p3 = createSprite (31,500,10,100)
  p4 = createSprite (830,500,10,100)
  // area1= createSprite (411,200, 500,50)
  // area2= createSprite (411,384, 500,100)

  pc = createSprite(401,125,20,20);
  pc.addAnimation("stop", stoping);
  pc.addAnimation("run_r", run_r);
  pc.addAnimation("run_l", run_l);
  pc.addAnimation("bot1",bot1);
  pc.addAnimation("bot2",bot2);
  pc.scale = 0.5;

  ball = createSprite(440,312, 10,10);
  ball.addImage(ballimg);
  ball.scale = 0.5

  pl = createSprite(436,527,20,20);
  pl.addAnimation("stop", stoping);
  pl.addAnimation("run_r", run_r);
  pl.addAnimation("run_l", run_l);
  pl.addAnimation("bot1",bot1);
  pl.addAnimation("bot2",bot2);
  pl.scale = 0.5;

  pc.debug = true;
  pl.debug = true;
  ball.debug = true;
  // area1.debug = true; 
  // area2.debug = true;
  
  ball.setCollider("circle", 0,0,20)
 pc.setCollider("rectangle", 0,0,200,0.1 )
  // area1.setCollider("rectangle", 0,0,500,0.1 )
  // area2.setCollider("rectangle", 0,0,500,0.1)

  linhapc = createSprite(423,130,500,2)
  linhapl = createSprite(451,538,800,2)

}

function draw(){
  background(bk);
  drawSprites(); 
  textSize(20)
  fill("white")
 text(scorepc,135,106)
 text(scorepl,143,53)
  if(estado === "jogar"){
    paredes ();
    controle();
  }
  else if (estado === "fim"){
     ball.x = 440;
     ball.y = 312;
     pc.x = 401;
     pc.y = 125;
     pc.velocityX =0;
     pl.x = 436;
     pl.y = 527;
     pl.velocityX =0;
     
     if(keyDown("space")){
      estado = "jogar"
     }
     
  }
  fill ("black");
  text (mouseX + ", " + mouseY, mouseX, mouseY);
//   console.log(ball.velocityY)
}

function controle(){
  if (keyDown("space")){
    ball.velocityY = 4;
    ball.velocityX = 4;
    pc.velocityX = -5
    pc.changeAnimation("run_r", run_r);
  }

  if(keyDown("right")){
    pl.velocityX = 5;
    pl.changeAnimation("run_r", run_r);
  }

  if(keyDown("left")){
    pl.velocityX = -5;
    pl.changeAnimation("run_l", run_l);
  }

  if(ball.bounceOff(pl)){
    pl.changeAnimation("bot1",bot1);
    ball.velocityY -= 6;
    ball.velocityX = random(-4,5)
    setTimeout(() => {
      pl.changeAnimation("stop",stoping);
      pl.velocityX = 0
    },300);
  }

  if(ball.bounceOff(pc)){
    pc.changeAnimation("bot1",bot1);
    ball.velocityY -= 6;
    ball.velocityX = random(-10,10)
    setTimeout(() => {
      pc.changeAnimation("stop",stoping);
      pc .velocityX = 0
    },300);
  }
  
  if(ball.velocityX < 0){
    pc.changeAnimation("run_l", run_l);
    pc.velocityX = ball.velocityX
  }
  if(ball.velocityX > 0){
    pc.changeAnimation("run_r", run_r) ;
    pc.velocityX = ball.velocityX
  }

  if ((ball.y < linhapc.y) || (ball.y > linhapl.y)){
     estado = "fim"
     if(ball.y < linhapc.y){
      scorepl++ 
     } else{
      scorepc++
     }
  }
  
}


function paredes (){
   pc.collide(p1)
   pc.collide(p2)
   pl.collide(p3)
   pl.collide(p4)    
} 