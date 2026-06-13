/**
 * The main game driver.
 * 
 * Prepares all of the game entities to be drawn onto the screen and updated 
 * on each frame.
 * 
 * @module Main
 * @author Adrien P.
 */

import Asteroid from "../entities/Asteroid.js";
import Debris from "../entities/Debris.js";
import Particle from "../entities/Particle.js";
import Spaceship from "../entities/Spaceship.js";
import Vector2 from "../utils/Vector2.js";
import { 
  ASTEROID_DATA, 
  DEBRIS_COUNT, 
  MAX_NUM_ASTEROIDS,
  MID_HEIGHT,
  MID_WIDTH, 
  WAVE_DATA,
} from "./constants.js";
import { inputs } from "../core/input-listener.js";
import { detectCollision, isOffScreen } from "../utils/math-utils.js";

/**
 * @typedef {Object} star
 * @property {number} x
 * @property {number} y
 */

const isMobile = (
  window.matchMedia('(pointer: coarse)').matches ||
  navigator.maxTouchPoints > 0
);

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const stars = [];

let particles = [];
let asteroids = [];
let debris = [];

let gameStatus = 'MENU'; 
let score = 0;
let lives = 3;

let wave = 1;

// Create a ship with a spawn point in the center of the canvas.
const startingPosition = new Vector2(canvas.width / 2, canvas.height / 2);
const ship = new Spaceship(startingPosition);

/**
 * Generate a list of pixel coordinates that determine where stars will be rendered.
 * Add the coordinates for the star to the global `stars` array.
 * 
 * @param {star[]} stars The array to fill with star objects.
 */
function generateStars(stars)
{
  for (let i = 0; i < 100; i++)
  {
    const randX = Math.random() * canvas.width;
    const randY = Math.random() * canvas.height;

    stars.push({ x: randX, y: randY });
  }
}

/**
 * Generate a list of asteroids to be spawned into the game and add them to the global
 * `asteroids` array. Asteroid count is determined on the current game wave.
 */
function generateAsteroids()
{
  let num_asteroids = 0;

  if (wave > 4)
  {
    num_asteroids = MAX_NUM_ASTEROIDS;
  }
  else
  {
    num_asteroids = WAVE_DATA[wave];
  }
  
  for (let i = 0; i < num_asteroids; i ++)
  {
    asteroids.push(new Asteroid('large'));
  }
}

/**
 * Execute the main game loop by infinitely rendering and updating the game entities.
 */
function gameLoop() 
{
  update();
  draw();
  
  requestAnimationFrame(gameLoop);
}

/**
 * Reset the game's elements on a game restart. These include life count, score,
 * the global entity arrays, wave count, and ship position and heading.
 */
function restartGame()
{
  if (inputs.start)
  {
    lives = 3;
    score = 0;

    particles = [];
    debris = []; 
    asteroids = [];

    wave = 1;
    
    generateAsteroids();
    ship.restart();

    gameStatus = 'PLAYING';
  }
}

/**
 * Add a bullet to the current stream if the player fires. If the bullet stream limit
 * has been reached, do nothing. 
 */
function fireCheck()
{
  if (inputs.fire)
  {
    const newBullet = ship.shoot();

    if (newBullet !== null)
    {
      particles.push(newBullet);  
    }
  }
}

/**
 * Spawn a spark of explosion debris at the given location to the global `debris`
 * array.
 * 
 * @param {number} x The X coordinate of the spark. 
 * @param {number} y The Y coordinate of the spark.
 * @param {number} count The amount of debris to add to the array.
 */
function spawnDebris(x, y, count)
{
  for (let i = 0; i < count; i++)
  {
    debris.push(new Debris(x, y, Math.random() * (Math.PI * 2)));
  }
}

/**
 * Iterate through the game's current particles and asteroids and detect if a bullet
 * has collided with an asteroid, and remove them from the game & spawn debris 
 * if true.
 */
