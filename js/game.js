/**
 * Variables used during the game.
 */
let player;
let pausa = false;
let enemy;
let cursors;
let background1;
let background2;
let spaceBar;
let bullet = [];
let contBullet = 0;
let frame = -1;
let score = 0;
let scoreText;
let contador = 0;
let cargador = 30;
let explosion;
let elapsedFrames;
let fuego;
let disparo;
let recarga;
let enemys = [];
let modaba;
let enterBar;
let carga;
let win;
let final;
let inicio = 0;
let vida;
let vidas = [];
let vidasText;
let numVidas = 3;

/**
 * It prelaods all the assets required in the game.
 */
function preload() {
  this.load.image("sky", "assets/backgrounds/blue.png");
  this.load.image("player", "assets/characters/player.png");
  this.load.image("enemy", "assets/characters/alien1.png");
  this.load.image("enemy1", "assets/characters/alien2.png");
  this.load.image("enemy2", "assets/characters/alien3.png");
  this.load.audio("disparo", "assets/sounds/sonido1.mp3");
  this.load.audio("modaba", "assets/sounds/modaba.mp3");
  this.load.audio("carga", "assets/sounds/cargapistola.mp3");
  this.load.audio("win", "assets/sounds/win.mp3");
  this.load.image("fuego", "assets/backgrounds/fuego.png");
  this.load.image("red", "assets/particles/red.png");
  this.load.image("cargador", "assets/characters/cargador.png");
  this.load.image("gameOver", "assets/backgrounds/game_over.png");
  this.load.image("win", "assets/backgrounds/win.png");
  this.load.image("pausa", "assets/backgrounds/pause.png");
  this.load.image("vidas", "assets/characters/vidas.png");
}

/**
 * It creates the scene and place the game objects.
 */
function create() {
  // scene background
  background1 = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, "sky");
  background2 = this.add.image(
    SCREEN_WIDTH / 2,
    SCREEN_HEIGHT / 2 - background1.height,
    "sky"
  );
  //sonido
  disparo = this.sound.add("disparo");
  modaba = this.sound.add("modaba");
  carga = this.sound.add("carga");
  final = this.sound.add("win");

  // playet setup
  player = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT, "player");
  player.setX((SCREEN_WIDTH - player.width * PLAYER_SCALE) / 2);
  player.setY(SCREEN_HEIGHT - (player.height * PLAYER_SCALE) / 2);
  player.setScale(PLAYER_SCALE);

  // enemy setup
  enemy = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT, "enemy");
  enemy.setX((SCREEN_WIDTH - enemy.width * ENEMY_SCALE) / 2);
  enemy.setY((enemy.height * ENEMY_SCALE) / 2);
  enemy.setScale(ENEMY_SCALE);
  //Vidas
  // vida = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT, "vidas");

  vida = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT, "vidas");
  vida.setVisible(false);
  for (let i = 0; i < numVidas; i++) {
    vidas.pushthis.add.image(
      SCREEN_WIDTH / 2 + i * vida.width,
      vida.height * VIDAS_ESCALE,
      "vidas"
    );
  }

  //cursors map into game engine
  cursors = this.input.keyboard.createCursorKeys();

  //map space key status
  spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  //input restar game
  enterBar = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.ENTER,
    () => this.scene.start("game")
  );
  //Game Over
  gameOver = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, "gameOver");
  gameOver.setX(SCREEN_WIDTH + gameOver.width);
  gameOver.setY(SCREEN_HEIGHT + gameOver.height);
  //Win
  win = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, "win");
  win.setX(SCREEN_WIDTH + win.width);
  win.setY(SCREEN_HEIGHT + win.height);
  //Pause

  //Particulas
  elapsedFrames = FRAMES_PER_BULLET;

  fuego = this.add.particles("fuego").createEmitter({
    scale: { min: 0.2, max: 0 },
    speed: { min: 100, max: 200 },
    quantity: 0.2,
    frequency: 0.1,
    lifespan: 1,
    gravityY: 0,
    on: false,
  });

  explosion = this.add.particles("red").createEmitter({
    scale: { min: 0.5, max: 0 },
    speed: { min: -100, max: 100 },
    quantity: 1,
    frequency: 0.1,
    lifespan: 100,
    gravityY: 0,
    on: false,
  });
  //Texto

  scoreText = this.add.text(5, 5, "Score:" + score, {
    font: "32px Arial",
    fontSize: "32px",
    fill: "#FFFFFF",
  });

  cargadorText = this.add.text(620, 5, "Cargador:" + cargador, {
    font: "32px Arial",
    fill: "#FFFFFF",
  });
  recarga = this.add.image(
    (SCREEN_WIDTH * RELOAD_SCALE) / 2,
    SCREEN_HEIGHT * RELOAD_SCALE,
    "cargador"
  );

  recarga.setX(SCREEN_WIDTH + 1000);
  recarga.setY(SCREEN_HEIGHT + 1000);
}

