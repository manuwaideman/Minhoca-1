var minhoca, Mrun, Mjump, Mdead, Mdown, Mturbo, Mimunidade, Mbrava;
var fantasma, ghost, Gdead;
var adubo, aduboImg, aduboGrp;
var obs, obsImg;
var obsGroup;
var fundo, fundoImg;
var chao;
var bordas;
var poção, poçãoImg, poçaoGrp;
var placar = 0;
var START = 0;
var PLAY = 1;
var END = 2;
var WIN = 3;
var gameState = 0;

function preload(){
    Mrun = loadAnimation("./arquivos/andando1.png","./arquivos/andando2.png","./arquivos/andando3.png");
    Mjump = loadAnimation("./arquivos/voando1.png","./arquivos/voando2.png","./arquivos/voando3.png","./arquivos/voando4.png");
    Mdead = loadImage("./arquivos/dead.png");
    Mdown = loadAnimation("./arquivos/abaixando1.png","./arquivos/abaixando2.png","./arquivos/abaixando3.png", "./arquivos/abaixando4.png");
    Mturbo = loadAnimation("./arquivos/turbo1.png","./arquivos/turbo2.png","./arquivos/turbo3.png","./arquivos/turbo4.png","./arquivos/turbo5.png","./arquivos/turbo6.png","./arquivos/turbo7.png","./arquivos/turbo8.png");
    Mimunidade = loadAnimation("./arquivos/imu1.png","./arquivos/imu2.png","./arquivos/imu3.png","./arquivos/imu4.png","./arquivos/imu5.png","./arquivos/imu6.png");
    Mbrava = loadAnimation("./arquivos/angry1.png","./arquivos/angry2.png","./arquivos/angry3.png","./arquivos/angry4.png","./arquivos/angry5.png","./arquivos/angry6.png");

    ghost = loadAnimation("./arquivos/ghost1.png","./arquivos/ghost2.png","./arquivos/ghost3.png");
    Gdead = loadImage("./arquivos/deadghost.png");

    aduboImg = loadImage("./arquivos/adubo.png");

    poçãoImg = loadImage("./arquivos/poçao1.png");

    fundoImg = loadImage("./arquivos/background.png");

    obsImg = loadAnimation("./arquivos/bird1.png","./arquivos/bird2.png","./arquivos/bird3.png");

    Mjump.looping = false;
    Mdown.looping = false;
    Mimunidade.looping = false;
    Mturbo.looping = false;
    Mbrava.looping = false;
}

function setup(){
    createCanvas(windowWidth, windowHeight);

    fundo = createSprite(width/2+350, height/2-80);
    fundo.scale = 4;
    fundo.addImage("fundo", fundoImg);

    minhoca = createSprite(100,height-150,40,40);
    minhoca.x = -20;
    minhoca.scale = 1.2;
    minhoca.addAnimation("correndo", Mrun);
    minhoca.addAnimation("pulando", Mjump);
    minhoca.addImage("morta", Mdead);
    minhoca.addAnimation("velocidade", Mturbo);
    minhoca.addAnimation("imune", Mimunidade);
    minhoca.addAnimation("brava", Mbrava);
    minhoca.addAnimation("abaixando", Mdown);
    minhoca.changeAnimation("correndo");
    minhoca.debug = false;
    minhoca.setCollider("rectangle",0,-10,40,75);

    fantasma = createSprite(-40,height-170,40,40);
    fantasma.scale = 1.2;
    fantasma.addAnimation("ghost", ghost);
    fantasma.addImage("gdead", Gdead); 
    fantasma.changeAnimation("ghost");

    chao = createSprite(width/2,height-100,width,20);
    chao.visible = false;
    chao.debug = true;

    bordas = createEdgeSprites();


    poçaoGrp = new Group();
    aduboGrp = new Group();
    obsGroup = new Group();
}

