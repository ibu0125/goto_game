var canvas, g;
var chara_x,chara_y,chara_img;
var speed=0,acceleration=0;
var enemy_x,enemy_y,enemy_img,enemy_speed;
var enemy_jugde=0;

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
  chara_x=600;
  chara_y=450;
  chara_img=new Image();
  chara_img.src="./gotodesu.png";

  enemy_x=1200;
  enemy_y=Math.floor(Math.random()*451);
  enemy_img=new Image();
  enemy_img.src="./goto_enemy.png";
  enemy_speed=5;
}

function keydown(e) {
  speed=-19;
  acceleration=1.5;
}

function gameloop() {
  update();
  draw();
}

function update() {
  speed+=acceleration;
  chara_y+=speed;
  if(chara_y>450){
    chara_y=450;
    speed=0;
    acceleration=0;
  }else if(chara_y<=0){
    chara_y=0;
  }

  enemy_x-=enemy_speed;
  if(enemy_x<-100){
    enemy_x=1200;
    enemy_y=Math.floor(Math.random()*451);
  }
  // if (enemy_jugde==0 || enemy_x==1300){
  //   enemy_x-=enemy_speed;
  //   enemy_jugde=0;
  // }else if(enemy_jugde==1 || enemy_x==-100){
  //   enemy_x+=enemy_speed;
  //   enemy_jugde=1;
  // }
  // enemy_x=(enemy_jugde=='true')?enemy_x-enemy_speed:enemy_x+enemy_speed;
}

function draw() {
  g.fillStyle="rgb(0,0,0)";
  g.fillRect(0,0,1200,480);

  g.drawImage(
    chara_img,
    chara_x-chara_img.width/2,
    chara_y-chara_img.height/2
  );

  g.drawImage(
    enemy_img,
    enemy_x-enemy_img.width/2,
    enemy_y-enemy_img.height/2
  );
}
