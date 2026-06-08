/**
 * The main game driver.
 * 
 * Prepares all of the game entities to be drawn onto the screen and updated 
 * on each frame.
 * 
 * @module Spaceship
 * @author Adrien P.
 */

import Spaceship from "./Spaceship.js";
import Vector2 from "./Vector2.js";

/**
 * @typedef {Object} star
 * @property {number} x
 * @property {number} y
 */

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const stars = []

// Create a ship with a spawn point in the center of the canvas.
const startingPosition = new Vector2(canvas.width / 2, canvas.height / 2);
const ship = new Spaceship(startingPosition);

/**
 * Generate a list of pixel coordinates that determines where stars will be drawn.
 * 
 * @param {Star} stars The array to fill with star objects.
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
 * Execute the main game loop by infinitely drawing and updating the game entities.
 */
function gameLoop() 
{
  update();
  draw();
  
  requestAnimationFrame(gameLoop);
}

/**
 * 
 */
function update()
{

}

/**
 * Draw the game entities.
 */
function draw()
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'white';

  for (const star of stars)
  {
    ctx.fillRect(star.x, star.y, 1, 1);
  }

  ship.draw(ctx);
}

generateStars(stars);

gameLoop();