/**
 * Updates each game object of the scene.
 */
let playPause = false;

function update() {
  if (playPause) {
    if (pausa) {
      return;
    }
    //Cargador
    if (cargador === 0) {
      recarga.setX(
        Math.random() * (SCREEN_WIDTH - recarga.width * ENEMY_SCALE) +
          (recarga.width / 2) * ENEMY_SCALE
      );

      recarga.setY(
        Math.random() * (SCREEN_HEIGHT - recarga.height * ENEMY_SCALE) +
          (recarga.height / 2) * ENEMY_SCALE
      );
      recarga.setScale(RELOAD_SCALE);
      cargador = -1;
    }

    this.add.ellipse(
      player.x,
      player.y - (player.height / 2) * PLAYER_SCALE,
      180,
      200
    );
    recargar();
    moverPlayer();
    moverFondo();
    moverEnemy();
    if (frame < 0) {
      disparar(this);
    }
    if (contBullet > 0) {
      moverBala();
    }
    frame--;
    contador--;
  }
}
function moverPlayer() {
  if (cursors.left.isDown) {
    let xPlayer = player.x - PLAYER_VELOCITY;
    if (xPlayer < (player.width / 2) * PLAYER_SCALE) {
      xPlayer = (player.width / 2) * PLAYER_SCALE;
    }
    player.setX(xPlayer);
  } else if (cursors.right.isDown) {
    let xPlayer = player.x + PLAYER_VELOCITY;
    if (xPlayer > SCREEN_WIDTH - (player.width / 2) * PLAYER_SCALE) {
      xPlayer = SCREEN_WIDTH - (player.width / 2) * PLAYER_SCALE;
    }
    player.setX(xPlayer);
  }
  if (cursors.up.isDown) {
    let yPlayer = player.y - PLAYER_VELOCITY;
    if (yPlayer < (player.height / 2) * PLAYER_SCALE) {
      yPlayer = (player.height / 2) * PLAYER_SCALE;
    }
    player.setY(yPlayer);
  } else if (cursors.down.isDown) {
    let yPlayer = player.y + PLAYER_VELOCITY;
    if (yPlayer > SCREEN_HEIGHT - (player.height / 2) * PLAYER_SCALE) {
      yPlayer = SCREEN_HEIGHT - (player.height / 2) * PLAYER_SCALE;
    }
    player.setY(yPlayer);
  }

  fuego.setPosition(player.x, player.y + 20);
  fuego.explode();
}

function moverFondo() {
  background1.setY(background1.y + BACKGROUND_VELOCITY);
  background2.setY(background2.y + BACKGROUND_VELOCITY);

  if (background1.y > background1.height + SCREEN_HEIGHT / 2) {
    background1.setY(background2.y - background1.height);
    let temp = background1;
    background1 = background2;
    background2 = temp;
  }
}

function disparar(engine) {
  if (spaceBar.isDown && cargador > 0) {
    cargador--;
    cargadorText.setText("Cargador:" + cargador);
    disparo.play();

    bullet.push(
      engine.add.ellipse(
        player.x,
        player.y - (player.height / 2) * PLAYER_SCALE,
        5,
        10,
        0xff9900
      )
    );

    contBullet++;
    frame = 12;
  }
}

