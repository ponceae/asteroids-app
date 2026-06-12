/**
 * The particle (bullet stream) entity.
 * 
 * @module Particle 
 * @author Adrien P.
 */

import Vector2 from "../utils/Vector2.js";
import { 
  PARTICLE_SPEED, 
  HEIGHT, 
  PARTICLE_RADIUS, 
  WIDTH 
} from "../core/constants.js";

/**
 * Represents the player ship bullets.
 * 
 * @class
 */
class Particle
{
  /**
   * Construct a particle at the specified position and given direction.
   * 
   * @param {x} x The X position of the particle.  
   * @param {y} y The Y position of the particle.  
   * @param {number} heading The direction the particle is traveling.
   */
  constructor(x, y, heading)
  {
    /** @type {Vector2} The current position. */
    this.position = new Vector2(x, y);

    /** @type {number} The current radius size. */
    this.radius = PARTICLE_RADIUS;

    /** @type {Vector2} The current velocity. */
    this.velocity = new Vector2(
      Math.cos(heading) * PARTICLE_SPEED,
      Math.sin(heading) * PARTICLE_SPEED,
    );

    /** @type {boolean} Whether the particle exists on the canvas. */
    this.dead = false;
  }

  /**
   * Update the current particle's position.
   */
  update()
  {
    this.position.add(this.velocity);
  }

  /**
   * Translate the particle's properties to pixels and render the particle onto 
   * the canvas.
   * 
   * @param {CanvasRenderingContext2D} ctx The master canvas paintbrush. 
   */
  draw(ctx)
  {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default Particle;
