/**
 * Variables used during the game.
 */
let player;
let enemy;
let cursors;

/**
 * It prelaods all the assets required in the game.
 */
function preload() {
  this.load.image("sky", "assets/backgrounds/blue.png");
  this.load.image("player", "assets/characters/player.png");
  this.load.image("enemy", "assets/characters/alien1.png");
}

/**
 * It creates the scene and place the game objects.
 */
function create() {
  // scene background
  this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, "sky");

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

  //cursors map into game engine
  cursors = this.input.keyboard.createCursorKeys();
}

/**
 * Updates each game object of the scene.
 */
function update() {
  if (cursors.left.isDown) {
    let x = player.x - PLAYER_VELOCITY;
    if (x < (player.width / 2) * PLAYER_SCALE) {
      x = (player.width / 2) * PLAYER_SCALE;
    }
    player.setX(x);
  } else if (cursors.right.isDown) {
    let x = player.x + PLAYER_VELOCITY;
    if (x > SCREEN_WIDTH - (player.width / 2) * PLAYER_SCALE) {
      x = SCREEN_WIDTH - (player.width / 2) * PLAYER_SCALE;
    }
    player.setX(x);
  }

  if (cursors.up.isDown) {
    let y = player.y - PLAYER_VELOCITY;
    if (y < (player.height / 2) * PLAYER_SCALE) {
      y = (player.height / 2) * PLAYER_SCALE;
    }
    player.setY(y);
  } else if (cursors.down.isDown) {
    let y = player.y + PLAYER_VELOCITY;
    if (y > SCREEN_HEIGHT - (player.height / 2) * PLAYER_SCALE) {
      y = SCREEN_HEIGHT - (player.height / 2) * PLAYER_SCALE;
    }
    player.setY(y);
  }
}
