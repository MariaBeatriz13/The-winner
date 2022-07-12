var bk;
var run_r, run_l, stoping, bot1, bot2;
var pc;
var ball, ballimg;
var pl;

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
  pc = createSprite(401,125,20,20);
  pc.addAnimation("stop", stoping);
  pc.addAnimation("run_r", run_r);
   pc.addAnimation("run_l", run_l);
  pc.scale = 0.5;

  ball = createSprite(440,497, 10,10);
  ball.addImage(ballimg);
  ball.scale = 0.5
}

function draw(){
  background(bk);
  drawSprites(); 
  controle()
  fill ("black");
  text (mouseX + ", " + mouseY, mouseX, mouseY);
}

function controle(){
  if (keyDown("space")){
    ball.velocityY = -3;
    ball.velocityX = 2;
  pc.velocityX = 3;
  pc.changeAnimation("run_r", run_r)
  }
}

;
