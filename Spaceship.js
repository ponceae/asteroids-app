/**
 * The main player ship entity.
 * 
 * @module Spaceship
 * @author Adrien P.
 */

import { SHIP_RADIUS, THRUST_POWER, FRICTION } from "./constants.js";
import Vector2 from "./Vector2.js";
import { degreesToRadians } from "./math-utils.js";

/**
 * @typedef {Object} ShipVertices
 * @property {{x: number, y: number}} nose
 * @property {{x: number, y: number}} rearLeft
 * @property {{x: number, y: number}} rearRight
 */

/**
 * Represents the player ship on the screen.
 * 
 * @class
 */
class Spaceship
{
  /**
   * Construct a Spaceship object at the specified position.
   * 
   * @param {Vector2} startingPosition The spawn point for the spaceship.
   */
  constructor(startingPosition)
  {
    this.position = startingPosition;

    /** @type {Vector2} The current movement speed and direction. */
    this.velocity = new Vector2(0, 0);
    
    /** @type {number} The current rotation orientation of the ship in radians. */
    this.heading = 0;

    /** @type {number} The physical size of the ship. */
    this.radius = SHIP_RADIUS;
    
    /** @type {number} The amount of thrust to apply to the ship. */
    this.thrustPower = THRUST_POWER;

    /** @type {number} The amount of drag to apply to the ship. */
    this.friction = FRICTION;
    
    /** @type {boolean} Whether or not the ship is currently being moved directly. */
    this.isThrusting = false;
  }

  // // Called every frame, adds velocity to position, applies friction,
  // // & handles screen wrapping.
  // update()
  // {
    
  // }

  /**
   * Translate the ship's properties to pixels. Draws the ship and the ship 
   * thrust flame.
   * 
   * @param {CanvasRenderingContext2D} ctx The master canvas paintbrush.
   */
  draw(ctx)
  {
    const { nose, rearLeft, rearRight } = this.getVertices();

    ctx.save();

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;

    // Outline the spaceship
    ctx.beginPath();
    ctx.moveTo(nose.x, nose.y);
    ctx.lineTo(rearRight.x, rearRight.y);
    ctx.lineTo(rearLeft.x, rearLeft.y)
    ctx.closePath();

    ctx.stroke();
    ctx.restore();
  }

  /**
   * Use the current position and heading to determine the three spaceship
   * vertices in order to detect collisions and to draw it.
   * 
   * @returns {ShipVertices} An object containing the x and y coordinates for each 
   * spaceship vertice.
   */
  getVertices()
  {
    const noseX = this.position.x + (this.radius * Math.cos(this.heading));
    const noseY = this.position.y + (this.radius * Math.sin(this.heading));
  
    const rearRightX = 
      this.position.x + 
      (this.radius * Math.cos(this.heading + degreesToRadians(135)));
    const rearRightY = 
      this.position.y + 
      (this.radius * Math.sin(this.heading + degreesToRadians(135)));

    const rearLeftX = 
      this.position.x + 
      (this.radius * Math.cos(this.heading - degreesToRadians(135)));
    const rearLeftY = 
      this.position.y + 
      (this.radius * Math.sin(this.heading - degreesToRadians(135)));

    return {
      nose: { x: noseX, y: noseY },
      rearLeft: { x: rearLeftX, y: rearLeftY },
      rearRight: { x: rearRightX, y: rearRightY },
    };
  }

  // // Takes the direction and increases or decreases rotation.
  // turn(angle)
  // {

  // }

  // // Use the rotation angle to calculate a forward direction, multiply
  // // it by the thrust power, and add the current velocity.
  // applyThrust()
  // {

  // }

  // // Create a particle object at the tip of the ship's triangle and 
  // // rotation.
  // shoot()
  // {

  // }

  // // Helper method for update that wraps the ship on the screen.
  // screenWrap()
  // {

  // }

}

export default Spaceship;
