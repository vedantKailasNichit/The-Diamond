var playerShip, playerShipImage;
var enemyShip, enemyShipImage;
var enemy1Image,enemy2Image,enemy3Image;
var backdrop,backdropImage;
var gamestate = "start";
var score = 0;
var planspeed = 8;
var startSound,planeSound,clickSound;
var start,home,selectplane,aim,gohome;
var invisible1,invisible2;
var startImage,homeImage,selectplaneImage,aimImage,gohomeImage;
var player1,player2,player3,player1Image,player2Image,player3Image;

function preload(){
  playerShipImage = loadImage("playerShip_0.png");
  enemyShipImage = loadImage("enemyShip_0.png");
  backdropImage =loadImage("background_0.png");
  backdropImage =loadImage("background_20.png");
  startImage = loadImage("start_0.png");
  retryImage = loadImage("retry.png");
  homeImage = loadImage("home_0.png");
  gohomeImage = loadImage("home_0.png");
  aimImage = loadImage("aim0.png");
  selectplaneImage = loadImage("selectplane0.png");
  player1Image = loadImage("playerPlan0.png");
  player2Image = loadImage("playerPlan1.png");
  player3Image = loadImage("playerPlan2.png");
  enemy1Image = loadImage("enemy_0.png");
  enemy2Image = loadImage("enemy_10.png");
  enemy3Image = loadImage("enemy_20.png");
  startSound = loadSound("AnyConv.com__Space Ambience.mp3");
  clickSound = loadSound("AnyConv.com__Coin.mp3");
  planeSound = loadSound("AnyConv.com__Space Noise2.mp3");
}

function setup() {
  createCanvas(1366,629);
  
  backdrop = createSprite(1366,80);
  backdrop.addImage("background",backdropImage);
  backdrop.addImage("background2",backdropImage);
  backdrop.velocityX = -10;
  backdrop.scale = 2.5;

  playerShip = createSprite(50,300);
  playerShip.addImage("playerShip",playerShipImage);
  playerShip.addImage("player1",player1Image);
  playerShip.addImage("player2",player2Image);
  playerShip.addImage("player3",player3Image);
  playerShip.visible = false;
  
  enemyShip = createSprite(1000,300);
  enemyShip.addImage("enemyShip",enemyShipImage);
  enemyShip.visible = false;
  
  start = createSprite(windowWidth/2,100);
  start.addImage("start",startImage);
  start.scale = 1.5;
  
  selectplane = createSprite(windowWidth/2,200);
  selectplane.addImage("selectplane",selectplaneImage);
  selectplane.scale = 1.5;
  
  aim = createSprite(windowWidth/2,300);
  aim.addImage("aim",aimImage);
  aim.scale = 1.5;
  
  home = createSprite(670,300);
  home.addImage("home",homeImage);
  home.scale = 1.5;
  home.visible = false;  
  
  gohome = createSprite(670,300);
  gohome.addImage("gohome",gohomeImage);
  gohome.scale = 1.5;
  gohome.visible = false;
  
  player1 = createSprite(400,300);
  player1.addImage("player1",player1Image);
  player1.scale = 1.5;
  player1.visible = false;
  
  player2 = createSprite(700,300);
  player2.addImage("player2",player2Image);
  player2.scale = 1.5;
  player2.visible = false;
  
  player3 = createSprite(1000,300);
  player3.addImage("player3",player3Image);
  player3.scale = 1.5;
  player3.visible = false;
  
  invisible1 = createSprite(300,0,1400,10);
  invisible1.visible = false;
  
  invisible2 = createSprite(300,627,1400,10);
  invisible2.visible = false;
  
  enemyShipGroup = new Group();  
}