function draw(){
    background("white");

    if(gameState == 0){
        minhoca.velocityX = 5;
        if(minhoca.x > width/2){
         gameState = 1;
         minhoca.velocityX = 0;
        }

    }
    else if(gameState == 1){
        if(fundo.x < +350){
            fundo.x = width-350;
        }
        fundo.velocityX = -6;
        minhoca.velocityY = minhoca.velocityY+1;
        
        if(fantasma.x < 130){
            fantasma.x += 4;
           }

        if(keyWentDown(UP_ARROW)){
            minhoca.velocityY = -10;
            minhoca.changeAnimation("pulando");
        }
        if(keyWentUp(UP_ARROW)){
            minhoca.changeAnimation("correndo");
        }
        if(keyWentDown(DOWN_ARROW)){
            minhoca.changeAnimation("abaixando");
            minhoca.setCollider("rectangle",0,-5,40,40);
        }
        if(keyWentUp(DOWN_ARROW)){
            minhoca.changeAnimation("correndo");
            minhoca.setCollider("rectangle",0,-10,40,75);
        }
        if(keyWentDown(RIGHT_ARROW) && minhoca.x < width){
            minhoca.velocityX = 15;
            minhoca.changeAnimation("velocidade");
        }
        if(keyWentUp(RIGHT_ARROW)){
            minhoca.changeAnimation("correndo");
        if(minhoca.x > 100){
            minhoca.velocityX = -10;
        }
        }
        
        if(minhoca.collide(aduboGrp)){
            adubo.destroy();
            placar+= 10;
        }
        if(minhoca.collide(obsGroup)){
            gameState = 2;
        }
        if(minhoca.collide(fantasma)){
            gameState = 2;
        }
    
        minhoca.collide(chao);
        minhoca.collide(bordas);

        Adubo();
        Obstaculos();
        Poção();

        if(placar == 1000){
            gameState = 3;
        }

    }
    else if(gameState == 2) {
        minhoca.changeAnimation("morta",Mdead);
        fundo.velocityX = 0;
        fantasma.velocityX = 0;
        obsGroup.setVelocityXEach(0);
        obsGroup.setLifetimeEach(-5);
        aduboGrp.setVelocityXEach(0);
        aduboGrp.setLifetimeEach(-5);
        poçaoGrp.setVelocityXEach(0);
        poçaoGrp.setLifetimeEach(-5);
    }
    else{

    }


    console.log(mouseX+"x");
    console.log(mouseY+"y");

    text("score: "+ placar, 90, 50);


    drawSprites();
}

function Adubo(){
    if(frameCount%245==0){
        adubo = createSprite(width+256,Math.round(random(480,500)));
        adubo.addImage("adubo", aduboImg);
        adubo.velocityX = -5;
        adubo.lifetime = 400;
        adubo.scale = 0.6;
        adubo.depth = fantasma.depth;
        fantasma.depth = fantasma.depth+1;
        adubo.debug = true;
        adubo.setCollider("rectangle",0,0,15,15);
        aduboGrp.add(adubo);
    }
    if(frameCount%350==0){
        adubo = createSprite(width+374,Math.round(random(580,600)));
        adubo.addImage("adubo", aduboImg);
        adubo.velocityX = -5;
        adubo.lifetime = 400;
        adubo.scale = 0.6;
        adubo.depth = fantasma.depth;
        fantasma.depth = fantasma.depth+1;
        adubo.debug = true;
        adubo.setCollider("rectangle",0,0,15,15);
        aduboGrp.add(adubo);
    }

}

function Obstaculos(){
    if(frameCount%557==0){
        obs = createSprite(width+200,Math.round(random(320,380)));
        obs.addAnimation("bird", obsImg);
        obs.velocityX = -2;
        obs.lifetime = 400;
        obs.scale = 0.5;
        obs.depth = fantasma.depth;
        obs.debug = true;
        obs.setCollider("rectangle",0,0,15,15);
        fantasma.depth = fantasma.depth+1;
        obsGroup.add(obs);
    }
    if(frameCount%300==0){
        obs = createSprite(width+355, Math.round(random(260,310)));
        obs.addAnimation("bird", obsImg);
        obs.velocityX = -2;
        obs.lifetime = 400;
        obs.scale = 0.5;
        obs.depth = fantasma.depth;
        fantasma.depth = fantasma.depth+1;
        obs.debug = true;
        obs.setCollider("rectangle",0,0,15,15);
        obsGroup.add(obs);
    }

}

function Poção(){
    if(frameCount%600==0){
        poção = createSprite(width+100,350,15,15);
        poção.addImage("poçao", poçãoImg);
        poção.velocityX = -2;
        poção.lifetime = 350;
        poção.scale = 0.06;
        poção.depth = fantasma.depth;
        poção.debug = true;
        poção.setCollider("rectangle",0,0,15,15);
        fantasma.depth = fantasma.depth+1;
        obsGroup1.add(poção);
    }

}
