/**
 * @module Debris 
 * @author Adrien P. 
 */

import Vector2 from "../utils/Vector2.js";
import { DEBRIS_LIFETIME } from "../core/constants.js";

/**
 * Represents the game's explosion/destruction debris.
 * 
 * @class
 */
class Debris
{
  /**
   * Construct a spark of debris at the specified position and given direction.
   * 
   * @param {number} x The X coordinate of the spark.
   * @param {number} y The Y coordinate of the spark.
   * @param {number} heading The current heading of the spark.
   */
  constructor(x, y, heading)
  {
    /** @type {Vector2} The spawn point. */
    this.position = new Vector2(x, y);

    /** @type {Vector2} A randomly generated velocity. */
    this.velocity = new Vector2(
      Math.cos(heading) * Math.random() * 2,
      Math.sin(heading) * Math.random() * 2,
    );

    /** @type {number} The lifespan in frames of the debris. */
    this.lifespan = DEBRIS_LIFETIME;

    /** @type {boolean} Whether the debris exists on the canvas. */
    this.dead = false;
  }

  /**
   * Update the current spark's position and decrement the lifespan.
   */
  update()
  {
    this.position.add(this.velocity);

    this.lifespan -= 1;
    if (this.lifespan <= 0)
    {
      this.dead = true;
    }
  }

  /**
   * Translate the debris' properties into pixels and render it onto the canvas.
   *
   * @param {CanvasRenderingContext2D} ctx The master canvas paintbrush.
   */
  draw(ctx)
  {
    const tailX = this.position.x - (this.velocity.x * 2);
    const tailY = this.position.y - (this.velocity.y * 2);

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(this.position.x, this.position.y);
    ctx.lineTo(tailX, tailY);
    ctx.stroke();
  }
}

export default Debris;