function draw(){
  background("#10052e");
  playerShip.collide(invisible1);
  playerShip.collide(invisible2);
  if(gamestate === "start"){
    
    backdrop.changeImage("background");
    aim.visible = true;
    selectplane.visible = true;
    player1.visible = false;
    player2.visible = false;
    player3.visible = false;
    home.visible = false;
    selectplane.visible = true;
    selectplane.x = windowWidth/2;
    selectplane.y = 200;
    start.visible = true;
    backdrop.visible = true;
    backdrop.velocityX = -10;
    score = 0;
    if(mousePressedOver(selectplane)){   
      gamestate = "choseplayer"
      clickSound.play();
    }
    if(mousePressedOver(start)){   
      start.visible = false;
      gamestate = "play"
      clickSound.play();
    }
    if(mousePressedOver(aim)){   
      start.visible = false;
      aim.visible = false;
      selectplane.visible = false;
      gamestate = "aim"
      clickSound.play();
    }
    if(backdrop.x < -500){
      backdrop.x = 1800;
    }
    playerShip.visible = false;
    enemyShip.visible = false;
  }
//GMAESTATE = "PLAY" 
  if(gamestate === "play"){
    backdrop.changeImage("background2");
    home.visible = false;
    player1.visible = false;
    player2.visible = false;
    player3.visible = false;
    aim.visible = false;
    selectplane.visible = false;
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Score: "+ score, 1200,623);
    backdrop.velocityX = -(6 + 3 * score/50)
    score = score + Math.round(getFrameRate()/60);
  
//playerShip Control
    if(keyDown("up_arrow")){
      playerShip.y -= planspeed;
    }
    if(keyDown("down_arrow")){
      playerShip.y += planspeed;
    }
//repeat backdrop after 1500y
    if(backdrop.x < -500){
      backdrop.x = 1800;
    }
    if(enemyShip.x < -5){
      enemyShip.destroy();
    }
    if(enemyShipGroup.isTouching(playerShip)){
      gamestate = "end"
    }
    playerShip.visible = true;
    spawnEnemy();
  }
//GAMESTATE = "END"
  if(gamestate === "end"){
    enemyShipGroup.destroyEach();
    backdrop.velocityX = 0;
    enemyShipGroup.setVelocityXEach(0);
    gamestate = "gameover"
  }
  if(gamestate === "gameover"){
    backdrop.visible = false;
    playerShip.visible = false;
    stroke("red");
    fill("yellow");
    textSize(40);
    text("Score: " + score, 590,100);
    home.visible = true;
    home.x = 500;
    home.y = 250;
    selectplane.visible = true;
    selectplane.x = 900;
    selectplane.y = 250;
    if(mousePressedOver(home)){ 
      gamestate = "start"
      clickSound.play();
    }
    if(mousePressedOver(selectplane)){   
      gamestate = "choseplayer"
      clickSound.play();
    }
  }
  if(gamestate === "choseplayer"){
    aim.visible = false;
    selectplane.visible = false;
    start.visible = false;
    backdrop.x = 1800;
    backdrop.velocityX = -10;
    backdrop.visible = true;
    playerShip.visible = false;
    home.visible = true;
    home.x = 100;
    home.y = 50;
    player1.visible = true;
    player2.visible = true;
    player3.visible = true;
    stroke("red");
    fill("yellow");
    textSize(30);
    text("HAL Tejas", 350,200);
    text("SEPECAT Jaguar", 550,200);
    text("Dassault Rafale", 880,200);
    if(mousePressedOver(home)){ 
      gamestate = "start"
      clickSound.play();
    }
    if(mousePressedOver(player1)){ 
      playerShip.changeImage("player1");
      enemyShipGroup.destroyEach();
      backdrop.velocityX = 0;
      enemyShipGroup.setVelocityXEach(0);
      score = 0;
      clickSound.play();
      planspeed = 8;
      gamestate = "play"
    }
    if(mousePressedOver(player2)){ 
      playerShip.changeImage("player2");
      enemyShipGroup.destroyEach();
      backdrop.velocityX = 0;
      enemyShipGroup.setVelocityXEach(0);
      score = 0;
      clickSound.play();
      planspeed = 11;
      gamestate = "play"
    }
    if(mousePressedOver(player3)){ 
      playerShip.changeImage("player3");
      enemyShipGroup.destroyEach();
      backdrop.velocityX = 0;
      enemyShipGroup.setVelocityXEach(0);
      score = 0;
      planspeed = 15;
      gamestate = "play"
    }
  }
  if(gamestate === "aim"){
    gohome.visible = true;
    gohome.x = 100;
    gohome.y = 50;
    backdrop.visible = false;
    stroke("red");
    fill("yellow");
    textSize(50);
    text("Secret Message",500,50);
    stroke("red");
    fill("yellow");
    textSize(30)
    text("In 2200 some Martians have stolen our rube which was saving our earth from meteors attack.",50,200); 
    text("So now you have to go to mars to take that rube back to save our earth from meteors attack.",50,250);       
    text("You are the only person who can save our earth. But there is a problem you are not having any",50,300)
    text("guns because they have taken them all too. So, you have to avoid a crash between you and the",50,350)
    text("enemy. Best Of luck Agent - B.",50,400)                                              
    text("From",50,450)
    text("Mr.Secret", 50,500);
    if(mousePressedOver(gohome)){ 
      clickSound.play();
      gamestate = "start"
      gohome.visible = false;
    }
  }
  
  drawSprites();
}

function spawnEnemy() {
  var rate = 30;
  rate = rate + Math.round(getFrameRate()/30)
  //write code here to spawn the clouds
  if (frameCount % rate === 0) {
    enemyShip = createSprite(1366,-10);
    enemyShip.velocityX = -(6 + score/10);
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: enemyShip.addImage(enemyShipImage);
              break;
      case 2: enemyShip.addImage(enemy1Image);
              break;
      case 3: enemyShip.addImage(enemy2Image);
              break;
      case 4: enemyShip.addImage(enemy3Image);
              break;
      default: break;
    }
    enemyShip.y = Math.round(random(50,550));
    enemyShip.scale = 1;
    enemyShip.visible = true;
    enemyShip.lifetime = 200;
    enemyShip.lifetime -= Math.round(getFrameRate()/30);
    
    enemyShipGroup.depth = playerShip.depth;
    playerShip.depth = playerShip.depth + 1;
    playerShip.depth += 0.5;
    enemyShipGroup.add(enemyShip);
  }
  
}