function particleCollision()
{
  for (let particle of particles)
  {
    for (let asteroid of asteroids)
    {
      const collided = detectCollision(
        particle.position, asteroid.position, particle.radius, asteroid.radius,
      );

      if (collided)
      {
        score += asteroid.score;
        asteroids.push(...asteroid.split());

        particle.dead = true;
        asteroid.dead = true;

        spawnDebris(asteroid.position.x, asteroid.position.y, DEBRIS_COUNT);
      }
    }
  }
}

/**
 * Iterate through the game's current asteroids and detect if one has collided with 
 * the player's ship. Reset the ship, spawn debris, and decrement the life count 
 * if true.
 */
function shipCollision()
{
  for (let asteroid of asteroids)
  {
    const collided = detectCollision(
      asteroid.position, ship.position, asteroid.radius, ship.radius,
    );

    if (collided)
    {
      ship.position = new Vector2(MID_WIDTH, MID_HEIGHT);
      lives -= 1;
      
      spawnDebris(asteroid.position.x, asteroid.position.y, DEBRIS_COUNT);
    }
  }
}

/**
 * Check and remove an entity if it is marked for removal (dead).
 */
function filterEntities()
{
  asteroids = asteroids.filter(a => !a.dead);
  particles = particles.filter(p => (
    !p.dead && 
    !isOffScreen(p.position.x, p.position.y)
  ));
  debris = debris.filter(d => !isOffScreen(d.position.x, d.position.y));
}

/**
 * Update all of the game entities on every frame refresh.
 */
function update()
{
  if (gameStatus === 'MENU')
  {
    if (inputs.start)
    {
      gameStatus = 'PLAYING';
    }
  }
  else if (gameStatus === 'GAMEOVER')
  {
    restartGame();
  }
  else if (gameStatus === 'PLAYING')
  {
    ship.update(inputs);

    for (let particle of particles)
    {
      particle.update();
    }

    for (let spark of debris)
    {
      spark.update();
    }

    for (let asteroid of asteroids)
    {
      asteroid.update();
    }

    fireCheck();    

    particleCollision();

    shipCollision();

    filterEntities();
    
    if (lives === 0)
    {
      gameStatus = 'GAMEOVER';
    }

    if (asteroids.length === 0)
    {
      wave += 1;
      generateAsteroids();
    }
  }
}

/**
 * Render the game entities and the score/life count.
 */
function drawEntities()
{
  ctx.fillStyle = '#00FF00';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('Lives: ' + lives, 20, 20);
  ctx.fillText('Score: ' + score, 20, 40);

  ship.draw(ctx);

  for (let particle of particles)
  {
    ctx.fillStyle = '#FF3131';
    particle.draw(ctx);
  }

  for (let spark of debris)
  {
    ctx.fillStyle = 'white';
    spark.draw(ctx);
  }

  for (let asteroid of asteroids)
  {
    asteroid.draw(ctx);
  }
}

/**
 * Render the game entities on every frame refresh and update.
 */
function draw()
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'white';

  for (const star of stars)
  {
    ctx.fillRect(star.x, star.y, 1, 1);
  }

  if (gameStatus === 'MENU')
  {
    const prompt = isMobile ? 'TAP to Start' : 'Press ENTER to Start';

    ctx.font = '17px consolas';
    ctx.fillStyle = '#00FF00';
    ctx.textAlign = 'center';
    ctx.fillText('ASTEROIDS', canvas.width / 2, canvas.height / 2);
    ctx.font = '12px consolas';
    ctx.fillText(prompt, canvas.width / 2, canvas.height / 2 + 30);
  }
  else if (gameStatus === 'GAMEOVER')
  {
    const prompt = isMobile ? 'TAP to Restart' : 'Press ENTER to Restart';

    ctx.fillStyle = '#00FF00';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
    ctx.fillText(prompt, canvas.width / 2, canvas.height / 2 + 30);
  }
  else
  {
    drawEntities();
  }
}

generateStars(stars);

generateAsteroids();

gameLoop();
