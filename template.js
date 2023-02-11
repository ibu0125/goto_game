var canvas, g;
var score;
var scene;
var frameCount;
var bound;
var particle;

class Sprite{
  imag=null;
  x=0;
  y=0;
  speed=0;
  acceleration=0;
  r=0;

  draw(g){
    g.drawImage(
      this.imag,
      this.x-this.imag.width/2,
      this.y-this.imag.height/2
    );
  }
}

class Particle extends Sprite{
  baseLine=0;
  acceleration=0;
  speedy=0;
  speedx=0;

  constructor(x,y){
    super();
    this.x=x;
    this.y=y;
    this.baseLine=420;
    this.acceleration=0.5;
    var angle = (Math.PI*5)/4+(Math.PI/2)*Math.random();
    this.speed=5+Math.random()*20;
    this.speedx=this.speed*Math.cos(angle);
    this.speedy = this.speed*Math.sin(angle);
    this.r=2;
  }

  update() {
    this.speedx*=0.97;
    this.speedy+=this.acceleration;
    this.x+=this.speedx;
    this.y+=this.speedy;
    if(this.y>this.baseLine){
      this.y=this.baseLine;
      this.speedy=this.speedy*-1*(Math.random()*0.5+0.3);
    }
  }

  draw(g){
    g.fillStyle="rgb(225,50,50)";
    g.fillRect(this.x-this.r,this.y-this.r,this.r*2,this.r*2);
  }
}

const Scenes={
  GameMain:"GameMain",
  GameOver:"GameOver"
};

onload = function () {
  // 描画コンテキストの取得
  canvas = document.getElementById("gamecanvas");
  g = canvas.getContext("2d");
  // 初期化
  init();
  // 入力処理の指定
  document.onkeydown = keydown;
  // ゲームループの設定 60FPS
  setInterval("gameloop()", 16);
};

function init() {
  player=new Sprite();
  player.x=600;
  player.y=450;
  player.imag=new Image();
  player.imag.src="./gotodesu.png";
  player.r=16;
  player.speed=0;
  player.acceleration=0;

  enemy=new Sprite();
  enemy.x=1200;
  enemy.y=Math.floor(Math.random()*451);
  enemy.imag=new Image();
  enemy.imag.src="./goto_enemy.png";
  enemy.speed=5;
  enemy.r=16;
  enemy.acceleration=0;

  score=0;
  frameCount=0;
  bound=false;
  scene=Scenes.GameMain;

  particle=[];
}

function keydown(e) {
  player.speed=-19;
  player.acceleration=1.5;
}

function gameloop() {
  update();
  draw();
}

function update() {
  if(scene==Scenes.GameMain){
    player.speed+=player.acceleration;
    player.y+=player.speed;
    if(player.y>450){
      player.y=450;
      player.speed=0;
      player.acceleration=0;
    }else if(player.y<=0){
      player.y=0;
    }

    
    enemy.x-=enemy.speed;
    if(enemy.x<-100){
      score+=100;
      enemy.x=1200;
      enemy.y=Math.floor(Math.random()*451);
    }

    var diffx = player.x-enemy.x;
    var diffy = player.y-enemy.y;
    var distance = Math.sqrt(diffx*diffx+diffy*diffy);
    if(player.r+enemy.r>distance){
      scene=Scenes.GameOver;
      // player.speed=-20;
      // player.acceleration=0.5;
      frameCount=0;
      
      for(var i=0; i<300; i++){
        particle.push(new Particle(player.x,player.y));
      }
    }
  }else if(scene==Scenes.GameOver){
    player.speed+=player.acceleration;
    player.y+=player.speed;

    if(player.y<20 || player.y > 460){
      bound=!bound;
    }else if(bound){
      player.x+=30;
    }else{
      player.x-=30;
    }

    enemy.x-=enemy.speed;
  }

  frameCount++;
}

function draw() {
  // g.imageSmoothingEnabled=false;

  if(scene==Scenes.GameMain){
    g.fillStyle="rgb(0,0,0)";
    g.fillRect(0,0,1200,480);
  
    player.draw(g);
    enemy.draw(g);
  
    // g.fillStyle="rgb(255,255,255)";
    // g.font="16pt Arial";
    // var scoreLabel = "SCORE :"+score;
    // var scoreLabelWidth = g.measureText(scoreLabel).width;
    // g.fillText(scoreLabel,1180-scoreLabelWidth,40);

  }else if(scene==Scenes.GameOver){
    g.fillStyle="rgb(0,0,0)";
    g.fillRect(0,0,1200,480);

    if(frameCount<300){
      g.save();
      g.translate(player.x,player.y);
      g.rotate(((frameCount%30)*Math.PI*2)/30);
      g.drawImage(
        player.imag,
        -player.imag.width/2,
        -player.imag.height/2,
        player.imag.width+frameCount,
        player.imag.height+frameCount
      );
      g.restore();
    }

    g.fillStyle="rgb(255,255,255)";
    g.font="48pt Arial";
    var scoreLabel = "GAME OVER";
    var scoreLabelWidth = g.measureText(scoreLabel).width;
    g.fillText(scoreLabel,600-scoreLabelWidth/2,240);


  }
  g.fillStyle="rgb(255,255,255)";
  g.font="16pt Arial";
  var scoreLabel = "SCORE :"+score;
  var scoreLabelWidth = g.measureText(scoreLabel).width;
  g.fillText(scoreLabel,1180-scoreLabelWidth,40);

  particle.forEach((p) => {
    p.draw(g);
  });
}
