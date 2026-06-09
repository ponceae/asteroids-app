/**
 * The particle (bullet stream) entity.
 * 
 * @module Particle 
 * @author Adrien P.
 */

import Vector2 from "../utils/Vector2.js";
import { BULLET_SPEED, HEIGHT, PARTICLE_RADIUS, WIDTH } from "../core/constants.js";

/**
 * Represents the player ship bullets.
 * 
 * @class
 */
class Particle
{
  /**
   * Construct a particle at the specified position and direction.
   * 
   * @param {x} x The x position of the particle.  
   * @param {y} y The y position of the particle.  
   * @param {number} heading The direction the particle is traveling.
   */
  constructor(x, y, heading)
  {
    this.position = new Vector2(x, y);
    this.radius = PARTICLE_RADIUS;

    /** @type {Vector2} The velocity of the particle. */
    this.velocity = new Vector2(
      Math.cos(heading) * BULLET_SPEED,
      Math.sin(heading) * BULLET_SPEED,
    );
  }

  /**
   * Update the current particle's position.
   */
  update()
  {
    this.position.add(this.velocity);
  }

  /**
   * Render the particle onto the canvas.
   * 
   * @param {CanvasRenderingContext2D} ctx The master canvas paintbrush. 
   */
  draw(ctx)
  {
    ctx.fillStyle = 'white';

    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  isOffScreen()
  {
    return (
      this.position.x > WIDTH || 
      this.position.x < 0 || 
      this.position.y > HEIGHT || 
      this.position.y < 0
    );
  }
}

export default Particle;