function moverBala() {
  let index = -1;
  for (let i = 0; i < bullet.length; i++) {
    bullet[i].setY(bullet[i].y - BULLET_VELOCITY);
    colision(bullet[i]);
    if (bullet[i].y <= 0 - bullet[i].height) {
      bullet[i].destroy();
      index = i;
    }
    colision(bullet[i]);
  }
  if (index >= 0) {
    bullet.splice(index, 1);
  }
}

function colision(bala) {
  if (
    bala.x >= enemy.x - (enemy.width * ENEMY_SCALE) / 2 &&
    bala.x <= enemy.x + (enemy.width * ENEMY_SCALE) / 2 &&
    bala.y >= enemy.y - (enemy.height * ENEMY_SCALE) / 2 &&
    bala.y <= enemy.y + (enemy.height * ENEMY_SCALE) / 2
  ) {
    if (contador < 1) {
      collectEnemy();
    }
    explosion.setPosition(enemy.x, enemy.y);
    explosion.explode();
    enemy.setY((enemy.height * ENEMY_SCALE) / 2);
    enemy.setX(
      Math.random() * (SCREEN_WIDTH - enemy.width * ENEMY_SCALE) +
        (enemy.width / 2) * ENEMY_SCALE
    );
    bala.destroy();
  }
}
function collectEnemy() {
  contador = 24;
  score += 10;
  scoreText.setText("Score:" + score);
}
function recargar() {
  if (
    player.x + (player.width / 3) * PLAYER_SCALE >=
      recarga.x - (recarga.width * RELOAD_SCALE) / 2 &&
    player.x - (player.width / 3) * PLAYER_SCALE <=
      recarga.x + (recarga.width * RELOAD_SCALE) / 2 &&
    player.y + (player.height / 3) * PLAYER_SCALE >=
      recarga.y - (recarga.height * RELOAD_SCALE) / 2 &&
    player.y - (player.height / 3) * PLAYER_SCALE <=
      recarga.y + (recarga.height * RELOAD_SCALE) / 2
  ) {
    recarga.setX(SCREEN_WIDTH + 1000);
    recarga.setY(SCREEN_HEIGHT + 1000);
    cargador = 30;
    cargadorText.setText("Cargador:" + cargador);
    carga.play();
  }
}
function moverEnemy() {
  enemy.setY(enemy.y + ENEMY_VELOCITY);
  if (
    (player.x + (player.width / 3) * PLAYER_SCALE >=
      enemy.x - (enemy.width * ENEMY_SCALE) / 2 &&
      player.x - (player.width / 3) * PLAYER_SCALE <=
        enemy.x + (enemy.width * ENEMY_SCALE) / 2 &&
      player.y + (player.height / 3) * PLAYER_SCALE >=
        enemy.y - (enemy.height * ENEMY_SCALE) / 2 &&
      player.y - (player.height / 3) * PLAYER_SCALE <=
        enemy.y + (enemy.height * ENEMY_SCALE) / 2) ||
    enemy.y >= SCREEN_HEIGHT
  ) {
    FRAMES_PER_BULLET + 20;
    numVidas--;
    console.log(numVidas);
    enemy.destroy();
    player.destroy();
    explosion.setPosition(enemy.x, enemy.y);
    explosion.explode();
    if (numVidas < 1) {
      gameOver.setX(SCREEN_WIDTH / 2);
      gameOver.setY(SCREEN_WIDTH / 2);
      modaba.play();
      pausa = true;
    }
  } else if (score >= 200) {
    enemy.setY(enemy.y + ENEMY_VELOCITY * 1.3);
  }
  if (score === 500) {
    win.setX(SCREEN_WIDTH / 2);
    win.setY(SCREEN_WIDTH / 2);
    final.play();
    pausa = true;
  }
}

function play() {
  playPause = true;
}
function pause() {
  playPause = false;
}
