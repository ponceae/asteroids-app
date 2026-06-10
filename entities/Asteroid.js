/**
 * The asteroid game entity.
 * 
 * @module Asteroid
 * @author Adrien P.
 */

import { ASTEROID_DATA } from "../core/constants.js"

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
  constructor(size = 'small')
  {
    const config = ASTEROID_DATA[size] ?? ASTEROID_DATA.small;

    /** @type {number} The radius size of the asteroid. */
    this.radius = config.radius;

    /** @type {number} The movement speed of the asteroid. */
    this.speed = this.#getSpeed(config.minSpeed, config.maxSpeed);

    /** @type {number} How many points the asteroid is worth. */
    this.points = config.points;
  }

  /**
   * @param {number} minSpeed The minimum possible speed of the asteroid. 
   * @param {number} maxSpeed The maximum possible speed of the asteroid.
   * @returns The speed of the asteroid given the min and max speed. 
   */
  #getSpeed(minSpeed, maxSpeed)
  {
    return minSpeed + Math.random() * (maxSpeed - minSpeed);
  }
}