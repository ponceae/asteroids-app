/**
 * The asteroid game entity.
 * 
 * @module Asteroid
 * @author Adrien P.
 */

import { ASTEROID_DATA, ASTEROID_VERTICES, HEIGHT, WIDTH } from "../core/constants.js"
import { screenWrap } from "../utils/math-utils.js";
import Vector2 from "../utils/Vector2.js";

/**
 * Represents the enemy/goal to shoot in the game.
 * 
 * @class
 */
class Asteroid
{
  /**
   * Create an asteroid based on the given size.
   * 
   * @param {'small' | 'medium' | 'large'} [size='small'] The size of the asteroid 
   * to create. Defaults to `small` if the provided value does not exist in the 
   * asteroid data.
   */
  constructor(size = 'small', startingPosition = null)
  {
    const config = ASTEROID_DATA[size] ?? ASTEROID_DATA.small;

    this.size = size;

    /** @type {number} The current radius size of the asteroid. */
    this.radius = config.radius;

    /** @type {number} How many points the asteroid is worth. */
    this.points = config.points;

    /** @type {Vector2} The spawn point of the asteroid. */
    this.position = startingPosition === null 
      ? this.#getPosition() 
      : startingPosition;

    /** @type {Vector2} The current movement speed. */
    this.velocity = this.#getVelocity(config.minSpeed, config.maxSpeed);
  
    /** @type {Array} An array of normalized data points to render a shape. */
    this.shape = this.#generateShape();

    /** @type {number} The scoring amount for destroying the asteroid. */
    this.score = config.points;
  }

  /**
   * Update the asteroid position.
   */
  update()
  {
    this.position.add(this.velocity);
    screenWrap(this.position, this.radius);
  }

  /**
   * Translate the asteroid's properties into pixels. Render the asteroid.
   *  
   * @param {CanvasRenderingContext2D} ctx The master canvas paintbrush   
   */
  draw(ctx)
  {
    ctx.strokeStyle = 'white';

    const angle = (Math.PI * 2) / ASTEROID_VERTICES;

    ctx.beginPath();

    for (let i = 0; i < this.shape.length; i++)
    {
      const curr_angle = i * angle;
      const dist = this.radius * this.shape[i];
      
      const x = this.position.x + (Math.cos(curr_angle) * dist);
      const y = this.position.y + (Math.sin(curr_angle) * dist);

      if (i == 0)
      {
        ctx.moveTo(x, y);
      }
      
      ctx.lineTo(x, y);
    }

    ctx.closePath();
    ctx.stroke();
  }

  /**
   * Create and return an array of asteroids with positions at the parent asteroid.
   * 
   * @returns {Array} The array of child asteroids.
   */
  split()
  {
    const offset = 10;

    const posA = new Vector2(this.position.x + offset, this.position.y - offset);
    const posB = new Vector2(this.position.x - offset, this.position.y + offset);
    
    if (this.size === 'large')
    {
      return [
        new Asteroid('medium', posA),
        new Asteroid('medium', posB),
      ]
    }
    else if (this.size == 'medium')
    {
      return [
        new Asteroid('small', posA),
        new Asteroid('small', posB),
      ]
    }

    return [];
  }

  /**
   * Use the minimum and maximum speeds to generate a vector using a random angle.
   * 
   * @param {number} minSpeed The minimum possible speed of the asteroid. 
   * @param {number} maxSpeed The maximum possible speed of the asteroid.
   * @returns The vector using the min and max speeds. 
   */
  #getVelocity(minSpeed, maxSpeed)
  {
    const angle = Math.random() * (Math.PI * 2);
    const speed = (
      minSpeed + Math.random() * 
      (maxSpeed - minSpeed)
    );

    return new Vector2(Math.cos(angle) * speed, Math.sin(angle) * speed);
  }

  /**
   * Get a random edge of the canvas and generate a random position on that edge.
   * 
   * @returns {Vector2} The asteroid position. 
   */
  #getPosition()
  {
    const edge = Math.floor(Math.random() * 4);
    
    let x = 0;
    let y = 0;

    if (edge == 0) // Top edge
    {
      x = Math.random() * WIDTH;
      y = -this.radius;    
    } 
    else if (edge == 1) // Bottom edge
    {
      x = Math.random() * WIDTH;
      y = HEIGHT + this.radius;
    }
    else if (edge == 2) // Left edge
    {
      x = -this.radius;
      y = Math.random() * HEIGHT;
    }
    else // Right edge
    {
      x = WIDTH + this.radius;
      y = Math.random() * HEIGHT;
    }
    
    return new Vector2(x, y);
  }

  /**
   * @returns {Array<number>} An array of normalized data points to render an asteroid.
   */
  #generateShape()
  {
    const shape = [];

    for (let i = 0; i < ASTEROID_VERTICES; i++)
    {
      shape.push(0.8 + (Math.random() * 0.4))
    }
    
    return shape;
  }
}

export default Asteroid;
